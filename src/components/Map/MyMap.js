import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


import SearchPlace from './SearchPlace';

const axios = require('axios')
const apiKey = require('./config')


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
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
    },
    timePicker: {
        width: '40%',
        margin: '10px'
    },
    datePicker: {
        width: '85%'
    },
    button: {
        width: '85%',
        alignSelf: 'center',
        marginTop: '10px'
    },
    addContainer: {
        display: 'flex',
        flexDirection: "column"
    }
});

class MyMap extends Component {
    constructor() {
        super()
        this.state = {
            selectedDate: null,
            selectedStartTime: new Date(),
            selectedEndTime: new Date(),
            lat: "",
            lng: "",
            map: "",
            locationName: "",
            selection: "",
            agenda: ["1", "2", "3"],
            startCoor: {}
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
            console.log(`search marker - lat: ${clickLat}, lng: ${clickLng}`)

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
                const marker = new window.google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
                window.google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, this);
                    console.log(place.name)
                });
            }
        });


        autocomplete.addListener('place_changed', () => {
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
                let { newAttraction } = { ...this.state }

                let selectedPlace = {
                    title: place.name,
                    startCoor: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
                    imgUrl: place.photos ? place.photos[Math.floor(Math.random() * place.photos.length)].getUrl() : ""
                }

                this.setState({
                    startCoor: selectedPlace.startCoor,
                    locationName: selectedPlace.title,
                    imgUrl: selectedPlace.imgUrl
                })
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
    }

    handleDateChange = (selectedDate) => {
        this.setState({ selectedDate })
    }

    handleStartTime = (selectedStartTime) => {
        this.setState({ selectedStartTime })
    }

    handleEndTime = (selectedEndTime) => {
        this.setState({ selectedEndTime })
    }

    getTripDates(trip) {
        if (!trip) {
            return { startDate: new Date(), endDate: new Date() }
        }

        let { startDate, endDate } = trip

        if (!this.state.selectedDate) {
            this.setState({ selectedDate: startDate })
        }

        return { startDate, endDate }
    }

    getTimeString(date) {
        return `${date.getHours()}:${date.getMinutes()}`
    }

    addNewLocation = async () => {
        let tripStartDate = new Date(this.props.trip.startDate)
        let { selectedDate } = this.state
        let day = ((selectedDate - tripStartDate) / 86400000 || 0)
        let location = {
            title: this.state.locationName,
            startTime: this.getTimeString(this.state.selectedStartTime),
            endTime: this.getTimeString(this.state.selectedEndTime),
            startCoor: this.state.startCoor,
            imgUrl: this.state.imgUrl,
            tripID: this.props.trip._id,
            day: day
        }
        await axios.post('http://localhost:4000/attraction', location)
        this.props.loadData()
    }

    render() {
        const { classes } = this.props

        const { startDate, endDate } = this.getTripDates(this.props.trips)
        console.log(startDate, endDate)

        return (
            <div className={classes.container}>

                <SearchPlace />
                <div id="map" style={{ margin: '10px' }}></div>
                <div className={classes.addContainer}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container className={classes.grid} justify="space-around">
                            <KeyboardDatePicker
                                className={classes.datePicker}
                                margin="normal"
                                label="Choose trip day"
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                minDate={new Date(startDate)}
                                maxDate={new Date(endDate)}
                                format="dd.MM.yyyy"
                            />
                            <Grid
                                direction="row"
                                justify="center"
                                alignItems="center">
                                <KeyboardTimePicker
                                    className={classes.timePicker}
                                    margin="normal"
                                    label="Start time"
                                    value={this.state.selectedStartTime}
                                    onChange={this.handleStartTime}
                                    ampm={false}
                                />
                                <KeyboardTimePicker
                                    className={classes.timePicker}
                                    margin="normal"
                                    label="End time"
                                    value={this.state.selectedEndTime}
                                    onChange={this.handleEndTime}
                                    ampm={false}
                                />
                            </Grid>
                        </Grid>
                    </MuiPickersUtilsProvider>

                    <Button variant="outlined" color="primary" className={classes.button} onClick={this.addNewLocation}>
                        Add
                </Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(MyMap);
