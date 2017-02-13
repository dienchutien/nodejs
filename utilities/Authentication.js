exports.Authenticate = function (request, response, next) {
    if (request.cookies.tencookie != undefined && request.cookies.tencookie !== null) {
        //console.log(request.cookies.tencookie);
        return next();
    } else {
        response.redirect('/admin/login');
    }
};