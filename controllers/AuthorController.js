var Model = require('../models/Models');
var Validation = require('../utilities/Validation');

exports.Index = function (request, response) {
    Model.AuthorModel.find(function (error, result) {
        if (error) {
            console.log('Error');
            response.render('/', 'There was an error finding authors in the database');
        } else {
            response.pageInfo.title = 'Authors';
            response.pageInfo.authors = result;
            response.render('authors/Index', response.pageInfo);
        }
    });
};

exports.AuthorAdd = function (request, response) {
    response.pageInfo.title = 'Add an Author';
    response.render('authors/AuthorAdd', response.pageInfo);
};

exports.AuthorCreate = function (request, response) {


    var name = request.body.name;
    if (Validation.IsNullOrEmpty([name])) {
        response.render('/authors');
    } else {
        var a = new Model.AuthorModel({
            name: name
        });
        a.save(function (error) {
            if (error) {
                console.log('Error');
                response.redirect('/authors?error=true');
            } else {
                response.redirect('/authors?success=true');
            }
        });
    }
};
exports.AuthorEdit = function (request, response) {
    var id = request.params.id;
    Model.AuthorModel.findOne({_id: id}, function (error, result) {
        if (error) {
            console.log('Error');
            response.redirect('/authors?error=true');
        } else {
            if (result) {
                response.pageInfo.title = 'Edit Author';
                response.pageInfo.author = result;
                response.render('authors/AuthorEdit', response.pageInfo);
            } else {
                response.redirect('/authors');
            }
        }
    });
};
exports.AuthorUpdate = function (request, response) {
    var name = request.body.name;
    if (Validation.IsNullOrEmpty([name])) {
        response.render('/authors', 'Please fill out all fields');
    } else {
        Model.AuthorModel.update(
                {_id: request.body.id},
                {
                    name: name
                },
                {multi: true},
                function (error, result) {
                    if (error) {
                        console.log('Error')
                        response.redirect('/authors?error=true');
                    } else {
                        response.redirect('/authors?success=true');
                    }
                }
        );
    }
};
exports.AuthorDelete = function (request, response) {
    var id = request.params.id;
    Model.AuthorModel.remove({_id: id}, function (error, result) {
        if (error) {
            console.log('Error');
            response.redirect('/authors?error=true');
        } else {
            response.redirect('/authors?success=true');
        }
    });
}

