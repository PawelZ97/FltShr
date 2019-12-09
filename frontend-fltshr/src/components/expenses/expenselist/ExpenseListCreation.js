import React, {useState} from 'react';
import {useHistory} from "react-router-dom"
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import TopDialogBar from "../../TopDialogBar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    marginInput: {
        marginTop: 20,
        marginBottom: 20,
    }
}));

function ExpenseListCreation() {
    let history = useHistory();

    const [listName, setListName] = useState("");

    const handleCreate = () => {
        axios.post(API_ADDRESS + '/expense/list', {name: listName}, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                console.log("New list created, status: " + response.status);
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
            <TopDialogBar text={"Nowa lista wydatków"}/>
            <Container maxWidth="sm">

                <TextField
                    onChange={event => setListName(event.target.value)}
                    value={listName}
                    autoFocus
                    id="name"
                    label="Nazwa nowej listy"
                    type="text"
                    fullWidth
                    className={classes.marginInput}
                />
                <Grid container spacing={3} justify={"space-evenly"} alignItems={"center"}>
                    <Grid item xs={6}>
                        <Button onClick={handleCancel} variant={"outlined"} color="secondary" fullWidth>
                            Anuluj
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleCreate} variant="contained" color="primary" fullWidth>
                            Utwórz
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default ExpenseListCreation