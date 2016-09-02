var fs = require('fs');

module.exports = (function () {

	var dbFilePath = './data/user.json';
	var data = [];
	var sessions = [];

	var initialize = function () {
		data = getDataFromFile(dbFilePath);
	};

	var getDataFromFile = function (path) {
        try{
            var result = fs.readFileSync(path, 'utf8');
            return JSON.parse(result);
        } catch(e) {            
            return [];
        }            
    };

    var authenticate = function (login, pw) {
    	var users = [];
    	for (var i = 0; i < data.length; ++i) {
    		if (data[i].login === login && data[i].pw === pw) {
    			users.push(data[i]);
    		}
    	}
    	if (users.length > 1) {    		
    		throw {
    			message: "Bad DB"
    		};
    	}
    	if (users.length === 1) {
    		return createSession(users[0]);
    	} else {
    		return null;
    	}
    };

    var createSession = function (user) {
    	var sessionId = sessions.length + 1;
    	var session = {
    		id: sessionId,
    		user_id: user.id,
    		user_name: user.name,
    		token: generateToken()
    	};
    	sessions.push(session);
    	return session;
    };

    var generateToken = function () {
    	var letter = "fdgfdslkjlfkdsjhfdsfFGFDSFDSFFDSFDSFcxzczxpr5574876985674597";
    	var token = '';
    	for (var i = 0; i < 32; ++i) {
    		token += letter[Math.floor(Math.random() * (letter.length)) + 1];
    	}    	
    	return token;
    };

    var hasSession = function (token, executable) {
    	var session = null;
    	for (var i = 0; i < sessions.length; ++i) {
    		if (sessions[i].token === token) {    			
    			session = sessions[i];
    		}
    	}
        if (session) {
            executable();
        } else {
            throw { status: 401 };
        }
    }

    var authorize = function (req, res, executable) {
        try {
            hasSession(req.headers.token, function () {
                res.send(executable());
            });   
        } catch (error) {        
            res.statusCode = error.status;
            res.send();
        }   
    }

	initialize();

	return {
		authenticate: authenticate,
		authorize: authorize
	};
})();