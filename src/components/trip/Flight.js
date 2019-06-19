import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        height: '100vh',
        textAlign: 'left'
    },
    title: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    card: {
        width: '95vw',
        alignSelf: 'center'
    },
    info: {
        color: 'grey',
        fontSize: '14px',
        fontStyle: 'italic'

    }
});



class Flight extends Component {
    constructor() {
        super()
        this.state = {
            searachAttraction: ""
        }
    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.container}>
                <Typography className={classes.title} gutterBottom>
                    Flights information
                </Typography>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography color='secondary' className={classes.title} gutterBottom>
                            Flight#
                        </Typography>
                        <div className={classes.info}>DL 6641</div>  
                        <Typography color='secondary' className={classes.title} gutterBottom>
                            Airline
                        </Typography>
                        <div className={classes.info}>Delta</div>

                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Flight);
