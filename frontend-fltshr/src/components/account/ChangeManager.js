import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_ADDRESS} from "../../utils/constants";
import Container from "@material-ui/core/Container";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import {getLoggedUser} from "../../utils/UserUtils";
import PageViewHoc from "../PageViewHoc";
import Grid from "@material-ui/core/Grid";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles(theme => ({
    title: {
        marginTop: 20,
        marginBottom: 20
    }
}));

function ChangeManager() {
    const [usersList, setUserList] = useState([]);
    const [updateFlag, setUpdateFlag] = useState(false);

    useEffect(() => {
        axios
            .get(API_ADDRESS + "/users", {
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

    function handleChange(userId) {
        axios
            .patch(API_ADDRESS + "/admin/user/" + userId + "/changemanager", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                console.log("ChangeManager, status: " + response.status + " id: " + userId);
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
                Zmień managera:
            </Typography>
            <Paper>
                <List>
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
                                                    onClick={() => handleChange(user.id)}>
                                            <SupervisorAccountIcon/>
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

export default PageViewHoc(ChangeManager);