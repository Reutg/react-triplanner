import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { observer } from 'mobx-react'
import './App.css';

import MyMap from './components/map/MyMap';

import amber from '@material-ui/core/colors/amber';
import NavBar from './components/NavBar';
import SearchTrail from './components/Search/SearchTrail';
import Trip from './components/trip/Trip';
import DayMap from './components/trip/DayMap';
import PackingList from './components/trip/PackingList';
const apiKey = require('./components/map/config')
const axios = require('axios')

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0097a7',
    },
    secondary: amber,
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  constructor() {
    super()
    this.state = {
      trips: [],
      ownerID: "5cf431891f20d35c7c3595df",
      members: [],
      agenda: []
    }
    
    this.renderSearch()
  }

  componentWillMount() {
  }
  
  componentDidMount = async () => {
    let { ownerID } = this.state
    
    let trips = await axios.get(`http://localhost:4000/trips/${ownerID}`)
    this.setState({ trips: trips.data })
    
  }

  renderSearch = () => {
    // loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=en`)
  }

  render() {

    return (

      <Router>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <NavBar />
            <Route exact path="/SearchTrail" render={({ match }) => <SearchTrail match={match} />} />
            <Route exact path="/map" render={({ match }) => <MyMap match={match} />} />
            <Route exact path="/" render={({ match }) => <Trip match={match} trips={this.state.trips} />} />
            <Route exaxt path="/dayMap/:day" render={({ match }) => <DayMap match={match} trips={this.state.trips} />} />
            <Route exaxt path="/packingList" render={({ match }) => <PackingList match={match} trips={this.state.trips} />} />
          </div>
        </MuiThemeProvider>
      </Router>

    );
  }
}

// const loadScript = function (url) {
//   const index = window.document.getElementsByTagName("script")[0]
//   const script = window.document.createElement("script")
//   script.src = url
//   script.async = true
//   script.defer = true

//   index.parentNode.insertBefore(script, index)
// }

export default App;
