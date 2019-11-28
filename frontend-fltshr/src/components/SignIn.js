import React from 'react';
import AppBarView from "./AppBarView";
import {makeStyles} from '@material-ui/core/styles';
import SignInButton from "./SignInButton";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    signinbutton: {
        marginTop: 20
    }
}));

function SignIn() {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography variant="h5">
                    Zaloguj się
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoComplete="login"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Hasło"
                        type="password"
                        id="password"
                    />
                    <div className={classes.signinbutton}>
                        <SignInButton />
                    </div>
                </form>
            </div>
        </Container>
            );
}
export default AppBarView(SignIn)