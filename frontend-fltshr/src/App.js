import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import ExpensesDashboard from "./components/ExpensesDashboard";
import TestApiCall from "./components/TestApiCall";

function App() {
    return (
        <BrowserRouter>
            <CssBaseline />
            <Switch>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/expenses" component={ExpensesDashboard}/>
                <Route exact path="/test" component={TestApiCall}/>
                <Redirect from="/" to={"/signin"}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
