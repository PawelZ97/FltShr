import React, {useEffect, useState} from "react";
import PageViewHoc from "../../PageViewHoc";
import Container from "@material-ui/core/Container"
import List from "@material-ui/core/List";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import axios from "axios";
import {API_ADDRESS} from "../../../utils/constants";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpenseListCreation from "./ExpenseListCreation";
import {getLoggedUser} from "../../../utils/UserUtils";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ExpenseListSettleUp from "./ExpenseListSettleUp";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles(theme => ({
    title: {
        paddingTop: 30,
        paddingBottom: 20
    },
    listItem: {
        height: 80
    },
    text: {
        fontSize: "1.2rem",
    }
}));

function ExpenseLists() {
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
                console.log("ExpenseLists loaded, status: " + response.status);
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

    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={"listTitleContainer"}>
            <Grid container justify={"space-between"} alignItems={"center"}>
                <Grid item>
                    <Typography className={classes.title} variant={"h5"}>
                        Listy wydatków:
                    </Typography>
                </Grid>
                {getLoggedUser().roles === "ROLE_MANAGER" ? (
                    <Grid item>
                        <FormControlLabel className={classes.switch} control={
                            <Switch checked={showSettled}
                                    onChange={() => setShowSettled(!showSettled)}
                                    value="checkedA"
                                    color="primary"
                            />
                        } label="Pokaż wyrównane"/>
                    </Grid>
                ) : null}
            </Grid>
            <Paper>
                <List>
                    {expensesLists.length === 0 ? (<h3 align={"center"}>Wszystkie listy zamknięte</h3>) : null}
                    {expensesLists.map((expenseList, index) => (
                        <div key={expenseList.id}>
                            <ListItem className={classes.listItem} button component="a"
                                      href={"/expense/list/" + expenseList.id + "/expenses"}>
                                <ListItemText classes={{primary: classes.text}}
                                              primary={expenseList.name}
                                              secondary={expenseList.description}/>
                                {getLoggedUser().roles === "ROLE_MANAGER" ? (
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
            <ExpenseListCreation updateFlag={updateFlag} setUpdateFlag={setUpdateFlag}/>
        </Container>
    );
}

export default PageViewHoc(ExpenseLists);
