import React from 'react';
import AppBarView from "./AppBarView";
import Container from "@material-ui/core/Container"
import List from "@material-ui/core/List";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import DashBoardListItem from "./DashbordListItem";
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import EventTwoToneIcon from '@material-ui/icons/EventTwoTone';
import LoopTwoToneIcon from '@material-ui/icons/LoopTwoTone';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
    title: {
        paddingTop: 30,
        paddingBottom: 20
    }
}));


let categories = [
    {
        title: "Wydatki",
        href: "/expense/lists",
        icon: <AccountBalanceWalletTwoToneIcon/>,

    },
    {
        title: "Obowiązki w kolejce",
        icon: <LoopTwoToneIcon/>,
        href: "/chore/assignedqueues"
    },
    {
        title: "Obowiązki cykliczne",
        icon: <EventTwoToneIcon/>,
        href: "/chore/assignedfrequents"
    },
    {
        title: "Zakupy",
        icon: <ShoppingCartTwoToneIcon/>,
        href: "/shopping/lists"
    }
];

function Dashboard() {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={"listTitleContainer"}>
            <Typography className={classes.title} variant={"h5"}>
                Kategorie:
            </Typography>
            <Paper>
                <List>
                    <DashBoardListItem category={categories[0]}/>
                    <Divider/>
                    <DashBoardListItem category={categories[1]}/>
                    <Divider/>
                    <DashBoardListItem category={categories[2]}/>
                    <Divider/>
                    <DashBoardListItem category={categories[3]}/>
                </List>
            </Paper>
        </Container>
    );
}

export default AppBarView(Dashboard);
