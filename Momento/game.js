var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPatterns = [];

var started = false;
var level = 0

function nextSequence() {
    level++;
    $("#title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern)
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPatterns.push(userChosenColor);
    console.log(userClickedPatterns);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkPattern()
})

function checkPattern() {
    if (gamePattern[gamePattern.length - 1] === userClickedPatterns[userClickedPatterns.length - 1]) {
        console.log("yes");
        nextSequence();
    } else {
        level = 0;
        started = false;
        gamePattern.length = 0;
        userClickedPatterns.length = 0;
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200)
        $("#title").text("Game over! Press any key to restart");
    }
}

function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3"); 
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

$(document).keydown(function (event) {
    if(!started) {
        $("#title").text("Level " + level);
        nextSequence();
        started = true
    }
});




