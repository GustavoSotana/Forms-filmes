//Manipulação - DOM
const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-filmes");
const modelo = document.querySelector("#modelo-filme");

const apiKey="cv_jK1NqCVRcB0lODOkEB3TvQFhPF0Cdq6VudYmBYXAR9F0ZlWsr7R_yvOH76xFGgjU";
const apiUrl="https://api-ds.codeverse.dev.br/api/filmes";

//Funcao que busca todos os filmes da API

async function buscarFilmes() {
  resposta.textContent = "Carregando filmes..."

  try {
    //Fazer uma requisicao GET para buscar os filmes
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key": apiKey}
    });

    if(!retorno.ok){
      throw new Error("Nao foi possivel buscar os filmes")
    }

    //converter para JSON
    const resultado = await retorno.json();

    //Percorrer todos os filmes e montar o filme.

    for (const filme of resultado.data) {
      const card = modelo.content.cloneNode(true);

      card.querySelector(".nome").textContent = filme.title;
      card.querySelector(".Gênero").textContent = filme.Gênero;
      card.querySelector(".ano").textContent = filme.ano;
      card.querySelector(".diretor").textContent = filme.diretor;

      const imagem = card.querySelector("img");

      if(filme.imageUrl){
        imagem.src = filme.imageUrl;
        imagem.alt =  filme.title;
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
    }

    resposta.textContent="";


  } catch (error) {
    resposta.textContent = "Não foi possivel carregar os filmes. Tente novamente!"
    console.error(error);
  }

}

//executo a funcao
buscarFilmes();