var btn_novaMusica = document.getElementById('btn_novaMusica');
var btn_Cancelar = document.getElementById('btn_Cancelar');
var novoEvento = document.getElementById('novoEvento');
var formNovaMusica = document.getElementById('formNovaMusica');
var inputNomeMusica = document.getElementById('nomeMusica');
var inputNomeCantor = document.getElementById('nomeCantor');
var inputLink = document.getElementById('link');
var divMensagemErro = document.getElementById('mensagemErro');
var tabelaMusicas = document.getElementById('tabelaMusicas');
var inputAutor = document.getElementById('nomeAutor')


       
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

//localstorage 
const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? listaMusicas;
const setItensBD = () =>
  localStorage.setItem("db_items", JSON.stringify(listaMusicas));



function removerMusica(event) {
    var posicao = event.target.getAttribute('data-musica');
    listaMusicas.splice(posicao, 1)
    setItensBD();
    atualizarTabelaMusicas();
    
}

function atualizarTabelaMusicas() {
    listaMusicas = getItensBD();
    console.log('Chamando atualizar a tabela de musicas!')
    if (listaMusicas.length == 0 ) {
        tabelaMusicas.innerHTML = '<tr><td colspan="3">Nenhuma Musica</td></tr>'
        
        return;
        
    }
    tabelaMusicas.innerHTML= '';
    for (var i = 0; i< listaMusicas.length; i++) {
        var musica = listaMusicas[i];
        var linha  = document.createElement('tr');
        var celulaMusica = document.createElement('td');
        var celulaCantor = document.createElement('td');
        var celulaLink =  document.createElement('td');
        var celulaAcoes =  document.createElement('td');
        var celulaAutor = document.createElement('td');
        var botaoExcluir = document.createElement('button');
        botaoExcluir.setAttribute('data-musica', i);
        botaoExcluir.classList.add('btn');  
        botaoExcluir.classList.add('btn-danger');
        botaoExcluir.classList.add('btn-sm');  
        botaoExcluir.addEventListener('click', removerMusica)
        celulaMusica.innerText = musica.nomeMusica;
        celulaCantor.innerText = musica.nomeCantor;
        celulaLink.innerText = musica.link;
        celulaAutor.innerText = musica.nomeAutor;
        botaoExcluir.innerText = 'Remover'
        celulaAcoes.appendChild(botaoExcluir);
        linha.appendChild(celulaMusica);
        linha.appendChild(celulaCantor);
        linha.appendChild(celulaLink);
        linha.appendChild(celulaAutor);
        linha.appendChild(celulaAcoes);
      
        tabelaMusicas.appendChild(linha);
        
        
       
    }
   

}


function limparNovaMusica() {
    inputNomeMusica.value = '';
    inputNomeCantor.value = '';
    inputLink.value = '';
    inputAutor.value = '';
    inputNomeMusica.classList.remove('is-invalid');
    inputNomeCantor.classList.remove('is-invalid');
    inputLink.classList.remove('is-invalid');
    inputAutor.classList.remove('is-invalid');
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

function novaMussicaValida(nomeMusica,nomeCantor,link,nomeAutor) {
   
   

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
   if(link.trim().length == 0) {
    if(error.length >0){
        error+=', '
    }
      error += 'Campo obrigatório'
      inputLink.classList.add('is-invalid');
      validacaoOk = false;
   } else{
       inputLink.classList.remove('is-invalid');
   }

   if(nomeAutor.trim().length == 0) {
    if(error.length >0){
        error+=', '
    }
      error += 'Campo obrigatório'
      inputLink.classList.add('is-invalid');
      validacaoOk = false;
   } else{
       inputLink.classList.remove('is-invalid');
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
     var link = inputLink.value;
     var nomeAutor = inputAutor.value;

     if(novaMussicaValida(nomeMusica,nomeCantor,link, nomeAutor)){
        
         listaMusicas.push({
            nomeMusica: nomeMusica,
            nomeCantor: nomeCantor,
            link: link,
            nomeAutor: nomeAutor
         })
         setItensBD();
         atualizarTabelaMusicas();
         ocultarLista();
         
        
     }else {
        console.log('Nova musica é invalida!');
     }
    
     
}


btn_novaMusica.addEventListener('click',mostrarNovaLista);

btn_Cancelar.addEventListener('click', ocultarLista);

formNovaMusica.addEventListener('submit', salvarNovaMusica);
window.addEventListener('load', atualizarTabelaMusicas, setItensBD);


