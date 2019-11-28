import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <BrowserRouter>
            <CssBaseline />
            <Switch>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Redirect from="/" to={"/signin"}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
