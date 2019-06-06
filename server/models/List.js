const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    category: String,
    name: String,
    isDone: { type: Boolean, default: false },
    notes: Array
})

const listSchema = new Schema({
tripID:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip'
},
items: [itemSchema]
})

const list = mongoose.model('List', listSchema)

module.exports = list