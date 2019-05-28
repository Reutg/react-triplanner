import React, { Component } from 'react'
// const axios = require('axios')


class MyMap extends Component {
    constructor() {
        super()
        this.state = {
            lat: "",
            lng: ""
        }
    }
    componentDidMount = () => {
        this.getUserCoor()
    }

    getUserCoor = () => {
       navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude 
            const lng = position.coords.longitude
            this.setState({lat,lng}, ()=> {
                this.renderMap()
            })
        })
    }
    
    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAp9bb1UC6TntWCOr_VwIQQk_TpKeQJSvo&callback=initMap")
        window.initMap = this.initMap
    }
    
    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: this.state.lat, lng: this.state.lng},
            zoom: 15
        });
        const marker = new window.google.maps.Marker({position: {lat: this.state.lat,lng: this.state.lng}, map: map});
    }

    render() {
        // navigator.geolocation.getCurrentPosition(function (position) {
        //     console.log(`lat:${position.coords.latitude}, lng: ${position.coords.longitude}`);
        // })

        return (
            <div>
                <div id="map"></div>
            </div>
        )
    }
}

const loadScript = function (url) {
    const index = window.document.getElementsByTagName("script")[0]
    const script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true

    index.parentNode.insertBefore(script, index)
}


export default MyMap