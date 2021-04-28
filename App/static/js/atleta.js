var formlogin = document.getElementById("form-login");
var formregistrar = document.getElementById("form-registrar");
var imgportifolio = document.getElementById("img-portifolio");
var divsimulator = document.getElementById("div-simulator");
var btnmenu = document.getElementById("btn-menu");
var edtcaloriasexercises = document.getElementById('edt-caloriasexercises');
var edtcaloriasmeta = document.getElementById('edt-caloriasmeta');

var curRadio = 'ganho';
var vlalvo = 0;
var vlcalmoreless = 0;
var vlcalexerc = 0;

verifydadosgerais();

document.getElementById("edtdateniver").value = retornadata(new Date(),'-');
verificametaselect(0);
formregistrar.classList.add('d-none');
divsimulator.classList.add('d-none');

// clica no botão de LOGIN
$('#login-form-link').on('click', function(e) {
    e.preventDefault();
    divsimulator.classList.add('d-none');
    formregistrar.classList.add('d-none');
    formlogin.classList.remove('d-none');
    $('#form-registrar').fadeOut();
    $('#img-portifolio').fadeOut();
    $('#form-login').fadeIn();


    document.getElementById('register-form-link').classList.remove('active');
    document.getElementById('login-form-link').classList.add('active');
    document.getElementById('btnsimulator').classList.remove('active');
});

// clica no botão de REGISTRAR
$('#register-form-link').on('click', function(e) {
    e.preventDefault();
    divsimulator.classList.add('d-none');
    formregistrar.classList.remove('d-none');
    formlogin.classList.add('d-none');

    $('#img-portifolio').fadeOut();
    $('#form-login').fadeOut();
    $('#form-registrar').fadeIn();


    document.getElementById('register-form-link').classList.add('active');
    document.getElementById('login-form-link').classList.remove('active');
    document.getElementById('btnsimulator').classList.remove('active');
});

// clica no botão SIMULADOR
$('#btnsimulator').on('click', function(e) {

    e.preventDefault();

    document.getElementById('btnsimulator').classList.add('active');
    document.getElementById('register-form-link').classList.remove('active');
    document.getElementById('login-form-link').classList.remove('active');
    $('#img-portifolio').fadeOut();
    formregistrar.classList.add('d-none');
    formlogin.classList.add('d-none');

    divsimulator.classList.remove('d-none');
    $('#div-simulator').fadeIn();
});


//#############           FUNCOES PRIMEIRA ETAPA SIMULADOR           #############

// verificar se % gordura esta vazio ao entrar no campo
document.getElementById('edtpercfat').addEventListener("focus", function(){
    verifycampopercfat(this.value);
});
// verificar se % gordura esta vazio ao sair do campo
document.getElementById('edtpercfat').addEventListener("blur", function(){
    verifycampopercfat(this.value);
});

function verifycampopercfat(valor){
    if(valor == ''){
        document.getElementById('lbl-msgdadosgerais').innerHTML =  'Caso não souber o % de Gordura, deixar em branco';
    }
    else{
        document.getElementById('lbl-msgdadosgerais').innerHTML = '';
    }
}

// verifica se o campo peso da com valor maior que zero ou não
$('#edtpeso').on('blur',function(e){
    if ($(this).val()=='0' || $(this).val()==''){
        document.getElementById('msg-peso').innerHTML = 'Forneça o Peso para continuar';
    }
    else{
        document.getElementById('msg-peso').innerHTML = '';
    }
    verifydadosgerais();
});

// verifica se o campo altura da com valor maior que zero ou não
$('#edtaltura').on('blur',function(e){
    if ($(this).val()=='0' || $(this).val()==''){
        document.getElementById('msg-altura').innerHTML = 'Forneça a Altura para continuar';
    }
    else{
        document.getElementById('msg-altura').innerHTML = '';
    }
    verifydadosgerais();
});

