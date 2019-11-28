import React from 'react';
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "./AppBar";

export default (Component) => {
    return (props) => (
        <Grid
            container
            justify={"center"}
        >
            <CssBaseline/>
            <Grid item xs={12}>
                <header>
                    <AppBar/>
                </header>
            </Grid>
            <Grid item xs={12} md={8}>
                <main>
                    <Component {...props} />
                </main>
            </Grid>
        </Grid>);
}