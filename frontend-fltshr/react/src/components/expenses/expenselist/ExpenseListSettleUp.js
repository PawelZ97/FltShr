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
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import SettleUpUserTotal from "./SettleUpUserTotal";
import SettleUpTransfer from "./SettleUpTransfer";

const useStyles = makeStyles(theme => ({
    title: {
        marginTop: 20,
        marginBottom: 20
    },
    bigButton: {
        height: 60,
        marginTop: 40,
        marginBottom: 40
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
        axios.get(API_ADDRESS + "/manager/expense/list/" + listId + "/settle", {
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

    const classes = useStyles();
    return (
        <div>
            <TopDialogBar text={"Podsumowanie listy"}/>
            <Container maxWidth="sm" className={classes.marginBottom}>
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
                    <List>
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
                <Button onClick={handleSettleUp} className={classes.bigButton}
                        variant="contained" color="primary" fullWidth>
                    Wyrównaj i zamknij listę
                </Button>
            </Container>
        </div>
    );
}

export default ExpenseListSettleUp;