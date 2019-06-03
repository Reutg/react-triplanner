const mongoose = require('mongoose')
const Attraction = require('./Attraction')
const User = require('./User')

const Schema = mongoose.Schema

const agendaSchema = new Schema({
    day: Number,
    trails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction'
    }]
})

const tripSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    destination: String,
    agenda: [agendaSchema],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    startDate: String,
    endDate: String
})

const Trip = mongoose.model('trip', tripSchema)

const Agenda = mongoose.model('agenda', agendaSchema)

module.exports = {Trip, Agenda}
