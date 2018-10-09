var currentPlayer = 1;
var firstPlayer = 1;
var oppositePlayer = 0;
var done = false;
var winner;
var moonScore = 0;
var sunScore = 0;
var sunScoreHalf = 0;
var moonScoreHalf = 0;
var boardTiles = 0;
var playerSelect = false;

var grid = new Array(3);
grid[0] = new Array(3);
grid[1] = new Array(3);
grid[2] = new Array(3);

//give each box a value
for (var i=0; i<=2; i++) {
  for (var j=0; j<=2; j++) {
    grid[i][j] = Math.random()*-1;
  }
}
//HAVE FUNCTION AT BEGINNING CHANGING CURRENTPLAYER

function pickIcon(n) {
  if (playerSelect === false) {
    if (n === 1) {
      currentPlayer = 1;
      firstPlayer = 1;
      console.log(currentPlayer);
      playerSelect = true;
      document.getElementById("selectIcon").innerHTML = "Player 1 is Sun <br> Player 2 is Moon";
    }
    else if (n === 2) {
      currentPlayer = 2;
      firstPlayer = 2;
      console.log(currentPlayer);
      playerSelect = true;
      document.getElementById("selectIcon").innerHTML = "Player 1 is Moon <br> Player 2 is Sun";
    }
  }
  else {
    alert("You have already chosen an icon!");
  }
}

function clickBox(x,y) {
  if (playerSelect === true) {
    if (done === false) {
      if (grid[x][y]>0) {
        alert("Spot is already clicked");
      }
     // Clicking Of Boxes
      else {
        if (currentPlayer == 1) {
          document.getElementById(""+x+y).src="./sun.png";
          grid[x][y] = 1;
          currentPlayer = 2;
          oppositePlayer = 1;
          document.getElementById("winnerAnnounce").innerHTML = "Moon Player (Player " + oppositePlayer + ")'s move.";
        }
        else {
          document.getElementById(""+x+y).src="./moon.png";
          grid[x][y] = 2;
          currentPlayer= 1 ;
          oppositePlayer = 2;
          document.getElementById("winnerAnnounce").innerHTML = "Sun Player (Player " + oppositePlayer + ")'s move.";
        }
        winnerDetected();
      }
      if (winnerDetected()) {
        done = true;
      }
      for (var i=0; i<=2; i++) {
        for (var j=0; j<=2; j++) {
          if (grid[i][j] > 0) {
            boardTiles += 1;
          }
        }
      }
      console.log(boardTiles);
      if (boardTiles === 9) {
        done = true;
        document.getElementById("winnerAnnounce").innerHTML = "Draw. Please restart to play again.";
      }
      boardTiles = 0;
    }
    else {
      alert("Game has already been won! Please restart to play again.");
    }
  }
  else {
    alert("Player 1 has to choose their icon at the bottom of the screen.");
  }
}

function winnerDetected() {
  for (var i = 0; i <= 2; i++) {
    if (grid[0][i] === grid[1][i] && grid[0][i] === grid[2][i]) {
      winner = grid[0][i];
      declareWinner(winner);
      return true;
    }
  }
  for (var i = 0; i <= 2; i++) {
    if (grid[i][0] === grid[i][1] && grid[i][0] === grid[i][2]) {
      winner = grid[i][0];
      declareWinner(winner);
      return true;
    }
  }
  if (grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
    winner = grid[0][0];
    declareWinner(winner);
    return true;
  }
  if (grid[2][0] === grid[1][1] && grid[2][0] === grid[0][2]) {
    winner = grid[2][0];
    declareWinner(winner);
    return true;
  }
  return false;
}

function declareWinner(winner) {
  if (winner === 1) {
    document.getElementById("winnerAnnounce").innerHTML = "Sun Player has won a point! Restart to play again!";
    sunScore += 1;
    document.getElementById("sunScorekeep").innerHTML = sunScore/2;
  }
  if (winner === 2) {
    document.getElementById("winnerAnnounce").innerHTML = "Moon Player has won a point! Restart to play again!";
    moonScore += 1;
    document.getElementById("moonScorekeep").innerHTML = moonScore/2;
  }
  gameWinner();
}

function gameWinner() {
  if (sunScore/2 + 2 === moonScore/2) {
    document.getElementById("moonScorekeep").innerHTML = moonScore/2;
    window.location.replace("./moonWin.html");
  }
  else if (moonScore/2 + 2 === sunScore/2) {
    document.getElementById("sunScorekeep").innerHTML = sunScore/2;
    window.location.replace("./sunWin.html");
  }
}
// Reset Game
function reset() {
  for (var i=0; i<=2; i++) {
    for (var j=0; j<=2; j++) {
      grid[i][j]= Math.random()*-1;
      document.getElementById(""+i+j).src="./blank.png";
    }
  }
  currentPlayer = firstPlayer;
  done = false;
  if (currentPlayer === 1) {
    document.getElementById("winnerAnnounce").innerHTML = "Game Reset! Sun Player's move.";
  }
  else {
    document.getElementById("winnerAnnounce").innerHTML = "Game Reset! Moon Player's move.";
  }
}

function resetScore() {
  done = false;
  moonScore = 0;
  sunScore = 0;
}