// habilita  ou não botão PROXIMO primeira etapa
function verifydadosgerais(){
    document.getElementById('btnprimeiraetapa').disabled = true;
    if (document.getElementById('edtpeso').value.length > 0 && document.getElementById('edtaltura').value.length > 0) {
        document.getElementById('btnprimeiraetapa').disabled = false;
    }
}

// Botão Proximo Primeira tela simulador = Dados pessoais
$('#btnprimeiraetapa').on('click', function(e) {
    e.preventDefault();

    valpeso = document.getElementById('edtpeso').value;
    valaltura = document.getElementById('edtaltura').value;

    valpercfat = document.getElementById('edtpercfat').value;
    valgenero = $( "#selectgenero option:selected" ).val();

    document.getElementById('msg-altura').innerHTML = '';
    document.getElementById('msg-peso').innerHTML = '';

    if ((valaltura=='0')||(valaltura=='')){
        document.getElementById('msg-altura').innerHTML = 'Forneça a Altura(em CM) para continuar';
        document.getElementById('edtaltura').focus();
    }
    else
    {
        if ((valpeso=='0')||(valpeso=='')){
            document.getElementById('msg-peso').innerHTML = 'Forneça o Peso para continuar';
            document.getElementById('edtpeso').focus();
        }
        else
        {
            formsimuladortwoetap = document.getElementById('form-simulador-twoetap');
            formsimuladoroneetap = document.getElementById('form-simulador-oneetap');
            formsimuladoroneetap.classList.add('d-none');
            formsimuladortwoetap.classList.remove('d-none');

        }
    }

});

//#############           FUNCOES SEGUNDA ETAPA SIMULADOR           #############

// clica botão voltar presente na SEGUNDA ETAPA DO SIMULADOR
$('#btnvoltarsegundaetapa').on('click', function(e) {
    e.preventDefault();
    formsimuladortwoetap = document.getElementById('form-simulador-twoetap');
    formsimuladoroneetap = document.getElementById('form-simulador-oneetap');
    formsimuladoroneetap.classList.remove('d-none');
    formsimuladortwoetap.classList.add('d-none');
});

// clica no item nivel de atividade selecionado
function btnnivelatv(valna){

    valdtnascimento = document.getElementById('edtdateniver').value;
    valpeso = document.getElementById('edtpeso').value;
    valaltura = document.getElementById('edtaltura').value;
    valpercfat = document.getElementById('edtpercfat').value;
    valgenero = $( "#selectgenero option:selected" ).val();

    idade = retornaidade(valdtnascimento);

    //calcula  Harris-Benedict (original)
    valharris_original = harris_original(valgenero,valpeso,valaltura,idade);
    valtdde = valharris_original*valna;
    trbody = '<tr>';
    trbody += '<th scope="row">Harris-Benedict (original) </th>';
    trbody += '<td><a class="text-warning" href="#"><span class="glyphicon glyphicon-info-sign"></span></a></td>';
    trbody += '<td>'+valharris_original.toFixed(0)+'</td>';
    trbody += '<td>'+valtdde.toFixed(0)+'</td>';
    trbody += '<td><input type="checkbox" name="chk" onclick="checkedbmr();"></td>';
    trbody += '</tr>';

    //calcula  Harris-Benedict (revisada)
    valharris_revisada = harris_revisada(valgenero,valpeso,valaltura,idade);
    console.log('Harris-Benedict (revisada):'+valharris_revisada);
    valtdde = valharris_revisada*valna;
    trbody += '<tr>';
    trbody += '<th scope="row">Harris-Benedict (Revisada)</th>';
    trbody += '<td><a class="text-warning" href="#"><span class="glyphicon glyphicon-info-sign"></span></a></td>';
    trbody += '<td>'+valharris_revisada.toFixed(0)+'</td>';
    trbody += '<td>'+valtdde.toFixed(0)+'</td>';
    trbody += '<td><input type="checkbox" name="chk" onclick="checkedbmr();"></td>';
    trbody += '</tr>';

    //calcula  Mifflin St Jeor
    valmiflin = mifflin(valgenero,valpeso,valaltura,idade)
    valtdde = valmiflin*valna;
    trbody += '<tr>';
    trbody += '<th scope="row">Mifflin St Jeor</th>';
    trbody += '<td><a class="text-warning" href="#"><span class="glyphicon glyphicon-info-sign"></span></a></td>';
    trbody += '<td>'+valmiflin.toFixed(0)+'</td>';
    trbody += '<td>'+valtdde.toFixed(0)+'</td>';
    trbody += '<td><input type="checkbox" name="chk" onclick="checkedbmr();"></td>';
    trbody += '</tr>';

    //calcula  Katch-McArdle
    if (valpercfat == ''){
        valpercfat = '0';
    }
    if (parseFloat(valpercfat) > 0){
        valkatchmcardle = katchmcardle(valpeso,valpercfat);
        valtdde = valkatchmcardle*valna;
        trbody += '<tr>';
        trbody += '<th scope="row">Katch-McArdle</th>';
        trbody += '<td><a class="text-warning" href="#"><span class="glyphicon glyphicon-info-sign"></span></a></td>';
        trbody += '<td>'+valkatchmcardle.toFixed(0)+'</td>';
        trbody += '<td>'+valtdde.toFixed(0)+'</td>';
        trbody += '<td><input type="checkbox" name="chk" onclick="checkedbmr();"></td>';
        trbody += '</tr>';
    }

    bodyBMR = document.getElementById('body-BMR');
    bodyBMR.innerHTML = trbody;

    formsimuladortwoetap = document.getElementById('form-simulador-twoetap');
    formsimuladorthreeetap =document.getElementById('form-simulador-threeetap');
    formsimuladortwoetap.classList.add('d-none');
    formsimuladorthreeetap.classList.remove('d-none');
    document.getElementById('btnproximoformula').disabled = true;
}


