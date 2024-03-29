import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import SignIn from "./components/account/SignIn";
import SignUp from "./components/account/SignUp";
import Demo from './components/account/Demo';
import DisplayExpenseLists from "./components/expenses/expenselist/ExpenseListsDisplay";
import ExpensesDisplay from "./components/expenses/ExpensesDisplay";
import DisplayAssignedQueueChores from "./components/chore/queuechores/AssignedQueueChoresDisplay";
import DisplayQueueChores from "./components/chore/queuechores/QueueChoresDisplay";
import DisplayAssignedFrequentChores from "./components/chore/frequentchores/AssignedFrequentChoresDisplay";
import DisplayFrequentChores from "./components/chore/frequentchores/FrequentChoresDisplay";
import DisplayShoppingLists from "./components/shopping/shoppinglist/ShoppingListsDisplay";
import DisplayShoppingEntries from "./components/shopping/ShoppingEntriesDisplay";
import DashboardDisplay from "./components/dashboard/DashboardPage";
import ExpenseCreation from "./components/expenses/ExpenseCreation";
import ExpenseListCreation from "./components/expenses/expenselist/ExpenseListCreation";
import ExpenseListSettleUp from "./components/expenses/expenselist/ExpenseListSettleUp";
import QueueChoreCreation from "./components/chore/queuechores/QueueChoreCreation";
import FrequentChoreCreation from "./components/chore/frequentchores/FrequentChoreCreation";
import ShoppingListCreation from "./components/shopping/shoppinglist/ShoppingListCreation";
import ShoppingEntryCreation from "./components/shopping/ShoppingEntryCreation";
import ChangePassword from "./components/account/ChangePassword";
import RequestAccountDelete from "./components/account/RequestAccountDelete";
import AccountDelete from "./components/account/AccountDelete";
import ChangeManager from "./components/account/ChangeManager";

function App() {
    return (
        <BrowserRouter>
            <CssBaseline/>
            <Switch>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/demo" component={Demo}/>
                <Route exact path="/changepassword" component={ChangePassword}/>
                <Route exact path="/requestaccountdelete" component={RequestAccountDelete}/>
                <Route exact path="/admin/accountdelete" component={AccountDelete}/>
                <Route exact path="/admin/changemanager" component={ChangeManager}/>
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
                <Route exact path="/shopping/lists/creation" component={ShoppingListCreation}/>
                <Route exact path="/shopping/list/:listId/entries" children={<DisplayShoppingEntries/>}/>
                <Route exact path="/shopping/list/:listId/entry/create" children={<ShoppingEntryCreation/>}/>
                <Redirect from="/" to={"/signin"}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
