import React, {useState} from 'react';
import {useHistory} from "react-router-dom"
import {makeStyles} from "@material-ui/core";
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TopDialogBar from "../../TopDialogBar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
    marginInput: {
        marginTop: 20,
        marginBottom: 20,
    }
}));

function ShoppingListCreation(props) {
    let history = useHistory();

    const [shoppingList, setShoppingList] = useState({
        name: "",
        description: ""
    });

    const handleTextFieldChange = name => event => {
        setShoppingList({...shoppingList, [name]: event.target.value});
    };

    const handleCreate = () => {
        axios.post(API_ADDRESS + '/shopping/list', shoppingList, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                console.log("New ShoppingList created, status: " + response.status);
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
            <TopDialogBar text={"Nowa lista zakupów"}/>
            <Container maxWidth="sm">
                <TextField
                    onChange={handleTextFieldChange("name")}
                    value={shoppingList.name}
                    autoFocus
                    id="name"
                    label="Nazwa nowej listy"
                    type="text"
                    fullWidth
                    className={classes.marginInput}
                />
                <TextField
                    onChange={handleTextFieldChange("description")}
                    value={shoppingList.description}
                    id="description"
                    label="Opis"
                    type="text"
                    fullWidth
                    className={classes.marginInput}
                />
                <Grid container spacing={3} justify={"space-evenly"} alignItems={"center"}>
                    <Grid item xs={6}>
                        <Button onClick={handleCancel} variant="outlined" color="secondary" fullWidth>
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

export default ShoppingListCreation;