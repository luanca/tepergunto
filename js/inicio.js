// Criado por Luan Carvalho


try {

  document.getElementById("msgInicial").innerHTML = "Bem vindo!";
  document.getElementById("l").style.display = "none";
  document.getElementById("i").style.display = "block";
  document.getElementById("ji_dja").style.display = "none";
  document.getElementById("ji_dra").style.display = "none";
  document.getElementById("ji_dlj").style.display = "block";

  atualizarListagem();
  function primeiraacao() {
    document.getElementById("msgInicial").innerHTML = "Tudo pronto!";
    setTimeout(function () {
      document.getElementById("apresentacao").style.opacity = "0";
      document.getElementById("jogo").style.opacity = "1";
      document.getElementById("apresentacao").style.display = "none";
    }, 1000);
  }
  //document.body.onload = function() {CPerg();}

  function APerg() {
    // Carregar perguntas
    document.getElementById("msgInicial").innerHTML = "Carregando";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
        if (xmlhttp.status == 200) {
          var obj = JSON.parse(xmlhttp.responseText);
          perguntas = [];
          for (fap = 0; fap < obj.length; fap++) {
            perguntas.push(obj[fap]);
          }
          primeiraacao();
          versao = new Date(obj[0].ultAtualizacao);
          versao = Number(versao.getFullYear()).larguraNumero(4) + "." + Number(versao.getMonth() + 1).larguraNumero(2) + Number(versao.getDate()).larguraNumero(2);
          document.getElementById("jf").innerHTML = "© Te Pergunto. Versão " + versao + ". " + perguntas[1].length + " perguntas. Distribuído por LuanCa";
        } else {
          APerg();
        }
      } else {
        //APerg();
      }
    };

    xmlhttp.open("GET", "perguntas.json", true);
    xmlhttp.send();


  }


  APerg();
} catch (erro) {
  document.getElementById("msgInicial").innerHTML = "Erro: " + erro.name + "<br />" + erro.message;
}
