// Criado por Luan Carvalho

var versao = 2021.1210; // versão desta edicao do jogo (AAAA.MMDD)
var jogadores = []; // array de jogadores cadastrados
var jogadores_auxilio = []; // array de jogdores na rodada
var ordemPerguntas = []; // ordem das perguntas
var perguntas = null;  // array de perguntas
var jogadorAtual = null; // indice do jogador atual na array jogadores
var rodada = 0; // numero da rodada
var classificacao = [];
var pergCarreg = 0; // Boolean: Perguntas carregadas

Number.prototype.larguraNumero = function (pln) {
  var larg = { useGrouping: false, minimumIntegerDigits: pln };
  var numero = this.valueOf();
  return numero.toLocaleString("pt-BR", larg);
};

var injogador = null;
function inserirJogadores() {
  var nomejogador = document.getElementById("inputnomejogador");
  if (nomejogador.value != "") {
    if (injogador == null) {
      // Adicionando nome ao JSON
      jogadores[jogadores.length] = { "nome": encodeURIComponent(nomejogador.value), "respCertas": 0, "respErradas": 0 };
    } else {
      document.getElementById("legnomejogador").innerHTML = "Digite o nome do participante";
      document.getElementById("btnomejogador").value = "Adicionar";
      jogadores[injogador]["nome"] = encodeURIComponent(nomejogador.value);
      injogador = null;
    }

    nomejogador.value = "";
    atualizarListagem();
  }
}

function atualizarListagem() {
  // atualizando listagem de jogadores
  var lista1 = document.getElementById("ji_ra");
  var lista2 = document.getElementById("ji_lj");
  var lista3 = document.getElementById("jp_tj");
  lista1.innerHTML = "";
  lista2.innerHTML = "";
  //tresDigitos
  classificacao = [];
  for (al2 = 0; al2 < jogadores.length; al2++) {
    var porcentagem2 = 100 / (jogadores[al2].respCertas + jogadores[al2].respErradas) * jogadores[al2].respCertas;
    if (isNaN(porcentagem2)) { porcentagem2 = 0 }; // Se a variavel porcentagem estiver dividindo 100 por 0 vai gerar um erro, essa linha substitui o erro por zero
    porcentagem2 = porcentagem2.toFixed(0);
    //porcentagem.toFixed(0)
    classificacao[classificacao.length] = Number(porcentagem2).larguraNumero(3) + "_" + (jogadores[al2].respCertas + jogadores[al2].respErradas) + "_" + al2;
  }
  classificacao.sort();
  classificacao.reverse();
  for (al3 = 0; al3 < classificacao.length; al3++) {
    var al_f = classificacao[al3].slice(classificacao[al3].lastIndexOf("_") + 1) * 1;
    var porcentagem = 100 / (jogadores[al_f].respCertas + jogadores[al_f].respErradas) * jogadores[al_f].respCertas;
    if (isNaN(porcentagem)) { porcentagem = 0 }; // Se a variavel porcentagem estiver dividindo 100 por 0 vai gerar um erro, essa linha substitui o erro por zero
    var al_f2 = "";
    if ((jogadores[al_f].respCertas + jogadores[al_f].respErradas) > 1) { al_f2 = " respostas" } else { al_f2 = " resposta" }
    if (porcentagem == 0 && (jogadores[al_f].respCertas + jogadores[al_f].respErradas) == 0) {
      var n1012h = document.createElement("span");
      var n1012i = document.createElement("i");
      n1012i.textContent = decodeURIComponent(jogadores[al_f].nome) + ": ";
      n1012h.appendChild(n1012i);
      n1012h.innerHTML += "-";
      lista1.appendChild(n1012h);
    } else {
      var n1012h = document.createElement("span");
      var n1012i = document.createElement("i");
      n1012i.textContent = decodeURIComponent(jogadores[al_f].nome) + ": ";
      n1012h.appendChild(n1012i);
      n1012h.innerHTML += porcentagem.toFixed(0) + "% em " + (jogadores[al_f].respCertas + jogadores[al_f].respErradas) + al_f2;
      lista1.appendChild(n1012h);
    }
  }
  for (al = 0; al < jogadores.length; al++) {
    var n1012a = document.createElement("span");
    n1012a.title = "Nome:\n " + decodeURIComponent(jogadores[al].nome);
    var n1012b = document.createElement("i");
    n1012b.textContent = decodeURIComponent(jogadores[al].nome);
    n1012a.appendChild(n1012b);
    var n1012c = document.createElement("span");
    n1012c.setAttribute("class", "jogOp");
    var n1012d = document.createElement("span");
    n1012d.setAttribute("class", "jol");
    var n1012e = document.createElement("a");
    n1012e.title = "Renomear: " + decodeURIComponent(jogadores[al].nome);
    n1012e.setAttribute("onclick", "javascript:renomearJog(" + al + ");");
    n1012e.innerHTML = "Renomear";
    n1012e.setAttribute("class", "jop");
    n1012d.appendChild(n1012e);
    var n1012f = document.createElement("a");
    n1012f.title = "Excluir: " + decodeURIComponent(jogadores[al].nome);
    n1012f.setAttribute("onclick", "javascript:excluirJog(" + al + ");");
    n1012f.innerHTML = "Excluir";
    n1012f.setAttribute("class", "jop");
    n1012d.appendChild(n1012f);
    n1012c.appendChild(n1012d);
    var n1012g = document.createElement("span");
    n1012g.setAttribute("class", "job");
    n1012g.innerHTML = "⸰⸰⸰";
    n1012c.appendChild(n1012g);
    n1012a.appendChild(n1012c);
    lista2.appendChild(n1012a);
    if (jogadores.length < 2) { lista3.innerHTML = jogadores.length + " participante" } else { lista3.innerHTML = jogadores.length + " participantes" };
  }
  // Se não houver nenhum jogador no JSON
  if (jogadores.length == 0) {
    lista1.innerHTML = "—";
    lista2.innerHTML = "—";
    lista3.innerHTML = "";
  }
}

