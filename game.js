var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level = 0;
var start = false;

//press any key to start the game
$(document).keypress(function(event){
  if(!start){
  $("h1").html("Level"+" "+level);
  nextSequence();
  start=true;
}
})


// click the button
$( ".btn" ).click(function() {
var userChosenColour = $(this).attr("id");
  $("#"+userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(userChosenColour);
animatePress(userChosenColour);
userClickedPattern.push(userChosenColour);
checkAnswer(userClickedPattern.length-1);

});

//check if the pressed button is in the array ->gamePattern[]
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){

    //this determines the start of next level
    if(gamePattern.length==userClickedPattern.length){
      setTimeout(function(){
        nextSequence()
      },1000);
    }
  }
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// reset attributes to start the game again
function startOver(){
  level =0;
  gamePattern=[];
  start = false;
}
//to press random button
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").html("Level"+" "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomChosenColour);
 animatePress(randomChosenColour);
 }

//audio when button pressed
function playSound(name){
   var audio = new Audio( "sounds/"+name+".mp3");
   audio.play();
 }
//animation when button pressed
 function animatePress(currentColour){
   $("."+currentColour).addClass("pressed");
   setTimeout(function(){
  $("."+currentColour).removeClass("pressed");
},100);
}
