

function readURL(input) {
    console.log('entrou');
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#imgprod')
        .attr('src', e.target.result)
        .width(100)
        .height(100);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function editprod(product,caminhoimg,acao){
    if (acao == 'A'){
        document.getElementById('edtid').value = product['id'];
        document.getElementById('edtdescricao').value = product['descricao'];
        document.getElementById('edtsubdescricao').value = product['subdescricao'];
        document.getElementById('edtprecocusto').value = product['precocusto'];
        document.getElementById('edtmargemlucro').value = product['margemlucro'];
        document.getElementById('edtprecovenda').value = product['precovenda'];
        document.getElementById('edtestoqminimo').value = product['estoquemin'];
        document.getElementById('edtestoqatual').value = product['estoqueatual'];
        document.getElementById('lblidprod').innerHTML = 'Edição Produto. Código: '+product['id'];
        cam = caminhoimg + "\\"+product['caminhoimg'];



        if(product['caminhoimg'] != ''){
            console.log(cam);
            elimg = document.getElementById('imgprod');
            elimg.src = document.getElementById('imgprod_'+product['id']).src;

        }
    }
    if (acao == 'I'){
        document.getElementById('edtid').value = '-1';
    }
    $('#collapse-dadosgerais').addClass('show');


}
function btnqtdpag(token,page,qtdporpag,urlroot){
    console.log(token);
    console.log(page);
    console.log(qtdporpag);
    console.log(urlroot);
    window.location.assign(urlroot+'allprodutos/'+page+'/'+qtdporpag+'?current_user={}&token='+token);


}