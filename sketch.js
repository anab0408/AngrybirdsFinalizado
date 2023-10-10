const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world, bg, backgroundImg;
var caixa1, caixa2, porco1, tronco1;
var caixa3, caixa4, porco2, tronco2;
var caixa5, tronco3, tronco4;
var fundoImg, solo, plataforma;
var bird, estilingue;
var estado = "no estilingue";
var pontos = 0;
var chances= 3;
var reiniciar;

function preload() {
    getBackgroundImg();
    fundoImg = loadImage("sprites/bg.png");
}

function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;


    solo = new Solo(width/2, height, width, 20);
    plataforma = new Solo(150, height/2, 300, 170);

    caixa1 = new Caixa(width/2+150, height-100, 70,70);
    caixa2 = new Caixa(width/2+350, height-100, 70,70);
    porco1 = new Porco(950, height-100);
    tronco1 = new Tronco(width/2 + 250, height - 100, 300, PI/2);

    caixa3 = new Caixa(width/2+150, height-50, 70,70);
    caixa4 = new Caixa(width/2+350, height-50, 70,70);
    porco2 = new Porco(950, height-80);

    tronco3 =  new Tronco(width/2 + 250, height - 200, 300, PI/2);

    caixa5 = new Caixa(width/2 + 240, height - 300, 70,70);
    tronco4 = new Tronco(width/2 + 170, height - 360, 150, PI/7);
    log5 = new Tronco(width/2 + 330, height - 360, 150, -PI/7);

    bird = new Passaro(200, height/2 - 120);

    estilingue = new Estilingue(bird.body, {x:200, y: height/2});

    reiniciar = createImg("sprites/menu_refresh.png");
    reiniciar.position(20,12);
    reiniciar.size(35,35);
    reiniciar.mouseClicked(()=>{location.reload()});
}

function draw(){
    if (backgroundImg){
        background(backgroundImg);
    } else {
        background(fundoImg);
    }

    noStroke();
    textSize(35);
    fill("white");
    text("Pontos: "+pontos, width-250, 50);
    text(chances, 110, 40);
    image(bird.image,70,13,30,30);

    Engine.update(engine);
    //strokeWeight(4);
    caixa1.display();
    caixa2.display();
    solo.display();
    porco1.display();
    porco1.score();
    tronco1.display();

    caixa3.display();
    caixa4.display();
    porco2.display();
    porco2.score();
    tronco3.display();

    caixa5.display();
    tronco4.display();
    log5.display();

    if(chances<=0 && estado === "no estilingue"){
    }else{
        bird.display(); 
    }
    
    plataforma.display();
    //log6.display();
    estilingue.display();  
    
    if (chances > 1){

        image(bird.image,110,170,50,50);

        if (chances > 2){
            image(bird.image,40,170,50,50);
        }
    } 

    if (pontos === 400){
        textSize(50);
        fill("white");
        text("Você venceu!",450,200);
    } else if (chances<=0){
        textSize(50);
        fill("white");
        text("Tente novamente...",450,200);
    }
    
    if (mouseIsPressed && chances > 0 && estado === "no estilingue"){
        Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}
function mousePressed(){
    if(estado === "lançado" && chances > 0) {
        estilingue.ligar();
        Body.setPosition(bird.body, {x: 200, y: height-200});
        Body.setAngle(bird.body,0);
        estado = "no estilingue";
        bird.trajetoria = []; 
    }
}

function mouseReleased(){
    if (estado === "no estilingue" && chances>0){
        estilingue.voar();
        estado = "lançado";
        chances--;
    }
}

function keyPressed(){
    if(keyCode === 32 && chances > 0){
        estilingue.ligar();
        Body.setPosition(bird.body, {x: 200, y: 50});
        Body.setAngle(bird.body,0);
        estado = "no estilingue";
        bird.trajetoria = [];  
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/America/Sao_Paulo");
    console.log(response);
    var responseJSON = await response.json();
    console.log(responseJSON);

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if (hour >= 6 && hour <19){
        bg = "sprites/bg.png";
    } else{
        bg = "sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}