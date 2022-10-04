const mongoose = require('mongoose')

const Schema = mongoose.Schema

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ["AUS", "DFW", "DEN", "LAX", "SAN"]
     }, 
     arrival: {
        type: Date
     }
})


const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ["American", "Southwest", "United"]
    },
    airport: {
        type: String,
        default: "DEN",
        enum: ["AUS", "DFW", "DEN", "LAX", "SAN"]
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function(){
            return new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            //this function needs to return a new date object thats a year from now
        }

    }
})

module.exports = mongoose.model('Flight', flightSchema)

