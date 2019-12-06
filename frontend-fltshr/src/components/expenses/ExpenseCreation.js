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
import ExpenseUnequalCreation from "./ExpenseUnequalCreation";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles(theme => ({
    fab: {
        margin: 0,
        top: "auto",
        right: 50,
        bottom: 50,
        left: "auto",
        position: "fixed"
    },
    padInput: {
        paddingTop: 20,
        paddingBottom: 20,
    }
}));

function ExpenseCreation(props) {
    const [open, setOpen] = useState(false);
    const [expense, setExpense] = useState({
        name: "",
        total: 0,
        unequalType: null,
        description: "",
        expenseUnequals: []
    });

    const setIsEqual = checked => {
        if (!checked) {
            setExpense(values => ({...values, unequalType: "VALUE"}));
        } else {
            setExpense(values => ({...values, unequalType: null}));
        }
    };

    const setUnequalType = unequalType => {
        setExpense(values => ({...values, unequalType: unequalType}));
    };

    function setExpenseUnequals(expenseUnequals) {
        setExpense(values => ({...values, expenseUnequals: expenseUnequals}));
    }

    const handleTextFieldChange = name => event => {
        setExpense({...expense, [name]: event.target.value});
    };

    function callPostExpense() {
        console.log(props.listId);
        axios.post(API_ADDRESS + '/expense/list/' + props.listId + '/expense', expense, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                console.log("Expense created, status: " + response.status);
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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        setExpense({
            name: "",
            total: 0,
            unequalType: null,
            description: "",
            expenseUnequals: []
        });
    };

    const handleOk = () => {
        callPostExpense();
        setOpen(false);
    };

    const classes = useStyles();
    return (
        <div>
            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleOpen}>
                <AddIcon/>
            </Fab>
            <Dialog open={open}
                    onClose={handleCancel}
                    fullWidth={true}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Wprowadź nowy wydatek</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        onChange={handleTextFieldChange('name')}
                        value={expense.name}
                        id="name"
                        label="Nazwa"
                        type="text"
                        fullWidth
                        className={classes.padInput}
                    />
                    <TextField
                        onChange={handleTextFieldChange('total')}
                        value={expense.total}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">zł</InputAdornment>
                        }}
                        id="total"
                        label="Kwota"
                        type="number"
                        fullWidth
                        className={classes.padInput}
                    />
                    <TextField
                        onChange={handleTextFieldChange('description')}
                        value={expense.description}
                        id="description"
                        label="Opis"
                        type="text"
                        fullWidth
                        className={classes.padInput}
                    />
                    <FormControlLabel
                        className={classes.padInput}
                        control={
                            <Switch checked={expense.unequalType === null}
                                    onChange={(event) => setIsEqual(event.target.checked)}
                                    value="checkedA"/>
                        }
                        label="Równomiernie"
                    />
                    {expense.unequalType ? (
                        <Paper>
                            <ExpenseUnequalCreation unequalType={expense.unequalType}
                                                    setUnequalType={setUnequalType}
                                                    expenseUnequals={expense.expenseUnequals}
                                                    setExpenseUnequals={setExpenseUnequals}/>
                        </Paper>) : null}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Anuluj
                    </Button>
                    <Button onClick={handleOk} variant="contained" color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ExpenseCreation