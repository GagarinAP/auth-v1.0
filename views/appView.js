var userModule = require('./../models/userModule.js');

module.exports = (function () {

    var authenticate = function (params) {
        var session = userModule.authenticate(params.login, params.pw);
        delete session.user_id;
        delete session.id;
        return session;
    };

    var hello = function (params) {               
        return '';
    }
    
    return {        
        authenticate: authenticate,
        hello: hello        
    };
})();