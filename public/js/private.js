$(function () {
    window.KeysAppPrivate = (function () {

        var session = null;

        var initialize = function () {
            var token = sessionStorage.getItem('token');            
               if (token) {
                    session = {};            
                    session.token = token;
                    session.user_name = sessionStorage.getItem('user_name');
                    showAuthenticatedUserForm();
               }
        };        

        var authenticate = function () {
          var login = $('#login-form input[name="login"]').val(); 
          var pw = $('#login-form input[name="pw"]').val(); 
          $.ajax({
            url: '/authenticate',
            method: 'POST',
            data: {
                login: login,
                pw: pw
            }
          }).done(function (data) {
            session = data;
            showAuthenticatedUserForm();
            sessionStorage.setItem('token', session.token);
            sessionStorage.setItem('user_name', session.user_name);
          }).fail(function (error) {

          });
        };

        var showAuthenticatedUserForm = function () {
            $('#login-form').hide();
            $('#user-info').html('<div>Hello, ' + 
                session.user_name + 
                '</div>'); 
            $('#Button').show();           
        };

        var showLoginForm = function () {
            $('#login-form').show();            
            $('#user-info').html('');
            $('#Button').hide();            
        };

        var hello = function () {
            $.ajax({
                url: '/hello',
                headers: {
                    token: session.token
                }
            }).done(function (data) {
                /*$('#hello').html(data);*/clearSession();
            }).fail(function (error) {
                if (error.status === 401) {
                    clearSession();                    
                    showLoginForm();
                }
            });
        };

        var clearSession = function () {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user_name');
            session = null;
        };
        
        initialize();
        
        return {
            authenticate: authenticate,
            hello: hello
        };
    })();
});