//#############           FUNCOES TERCEIRA ETAPA SIMULADOR           #############

// clica botão voltar presente na TERCEIRA ETAPA DO SIMULADOR
$('#btnvoltarna').on('click', function(e) {
    e.preventDefault();
    formsimuladortwoetap = document.getElementById('form-simulador-twoetap');
    formsimuladorthreeetap = document.getElementById('form-simulador-threeetap');
    formsimuladortwoetap.classList.remove('d-none');
    formsimuladorthreeetap.classList.add('d-none');
    edtmediabmr = document.getElementById('edtmediabmr');
    edtmediatdee = document.getElementById('edtmediatdee');
    edtmediabmr.innerHTML = '0';
    edtmediatdee.innerHTML = '0';
});

// CHECK BOX, Seleciona quais os valores das formulas irão fazer parte da média
function checkedbmr(){
    checkboxs = document.getElementsByName('chk');
    //checkboxs = Array.from(checkboxs);
    tabbmr = document.getElementById('tab-bmr');

    valortotbmr = 0;
    valortottdee = 0;
    contchk = 0;
    for (i = 1; i < tabbmr.rows.length-1; i++) {
        objCells = tabbmr.rows.item(i).cells;
        if(checkboxs[i-1]['checked'] == true){
            valortotbmr = valortotbmr + parseFloat(objCells.item(2).innerHTML);
            valortottdee = valortottdee +  parseFloat(objCells.item(3).innerHTML);
            contchk = contchk +1;
        }


        //for (var j = 0; j < objCells.length; j++) {
        //console.log('Posição J: '+i+' - '+objCells.item(j).innerHTML);
        //}
    }
    valmediabmr = 0;
    valmediatdee = 0;
    if (contchk != 0){
        valmediabmr = valortotbmr / contchk;
        valmediatdee = valortottdee / contchk;
    }
    edtmediabmr = document.getElementById('edtmediabmr');
    edtmediatdee = document.getElementById('edtmediatdee');

    edtmediabmr.innerHTML = valmediabmr.toFixed(0);
    edtmediatdee.innerHTML = valmediatdee.toFixed(0);

    document.getElementById('btnproximoformula').disabled = false;
    if (document.querySelectorAll('input[name="chk"]:checked').length == 0) {
        document.getElementById('btnproximoformula').disabled = true;
    }


}

