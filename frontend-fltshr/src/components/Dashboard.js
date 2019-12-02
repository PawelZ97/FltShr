import React from 'react';
import AppBarView from "./AppBarView";
import Container from "@material-ui/core/Container"
import List from "@material-ui/core/List";
import {Paper} from "@material-ui/core";
import DashBoardListItem from "./DashbordListItem";
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import EventTwoToneIcon from '@material-ui/icons/EventTwoTone';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import Divider from "@material-ui/core/Divider";

let categories = [
    {
        title: "Wydatki",
        href: "/expense/lists",
        icon: <AccountBalanceWalletTwoToneIcon/>,

    },
    {
        title: "Obowiązki",
        icon: <EventTwoToneIcon/>,
        href: "/chores"
    },
    {
        title: "Zakupy",
        icon: <ShoppingCartTwoToneIcon/>,
        href: "/shopping"
    }
];

function Dashboard() {
    return (
        <Container maxWidth="lg" className={"listTitleContainer"}>
            <Paper>
                <List>
                    <DashBoardListItem category={categories[0]}/>
                    <Divider/>
                    <DashBoardListItem category={categories[1]}/>
                    <Divider/>
                    <DashBoardListItem category={categories[2]}/>
                </List>
            </Paper>
        </Container>
    );
}

export default AppBarView(Dashboard);
