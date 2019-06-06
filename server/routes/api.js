const express = require('express')
const request = require('request')
const router = express.Router()
const HikingTrail = require('../models/HikingTrail')
const {Trip , Agenda} = require('../models/Trip')
const Attraction = require('../models/Attraction')


module.exports = router

router.get('/hikingTrails' , async (req,res) => {
    const hikingTrails = await HikingTrail.find({})
    res.send(hikingTrails)
})

router.get('/trips/:ownerID', async (req,res) => {
    let ownerID = req.params.ownerID

    const trips = await Trip.find({owner: ownerID})
    .populate(['members' , 'agenda.trails'])

    res.send(trips)
})


router.get('/trip/:id' , async (req,res) => {
    let id = req.params.id

    const trip = await Trip.findOne({_id: id})
    .populate(['members' , 'agenda.trails'])
    res.send(trip)
})

router.get('/trip-members/:tripID', async (req,res) => {
    let tripID = req.params.tripID

    
    const trip = await Trip.findOne({_id: tripID})
    .populate('members')
    
      
      res.send(trip.members)
})

router.post('/trip', async (req,res) => {
    let body = req.body

    let trip = new Trip({
        owner: "5cf431891f20d35c7c3595df",
        name: body.tripName,
        destination: body.destination,
        agenda: body.agenda,
        members: body.memberID,
        startDate: body.startDate,
        endDate: body.endDate 
    })

    await trip.save()
    res.send(trip)
})

// router.put('/trip/:tripID', async (req,res) => {
//     let tripID = req.params.tripID
//     let body = req.body

//     const trip = await Trip.findOne({ _id: tripID })
//     trip.agenda[day].push(body)
//     await trip.save()
//     res.send(trip)

// })

router.post('/attraction', async (req,res) => {
    const {day, tripID, ...body} = req.body
    const attraction = new Attraction(body)
    await attraction.save()

    const trip = await Trip.findOne({ _id: tripID })
    trip.agenda[day].trails.push(attraction._id)
    await trip.save()
    res.send(trip)
})