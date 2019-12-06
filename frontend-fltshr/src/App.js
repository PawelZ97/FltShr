import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import TestEndpoint from "./components/TestEndpoint";
import ExpenseLists from "./components/expenses/expenselist/ExpenseLists";
import ExpensesDisplay from "./components/expenses/ExpensesDisplay";
import DisplayQueueChores from "./components/chore/queuechore/DisplayQueueChores";

function App() {
    return (
        <BrowserRouter>
            <CssBaseline/>
            <Switch>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/expense/lists" component={ExpenseLists}/>
                <Route path="/expense/list/:listId/expenses" children={<ExpensesDisplay/>}/>
                <Route path="/chore/assignedqueues" component={DisplayQueueChores}/>
                <Route exact path="/te" component={TestEndpoint}/>
                <Redirect from="/" to={"/signin"}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
