import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom"
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import formatISO from 'date-fns/formatISO'
import TopDialogBar from "../../TopDialogBar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles(theme => ({
    marginInput: {
        marginTop: 20,
        marginBottom: 20,
    }
}));

function FrequentChoreCreation(props) {
    let history = useHistory();
    const [frequentChore, setFrequentChore] = useState({
        name: "",
        description: "",
        durationDays: 0,
        frequencyDays: 0,
        user: {},
        date: ""
    });
    const [usersList, setUserList] = useState([]);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
        try {
            setFrequentChore({...frequentChore, date: formatISO(date)});
        } catch (err) {
            console.log(err);
        }
    };

    const handleTextFieldChange = name => event => {
        setFrequentChore({...frequentChore, [name]: event.target.value});
    };

    useEffect(() => {
        axios
            .get(API_ADDRESS + "/users", {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                setUserList(response.data);
                console.log("Users loaded, status: " + response.status);
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
        axios.post(API_ADDRESS + '/manager/chores/frequentchore', frequentChore, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                console.log("New FrequentChoreCreated, status: " + response.status);
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
            <TopDialogBar text={"Nowy obowiązek cykliczny"}/>
            <Container maxWidth="sm">
                <TextField
                    onChange={handleTextFieldChange('name')}
                    value={frequentChore.name}
                    autoFocus
                    id="name"
                    label="Nazwa obowiązku"
                    type="text"
                    fullWidth
                    className={classes.marginInput}
                />
                <TextField
                    onChange={handleTextFieldChange('description')}
                    value={frequentChore.description}
                    id="description"
                    label="Opis"
                    type="text"
                    fullWidth
                    className={classes.marginInput}
                />
                <TextField
                    onChange={handleTextFieldChange('durationDays')}
                    value={frequentChore.durationDays}
                    id="durationDays"
                    label="Liczba dni na wykonanie"
                    type="number"
                    fullWidth
                    className={classes.marginInput}
                />
                <TextField
                    onChange={handleTextFieldChange('frequencyDays')}
                    value={frequentChore.frequencyDays}
                    id="frequencyDays"
                    label="Liczba dni ponownej aktywacji"
                    type="number"
                    fullWidth
                    className={classes.marginInput}
                />
                <div className={classes.marginInput}>
                    <InputLabel id="demo-simple-select-label">Pierwszy użytkownik</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={frequentChore.firstUser}
                        onChange={handleTextFieldChange('user')}
                        fullWidth
                    >
                        {usersList.map(user => (
                            <MenuItem key={user.id} value={user}>{user.username}</MenuItem>))}
                    </Select>
                </div>
                <div className={classes.marginInput}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={selectedDate}
                                        onChange={handleDateChange}
                                        autoOk
                                        ampm={false}
                                        label="Czas pierwszego przypisania"
                                        fullWidth/>
                    </MuiPickersUtilsProvider>
                </div>
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

export default FrequentChoreCreation;