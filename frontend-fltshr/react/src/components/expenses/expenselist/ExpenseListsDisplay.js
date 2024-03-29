import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import makeStyles from "@material-ui/core/styles/makeStyles"
import AddIcon from "@material-ui/icons/Add";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PageViewHoc from "../../PageViewHoc";
import Fab from "@material-ui/core/Fab"
import {getLoggedUser} from "../../../utils/UserUtils";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import FabSpacer from "../../FabSpacer";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(theme => ({
    marginTitle: {
        marginTop: 20,
        marginBottom: 20
    },
    listItem: {
        height: 80
    },
    text: {
        fontSize: "1.2rem",
    },
    fab: {
        margin: 0,
        top: "auto",
        right: 50,
        bottom: 50,
        left: "auto",
        position: "fixed"
    }
}));

function ExpenseListsDisplay() {
    let history = useHistory();

    const [expensesLists, setExpensesLists] = useState([]);
    const [showSettled, setShowSettled] = useState(false);

    useEffect(() => {
        let getRequestUrl = (showSettled) ? (API_ADDRESS + "/manager/expense/lists") : (API_ADDRESS + "/expense/lists");
        axios.get(getRequestUrl, {
            headers: {
                'Authorization': localStorage.getItem("authToken")
            }
        })
            .then(function (response) {
                setExpensesLists(response.data);
                console.log("ExpenseListsDisplay loaded, status: " + response.status);
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
    }, [showSettled]);

    let direction = (getLoggedUser().roles === "ROLE_MANAGER") ? "row-reverse" : "row";
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={"listTitleContainer"}>
            <Grid container justify={"space-between"} alignItems={"center"} direction={direction}>
                {getLoggedUser().roles === "ROLE_MANAGER" ? (
                    <Grid item xs={12} sm={6}>
                        <ButtonGroup color="primary" variant="contained" className={classes.marginTitle} fullWidth>
                            <Button onClick={() => setShowSettled(false)}
                                    disabled={!showSettled}>Aktywne</Button>
                            <Button onClick={() => setShowSettled(true)}
                                    disabled={showSettled}>Historia</Button>
                        </ButtonGroup>
                    </Grid>
                ) : null}
                <Grid item xs={12} sm={6}>
                    <Typography className={classes.marginTitle} variant={"h5"}>
                        Listy wydatków:
                    </Typography>
                </Grid>
            </Grid>
            <Paper>
                <List>
                    {expensesLists.length === 0 ? (<h3 align={"center"}>Wszystkie listy zamknięte</h3>) : null}
                    {expensesLists.map((expenseList, index) => (
                        <div key={expenseList.id}>
                            <ListItem className={classes.listItem} button
                                      onClick={() => history.push("/expense/list/" + expenseList.id + "/display")}>
                                <ListItemText classes={{primary: classes.text}}
                                              primary={expenseList.name}
                                              secondary={expenseList.description}/>
                                {getLoggedUser().roles === "ROLE_MANAGER" && !showSettled ? (
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete"
                                                    onClick={() => history
                                                        .push("/expense/list/" + expenseList.id + "/settleup")}>
                                            <AttachMoneyIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                ) : null}
                            </ListItem>
                            {index !== expensesLists.length - 1 ? (<Divider/>) : null}
                        </div>
                    ))}
                </List>
            </Paper>
            <Fab color="secondary" aria-label="add" className={classes.fab}
                 onClick={() => history.push("/expense/lists/create")}>
                <AddIcon/>
            </Fab>
            <FabSpacer/>
        </Container>
    );
}

export default PageViewHoc(ExpenseListsDisplay);
