import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_ADDRESS} from "../../utils/constants";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
    fab: {
        margin: 0,
        top: "auto",
        right: 50,
        bottom: 50,
        left: "auto",
        position: "fixed"
    },
    marginInput: {
        marginTop: 20,
        marginBottom: 20,
    }
}));

function ShoppingEntryCreation(props) {
    const defaultShoppingItemState = {
        id: 0,
        name: "",
        description: ""
    };
    const [shoppingItem, setShoppingItem] = useState(defaultShoppingItemState);
    const defaultCustomShoppingItemState = {
        id: null,
        name: "",
        description: ""
    };
    const [customShoppingItem, setCustomShoppingItem] = useState(defaultCustomShoppingItemState);
    const [open, setOpen] = useState(false);
    const [shoppingItems, setShoppingItems] = useState([]);

    const handleInputChange = value => {
        setCustomShoppingItem({...customShoppingItem, name: value});
    };

    const handleCustomDescription = value => {
        setCustomShoppingItem({...customShoppingItem, description: value});
    };

    useEffect(() => {
        axios
            .get(API_ADDRESS + "/shopping/items", {
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
    }, [props.updateFlag]);

    const handleCreate = () => {
        let createShoppingEntry = {};
        if (shoppingItem.name === customShoppingItem.name) {
            createShoppingEntry = shoppingItem;
        } else {
            createShoppingEntry = customShoppingItem;
        }
        axios.post(API_ADDRESS + "/shopping/list/" + props.listId + "/item", createShoppingEntry, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                setOpen(false);
                setShoppingItem(defaultShoppingItemState);
                setCustomShoppingItem(defaultCustomShoppingItemState);
                props.setUpdateFlag(!props.updateFlag);
                console.log("New ShoppingItemCreated, status: " + response.status);
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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setShoppingItem(defaultShoppingItemState);
        setCustomShoppingItem(defaultCustomShoppingItemState);
        setOpen(false);
    };

    const classes = useStyles();
    return (
        <div>
            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleOpen}>
                <AddIcon/>
            </Fab>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Utwórz nowy obowiązek kolejkowy</DialogTitle>
                <DialogContent>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Anuluj
                    </Button>
                    <Button onClick={handleCreate} variant="contained" color="primary">
                        Utwórz
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ShoppingEntryCreation;