function renomearJog(rj1) {
  // Renomear jogador, rj1 = JSON index de jogador
  injogador = rj1;
  document.getElementById("inputnomejogador").value = decodeURIComponent(jogadores[rj1]["nome"]);
  document.getElementById("btnomejogador").value = "Renomear";
  document.getElementById("legnomejogador").innerHTML = "Renomeie este participante";
}

function excluirJog(ej1) {
  // excluir um jogador da variavel jogadores
  jogadores.splice(ej1, 1);
  atualizarListagem();
}

function iniciarjogo() {
  // Iniciar jogo
  document.getElementById("l").style.display = "block";
  document.getElementById("i").style.display = "none";
  document.getElementById("f").style.display = "none";
  document.getElementById("ji_dja").style.display = "block";
  document.getElementById("ji_dra").style.display = "block";
  document.getElementById("ji_dlj").style.display = "none";
  escjogador();
  escpergunta();
}

function escjogador() {
  if (jogadores.length != 0) {
    // Escolher jogador ao fazer pergunta
    if (jogadores_auxilio.length == 0) {
      if (jogadores.length > 1) {
        rodada++;
        document.getElementById("ji_ro").innerHTML = rodada + "ª série de perguntas";
      }
      for (ej1 = 0; ej1 < jogadores.length; ej1++) {
        jogadores_auxilio[jogadores_auxilio.length] = ej1;
      }
      jogadores_auxilio.sort(function (a, b) { return 0.5 - Math.random() });
    }
    document.getElementById("ji_ja").textContent = decodeURIComponent(jogadores[jogadores_auxilio[0]]["nome"]);
    jogadorAtual = jogadores_auxilio[0] * 1;
    jogadores_auxilio.splice(0, 1);
  } else {
    document.getElementById("ji_ja").textContent = "você";
    document.getElementById("ji_dra").style.display = "none";
  }
}

