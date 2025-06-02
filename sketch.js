let seeds = [];
let buildings = [];

function setup() {
  createCanvas(800, 600);
  textSize(20);
  fill(50, 150, 50);
  textAlign(CENTER);
  text("Clique na terra à esquerda para plantar uma semente!", width / 2, 30);
}

function draw() {
  background(200, 230, 200); // Céu

  // Chão
  fill(100, 200, 100);
  rect(0, height - 100, width, 100);

  // Linha divisória campo-cidade
  stroke(120);
  line(width / 2, 0, width / 2, height);

  // ÁREA RURAL - Árvores
  for (let seed of seeds) {
    seed.grow();
    seed.display();
  }

  // ÁREA URBANA - Prédios
  for (let b of buildings) {
    b.grow();
    b.display();
  }

  // Mensagem educativa
  textSize(16);
  text("Campo e cidade podem crescer juntos de forma sustentável!", width / 2, height - 20);
}

function mousePressed() {
  if (mouseY > height - 100) {
    if (mouseX < width / 2) {
      // Planta semente
      seeds.push(new Seed(mouseX, mouseY));
    } else {
      // Constrói prédio
      buildings.push(new Building(mouseX, mouseY));
    }
  }
}

class Seed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.growth = 0;
  }

  grow() {
    if (this.growth < 100) {
      this.growth += 0.1;
    }
  }

  display() {
    fill(139, 69, 19);
    ellipse(this.x, this.y, 10, 10);

    if (this.growth > 20) {
      stroke(101, 67, 33);
      strokeWeight(4);
      line(this.x, this.y, this.x, this.y - this.growth);

      if (this.growth > 40) {
        noStroke();
        fill(34, 139, 34);
        ellipse(this.x, this.y - this.growth, this.growth / 2, this.growth / 2);
      }
    }
  }
}

class Building {
  constructor(x, y) {
    this.x = x;
    this.baseY = y;
    this.height = 0;
    this.maxHeight = random(60, 150);
    this.color = color(random(100, 180), random(100, 180), random(100, 200));
    this.width = random(30, 50);
  }

  grow() {
    if (this.height < this.maxHeight) {
      this.height += 0.3;
    }
  }

  display() {
    fill(this.color);
    rect(this.x - this.width / 2, this.baseY - this.height, this.width, this.height);

    // Janela simbólica
    fill(255, 255, 200);
    rect(this.x - 10, this.baseY - this.height + 10, 8, 8);
  }
}
