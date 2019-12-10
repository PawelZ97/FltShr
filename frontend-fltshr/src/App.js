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
import ExpenseCreation from "./components/expenses/ExpenseCreation";
import ExpenseListCreation from "./components/expenses/expenselist/ExpenseListCreation";
import ExpenseListSettleUp from "./components/expenses/expenselist/ExpenseListSettleUp";
import QueueChoreCreation from "./components/chore/queuechores/QueueChoreCreation";
import FrequentChoreCreation from "./components/chore/frequentchores/FrequentChoreCreation";

function App() {
    return (
        <BrowserRouter>
            <CssBaseline/>
            <Switch>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/dashboard" component={DashboardDisplay}/>
                <Route exact path="/expense/lists/display" component={DisplayExpenseLists}/>
                <Route exact path="/expense/lists/create" component={ExpenseListCreation}/>
                <Route exact path="/expense/list/:listId/display" children={<ExpensesDisplay/>}/>
                <Route exact path="/expense/list/:listId/create" children={<ExpenseCreation/>}/>
                <Route exact path="/expense/list/:listId/settleup" children={<ExpenseListSettleUp/>}/>
                <Route exact path="/chore/assignedqueues" component={DisplayAssignedQueueChores}/>
                <Route exact path="/chore/assignedfrequents" component={DisplayAssignedFrequentChores}/>
                <Route exact path="/manager/chores/queuechores" component={DisplayQueueChores}/>
                <Route exact path="/manager/chores/queuechores/create" component={QueueChoreCreation}/>
                <Route exact path="/manager/chores/frequentchores" component={DisplayFrequentChores}/>
                <Route exact path="/manager/chores/frequentchores/create" component={FrequentChoreCreation}/>
                <Route exact path="/shopping/lists" component={DisplayShoppingLists}/>
                <Route exact path="/shopping/list/:listId/entries" children={<DisplayShoppingEntries/>}/>
                <Route exact path="/te" component={TestEndpoint}/>
                <Redirect from="/" to={"/signin"}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
