var tbfoods = [];

var thporcao = document.getElementById('th-porcao');

function calcinfonutri(){
    qtdgramasemcima = tbfoods.qtdgramasemcima;
    tbfood = [];
    tbfood.proteina = (tbfoods.proteina*thporcao.value)/qtdgramasemcima;
    tbfood.carboidrato = (tbfoods.carboidrato*thporcao.value)/qtdgramasemcima;
    tbfood.lipidios = (tbfoods.lipidios*thporcao.value)/qtdgramasemcima;
    tbfood.fibras = (tbfoods.fibras*thporcao.value)/qtdgramasemcima;
    tbfood.calorias = (tbfoods.calorias*thporcao.value)/qtdgramasemcima;
    tbfood.descricao = tbfoods.descricao;
    console.log(tbfoods);
    calculardadosnutri(tbfood,thporcao.value);

}

function mostradadosfoods(tbfood,qtdgramas){
    tbfoods = tbfood;
    calculardadosnutri(tbfoods,qtdgramas);
}
function calculardadosnutri(tbfood,qtdgramas){
    google.charts.load('current', {'packages':['corechart']}).then( function(){

        var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Protéina', tbfood['proteina']],
        ['Carboidrato', tbfood['carboidrato']],
        ['Gordura', tbfood['lipidios']],
        ['Fibras', tbfood['fibras']]
        ]);

        var options = {//'title':'Informação Nutricional - Total Calorias:',
                       'backgroundColor': 'transparent',
                       'legend':{'position':'rigth'},
                       'chartArea':{'left':0,'top':30,'width':'100%','height':'80%'},
                       'is3D':true,
                       'left': 0,
                       'width':550,
                       'height':300,
                       //'pieHole': 0.4,
                       };
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);

        tablefoods = document.getElementById('table-foods');
        divdadosfood = document.getElementById('div-dadosfood');
        divdescfood = document.getElementById('div-descfood');
        thcalorias = document.getElementById('th-calorias');
        trfood = document.getElementById('tr-food');
        navpaginationfoods = document.getElementById('navpagination-foods');
        divcabfoods = document.getElementById('divcab-foods');

        divdescfood.innerHTML = '<h5>Alimento: '+ tbfood['descricao'] + '</h5>';

        proteina = tbfood['proteina'] == null ? 0 : tbfood['proteina'];

        fibras = tbfood['fibras'] == null ? 0 : tbfood['fibras'];
        carbo = tbfood['carboidrato'] == null ? 0 : tbfood['carboidrato'];
        lipidios = tbfood['lipidios'] == null ? 0 : tbfood['lipidios'];
        sodio = tbfood['sodio'] == null ? 0 : tbfood['sodio'];


        thporcao.value = qtdgramas;
        tdtemp  = '<td class="text-primary"><small><strong>'+carbo.toFixed(2)+' gr</small></strong></td>';
        tdtemp += '<td class="text-primary"><small><strong>'+proteina.toFixed(2)+' gr</small></strong></td>';
        tdtemp += '<td class="text-primary"><small><strong>'+lipidios.toFixed(2)+' gr</small></strong></td>';
        tdtemp += '<td class="text-primary"><small><strong>'+fibras.toFixed(2)+' gr</small></strong></td>';
        tdtemp += '<td class="text-primary"><small><strong>'+fibras.toFixed(2)+' gr</small></strong></td>';

        trfood.innerHTML = tdtemp;
        thcalorias.innerHTML = tbfood['calorias'];
        tablefoods.classList.add('d-none');
        divcabfoods.classList.add('d-none');
        navpaginationfoods.classList.add('d-none');
        divdadosfood.classList.remove('d-none');

    });
}

function btnvoltarmain(){
    tablefoods = document.getElementById('table-foods');
    divdadosfood = document.getElementById('div-dadosfood');
    navpaginationfoods = document.getElementById('navpagination-foods');
    divcabfoods = document.getElementById('divcab-foods');

    tablefoods.classList.remove('d-none');
    divcabfoods.classList.remove('d-none');
    navpaginationfoods.classList.remove('d-none');
    divdadosfood.classList.add('d-none');

}


$('#orberby-foods').on('change', function(e) {
    e.preventDefault();
    console.log(pageatual);
    console.log(perpage);
    console.log(this.value);
    valinputdescricao = document.getElementById('input-descricao').value;
    var valorderby = $( "#orberby-foods option:selected" ).val();
    window.location.href = '/tabalimentos?page='+pageatual+'&totpage='+perpage+'&orderby='+valorderby+'&descricao='+valinputdescricao;

});