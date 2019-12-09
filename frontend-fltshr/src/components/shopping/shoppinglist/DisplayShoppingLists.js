import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import Container from "@material-ui/core/Container";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ArchiveIcon from '@material-ui/icons/Archive';
import Divider from "@material-ui/core/Divider";
import PageViewHoc from "../../PageViewHoc";
import ShoppingList from "./ShoppingList";
import ShoppingListCreation from "./ShoppingListCreation";
import {getLoggedUser} from "../../../utils/UserUtils";

const useStyles = makeStyles(theme => ({
    title: {
        margin: 20
    }
}));

function DisplayShoppingLists(props) {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [updateFlag, setUpdateFlag] = useState(false);

    useEffect(() => {
        axios
            .get(API_ADDRESS + "/shopping/lists", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                setShoppingLists(response.data);
                console.log("ShoppingLists loaded, status: " + response.status);
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
    }, [updateFlag]);

    function handleArchive(shoppingListId) {
        axios
            .delete(API_ADDRESS + "/manager/shopping/list/" + shoppingListId + "/archive", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                console.log("ShoppingList archived, status: " + response.status);
                setUpdateFlag(!updateFlag);
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
    }

    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={"listTitleContainer"}>
            <Typography className={classes.title} variant={"h5"}>
                Listy zakupów:
            </Typography>
            <Paper>
                <List>
                    {shoppingLists.length === 0 ? (
                        <h3 align={"center"}>Brak list zakupów</h3>) : null}
                    {shoppingLists.map((shoppingList, index) => (
                        <div key={shoppingList.id}>
                            <ListItem button component="a"
                                      href={"/shopping/list/" + shoppingList.id + "/entries"}>
                                <ShoppingList shoppingList={shoppingList}/>
                                {getLoggedUser().roles === "ROLE_MANAGER" ? (
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete"
                                                    onClick={() => handleArchive(shoppingList.id)}>
                                            <ArchiveIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                ) : null}
                            </ListItem>
                            {index !== shoppingLists.length - 1 ? (<Divider/>) : null}
                        </div>
                    ))}
                </List>
            </Paper>
            <ShoppingListCreation updateFlag={updateFlag} setUpdateFlag={setUpdateFlag}/>
        </Container>
    );
}

export default PageViewHoc(DisplayShoppingLists);