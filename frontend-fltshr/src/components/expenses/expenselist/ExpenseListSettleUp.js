import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom"
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import Container from "@material-ui/core/Container";
import TopDialogBar from "../../TopDialogBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Paper, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import SettleUpUserTotal from "./SettleUpUserTotal";
import SettleUpTransfer from "./SettleUpTransfer";

const useStyles = makeStyles(theme => ({
    title: {
        marginTop: 20,
        marginBottom: 20
    },
    listMargin: {
        marginBottom: 30
    }
}));

function ExpenseListSettleUp() {
    let history = useHistory();
    let {listId} = useParams();
    const [settleUpSummary, setSettleUpSummary] = useState({
        totals: [],
        transfers: []
    });

    useEffect(() => {
        axios
            .get(API_ADDRESS + "/manager/expense/list/" + listId + "/settle", {
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
    }, [listId]);

    const handleSettleUp = () => {
        axios.patch(API_ADDRESS + "/manager/expense/list/" + listId, null, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                console.log("ExpenseList SettledUp, status: " + response.status);
                history.goBack();
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

    const handleCancel = () => {
        history.goBack();
    };

    const classes = useStyles();
    return (
        <div>
            <TopDialogBar text={"Podsumowanie listy"}/>
            <Container maxWidth="sm">
                <Typography className={classes.title} variant={"h5"}>Podsumowanie wydatków: </Typography>
                <Paper>
                    <List>
                        {settleUpSummary.totals.length === 0 ? (<h3 align={"center"}>Brak podsumowania</h3>) : null}
                        {settleUpSummary.totals.map((userTotal, index) => (
                            <div key={index}>
                                <ListItem>
                                    <SettleUpUserTotal userTotal={userTotal}/>
                                </ListItem>
                                {index !== settleUpSummary.totals.length - 1 ? (<Divider/>) : null}
                            </div>
                        ))}
                    </List>
                </Paper>
                <Typography className={classes.title} variant={"h5"}>Przelewy wyrównujące: </Typography>
                <Paper>
                    <List className={classes.listMargin}>
                        {settleUpSummary.transfers.length === 0 ? (<h3 align={"center"}>Brak podsumowania</h3>) : null}
                        {settleUpSummary.transfers.map((settleTransfer, index) => (
                            <div key={index}>
                                <ListItem>
                                    <SettleUpTransfer settleTransfer={settleTransfer}/>
                                </ListItem>
                                {index !== settleUpSummary.transfers.length - 1 ? (<Divider/>) : null}
                            </div>
                        ))}
                    </List>
                </Paper>
                <Grid container spacing={3} justify={"space-evenly"} alignItems={"center"}>
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
            </Container>
        </div>
    );
}

export default ExpenseListSettleUp;