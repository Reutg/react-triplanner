import React, { Component } from 'react'
import { Typography, Avatar, Grid, IconButton, Icon, DialogActions, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import FormatListBulletedIcon from '@material-ui/icons/List';
import FlightIcon from '@material-ui/icons/Flight';
import HotelIcon from '@material-ui/icons/Hotel';
import AddIcon from '@material-ui/icons/Add';




import Fab from '@material-ui/core/Fab';
import NewTrail from './NewTrail';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  header: {
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: '10px',
    marginLeft: '10px',
    marginBottom: '0'
  },
  subHeader: {
    textAlign: 'left',
    marginTop: '0px',
    marginLeft: '10px'
  },
  simpleText: {
    textAlign: 'left',
    marginTop: '10px',
    marginLeft: '10px'
  },
  avatar: {
    margin: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: '#0097a7'
  },
  card: {
    width: '90vw',
    margin: '5px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    justifySelf: "center"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    textAlign: 'left',
    color: 'white',
    fontWeight: 'bold'
  },
  trailText: {
    fontSize: 14,
    textAlign: 'left',
    backgroundColor: 'grey'
  },
  expansionPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  icon: {
    margin: '10px',
    fontSize: '25px'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  avatarPurple: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#00838f'
  },
  avatarBlue: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#00838f'
  },
  avatarGreen: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#00838f'
  },
  chip: {
    margin: theme.spacing(1),
  }
});

class Trip extends Component {
  constructor() {
    super()
    this.state = {
      isDialofOpen: false
    }
  }
  handleClickOpen = () => {

    const { isDialofOpen } = this.state

    this.setState({ isDialofOpen: true })
  }
  handleClose = () => {
    const { isDialofOpen } = this.state
    this.setState({ isDialofOpen: false })

  }

  

  render() {
    const { classes } = this.props

    const { trips } = this.props

    if (!trips[0]) { return (<React.Fragment />) }

    return (
      <div className={classes.root}>
        <Typography className={classes.header} variant="h5" component="h2" gutterBottom>
          {trips[0].name}
        </Typography>
        <Typography className={classes.subHeader} variant="h6" component="h2" gutterBottom>
          {trips[0].destination}, {trips[0].startDate} - {trips[0].endDate}
        </Typography>

        <Divider />

        <Typography className={classes.simpleText} variant="subtitle1" component="h2" gutterBottom>
          Traveling with me:
        </Typography>
        <Grid container justify="center" alignItems="center">
          {trips[0].members.map(member =>
          <Chip
          avatar={<Avatar key={member.name} alt={member.name} src={member.imgURL} className={classes.avatar} />}
          label={member.name} className={classes.chipLabel}
          clickable
          className={classes.chip}
          variant="outlined"
        />
          )}
        </Grid>
        <Typography className={classes.simpleText} variant="subtitle1" component="h2">
          Trip info:
        </Typography>
        <Grid container justify="center" alignItems="center">
        <Link to={`/packingList`} style={{ textDecoration: 'none', margin: '5px', alignSelf: 'start' }}>
          <Avatar className={classes.avatarPurple}>
            <FormatListBulletedIcon className={classes.icon} />
          </Avatar>
        </Link>
          <Avatar className={classes.avatarBlue}>
            <FlightIcon className={classes.icon} />
          </Avatar>
          <Avatar className={classes.avatarGreen}>
            <HotelIcon className={classes.icon} />
          </Avatar>
        </Grid>
        <Typography className={classes.simpleText} variant="subtitle1" component="h2">
          Agenda:
        </Typography>
        {trips[0].agenda.map(day =>
          <ExpansionPanel key={day.day}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Day {day.day}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanel}>
              <Link to={`/dayMap/${day.day}`} style={{ textDecoration: 'none', color: '#006064', margin: '5px', alignSelf: 'start' }}>Map view</Link>
              {day.trails.map(trail =>
                <Card key={trail._id} className={classes.card} style={{ backgroundImage: `url(${trail.imgUrl})` }} >
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      <span className={classes.trailText}> {trail.startTime} - {trail.endTime}</span> - <span className={classes.trailText}>{trail.title}</span>
                    </Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                </Card>
              )}
              <Fab color="primary" size="small" aria-label="Add" className={classes.fab} onClick={this.handleClickOpen}>
                <AddIcon />
              </Fab>
              <Dialog open={this.state.isDialofOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Add another attraction
                </DialogContentText>
                <NewTrail />
                  

                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
          </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Create
          </Button>
                </DialogActions>
              </Dialog>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Trip);