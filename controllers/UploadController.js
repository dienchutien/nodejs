var Model = require('../models/Models');
var Validation = require('../utilities/Validation');
exports.Index = function (request, response) {
        Model.ProductModel.find(function (error, result) {
            if (error) {
                console.log('Error');
                Validation.ErrorRedirect(response, '/product', 'There was an error finding books in the database');
            } else {
                response.pageInfo.title = 'product';
                response.pageInfo.product = result;
                response.render('uploadfile/Default', response.pageInfo);
            }
        });
};
exports.UploadForm = function (request, response) {
    response.pageInfo.title = 'upload form';
    response.render('uploadfile/Index', response.pageInfo);
};

exports.Upload = function (req, res) {
    var sampleFile;
    var fileName;    
    fileName = req.files.sampleFile.name;
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
    sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server 
    sampleFile.mv('./static/uploads/'+fileName, function (err) {
        if (err) {
            console.log('File uploaded ERROR');
        } else {
            console.log('File uploaded');
        }
    });
    
    var title = req.body.title;
    var comment = req.body.comment;
    var b = new Model.ProductModel({
        title: title,
        comment: comment,
        avatar: fileName
    });
    b.save(function (error) {
        if (error) {
            console.log('Error');
            res.redirect('/product?error=true&message=There was an error adding the product to the database');
        } else {
            res.redirect('/product?success=true&message=product_created_successfully');
        }
    });
        
};
