var toppings = [];
var stack = [];
var player;
var score;
var toppingWidth;
var toppingChance;

function setup() {

  createCanvas(300, 600);
	score = 0;
	toppingWidth = 100;
	toppingChance = 0.5;

  player = new Topping(width / 2, height - 15, toppingWidth, color("#FFFFFF"));
  stack.push(player);
  player.stacked = true;
}

function draw() {

  background(51);
  handleKeys();
  handleToppings();
	handleStack();
	handleDifficulty(frameCount, score);
  attemptNewTopping(frameCount);
  drawScore();
}

function handleKeys() {

	if (keyIsDown(LEFT_ARROW)) {
		player.move(createVector(-5, 0));
	}

	if (keyIsDown(RIGHT_ARROW)) {
		player.move(createVector(5, 0));
	}

}

function handleDifficulty(frame, score) {

	if (frame % 30 === 0) {

		toppingWidth = map(score, 0, 500, 100, 10);
		toppingChance = map(score, 0, 500, 0.9, 0.999);
	}

}

function handleStack() {

	for (var i = stack.length - 1; i >= 0; i--) {

    stack[i].update();

    if (stack[i - 1] != null)
      stack[i].moveTo(stack[i - 1].position);

    if (stack.length - 1 > score && stack.length > 15) {

      stack[i].move(createVector(0, +12));
    }

  }

	for (var i = 0; i < stack.length; i++) {

		stack[i].draw();
	}

  if (stack.length - 1 > score) {
    score++;
  }
}

function handleToppings() {

	for (var i = 0; i < toppings.length; i++) {

    toppings[i].update();
    toppings[i].draw();

    if (toppings[i].position.y > height)
    	endGame();

    if (toppings[i].stacksWith(stack[stack.length - 1])) {

      toppings[i].stacked = true;
      stack.push(toppings[i]);
      toppings.splice(i, 1);
    }

  }
}

function attemptNewTopping(frame) {

	if (frame % 90 === 0) {
		if (random() < toppingChance) {

			toppings.push(new Topping(random(width), 0, toppingWidth, rCol()));
		}
	}
}

function drawScore() {

	textSize(50);
  text(score, 10, 70);
}

function endGame() {

  textAlign(CENTER);
  fill(255);
  text("Game Over!", width / 2, height / 2);
  textAlign(LEFT);
  noLoop();
}

function rCol() {

  return color(random(255), random(255), random(255));
}
