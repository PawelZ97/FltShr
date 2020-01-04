import React from 'react';
import {useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles, Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {API_ADDRESS} from "../../utils/constants";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import PageViewHoc from "../PageViewHoc";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    signUpButton: {
        marginTop: 20
    },
    mesageText: {
        margin: 20
    },
    title: {
        marginTop: 20,
        marginBottom: 20
    },
}));

function RequestAccountDelete() {
    let history = useHistory();

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        history.push("/signin");
    };

    function callDeleteAccount(userId) {
        axios.post(API_ADDRESS + '/user/requestaccountdelete')
            .then(function (response) {
                console.log("RequestAccountDelete Success, status: " + response.status);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log("RequestAccountDelete Rejected, status: " + error.response.status);
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
                <Typography variant="h5" className={classes.title}>
                    Usunięcie konta
                </Typography>
                <Paper>
                    <Typography align={"justify"} className={classes.mesageText}>
                        Twoje konto zostanie zgłoszone do usunięcia. Warunkiem usunięcia konta jest wyrównanie swojego
                        balansu i wykoananie obowiązków. Po weryfikowacji twoje konto zostanie usunięte przez
                        administratora.
                    </Typography>
                </Paper>
                <Button onClick={() => callDeleteAccount()} className={classes.signUpButton}
                        fullWidth variant="contained" color="primary" size={"large"}>Zgłoś konto do usunięcia</Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle
                    id="alert-dialog-title"> {"Email został wysłany"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Twoje konto zostało zgłoszone do usunięcia
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

export default PageViewHoc(RequestAccountDelete);