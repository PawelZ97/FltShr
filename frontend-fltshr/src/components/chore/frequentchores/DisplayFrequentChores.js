import React, {useEffect, useState} from 'react';
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
import AppBarView from "../../AppBarView";
import FrequentChore from "./FrequentChore";

const useStyles = makeStyles(theme => ({
    title: {
        margin: 20
    }
}));

function DisplayFrequentChores(props) {
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
            {/*<FrequentChoreCreation updateFlag={updateFlag} setUpdateFlag={setUpdateFlag}/>*/}
        </Container>);
}

export default AppBarView(DisplayFrequentChores);