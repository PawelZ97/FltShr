import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom"
import Container from "@material-ui/core/Container";
import {getLoggedUser} from "../../../utils/UserUtils";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import PageViewHoc from "../../PageViewHoc";
import {API_ADDRESS} from "../../../utils/constants";
import axios from "axios";
import AssignedFrequentChore from "./AssignedFrequentChore";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
    marginTitle: {
        marginTop: 20,
        marginBottom: 20
    },
    switch: {
        padding: 20,
    },
    buttonManager: {
        marginTop: 20
    }
}));

function DisplayAssignedFrequentChores(props) {
    let history = useHistory();
    const [assignedFrequentChores, setAssignedFrequentChores] = useState([]);
    const [viewMode, setViewMode] = useState("TODO");
    const [updateFlag, setUpdateFlag] = useState(false);

    useEffect(() => {
        let getRequestUrl = "";
        if (viewMode === "TODO") {
            getRequestUrl = API_ADDRESS + "/chores/assignedfrequents/todo";
        } else if (viewMode === "USER") {
            getRequestUrl = API_ADDRESS + "/chores/assignedfrequents/my";
        } else if (viewMode === "ALL") {
            getRequestUrl = API_ADDRESS + "/chores/assignedfrequents"
        }
        axios
            .get(getRequestUrl, {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                setAssignedFrequentChores(response.data);
                console.log("FrequentChores loaded, viewMode: " + viewMode + ", status: " + response.status);
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
    }, [viewMode, updateFlag]);

    function handleDone(assignedFrequentChoreId) {
        axios
            .patch(API_ADDRESS + "/chores/assignedfrequent/" + assignedFrequentChoreId, {}, {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                console.log("AssignedFrequentChore setDone, status: " + response.status);
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
                                onClick={() => history.push("/manager/chores/frequentchores")}>
                            Zarządzaj obowiązkami
                        </Button>
                    </Grid>
                </Grid>
            )}
            <Grid container justify={"space-between"} alignItems={"center"} direction={"row-reverse"}>
                <Grid item xs={12} sm={6}>
                    <ButtonGroup color="primary" variant="contained" className={classes.marginTitle} fullWidth>
                        <Button onClick={() => setViewMode("TODO")}
                                disabled={viewMode === "TODO"}>Do zrobienia</Button>
                        <Button onClick={() => setViewMode("USER")}
                                disabled={viewMode === "USER"}>Aktywne</Button>
                        <Button onClick={() => setViewMode("ALL")}
                                disabled={viewMode === "ALL"}>Historia</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography className={classes.marginTitle} variant={"h5"}>
                        Twoje obowiązki cykliczne:
                    </Typography>
                </Grid>
            </Grid>
            <Paper>
                <List>
                    {assignedFrequentChores.length === 0 ? (
                        <h3 align={"center"}>Brak obowiązków do wykonania :) </h3>) : null}
                    {assignedFrequentChores.map((assignedFrequentChore, index) => (
                        <div key={assignedFrequentChore.id}>
                            <ListItem>
                                <AssignedFrequentChore viewMode={viewMode}
                                                       assignedFrequentChore={assignedFrequentChore}/>
                                {(viewMode === "TODO") ? (
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete"
                                                    onClick={() => handleDone(assignedFrequentChore.id)}>
                                            <DoneIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>) : null}
                            </ListItem>
                            {index !== assignedFrequentChores.length - 1 ? (<Divider/>) : null}
                        </div>
                    ))}
                </List>
            </Paper>
        </Container>
    );
}

export default PageViewHoc(DisplayAssignedFrequentChores);