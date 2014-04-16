var mongoose    = require('mongoose');
var log         = require('./libs/log')(module);
var config      = require('./libs/config');

mongoose.connect(config.get('mongoose:uri'));

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

var ExchangeRate = new Schema({
    from: {
        type: String,
        required: true,
        max: 3
    },
    to: {
        type: String,
        required: true,
        max: 3
    },
    rate: {
        type: Number
    },
    date: { type: Date, required: true }
});

mongoose.model('ExchangeRate', ExchangeRate);