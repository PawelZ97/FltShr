import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core";
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";


const useStyles = makeStyles(theme => ({
    fab: {
        margin: 0,
        top: "auto",
        right: 50,
        bottom: 50,
        left: "auto",
        position: "fixed"
    }
}));

function ExpenseListCreation(props) {
    const [open, setOpen] = useState(false);
    const [listName, setListName] = useState("");

    const handleCreate = () => {
        axios.post(API_ADDRESS + '/expense/list', {name: listName}, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                setOpen(false);
                props.setUpdateFlag(!props.updateFlag);
                console.log("New list created, status: " + response.status);
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
        setOpen(false);
    };

    const classes = useStyles();
    return (
        <div>
            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleOpen}>
                <AddIcon/>
            </Fab>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Utwórz nową listę wydatków</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={event => setListName(event.target.value)}
                        value={listName}
                        autoFocus
                        id="name"
                        label="Nazwa nowej listy"
                        type="text"
                        fullWidth
                    />
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

export default ExpenseListCreation