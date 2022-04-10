import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

const Home = lazy(() => import("./components/Home"));
const CountryInfo = lazy(() => import("./components/CountryInfo"));

const App: React.FC = () => {
    return (
        <div className="App" data-testid="app">
            <Suspense fallback={<p>Loading...</p>}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route
                            exact
                            path="/country/:name"
                            component={CountryInfo}
                        />
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </div>
    );
};

export default App;
