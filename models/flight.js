const mongoose = require('mongoose')

const Schema = mongoose.Schema

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
    }
})

module.exports = mongoose.model('Flight', flightSchema)

