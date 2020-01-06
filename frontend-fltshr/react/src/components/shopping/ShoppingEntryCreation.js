import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom"
import axios from "axios";
import {API_ADDRESS} from "../../utils/constants";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TopDialogBar from "../TopDialogBar";
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

function ShoppingEntryCreation() {
    let history = useHistory();
    let {listId} = useParams();
    const [shoppingItem, setShoppingItem] = useState({
        id: 0,
        name: "",
        description: ""
    });
    const [customShoppingItem, setCustomShoppingItem] = useState({
        id: null,
        name: "",
        description: ""
    });
    const [shoppingItems, setShoppingItems] = useState([]);

    const handleInputChange = value => {
        setCustomShoppingItem({...customShoppingItem, name: value});
    };

    const handleCustomDescription = value => {
        setCustomShoppingItem({...customShoppingItem, description: value});
    };

    useEffect(() => {
        axios.get(API_ADDRESS + "/shopping/items", {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                setShoppingItems(response.data);
                console.log("ShoppingItems loaded, status: " + response.status);
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

    const handleCreate = () => {
        let createShoppingEntry = {};
        if (shoppingItem.name === customShoppingItem.name) {
            createShoppingEntry = shoppingItem;
        } else {
            createShoppingEntry = customShoppingItem;
        }
        axios.post(API_ADDRESS + "/shopping/list/" + listId + "/item", createShoppingEntry, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                console.log("New ShoppingItemCreated, status: " + response.status);
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
            <TopDialogBar text={"Nowy wpis listy"}/>
            <Container maxWidth="sm">
                <Autocomplete
                    freeSolo
                    id="ShoppipngItemPick"
                    disableClearable
                    onChange={(event, value) => setShoppingItem(value)}
                    onInputChange={(event, value) => handleInputChange(value)}
                    options={shoppingItems}
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Przedmiot do dodania"
                            margin="normal"
                            fullWidth
                            autoFocus
                            InputProps={{...params.InputProps, type: 'search'}}
                        />
                    )}
                />
                {shoppingItem.name === customShoppingItem.name ? (
                    <TextField
                        value={shoppingItem.description}
                        disabled
                        id="name"
                        label="Opis"
                        type="text"
                        fullWidth
                        className={classes.marginInput}/>
                ) : (
                    <TextField
                        autoFocus
                        onChange={(e) => handleCustomDescription(e.target.value)}
                        value={customShoppingItem.description}
                        id="name"
                        label="Opis"
                        type="text"
                        fullWidth
                        className={classes.marginInput}/>
                )}
                <Button onClick={handleCreate} className={classes.bigButton}
                        variant="contained" color="primary" fullWidth>
                    Utwórz nowy wpis
                </Button>
            </Container>
        </div>
    );
}

export default ShoppingEntryCreation;