var fs = require('fs');

module.exports = (function () {

    var dbFilePath = './db/db.json';

    var getDataFromFile = function (path) {
      try {
        var result = fs.readFileSync(path, 'utf8');
        return JSON.parse(result);
      } catch(e) {           
        return [];
      }
    };
    
    var data = getDataFromFile(dbFilePath);
    
    var _find = function() {
      var result = [];      
      for (var i = 0; i < data.length; ++i) {
        result.push(data[i]);
      }        
      return result;      
    }; 

    var _findById = function(id){
      var result = [];      
      result.push(data[id]);        
      return result;
    };
    var _remove = function(id){        
      delete data[id];    
      data.push();            
            try {
                fs.writeFileSync(
                    dbFilePath, 
                    JSON.stringify(data), 
                    { flag: 'w+' }
                );   
                data = getDataFromFile(dbFilePath);
            } catch(e) {                
                return false;
            }
            return true;
    };    

    var getUserLoginAndPassword = function (params) {
            var result = {};                      
            result = {
                id: data.length+1,                               
                login: params.login,
                password: params.password
            };
          return result;
    }; 
    var getUserLoginAndPassword1 = function (params) {
            var result = {};                      
            result = { 
                id: params.id,                                              
                login: params.login,
                password: params.password
            };
          return result;
    };   

    var _save = function (params) {           
            data.push(getUserLoginAndPassword(params));            
            try {
                fs.writeFileSync(
                    dbFilePath, 
                    JSON.stringify(data), 
                    { flag: 'w+' }
                );   
                data = getDataFromFile(dbFilePath);
            } catch(e) {                
                return false;
            }
            return true;
    };

    var _saveId = function (params) {           
            data[params.id] = (getUserLoginAndPassword1(params));            
            try {
                fs.writeFileSync(
                    dbFilePath, 
                    JSON.stringify(data), 
                    { flag: 'w+' }
                );   
                data = getDataFromFile(dbFilePath);
            } catch(e) {                
                return false;
            }
            return true;
    };
    

    return {
        _find: _find,
        _save: _save,       
        _findById: _findById,
        _remove: _remove,
        _saveId:_saveId
    };

})();