import React from 'react';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    fabSpacer: {
        height: 150
    }
}));

function FabSpacer(props) {
    const classes = useStyles();
    return (
        <div className={classes.fabSpacer}/>
    );
}

export default FabSpacer;