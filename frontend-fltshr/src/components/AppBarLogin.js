import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import React from "react";


/**
 * @return {null}
 */
function AppBarLogin(props) {
    if (props.userType === "stud") {
        if (props.login) {
            return (
                <Grid container justify={"flex-end"} alignItems={"center"} spacing={5}>
                    <Grid item>
                        Zalogowany jako {props.login}
                    </Grid>
                    <Grid item>
                        <Button component={Link} to="/stud/welcome" variant="outlined" color="secondary">
                            Wyloguj
                        </Button>
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <Button component={Link} to="/stud/signin" variant="outlined" color="secondary">
                    Zaloguj
                </Button>
            )
        }
    } else if (props.userType === "dean") {
        if (props.login) {
            return (
                <Grid container justify={"flex-end"} alignItems={"center"} spacing={5}>
                    <Grid item>
                        Zalogowany jako {props.login}
                    </Grid>
                    <Grid item>
                        <Button component={Link} to="/dean/signin" variant="outlined" color="secondary">
                            Wyloguj
                        </Button>
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <Button component={Link} to="/dean/signin" variant="outlined" color="secondary">
                    Zaloguj
                </Button>
            )
        }
    } else {
        return null;
    }
}

export default AppBarLogin