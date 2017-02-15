var Model = require('../models/Models');
var Validation = require('../utilities/Validation');

exports.Index = function(req, res){
    res.pageInfo.tenUser = req.cookies.tencookie;
    res.render('chat/index',res.pageInfo);
};