import React, { Component } from 'react'

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
});

class SearchPlace extends Component {

    rendeSearch = () =>{
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places&language=en`)
    }

    render() {
        const { classes } = this.props
        return (
            <div>
               <Input
                    placeholder="Enter location"
                    id="places-search"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                /> 
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

export default withStyles(styles)(SearchPlace);