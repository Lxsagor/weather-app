import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
    const history = useHistory();
    const [countryName, setCountryName] = useState<string>("");

    const fieldChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountryName(event.target.value);
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        history.push(`/country/${countryName}`);
    };
    return (
        <Box mt={5} data-testid="home">
            <Box>
                <Typography variant="h5" mb={2}>
                    Welcome To Weather Applicaton
                </Typography>
                <TextField
                    variant="standard"
                    placeholder="Type country"
                    value={countryName}
                    onChange={fieldChangeHandler}
                />
            </Box>

            <Button
                variant="contained"
                onClick={submitHandler}
                sx={{
                    width: "110px",
                    marginTop: "20px",
                    textTransform: "capitalize",
                }}
                disabled={!countryName}
            >
                Submit
            </Button>
        </Box>
    );
};

export default Home;
