import React from 'react';
import AppBarView from "./AppBarView";
import Container from "@material-ui/core/Container"
import List from "@material-ui/core/List";
import {Paper} from "@material-ui/core";
import RecipeListItem from "./DashbordListItem";
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import EventTwoToneIcon from '@material-ui/icons/EventTwoTone';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import Divider from "@material-ui/core/Divider";

let categories = [
    {
        href: "banaba",
        icon: <AccountBalanceWalletTwoToneIcon/>,
        title: "Wydatki"
    },
    {
        href: "banaba",
        icon: <EventTwoToneIcon/>,
        title: "Obowiązki"
    },
    {
        href: "banaba",
        icon: <ShoppingCartTwoToneIcon/>,
        title: "Zakupy"
    }
];

function Dashboard() {
    return (
        <Container maxWidth="lg" className={"listTitleContainer"}>
            <Paper>
                <List>
                    <RecipeListItem category={categories[0]}/>
                    <Divider/>
                    <RecipeListItem category={categories[1]}/>
                    <Divider/>
                    <RecipeListItem category={categories[2]}/>
                </List>
            </Paper>
        </Container>
    );
}

export default AppBarView(Dashboard);
