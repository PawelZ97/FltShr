import React, {useState} from 'react';
import {useHistory, useParams} from "react-router-dom"
import axios from "axios";
import {API_ADDRESS} from "../../utils/constants";
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TopDialogBar from "../TopDialogBar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ExpenseUnequalCreation from "./ExpenseUnequalCreation";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
    marginInput: {
        marginTop: 20,
        marginBottom: 20
    },
    bigButton: {
        height: 60,
        marginTop: 40,
        marginBottom: 40
    }
}));

function ExpenseCreation() {
    let history = useHistory();
    let {listId} = useParams();
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
        axios.post(API_ADDRESS + '/expense/list/' + listId + '/expense', expense, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                console.log("Expense created, status: " + response.status);
                history.goBack();
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


    const classes = useStyles();
    return (
        <div>
            <TopDialogBar text={"Nowy wydatek"}/>
            <Container maxWidth="sm">
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
                <Button onClick={handleOk} className={classes.bigButton} variant="contained" color="primary" fullWidth>
                    Utwórz nowy wydatek
                </Button>
            </Container>
        </div>
    );
}

export default ExpenseCreation;