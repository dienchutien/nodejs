var Model = require('../models/Models');
var Validation = require('../utilities/Validation');
var bcrypt = require('bcrypt-nodejs');
exports.Index = function (request, response) {
    response.pageInfo.title = "API Home"
    response.render('api/Index', response.pageInfo);
};
exports.TestGet = function (request, response) {
    var obj1 = {
        "name": "Ian",
        "favoriteColor": "gray"
    };
    response.json(obj1);    
};
exports.TestPost = function (request, response) {
    console.log(request.body)
    var obj = {"message": "I love " + request.body.author +" My favorite book is " +
                request.body.book};
    response.json(obj);
};
exports.Register = function (request, response) {
    var userName = request.body.userName;
    var email = request.body.email;
    var password = request.body.password;
    
    var salt = bcrypt.genSaltSync(10);
    var passwordHash = bcrypt.hashSync(password, salt);
    var u = new Model.UserModel({
        name: userName,
        password: passwordHash,
        email: email,
        isAdmin: true,
    });
    u.save(function (error) {
        if (error) {
            var obj = {
                "message": "error",                
            };
        } else {
            var obj = {
                "message": "success",                
            };
        }
        response.json(obj);
    });
    
};

//Login
exports.Login = function (request, response) {
    Model.UserModel.findOne({'name': request.body.userName, isAdmin: true}, 'name password',
        function (error, user) {
            if (error) {
                var obj = {
                    "message": "Error",                
                };
            }
// user found
            if (user) {
// compare passwords
                if (bcrypt.compareSync(request.body.password, user.password)) {
                    //request.session.userid = user.name;
                    response.cookie('tencookie', user.name, {maxAge: 9999000});
                    var obj = {
                        "message": "Success",                
                    };
                } else {
                    var obj = {
                        "message": "Error",                
                    };
                }
            } else {
                var obj = {
                    "message": "Error",                
                };
            }
            response.json(obj);
        });

};