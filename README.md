# Triplanner

A trip planner app that helps you organize and share your trips with your co-travelers.

Demo: https://reut-triplanner.herokuapp.com

## Running the project

1. Clone the repo.
1. Run `npm install`.
1. Generate [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) and replace the current API key in line 23 in `public/index.html` file.
1. Run `npm run build`
1. Run `npm start`.
1. Navigate to `http://localhost:4000`.

## Screens

### My Trip

![screenshot](assets/trip.png)
An overview of your trip, including your co-travelers, the trip information and the agenda for each day.

### New Attraction

![screenshot](assets/new-attraction.png)
Find your next attraction and add it to your trip.

### Packing List

![screenshot](assets/packing-list.png)
Manage the trip's packing list.

### Daily Route

![screenshot](assets/day-trip.png)
Map view for the attractions of each day.

## TODO

1. Create data seeders.
1. Enable multiple trips.
1. Add the ability to run the project in `watch` mode.
