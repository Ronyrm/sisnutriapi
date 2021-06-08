var dataprev = '';
var datanext = '';
var dt = '';
var dieta = [];
var foodselect = {};
var accordion_refeicoes = document.getElementById('accordion-refeicoes');
var edtdescfood = document.getElementById('edtdescfood');
var edtidrefeicao = document.getElementById('edtidrefeicao');
var edtidalimento = document.getElementById('edtidalimento');
var divpaginationfoods = document.getElementById('div-pagination-foods');
var divfoods = document.getElementById('div-foods');
var frmgroupqtd = document.getElementById('frmgroup-qtd');
var smalldescricao = document.getElementById('smalldescricao');
function carrega_refeicoes(refeicoes,dataatual){
    card_refeicoes = '';
    refeicoes.forEach((refeicao) => {

        if (refeicao.mostrar == 'S'){

            card_refeicoes +='<div class="card bg-warning my-1">';
            card_refeicoes +='<div class="card-header d-flex justify-content-between" id="heading'+refeicao.id+'">';
            card_refeicoes +='<button class="btn btn-link text-dark" data-toggle="collapse"'+
            'data-target="#collapse'+refeicao.id+'" aria-expanded="true" aria-controls="collapse'+refeicao.id+'">'+refeicao.descricao;
            card_refeicoes +='</button>';
            card_refeicoes += '<div class="d-flex justify-content-end text-center">';
            card_refeicoes += '<small id="lbl-refeicao'+refeicao.id+'" class="text-dark ml-2"></small>';
            dttemp = "'"+dataatual+"'";
            descref = "'"+refeicao.descricao+"'";
            card_refeicoes +='<small class="mr-1"><button class="btn btn-warning btn-sm text-dark ml-2"'+
            ' data-toggle="modal" data-target=".insert-edit-modal-food" '+
            'onclick="insert_edit_food('+refeicao.id+','+descref+','+dttemp+','+JSON.stringify({})+',-1);" aria-expanded="true">';
            card_refeicoes +='<span class="glyphicon glyphicon-plus"></span></button></small></div>';

            dieta_refeicao(refeicao.id,refeicao.descricao,dataatual);

            card_refeicoes +='</div>';
            card_refeicoes +='<div id="collapse'+refeicao.id+'" class="collapse" aria-labelledby="heading'+refeicao.id+
            '" data-parent="#accordion-refeicoes">';
            card_refeicoes +='<div class="card-body bg-dark" id="card-body-refeicao'+refeicao.id+'">';

            card_refeicoes +='<div class="row" id="div-itens'+refeicao.id+'">';

            card_refeicoes +='</div>';
            card_refeicoes +='</div></div></div>';
        }
    });
    accordion_refeicoes.innerHTML = card_refeicoes;
}

