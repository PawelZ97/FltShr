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
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {getLoggedUser} from '../../utils/UserUtils';

const useStyles = makeStyles(theme => ({
    title: {
        paddingTop: 30,
        paddingBottom: 20
    }
}));

function ExpensesDisplay() {
    let {listId} = useParams();
    const [expensesListItems, setExpensesListItems] = useState([]);
    const [forceUpdateFlag, setForceUpdateFlag] = useState();

    useEffect(() => {
        axios
            .get(API_ADDRESS + "/expense/list/" + listId + "/expenses", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                setExpensesListItems(response.data);
                console.log("Expenses loaded, status: " + response.status)
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
    }, [listId, forceUpdateFlag]);

    function handleDelete(expenseId) {
        axios.delete(API_ADDRESS + '/expense/list/' + listId + '/expense/' + expenseId, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                setForceUpdateFlag({});
                console.log("Expense Deleted, status: " + response.status);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log("Status not OK");
                } else if (error.request) {
                    console.log("Can't connect to API");
                } else {
                    console.log("Something went wrong");
                }
            });
    }

    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={"listTitleContainer"}>
            <Typography className={classes.title} variant={"h5"}>
                Wydatki z listy {listId}
            </Typography>
            <Paper>
                <List>
                    {expensesListItems.length === 0 ? (<h3 align={"center"}>Brak wydatków na liście</h3>) : null}

                    {expensesListItems.map((expenseListItem, index) => (
                        <div key={expenseListItem.id}>
                            <ListItem>
                                <Expense expense={expenseListItem}/>
                                {getLoggedUser().username === expenseListItem.paidBy.username
                                    ? (<ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete"
                                                    onClick={() => handleDelete(expenseListItem.id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>) : null}
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

export default AppBarView(ExpensesDisplay);