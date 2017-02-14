var Model = require('../models/Models');
var Validation = require('../utilities/Validation');
var bcrypt = require('bcrypt-nodejs');

exports.Index = function (request, response) {
    response.pageInfo.title = 'Administration Panel Home';
    response.pageInfo.userid = request.session.userid;
    response.render('admin/Index', response.pageInfo);
};
exports.Login = function (request, response) {
    response.pageInfo.title = 'Login';
    response.render('admin/Login', response.pageInfo);
};
exports.Logout = function (request, response) {
    request.session.destroy();
    response.clearCookie('tencookie');
    response.redirect('/')
};
exports.VerifyLogin = function (request, response) {
    Model.UserModel.findOne({'name': request.body.username, isAdmin: true}, 'name password',
            function (error, user) {
                if (error) {
                    Validation.ErrorRedirect(response, '/admin/login', 'There was an error logging in');
                }
// user found
                if (user) {
// compare passwords
                    if (bcrypt.compareSync(request.body.password, user.password)) {
                        //request.session.userid = user.name;
                        response.cookie('tencookie' , user.name, {maxAge : 9999000});
                        response.redirect('/admin/users');
                    } else {
                        Validation.ErrorRedirect(response, '/', 'The username or password were incorrect');
                    }
                } else {
                    Validation.ErrorRedirect(response, '/', 'The user is not found in the database');
                }
            });
};

// Admin - View All Users
exports.UsersViewAll = function (request, response) {
    Model.UserModel.find(function (error, result) {
        if (error) {
            response.redirect('/admin');
        }
        response.pageInfo.title = 'View All Users';
        response.pageInfo.users = result;
        response.pageInfo.tencookie = request.cookies.tencookie;
        response.render('admin/UsersViewAll', response.pageInfo);
    });
};
// Admin - Add User
exports.UserAdd = function (request, response) {
    response.pageInfo.title = 'Add User';
    response.render('admin/UserAdd', response.pageInfo);
};
// Admin - Create User
exports.UserCreate = function (request, response) {
    var errors = false;
    var name = request.body.name;
    var email = request.body.email;
    var password = request.body.password;
    var password2 = request.body.password2;
    var admin = request.body.admin;
    if (Validation.IsNullOrEmpty([name, email, password, password2])) {
        errors = true;
    }
    if (!Validation.Equals(password, password2)) {
        errors = true;
    }
    if (!Validation.ValidateEmail(email)) {
        errors = true;
    }
    if (admin === 'admin')
        isAdmin = true;
    if (errors)
        Validation.ErrorRedirect(response, '/admin/users', 'There was an error adding the user');
    else {
        Model.UserModel.findOne({email: email}, function (error, result) {
// user email already exists
            if (result) {
                Validation.ErrorRedirect(response, '/admin/users', 'This user email already exists in the database');
            } else {
                var salt = bcrypt.genSaltSync(10);
                var passwordHash = bcrypt.hashSync(password, salt);
                var u = new Model.UserModel({
                    name: name,
                    password: passwordHash,
                    email: email,
                    isAdmin: isAdmin
                });
                u.save(function (error) {
                    if (error)
                        Validation.ErrorRedirect(response, '/admin/users', 'There was an error adding the user');
                    else
                        Validation.SuccessRedirect(response, '/admin/users', 'User added successfully');
                });
            }
        });
    }
};

// Admin - Edit User
exports.UserEdit = function (request, response) {
    var id = request.params.id;
    Model.UserModel.findOne({_id: id}, function (error, result) {
        if (error) {
            Validation.ErrorRedirect(response, '/admin/users', 'There was an error finding a user with this id in the database');
        }
        response.pageInfo.title = 'Edit User';
        response.pageInfo.user = {
            id: result._id,
            name: result.name,
            email: result.email,
            isAdmin: result.isAdmin
        };
        response.render('admin/UserEdit', response.pageInfo);
    });
};
// Admin - Update User
exports.UserUpdate = function (request, response) {

    var errors = false;
    var isAdmin = false;
    var name = request.body.name;
    var email = request.body.email;
    var admin = request.body.admin;
    if (Validation.IsNullOrEmpty([name, email]))
        errors = true;
    if (!Validation.ValidateEmail(email))
        errors = true;
    if (admin === 'admin')
        isAdmin = true;
    if (errors)
        Validation.ErrorRedirect(response, '/admin/users', 'There was an error updating the user');
    else {
        Model.UserModel.update(
                {_id: request.body.id},
                {
                    name: name,
                    email: email,
                    isAdmin: isAdmin
                },
                {multi: true},
                function (error, result) {
                    if (error) {
                        Validation.ErrorRedirect(response, '/admin/users', 'There was an error updating the user');
                    } else {
                        Validation.SuccessRedirect(response, '/admin/users', 'User updated successflly');
                    }
                }
        );
    }
};
// Admin - Delete User
exports.UserDelete = function (request, response) {
    Model.UserModel.remove({_id: request.params.id}, function (error, result) {
        if (error) {
            Validation.ErrorRedirect(response, '/admin/users', 'There was an error deleting the user');
        } else {
            Validation.SuccessRedirect(response, '/admin/users', 'User deleted successfully');
        }
    });
};