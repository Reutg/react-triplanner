import { observable, action , computed } from 'mobx'

const axios = require('axios')


export default class Trip {
    @observable ownerID = "5cf431891f20d35c7c3595df"
    @observable trips = [];
    
    // loadTrips = async () => {
    //     let ownerID = this.ownerID
    //     let trips = await axios.get(`http://localhost:4000/trips/${ownerID}`)
    //     this.trips = trips
    // }
    
    }