import React from 'react';
import Container from "@material-ui/core/Container";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import Dashboard from "./Dashboard";
import PageViewHoc from "./PageViewHoc";

const useStyles = makeStyles(theme => ({
    title: {
        marginTop: 20,
        marginBottom: 20
    }
}));

function DashboardDisplay(props) {
    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={"listTitleContainer"}>
            <Typography className={classes.title} variant={"h5"}>
                Kategorie:
            </Typography>
            <Paper>
                <Dashboard/>
            </Paper>
        </Container>
    );
}

export default PageViewHoc(DashboardDisplay);