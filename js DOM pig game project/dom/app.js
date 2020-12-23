/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// document.querySelector("#current-0").textContent = dice;

// document.querySelector("#current-1").innerHTML = '<em>' + dice + '</em>';
var roundScore, dice, activePlayer, scores, gamePlayer, dicePrevious, winner;

init();
var dicePrevious;

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlayer) {
    dice = Math.floor(Math.random() * 6) + 1;

    var x = document.querySelector(".dice");

    x.style.display = "block";

    x.src = "dice-" + dice + ".png";

    if (dice === 6 && dicePrevious === 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
    dicePrevious = dice;

  }


});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlayer) {
    scores[activePlayer] += roundScore;

    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    // console.log(input);
    if (input) {
      winner = input;
    } else {
      winner = 100;
    }

    if (scores[activePlayer] >= winner) {
      document.querySelector("#name-" + activePlayer).textContent = "winner!🥳";
      document.querySelector(".dice").style.display = "none";

      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");

      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");

      gamePlayer = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // document.querySelector(".player-0-panel").classList.add("active");
  // document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlayer = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "player 1";
  document.getElementById("name-1").textContent = "player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}