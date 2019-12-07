import React, {useEffect, useState} from 'react';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: 0,
        top: "auto",
        right: 50,
        bottom: 50,
        left: "auto",
        position: "fixed"
    },
    marginInput: {
        marginTop: 20,
        marginBottom: 20,
    }
}));

function QueueChoreCreation(props) {
    const defaultQueueChoreState = {
        name: "",
        description: "",
        firstUser: {}
    };
    const [queueChore, setQueueChore] = useState(defaultQueueChoreState);
    const [open, setOpen] = useState(false);
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
                setOpen(false);
                setQueueChore(defaultQueueChoreState);
                props.setUpdateFlag(!props.updateFlag);
                console.log("New QueueChoreCreated, status: " + response.status);
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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setQueueChore(defaultQueueChoreState);
        setOpen(false);
    };

    const classes = useStyles();
    return (
        <div>
            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleOpen}>
                <AddIcon/>
            </Fab>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Utwórz nowy obowiązek kolejkowy</DialogTitle>
                <DialogContent>
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
                        autoFocus
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Anuluj
                    </Button>
                    <Button onClick={handleCreate} variant="contained" color="primary">
                        Utwórz
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default QueueChoreCreation;