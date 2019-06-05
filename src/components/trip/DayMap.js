import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Typography, ListItemIcon } from '@material-ui/core';
import PlaceIcon from '@material-ui/icons/Place';

// const axios = require('axios')
const apiKey = require('../map/config')


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        height: '100vh'
    },
    root: {
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
        textAlign: 'center',
        width: '100%',
        fontSize: '20px'
    },
    card: {
        marginTop: '10px',
        width: '95vw',
        alignSelf: 'center'
    },
    list: {
        width: '100%',
        height: '100%'
    },
    listIcon: {
        minWidth: '30px'
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

    renderMap = () => {
        // loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places&language=en`)
        // window.initMap = this.initMap
    }

    initMap = () => {
        const mapEl = document.getElementById('map');

        if (!this.props.trips[0] || !mapEl) {
            setTimeout(() => this.initMap(), 100)

            return
        }
        const day = +this.props.match.params.day - 1
        let firstTrailStart = this.props.trips[0].agenda[day].trails[0].startCoor

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
        let firstTrailStart = this.props.trips[0].agenda[day].trails[0].startCoor
        let lastTrailPoint = this.props.trips[0].agenda[day].trails[this.props.trips[0].agenda[day].trails.length - 1].startCoor

        let waypts = []
        if (this.props.trips[0].agenda[day].trails.length >= 3) {
            let trailsArr = this.props.trips[0].agenda[day].trails
            let wayptsArr = trailsArr.slice(1, trailsArr.length - 1)
            waypts.push({ location: trailsArr[1].startCoor })
            console.log(wayptsArr)
        }

        directionsService.route({
            origin: firstTrailStart,
            destination: lastTrailPoint,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                const route = response.routes[0];
                //     var summaryPanel = document.getElementById('directions-panel');
                //     summaryPanel.innerHTML = '';
                //     // For each route, display summary information.
                for (let i = 0; i < route.legs.length; i++) {
                    // const routeSegment = i + 1;
                    // summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                    //     '</b><br>';
                    // summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                    // summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                    // summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                    console.log(route.legs[i])
                }
                // } else {
                //     window.alert('Directions request failed due to ' + status);
            }
        });

    }

    getTrailsPerDay = async () => {
        const day = +this.props.match.params.day - 1
        let trails = await this.props.trips[0].agenda[day].trails

        this.setState({ trails })
    }

    renderTrails(trips) {
        if (!trips || !trips[0]) {
            return
        }

        const { classes } = this.props
        const day = +this.props.match.params.day - 1

        return (
            <List className={classes.root}>
                {trips[0].agenda[day].trails.map(trail =>
                    <ListItem>
                        <ListItemIcon className={classes.listIcon}>
                            <PlaceIcon />  
                        </ListItemIcon>
                        <ListItemText primary={trail.title} />
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
        const { trips } = this.props
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
                    {this.renderTrails(trips)}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(DayMap);
