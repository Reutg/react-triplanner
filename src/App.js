import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import MyMap from './components/map/MyMap';

import amber from '@material-ui/core/colors/amber';
import NavBar from './components/NavBar';
import SearchTrail from './components/Search/SearchTrail';
import Trip from './components/Trip';
const apiKey = require('./components/map/config')

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8bc34a',
    },
    secondary: amber,
  },
  typography: {
    useNextVariants: true,
  },
});


class App extends Component {



  rendeSearch = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places&language=en`)
  }

  render() {

    return (

      <Router>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <NavBar />
            <Route exact path="/SearchTrail" render={({ match }) => <SearchTrail match={match} />} />
            <Route exact path="/map" render={({ match }) => <MyMap match={match} />} />
            <Route exact path="/trip" render={({ match }) => <Trip match={match} />} />

          </div>
        </MuiThemeProvider>
      </Router>

    );
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

export default App;
