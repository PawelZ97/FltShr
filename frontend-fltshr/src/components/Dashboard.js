import React from 'react';
import FltShrAppBar from "./AppBar";
import Container from "@material-ui/core/Container";


function Dashboard() {
    return (
        <React.Fragment>
            <FltShrAppBar login={"login"} userType={"stud"}/>
            <Container maxWidth="lg" className={"listTitleContainer"}>
                <h3>Twoje kolejki:</h3>
            </Container>
        </React.Fragment>

    );
}

export default Dashboard
