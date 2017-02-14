var HomeController = require('./controllers/HomeController');
var BookController = require('./controllers/BookController');
var AuthorController = require('./controllers/AuthorController');
var APIController = require('./controllers/APIController');
var AdminController = require('./controllers/AdminController');
var InstallController = require('./controllers/InstallController');
var Authentication = require('./utilities/Authentication');
var UploadController = require('./controllers/UploadController');

// Routes
module.exports = function (app) {
// Main Routes
    app.get('/', HomeController.Index);
    app.get('/other', HomeController.Other);
    
// Book Routes
    app.get('/books', BookController.Index);
    app.get('/books/add', BookController.BookAdd);
    app.post('/books/add', BookController.BookCreate);
    app.get('/books/edit/:id', BookController.BookEdit);
    app.post('/books/edit', BookController.BookUpdate);
    app.get('/books/delete/:id', BookController.BookDelete);
    
// Author Routes
    app.get('/authors', AuthorController.Index);
    app.get('/authors/add', AuthorController.AuthorAdd);
    app.post('/authors/add', AuthorController.AuthorCreate);
    app.get('/authors/edit/:id', AuthorController.AuthorEdit);
    app.post('/authors/edit', AuthorController.AuthorUpdate);
    app.get('/authors/delete/:id', AuthorController.AuthorDelete);
// API Routes
    app.get('/api', APIController.Index);
    app.get('/api/test', APIController.TestGet);
    app.post('/api/test', APIController.TestPost);
    app.post('/api/register', APIController.Register);
    app.post('/api/login', APIController.Login);
// Admin Routes
    app.get('/admin',Authentication.Authenticate,AdminController.Index);
    app.get('/admin/login', AdminController.Login);
    app.post('/admin/login', AdminController.VerifyLogin);
    app.get('/admin/logout', AdminController.Logout);
    app.get('/admin/users', Authentication.Authenticate, AdminController.UsersViewAll);
    app.get('/admin/users/add', Authentication.Authenticate, AdminController.UserAdd);
    app.post('/admin/users/add', Authentication.Authenticate, AdminController.UserCreate);
    app.get('/admin/users/edit/:id', Authentication.Authenticate, AdminController.UserEdit);
    app.post('/admin/users/edit', Authentication.Authenticate, AdminController.UserUpdate);
    app.get('/admin/users/delete/:id', Authentication.Authenticate, AdminController.UserDelete);
    // Installation Routes
    app.get('/install', InstallController.Index);
    app.post('/install', InstallController.Install);
    app.get('/install/success', InstallController.InstallSuccess);
    // upload file
    app.get('/product',Authentication.Authenticate, UploadController.Index);
    app.get('/upload',Authentication.Authenticate, UploadController.UploadForm);
    app.post('/upload',Authentication.Authenticate, UploadController.Upload);
    
};