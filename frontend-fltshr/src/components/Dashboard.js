import React from 'react';
import AppBarView from "./AppBarView";
import Container from "@material-ui/core/Container"

function Dashboard() {
    return (
        <Container maxWidth="lg" className={"listTitleContainer"}>
            <h3>Main Dashboard</h3>
        </Container>
    );
}

export default AppBarView(Dashboard);
