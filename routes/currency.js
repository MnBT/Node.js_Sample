var mongoose = require('mongoose');
var async = require('async');
var moment = require('moment');
var request = require('request');

var exchange_rate_api = "http://rate-exchange.appspot.com/currency";

exports.get = function (req, res) {
    var params = req.query;
    if (params.to && params.from) {
        async.waterfall([
            function(callback) {
                request(exchange_rate_api+"?from="+params.from+"&to="+params.to, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var answer = JSON.parse(body);
                        if (answer.err) {
                            res.json({result: "invalid request"});
                            return;
                        }
                        callback(null,answer);
                    }
                });
            },
            function(answer, callback) {
                var ExchangeRate = mongoose.model('ExchangeRate');
                async.waterfall([
                    function (callback) {
                        var condition = {
                            to: params.to,
                            from: params.from,
                            date: moment().format('L')
                        }
                        ExchangeRate.findOne(condition, function (err, result) {
                            if (!result) {
                                var exchange_rate = new ExchangeRate();
                                exchange_rate.from = params.from;
                                exchange_rate.to = params.to;
                                exchange_rate.date = moment().format('L');
                                exchange_rate.rate = answer.rate;
                                exchange_rate.save(function (error) {
                                    if (error) return handleError(error);
                                    callback(null, exchange_rate);
                                });
                            } else {
                                callback(null, result);
                            }
                        })
                    },
                    function (record, callback) {
                        res.json({rate: record.rate });
                    }
                ], function (err, result) {
                    res.json({result: "invalid request"});
                });
            }
        ], function (err, result) {
            res.json({result: "invalid request"});
        });
    } else {
        res.json({result: "invalid request"});
    }
};