import React from 'react';
import List from "@material-ui/core/List";
import DashBoardListItem from "./DashbordListItem";
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import EventTwoToneIcon from '@material-ui/icons/EventTwoTone';
import LoopTwoToneIcon from '@material-ui/icons/LoopTwoTone';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import Divider from "@material-ui/core/Divider";

let categories = [
    {
        title: "Wydatki",
        href: "/expense/lists/display",
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

function DashboardList() {
    return (
        <List>
            {categories.map((category, index) => (
                <div key={index}>
                    <DashBoardListItem category={category}/>
                    {index !== categories.length - 1 ? (<Divider/>) : null}
                </div>))}
        </List>
    );
}

export default DashboardList;
