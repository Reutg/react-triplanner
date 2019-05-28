const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
name: String,
coordinates: {}
})

const user = mongoose.model('user', userSchema)

module.exports = user