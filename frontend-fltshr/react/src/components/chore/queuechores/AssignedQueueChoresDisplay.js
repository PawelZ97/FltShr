import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom"
import PageViewHoc from "../../PageViewHoc";
import Container from "@material-ui/core/Container";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import AssignedQueueChore from "./AssignedQueueChore";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from '@material-ui/icons/Done';
import Grid from "@material-ui/core/Grid";
import {getLoggedUser} from "../../../utils/UserUtils";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles(theme => ({
    marginTitle: {
        marginTop: 20,
        marginBottom: 20
    }
}));

function AssignedQueueChoresDisplay(props) {
    let history = useHistory();
    const [assignedQueueChores, setAssignedQueueChores] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [updateFlag, setUpdateFlag] = useState(false);

    useEffect(() => {
        let getRequestUrl = (showHistory) ? (API_ADDRESS + "/chores/assignedqueues") : (API_ADDRESS + "/chores/assignedqueues/me");
        axios.get(getRequestUrl, {
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
    }, [showHistory, updateFlag]);

    function handleDone(assignedQueueChoreId) {
        axios.patch(API_ADDRESS + "/chores/assignedqueue/" + assignedQueueChoreId, {}, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                console.log("AssignedQueueChore setDone, status: " + response.status);
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
            {getLoggedUser().roles === "ROLE_MANAGER" && (
                <Grid container justify={"flex-end"}>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="primary" className={classes.marginTitle} fullWidth
                                onClick={() => history.push("/manager/chores/queuechores")}>
                            Zarządzaj obowiązkami kolejkowymi
                        </Button>
                    </Grid>
                </Grid>
            )}
            <Grid container justify={"space-between"} alignItems={"center"} direction={"row-reverse"}>
                <Grid item xs={12} sm={6}>
                    <ButtonGroup color="primary" variant="contained" className={classes.marginTitle} fullWidth>
                        <Button onClick={() => setShowHistory(false)}
                                disabled={!showHistory}>Do zrobienia</Button>
                        <Button onClick={() => setShowHistory(true)}
                                disabled={showHistory}>Historia</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography className={classes.marginTitle} variant={"h5"}>
                        Twoje obowiązki w kolejce:
                    </Typography>
                </Grid>
            </Grid>
            <Paper>
                <List>
                    {assignedQueueChores.length === 0 ? (
                        <h3 align={"center"}>Brak obowiązków do wykonania :) </h3>) : null}
                    {assignedQueueChores.map((assignedQueueChore, index) => (
                        <div key={assignedQueueChore.id}>
                            <ListItem>
                                <AssignedQueueChore showHistory={showHistory} assignedQueueChore={assignedQueueChore}/>
                                {!showHistory ? (
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete"
                                                    onClick={() => handleDone(assignedQueueChore.id)}>
                                            <DoneIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>) : null}
                            </ListItem>
                            {index !== assignedQueueChores.length - 1 ? (<Divider/>) : null}
                        </div>
                    ))}
                </List>
            </Paper>
        </Container>
    );
}

export default PageViewHoc(AssignedQueueChoresDisplay);