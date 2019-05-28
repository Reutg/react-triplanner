const mongoose = require('mongoose')
const Trail = require('./Trail')
const Member = require('./Member')

const Schema = mongoose.Schema

const tripSchema = new Schema({
name: String,
trails: {type: mongoose.Schema.Types.ObjectId,
    ref: Trail},
members: {type: mongoose.Schema.Types.ObjectId,
    ref: Member}
})

const trip = mongoose.model('trip', tripSchema)

module.exports = trip