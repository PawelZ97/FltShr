import React, {useEffect, useState} from "react";
import AppBarView from "../AppBarView";
import Container from "@material-ui/core/Container"
import List from "@material-ui/core/List";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import axios from "axios";
import {API_ADDRESS} from "../../utils/constants";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpenseListCreation from "./ExpenseListCreation";

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

function ExpensesList() {
    const [expensesLists, setExpensesLists] = useState([]);

    useEffect(() => {
        console.log("REQUEST SEND");
        axios
            .get(API_ADDRESS + "/expense/lists", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                setExpensesLists(response.data);
                console.log("API_RESPONSE_OK: " + response.data);
                console.log(response.data[0].name);
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
                    {expensesLists.map((expenseList, index) => {
                            return (
                                <div key={expenseList.id}>
                                    <ListItem className={classes.listItem} button component="a"
                                              href={"/expense/list/" + expenseList.id + "/expenses"}>
                                        <ListItemText classes={{primary: classes.text}}
                                                      primary={expenseList.name} secondary={expenseList.description}/>
                                    </ListItem>
                                    {index !== expensesLists.length - 1 ? (<Divider/>) : null}
                                </div>
                            )
                        }
                    )}
                </List>
            </Paper>
            <ExpenseListCreation/>
        </Container>
    );
}

export default AppBarView(ExpensesList);
