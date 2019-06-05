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
const apiKey = require('./components/map/config')
const axios = require('axios')

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
    
    // this.getTripMembers()
    // this.getTripAgenda()
  }

  // getTripMembers = async () => {
  //   let members = this.state.trips[0].members
  //   this.setState({ members })
  // }

  // getTripAgenda = () => {
  //   let { trips } = this.state
  //   let agenda = trips[0].agenda

  //   this.setState({ agenda })
  // }

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
            <Route exact path="/trip" render={({ match }) => <Trip match={match} trips={this.state.trips} />} />
            <Route exaxt path="/dayMap/:day" render={({ match }) => <DayMap match={match} trips={this.state.trips} />} />
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
