import React from 'react';
import List from "@material-ui/core/List";
import DashBoardListItem from "./DashbordListItem";
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import EventTwoToneIcon from '@material-ui/icons/EventTwoTone';
import LoopTwoToneIcon from '@material-ui/icons/LoopTwoTone';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import ArchiveIcon from '@material-ui/icons/Archive';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Divider from "@material-ui/core/Divider";
import {getLoggedUser} from "../../utils/UserUtils";

let userCategories = [
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

let adminCategories = [
    {
        title: "Archiwizacja użytkowników",
        href: "/admin/accountdelete",
        icon: <ArchiveIcon/>,

    },
    {
        title: "Zmaiana managera",
        icon: <SupervisorAccountIcon/>,
        href: "/admin/changemanager"
    }
];

function DashboardList() {
    let categories = getLoggedUser().roles === "ROLE_ADMIN" ? adminCategories : userCategories;
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
