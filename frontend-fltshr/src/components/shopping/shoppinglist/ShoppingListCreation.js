import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TopDialogBar from "../../TopDialogBar";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

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

function ShoppingListCreation(props) {
    const [open, setOpen] = useState(false);
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
                setOpen(false);
                props.setUpdateFlag(!props.updateFlag);
                console.log("New ShoppingList created, status: " + response.status);
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
        setOpen(false);
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const buttonsJustify = fullScreen ? "space-evenly" : "flex-end";
    const classes = useStyles();
    return (
        <div>
            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleOpen}>
                <AddIcon/>
            </Fab>
            <Dialog open={open} fullScreen={fullScreen} onClose={handleCancel} aria-labelledby="form-dialog-title">
                {fullScreen && (<TopDialogBar text={"Nowa lista zakupów"}/>)}
                {!fullScreen && (<DialogTitle id="form-dialog-title">Nowa lista zakupów</DialogTitle>)}
                <DialogContent>
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
                </DialogContent>
                <DialogActions>
                    <Grid container spacing={3} justify={buttonsJustify} alignItems={"center"}>
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
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ShoppingListCreation;