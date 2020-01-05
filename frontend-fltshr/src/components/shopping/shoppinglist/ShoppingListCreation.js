import React, {useState} from 'react';
import {useHistory} from "react-router-dom"
import {makeStyles} from "@material-ui/core";
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TopDialogBar from "../../TopDialogBar";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
    marginInput: {
        marginTop: 20,
        marginBottom: 20,
    },
    bigButton: {
        height: 60,
        marginTop: 40,
        marginBottom: 40
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
                <Button onClick={handleCreate} className={classes.bigButton}
                        variant="contained" color="primary" fullWidth>
                    Utwórz nową listę
                </Button>
            </Container>
        </div>
    );
}

export default ShoppingListCreation;