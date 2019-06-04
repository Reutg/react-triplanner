import React, { Component } from 'react'

import { withStyles } from '@material-ui/styles';
import { Input } from '@material-ui/core';

// const apiKey = require('./config')

const styles = theme => ({
    input: {
        margin: theme.spacing(1),
        width: '90%',
        align: 'left'
    },
});

class SearchPlace extends Component {
    

    rendeSearch = () =>{
        // loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places&language=en`)
        
        let input = document.getElementById('places-search');
        let autocomplete = new window.google.maps.places.Autocomplete(input);

        autocomplete.setFields(
            ['address_components', 'geometry', 'icon', 'name', 'photos']);
        let infowindow = new window.google.maps.InfoWindow();
        const infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);

        const request = {
            placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
            fields: ['name', 'formatted_address', 'place_id', 'geometry']
        }

        const service = new window.google.maps.places.PlacesService(('#places-search').get(0));

        service.getDetails(request, function (place, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
           console.log(place.geometry.location)
            }
        });


        autocomplete.addListener('place_changed', function () {
            infowindow.close();
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            let address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
                console.log(place, address)
            }

            if (place.photos) {
                for (let i = 0; i < place.photos.length; i++) {
                    console.log(place.photos[i].getUrl())
                }
            }
        });
    }

    

render() {
        const { classes } = this.props
        return (
               <Input
                    placeholder="Enter location"
                    id="places-search"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />  
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