import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import AddIcon from "@material-ui/icons/Add";
import PageViewHoc from "../../PageViewHoc";
import Fab from "@material-ui/core/Fab";
import Container from "@material-ui/core/Container"
import List from "@material-ui/core/List";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {getLoggedUser} from "../../../utils/UserUtils";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ExpenseListSettleUp from "./ExpenseListSettleUp";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles(theme => ({
    title: {
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

function DisplayExpenseLists() {
    let history = useHistory();

    const [expensesLists, setExpensesLists] = useState([]);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [showSettled, setShowSettled] = useState(false);

    useEffect(() => {
        let getRequestUrl = (showSettled) ? (API_ADDRESS + "/manager/expense/lists") : (API_ADDRESS + "/expense/lists");
        axios
            .get(getRequestUrl, {
                headers: {
                    'Authorization': localStorage.getItem("authToken")
                }
            })
            .then(function (response) {
                setExpensesLists(response.data);
                console.log("DisplayExpenseLists loaded, status: " + response.status);
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
    }, [updateFlag, showSettled]);

    let direction = (getLoggedUser().roles === "ROLE_MANAGER") ? "row-reverse" : "row";
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={"listTitleContainer"}>
            <Grid container justify={"space-between"} alignItems={"center"} direction={direction}>
                {getLoggedUser().roles === "ROLE_MANAGER" ? (
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel className={classes.title} control={
                            <Switch checked={showSettled}
                                    onChange={() => setShowSettled(!showSettled)}
                                    value="checkedA"
                                    color="primary"
                            />
                        } label="Pokaż wyrównane"/>
                    </Grid>
                ) : null}
                <Grid item xs={12} sm={6}>
                    <Typography className={classes.title} variant={"h5"}>
                        Listy wydatków:
                    </Typography>
                </Grid>
            </Grid>
            <Paper>
                <List>
                    {expensesLists.length === 0 ? (<h3 align={"center"}>Wszystkie listy zamknięte</h3>) : null}
                    {expensesLists.map((expenseList, index) => (
                        <div key={expenseList.id}>
                            <ListItem className={classes.listItem} button component="a"
                                      href={"/expense/list/" + expenseList.id + "/display"}>
                                <ListItemText classes={{primary: classes.text}}
                                              primary={expenseList.name}
                                              secondary={expenseList.description}/>
                                {getLoggedUser().roles === "ROLE_MANAGER" && !showSettled ? (
                                    <ListItemSecondaryAction>
                                        <ExpenseListSettleUp updateFlag={updateFlag}
                                                             setUpdateFlag={setUpdateFlag}
                                                             listId={expenseList.id}/>
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
        </Container>
    );
}

export default PageViewHoc(DisplayExpenseLists);
