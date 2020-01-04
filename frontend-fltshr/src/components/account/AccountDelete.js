import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_ADDRESS} from "../../utils/constants";
import Container from "@material-ui/core/Container";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ArchiveIcon from '@material-ui/icons/Archive';
import Divider from "@material-ui/core/Divider";
import {getLoggedUser} from "../../utils/UserUtils";
import PageViewHoc from "../PageViewHoc";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    title: {
        marginTop: 20,
        marginBottom: 20
    }
}));

function AccountDelete() {
    const [usersList, setUserList] = useState([]);
    const [updateFlag, setUpdateFlag] = useState(false);

    useEffect(() => {
        axios
            .get(API_ADDRESS + "/users", {
                // .get(API_ADDRESS + "/admin/requestingdeleteusers", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                setUserList(response.data);
                console.log("RequestingUsers loaded, status: " + response.status);
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

    function handleArchive(userId) {
        axios
            .delete(API_ADDRESS + "/admin/user/" + userId + "/archive", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                console.log("UserAccount archived, status: " + response.status);
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
                Użytkownicy oczekujący usunięcia:
            </Typography>
            <Paper>
                <List>
                    {usersList.length === 0 ? (
                        <h3 align={"center"}>Brak użytkowników żądających usunięcia konta.</h3>) : null}
                    {usersList.map((user, index) => (
                        <div key={user.id}>
                            <ListItem>
                                <Grid container justify={"flex-end"} direction={"column"}>
                                    <Typography variant={"h5"}>
                                        {user.username}
                                    </Typography>
                                    <Typography>
                                        id: {user.id}
                                    </Typography>
                                </Grid>
                                {getLoggedUser().roles === "ROLE_ADMIN" ? (
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete"
                                                    onClick={() => handleArchive(user.id)}>
                                            <ArchiveIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                ) : null}
                            </ListItem>
                            {index !== usersList.length - 1 ? (<Divider/>) : null}
                        </div>
                    ))}
                </List>
            </Paper>
        </Container>
    );
}

export default PageViewHoc(AccountDelete);