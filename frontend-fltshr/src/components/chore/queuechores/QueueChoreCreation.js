import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import TopDialogBar from "../../TopDialogBar";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
    marginInput: {
        marginTop: 20,
        marginBottom: 20,
    }
}));

function QueueChoreCreation() {
    let history = useHistory();
    const [queueChore, setQueueChore] = useState({
        name: "",
        description: "",
        firstUser: {}
    });
    const [usersList, setUserList] = useState([]);

    const handleTextFieldChange = name => event => {
        setQueueChore({...queueChore, [name]: event.target.value});
    };

    useEffect(() => {
        axios
            .get(API_ADDRESS + "/users", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                setUserList(response.data);
                console.log("Users loaded, status: " + response.status);
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
    }, []);

    const handleCreate = () => {
        axios.post(API_ADDRESS + '/manager/chores/queuechore', queueChore, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                console.log("New QueueChoreCreated, status: " + response.status);
                history.goBack();
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
    };

    const handleCancel = () => {
        history.goBack();
    };

    const classes = useStyles();
    return (
        <div>
            <TopDialogBar text={"Nowa kolejka"}/>
            <Container maxWidth="sm">
                <TextField
                    onChange={handleTextFieldChange('name')}
                    value={queueChore.name}
                    autoFocus
                    id="name"
                    label="Nazwa obowiązku"
                    type="text"
                    fullWidth
                    className={classes.marginInput}
                />
                <TextField
                    onChange={handleTextFieldChange('description')}
                    value={queueChore.description}
                    id="description"
                    label="Opis"
                    type="text"
                    fullWidth
                    className={classes.marginInput}
                />
                <div className={classes.marginInput}>
                    <InputLabel id="demo-simple-select-label">Pierwszy użytkownik</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={queueChore.firstUser}
                        onChange={handleTextFieldChange('firstUser')}
                        fullWidth
                    >
                        {usersList.map(user => (
                            <MenuItem key={user.id} value={user}>{user.username}</MenuItem>))}
                    </Select>
                </div>
                <Grid container spacing={3} justify={"space-evenly"} alignItems={"center"}>
                    <Grid item xs={6}>
                        <Button onClick={handleCancel} variant={"outlined"} color="secondary" fullWidth>
                            Anuluj
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleCreate} variant="contained" color="primary" fullWidth>
                            Utwórz
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default QueueChoreCreation;