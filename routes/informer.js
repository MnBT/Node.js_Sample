exports.get = function(req, res){
    var params = req.query;
    if (params.type == "h") {
        res.render('informer', { type: "h"});
    } else {
        res.render('informer', { type: "v"});
    }
};