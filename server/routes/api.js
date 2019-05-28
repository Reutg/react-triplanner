const express = require('express')
const request = require('request')
const router = express.Router()
const Client = require('../models/Client')

module.exports = router

router.get('/clients', async (req, res) => {
    const clients = await Client.find({})
    res.send(clients)
})

router.get('/actions', async (req, res) => {
    const clients = (await Client.find({}))
        .map(client => {
            return {
                clientID: client._id,
                name: client.name,
                owner: client.owner
            }
        })

    res.send(clients)
})

router.post('/clients', async (req, res) => {
    let body = req.body

    let client = new Client({
        name: body.name + " " + body.surname,
        email: null,
        firstContact: new Date(),
        emailType: null,
        sold: false,
        owner: body.owner,
        country: body.country
    })

    await client.save()
    res.send(client)
})

router.put('/clients/:id', async (req, res) => {
    let id = req.params.id
    let body = req.body

    const updatedClient = await Client.findOneAndUpdate({ _id: id }, { name: body.name + " " + body.surname, country: body.country }, { new: true })
    res.send(updatedClient)
})

router.put('/actions/:name', async (req, res) => {
    let name = req.params.name
    let body = req.body

    const updatedClient = await Client.findOneAndUpdate({ name: name }, { owner: body.owner, emailType: body.emailType, sold: true }, { new: true })
    res.send(updatedClient)
})