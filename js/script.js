$(document).ready(function () {

    let fullNameInput = $('#name-input');
    let userNameInput = $('#username-input');
    let emailInput = $('#email-input');
    let passwordInput = $('#password-input');
    let repeatPasswordInput = $('#repeat-password-input');
    let agreeCheckbox = $('#agreeCheckbox');
    let privacy = $('#privacy');
    let errorPassword = $('#error-password');
    let registrationExtra = $('#registrationExtra');
    let buttonSignUp = $('#button-signUp');
    let account = $('#account');


    buttonSignUp.click(function () {
        let hasError = false;

        $('.error-input').hide();
        //Full Name может содержать только буквы и пробел
        if (!fullNameInput.val().match(/^[A-za-zА-яа-я]+\s*$/)) {
            fullNameInput.next().show()
            fullNameInput.css('border-bottom-color', 'red');
            hasError = true;
        } else fullNameInput.css('border-bottom-color', '#C6C6C4');
        // Your username - может содержать только буквы, цифры, символ подчеркивания и тире
        if (!userNameInput.val().match(/^[A-za-zА-яа-я0-9\-\_]+$/)) {
            userNameInput.next().show()
            userNameInput.css('border-bottom-color', 'red');
            hasError = true;
        } else userNameInput.css('border-bottom-color', '#C6C6C4');
        //Реализовать проверку введенного E-mail на корректность
        if (!emailInput.val().match(/^(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})$/)) {
            emailInput.next().show()
            emailInput.css('border-bottom-color', 'red');
            hasError = true;
        } else emailInput.css('border-bottom-color', '#C6C6C4');
        //Поле пароля должно содержать минимум 8 символов, среди которых есть:
        // - хотя бы одна буква в верхнем регистре
        // - хотя бы одна цифра
        // - хотя бы один спецсимвол
        if (!passwordInput.val().match(/((?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{8}$)/)) {
            passwordInput.next().show()
            passwordInput.css('border-bottom-color', 'red');
            hasError = true;
        } else passwordInput.css('border-bottom-color', '#C6C6C4');

        if (!repeatPasswordInput.val()) {
            repeatPasswordInput.next().show()
            repeatPasswordInput.css('border-bottom-color', 'red');
            hasError = true;
        } else repeatPasswordInput.css('border-bottom-color', '#C6C6C4');

        if (passwordInput.val() !== repeatPasswordInput.val()) {
            errorPassword.show()
            hasError = true;
        } else errorPassword.hide()


        if (!agreeCheckbox.prop('checked')) {
            privacy.show()
            hasError = true;
        } else privacy.hide()

        if (!hasError) {
            let clientsArray;
            let clients = localStorage.getItem('clients');
            if (clients) {
                clientsArray = JSON.parse(clients);

            } else {
                clientsArray = [];
            }

            clientsArray.push({
                fullName: fullNameInput.val(),
                userName: userNameInput.val(),
                email: emailInput.val(),
                password: passwordInput.val()
            });
            localStorage.setItem('clients', JSON.stringify(clientsArray));
            console.log(localStorage);
            $('#popup').show();

        }


    });

    $('#buttonPop').click(function () {
        changeForm();
    });

    account.click(function () {
        changeForm();
    });


    function changeForm() {
        $('#registrationTitle').html('Log in to the system');
        buttonSignUp.html('Sign In');
        $('#removedFullName').fadeOut();
        $('#removedEmail').fadeOut();
        $('#removedRepeatPassword').fadeOut();
        $('#removedAgree').fadeOut();
        $('#popup').fadeOut();
        $('#form')[0].reset();
        account.fadeOut();
        registrationExtra.fadeIn();
    }

    registrationExtra.click(function () {
        location.reload();
    });


    buttonSignUp.on('click', function () {
        let hasError = false;
        let clients = localStorage.getItem('clients');
        let clientsArray = [];
        if (clients) {
            clientsArray = JSON.parse(clients);
        }
        let user = (clientsArray.find(client => client.userName === userNameInput.val()));
        if (user) {
            $('#errorUser').hide();
            hasError = true;
        } else $('#errorUser').show();

        if (clientsArray.find(client => client.password === passwordInput.val())) {
            $('#errorPassword').hide();
            hasError = false;
        } else $('#errorPassword').show();

        if (!hasError) {
            $('#registrationTitle').html('Добро пожаловать, ' + user.fullName);
            $('.registration-text').fadeOut();
            registrationExtra.fadeOut();
            buttonSignUp.html('Exit');
            $('.registration-form-title').fadeOut();
            buttonSignUp.off('click').on('click', function () {
                location.reload();
            });
        }
    });

});
