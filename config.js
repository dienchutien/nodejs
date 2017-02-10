var config = {};
config.development = {
    database: {
        name: 'MVCApplication',
        host: 'localhost',
        port: '27017',
        credentials: '' // username:password@
    },
    smtp: {
        username: "username",
        password: "password",
        host: "smtp.gmail.com",
        port: 587,
        ssl: false
    },
    application: {
        port: 1337,
        sessionKey: 'm2LlqerNK7YmDj',
        cookieKey: 'nP7OsqnKa07Rut'
    }
};

config.production = {
    database: {
        name: 'proddb',
        host: 'localhost',
        port: '8080',
        credentials: 'admin:password@' // username:password@
    },
    smtp: {
        username: "username",
        password: "password",
        host: "smtp.yourmailserver.com",
        port: 25,
        ssl: false
    },
    application: {
        port: 80,
        sessionKey: '0Sy6Ln34xyvcpP',
        cookieKey: 'S0QG5MWAtLGG77'
    }
};
config.environment = 'development';
module.exports = config;