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
import LaunchScreen from './components/LaunchScreen';
import Flight from './components/trip/Flight';
const apiKey = require('./components/map/config')
const axios = require('axios')

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff6e40',
    },
    secondary: {
      main: '#263238'
    },
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  constructor() {
    super()
    this.state = {
      trip: "",
      ownerID: "5cf431891f20d35c7c3595df",
      members: [],
      agenda: [],
      showLaunchScreen: true
    }

    this.renderSearch()
  }

  componentDidMount = async () => {
    await this.loadData()
  }

  loadData = async () => {
    let { ownerID } = this.state

    let trips = await axios.get(`http://localhost:4000/trips/${ownerID}`)

    //delay the launch screen
    setTimeout(() => this.setState({ trip: trips.data[0], showLaunchScreen: false }), 0)
  }

  renderSearch = () => {
    // loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=en`)
  }

  addToPackingList = async (category,text) => {
    const item = {
      tripID: this.state.trip._id,
      category,
      text,
      isChecked: false,
    }

    const trip = (await axios.put(`http://localhost:4000/trip/${item.tripID}/packingList`, item)).data
    this.setState({trip})
  }

  handleCheck = async (itemID, isChecked) => {
    let trip = (await axios.put(`http://localhost:4000/trip/${this.state.trip._id}/packingList/${itemID}`, {isChecked})).data
    this.setState({trip})
  }

  deleteListItem = async (itemID) => {

    let trip = (await axios.delete(`http://localhost:4000/trip/${this.state.trip._id}/packingList/${itemID}`)).data
    this.setState({trip})
  }

  render() {

    if (this.state.showLaunchScreen) {
      return <LaunchScreen />
    }

    return (

      <Router>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <NavBar />
            <Route exact path="/SearchTrail" render={({ match }) => <SearchTrail match={match} />} />
            <Route exact path="/map" render={({ match }) => <MyMap match={match} trip={this.state.trip} loadData={this.loadData} />} />
            <Route exact path="/" render={({ match }) => <Trip match={match} trip={this.state.trip} />} />
            <Route exaxt path="/dayMap/:day" render={({ match }) => <DayMap match={match} trip={this.state.trip} />} />
            <Route exaxt path="/packingList" render={({ match }) => <PackingList 
                                                                      match={match} 
                                                                      trip={this.state.trip} 
                                                                      addToPackingList={this.addToPackingList} 
                                                                      handleCheck={this.handleCheck} 
                                                                      deleteListItem={this.deleteListItem} />} />
            <Route exaxt path="/flights" render={({ match }) => <Flight
                                                                      match={match} 
                                                                      trip={this.state.trip} 
                                                                       />} />                                                          
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
