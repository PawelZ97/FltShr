import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom"
import axios from "axios";
import {API_ADDRESS} from "../../utils/constants";
import AddIcon from "@material-ui/icons/Add";
import PageViewHoc from "../PageViewHoc";
import Fab from "@material-ui/core/Fab";
import Container from "@material-ui/core/Container"
import List from "@material-ui/core/List";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Expense from "./Expense";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {getLoggedUser} from '../../utils/UserUtils';

const useStyles = makeStyles(theme => ({
    title: {
        marginTop: 20,
        marginBottom: 20
    },
    fab: {
        margin: 0,
        top: "auto",
        right: 50,
        bottom: 50,
        left: "auto",
        position: "fixed"
    }
}));

function ExpensesDisplay() {
    let history = useHistory();
    let {listId} = useParams();
    const [expensesListItems, setExpensesListItems] = useState([]);
    const [updateFlag, setUpdateFlag] = useState(false);

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
    }, [listId, updateFlag]);

    function handleDelete(expenseId) {
        axios.delete(API_ADDRESS + '/expense/list/' + listId + '/expense/' + expenseId, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                setUpdateFlag(!updateFlag);
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
            <Fab color="secondary" aria-label="add" className={classes.fab}
                 onClick={() => history.push("/expense/list/" + listId + "/create")}>
                <AddIcon/>
            </Fab>
        </Container>
    );
}

export default PageViewHoc(ExpensesDisplay);
