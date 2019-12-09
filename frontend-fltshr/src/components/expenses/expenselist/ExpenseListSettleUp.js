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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import TopDialogBar from "../../TopDialogBar";
import Grid from "@material-ui/core/Grid";

function ExpenseListSettleUp(props) {
    const [open, setOpen] = useState(false);
    const [settleUpSummary, setSettleUpSummary] = useState([]);

    const handleOpen = () => {
        callSettleUpSummary();
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    function callSettleUpSummary() {
        axios
            .get(API_ADDRESS + "/manager/expense/list/" + props.listId + "/settle", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                setSettleUpSummary(response.data);
                console.log("ExpenseList SettledUpSumary loaded, status: " + response.status);
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
    }

    const handleSettleUp = () => {
        axios.patch(API_ADDRESS + "/manager/expense/list/" + props.listId, null, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                setOpen(false);
                props.setUpdateFlag(!props.updateFlag);
                console.log("ExpenseList SettledUp, status: " + response.status);
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

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const buttonsJustify = fullScreen ? "space-evenly" : "flex-end";
    return (
        <div>
            <IconButton edge="end" aria-label="delete"
                        onClick={() => handleOpen()}>
                <AttachMoneyIcon/>
            </IconButton>
            <Dialog open={open}
                    onClose={handleCancel}
                    fullWidth={true}
                    fullScreen={fullScreen}
                    aria-labelledby="form-dialog-title">
                {fullScreen && (<TopDialogBar text={"Podsumowanie listy"}/>)}
                {!fullScreen && (<DialogTitle id="form-dialog-title">Podsumowanie listy</DialogTitle>)}
                <DialogContent>
                    <List>
                        {settleUpSummary.length === 0 ? (<h3 align={"center"}>Brak podsumowania</h3>) : null}
                        {settleUpSummary.map((summaryEntry, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={summaryEntry.user.username}
                                    secondary={"Total: " + summaryEntry.total}/>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Grid container spacing={3} justify={buttonsJustify} alignItems={"center"}>
                        <Grid item xs={6}>
                            <Button onClick={handleCancel} variant="outlined" color="secondary" fullWidth>
                                Anuluj
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={handleSettleUp} variant="contained" color="primary" fullWidth>
                                Wyrównaj i zamknij listę
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog></div>
    );
}

export default ExpenseListSettleUp;