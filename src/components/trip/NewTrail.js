import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { Input, Grid, TextField } from '@material-ui/core';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        height: '100vh'
    },
    input: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      }
});



class NewTrail extends Component {
    constructor(){
        super()
        this.state = {
            searachAttraction: ""
        }
    }
    render() {
        const {classes} = this.props
        return (
            <div>
                <Input
                    label="Search"
                    name = "searachAttraction"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />
                 
            </div>
        )
    }
}

export default withStyles(styles)(NewTrail);
