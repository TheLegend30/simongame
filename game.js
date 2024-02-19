const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

const nextSequence = function () {
  level++;
  userClickedPattern = [];

  $("h1").text("Level " + level);

  let randomChosenNumber = Math.floor(Math.random() * 3);
  gamePattern.push(randomChosenNumber);

  $("." + buttonColours[randomChosenNumber])
    .fadeOut(100)
    .fadeIn(100);

  playSound(buttonColours[randomChosenNumber]);
};

const checkAnswer = function () {
  let currentLevel = userClickedPattern.length - 1;

  return (
    userClickedPattern[currentLevel] ===
    buttonColours[gamePattern[currentLevel]]
  );
};

const playSound = function (name) {
  const sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
};

const animatePress = function (currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(() => {
    $("." + currentColour).removeClass("pressed");
  }, 100);
};

const gameOver = function () {
  $("h1").text("Game Over, Press Any Key to Restart");
  new Audio("./sounds/wrong.mp3").play();

  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 50);
  level = 0;
  gamePattern = [];
};

$(".btn").click((e) => {
  let userChosenColour = e.target.id;
  animatePress(e.target.id);
  playSound(e.target.id);
  userClickedPattern.push(userChosenColour);
  if (checkAnswer()) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
});

$(document).keydown(() => {
  if (level === 0) {
    nextSequence();
  }
});
