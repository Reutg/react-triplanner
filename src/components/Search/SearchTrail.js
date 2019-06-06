import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField, InputLabel, Select, MenuItem, FormControl, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SearchPlace from '../map/SearchPlace';
import DayMap from '../trip/DayMap';


const styles = theme => ({
  container: {
      display: 'grid',
      // gridTemplateRows: 'auto',
      width: '40%',
      gridGap: '10px'
  },
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(1),
    width: 300,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing(1)
  }
  });



class SearchTrail extends Component {
  constructor(){
    super()
    this.state = {
      value: 50
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {classes} = this.props

        return (
        <div>
    <form className={classes.container} noValidate autoComplete="off">
     <SearchPlace />

      <FormControl className={classes.formControl}>
        <InputLabel>Difficulty level</InputLabel>
        <Select
          value="Difficulty"
          // onChange={handleChange}
          inputProps={{
            name: 'difficulty',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Easy</MenuItem>
          <MenuItem value={20}>Moderate</MenuItem>
          <MenuItem value={30}>Hard</MenuItem>
        </Select>
      </FormControl>
      </form> 

      {/* <SearchPlace />
      {/* <DayMap /> */}
      <Button variant="contained" color="primary" className={classes.button}>
        Search
      </Button>
        </div>
        )
    }
}

export default withStyles(styles)(SearchTrail);
