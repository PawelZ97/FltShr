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
import {API_ADDRESS} from "../../utils/constants";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import InputAdornment from "@material-ui/core/InputAdornment";


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

function ExpenseCreation(props) {
    const [open, setOpen] = useState(false);
    const [expense, setExpense] = useState({
        name: "",
        total: 0,
        isEqual: true,
        description: "brak",
        expenseUnequals: []
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    function callPostExpense() {
        console.log(props.listId);
        axios.post(API_ADDRESS + '/expense/list/' + props.listId + '/expense', expense, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                console.log("Nowy wydatek utworzony");
                console.log(response.data);
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
    }

    const handleClose = () => {
        callPostExpense();
        setOpen(false);
    };

    const setName = name => {
        setExpense(values => ({ ...values, name: name }));
    };

    const setTotal = total => {
        setExpense(values => ({ ...values, total: total }));
    };

    const setDescription = description => {
        setExpense(values => ({ ...values, description: description }));
    };

    const setIsEqual = isEqual => {
        setExpense(values => ({ ...values, isEqual: isEqual }));
    };

    const classes = useStyles();
    return (
        <div>
            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
                <AddIcon/>
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Wprowadź nowy wydatek</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        value={expense.name}
                        autoFocus
                        id="name"
                        label="Nazwa"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        onChange={(e) => setTotal(e.target.value)}
                        value={expense.total}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">zł</InputAdornment>
                        }}
                        id="total"
                        label="Kwota"
                        type="number"
                        fullWidth

                    />
                    <TextField
                        onChange={(e) => setDescription(e.target.value)}
                        value={expense.description}
                        id="description"
                        label="Opis"
                        type="text"
                        fullWidth
                    />
                    <FormControlLabel
                        control={
                            <Switch checked={expense.isEqual} onChange={(e) => setIsEqual(e.target.checked)} value="checkedA"/>
                        }
                        label="Równomiernie"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Anuluj
                    </Button>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ExpenseCreation