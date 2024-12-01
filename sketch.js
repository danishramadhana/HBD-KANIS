/*
 * b'day card
 * created: 21 December 2018
 * d-day: 24 December 🎉
 * 
 * https://hilmizul.github.io/bday
 */

var mobils = [];
var balloons = [];
var total = 12;
var font;
var foto, bgStatic;
var txt = "HAPPY BIRTHDAY";
var name = "AINUNNISA MALLAPISENG";
var sfxPop;
var maskImage;
var imgWidth = 200;
var imgHeight = 200;

function preload() {
    foto = loadImage("assets/img/FOTO.png");
    bgStatic = loadImage("https://png.pngtree.com/thumb_back/fw800/background/20221028/pngtree-abstract-pink-background-image_1469866.jpg");
    font = loadFont("assets/font/FredokaOne.ttf");
    sfxPop = loadSound("assets/sound/assets_sfx_pop.mp3");

    // Create a circular mask
    maskImage = createGraphics(imgWidth, imgHeight);
    maskImage.ellipse(maskImage.width / 2, maskImage.height / 2, imgWidth, imgHeight);
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < total; i++) {
        balloons.push(new Ballon());
    }

    // Apply mask to the photo
    foto.mask(maskImage);
}

function draw() {
    background(114, 51, 153);
    
    image(bgStatic, 0, 0, width, height);

    push();
    var imgX = width / 2;
    var imgY = height / 2;
    translate(imgX + (-mouseX + width / 2) / 30, imgY + (-mouseY + height / 2) / 30);
    imageMode(CENTER);
    
    // Image inside the circle with original aspect ratio
    image(foto, 0, 0, imgWidth, imgHeight);
    pop();

    // Frame moving with photo
    push();
    noFill();
    stroke(200, 120);
    strokeWeight(6);
    translate(imgX + (-mouseX + width / 2) / 30, imgY + (-mouseY + height / 2) / 30);
    ellipse(0, 0, imgWidth, imgHeight);
    pop();

    // Name and text
    push();
    fill(255);
    stroke(45, 28, 82);
    strokeWeight(7);
    textFont(font);
    textSize(29);
    textAlign(CENTER);
    text(name, imgX + (mouseX - width / 2) / 30, imgY + 200 + (mouseY - height / 2) / 30);
    text(txt, imgX + (mouseX - width / 2) / 30, imgY - 150 + (mouseY - height / 2) / 30);
    pop();

    // Balloons
    for (let i = 0; i < balloons.length; i++) {
        balloons[i].show();
        balloons[i].up();
        balloons[i].checkEdge()
        if (balloons[i].mouseHover()) {
            sfxPop.play();
            balloons.splice(i, 1);
        }
    }

    if (balloons.length < 3) {
        for (let i = 0; i < total; i++) {
            balloons.push(new Ballon());
        }
    }
}

function keyPressed() {
    if (key === 'z' || key === 'Z') {
        for (let i = 0; i < total; i++) {
            balloons.push(new Ballon());
        }
    }
}
