import React, {useEffect, useState} from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Table} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {API_ADDRESS} from "../../utils/constants";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

function ExpenseUnequalCreation(props) {

    const [usersList, setUserList] = useState([]);

    const [user, setUser] = useState({});
    const [valuePercentUnit, setValuePercentUnit] = useState(0);
    const [typeUnits, setTypeUnits] = useState(false);

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
        if (typeUnits) {
            createdUnequal = {
                usedBy: user,
                units: valuePercentUnit
            };
        } else {
            createdUnequal = {
                usedBy: user,
                percent: valuePercentUnit
            };
        }
        let expenseUnequalsCreate = [...props.expenseUnequals];
        expenseUnequalsCreate.push(createdUnequal);
        props.setExpenseUnequals(expenseUnequalsCreate);
        setUser({});
        setValuePercentUnit(0);
    };

    function handleDelete(index) {
        let expenseUnequalsDelete = [...props.expenseUnequals];
        expenseUnequalsDelete.splice(index, 1);
        props.setExpenseUnequals(expenseUnequalsDelete);
    }

    const handleTypeUnitsChanege = () => {
        setTypeUnits(!typeUnits);
    };

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Kto</TableCell>
                        {typeUnits ? (<TableCell>Jednostek</TableCell>)
                            : (<TableCell>Procent</TableCell>)}
                        <TableCell align="right">
                            <Button variant="contained" color="primary" disabled={props.expenseUnequals.length > 0}
                                    fullWidth onClick={handleTypeUnitsChanege}>
                                {typeUnits ? ("Procenty") : ("Jednostki")}
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.expenseUnequals.map((expenseUnequal, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {expenseUnequal.usedBy.username}
                            </TableCell>
                            {typeUnits ? (<TableCell>{expenseUnequal.units}</TableCell>)
                                : (<TableCell>{expenseUnequal.percent}%</TableCell>)}
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
                                onChange={event => setValuePercentUnit(event.target.value)}
                                value={valuePercentUnit}
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