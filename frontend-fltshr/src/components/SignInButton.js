import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import React from "react";

/**
 * @return {null}
 */
function QueueCardAction(props) {
    if (props.userType === "stud") {
        return (
            <Button fullWidth variant="contained" color="primary"
                    component={Link} to="/stud/dashboard"> Zaloguj </Button>
        );
    } else if (props.userType === "dean") {
        return (
            <Button fullWidth variant="contained" color="primary"
                    component={Link} to="/dean/selectqueue"> Zaloguj </Button>
        );
    } else {
        return null;
    }
}

export default QueueCardAction;