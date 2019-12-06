import React from "react";
import {Table, Typography} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";

function Expense(props) {
    return (
        <div>
            <Typography variant={"h5"}>
                {props.expense.name}
            </Typography>
            <Typography>
                Opis: {props.expense.description}
            </Typography>
            <Typography>
                Kwota: {props.expense.total}zł
            </Typography>
            <Typography>
                Płacił: {props.expense.paidBy.username}
            </Typography>
            <Typography>
                Data zakupu: {props.expense.boughtDate.slice(0, 19).replace("T", " ")}
            </Typography>
            {props.expense.unequalType === null ? null : (
                <div>
                    <Typography>
                        Podział:
                    </Typography>
                    <Paper>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Kto</TableCell>
                                    {props.expense.unequalType !== null ? (
                                        <TableCell align="right">
                                            {props.expense.unequalType === "PERCENT" && ("Procent")}
                                            {props.expense.unequalType === "UNIT" && ("Jednostek")}
                                        </TableCell>
                                    ) : null}
                                    <TableCell align="right">
                                        Kwota
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.expense.expenseUnequals.map(expenseUnequal => (
                                    <TableRow key={expenseUnequal.id}>
                                        <TableCell component="th" scope="row">
                                            {expenseUnequal.usedBy.username}
                                        </TableCell>
                                        {props.expense.unequalType !== null ? (
                                            <TableCell align="right">
                                                {props.expense.unequalType === "PERCENT" && (expenseUnequal.percent + "%")}
                                                {props.expense.unequalType === "UNIT" && (expenseUnequal.units)}
                                            </TableCell>
                                        ) : null}
                                        <TableCell align="right">
                                            {expenseUnequal.value}zł
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            )}
        </div>
    );
}

export default Expense