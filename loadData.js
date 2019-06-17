let data = require('./trails.json')
let attractions = require('./attractions.json')
const HikingTrail = require('./server/models/HikingTrail')
const Attraction = require('./server/models/Attraction')
const {Trip} = require('./server/models/Trip')
const User = require('./server/models/User')


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/travelDB', { useNewUrlParser: true })

for (let hike of data) {
    let hikeTrail = {
        title: hike.title,
        description: hike.description,
        distance: hike.distance,
        routeType: hike.routeType,
        startCoor: hike.start,
        endCoor: hike.end,
        imgUrl: hike.img
    }
    let trail = new HikingTrail(hikeTrail)
    // trail.save()
}

for (let attraction of attractions) {
    let attr = new Attraction({
        title: attraction.title,
        description: attraction.description,
        startCoor: attraction.startCoor,
        imgUrl: attraction.imgUrl,
        startTime: attraction.startTime,
        endTime: attraction.endTime
    })

    // attr.save()
}

let member1 = new User({
    name: "Moshe",
    email: "moshe@mail.com",
    password: "",
    imgURL: "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"
})

let member2 = new User({
    name: "Sharon",
    email: "sharon@mail.com",
    password: "",
    imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdgjWiNdl9_bWqxProSqcSkZC-MDflnMQC1kHTKDWJbBA8T4DE"
})

let member3 = new User({
    name: "John",
    email: "john@mail.com",
    password: "",
    imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu-r0mf-PrHjeq9w1GH1MN6Ju1GM8ZbBlXVZIZe3GP0q6EuYpv"
})

let user1 = new User({
    name: "Reut",
    email: "reut@mail.com",
    password: "",
    imgURL: "https://www.shareicon.net/download/2015/09/18/103157_man_512x512.png"
})
let trip1 = new Trip({
    owner: user1,
    name: "Family vacation",
    destination: "Italy",
    agenda: [
        {
            day: 1,
            trails: []
        },
        {
            day: 2,
            trails: []
        },
        {
            day: 3,
            trails: []
        }
    ],
    members: [member1, member2, member3],
    startDate: "12.06.2019",
    endDate: "14.06.2019",
    packingList: []
})
    
    // user1.save()

    // trip1.members = [member1,member2,member3]
    

    //  member1.save()
    //  member2.save()
    //  member3.save()

    //  trip1.save()



