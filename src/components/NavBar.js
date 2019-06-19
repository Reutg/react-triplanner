import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Divider, List, ListItemIcon, ListItem, ListItemText } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MapIcon from '@material-ui/icons/Map';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddLocationIcon from '@material-ui/icons/AddLocation';

import Drawer from '@material-ui/core/Drawer';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    listIcon: {
        minWidth: '30px'
    },
});

class NavBar extends Component {
    constructor() {
        super()
        this.state = {
            menuOpen: false
        }
    }

    handleMenuOpen = () => {
        this.setState({ menuOpen: true })
    }

    handleMenuClose = () => {
        this.setState({ menuOpen: false })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={this.handleMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            className={classes.drawer}
                            variant="persistent"
                            anchor="left"
                            open={this.state.menuOpen}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            <div className={classes.drawerHeader}>
                                <IconButton onClick={this.handleMenuClose}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </div>
                            <Divider />
                            <List onClick={() => this.setState({menuOpen: false})}>
                                <ListItem button key={"main"}>
                                    <ListItemIcon className={classes.listIcon}> <MapIcon /> </ListItemIcon>
                                    <ListItemText primary={<Link to="/" style={{ textDecoration: 'none', color: 'black', margin: '5px' }}>My Trip</Link>} />
                                </ListItem>
                                <ListItem button key={"map"}>
                                    <ListItemIcon className={classes.listIcon}> <AddLocationIcon /> </ListItemIcon>
                                    <ListItemText primary={<Link to="/map" style={{ textDecoration: 'none', color: 'black', margin: '5px' }}>Add Attraction</Link>} />
                                </ListItem>
                            </List>
                        </Drawer>
                        <Link to="/" style={{ textDecoration: 'none', color: 'white', margin: '5px' }}>
                            <Typography variant="h6" className={classes.title}>
                                Triplanner
                        </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>

        )
    }
}

export default withStyles(styles)(NavBar);