var player = "X", computer = "O", gameInProgress = 0;
var board = [["","",""],["","",""],["","",""]];

$(document).ready(function() {
  $("#button-reset").hide();
  $("#button-X").hide();
  $("#button-O").hide();
  
  $("#button-start").click(function() {
    $("#button-start").hide();
    $("#button-X").show();
    $("#button-O").show();
    $("#end-text").html("Pick X or O");
  });
  
  $("#button-X").click(function() {
    player = "X";
    computer = "O";
    startGame();
  });
  $("#button-O").click(function() {
    player = "O";
    computer = "X";
    startGame();
  });
  
  $("#button-reset").click(function() {
    killGame();
    gameInProgress = 0;
    $("#end-text").html("Pick X or O");
    $("#button-reset").hide();
    $("#button-X").show();
    $("#button-O").show();
  });
  
  $("td").click(function() {
    // check game is in progress and it's human's turn
    if (gameInProgress === 1) {
      
      // read which square was clicked
      //console.log(this.id+" clicked");
      
      // block clicks on occupied squares
      if (board[this.id[4]][this.id[5]]) {
        //console.log("square is occupied");
      } else {
        //console.log("square is free");
        board[this.id[4]][this.id[5]] = player;

        // check for human win
        if (!checkWin(player)) {
          setTimeout(function() {
            compMove();
          }, 300);
        }
      }
    } else {
      //console.log("game is not in progress");
    }
  });
});

function startGame() {
  gameInProgress = 1;
  $("#end-text").html("");
  $("#button-X").hide();
  $("#button-O").hide();
  $("#button-reset").show();
  
  // computer makes the first move; random corner or center
  var initSeed = Math.random();
  if (initSeed <= 0.2) {
    board[0][0] = computer;
  } else if (initSeed <= 0.4) {
    board[2][0] = computer;
  } else if (initSeed <= 0.6) {
    board[0][2] = computer;
  } else if (initSeed <= 0.8) {
    board[2][2] = computer;
  } else {
    board[1][1] = computer;
  }
  writeGame();
  
  // wait for human input
}

function killGame() {
  //console.log("start over");
  board = [["","",""],["","",""],["","",""]];
  writeGame();
}

function writeGame() {
  $("#slot00").html(board[0][0]);
  $("#slot10").html(board[1][0]);
  $("#slot20").html(board[2][0]);
  $("#slot01").html(board[0][1]);
  $("#slot11").html(board[1][1]);
  $("#slot21").html(board[2][1]);
  $("#slot02").html(board[0][2]);
  $("#slot12").html(board[1][2]);
  $("#slot22").html(board[2][2]);
}

function compMove() {
  // computer's turn immediately after human

  // check for two in a row
  var lineCheck = [];
  var lineString = "";
  for (var i=0; i<=2; i++) {
    for (var j=0; j<=2; j++) {lineCheck.push(board[i][j]);}
    lineString = lineCheck.reduce(function(a,b) {return a + b;});
    if ((lineString === "XX" || 
        lineString === "OO") && 
        lineString.length === 2) {
      if (board[i][0] === "") board[i][0] = computer;
      if (board[i][1] === "") board[i][1] = computer;
      if (board[i][2] === "") board[i][2] = computer;
      return checkWin(computer);
      console.log("row found");
      break;;
    }
    lineCheck = [], lineString = "";
  }
  
  // check for two in a column
  for (j=0; j<=2; j++) {
    for (i=0; i<=2; i++) {lineCheck.push(board[i][j]);}
    lineString = lineCheck.reduce(function(a,b) {return a + b;});
    if ((lineString === "XX" || 
         lineString === "OO") && 
         lineString.length === 2) {
      if (board[0][j] === "") board[0][j] = computer;
      if (board[1][j] === "") board[1][j] = computer;
      if (board[2][j] === "") board[2][j] = computer;
      return checkWin(computer);
      console.log("row found");
      break;
    }
    lineCheck = [], lineString = "";
  }
  
  // check for diagonals
  lineCheck.push(board[0][0], board[1][1], board[2][2]);
  lineString = lineCheck.reduce(function(a,b) {return a + b;});
  if ((lineString === "XX" || 
       lineString === "OO") && 
       lineString.length === 2) {
    if(board[0][0] === "") board[0][0] = computer;
    if(board[1][1] === "") board[1][1] = computer;
    if(board[2][2] === "") board[2][2] = computer;
    return checkWin(computer);
    console.log("row found");
    }
  lineCheck = [], lineString = "";
  lineCheck.push(board[0][2], board[1][1], board[2][0]);
  lineString = lineCheck.reduce(function(a,b) {return a + b;});
  if ((lineString === "XX" || 
       lineString === "OO") && 
       lineString.length === 2) {
    if(board[0][2] === "") board[0][2] = computer;
    if(board[1][1] === "") board[1][1] = computer;
    if(board[2][0] === "") board[2][0] = computer;
    return checkWin(computer);
    console.log("row found");
    }

  // make random move in empty square
  var randSeed, i=0;
  while (true) {
    randSeed = Math.floor(Math.random()*9);
    if (board[Math.floor(randSeed/3)][randSeed%3] === "") {break;}
    // emergency loop break
    if (i > 100) {break;}
    i++;
  }
  board[Math.floor(randSeed/3)][randSeed%3] = computer;
  checkWin(computer);
}

function checkWin(winner) {
  writeGame();
  // check for win of passed player
  if ((board[0][0] === board[0][1] && 
       board[0][0] === board[0][2] && 
       board[0][0] === winner) ||
      (board[0][0] === board[1][0] && 
       board[0][0] === board[2][0] && 
       board[0][0] === winner) || 
      (board[0][0] === board[1][1] && 
       board[0][0] === board[2][2] && 
       board[0][0] === winner) || 
      (board[0][2] === board[1][2] && 
       board[0][2] === board[2][2] && 
       board[0][2] === winner) || 
      (board[0][2] === board[1][1] && 
       board[0][2] === board[2][0] && 
       board[0][2] === winner) || 
      (board[0][1] === board[1][1] && 
       board[0][1] === board[2][1] && 
       board[0][1] === winner) || 
      (board[1][0] === board[1][1] && 
       board[1][0] === board[1][2] && 
       board[1][0] === winner) || 
      (board[2][0] === board[2][1] && 
       board[2][0] === board[2][2] && 
       board[2][0] === winner)) {
    $("#end-text").html(winner + " wins!");
    $("#button-reset").hide();
    gameInProgress = 0;
    setTimeout(function() {
      $("#button-reset").click();
    }, 2000);
    return true;
  } else if (board[0][0] !== "" && board[0][1] !== "" && board[0][2] !== "" && 
             board[1][0] !== "" && board[1][1] !== "" && board[1][2] !== "" && 
             board[2][0] !== "" && board[2][1] !== "" && board[2][2] !== "") {
    // check for full board
    $("#end-text").html("Draw!");
    $("#button-reset").hide();
    gameInProgress = 0;
    setTimeout(function() {
      $("#button-reset").click();
    }, 2000);
  } else {
    return false;
  }
}

/* resources
http://stackoverflow.com/questions/125557/what-algorithm-for-a-tic-tac-toe-game-can-i-use-to-determine-the-best-move-for

For a more advanced AI to try later:
http://mostafa-samir.github.io/Tic-Tac-Toe-AI/

https://github.com/Mostafa-Samir/Tic-Tac-Toe-AI
*/