import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import formatISO from 'date-fns/formatISO'
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

function FrequentChoreCreation(props) {
    const defaultFrequentChoreState = {
        name: "",
        description: "",
        durationDays: 0,
        frequencyDays: 0,
        user: {},
        date: ""
    };
    const [frequentChore, setFrequentChore] = useState(defaultFrequentChoreState);
    const [open, setOpen] = useState(false);
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
                setOpen(false);
                setFrequentChore(defaultFrequentChoreState);
                props.setUpdateFlag(!props.updateFlag);
                console.log("New FrequentChoreCreated, status: " + response.status);
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
        setFrequentChore(defaultFrequentChoreState);
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
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
                {fullScreen && (<TopDialogBar text={"Nowy obowiązek cykliczny"}/>)}
                {!fullScreen && (<DialogTitle id="form-dialog-title">Nowy obowiązek cykliczny</DialogTitle>)}
                <DialogContent>
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={selectedDate}
                                        onChange={handleDateChange}
                                        autoOk
                                        ampm={false}
                                        label="Czas pierwszego przypisania"
                                        fullWidth/>
                    </MuiPickersUtilsProvider>
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

export default FrequentChoreCreation;