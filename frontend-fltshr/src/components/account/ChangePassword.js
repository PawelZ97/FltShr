import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import PageViewHoc from "../PageViewHoc";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {API_ADDRESS} from "../../utils/constants";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    signUpButton: {
        marginTop: 20
    }
}));

function ChangePassword() {
    let history = useHistory();

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        newPasswordRetype: ""
    });

    const [passordMatchError, setPassordMatchError] = useState(false);
    const [wrongOldPasswordError, setWrongOldPasswordError] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        history.push("/signin");
    };

    const handleTextFieldChange = name => event => {
        setPasswords({...passwords, [name]: event.target.value});
        setPassordMatchError(false);
        setWrongOldPasswordError(false);
    };

    function callChangePassword() {
        if (passwords.newPassword === passwords.newPasswordRetype) {
            setPassordMatchError(false);
            axios.post(API_ADDRESS + '/user/changepassword', passwords)
                .then(function (response) {
                    console.log("PasswordChanged Success, status: " + response.status);
                    if (response.data === "PassowrdChanged") {
                        setOpen(true);
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log("PasswordChanged Rejected, status: " + error.response.status);
                        if (error.response.status) {
                            setWrongOldPasswordError(true);
                        }
                    } else if (error.request) {
                        console.log("Can't connect to API");
                    } else {
                        console.log("Something went wrong");
                    }
                });
        } else {
            setPassordMatchError(true);
        }
    }

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography variant="h5">
                    Zmiana hasła
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        variant="outlined"
                        onChange={handleTextFieldChange('oldPassword')}
                        value={passwords.oldPassword}
                        autoComplete="username"
                        id="name"
                        label="Stare Hasło"
                        type="text"
                        fullWidth
                        error={wrongOldPasswordError}
                    />
                    <TextField
                        required
                        margin="normal"
                        variant="outlined"
                        onChange={handleTextFieldChange('newPassword')}
                        value={passwords.newPassword}
                        autoComplete="new-password"
                        id="hasło"
                        label="Nowe hasło"
                        type="password"
                        fullWidth
                        error={passordMatchError}
                    />
                    <TextField
                        required
                        margin="normal"
                        variant="outlined"
                        onChange={handleTextFieldChange('newPasswordRetype')}
                        value={passwords.newPasswordRetype}
                        autoComplete="new-password"
                        id="powtórzhasło"
                        label="Powtórz nowe hasło"
                        type="password"
                        fullWidth
                        error={passordMatchError}
                        helperText={passordMatchError ? ("Hasła nie są identyczne") : null}
                    />
                    <Button onClick={() => callChangePassword()} className={classes.signUpButton}
                            fullWidth variant="contained" color="primary" size={"large"}>Zmień hasło</Button>
                </form>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">{"Email został wysłany"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Twoje hasło zostało pozytywnie zmienione
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant={"contained"} color="primary" autoFocus fullWidth>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default PageViewHoc(ChangePassword);