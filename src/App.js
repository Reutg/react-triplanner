import React, {Component} from 'react';
import './App.css';
import Trip from './components/Trip';
import MyMap from './components/MyMap';


class App extends Component {

  

  // componentDidMount = () => {
  //   this.renderMap()
  // }

  // renderMap = () => {
  //   loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAp9bb1UC6TntWCOr_VwIQQk_TpKeQJSvo&callback=initMap")
  //   window.initMap = this.initMap
  // }

  // initMap = () => {
  //   const map = new window.google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -34.397, lng: 150.644},
  //     zoom: 6
  //   });

    // var marker = new window.google.maps.Marker({position: uluru, map: map});
  // }

    render() {
    //    navigator.geolocation.getCurrentPosition(function(position) {
    //   console.log(`lat:${position.coords.latitude}, lng: ${position.coords.longitude}`);
    // })

  return (
    <div className="App">
      <MyMap />

      {/* <div id="map"></div> */}
    </div>
  );
}

}

// const loadScript = function(url) {
//   const index = window.document.getElementsByTagName("script")[0]
//   const script = window.document.createElement("script")
//   script.src = url
//   script.async = true
//   script.defer = true

//   index.parentNode.insertBefore(script, index)
// }

export default App;
