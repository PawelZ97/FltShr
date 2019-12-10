import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom"
import axios from "axios";
import {API_ADDRESS} from "../../utils/constants";
import Container from "@material-ui/core/Container";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Divider from "@material-ui/core/Divider";
import PageViewHoc from "../PageViewHoc";
import ShoppingEntry from "./ShoppingEntry";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
    title: {
        marginTop: 20,
        marginBottom: 20
    },
    marginButton: {
        margin: 10
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


function DisplayShoppingEntries(props) {
    let history = useHistory();
    let {listId} = useParams();
    const [shoppingListItems, setShoppingListItems] = useState([]);
    const [updateFlag, setUpdateFlag] = useState(false);

    useEffect(() => {
        axios
            .get(API_ADDRESS + "/shopping/list/" + listId + "/entries", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                setShoppingListItems(response.data);
                console.log("ShoppingEntries loaded, status: " + response.status)
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

    function handleDelete(itemId) {
        axios.delete(API_ADDRESS + "/shopping/list/" + listId + "/item/" + itemId, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                setUpdateFlag(!updateFlag);
                console.log("ShoppingEntry Deleted, status: " + response.status);
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

    function handleMarkAsBought(itemId) {
        axios.patch(API_ADDRESS + "/shopping/list/" + listId + "/item/" + itemId, {}, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                setUpdateFlag(!updateFlag);
                console.log("ShoppingEntry Marked as Bought, status: " + response.status);
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
                Lista zakupów
            </Typography>
            <Paper>
                <List>
                    {shoppingListItems.length === 0 ? (<h3 align={"center"}>Brak wydatków na liście</h3>) : null}

                    {shoppingListItems.map((shoppingListItem, index) => (
                        <div key={shoppingListItem.id}>
                            <ListItem>
                                <ShoppingEntry shoppingListItem={shoppingListItem}/>
                                <ListItemSecondaryAction>
                                    {!shoppingListItem.isBought && (
                                        <IconButton edge="end"
                                                    aria-label="delete"
                                                    onClick={() => handleMarkAsBought(shoppingListItem.id)}
                                                    className={classes.marginButton}>
                                            <DoneIcon/>
                                        </IconButton>)}
                                    <IconButton edge="end"
                                                aria-label="delete"
                                                onClick={() => handleDelete(shoppingListItem.id)}
                                                className={classes.marginButton}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            {index !== shoppingListItems.length - 1 ? (<Divider/>) : null}
                        </div>
                    ))}
                </List>
            </Paper>
            <Fab color="secondary" aria-label="add" className={classes.fab}
                 onClick={() => history.push("/shopping/list/" + listId + "/entry/create")}>
                <AddIcon/>
            </Fab>
        </Container>
    );
}

export default PageViewHoc(DisplayShoppingEntries);