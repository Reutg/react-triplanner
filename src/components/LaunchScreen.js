import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#0097a7',
        fontWeight: 'bold',
        fontSize: '40px',
        color: '#fff'
    }
});

class LaunchScreen extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CircularProgress className={classes.progress} color="secondary" />
                <span>Triplanner</span>
            </div>
        )
    }
}

export default withStyles(styles)(LaunchScreen);