async function dieta_refeicao(idrefeicao,descrefeicao,dataatual){

    url = '/dietarefeicao/'+idrefeicao+'/'+dataatual;
    console.log(url);
    let response = await fetch(url);
    if (response.ok) { // if HTTP-status is 200-299
        let json = await response.json();
        lblrefeicao = document.getElementById('lbl-refeicao'+idrefeicao);
        divitens = document.getElementById('div-itens'+idrefeicao);
        totalreg = json.totreg;
        console.log('Tot:'+totalreg);

        dttemp = '"'+dataatual+'"';
        descref = '"'+descrefeicao+'"';
        if (totalreg != 0){
            dieta =  json.data[0];
            lblrefeicao.innerHTML = '<label class="text-dark"><strong>Total de Itens: '+ json.totitens+'</strong></label>';
            itensdieta = json.dataitem;
            console.log(itensdieta);
            table = '<table class="table table-dark table-sm">';
            table +='<thead class="text-warning"><tr><th scope="col">Kcal</th><th scope="col">Proteína</th><th scope="col">Carboidrato</th>'+
            '<th scope="col">Gordura</th>';
            table +='</tr></thead>';
            table +='<tbody class="text-warning">';
            table += '<tr><td class="align-middle text-center">'+dieta.totalcalorias+'</td><td class="align-middle text-center">'+dieta.totalproteina+'</td>'+
            '<td class="align-middle text-center">'+dieta.totalcarbo+'</td><td class="align-middle text-center">'+dieta.totalgordura+'</td>';
            table +='</tr></tbody></table>';


            tableitem = '<table class="table table-dark table-sm">';
            tableitem +='<thead class="text-warning"><tr>'+
            '<th  class="align-middle text-center" scope="col">Alimento</th>'+
            '<th class="align-middle text-center" scope="col">Qtd</th>'+
            '<th class="align-middle text-center" scope="col">Kcal</th>'+
            '<th class="align-middle text-center" scope="col">Proteina</th>'+
            '<th class="align-middle text-center" scope="col">Carboidrato</th>'+
            '<th class="align-middle text-center" scope="col">Gordura</th>'+
            '<th class="align-middle text-center" scope="col">Ações</th>';
            tableitem +='</tr></thead>';
            tableitem +='<tbody class="text-warning">';
            itensdieta.forEach((item) => {
                console.log('ITEM');
                console.log(item);
                tableitem +='<tr><td class="align-middle text-center">'+item.alimento.descricao+'</td>';
                tableitem +='<td class="align-middle text-center">'+item.quantgramas+'</td>';
                tableitem +='<td class="align-middle text-center">'+item.totalcalorias+'</td>';
                tableitem +='<td class="align-middle text-center">'+item.totalproteina+'</td>';
                tableitem +='<td class="align-middle text-center">'+item.totalcarbo+'</td>';
                tableitem +='<td class="align-middle text-center">'+item.totalgordura+'</td>';
                tableitem +='<td class="align-middle text-center">';

                tableitem +="<small><button class='btn btn-warning text-dark ml-1 mb-1' "+
                "data-toggle='modal' data-target='.insert-edit-modal-food'"+
                "onclick='insert_edit_food("+idrefeicao+","+descref+","+dttemp+","+JSON.stringify(item)+","+item.id+");'>";
                tableitem +='<span class="glyphicon glyphicon-pencil"></span></button></small>';
                desc = '"'+descrefeicao+'"';
                tableitem +="<small><button class='btn btn-warning text-dark ml-1'"+
                "data-toggle='modal' data-target='.modal-delete-food'"+
                "onclick='deleteitemdieta("+desc+","+JSON.stringify(item)+");' >";
                tableitem +='<span class="glyphicon glyphicon-trash"></span></button></small></td>';
            });
            tableitem +='</tbody></table>';
            divitens.innerHTML = tableitem;
        }
        else{
            lblrefeicao.innerHTML = '<label class="text-danger"><strong>Nenhum Item Lançado</strong></label>';
        }


    } else {
        alert("HTTP-Error: " + response.status);
    }
}

function zeroFill(n) {
    return ('0' + n).slice(-2);
}
function adicionarDiasData(dataat,dias){
    var hoje        = new Date(dataat);
    var datareturn    = new Date(hoje.getTime() + (dias * 24 * 60 * 60 * 1000));
    return datareturn.getFullYear() + "-" + zeroFill((datareturn.getMonth() + 1)) + "-" + zeroFill(datareturn.getDate());
}

function adicionarDiasDataBR(dataat,dias){
    var hoje        = new Date(dataat);
    var datareturn    = new Date(hoje.getTime() + (dias * 24 * 60 * 60 * 1000));
    return zeroFill(datareturn.getDate()) + "/" + zeroFill((datareturn.getMonth() + 1)) + "/" +datareturn.getFullYear();
}

function prevdatadiario(){
    window.location.href = "/sisnutri/diario?dataatual="+dataprev+"&databr="+dataprevBR;
    console.log(dataprevBR);
}
function nextdatadiario(){
    window.location.href = "/sisnutri/diario?dataatual="+datanext+"&databr="+datanextBR;

}

