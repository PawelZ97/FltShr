import React, {useEffect, useState} from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Table} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import {API_ADDRESS} from "../../utils/constants";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";

function ExpenseUnequalCreation(props) {

    const [usersList, setUserList] = useState([]);

    const [user, setUser] = useState({});
    const [inputValue, setInputValue] = useState(0);

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

    const handleUserChange = event => {
        setUser(event.target.value);
    };

    const handleAdd = () => {
        let createdUnequal = {};
        if (props.unequalType === "VALUE") {
            createdUnequal = {
                usedBy: user,
                value: inputValue,
            };
        } else if (props.unequalType === "PERCENT") {
            createdUnequal = {
                usedBy: user,
                percent: inputValue
            };
        } else if (props.unequalType === "UNIT") {
            createdUnequal = {
                usedBy: user,
                units: inputValue
            };
        }
        let expenseUnequalsCreate = [...props.expenseUnequals];
        expenseUnequalsCreate.push(createdUnequal);
        props.setExpenseUnequals(expenseUnequalsCreate);
        setUser({});
        setInputValue(0);
    };

    function handleDelete(index) {
        let expenseUnequalsDelete = [...props.expenseUnequals];
        expenseUnequalsDelete.splice(index, 1);
        props.setExpenseUnequals(expenseUnequalsDelete);
    }

    const handleUnequalTypeChange = name => () => {
        props.setUnequalType(name);
    };

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Kto</TableCell>
                        <TableCell>
                            {props.unequalType === "VALUE" && ("Kwota")}
                            {props.unequalType === "PERCENT" && ("Procent")}
                            {props.unequalType === "UNIT" && ("Jednostek")}
                        </TableCell>
                        <TableCell align="right">
                            <ButtonGroup color="primary" aria-label="outlined primary button group"
                                         disabled={props.expenseUnequals.length > 0}>
                                <Button onClick={handleUnequalTypeChange("VALUE")}
                                        disabled={props.unequalType === "VALUE"}>Kwota</Button>
                                <Button onClick={handleUnequalTypeChange("PERCENT")}
                                        disabled={props.unequalType === "PERCENT"}>Procent</Button>
                                <Button onClick={handleUnequalTypeChange("UNIT")}
                                        disabled={props.unequalType === "UNIT"}>Jednostki</Button>
                            </ButtonGroup>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.expenseUnequals.map((expenseUnequal, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {expenseUnequal.usedBy.username}
                            </TableCell>
                            <TableCell>
                                {props.unequalType === "VALUE" && (expenseUnequal.value) + "zł"}
                                {props.unequalType === "PERCENT" && (expenseUnequal.percent) + "%"}
                                {props.unequalType === "UNIT" && (expenseUnequal.units)}
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                <IconButton onClick={() => handleDelete(index)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow key={"input"}>
                        <TableCell component="th" scope="row">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={user}
                                onChange={handleUserChange}
                                fullWidth
                            >
                                {usersList.map(user => (
                                    <MenuItem key={user.id} value={user}>{user.username}</MenuItem>))}
                            </Select>
                        </TableCell>
                        <TableCell>
                            <TextField
                                onChange={event => setInputValue(event.target.value)}
                                value={inputValue}
                                autoFocus
                                id="name"
                                type="number"
                                fullWidth
                            />
                        </TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" fullWidth startIcon={<AddIcon/>}
                                    onClick={handleAdd}>
                                Dodaj
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default ExpenseUnequalCreation;