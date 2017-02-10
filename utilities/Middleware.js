exports.AppendNotifications = function (request, response, next) {
    response.pageInfo = {};
    response.pageInfo.notifications = {};
    response.pageInfo.notifications.message = '';
    if (request.param('message')) {
        response.pageInfo.notifications.message = request.param('message');
    }
    if (request.param('success')) {
        response.pageInfo.notifications.success = "Success!"
    } else if (request.param('error')) {
        response.pageInfo.notifications.error = "Error!"
    }
    next();
};