//Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 13;
let raio = diametroBolinha / 2;

//Velocidade da bolinha
let velocidadexbolinha = 6;
let velocidadeybolinha = 6;

//Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raquetecomprimento = 10;
let raquetealtura = 90;
let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//Variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let raqueteoponentecomprimento = 10;
let raqueteoponentealtura = 90;
let velocidadeyoponente;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
    trilha = loadSound("sounds/trilha.mp3");
    ponto = loadSound("sounds/ponto.mp3");
    raquetada = loadSound("sounds/raquetada.mp3");
}

function setup() {
    createCanvas(600, 400);
    trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificacolisaoborda();
    mostraRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaminharaquete();
    movimentaraqueteoponente();
    verificacolisaoraquete(xRaquete, yRaquete);
    verificacolisaoraquete(xRaqueteOponente, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();
}

function mostraBolinha(){
    circle(xBolinha, yBolinha, diametroBolinha);
}

function movimentaBolinha(){
    xBolinha += velocidadexbolinha;
    yBolinha += velocidadeybolinha;
}

function verificacolisaoborda(){
    if (xBolinha + raio > width || xBolinha - raio < 0){
        velocidadexbolinha *= -1;
    }
    
    if (yBolinha + raio > height || yBolinha - raio < 0){ 
        velocidadeybolinha *= -1;
    }
}

function mostraRaquete(x, y){
    rect(x, y, raquetecomprimento, raquetealtura);
}

function movimentaminharaquete(){
    if (keyIsDown(UP_ARROW)){
        yRaquete -= 10;
    }

    if (keyIsDown(DOWN_ARROW)){
        yRaquete += 10;
    }
}

function verificacolisaoraquete(x, y){
    colidiu = collideRectCircle(x, y, raquetecomprimento, raquetealtura, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadexbolinha *= -1;
        raquetada.play();
    }
}

function movimentaraqueteoponente(){
    if (keyIsDown(87)){
        yRaqueteOponente -= 10;
    }

    if (keyIsDown(83)){
        yRaqueteOponente += 10;
    }

}

function incluiPlacar(){
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosOponente, 470, 26);
}

function marcaPonto(){
    if (xBolinha > 590){
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10){
        pontosOponente += 1;
        ponto.play();
    }
}
