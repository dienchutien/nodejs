exports.Authenticate = function (request, response, next) {
    if (request.session.userid) {
        return next();
    } else {
        response.redirect('/admin/login');
    }
};