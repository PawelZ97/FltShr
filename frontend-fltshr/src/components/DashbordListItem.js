import React from "react";
import {useHistory} from "react-router-dom"
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles({
    listItem: {
        height: 80
    },
    text: {
        fontSize: "1.5rem",
    }
});

function DashboardListItem(props) {
    let history = useHistory();
    const classes = useStyles();
    return (
        <ListItem button onClick={() => history.push(props.category.href)}>
            <ListItemIcon>
                {props.category.icon}
            </ListItemIcon>
            <ListItemText classes={{primary: classes.text}}
                primary={props.category.title}
            />
        </ListItem>
    );
}

export default DashboardListItem;