// clica botão proxima tela = Escolha da meta
$('#btnproximoformula').on('click', function(e) {
    e.preventDefault();
    formsimuladorthreeetap = document.getElementById('form-simulador-threeetap');
    formsimuladorfouretap = document.getElementById('form-simulador-fouretap');
    formsimuladorfouretap.classList.remove('d-none');
    formsimuladorthreeetap.classList.add('d-none');

    // Meta média final BMR
    lblmymetabmr =  document.getElementById('lbl-mymeta-bmr');
    edtmediabmr = document.getElementById('edtmediabmr');
    lblmymetabmr.innerHTML = 'TMB: '+ edtmediabmr.innerHTML;
    //Meta média final TDEE
    lblmymetatdee =  document.getElementById('lbl-mymeta-tdee');
    edtmediatdee = document.getElementById('edtmediatdee');
    lblmymetatdee.innerHTML = 'GCD: '+ edtmediatdee.innerHTML;

    //verifycamposcaloria(this.value,'Forneça as calorias dos Exercícios',"msg-validcalexec");
    verifycamposcaloria(edtcaloriasmeta.value,'Forneça as calorias excedentes',"msg-validcalmeta");

});


//#############           FUNCOES QUARTA ETAPA SIMULADOR           #############

// clica botão voltar presente na QUARTA ETAPA DO SIMULADOR
$('#btnvoltarformula').on('click', function(e) {
    e.preventDefault();
    formsimuladorthreeetap = document.getElementById('form-simulador-threeetap');
    formsimuladorfouretap = document.getElementById('form-simulador-fouretap');
    formsimuladorthreeetap.classList.remove('d-none');
    formsimuladorfouretap.classList.add('d-none');

});
function checkmeta(){
    curRadio = document.querySelector('input[name="radiometa"]:checked').value;
    verificametaselect((curRadio=='ganho')?0:1);
    validacamposmeta();
}

function verificametaselect(valor){

    lbltipometa = document.getElementById('label-tipometa');
    lbltipometa.innerHTML = (valor == 0) ? 'Excedente Calórico Diário <a class="text-warning a-info" href="#"><span class="glyphicon glyphicon-info-sign"></span></a>' : 'Defícit Calórico Diário <a class="text-warning a-info" href="#"><span class="glyphicon glyphicon-info-sign"></span></a>';
}


//#############           FUNCOES Quinta ETAPA SIMULADOR           #############


// verificar campo calorias excedente/deficit se ta vazio ou zero - na entrada
edtcaloriasmeta.addEventListener("focus", function(){

    if(edtcaloriasmeta.value == '0'){
        edtcaloriasmeta.value = '';
    }
    curRadio = document.querySelector('input[name="radiometa"]:checked').value;
    tipo = (curRadio=='ganho')? 'excedente' : 'defícit';
    tipo = 'Forneça as Calorias '+tipo;
    verifycamposcaloria(this.value,tipo,"msg-validcalmeta");

});
// verificar campo calorias excedente/deficit  se ta vazio ou zero - na saida
edtcaloriasmeta.addEventListener("blur", function(){
    curRadio = document.querySelector('input[name="radiometa"]:checked').value;
    tipo = (curRadio=='ganho')? 'excedente' : 'defícit';
    tipo = 'Forneça as Calorias '+tipo;
    verifycamposcaloria(this.value,tipo,"msg-validcalmeta");
});

// verificar campo calorias dos exercicios se ta vazio ou zero - na entrada
edtcaloriasexercises.addEventListener("focus", function(){
    if(edtcaloriasexercises.value == '0'){
        edtcaloriasexercises.value = '';
    }
    //verifycamposcaloria(this.value,'Forneça as calorias dos Exercícios',"msg-validcalexec");
    validacamposmeta();
});
// verificar campo calorias excedente/deficit  se ta vazio ou zero - na saida
edtcaloriasexercises.addEventListener("blur", function(){
    //verifycamposcaloria(this.value,'Forneça as calorias dos Exercícios',"msg-validcalexec");
    validacamposmeta();
});


