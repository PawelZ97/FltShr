import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import ExpensesDashboard from "./components/expenses/ExpensesList";
import TestApiCall from "./components/TestApiCall";
import TestEndpoint from "./components/TestEndpoint";
import ExpenseList from "./components/expenses/ExpenseDisplay";

function App() {
    return (
        <BrowserRouter>
            <CssBaseline />
            <Switch>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/expense/lists" component={ExpensesDashboard}/>
                <Route path="/expense/list/:listId/expenses" children={<ExpenseList/>} />
                <Route exact path="/test" component={TestApiCall}/>
                <Route exact path="/te" component={TestEndpoint}/>
                <Redirect from="/" to={"/signin"}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
