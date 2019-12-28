import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom"
import Container from "@material-ui/core/Container";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ArchiveIcon from '@material-ui/icons/Archive';
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import PageViewHoc from "../../PageViewHoc";
import FrequentChore from "./FrequentChore";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

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

function FrequentChoresDisplay() {
    let history = useHistory();

    const [frequentChores, setFrequentChores] = useState([]);
    const [updateFlag, setUpdateFlag] = useState(false);

    useEffect(() => {
        axios
            .get(API_ADDRESS + "/manager/chores/frequentchores", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                setFrequentChores(response.data);
                console.log("FrequentChores loaded, status: " + response.status);
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

    function handleArchive(frequentChoreId) {
        axios
            .delete(API_ADDRESS + "/manager/chores/frequentchore/" + frequentChoreId + "/archive", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                console.log("FrequentChore archived, status: " + response.status);
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
                Kolejki obowiązków:
            </Typography>
            <Paper>
                <List>
                    {frequentChores.length === 0 ? (
                        <h3 align={"center"}>Brak obowiązków cyklicznych</h3>) : null}
                    {frequentChores.map((frequentChore, index) => (
                        <div key={frequentChore.id}>
                            <ListItem>
                                <FrequentChore frequentChore={frequentChore}/>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete"
                                                onClick={() => handleArchive(frequentChore.id)}>
                                        <ArchiveIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            {index !== frequentChores.length - 1 ? (<Divider/>) : null}
                        </div>
                    ))}
                </List>
            </Paper>
            <Fab color="secondary" aria-label="add" className={classes.fab}
                 onClick={() => history.push("/manager/chores/frequentchores/create")}>
                <AddIcon/>
            </Fab>
        </Container>);
}

export default PageViewHoc(FrequentChoresDisplay);