function verifycamposcaloria(valor,desccampo,labelmsg){

    //if(valor == '' || valor=='0'){
    //    document.getElementById(labelmsg).innerHTML =  desccampo;
    //}
    //else{
    //    document.getElementById(labelmsg).innerHTML = '';
    //}
    validacamposmeta();
}

function validacamposmeta(){
    //if (edtcaloriasmeta.value == '0' || edtcaloriasmeta.value==''){
    //|| edtcaloriasexercises.value == '0' || edtcaloriasexercises.value==''){
    //    document.getElementById('btn-result').disabled = true;
    //}
    //else{
    vlalvo = 0;
    vlcalmoreless = (edtcaloriasmeta.value=='') ? 0 : parseFloat(edtcaloriasmeta.value);
    vlcalexerc = (edtcaloriasexercises.value=='') ? 0 : parseFloat(edtcaloriasexercises.value);

    curRadio = document.querySelector('input[name="radiometa"]:checked').value;
    if (curRadio == 'ganho'){
        vlalvo = parseFloat(edtmediatdee.innerHTML) + vlcalmoreless + vlcalexerc;
    }
    else{
        vlalvo = parseFloat(edtmediatdee.innerHTML) + vlcalexerc;
        vlalvo = vlalvo - vlcalmoreless;
    }


    document.getElementById('lbl-alvocaloricodia').innerHTML = 'Alvo de Calorias Diária: <strong>'+ vlalvo + '</strong>' ;
    document.getElementById('btn-result').disabled = false;
    //}
}
document.getElementById('btnvoltarmeta').addEventListener("click", function(e){
    e.preventDefault();
    formsimuladorfouretap = document.getElementById('form-simulador-fouretap');
    formsimuladorfiveetap = document.getElementById('form-simulador-fiveetap');
    formsimuladorfiveetap.classList.add('d-none');
    formsimuladorfouretap.classList.remove('d-none');
});
document.getElementById('btn-result').addEventListener("click", function(e){
    e.preventDefault();
    formsimuladorfouretap = document.getElementById('form-simulador-fouretap');
    formsimuladorfiveetap = document.getElementById('form-simulador-fiveetap');
    formsimuladorfiveetap.classList.remove('d-none');
    formsimuladorfouretap.classList.add('d-none');

    validacamposmeta();

    //curRadio = document.querySelector('input[name="radiometa"]:checked').value;
    if (curRadio=='ganho'){
        document.getElementById('lbl-tipometa').innerHTML = '<strong>Ganho</strong>';
        document.getElementById('lbl-desctipometa').innerHTML = '<strong>Excedente Calórico</strong>';
    }
    if (curRadio=='perda'){
        document.getElementById('lbl-tipometa').innerHTML = '<strong>Perda</strong>';
        document.getElementById('lbl-desctipometa').innerHTML = '<strong>Defícit Calórico</strong>';
    }

    edtmediabmr = document.getElementById('edtmediabmr');
    edtmediatdee = document.getElementById('edtmediatdee');


    document.getElementById('edtmetakaldia').value = vlcalmoreless;
    document.getElementById('edtbmrdia').value = edtmediabmr.innerHTML;
    document.getElementById('edtgcddia').value = edtmediatdee.innerHTML;
    document.getElementById('edtKcalExecdia').value = vlcalexerc;
    document.getElementById('edtalvokcaldia').value = vlalvo;

    vlkcalkgfat = verifycampokgfatempty();
    calcmetakg(vlcalmoreless,vlkcalkgfat);
    calcmetakcal(vlcalmoreless);

    preenchedadoskcalexec(vlcalexerc);

    preenchedadadoskcalalvo(vlalvo);
    preenchedadadoskcalbmr(edtmediabmr.innerHTML);
    preenchedadadoskcalgcd(edtmediatdee.innerHTML);



});
document.getElementById('btnvoltarfouretapa').addEventListener("click", function(e){
    e.preventDefault();
    formsimuladorfouretap = document.getElementById('form-simulador-fouretap');
    formsimuladorthreeetap = document.getElementById('form-simulador-threeetap');

    formsimuladorfouretap.classList.add('d-none');
    formsimuladorthreeetap.classList.remove('d-none');

});

