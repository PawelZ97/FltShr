import React from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

function SingInButton() {
        return (
            <Button fullWidth variant="contained" color="primary" size={"large"}
                    component={Link} to="/dashboard"> Zaloguj </Button>
        );
}
export default SingInButton;