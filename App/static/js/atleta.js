var formlogin = document.getElementById("form-login");
var formregistrar = document.getElementById("form-registrar");
var imgportifolio = document.getElementById("img-portifolio");

formregistrar.classList.add('d-none');


$('#login-form-link').on('click', function(e) {
    e.preventDefault();
    formregistrar.classList.add('d-none');
    formlogin.classList.remove('d-none');
    $('#form-registrar').fadeOut();
    $('#img-portifolio').fadeOut();
    $('#form-login').fadeIn();


    document.getElementById('register-form-link').classList.remove('active');
    document.getElementById('login-form-link').classList.add('active');

});

$('#register-form-link').on('click', function(e) {
    e.preventDefault();
    formregistrar.classList.remove('d-none');
    formlogin.classList.add('d-none');

    $('#img-portifolio').fadeOut();
    $('#form-login').fadeOut();
    $('#form-registrar').fadeIn();


    document.getElementById('register-form-link').classList.add('active');
    document.getElementById('login-form-link').classList.remove('active');

});