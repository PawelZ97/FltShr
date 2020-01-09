import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import FltShrAppBar from "./FltShrAppBar";
import {makeStyles, Typography} from "@material-ui/core";
import {getLoggedUser, isUserLogged} from "../utils/UserUtils";
import DashboardList from "./dashboard/DashboardList";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';

const useStyles = makeStyles(theme => ({
    userPrint: {
        margin: 5,
        color: "white"
    },
    containerColor: {
        backgroundColor: theme.palette.primary.main,
        padding: 30
    },
    marginUtilsList: {
        marginTop: 80
    }
}));

function SidePanel(props) {
    let history = useHistory();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSingOut = () => {
        setOpen(false);
        localStorage.removeItem("authToken");
        history.push("/signin");
    };

    const classes = useStyles();
    return (

        <div>
            <FltShrAppBar setOpen={setOpen}/>
            {isUserLogged() && (<SwipeableDrawer
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
            >
                <Box className={classes.containerColor} boxShadow={4}>
                    <Grid container justify={"space-between"}>
                        <Typography className={classes.userPrint}>
                            Zalogowany:
                        </Typography>
                        <Button variant={"contained"} onClick={handleSingOut}>
                            Wyloguj
                        </Button>
                    </Grid>
                    <Typography variant={"h4"} className={classes.userPrint}>
                        {getLoggedUser().username}
                    </Typography>
                </Box>
                <DashboardList/>
                <List className={classes.marginUtilsList}>
                    <ListItem button onClick={() => history.push("/changepassword")}>
                        <ListItemIcon>
                            <VpnKeyTwoToneIcon/>
                        </ListItemIcon>
                        <ListItemText classes={{primary: classes.text}}
                                      primary={"Zmiana hasła"}
                        />
                    </ListItem>
                    <Divider/>
                    <ListItem button onClick={() => history.push("/requestaccountdelete")}>
                        <ListItemIcon>
                            <CancelTwoToneIcon/>
                        </ListItemIcon>
                        <ListItemText classes={{primary: classes.text}}
                                      primary={"Usuń konto"}
                        />
                    </ListItem>
                </List>
            </SwipeableDrawer>)}
        </div>
    );
}

export default SidePanel;