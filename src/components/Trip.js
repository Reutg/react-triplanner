import React, { Component } from 'react'
import { Typography, Avatar, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const axios = require('axios')


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
  ExpansionPanel: {
    display: 'flex'
  }
});

class Trip extends Component {
  constructor() {
    super()
    this.state = {
      trips: [],
      ownerID: "5cf431891f20d35c7c3595df",
      members: [],
      agenda: []
    }
  }
  componentDidMount = async () => {
    let { ownerID } = this.state

    let trips = await axios.get(`http://localhost:4000/trips/${ownerID}`)
    this.setState({ trips: trips.data })

    this.getTripMembers()
    this.getTripAgenda()
  }

  getTripMembers = async () => {
    let members = this.state.trips[0].members
    this.setState({members})
  }

  getTripAgenda = () => {
    let {trips}  = this.state
    let agenda = trips[0].agenda

    this.setState({ agenda })
  }

  render() {
    const { classes } = this.props

    const { trips } = this.state
    console.log(trips[0])

    return (
      this.state.trips.map(trip =>
        <div className={classes.root}>
          <Typography className={classes.header} variant="h5" component="h2" gutterBottom>
            {trip.name}
          </Typography>
          <Typography className={classes.subHeader} variant="h6" component="h2" gutterBottom>
            {trip.destination}, {trip.startDate} - {trip.endDate}
          </Typography>

          <Divider />

          <Typography className={classes.simpleText} variant="subtitle1" component="h2" gutterBottom>
            Traveling with me:
        </Typography>
          <Grid container justify="center" alignItems="center">
            {this.state.members.map(member =>
              <Avatar alt={member.name} src={member.imgURL} className={classes.avatar} />
            )}
          </Grid>
            {this.state.agenda.map(day => 
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Day {day.day}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
              {day.trails.map(trail => 
                <Card className={classes.card} style={{ backgroundImage: `url(${trail.imgUrl})` }} >
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      <span className={classes.time}> {trail.startTime} - {trail.endTime}</span> - <span className={classes.trailTitle}>{trail.title}</span>
                    </Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                </Card>
                
                )}

              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
              )} 
        
          {/* 
            <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
              <Typography className={classes.heading}>Day 2</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
                </Typography>
                </ExpansionPanelDetails>
          </ExpansionPanel>
          
          <ExpansionPanel>
          <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          >
          <Typography className={classes.heading}>Day 3</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
          </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel> */}

        </div>
      )
    )
  }
}

export default withStyles(styles)(Trip);