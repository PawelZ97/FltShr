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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import TopDialogBar from "../TopDialogBar";
import Grid from "@material-ui/core/Grid";


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
        marginBottom: 20
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

    const handleOk = () => {
        console.log(props.listId);
        axios.post(API_ADDRESS + '/expense/list/' + props.listId + '/expense', expense, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                console.log("Expense created, status: " + response.status);
                setOpen(false);
                props.setUpdateFlag(!props.updateFlag);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log("Status not OK");
                    if (error.response.data.message === "Percents don't sum up to 100%") {
                        alert("Podane wartości nie sumują się do 100%. Należy skorygować podane dane.");
                    } else if (error.response.data.message === "Values don't sum up to Total") {
                        alert("Podane wartości nie sumują się do pełnej kwoty. Należy skorygować podane dane.");
                    }
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
        setExpense({
            name: "",
            total: 0,
            unequalType: null,
            description: "",
            expenseUnequals: []
        });
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const buttonsJustify = fullScreen ? "space-evenly" : "flex-end";
    const classes = useStyles();
    return (
        <div>
            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleOpen}>
                <AddIcon/>
            </Fab>
            <Dialog open={open}
                    onClose={handleCancel}
                    fullScreen={fullScreen}
                    fullWidth={true}
                    aria-labelledby="form-dialog-title">
                {fullScreen && (<TopDialogBar text={"Nowy wydatek"}/>)}
                {!fullScreen && (<DialogTitle id="form-dialog-title">Nowy wydatek</DialogTitle>)}
                <DialogContent>
                    <TextField
                        autoFocus
                        onChange={handleTextFieldChange('name')}
                        value={expense.name}
                        id="name"
                        label="Nazwa"
                        type="text"
                        fullWidth
                        className={classes.marginInput}
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
                        className={classes.marginInput}
                    />
                    <TextField
                        onChange={handleTextFieldChange('description')}
                        value={expense.description}
                        id="description"
                        label="Opis"
                        type="text"
                        fullWidth
                        className={classes.marginInput}
                    />
                    <FormControlLabel
                        className={classes.marginInput}
                        control={
                            <Switch checked={expense.unequalType !== null}
                                    color={"primary"}
                                    onChange={(event) => setIsEqual(!event.target.checked)}
                                    value="checkedA"/>
                        }
                        label="Podział nierównomierny"
                    />
                    {expense.unequalType ? (
                        <Paper className={classes.marginInput} fullWidth>
                            <ExpenseUnequalCreation unequalType={expense.unequalType}
                                                    setUnequalType={setUnequalType}
                                                    expenseUnequals={expense.expenseUnequals}
                                                    setExpenseUnequals={setExpenseUnequals}/>
                        </Paper>) : null}
                </DialogContent>
                <DialogActions>
                    <Grid container spacing={3} justify={buttonsJustify}>
                        <Grid item xs={6}>
                            <Button onClick={handleCancel} variant={"outlined"} color="secondary" fullWidth>
                                Anuluj
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={handleOk} variant="contained" color="primary" fullWidth>
                                Ok
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ExpenseCreation