function escpergunta() {
  // escolher e exibir uma pergunta
  if (perguntas[2].length == 0) {
    perguntas[2] = [];
    var vep = perguntas[1].sort(function (a, b) { return 0.5 - Math.random() });
    for (ep1 = 0; ep1 < perguntas[1].length; ep1++) {
      perguntas[2].push(vep[ep1]);
    }
  }

  var respostas = ["lresp1", "lresp2", "lresp3", "lresp4"];
  var tbase = decodeURIComponent(perguntas[2][0][6]);
  if (tbase.length > 0) { tbase = " | " + tbase; }
  respostas.sort(function (a, b) { return 0.5 - Math.random() });
  document.getElementById("lperg").innerHTML = decodeURIComponent(perguntas[2][0][1]);
  document.getElementById("lpergn").innerHTML = "Pergunta " + perguntas[2][0][0] + tbase;
  document.getElementById(respostas[0]).innerHTML = decodeURIComponent(perguntas[2][0][2]);
  document.getElementById(respostas[1]).innerHTML = decodeURIComponent(perguntas[2][0][3]);
  document.getElementById(respostas[2]).innerHTML = decodeURIComponent(perguntas[2][0][4]);
  document.getElementById(respostas[3]).innerHTML = decodeURIComponent(perguntas[2][0][5]);
  document.getElementById(respostas[0]).setAttribute("rc", "1");
  document.getElementById(respostas[1]).setAttribute("rc", "0");
  document.getElementById(respostas[2]).setAttribute("rc", "0");
  document.getElementById(respostas[3]).setAttribute("rc", "0");

  perguntas[2].splice(0, 1);
  document.getElementById("lresp").setAttribute("mr", "0");
  document.getElementById("lresp").setAttribute("re", "0");
  document.getElementById("proxPerg").style.display = "none";
}

function vresp(vr1) {
  // verificar e exibir resposta correta, exibir botão para proxima pergunta
  var vvr1 = document.getElementById("lresp" + vr1).getAttribute("rc");
  var vvr2 = document.getElementById("lresp").getAttribute("mr");
  if (vvr2 == 0) {
    if (vvr1 == 1) {
      if (jogadores.length > 0) { jogadores[jogadorAtual]["respCertas"]++; }
      document.getElementById("jp_vr").innerHTML = "Oba! Acertou!";
    } else {
      if (jogadores.length > 0) { jogadores[jogadorAtual]["respErradas"]++; }
      document.getElementById("jp_vr").innerHTML = "Ihhh! Errou!";
    }

    document.getElementById("lresp").setAttribute("mr", "1");
    document.getElementById("lresp").setAttribute("re", vr1);
    document.getElementById("proxPerg").style.display = "block";
    atualizarListagem();
  }
}

function proxPerg() {
  escjogador();
  escpergunta();
}


function transformaEndereco(url) {
  // transformar endereço OneDrive
  var tea = url.slice(url.indexOf("?") + 1, url.length);
  var teb = tea.replace(/=/g, "\":\"");
  var tec = teb.replace(/&/g, "\", \"");
  var ted = JSON.parse("{\"" + tec + "\"}");
  return "https://api.onedrive.com/v1.0/drives/" + ted["cid"] + "/items/" + decodeURIComponent(ted["resid"]) + "/content?authkey=!" + ted["authkey"];
}

function fJogo() {
  // finalizar jogo
  document.getElementById("l").style.display = "none";
  document.getElementById("i").style.display = "none";
  document.getElementById("ji_dja").style.display = "none";
  document.getElementById("f").style.display = "block";
}

function rJogo() {
  // Reiniciar jogo, voltar ao início
  document.getElementById("l").style.display = "none";
  document.getElementById("f").style.display = "none";
  document.getElementById("i").style.display = "block";
  document.getElementById("ji_dja").style.display = "none";
  document.getElementById("ji_dra").style.display = "none";
  document.getElementById("ji_dlj").style.display = "block";
  document.getElementById("ji_ro").innerHTML = "";
  jogadores_auxilio = [];
  ordemPerguntas = []; // ordem das perguntas
  jogadorAtual = null; // indice do jogador atual na array jogadores
  rodada = 0; // numero da rodada
  classificacao = [];
  // jogadores[jogadorAtual]["respCertas"]++;jogadores[jogadorAtual]["respErradas"]++;
  for (frj = 0; frj < jogadores.length; frj++) {
    jogadores[frj]["respCertas"] = 0;
    jogadores[frj]["respErradas"] = 0;
  }
  atualizarListagem();
  primeiraacao();
}
