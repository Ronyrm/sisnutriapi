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
    trbody += '<th  scope="row">Harris-Benedict (original) </th>';
    titleformula = "'Fórmula Herris-Benedict Original'";
    trbody += '<td class="align-middle text-center"><a class="text-warning" data-toggle="modal" data-target="#modal-info" onclick="chamamodalinfo('+titleformula+',msginfo.formula_harris_benedict)" ><span class="glyphicon glyphicon-info-sign"></span></a></td>';
    trbody += '<td class="align-middle text-center">'+valharris_original.toFixed(0)+'</td>';
    trbody += '<td class="align-middle text-center">'+valtdde.toFixed(0)+'</td>';
    trbody += '<td class="align-middle text-center"><input type="checkbox" name="chk" onclick="checkedbmr();"></td>';
    trbody += '</tr>';

    //calcula  Harris-Benedict (revisada)
    valharris_revisada = harris_revisada(valgenero,valpeso,valaltura,idade);
    console.log('Harris-Benedict (revisada):'+valharris_revisada);
    valtdde = valharris_revisada*valna;
    trbody += '<tr>';
    trbody += '<th  scope="row">Harris-Benedict (Revisada)</th>';
    titleformula = "'Fórmula Herris-Benedict Revisada'";
    trbody += '<td class="align-middle text-center"><a class="text-warning" data-toggle="modal" data-target="#modal-info" onclick="chamamodalinfo('+titleformula+',msginfo.formula_harris_benedict_revisada)" ><span class="glyphicon glyphicon-info-sign"></span></a></td>';
    trbody += '<td class="align-middle text-center">'+valharris_revisada.toFixed(0)+'</td>';
    trbody += '<td class="align-middle text-center">'+valtdde.toFixed(0)+'</td>';
    trbody += '<td class="align-middle text-center"><input type="checkbox" name="chk" onclick="checkedbmr();"></td>';
    trbody += '</tr>';

    //calcula  Mifflin St Jeor
    valmiflin = mifflin(valgenero,valpeso,valaltura,idade)
    valtdde = valmiflin*valna;
    trbody += '<tr>';
    trbody += '<th scope="row">Mifflin St Jeor</th>';
    titleformula = "'Fórmula Mifflin St Jeor'";
    trbody += '<td class="align-middle text-center"><a class="text-warning" data-toggle="modal" data-target="#modal-info" onclick="chamamodalinfo('+titleformula+',msginfo.formula_mifflin)" ><span class="glyphicon glyphicon-info-sign"></span></a></td>';
    trbody += '<td class="align-middle text-center">'+valmiflin.toFixed(0)+'</td>';
    trbody += '<td class="align-middle text-center">'+valtdde.toFixed(0)+'</td>';
    trbody += '<td class="align-middle text-center"><input type="checkbox" name="chk" onclick="checkedbmr();"></td>';
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
        titleformula = "'Fórmula Katch-McArdle'";
        trbody += '<td class="align-middle text-center"><a class="text-warning" data-toggle="modal" data-target="#modal-info" onclick="chamamodalinfo('+titleformula+',msginfo.formula_katchmcardle)" ><span class="glyphicon glyphicon-info-sign"></span></a></td>';
        trbody += '<td class="align-middle text-center">'+valkatchmcardle.toFixed(0)+'</td>';
        trbody += '<td class="align-middle text-center">'+valtdde.toFixed(0)+'</td>';
        trbody += '<td class="align-middle text-center" ><input type="checkbox" name="chk" onclick="checkedbmr();"></td>';
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


    validacamposmeta();

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
    validacamposmeta();

});
// verificar campo calorias excedente/deficit  se ta vazio ou zero - na saida
edtcaloriasmeta.addEventListener("blur", function(){
    curRadio = document.querySelector('input[name="radiometa"]:checked').value;
    tipo = (curRadio=='ganho')? 'excedente' : 'defícit';
    tipo = 'Forneça as Calorias '+tipo;
    validacamposmeta();
});

// verificar campo calorias dos exercicios se ta vazio ou zero - na entrada
edtcaloriasexercises.addEventListener("focus", function(){
    if(edtcaloriasexercises.value == '0'){
        edtcaloriasexercises.value = '';
    }

    validacamposmeta();
});
// verificar campo calorias excedente/deficit  se ta vazio ou zero - na saida
edtcaloriasexercises.addEventListener("blur", function(){
    validacamposmeta();
});



