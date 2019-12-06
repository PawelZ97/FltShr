import React, {useEffect, useState} from 'react';
import AppBarView from "../../AppBarView";
import Container from "@material-ui/core/Container";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import QueueChore from "./QueueChore";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
    title: {
        paddingTop: 30,
        paddingBottom: 20
    }
}));

function DisplayQueueChores(props) {
    const [assignedQueueChores, setAssignedQueueChores] = useState([]);
    const [forceUpdateFlag, setForceUpdateFlag] = useState();

    useEffect(() => {
        axios
            .get(API_ADDRESS + "/chores/assignedqueues/me", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                setAssignedQueueChores(response.data);
                console.log("QueueChoresMe loaded, status: " + response.status);
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
    }, [forceUpdateFlag]);

    function handleDone(assignedQueueChoreId) {
        axios
            .patch(API_ADDRESS + "/chores/assignedqueue/" + assignedQueueChoreId, {}, {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                console.log("QueueChore setDone, status: " + response.status);
                setForceUpdateFlag({});
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
                Twoje obowiązki w kolejce:
            </Typography>
            <Paper>
                <List>
                    {assignedQueueChores.length === 0 ? (
                        <h3 align={"center"}>Brak obowiązków do wykonania :) </h3>) : null}
                    {assignedQueueChores.map((assignedQueueChore, index) => (
                        <div key={assignedQueueChore.id}>
                            <ListItem>
                                <QueueChore assignedQueueChore={assignedQueueChore}/>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete"
                                                onClick={() => handleDone(assignedQueueChore.id)}>
                                        <DoneIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            {index !== assignedQueueChores.length - 1 ? (<Divider/>) : null}
                        </div>
                    ))}
                </List>
            </Paper>
        </Container>
    );
}

export default AppBarView(DisplayQueueChores);