const Ticket = require('../models/ticket')
const Flight = require('../models/flight')

module.exports = {
    new: newTicket,
    create,
    addToFlight
}

function create(req, res) {
    console.log(req.body, "---")
    req.body.flight = req.params.id
    Ticket.create(req.body, function (err, ticket) {
        res.redirect(`/flights/${ticket.flight}`)
    })
}

function newTicket(req, res) {
    Flight.findById(req.params.flightid, function(err, flight){
        res.render('tickets/new', {
            title:'Add Ticket', 
            flight
        })
    })
}

function addToFlight(req, res){
    Flight.findById(req.params.id, function(err, flight){
        Ticket.find({flight: flight._id}, function(err, tickets){
            res.redirect(`/flights/${flight._id}`)
            flight.save(function(err){
                res.redirect(`/flights/${flight._id}`)
        })
        
        })
    })
}