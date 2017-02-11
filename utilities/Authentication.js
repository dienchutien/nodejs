exports.Authenticate = function (request, response, next) {
    if (Object.keys(request.cookies).length > 0) {
        //console.log(Object.keys(request.cookies).length);
        return next();
    } else {
        response.redirect('/admin/login');
    }
};