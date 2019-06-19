import React, { Component, Fragment } from 'react'

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorder from '@material-ui/icons/StarBorder';
import { Typography, TextField, Button, FormControl, InputLabel, Select } from '@material-ui/core';

const axios = require('axios')

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    height: '100vh'
  },
  header: {
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: '10px',
    marginLeft: '10px',
    marginBottom: '0'
  },
  categoryHeader: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '16px',
    marginLeft: '20px',
    marginTop: '10px'
  },
  addItem: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  formControl: {
    width: '33%',
  },
  textField: {
    width: '30%'
  },
  button: {
    margin: theme.spacing(1),
  },
  itemIcon: {
    minWidth: 0
  }
});


class PackingList extends Component {
  constructor() {
    super()
    this.state = {
      checked: false,
      listInput: "Add new item",
      categorySelection: "",
      noteInput: "Add note",
      packingList: [],
      categories: ["Clothes", "Shoes", "Accessories", "Toileteries", "Other"]
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

  handleSelection = (event) => {
    this.setState({ categorySelection: event.target.value })
  }

  handleInput = (event) => {
    let inputValue = event.target.value
    let inputName = event.target.name
    this.setState({ [inputName]: inputValue })
    console.log(event)
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.addNewListItem()
    }
  }

  addToPackingList = async () => {
    const category = this.state.categorySelection
    const text = this.state.listInput

    await this.props.addToPackingList(category, text)
  }

  renderPackingList = (trip, category) => {
    if (!trip || !trip.packingList) {
      return
    }

    let categoryArr = this.state.categories
    
    const { classes } = this.props
    return (
      <List className={classes.root}>
          {trip.packingList.filter(item => item.category === category).map((value) => {
            const labelId = `checkbox-list-label-${value.text}`;
            return (
              <Fragment>
                {/* onClick={this.handleToggle(value)} */}
                <ListItem key={value.text} role={undefined} dense button >
                  <ListItemIcon className={classes.itemIcon}>
                    <Checkbox
                      edge="start"
                      // checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={`${value.text}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Fragment>
            );
          })
        
          }
      </List>

    )
  }

  render() {
    const { classes } = this.props
    const { checked } = this.state
    const { trip } = this.props
    // const packingList = this.props.trip.packingList
    // console.log(packingList)
    return (
      <div className={classes.container}>
        <Typography className={classes.header} variant="h5" component="h2" gutterBottom>
          Packing list
        </Typography>
        <div className={classes.addItem}>
          <FormControl className={classes.formControl}>
            <InputLabel>Category</InputLabel>
            <Select
              native
              value={this.state.categorySelection}
              onChange={this.handleSelection}
            >
              <option value="" />
              {this.state.categories.map(category =>
                <option value={category}>{category}</option>
              )}
            </Select>
          </FormControl>

          <TextField
            name="listInput"
            className={classes.textField}
            value={this.state.listInput}
            onChange={this.handleInput}
            onKeyDown={this.handleKeyDown}
            margin="normal"
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={this.addToPackingList}>
            Add
      </Button>
        </div>
        {this.state.categories.map(category => {
          return (
            <Fragment>
              <Typography className={classes.categoryHeader} color='secondary' variant="h6" component="h6" gutterBottom>
                {category}
              </Typography>
              {this.renderPackingList(trip, category)}
            </Fragment>
          )
        })}

      </div>
    )
  }
}

export default withStyles(styles)(PackingList);


