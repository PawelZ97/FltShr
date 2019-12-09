import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom"
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import Container from "@material-ui/core/Container";
import TopDialogBar from "../../TopDialogBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

function ExpenseListSettleUp() {
    let history = useHistory();
    let {listId} = useParams();
    const [settleUpSummary, setSettleUpSummary] = useState([]);

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

    return (
        <div>
            <TopDialogBar text={"Podsumowanie listy"}/>
            <Container maxWidth="sm">
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