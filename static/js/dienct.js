$(function () {

    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $("#register-submit").click(function (e) {
        var userName = $('#usernameRegis').val();
        var email = $('#emailRegis').val();
        var password = $('#passwordRegis').val();
        var confirmPass = $('#confirm-passwordRegis').val();
        if (password !== confirmPass) {
            alert('kiem tra lai pass');
            return;
        }
        if (userName == '' || email == '' || password == '') {
            alert('kiem tra thong tin dau vao');
            return;
        }

        var postData = {
            "userName": userName,
            "email": email,
            "password": password,
            "confirmPass": confirmPass,
        };

        jQuery.ajax({
            url: '/api/register',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            type: 'POST',
            data: JSON.stringify(postData),
            success: function (data, textStatus, jqXHR) {
                alert(JSON.stringify(data.message));
            },
            error: function () {
                alert(JSON.stringify(data.message));
            }
        });
    });// End Register

    // Login
    $("#login-submit").click(function (e) {
        var userName = $('#username').val();
        var password = $('#password').val();
        if (userName == '') {
            alert('kiem tra thong tin dau vao');
            return;
        }
        var postData = {
            "userName": userName,
            "password": password            
        };
        jQuery.ajax({
            url: '/api/login',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            type: 'POST',
            data: JSON.stringify(postData),
            success: function (data, textStatus, jqXHR) {
                window.location.href = '/admin/users'; //Will take you to Google.
            },
            error: function () {
                alert(JSON.stringify(data.message));
            }
        });
        
        
    });

});
