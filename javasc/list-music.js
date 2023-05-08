var btn_novaMusica = document.getElementById('btn_novaMusica');
var btn_Cancelar = document.getElementById('btn_Cancelar');
var novoEvento = document.getElementById('novoEvento');
var formNovaMusica = document.getElementById('formNovaMusica');
var inputNomeMusica = document.getElementById('nomeMusica');
var inputNomeCantor = document.getElementById('nomeCantor');
var inputObservacao = document.getElementById('observacao');
var divMensagemErro = document.getElementById('mensagemErro')
var tabelaMusicas = document.getElementById('tabelaMusicas')
       
const inputBusca = document.getElementById('busca');
const tabelaMusic = document.getElementById('tabelaMusicas');

//sitemas buscas
inputBusca.addEventListener('keyup', ()=>{
    let expressao = inputBusca.value.toLowerCase();
    
    if (expressao.length === 1) {
       return;
    }

    let linhas = tabelaMusic.getElementsByTagName('tr')

    
    for (let posiccao in linhas){
        if (true == isNaN(posiccao)) {
            continue;
        }
        let conteudoDalinha = linhas[posiccao].innerHTML.toLocaleLowerCase();
        
        if  (true == conteudoDalinha.includes(expressao)) {
            linhas[posiccao].style.display = '';
        }else {
            linhas[posiccao].style.display = 'none';
        }

    }
})


var listaMusicas = [];

function populateStorage() {
    var nomeMus = document.getElementById('nomeMusica');
    var nomeCant = document.getElementById('nomeCantor'); 
    var observe = document.getElementById('observacao');
    
    var dados = JSON.parse(localStorage.getItem('dadosMusicas'));

    if(dados == null){
        localStorage.setItem('dadosMusicas', '[]');
        dados = [];
    }
     var autoregistro = {
        nomeMus: nomeMus.value,
        cantor:  nomeCant.value,
        observe: observe.value
     }

     dados.push(autoregistro);
     localStorage.setItem('dadosMusicas', JSON.stringify(dados));
  }
  

function removerMusica(event) {
    var posicao = event.target.getAttribute('data-musica');
    listaMusicas.splice(posicao, 1)
    atualizarTabelaMusicas();
    window.populateStorage();
   
}

function atualizarTabelaMusicas() {
    console.log('Chamando atualizar a tabela de musicas!')
    if (listaMusicas.length == 0 ) {
        tabelaMusicas.innerHTML = '<tr><td colspan="3">Nenhuma Musica</td></tr>'
        window.populateStorage();
        return;
        
    }
    tabelaMusicas.innerHTML= '';
    for (var i = 0; i< listaMusicas.length; i++) {
        var musica = listaMusicas[i];
        var linha  = document.createElement('tr');
        var celulaMusica = document.createElement('td');
        var celulaCantor = document.createElement('td');
        var celulaObservacao =  document.createElement('td');
        var celulaAcoes =  document.createElement('td');
        var botaoExcluir = document.createElement('button');
        botaoExcluir.setAttribute('data-musica', i);
        botaoExcluir.classList.add('btn');  
        botaoExcluir.classList.add('btn-danger');
        botaoExcluir.classList.add('btn-sm');  
        botaoExcluir.addEventListener('click', removerMusica)
        celulaMusica.innerText = musica.nomeMusica;
        celulaCantor.innerText = musica.nomeCantor;
        celulaObservacao.innerText = musica.observacao;
        botaoExcluir.innerText = 'Remover'
        celulaAcoes.appendChild(botaoExcluir);
        linha.appendChild(celulaMusica);
        linha.appendChild(celulaCantor);
        linha.appendChild(celulaObservacao);
        linha.appendChild(celulaAcoes);
        tabelaMusicas.appendChild(linha);
        
       
    }

}


function limparNovaMusica() {
    inputNomeMusica.value = '';
    inputNomeCantor.value = '';
    inputObservacao.value = '';
    inputNomeMusica.classList.remove('is-invalid');
    inputNomeCantor.classList.remove('is-invalid');
    inputObservacao.classList.remove('is-invalid');
    divMensagemErro.classList.add('d-none');
    divMensagemErro.innerHTML = '';
}



function mostrarNovaLista(){
    
    novoEvento.classList.remove('d-none');
}

function ocultarLista(){
   
    novoEvento.classList.add('d-none');
    limparNovaMusica();


}

function novaMussicaValida(nomeMusica,nomeCantor,observacao) {
    var validacaoOk = true;
    var error = '';
    if(nomeMusica.trim().length == 0){
        if (error.length > 0){
            error+= ', '
        }
        error += 'O nome da música é obrigatório'
        inputNomeMusica.classList.add('is-invalid');
        validacaoOk = false;
   }else{
        inputNomeMusica.classList.remove('is-invalid');
   }
   if(nomeCantor.trim().length == 0){
        if(error.length > 0){
            error+=', '
        }
        error += 'O nome do cantor é obrigatório'
        inputNomeCantor.classList.add('is-invalid');
        validacaoOk = false;
   }else{
        inputNomeCantor.classList.remove('is-invalid');
   }
   if(observacao.trim().length == 0) {
    if(error.length >0){
        error+=', '
    }
      error += 'Campo obrigatório'
      inputObservacao.classList.add('is-invalid');
      validacaoOk = false;
   } else{
       inputObservacao.classList.remove('is-invalid');
   }
    // nome da musica esta vazio?
    // nome do cantor esta vazio?
    // nome observacao esta vazio?
    if (!validacaoOk) {
          
        divMensagemErro.innerHTML = error;
        divMensagemErro.classList.remove('d-none');
    }else{
        divMensagemErro.classList.add('d-none')
    }

    
    return validacaoOk;
}


function salvarNovaMusica(event) {
     event.preventDefault();
     var nomeMusica =  inputNomeMusica.value;
     var nomeCantor = inputNomeCantor.value;
     var observacao = inputObservacao.value;

     if(novaMussicaValida(nomeMusica,nomeCantor,observacao)){
        
         listaMusicas.push({
            nomeMusica: nomeMusica,
            nomeCantor: nomeCantor,
            observacao: observacao 
         })
         atualizarTabelaMusicas();
         ocultarLista();
     }else {
        console.log('Nova musica é invalida!');
     }
}


btn_novaMusica.addEventListener('click',mostrarNovaLista);

btn_Cancelar.addEventListener('click', ocultarLista);

formNovaMusica.addEventListener('submit', salvarNovaMusica);
window.addEventListener('load', atualizarTabelaMusicas)


