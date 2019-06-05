import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { Input, List, ListItem, IconButton, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import SearchPlace from './SearchPlace';

// const axios = require('axios')
const apiKey = require('./config')


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
        textAlign: 'left',
        width: '60%'
    },
    card: {
        marginTop: '10px',
        width: '95vw',
        alignSelf: 'center'
    },
    list: {
        width: '100%'
    }
});

class MyMap extends Component {
    constructor() {
        super()
        this.state = {
            lat: "",
            lng: "",
            map: "",
            location: "",
            selection: "",
            agenda: ["1", "2", "3"]
        }
    }

    componentDidMount = () => {
        this.getUserCoor()
        this.initMap()
    }

    getUserCoor = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            this.setState({ lat, lng }, () => {
                // this.renderMap()
                this.initMap()
            })
        })
    }

    renderMap = () => {
        // loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places&language=en`)
        // window.initMap = this.initMap
    }

    initMap = () => {
        // if (!window.google) { return }

        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: this.state.lat, lng: this.state.lng },
            zoom: 15,
            disableDefaultUI: true,
            zoomControl: true,
            streetViewControl: true,
            fullscreenControl: true
        });

        const marker = new window.google.maps.Marker({
            position: { lat: this.state.lat, lng: this.state.lng },
            map: map,
            draggable: true,
            animation: window.google.maps.Animation.DROP,
            icon: 'https://www.google.com/mapfiles/arrow.png',
        });
        console.log(`current position - lat: ${this.state.lat}, lng:${this.state.lng}`)

        let dragLat
        let dragLng
        window.google.maps.event.addListener(marker, 'dragend', () => {
            dragLat = marker.getPosition().lat()
            dragLng = marker.getPosition().lng()
            console.log(`New position - lat: ${dragLat}, lng: ${dragLng}`)
        });

        window.google.maps.event.addListener(map, 'click', (event) => {
            let lat = event.latLng.lat()
            let lng = event.latLng.lng()
            let marker = new window.google.maps.Marker({
                position: { lat, lng },
                map: map,
                draggable: true,
                animation: window.google.maps.Animation.DROP
            })
            window.google.maps.event.addListener(marker, 'dragend', () => {
                dragLat = marker.getPosition().lat()
                dragLng = marker.getPosition().lng()
                console.log(`New position - lat: ${dragLat}, lng: ${dragLng}`)
            });
            console.log("New marker - lat: " + event.latLng.lat() + ", lng: " + event.latLng.lng())
        });

        let input = document.getElementById('places-search');
        let autocomplete = new window.google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        autocomplete.setFields(
            ['address_components', 'geometry', 'icon', 'name', 'photos']);
        let infowindow = new window.google.maps.InfoWindow();
        const infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        const searchMarker = new window.google.maps.Marker({
            map: map,
            anchorPoint: new window.google.maps.Point(0, -29),
            draggable: true,
            animation: window.google.maps.Animation.DROP
        });

        window.google.maps.event.addListener(searchMarker, 'click', () => {
            let clickLat = searchMarker.getPosition().lat()
            let clickLng = searchMarker.getPosition().lng()
            console.log(`marker - lat: ${clickLat}, lng: ${clickLng}`)

            window.google.maps.event.addListener(searchMarker, 'dragend', () => {
                dragLat = searchMarker.getPosition().lat()
                dragLng = searchMarker.getPosition().lng()
                console.log(`New position - lat: ${dragLat}, lng: ${dragLng}`)
            });
        });

        const request = {
            placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
            fields: ['name', 'formatted_address', 'place_id', 'geometry']
        }

        const service = new window.google.maps.places.PlacesService(map);

        service.getDetails(request, function (place, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                var marker = new window.google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
                window.google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, this);
                    console.log(place.name)
                });
            }
        });


        autocomplete.addListener('place_changed', function () {
            infowindow.close();
            searchMarker.setVisible(false);
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            searchMarker.setPosition(place.geometry.location);
            searchMarker.setVisible(true);

            let address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] ? place.address_components[0].short_name : ''),
                    (place.address_components[1] ? place.address_components[1].short_name : ''),
                    (place.address_components[2] ? place.address_components[2].short_name : '')
                ].join(' ');
                console.log(place, address)
            }

            if (place.photos) {
                for (let i = 0; i < place.photos.length; i++) {
                    console.log(place.photos[i].getUrl())
                }
            }
        });

        map.addListener('click', this.addLatLng);
        window.google.maps.eventaddLatLng = (event) => {

            const marker3 = new window.google.maps.Marker({
                position: event.latLng,
                map: map
            });
        }
    }
    handleChange = event => {
        let selection = event.target.value
        this.setState({ selection })
    };

    render() {
        const { classes } = this.props

        return (
            <div className={classes.container}>
                {/* <Input
                    placeholder="Enter location"
                    id="places-search"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                /> */}
                <SearchPlace />
                <div id="map" style={{ margin: '10px' }}></div>

                <div className={classes.list}>
                    <List className={classes.root}>
                        <ListItem>
                            <ListItemText primary="location 1" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Delete">
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="Add">
                                <AddIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="location 2" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Delete">
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="Add">
                                <AddIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="location 3" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Delete">
                                <DeleteIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="Add">
                                <AddIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>

                </div>
            </div>
        )
    }
}

export default withStyles(styles)(MyMap);
