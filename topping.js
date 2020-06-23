function Topping(x, y, w, color) {
  this.position = createVector(x, y);
  this.color = color;
  this.width = w;
  this.height = 25;
  this.stacked = false;
}

Topping.prototype.draw = function() {

  fill(this.color);
  noStroke();
  ellipse(this.position.x, this.position.y, this.width, this.height);
};

Topping.prototype.update = function() {

  if (!this.stacked) {
    this.position.y += 5;
  }
};

Topping.prototype.stacksWith = function(top) {

  if (Math.abs(this.position.y - top.position.y) < this.height / 2) {
    return (Math.abs(this.position.x - top.position.x) < this.width / 2)
  }

  return false;
};

Topping.prototype.moveTo = function(destination) {

  this.position = createVector(destination.x, this.position.y);
};

Topping.prototype.move = function(movement) {

  this.position.add(movement);
};
