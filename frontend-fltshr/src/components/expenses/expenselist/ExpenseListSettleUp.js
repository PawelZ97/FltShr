import React, {useState} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";

function ExpenseListSettleUp(props) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSettleUp = () => {
        callSettleUp();
        setOpen(false);
    };

    function callSettleUp() {
        axios.patch(API_ADDRESS + "/manager/expense/list/" + props.expenseId, null, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                console.log("Expense Deleted, status: " + response.status);
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

    return (
        <div>
            <IconButton edge="end" aria-label="delete"
                        onClick={() => handleOpen()}>
                <AttachMoneyIcon/>
            </IconButton>
            <Dialog open={open}
                    onClose={handleCancel}
                    fullWidth={true}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Podsumowanie wyrównania</DialogTitle>
                <DialogContent>
                    Podsumowanie tutaj
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Anuluj
                    </Button>
                    <Button onClick={handleSettleUp} variant="contained" color="primary">
                        Wyrównaj i zamknij listę
                    </Button>
                </DialogActions>
            </Dialog></div>
    );
}

export default ExpenseListSettleUp;