function deleteitemdieta(descrefeicao,item){
    modalmsg = document.getElementById('modal-msg-delete');
    modalmsg.innerHTML = 'Deseja Excluir o item: <strong>'+item.alimento.descricao+'</strong> da Refeição: '+ descrefeicao+'?';
}
function insert_edit_food(idrefeicao,descrefeicao,dataatual,item,id){
    console.log(item);
    lblheadfoo = document.getElementById('lblheadfood')
    if (id == -1){
        lblheadfoo.innerHTML = 'Inserindo item na refeição: '+ descrefeicao;
    }
    else{
        lblheadfoo.innerHTML = 'Alterando o item: '+item.alimento.descricao+' na refeição: '+ descrefeicao;
    }
    edtidrefeicao.value = idrefeicao;
    console.log('Id:'+idrefeicao);
    console.log('Data:'+dataatual);
    console.log(item);
}
async function searchfood(page){
    smalldescricao.classList.add('d-none');
    edtidalimento.value = 0;
    smallempty = document.getElementById('smallempty');
    food = document.getElementById('edtdescfood').value;
    if (food.length == 0 ){
        smallempty.classList.remove('d-none');
    }
    else{
        smallempty.classList.add('d-none');

        url = '/tabfoods.json?descricao='+food+'&page='+page;
        let response = await fetch(url);
        if (response.ok) { // if HTTP-status is 200-299

            let json = await response.json();
            if (json.result == true){
                divfoods.classList.remove('d-none');
                frmgroupqtd.classList.add('d-none');

                if (json.pagul != ''){
                    divpaginationfoods.classList.remove('d-none');

                    divpaginationfoods.innerHTML = json.pagul;
                    lidisabled = document.getElementsByClassName("page-item disabled");
                    for (i = 0; i < lidisabled.length; i++) {
                        try {
                            lidisabled[0].remove();
                        }
                        catch(err) {
                            console.log(err.message);
                        }

                    }
                    lispag = document.getElementsByClassName("page-link");
                    if (lispag.length > 0){
                        lispag[lispag.length-1].remove();
                    }

                    for (i = 0; i < lispag.length; i++) {
                        if (lispag[i].ariaLabel != null){
                            lispag[i].remove();
                        }

                        try {
                            lispag[i].href = "#";
                        }
                        catch(err) {
                            console.log(err.message);
                        }

                        lispag[i].addEventListener("click", function(){
                            searchfood(this.innerHTML);
                        });

                    }
                }
                btnfoods = '';
                // PRENCHE ALIMENTOS ENCONTRADOS
                json.tabfoods.forEach((food) => {
                    vlcarbo =  parseFloat((food.carboidrato == null) ? '0' : food.carboidrato).toFixed(0);
                    vlproteina =  parseFloat((food.proteina == null) ? '0' : food.proteina).toFixed(0);
                    vlfat =  parseFloat((food.lipidios == null) ? '0' : food.lipidios).toFixed(0);
                    vlfibras =  parseFloat((food.fibras == null) ? '0' : food.fibras).toFixed(0);
                    vlsodio =  parseFloat((food.sodio == null) ? '0' : food.sodio).toFixed(0);
                    btnfoods+= "<button  onclick='selectfood("+JSON.stringify(food)+");' type='button'"+
                    " class='list-group-item list-group-item-action'><strong>"+
                    food.descricao+"</strong><br>"+
                    "<small class='text-white text-center'>UN: "+food.unalimento.descricao+", Qtd: "+parseFloat(food.qtdgramasemcima).toFixed(2)+")<br>"+
                    "Kcal: "+parseFloat(food.calorias).toFixed(0)+", Carb.: "+vlcarbo+", "+
                    "Proteina: "+vlproteina+", Gordura.: "+vlfat+" <br>"+
                    "Fibras: "+vlfibras+", Sódio.: "+vlsodio+
                    "</small></button>";
                });
                divfoods.innerHTML = btnfoods;
            }
            else{
                divfoods.classList.add('d-none');
                frmgroupqtd.classList.add('d-none');
                divpaginationfoods.classList.add('d-none');
                divpaginationfoods.innerHTML = "";
            }

        }
        else {
            alert("HTTP-Error: " + response.status);
        }
    }
}
function selectfood(food){
    vlcarbo =  parseFloat((food.carboidrato == null) ? '0' : food.carboidrato).toFixed(0);
    vlproteina =  parseFloat((food.proteina == null) ? '0' : food.proteina).toFixed(0);
    vlfat =  parseFloat((food.lipidios == null) ? '0' : food.lipidios).toFixed(0);
    vlfibras =  parseFloat((food.fibras == null) ? '0' : food.fibras).toFixed(0);
    vlsodio =  parseFloat((food.sodio == null) ? '0' : food.sodio).toFixed(0);

    smallstr = "UN: "+food.unalimento.descricao+", "+
    "Qtd: "+parseFloat(food.qtdgramasemcima).toFixed(2)+"<br>"+
    "Kcal: "+parseFloat(food.calorias).toFixed(0)+", Carb.: "+vlcarbo+", "+
    "Proteina: "+vlproteina+", Gorduras: "+vlfat+", "+
    "Fibras: "+vlfibras+", Sódio.: "+vlsodio;

    smalldescricao.innerHTML = smallstr;
    smalldescricao.classList.remove('d-none');

    edtdescfood.value = food.descricao;
    edtidalimento.value = food.id;
    foodselect = food;
    console.log(foodselect);
    divpaginationfoods.classList.add('d-none');
    divfoods.classList.add('d-none');
    frmgroupqtd.classList.remove('d-none');
    divpaginationfoods.innerHTML = "";

}

