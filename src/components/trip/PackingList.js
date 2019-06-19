import React, { Component, Fragment } from 'react'

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
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
      listInput: "",
      categorySelection: "",
      packingList: [],
      categories: ["Clothes", "Shoes", "Accessories", "Toileteries", "Other"]
    }
  }

    handleSelection = (event) => {
    this.setState({ categorySelection: event.target.value })
  }

  handleInput = (event) => {
    let inputValue = event.target.value
    let inputName = event.target.name
    this.setState({ [inputName]: inputValue })
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.addNewListItem()
    }
  }
  handleCheck = (event) => {
    this.props.handleCheck(event.target.name, event.target.checked)
  }

  addToPackingList = async () => {
    const category = this.state.categorySelection
    const text = this.state.listInput

    await this.props.addToPackingList(category, text)
  }

  deleteListItem = (itemID) => {
    this.props.deleteListItem(itemID)
  }

  renderPackingList = (trip, category) => {
    if (!trip || !trip.packingList) {
      return
    }

    const { classes } = this.props
    return (
      <List className={classes.root}>
          {trip.packingList.filter(item => item.category === category).map((value) => {
            const labelId = `checkbox-list-label-${value._id}`;
            return (
              <Fragment>
                <ListItem key={value.text} role={undefined} dense button disableRipple >
                  <ListItemIcon className={classes.itemIcon}>
                    <Checkbox
                      edge="start"
                      name= {value._id}
                      checked={value.isChecked}
                      onChange={this.handleCheck}
                      tabIndex={-1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={`${value.text}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Delete" onClick={()=>this.deleteListItem(value._id)}>
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
    const { trip } = this.props

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
            placeholder="Add item"
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


