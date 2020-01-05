import React, {useState} from 'react';
import {useHistory} from "react-router-dom"
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import TopDialogBar from "../../TopDialogBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    marginInput: {
        marginTop: 50,
    },
    bigButton: {
        height: 60,
        marginTop: 40,
        marginBottom: 40
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
                <Button onClick={handleCreate} className={classes.bigButton}
                        variant="contained" color="primary" fullWidth>
                    Utwórz
                </Button>
            </Container>
        </div>
    );
}

export default ExpenseListCreation