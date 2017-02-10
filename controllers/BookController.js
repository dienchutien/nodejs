var Model = require('../models/Models');
var Validation = require('../utilities/Validation');
exports.Index = function (request, response) {
    Model.BookModel.find({}).populate('author').exec(function (error, result) {
        if (error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/', 'There was an error finding books in the database');
        } else {
            response.pageInfo.title = 'Books';
            response.pageInfo.books = result;
            response.render('books/Index', response.pageInfo);
        }
    });
};
exports.BookAdd = function (request, response) {
    Model.AuthorModel.find({}).exec(function (error, result) {
        if (error) {
            response.redirect('/books?error=true');
        } else {
            response.pageInfo.authors = result;
        }
    }).then(function () {
        response.pageInfo.title = 'Add a Book';
        response.render('books/BookAdd', response.pageInfo);
    });
};
    

exports.BookCreate = function (request, response) {
    var title = request.body.title;
    var author = request.body.author;
    if(Validation.IsNullOrEmpty([title, author])) {
        response.redirect('/books/add?error=true');
        return;
    }
    if (request.body.published === 'published') {
        isPublished = true;
    }
    var b = new Model.BookModel({
        title: title,
        author: author,
        isPublished: true
    });
    b.save(function (error) {
        if (error) {
            console.log('Error');
            response.redirect('/books?error=true&message=There was an error adding the book to the database');
        } else {
            response.redirect('/books?success=true&message=Book created successfully');
        }
    });
};
exports.BookDelete = function (request, response) {
    var id = request.params.id;
    Model.BookModel.remove({_id: id}, function (error, result) {
        if (error) {
            console.log('Error');
            response.redirect('/books?error=true&message=There was an error deleting the book');
        } else {
            response.redirect('/books?success=true&message=Book deleted successfully');
        }
    });
};

//Edit
exports.BookEdit = function (request, response) {
    var id = request.params.id;
    Model.BookModel.findOne({_id: id}).populate('author').exec(function (error, result) {
        if (error) {
            console.log('Error');
            Validation.ErrorRedirect(response, '/books', 'There was an error finding a book in the database with this id');
        } else {
            if (result) {
                response.pageInfo.book = result;
                Model.AuthorModel.find({}).exec(function (error, result) {
                    if (error) {
                        Validation.ErrorRedirect(response, '/books', 'There was an error getting the author list');
                    } else {
                        response.pageInfo.title = 'Edit Book';
                        response.pageInfo.authors = result
                        response.render('books/BookEdit', response.pageInfo);
                    }
                });
            } else {
                Validation.ErrorRedirect(response, '/books', 'There was an error finding a book in the database with this id');
            }
        }
    });
}
exports.BookUpdate = function (request, response) {
    var title = request.body.title;
    var author = request.body.author;
    Model.BookModel.update(
            {_id: request.body.id},
            {
                title: title,
                author: author
            },
            {multi: true},
            function (error, result) {
                if (error) {
                    console.log('Error');
                    response.redirect('/books?error=true&message=There was an error updating the book in the database');
                } else {
                    response.redirect('/books?success=true&message=Book updated successfully');
                }
            }
    );
}