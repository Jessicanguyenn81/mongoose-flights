const Flight = require('../models/flight');
const Ticket = require('../models/ticket');



module.exports = {
    new: newFlights,
    create,
    index,
    show
}

function newFlights (req, res) {
    const newFlight = new Flight()
    // Obtain the default date
    const dt = newFlight.departs;
    console.log(newFlight)
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', {
        title:'New Flight', departsDate});
}

function create (req, res) {
    const flight = new Flight(req.body)
    flight.save(function(err){
        if (err) return res.redirect('/flights/new')
        console.log(flight)
        res.redirect('/flights/${flight._id}')
    })

} 

function index (req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', { 
            title: 'All Flights', flights})
    })
}

function show (req, res) {
    console.log(req.params.id, '----')
    Flight.findById(req.params.id, function(err, flight){
        Ticket.find({flight: flight._id}, function(err, tickets){
            console.log(flight, "+++") 
            res.render('flights/show', {
                title:'Flight Details', flight, tickets
            }) 
        })
    })

    // .populate('flight').exec(function(err, flight){
        // Ticket.find(
        //     {_id:{$nin: flight.seat}},
        //     function(err, tickets){
        //         res.render('flights/show', {
        //         title:'Flight Details', flight})
        //     }
        // )
    // })
}