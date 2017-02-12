var config = require('../config');
var mongoose = require('mongoose');

var connectionString = 'mongodb://' + config[config.environment].database.credentials +
config[config.environment].database.host + ':' + config[config.environment].database.port +
        '/' + config[config.environment].database.name;
var db = mongoose.connection;

db.on('error', function () {
    console.log('There was an error connecting to the database');
});
db.once('open', function () {
    console.log('Successfully connected to database');
});

mongoose.connect(connectionString);
var Book = new mongoose.Schema({
    title: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    isPublished: Boolean
});
var Product = new mongoose.Schema({
    title: String,
    comment: String,
    avatar: String
});
var User = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    isAdmin: Boolean
});
var Author = new mongoose.Schema({
    name: String
});

var BookModel = mongoose.model('Book', Book);
var UserModel = mongoose.model('User', User);
var AuthorModel = mongoose.model('Author', Author);
var ProductModel = mongoose.model('Product', Product);

module.exports = {
    BookModel: BookModel,
    UserModel: UserModel,
    AuthorModel: AuthorModel,
    ProductModel: ProductModel
};