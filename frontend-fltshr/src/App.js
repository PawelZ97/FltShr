import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import TestEndpoint from "./components/TestEndpoint";
import DisplayExpenseLists from "./components/expenses/expenselist/DisplayExpenseLists";
import ExpensesDisplay from "./components/expenses/ExpensesDisplay";
import DisplayAssignedQueueChores from "./components/chore/queuechores/DisplayAssignedQueueChores";
import DisplayQueueChores from "./components/chore/queuechores/DisplayQueueChores";
import DisplayAssignedFrequentChores from "./components/chore/frequentchores/DisplayAssignedFrequentChores";
import DisplayFrequentChores from "./components/chore/frequentchores/DisplayFrequentChores";
import DisplayShoppingLists from "./components/shopping/shoppinglist/DisplayShoppingLists";
import DisplayShoppingEntries from "./components/shopping/DisplayShoppingEntries";
import DashboardDisplay from "./components/DashboardDisplay";

function App() {
    return (
        <BrowserRouter>
            <CssBaseline/>
            <Switch>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/dashboard" component={DashboardDisplay}/>
                <Route exact path="/expense/lists" component={DisplayExpenseLists}/>
                <Route path="/expense/list/:listId/expenses" children={<ExpensesDisplay/>}/>
                <Route path="/chore/assignedqueues" component={DisplayAssignedQueueChores}/>
                <Route path="/chore/assignedfrequents" component={DisplayAssignedFrequentChores}/>
                <Route path="/manager/chores/queuechores" component={DisplayQueueChores}/>
                <Route path="/manager/chores/frequentchores" component={DisplayFrequentChores}/>
                <Route path="/shopping/lists" component={DisplayShoppingLists}/>
                <Route path="/shopping/list/:listId/entries" children={<DisplayShoppingEntries/>}/>
                <Route exact path="/te" component={TestEndpoint}/>
                <Redirect from="/" to={"/signin"}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
