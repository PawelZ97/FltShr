import React, {useState} from 'react';
import AppBarView from "./AppBarView";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {API_ADDRESS} from "../utils/constants";

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

function SignUp() {
    const [registration, setRegistration] = useState({
        username: "",
        password: "",
        passwordRetype: "",
        email: ""
    });

    const [passordMatchError, setPassordMatchError] = useState(false);
    const [loginEmailUsedError, setLoginEmailUsedError] = useState(false);

    const handleTextFieldChange = name => event => {
        setRegistration({...registration, [name]: event.target.value});
        setLoginEmailUsedError(false);
        setPassordMatchError(false);
    };

    function callSignUp() {
        if (registration.password === registration.passwordRetype) {
            setPassordMatchError(false);
            axios.post(API_ADDRESS + '/register', {
                username: registration.username,
                password: registration.password,
                email: registration.email
            })
                .then(function (response) {
                    console.log("SignUp Succesfull, status: " + response.status);
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log("SignUn Rejected, status: " + error.response.status);
                        if (error.response.status) {
                            setLoginEmailUsedError(true);
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
                    Rejestracja
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        variant="outlined"
                        onChange={handleTextFieldChange('username')}
                        value={registration.username}
                        id="name"
                        label="Nazwa użytkownika"
                        type="text"
                        fullWidth
                        error={loginEmailUsedError}
                    />
                    <TextField
                        required
                        margin="normal"
                        variant="outlined"
                        onChange={handleTextFieldChange('password')}
                        value={registration.password}
                        id="hasło"
                        label="Hasło"
                        type="password"
                        fullWidth
                        error={passordMatchError}
                    />
                    <TextField
                        required
                        margin="normal"
                        variant="outlined"
                        onChange={handleTextFieldChange('passwordRetype')}
                        value={registration.passwordRetype}
                        id="powtórzhasło"
                        label="Powtórz hasło"
                        type="password"
                        fullWidth
                        error={passordMatchError}
                        helperText={passordMatchError ? ("Hasła nie są identyczne") : null}
                    />
                    <TextField
                        required
                        margin="normal"
                        variant="outlined"
                        onChange={handleTextFieldChange('email')}
                        value={registration.email}
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        error={loginEmailUsedError}
                        helperText={loginEmailUsedError ? ("Login i/lub email już w użyciu") : null}
                    />
                    <Button onClick={() => callSignUp()} className={classes.signUpButton}
                            fullWidth variant="contained" color="primary" size={"large"}>Zarejestruj się</Button>
                </form>
            </div>
        </Container>
    );
}

export default AppBarView(SignUp);