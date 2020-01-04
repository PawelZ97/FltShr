import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import {API_ADDRESS} from "../../utils/constants";
import PageViewHoc from "../PageViewHoc";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";

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
    signInButton: {
        marginTop: 20
    },
    signUpButton: {
        marginTop: 50
    }
}));


function SignIn() {
    let history = useHistory();

    const [usernameForm, setUsernameForm] = useState("");
    const [passwordForm, setPasswordForm] = useState("");

    const [loginError, setLoginError] = useState(false);

    function callLogin() {
        axios.post(API_ADDRESS + '/login', {
            username: usernameForm,
            password: passwordForm
        })
            .then(function (response) {
                localStorage.setItem("authToken", response.headers.authorization);
                console.log("Login Succesfull, status: " + response.status);
                history.push("/dashboard");
            })
            .catch(function (error) {
                if (error.response) {
                    setLoginError(true);
                    console.log("Login Rejected, status: " + error.response.status);
                } else if (error.request) {
                    console.log("Can't connect to API");
                } else {
                    console.log("Something went wrong");
                }
            });
    }

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography variant="h5">
                    Zaloguj się
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        onChange={event => setUsernameForm(event.target.value)}
                        value={usernameForm}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoComplete="login"
                        autoFocus
                        error={loginError}

                    />
                    <TextField
                        onChange={event => setPasswordForm(event.target.value)}
                        value={passwordForm}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Hasło"
                        type="password"
                        id="password"
                        error={loginError}
                        helperText={loginError ? ("Login i/lub hasło niepoprawne") : null}
                    />
                    <Button onClick={(e) => callLogin(e)} className={classes.signInButton}
                            fullWidth variant="contained" color="primary" size={"large"}> Zaloguj </Button>
                </form>
                <Button className={classes.signUpButton} onClick={() => history.push("/signup")}
                        fullWidth variant="contained" color="primary" size={"large"}> Rejestracja </Button>
            </div>
        </Container>);
}

export default PageViewHoc(SignIn)