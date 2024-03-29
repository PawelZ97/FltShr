import React from 'react';
import {NavLink} from "react-router-dom"
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
        minWidth: 300,
        fontWeight: 450,
        color: "white",
        textDecoration: "none"

    },
    menuButton: {
        marginRight: theme.spacing(2),
    }
}));

function FltShrAppBar(props) {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton onClick={() => props.setOpen(true)}
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <NavLink to="/dashboard" style={{textDecoration: 'none', color: 'unset'}}>
                    <Typography variant="h5" className={classes.title}>
                        FltShr
                    </Typography>
                </NavLink>
            </Toolbar>
        </AppBar>
    );
}

export default FltShrAppBar;