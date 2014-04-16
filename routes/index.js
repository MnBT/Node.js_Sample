
exports.index = function(req, res){
    var hostname = "http://"+req.headers.host
    res.render('index',{title: "Виджет для курса валют", hostname: hostname});
};