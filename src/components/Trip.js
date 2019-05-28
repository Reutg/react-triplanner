import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';

// const apiKey = 'AIzaSyAp9bb1UC6TntWCOr_VwIQQk_TpKeQJSvo'


class Trip extends Component {
    
  render() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(`lat:${position.coords.latitude}, lng: ${position.coords.longitude}`);
    })

     return (
      <div>
        
      </div>     
      )
  }
}

export default Trip