function verifycampokgfatempty(){
    kcalkgfat = document.getElementById('edt-kcalkgfat').value;
    if (kcalkgfat == '' | kcalkgfat == '0'){
        kcalkgfat = 3500;
        document.getElementById('edt-kcalkgfat').value = 3500;
    }
    return kcalkgfat;
}

//  calcula e preenche os campos referente a quantidade de kilograma que ira ganhar ou perder de acordo com dia, semana, mes, ano
function calcmetakg(vlmetakaldia,vlkcalkgfat){

    vlmetakgdia = vlmetakaldia/vlkcalkgfat;
    vlmetakgdia = vlmetakgdia * 0.4536;

    // KG por dia
    document.getElementById('edtpesodia').value = vlmetakgdia.toFixed(2);
    //KG por semana
    vlmetakgsemana = vlmetakgdia * 7;
    document.getElementById('edtpesosemanal').value = vlmetakgsemana.toFixed(2);
    //KG por mes
    vlmetakgmensal = vlmetakgdia * 30.5;
    document.getElementById('edtpesomensal').value = vlmetakgmensal.toFixed(2);
    //KG por ano
    vlmetakganual = vlmetakgdia * 365;
    document.getElementById('edtpesoanual').value = vlmetakganual.toFixed(2);

}

//  calcula e preenche os campos referente a quantidade de kcal que ira ganhar ou perder de acordo com dia, semana, mes, ano
function calcmetakcal(vlmetakaldia){
    document.getElementById('edtmetakaldia').value = vlmetakaldia;
    document.getElementById('edtmetakalsemanal').value = (vlmetakaldia * 7).toFixed(0) ;
    document.getElementById('edtmetakalmensal').value =  (vlmetakaldia * 30.5).toFixed(0);
    document.getElementById('edtmetakalanual').value = (vlmetakaldia * 365).toFixed(0);
}

//preeche campos da linha calorias dos exercicios: dia, semana, mes e ano
function preenchedadoskcalexec(vlkcalexecdia){
    document.getElementById('edtKcalExecsemanal').value = (vlkcalexecdia * 7).toFixed(0);
    document.getElementById('edtKcalExecmensal').value = (vlkcalexecdia * 30.5).toFixed(0);
    document.getElementById('edtKcalExecanual').value = (vlkcalexecdia * 365).toFixed(0);

}
//preeche campos da linha calorias alvo: dia, semana, mes e ano
function preenchedadadoskcalalvo(vlkcalalvodia){
    document.getElementById('edtalvokcalsemanal').value = (vlkcalalvodia * 7).toFixed(0);
    document.getElementById('edtalvokcalmensal').value = (vlkcalalvodia * 30.5).toFixed(0);
    document.getElementById('edtalvokcalanual').value = (vlkcalalvodia * 365).toFixed(0);
}

//preeche campos da linha calorias TMB: dia, semana, mes e ano
function preenchedadadoskcalbmr(vlkcalbmr){
    document.getElementById('edtbmrsemanal').value = (vlkcalbmr * 7).toFixed(0);
    document.getElementById('edtbmrmensal').value = (vlkcalbmr * 30.5).toFixed(0);
    document.getElementById('edtbmranual').value = (vlkcalbmr * 365).toFixed(0);
}

//preeche campos da linha calorias TMB: dia, semana, mes e ano
function preenchedadadoskcalgcd(vlkcalgcddia){
    document.getElementById('edtgcdsemanal').value = (vlkcalgcddia * 7).toFixed(0);
    document.getElementById('edtgcdmensal').value = (vlkcalgcddia * 30.5).toFixed(0);
    document.getElementById('edtgcdanual').value = (vlkcalgcddia * 365).toFixed(0);
}



