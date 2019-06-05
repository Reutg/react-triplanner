import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Divider, List, ListItemIcon, ListItem , ListItemText} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Drawer from '@material-ui/core/Drawer';



const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },


});

class NavBar extends Component {
    constructor() {
        super()
        this.state = {
            menuOpen: false
        }
    }

    toggleMenu = (open) => event => {

        if (event.type === 'keydown' && (event.altKey || event.shiftKey)) {
            return;
        }
        this.setState({ menuOpen: open })
    }

    
    
    
    render() {
       const sideList = (
            <div
              role="presentation"
              onClick={this.toggleMenu(false)}
              onKeyDown={this.toggleMenu(false)}
            >
                <List>
                    <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                    </List>
            </div>
          );
        
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
                            onClick={this.toggleMenu(false)}
                            onKeyDown={this.toggleMenu(false)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer open={this.state.menuOpen} onClose={this.toggleMenu(false)}>
                            {sideList}
                        </Drawer>
                        <Typography variant="h6" className={classes.title}>
                            lOGO
                            </Typography>
                        <Link to="/map" style={{ textDecoration: 'none', color: 'black', margin: '5px' }}>Map</Link>
                        <Link to="/searchTrail" style={{ textDecoration: 'none', color: 'white', margin: '5px' }}>Search trails</Link>
                        <Link to="/trip" style={{ textDecoration: 'none', color: 'white', margin: '5px' }}>Trip</Link>
                    </Toolbar>
                </AppBar>
            </div>

        )
    }
}

export default withStyles(styles)(NavBar);