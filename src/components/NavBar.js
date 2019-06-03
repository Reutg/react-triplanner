import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';


const styles = {
    root: {
        flexGrow: 1,
    },
    
};

class NavBar extends Component {

    render() {
        const { classes } = this.props;
        return (
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                        <Link to="/map" style={{ textDecoration: 'none', color: 'black', margin: '5px'}}>Map</Link>
                        <Link to="/searchTrail" style={{ textDecoration: 'none', color: 'white', margin: '5px'}}>Search trails</Link>
                        <Link to="/trip" style={{ textDecoration: 'none', color: 'white', margin: '5px'}}>Trip</Link>
                        </Typography>
                        </Toolbar>
                    </AppBar>
                </div>

        )
    }
}

export default withStyles(styles)(NavBar);