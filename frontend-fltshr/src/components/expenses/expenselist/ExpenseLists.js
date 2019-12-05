import React, {useEffect, useState} from "react";
import AppBarView from "../../AppBarView";
import Container from "@material-ui/core/Container"
import List from "@material-ui/core/List";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpenseListCreation from "./ExpenseListCreation";
import {getLoggedUser} from "../../../utils/UserUtils";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ExpenseListSettleUp from "./ExpenseListSettleUp";

const useStyles = makeStyles(theme => ({
    title: {
        paddingTop: 30,
        paddingBottom: 20
    },
    listItem: {
        height: 80
    },
    text: {
        fontSize: "1.2rem",
    }
}));

function ExpenseLists() {
    const [expensesLists, setExpensesLists] = useState([]);

    useEffect(() => {
        axios
            .get(API_ADDRESS + "/expense/lists", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                setExpensesLists(response.data);
                console.log("ExpenseLists loaded, status: " + response.status);
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
    }, []);

    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={"listTitleContainer"}>
            <Typography className={classes.title} variant={"h5"}>
                Listy wydatków:
            </Typography>
            <Paper>
                <List>
                    {expensesLists.length === 0 ? (<h3 align={"center"}>Wszystkie listy zamknięte</h3>) : null}
                    {expensesLists.map((expenseList, index) => (
                        <div key={expenseList.id}>
                            <ListItem className={classes.listItem} button component="a"
                                      href={"/expense/list/" + expenseList.id + "/expenses"}>
                                <ListItemText classes={{primary: classes.text}}
                                              primary={expenseList.name}
                                              secondary={expenseList.description}/>
                                {getLoggedUser().roles === "ROLE_MANAGER"
                                    ? (<ListItemSecondaryAction>
                                        <ExpenseListSettleUp expenseId={expenseList.id}/>
                                    </ListItemSecondaryAction>) : null}
                            </ListItem>
                            {index !== expensesLists.length - 1 ? (<Divider/>) : null}
                        </div>
                    ))}
                </List>
            </Paper>
            <ExpenseListCreation/>
        </Container>
    );
}

export default AppBarView(ExpenseLists);
