import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Redirect from="/" to={"/signin"}/>
            </Switch>
        </Router>
    );
}

export default App;
