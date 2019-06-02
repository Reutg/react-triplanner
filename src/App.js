import React, {Component} from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
// import Trip from './components/Trip';
import MyMap from './components/Map/MyMap';

// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import amber from '@material-ui/core/colors/amber';
import NavBar from './components/NavBar';
import SearchTrail from './components/Search/SearchTrail';


const theme = createMuiTheme({
  palette: {
    primary:  {
      main: '#8bc34a',
    },
    secondary: amber,
  },
  typography: {
    useNextVariants: true,
  },
});


class App extends Component {

    render() {

  return (

    <Router>
      <MuiThemeProvider theme={theme}>
              <div className="App">
        <NavBar />
        <Route exact path="/SearchTrail" render={({ match }) => <SearchTrail match={match} />} />
        <Route exact path="/map" render={({ match }) => <MyMap match={match} />} />

      </div>
      </MuiThemeProvider>
</Router>

  );
}

}

export default App;
