const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema

const listSchema = new Schema({
    items: [
        {
            category: String,
            text: String,
            isChecked: Boolean,
        }
    ]
})

const list = mongoose.model('List', listSchema)

module.exports = list