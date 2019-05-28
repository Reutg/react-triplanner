const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trailSchema = new Schema({
title: String,
lat: Number,
lng: Number,
imgUrl: String,
})

const trail = mongoose.model('trail', trailSchema)

module.exports = trail