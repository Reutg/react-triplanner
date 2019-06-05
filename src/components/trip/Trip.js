import React, { Component } from 'react'
import { Typography, Avatar, Grid, IconButton } from '@material-ui/core';
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
    color: '#32722f'
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
  time: {
    fontSize: 14,
    textAlign: 'left'
  },
  expansionPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  icon: {
    alignSelf: 'start',
    marginBottom: '5px'
  }
});

class Trip extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     trips: [],
  //     ownerID: "5cf431891f20d35c7c3595df",
  //     members: [],
  //     agenda: []
  //   }
  // }

  render() {
    const { classes } = this.props

    const { trips } = this.props
    // console.log(trips[0])

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
            <Avatar key={member.name} alt={member.name} src={member.imgURL} className={classes.avatar} />
          )}
        </Grid>
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
              <Link to={`/dayMap/${day.day}`} style={{ textDecoration: 'none', color: 'black', margin: '5px' }}>Map view</Link>
              {day.trails.map(trail =>
                <Card key={trail._id} className={classes.card} style={{ backgroundImage: `url(${trail.imgUrl})` }} >
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      <span className={classes.time}> {trail.startTime} - {trail.endTime}</span> - <span className={classes.trailTitle}>{trail.title}</span>
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