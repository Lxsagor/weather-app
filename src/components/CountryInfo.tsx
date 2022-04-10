import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface InitCountryName {
    name: string;
}

interface InitCountry {
    capital: string[];
    population: number;
    latlng: number[];
    flags: {
        svg: string;
    };
}

interface InitCountryInfo {
    temperature: number;
    weather_icons: string[];
    wind_speed: number;
    precip: number;
}

const CountryInfo: React.FC = () => {
    const { name } = useParams<InitCountryName>();

    const [loading, setLoading] = useState<boolean>(false);
    const [weatherLoading, setWeatherLoading] = useState<boolean>(false);

    const [country, setCountry] = useState<InitCountry>();
    const [weatherInfo, setWeatherInfo] = useState<InitCountryInfo>();

    useEffect(() => {
        getCountry();
    }, []);

    const getCountry = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `https://restcountries.com/v3.1/name/${name}`
            );
            const data = await res.json();
            setCountry(data.length > 1 ? data[2] : data[0]);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const getWeatherInfo = async () => {
        try {
            setWeatherLoading(true);

            const res = await fetch(
                `http://api.weatherstack.com/current?access_key=c38896a436dd67b86883943f6bd3aa32&query=${country?.capital[0]}`
            );
            const data = await res.json();
            setWeatherInfo(data.current);

            setWeatherLoading(false);
        } catch (error) {
            setWeatherLoading(false);
            console.log(error);
        }
    };

    return (
        <div className="country-info" data-testid="country">
            <Typography mt={5}>Country Info</Typography>
            {loading ? (
                <p>Loading...</p>
            ) : country ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        jastifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Typography variant="body2">
                            Capital: {country.capital[0]}
                        </Typography>
                        <Typography variant="body2">
                            Population: {country.population}
                        </Typography>
                        <Typography variant="body2">
                            Latitude: {country.latlng[0]}
                            <sup>o</sup>
                        </Typography>
                        <Typography variant="body2" mb={2}>
                            Longitude: {country.latlng[1]}
                            <sup>o</sup>
                        </Typography>
                    </Box>

                    <Box>
                        <Avatar
                            src={country.flags.svg}
                            alt=" "
                            sx={{
                                borderRadius: 0,
                                width: "170px",
                                height: "90px",
                            }}
                        />
                    </Box>
                </Box>
            ) : (
                <Typography variant="h5">
                    Country not found by name: {name}
                </Typography>
            )}

            {country && (
                <Button
                    sx={{ marginTop: "20px" }}
                    size="medium"
                    variant="contained"
                    onClick={getWeatherInfo}
                >
                    Capital Weather
                </Button>
            )}

            {weatherLoading ? (
                <Typography variant="body2">Loading...</Typography>
            ) : (
                weatherInfo && (
                    <Box>
                        <Typography variant="h5">
                            {country?.capital[0]} Weather Info
                        </Typography>
                        <Typography variant="body2" className="weather-content">
                            <img src={weatherInfo.weather_icons[0]} alt="_" />
                            <Typography variant="body2">
                                Temperature: {weatherInfo.temperature}
                                <sup>o</sup>
                            </Typography>
                            <Typography variant="body2">
                                Wind Speed: {weatherInfo.wind_speed}
                            </Typography>
                            <Typography variant="body2">
                                Precip: {weatherInfo.precip}
                            </Typography>
                        </Typography>
                    </Box>
                )
            )}
        </div>
    );
};

export default CountryInfo;
