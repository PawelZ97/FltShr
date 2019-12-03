import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import AppBarView from "../AppBarView";
import Container from "@material-ui/core/Container"
import List from "@material-ui/core/List";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import axios from "axios";
import {API_ADDRESS} from "../../utils/constants";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Expense from "./Expense";
import ExpenseCreation from "./ExpenseCreation";

const useStyles = makeStyles(theme => ({
    title: {
        paddingTop: 30,
        paddingBottom: 20
    }
}));

function ExpenseDisplay() {
    let { listId } = useParams();
    const [expensesListItems, setExpensesListItems] = useState([]);

    useEffect(() => {
        console.log("REQUEST SEND");
        axios
            .get(API_ADDRESS + "/expense/list/" + listId + "/expenses", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                setExpensesListItems(response.data);
                console.log("API_RESPONSE_OK: " + response.data);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log("STATUS NOT OK");
                } else if (error.request) {
                    console.log("NOT CONNECTED TO API");
                } else {
                    console.log("Something went wrong");
                }
            });
    }, [listId]);

    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={"listTitleContainer"}>
            <Typography className={classes.title} variant={"h5"}>
                Wydatki z listy {listId}
            </Typography>
            <Paper>
                <List>
                    {expensesListItems.map((expenseListItem, index) => (
                        <div key={expenseListItem.id}>
                            <ListItem>
                                <Expense expense={expenseListItem}/>
                            </ListItem>
                            {index !== expensesListItems.length - 1 ? (<Divider/>) : null}
                        </div>
                    ))}
                </List>
            </Paper>
            <ExpenseCreation listId={listId}/>
        </Container>
    );
}

export default AppBarView(ExpenseDisplay);
