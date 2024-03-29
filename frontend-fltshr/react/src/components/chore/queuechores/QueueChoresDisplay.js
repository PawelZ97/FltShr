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
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ArchiveIcon from '@material-ui/icons/Archive';
import QueueChore from "./QueueChore";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FabSpacer from "../../FabSpacer";

const useStyles = makeStyles(theme => ({
    title: {
        marginTop: 30,
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

function QueueChoresDisplay() {
    let history = useHistory();

    const [queueChores, setQueueChores] = useState([]);
    const [updateFlag, setUpdateFlag] = useState(false);

    useEffect(() => {
        axios.get(API_ADDRESS + "/manager/chores/queuechores", {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                setQueueChores(response.data);
                console.log("QueueChores loaded, status: " + response.status);
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

    function handleArchive(queueChoreId) {
        axios
            .delete(API_ADDRESS + "/manager/chores/queuechore/" + queueChoreId + "/archive", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                console.log("QueueChores archived, status: " + response.status);
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
                    {queueChores.length === 0 ? (
                        <h3 align={"center"}>Brak kolejek obowiązków</h3>) : null}
                    {queueChores.map((queueChore, index) => (
                        <div key={queueChore.id}>
                            <ListItem>
                                <QueueChore queueChore={queueChore}/>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete"
                                                onClick={() => handleArchive(queueChore.id)}>
                                        <ArchiveIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            {index !== queueChores.length - 1 ? (<Divider/>) : null}
                        </div>
                    ))}
                </List>
            </Paper>
            <Fab color="secondary" aria-label="add" className={classes.fab}
                 onClick={() => history.push("/manager/chores/queuechores/create")}>
                <AddIcon/>
            </Fab>
            <FabSpacer/>
        </Container>
    );
}

export default PageViewHoc(QueueChoresDisplay);