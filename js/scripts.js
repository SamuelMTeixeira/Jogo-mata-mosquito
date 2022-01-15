// CAPTURA O TAMANHO DA TELA, PARA AJUSTAR OS CONTEÚDOS
var screenWidht = 0, screenHeight = 0;
function setConfigurarScreenSize(){
    screenWidht  = window.innerWidth;
    screenHeight = window.innerHeight;
}
setConfigurarScreenSize();

// POSIÇÃO DA MOSCA NA TELA
var posicaoX, posicaoY;

// GERA A POSICAO DO MOSCA NA TELA
function setGerarPosicao(){
    posicaoX = Math.floor(Math.random() * screenWidht) - 90;
    posicaoY = Math.floor(Math.random() * screenHeight) -90;
    if(posicaoX < 0) posicaoX = 0;
    if(posicaoY < 0) posicaoY = 0;
}


// DEFINE O LADO PARA QUAL A MOSCA ESTÁ OLHANDO (ESQUERDA X DIREITA)
function setDefinirLado(){
    switch(Math.floor(Math.random() * 2)){
        case 0: 
            return "lado-direito";
        break;
        case 1: 
            return "lado-esquerdo";
        break;
    }
}

// DEFINE ALEATORIAMENTE O TAMANHO DA MOSCA
function setDefinirTamanho (){
    var tam = Math.floor(Math.random() * 3);
    switch(tam){
        case 0: 
            return "img-mosca-1";
        break;
        case 1: 
            return "img-mosca-2";
        break;
        case 2:
            return "img-mosca-3";
        break;
    }
}

var vidas = 3;
var tempo = 20;
var cronometro = setInterval ( function(){
    tempo--;
    if(tempo >= 0)
        document.getElementById("cronometro").innerHTML = tempo;
    else {
        clearInterval(moscaCriada);
        clearInterval(cronometro);
        window.location.href = "vitoria.html"
    }
        
} ,1000);

// CRIA A IMAGEM DA MOSCA
function setCreateMosca(){
    if(document.getElementById("mosca")) {
        document.getElementById("mosca").remove();

        if(vidas > 0) {
            document.getElementById("vida-"+vidas).src = "imgs/coracao_vazio.png";
            vidas--;
        }
        else
            window.location.href = "game-over.html"
    }
    else {
        var mosca = document.createElement("img");
        mosca.src = "imgs/mosca.png";

        mosca.className = setDefinirTamanho()+" "+setDefinirLado();
        mosca.id = "mosca";
        mosca.style.left = posicaoX+"px";
        mosca.style.top = posicaoY+"px";
        mosca.style.position = "absolute";
        mosca.alt = "Mosca";

        mosca.onclick = function (){
            this.remove();
        }

        setGerarPosicao();

        document.body.appendChild(mosca); // ADICIONA A MOSCA NA TELA
    }
}

// DEFINE A VELOCIDADE DO JOGO DE ACORDO COM O NÍVEL
var velocidadeJogo = 1000;
switch(window.location.search.replace("?", "")){
    case "nlv-normal":
        velocidadeJogo = 2000;
        break;
    case "nlv-dificil":
        velocidadeJogo = 1000;
        break;
    case "nlv-extra":
        velocidadeJogo = 900;
        break;
}