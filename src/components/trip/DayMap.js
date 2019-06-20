import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Typography, ListItemIcon } from '@material-ui/core';
import PlaceIcon from '@material-ui/icons/Place';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        height: '100vh'
    },
    root: {
        display: 'flex',
        width: '95%',
        backgroundColor: theme.palette.background.paper,
        margin: theme.spacing(1)
    },
    input: {
        margin: theme.spacing(1),
        width: '90%',
        align: 'left'
    },
    title: {
        textAlign: 'left',
        width: '100%',
        alignSelf: 'center'
    },
    card: {
        marginTop: '10px',
        width: '95vw',
        alignSelf: 'center'
    },
    list: {
        width: '100%'
    },
    listIcon: {
        minWidth: '30px'
    },
    locations: {
        width: '95%',
        backgroundColor: theme.palette.background.paper,
        margin: theme.spacing(1)
    }
});

class DayMap extends Component {
    constructor() {
        super()
        this.state = {
            lat: "",
            lng: ""
        }
    }

    initMap = () => {
        const mapEl = document.getElementById('map');

        if (!this.props.trip || !mapEl) {
            setTimeout(() => this.initMap(), 100)
            return
        }
        const day = +this.props.match.params.day - 1
        let firstTrailStart = this.props.trip.agenda[day].trails[0].startCoor

        const directionsService = new window.google.maps.DirectionsService;
        const directionsDisplay = new window.google.maps.DirectionsRenderer;

        const map = new window.google.maps.Map(mapEl, {
            center: firstTrailStart,
            zoom: 10,
            disableDefaultUI: true,
            zoomControl: true,
            streetViewControl: true,
            fullscreenControl: true
        });

        directionsDisplay.setMap(map);
        this.calculateAndDisplayRoute(directionsService, directionsDisplay)
    }

    calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
        const day = +this.props.match.params.day - 1
        let firstTrailStart = this.props.trip.agenda[day].trails[0].startCoor
        let lastTrailPoint = this.props.trip.agenda[day].trails[this.props.trip.agenda[day].trails.length - 1].startCoor

        let waypts = []
        let trailsArr = this.props.trip.agenda[day].trails
        if (trailsArr.length >= 3) {
            for (let i = 1; i < trailsArr.length - 1; i++) {
                waypts.push({ location: trailsArr[i].startCoor })
            }
        }

        directionsService.route({
            origin: firstTrailStart,
            destination: lastTrailPoint,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: 'WALKING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                const route = response.routes[0];
                for (let i = 0; i < route.legs.length; i++) {
                }
            }
        });

    }

    getTrailsPerDay = async () => {
        const day = +this.props.match.params.day - 1
        let trails = await this.props.trip.agenda[day].trails

        this.setState({ trails })
    }

    renderTrails(trip) {
        if (!trip) {
            return
        }

        const { classes } = this.props
        const day = +this.props.match.params.day - 1

        return (
            <List className={classes.locations}>
                {trip.agenda[day].trails.map(trail =>
                    <ListItem key={trail._id}>
                        <ListItemIcon className={classes.listIcon}>
                            <PlaceIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.title} primary={trail.title} />
                        <ListItemSecondaryAction>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
        )
    }

    render() {
        this.initMap()
        const { classes } = this.props
        const { trip } = this.props
        console.log(this.props.match.params.day)
        return (
            <div className={classes.container}>
                <div className={classes.root}>
                    <Typography className={classes.title} component="h2">
                        Trip day #{this.props.match.params.day}
                    </Typography>
                </div>
                <div id="map" style={{ margin: '10px' }}></div>

                <div className={classes.list}>
                    {this.renderTrails(trip)}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(DayMap);
