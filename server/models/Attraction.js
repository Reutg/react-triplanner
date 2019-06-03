const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema

const attractionSchema = new Schema({
title: { type: String, required: true },
description: String,
startCoor: {
        lat: Number,
        lng: Number
    },
imgUrl: String,
startTime: String,
endTime: String
})

const attraction = mongoose.model('Attraction', attractionSchema)

module.exports = attraction