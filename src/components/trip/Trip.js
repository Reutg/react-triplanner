import React, { Component } from 'react'
import { Typography, Avatar, Grid, Chip } from '@material-ui/core';
import { withStyles, withTheme } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import WorkIcon from '@material-ui/icons/Work';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import HotelTwoToneIcon from '@material-ui/icons/HotelTwoTone';
import MapTwoToneIcon from '@material-ui/icons/MapTwoTone';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '10px',
    marginLeft: '10px',
    marginBottom: '0'
  },
  subHeader: {
    textAlign: 'center',
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
  daysHeader: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  card: {
    width: '90vw',
    margin: '5px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    justifySelf: "center"
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
    fontSize: '25px',
    color: theme.palette.primary.main
  },
  iconActive: {
    fontSize: '25px',
    color: 'white'
  },
  iconDisabled: { 
    fontSize: '25px',
    color: 'grey'
  },
  avatar: {
    margin: 10,
    backgroundColor: theme.palette.secondary.main,
  },
  avatarDisabled: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#eceff1'
  },
  chip: {
    margin: theme.spacing(1),
  },
  dayPanel:{
    justifyContent: 'space-between'
  }
});

class Trip extends Component {

  formatDate = (date) => {
    let givenDate = new Date(date)
    let day = givenDate.getDate()
    let month = +givenDate.getMonth() + 1
    let year = givenDate.getFullYear()

    return `${day}.${month}.${year}`
  }

  render() {
    const { classes } = this.props

    const { trip } = this.props

    if (!trip) { return (<React.Fragment />) }

    return (
      <div className={classes.root}>
        <Typography className={classes.header} variant="h5" component="h2" gutterBottom>
          {trip.name}
        </Typography>
        <Typography className={classes.subHeader} variant="h6" component="h2" gutterBottom>
          {trip.destination}, {this.formatDate(trip.startDate)} - {this.formatDate(trip.endDate)}
        </Typography>


        {/* <Typography className={classes.simpleText} variant="subtitle1" component="h2" gutterBottom>
          Traveling with me:
        </Typography> */}
        <Grid container justify="center" alignItems="center">
          {trip.members.map(member =>
            <Chip
              avatar={<Avatar key={member.name} alt={member.name} src={member.imgURL} className={classes.avatar} />}
              label={member.name}
              clickable
              className={classes.chip}
              variant="outlined"
            />
          )}
        </Grid>

        <Divider />

        {/* <Typography className={classes.simpleText} variant="subtitle1" component="h2">
          Trip info:
        </Typography> */}
        <Grid container justify="center" alignItems="center">
          <Link to={`/packingList`} style={{ textDecoration: 'none', margin: '5px', alignSelf: 'start' }}>
            <Avatar className={classes.avatar}>
              <WorkIcon className={classes.iconActive} />
            </Avatar>
          </Link>

          {/* <Link to={`/flights`} style={{ textDecoration: 'none', margin: '5px', alignSelf: 'start' }}> */}
          <Avatar className={classes.avatarDisabled}>
            <FlightLandIcon className={classes.iconDisabled} />
          </Avatar>
          {/* </Link> */}
          <Avatar className={classes.avatarDisabled}>
            <HotelTwoToneIcon className={classes.iconDisabled} />
          </Avatar>
        </Grid>
        {/* <Typography className={classes.simpleText} variant="subtitle1" component="h2">
          Agenda:
        </Typography> */}
        {trip.agenda.map(day =>
          <ExpansionPanel key={day.day}>
            <ExpansionPanelSummary classes={{content: classes.dayPanel}}
              expandIcon={<ExpandMoreIcon />}
                    >
              <Typography className={classes.daysHeader}>Day {day.day}</Typography>
              <Link to={`/dayMap/${day.day}`} style={{ color: '#263238' }}><MapTwoToneIcon className={classes.icon} /></Link>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanel}>
             
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
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Trip);