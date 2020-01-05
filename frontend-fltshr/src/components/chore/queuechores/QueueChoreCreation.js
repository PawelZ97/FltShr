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
import TopDialogBar from "../../TopDialogBar";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
    marginInput: {
        marginTop: 20,
        marginBottom: 20,
    },
    bigButton: {
        height: 60,
        marginTop: 40,
        marginBottom: 40
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
                <Button onClick={handleCreate} className={classes.bigButton}
                        variant="contained" color="primary" fullWidth>
                    Utwórz nową kolejkę
                </Button>
            </Container>
        </div>
    );
}

export default QueueChoreCreation;