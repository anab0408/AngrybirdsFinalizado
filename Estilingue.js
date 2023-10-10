class Estilingue {
  constructor(bodyA, pointB) {
    var options = {
      bodyA: bodyA,
      pointB: pointB,
      stiffness: 0.04,
      length: 10
    }
    this.imagem1 = loadImage('sprites/sling1.png');
    this.imagem2 = loadImage('sprites/sling2.png');
    this.imagem3 = loadImage('sprites/sling3.png');
    this.pointB = pointB;
    this.bodyA = bodyA;
    this.estilingue = Constraint.create(options);
    World.add(world, this.estilingue);
  }

  voar() {
    this.estilingue.bodyA = null;
  }

  ligar() {
    this.estilingue.bodyA = this.bodyA;
  }

  display() {
    image(this.imagem1, 250, height/2 - 280);
    image(this.imagem2, 220, height/2 - 280);
    
    if (this.estilingue.bodyA) {
      var pointA = this.estilingue.bodyA.position;
      var pointB = this.pointB;
      
      push();
      stroke(48, 22, 8);
      
      
      pop();
    }
  }
}
