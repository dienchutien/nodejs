var Model = require('../models/Models');
var Validation = require('../utilities/Validation');

exports.Index = function(req, res){
    Model.ChatModel.find(function (error, result) {
        if (error) {
            console.log('Error');
            res.render('/', 'There was an error finding authors in the database');
        } else {
            res.pageInfo.chat = result;
            res.pageInfo.tenUser = req.cookies.tencookie;
            res.render('chat/index',res.pageInfo);
        }
    });
    
    
    
};