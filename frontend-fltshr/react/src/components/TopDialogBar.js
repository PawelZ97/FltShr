import React from 'react';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
        minWidth: 300,
        fontWeight: 450,
        color: "white",
        textDecoration: "none"

    },
    containerColor: {
        backgroundColor: theme.palette.primary.main,
        padding: 15
    }
}));

function TopDialogBar(props) {
    const classes = useStyles();
    return (
        <Box className={classes.containerColor} boxShadow={4}>
            <Typography variant="h5" className={classes.title}>
                {"Fltshr |   " + props.text}
            </Typography>
        </Box>
    );
}

export default TopDialogBar;