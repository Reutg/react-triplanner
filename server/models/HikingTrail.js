const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hikingTrailSchema = new Schema({
title: String,
description: String,
distance: Number,
routeType: String,
startCoor: {
        lat: Number,
        lng: Number
    },
endCoor: {
    lat: Number,
    lng: Number
},
imgUrl: String,
})

const hikingTrail = mongoose.model('hikingTrail', hikingTrailSchema)

module.exports = hikingTrail