function validacamposmeta(){
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

    calcularesultfinal();

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

    vlmetakgdia = (vlmetakaldia/vlkcalkgfat);
    vlmetakgdia = vlmetakgdia * 0.4536;

    // KG por dia
    if (vlmetakgdia < 1){
        document.getElementById('lblpesodia').innerHTML = ' gr';
        vlmetakgdia_tp = vlmetakgdia*1000;
        document.getElementById('edtpesodia').value = (vlmetakgdia_tp).toFixed(0);
    }
    else{
        document.getElementById('lblpesodia').innerHTML = ' kg';
        document.getElementById('edtpesodia').value = (vlmetakgdia_tp).toFixed(3);
    }


    //KG por semana
    vlmetakgsemana = vlmetakgdia * 7;
    if (vlmetakgsemana < 1){
        document.getElementById('lblpesosemanal').innerHTML = ' gr';
        vlmetakgsemana = vlmetakgsemana * 1000;
        document.getElementById('edtpesosemanal').value = vlmetakgsemana.toFixed(0);
    }
    else{
        document.getElementById('lblpesosemanal').innerHTML = ' kg';
        document.getElementById('edtpesosemanal').value = vlmetakgsemana.toFixed(3);
    }



    //KG por mes
    vlmetakgmensal = vlmetakgdia * 30.5;
    if (vlmetakgmensal < 1){
        document.getElementById('lblpesomensal').innerHTML = ' gr';
        vlmetakgmensal = vlmetakgmensal * 1000;
        document.getElementById('edtpesomensal').value = vlmetakgmensal.toFixed(0);
    }
    else{
        document.getElementById('lblpesomensal').innerHTML = ' kg';
        document.getElementById('edtpesomensal').value = vlmetakgmensal.toFixed(3);
    }
    //KG por ano
    vlmetakganual = vlmetakgdia * 365;

    if(vlmetakganual < 1){
        document.getElementById('lblpesoanual').innerHTML = ' gr';
        vlmetakganual = vlmetakganual * 1000;
        document.getElementById('edtpesoanual').value = vlmetakganual.toFixed(0);
    }
    else{
        document.getElementById('lblpesoanual').innerHTML = ' kg';
        document.getElementById('edtpesoanual').value = vlmetakganual.toFixed(3);
    }

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
// on change Campo input "Kcal excedente ou perda  tela de Resultado Final
document.getElementById('edtmetakaldia').addEventListener("change", function(e){
    e.preventDefault();
    edtcaloriasmeta.value = this.value;
    if (edtcaloriasmeta.value == ''){
        edtcaloriasmeta.value = '0';
        this.value = '0';
    }
    console.log('Calorias Meta:'+edtcaloriasmeta);
    calcularesultfinal();

});
// CHANGE INPUT kcal meta semanal
document.getElementById('edtmetakalsemanal').addEventListener("change", function(e){
    e.preventDefault();
    if (this.value < -1) {
        this.value = 0;
    }

    result = calc_kcal_weekmonthyear((this.value=='')?'0':this.value,'S');
    document.getElementById('edtmetakaldia').value = result;
    edtcaloriasmeta.value = result;

    calcularesultfinal();
});
// CHANGE INPUT kcal meta mensal
document.getElementById('edtmetakalmensal').addEventListener("change", function(e){
    e.preventDefault();
    if (this.value < -1) {
        this.value = 0;
    }

    result = calc_kcal_weekmonthyear((this.value=='')?'0':this.value,'M');
    document.getElementById('edtmetakaldia').value = result;
    edtcaloriasmeta.value = result;

    calcularesultfinal();
});
// CHANGE INPUT kcal meta anual
document.getElementById('edtmetakalanual').addEventListener("change", function(e){
    e.preventDefault();
    if (this.value < -1) {
        this.value = 0;
    }

    result = calc_kcal_weekmonthyear((this.value=='')?'0':this.value,'A');
    document.getElementById('edtmetakaldia').value = result;
    edtcaloriasmeta.value = result;

    calcularesultfinal();
});


// on change Campo input "Kcal dos exercicios tela de Resultado Final
document.getElementById('edtKcalExecdia').addEventListener("change", function(e){
    e.preventDefault();
    edtcaloriasexercises.value = this.value;
    if (edtcaloriasexercises.value == ''){
        edtcaloriasexercises.value = '0';
        this.value = '0';
    }
    calcularesultfinal();
});

// CHANGE INPUT kcal exercicios semanal
document.getElementById('edtKcalExecsemanal').addEventListener("change", function(e){
    e.preventDefault();
    if (this.value < -1) {
        this.value = 0;
    }

    result = calc_kcal_weekmonthyear((this.value=='')?'0':this.value,'S');
    document.getElementById('edtKcalExecdia').value = result;
    edtcaloriasexercises.value = result;

    calcularesultfinal();
});


// CHANGE INPUT kcal exercicios mensal
document.getElementById('edtKcalExecmensal').addEventListener("change", function(e){
    e.preventDefault();
    if (this.value < -1) {
        this.value = 0;
    }

    result = calc_kcal_weekmonthyear((this.value=='')?'0':this.value,'M');
    document.getElementById('edtKcalExecdia').value = result;
    edtcaloriasexercises.value = result;

    calcularesultfinal();
});

// CHANGE INPUT kcal exercicios anual
document.getElementById('edtKcalExecanual').addEventListener("change", function(e){
    e.preventDefault();
    if (this.value < -1) {
        this.value = 0;
    }

    result = calc_kcal_weekmonthyear((this.value=='')?'0':this.value,'A');
    document.getElementById('edtKcalExecdia').value = result;
    edtcaloriasexercises.value = result;

    calcularesultfinal();
});
// change Ganho ou perda de Peso
document.getElementById('edtpesodia').addEventListener("change", function(e){
    e.preventDefault();
    if (this.value < -1) {
        this.value = 0;
    }
    result = calccalporkg(this.value/1000).toFixed(0);
    document.getElementById('edtmetakaldia').value = result;
    edtcaloriasmeta.value = result;

    calcularesultfinal();

});

document.getElementById('edtpesosemanal').addEventListener("change", function(e){
    e.preventDefault();
    if (this.value < -1) {
        this.value = 0;
    }


    result = calccalporkg((this.value/1000)/7).toFixed(0);
    document.getElementById('edtmetakaldia').value = result;
    edtcaloriasmeta.value = result;

    calcularesultfinal();

});

document.getElementById('edtpesomensal').addEventListener("change", function(e){
    e.preventDefault();
    if (this.value < -1) {
        this.value = 0;
    }


    result = calccalporkg((this.value/30.5)).toFixed(0);
    document.getElementById('edtmetakaldia').value = result;
    edtcaloriasmeta.value = result;

    calcularesultfinal();

});

document.getElementById('edtpesoanual').addEventListener("change", function(e){
    e.preventDefault();
    if (this.value < -1) {
        this.value = 0;
    }


    result = calccalporkg((this.value/365)).toFixed(0);
    document.getElementById('edtmetakaldia').value = result;
    edtcaloriasmeta.value = result;

    calcularesultfinal();

});



function calccalporkg(valorkgdia){
    return  ((valorkgdia / 0.453592) * verifycampokgfatempty());
}
// CALCULA RESULTADO FINAL E PREECHE VALORES
function calcularesultfinal(){
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


}

function calc_kcal_weekmonthyear(valor,tipo){
    result = 0;
    if (valor != '0'){
        switch(tipo) {
            case "S":
                result = (valor/7).toFixed(0);
                break;
            case "M":
                result = (valor/30.5).toFixed(0);
                break;
            case "A":
                result = (valor/365).toFixed(0);
                break;
        }
    }
    return result;
}
-
function chamamodalinfo(title,msg){
    document.getElementById('modal-infotitle').innerHTML = title;
    document.getElementById('modal-infobody').innerHTML = msg;

}

function buscarefeicaoatleta(){
    if (idatleta != '0' && idatleta != ''){
        //console.log('Atleta:'+idatleta);
        $.ajax({
            url: '/get/refeicao/atleta',
            type: 'GET',
            data: 'idatleta='+idatleta,
            dataType: 'json',
            cache: false,
            async: true,
            success:function(data) {
                        if(data.result == true){
                            document.getElementById('span-total-ref').innerHTML = data.total;
                            data_refeicao = data.data;

                            setTimeout(function(){
                                //console.log(data['data']);
                            }, 3000);
                        }
            }
        })
        .always(
        )
        .fail(function() {
            console.log('Erro');
            // Caso falhe solicite outro id
        });
    }
}
async function teste(){
    let response = await fetch('/get/refeicao/atleta?idatleta='+idatleta);
    let data = await response.json();
    return data;
    console.log('Aqui --------');
    console.log(data);
    console.log('Aqui --------');
}


document.getElementById('btnmostrarefeicoes').addEventListener("click", function(e){
    teste().then((value) => {
        console.log("Entrei Aqui");
        console.log(value);
    });
    this.classList.add('active');

    divrefatleta = document.getElementById('divrefatleta');
    divrefatleta.classList.remove('d-none');
    document.getElementById('btndadosatleta').classList.remove('active');

    divdadosatleta =document.getElementById('div-dados-atleta');
    divdadosatleta.classList.add('d-none');
    //buscarefeicaoatleta();
    //$.each(data_refeicao, function(chave,valor){
        //console.log(chave + ' - '+valor);
    //    console.log(valor['descricao']);
    //});
});

// Botão Voltar da tela de Refeição
function btnvoltarref(){
    divrefatleta = document.getElementById('divrefatleta');
    divrefatleta.classList.add('d-none');
    document.getElementById('btnmostrarefeicoes').classList.remove('active');
}

// Botão Editar Refeição
function editrefeicao(refeicao){
    console.log('Essa é a refeicao');
    console.log(refeicao);
    document.getElementById('lblidrefeicao').innerHTML = 'Alterando a Refeição: '+refeicao.descricao;
    document.getElementById('edtdescricao').value = refeicao.descricao;
    document.getElementById('edthora').value = refeicao.hora;
    document.getElementById('edtidrefeicao').value = refeicao.id;
    document.getElementById('edtidpessoa').value = refeicao.pessoa;

    chkmostrar = document.getElementById('edtmostrar');
    console.log(refeicao.mostrar);
    if (refeicao.mostrar == 'S') {
        chkmostrar.checked = true;
    }
    else{
        chkmostrar.checked = false;

    }

}
// Botão Inserir Refeição
function btninsertrefeicao(idpessoa){
    console.log('Cliquei Aqui up '+idpessoa);
    document.getElementById('lblidrefeicao').innerHTML = 'Inserindo Refeição';
    document.getElementById('edtdescricao').value = '';
    document.getElementById('edthora').value = '00:00';
    document.getElementById('edtidrefeicao').value = '-1';
    document.getElementById('edtidpessoa').value = idpessoa;
    chkmostrar = document.getElementById('chkativa');
    divdadosatleta = document.getElementById('div-dados-atleta');
    divdadosatleta.classList.add('d-none');

}

// Botão Gravar Modal Inserir e Editar Refeição
document.getElementById('btngravarrefeicao').addEventListener("click", function(e){
    e.preventDefault();
    form = document.getElementById('formrefeicao');
    formData = new FormData(form);
    console.log(formData);
    $.ajax({
        url: '/post/refeicao',
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false

    }).done( function(data){
        alert_dadosrefeicao = document.getElementById('alert-dadosrefeicao');
        if (data.result == true) {

            alert_dadosrefeicao.classList.add("alert-primary");
            alert_dadosrefeicao.innerHTML = '<strong>Sucesso</strong> <br> '+data['mensagem'];
            alert_dadosrefeicao.classList.remove('d-none');

            setTimeout(function(){
                $('#insert-edit-modal-refeicao').modal('hide');
                alert_dadosrefeicao.classList.remove('alert-primary');
                alert_dadosrefeicao.classList.add('d-none');

                //window.location.href = '/sisnutri';
                tbodyrefeicoes = document.getElementById('tbody-refeicoes');
                tab = '';
                refeicoes = data['data'];
                totalreg = refeicoes.length;
                refeicoes.forEach((refeicao) => {

                    tab += '<tr id="tr-refeicao'+refeicao.id+'" title="tr-reifeicao'+refeicao.id+'">';
                    tab += '<td class="align-middle"><label class="text-warning">'+refeicao.descricao+'</label></td>';
                    tab += '<td class="align-middle text-center"><label class="text-warning">'+refeicao.hora.substr(0, 5)+'</label></td>';
                    tab += '<td class="align-middle text-center">';
                    if (refeicao.mostrar == 'S'){
                        tab += '<input type="checkbox" checked name="chkativa'+refeicao.id+'" onclick="return false;" onkeydown="return false;" >';
                    }
                    else{
                        tab += '<input type="checkbox"  name="chkativa'+refeicao.id+'" onclick="return false;" onkeydown="return false;" >';
                    }
                    tab += '</td>';
                    tab += '<td class="text-center">';
                    tab += '<button class="btn btn-sm btn-warning mx-1 my-1"';
                    tab += ' title="Editar '+refeicao.descricao+'"';
                    tab += ' data-toggle="modal" data-target=".insert-edit-modal-refeicao"';

                    descricao = '"'+refeicao.descricao+'"';
                    hora = '"'+refeicao.hora+'"';
                    mostrar = "'"+refeicao.mostrar+"'";

                    tab += " onclick='editrefeicao("+JSON.stringify(refeicao)+");'>";
                    //tab += ' onclick="editrefeicao('+refeicao.id+','+descricao+','+hora+','+mostrar);">';
                    tab += ' <span class="glyphicon glyphicon-pencil"></span>';
                    tab += '</button> ';
                    tab += '<button class="btn btn-sm btn-danger mx-1 my-1"';
                    tab += ' data-toggle="modal" data-target=".modal-delete-refeicao"';
                    tab += ' title="Excluir '+refeicao.descricao+'"';
                    tab += " onclick='deleterefeicao("+refeicao.id+","+descricao+");'>";
                    tab += ' <span class="glyphicon glyphicon-trash"></span>';
                    tab += '</button> ';
                    tab += '</td></tr>';
                });

                tbodyrefeicoes.innerHTML = tab;
                verifica_table_refeicao_empty(totalreg);

            }, 2000);

        }
        else{
            alert_dadosrefeicao.classList.add('alert-danger');
            alert_dadosrefeicao.innerHTML = '<strong>Erro</strong> <br> '+data['mensagem'];
            alert_dadosrefeicao.classList.remove('d-none');
            setTimeout(function(){
                alert_dadosrefeicao.classList.remove('alert-danger');
                alert_dadosrefeicao.classList.add('d-none');

            }, 2000);
        }

    }).fail( function(){

    }).always( function(){
        //var imgload = document.getElementById('imgcarregamento');
        //imgload.style.display = 'none';
    });
});

function deleterefeicao(id,descricao){
    console.log('Id:'+id);
    document.getElementById('edtiddelete').value = id;
    document.getElementById('modal-msg-delete').innerHTML = 'Deseja excluir a Refeição:<strong> '+descricao+'?</strong>';
}

document.getElementById('btnconfirmaexclusao').addEventListener("click", function(e){
    e.preventDefault();
    id = document.getElementById('edtiddelete').value;
    console.log('Id:'+id);
    rowrefeicao = document.getElementById('tr-refeicao'+id);

    $.ajax({
        url: '/del/refeicao/atleta/'+id,
        dataType: 'json',
        processData: false,
        contentType: false

    }).done( function(data){
        alertmsg = document.getElementById('alert-msgdelete');
        if (data.result == true) {
            alertmsg.classList.add("alert-primary");
            alertmsg.innerHTML = '<strong>Sucesso</strong> <br> '+data['mensagem'];
            alertmsg.classList.remove('d-none');

            setTimeout(function(){
                $('#modal-delete-refeicao').modal('hide');
                alertmsg.classList.remove('alert-primary');
                alertmsg.classList.add('d-none');
                rowrefeicao.remove();
                verifica_table_refeicao_empty(data.total);
                if (data.total == 0){
                    window.location.href = '/sisnutri';
                }
            }, 2000);

        }
        else{
            alertmsg.classList.add('alert-danger');
            alertmsg.innerHTML = '<strong>Erro</strong> <br> '+data['mensagem'];
            alertmsg.classList.remove('d-none');
            setTimeout(function(){
                alertmsg.classList.remove('alert-danger');
                alertmsg.classList.add('d-none');

            }, 2000);
        }

    }).fail( function(){

    }).always( function(){

    });
});

function verifica_table_refeicao_empty(totalreg){
    console.log('Entrei Aqui agora');
    //divrefatleta = document.getElementById('divrefatleta');
    //divrefatleta.classList.remove('d-none');
    document.getElementById('span-total-ref').innerHTML = totalreg;


    if (totalreg == 0){
        document.getElementById('head-telarefeicao').innerHTML = '<p class="text-danger"><strong>'+
        'Nenhuma Refeição Cadastrada, clique no botão inserir</strong></p>';
    }
    else{
        document.getElementById('head-telarefeicao').innerHTML = '<h5  class=""><strong>Minhas Refeições</strong></h5>';
    }
}
document.getElementById('btndadosatleta').addEventListener("click", function(e){
    e.preventDefault();
    this.classList.add('active');
    divdadosatleta = document.getElementById('div-dados-atleta');
    divdadosatleta.classList.remove('d-none');
    btnvoltarref();
});
document.getElementById('btnsalvardados').addEventListener("click", function(e){
    edtname = document.getElementById('edtnomeatleta');

    edtusername = document.getElementById('edtusernameatleta');
    edtemail = document.getElementById('edtemailatleta');
    dtnasc = document.getElementById('edtdtbirthatleta');
    selectgenero = document.getElementById('selectgeneroatleta');
    edtaltura = document.getElementById('edtalturaatleta');
    edtpeso = document.getElementById('edtpesoatleta');

    document.getElementById('alert-nome-atleta').classList.add('d-none');
    document.getElementById('alert-username-atleta').classList.add('d-none');
    document.getElementById('alert-email-atleta').classList.add('d-none');
    document.getElementById('alert-dtnasc-atleta').classList.add('d-none');
    document.getElementById('alert-genero-atleta').classList.add('d-none');
    document.getElementById('alert-peso-atleta').classList.add('d-none');
    document.getElementById('alert-altura-atleta').classList.add('d-none');

    gravar = true;
    //valida campo nome
    console.log(edtname.value.length);
    if (edtname.value.length == 0) {
        document.getElementById('alert-nome-atleta').classList.remove('d-none');
    }
    //valida campo UserName
    if (edtusername.value.length == 0) {
        document.getElementById('alert-username-atleta').classList.remove('d-none');
        gravar = false;
    }
    //valida campo email
    if (edtemail.value.length == 0) {
        document.getElementById('alert-email-atleta').classList.remove('d-none');
        gravar = false;
    }

    //valida campo datanascimento
    if (dtnasc.value.length == 0) {
        document.getElementById('alert-dtnasc-atleta').classList.remove('d-none');
        gravar = false;
    }
    //valida campo genero
    console.log(selectgenero.value);
    if (selectgenero.value.length == 0) {
        document.getElementById('alert-genero-atleta').classList.remove('d-none');
        gravar = false;
    }

    //valida campo peso
    if (edtpeso.value.length == 0){
        document.getElementById('alert-peso-atleta').classList.remove('d-none');
        gravar = false;
    }
    else{
        if(parseFloat(edtpeso.value) <= 0){
            document.getElementById('alert-peso-atleta').classList.remove('d-none');
            gravar = false;
        }
    }
    //valida campo altura
    if (edtaltura.value.length == 0){
        document.getElementById('alert-altura-atleta').classList.remove('d-none');
        gravar = false;
    }
    else{
        if (parseFloat(edtaltura.value) <= 0){
            document.getElementById('alert-altura-atleta').classList.remove('d-none');
            gravar = false;
        }
    }

    console.log(gravar);

    if(gravar){
        form = document.getElementById('formdadosatleta');
        formData = new FormData(form);
        updatedadosatleta(formData,this);

    }


});
function updatedadosatleta(formData,btn){
    htmlbtn = btn.innerHTML;
    msgdadosatleta = document.getElementById('msg-dados-atleta');
    $.ajax({
        url: '/sisnutri/update/atleta',
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        beforesend: function(e){
            e.preventDefault();
            btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Atualizando...';

        }
    }).done( function(data){
        if(data.result == true){
            document.getElementById('div-dados-empty').classList.add('d-none');
            msgdadosatleta.classList.add("alert-primary");
            msgdadosatleta.innerHTML = '<strong>Sucesso</strong> <br> '+data.mensagem;
            msgdadosatleta.classList.remove('d-none');

            setTimeout(function(){
                msgdadosatleta.classList.remove('alert-primary');
                msgdadosatleta.classList.add('d-none');
                btn.innerHTML = htmlbtn;
            }, 2000);

        }
        else{
            msgdadosatleta.classList.add("alert-danger");
            msgdadosatleta.innerHTML = '<strong>Erro</strong> <br> '+data.mensagem;
            msgdadosatleta.classList.remove('d-none');

            setTimeout(function(){
                msgdadosatleta.classList.remove('alert-primary');
                msgdadosatleta.classList.add('d-none');
                btn.innerHTML = htmlbtn;
            }, 2000);
        }
    }).fail( function(){

    }).always( function(){
        //var imgload = document.getElementById('imgcarregamento');
        //imgload.style.display = 'none';
    });
}