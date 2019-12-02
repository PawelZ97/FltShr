import React, {useEffect, useState} from "react";
import AppBarView from "./AppBarView";
import Container from "@material-ui/core/Container"
import List from "@material-ui/core/List";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import axios from "axios";
import {API_ADDRESS} from "../utils/constants";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
    title: {
        paddingTop: 30,
        paddingBottom: 20
    }
}));

function ExpensesDashboard() {
    const [expensesLists, setExpensesLists] = useState([]);

    useEffect(() => {
        console.log("REQUEST SEND");
        axios
            .get(API_ADDRESS + "/expense/lists",{
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function(response) {
                setExpensesLists(response.data);
                console.log("API_RESPONSE_OK: " + response.data);
                console.log(response.data[0].name);
            })
            .catch(function(error) {
                if (error.response) {
                    console.log("STATUS NOT OK");
                } else if (error.request) {
                    console.log("NOT CONNECTED TO API");
                } else {
                    console.log("Something went wrong");
                }
            });
    }, []);

    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={"listTitleContainer"}>
            <Typography className={classes.title}>
                Listy wydatków:
            </Typography>
            <Paper>
                <List>
                    {expensesLists.map((expenseList, index) => {
                            return (
                                <div key={expenseList.id}>
                                    <ListItem >
                                        <ListItemText primary={expenseList.name} secondary={expenseList.description}/>
                                    </ListItem>
                                    {index !== expensesLists.length-1 ? ( <Divider/>) : null }
                                </div>
                            )
                        }
                    )}
                </List>
            </Paper>
        </Container>
    );
}

export default AppBarView(ExpensesDashboard);
