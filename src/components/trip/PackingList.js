import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { Typography } from '@material-ui/core';



const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        height: '100vh'
    },
    header: {
        textAlign: 'left',
        fontWeight: 'bold',
        marginTop: '10px',
        marginLeft: '10px',
        marginBottom: '0'
      }
});


class PackingList extends Component {
    constructor () {
        super()
        this.state = {
            checked: false
        }
    }
    
    // handleToggle = value => () => {
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];
    
    //     if (currentIndex === -1) {
    //       newChecked.push(value);
    //     } else {
    //       newChecked.splice(currentIndex, 1);
    //     }
    // }
        
    render() {
        const {classes} = this.props
        const {checked} = this.state 
        //packing list by category (clothes, shoes, etc..)
        //need to create schemas for list-item, list.
        return (
            <div>
                <Typography className={classes.header} variant="h5" component="h2" gutterBottom>
                 Packing list
                </Typography>
             <List className={classes.root}>
      {[0, 1, 2, 3].map(value => {
        const labelId = `checkbox-list-label-${value}`;

        return (
            // onClick={this.handleToggle(value)}
          <ListItem key={value} role={undefined} dense button >
            <ListItemIcon>
              <Checkbox
                edge="start"
                // checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
            </div>
        )
    }
}

export default withStyles(styles)(PackingList);
