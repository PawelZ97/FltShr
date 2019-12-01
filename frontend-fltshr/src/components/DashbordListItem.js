import React from "react";
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

function RecipeListItem(props) {
    const classes = useStyles();
    return (
        <ListItemLink href={props.category.href}>
            <ListItemIcon>
                {props.category.icon}
            </ListItemIcon>
            <ListItemText classes={{primary: classes.text}}
                primary={props.category.title}
            />
        </ListItemLink>
    );
}

function ListItemLink(props) {
    const classes = useStyles();
    return <ListItem button component="a" className={classes.listItem} {...props} />;
}

export default RecipeListItem;
