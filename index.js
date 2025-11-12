let btnOne = document.getElementById('one');
let selectDiv = document.getElementById('select');
let selectdif = document.getElementById("selectdif"); //level
let btnTwo = document.getElementById('two');
let btnPlay = document.querySelectorAll(".MyButton");//list of buttons val 
let textPlay = document.getElementById("textPlay");
let massage = document.getElementById("container4");
let WhoWiner = document.getElementById("WhoWiner");
let newGameBtn = document.getElementById("newGameBtn");
let resetBtnn = document.getElementById('resetBtn');
let levelh = document.getElementById('hard');
let levele = document.getElementById('easy');
let levelm = document.getElementById('meduim');
let depth_level = 0;
let flagX = true;
let flagpalyer;
let counter = 0;
let f;
let winIndex = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
/********************************************************************************************** */
var XOarr = new Array();
var choice;
/********************************************************************************************** */
//when click to one player button
btnOne.addEventListener('click', () => {
  selectDiv.style.display = 'none';
  selectdif.style.display = "block";
  flagX = true;//to start game with x
  BtnEnable();
  textPlay.innerHTML = "Player X's turn";

});
//when click to two player button
btnTwo.addEventListener('click', () => {
  flagpalyer = true;
  selectDiv.style.display = 'none';
  selectdif.style.display = 'none';
  massage.style.display = 'none';
  flagX = true;//to start game with x
  BtnEnable();
  textPlay.innerHTML = "Player X's turn";


});
//click on hard game
levelh.addEventListener("click", () => {
  // onetwoplayer=1;
  flagpalyer = false;
  depth_level = 10;
  selectDiv.style.display = 'none';
  selectdif.style.display = 'none';
  massage.style.display = 'none';
  flagX = true;//to start game with x
  BtnEnable();
  textPlay.innerHTML = "Player X's turn";
  //play1();

});
//click on meduim game
levelm.addEventListener("click", () => {
  // onetwoplayer=1;
  flagpalyer = false;
  depth_level = 5;
  selectDiv.style.display = 'none';
  selectdif.style.display = 'none';
  massage.style.display = 'none';
  flagX = true;//to start game with x
  BtnEnable();
  textPlay.innerHTML = "Player X's turn";
  //play1();

});
//click on easy game
levele.addEventListener("click", () => {
  // onetwoplayer=1;
  flagpalyer = false;
  depth_level = 2;
  selectDiv.style.display = 'none';
  selectdif.style.display = 'none';
  massage.style.display = 'none';
  flagX = true;//to start game with x
  BtnEnable();
  textPlay.innerHTML = "Player X's turn";
  //play1();

});
//when click to new game player
newGameBtn.addEventListener("click", () => {
  counter = 0;
  flagX = true;//to start game with x
  massage.style.display = "none";
  selectDiv.style.display = 'block';
  selectdif.style.display = 'none';

});


//when click to reset button
resetBtnn.addEventListener("click", () => {
  counter = 0;
  BtnEnable();
  flagX = true;//to start game with x
  textPlay.innerHTML = "Player X's turn";
  massage.style.display = "none";
  selectDiv.style.display = 'none';
  selectdif.style.display = 'none';
});

//deside the winner
const winerFun = (winer) => {

  if (winer == "X") {
    WhoWiner.innerHTML = "&#11088;&#11088;&#11088; <br>X win";
  } else {
    WhoWiner.innerHTML = "&#11088;&#11088;&#11088; <br> O win ";
  }
  massage.style.display = "block";
  selectDiv.style.display = 'none';
  selectdif.style.display = 'none';

};


const BtnEnable = () => {
  let c = 0;
  Xflag = true; //always start with X
  btnPlay.forEach((e) => {
    e.innerText = "";
    e.disabled = false;
    XOarr[c++] = '';
  });
  massage.style.display = "none";
  textPlay.innerHTML = "Player X's turn";
}

const CheckTheWinner = () => {
  for (let i of winIndex) {
    let[i0,i1,i2]=[i[0],i[1],i[2]];
    let [e1, e2, e3] = [btnPlay[i0].innerText, btnPlay[i1].innerText, btnPlay[i2].innerText,];
    if (e1 != "" && (e2 != "") & (e3 != "")) {
      if (e1 == e2 && e2 == e3) {
        winerFun(e1);
      }
    }
  }
  // textPlay.innerHTML="Player X's turn";
};

const noOneWin = () => {
  textPlay.innerHTML = "NO Winner!";

}
btnPlay.forEach((e) => {
  e.addEventListener("click", () => {
    if (flagpalyer) { //if two player
      if (e.innerText == "") {
        counter += 1;
      }
      if (flagX) {
        e.style.color = '#012E40';
        e.innerText = "X";
        e.disabled = true;
        flagX = false;
        textPlay.innerHTML = "Player O's turn";
      } else {
        e.innerText = "O";
        e.disabled = true;
        flagX = true;
        e.style.color = '#F2668B';
        textPlay.innerHTML = "Player X's turn";
      }


      if (counter == 9) {
        noOneWin();
      }
      CheckTheWinner();
    }

    else { //if one player ***************************************************************************************************************************************************
      // NewGame(); 

      //console.log(e.id);
      //MakeMove(e.id);
      if (!GameOver(XOarr) && XOarr[e.id] == '') {
        //first x play (you)
        XOarr[e.id] = 'X';
        document.getElementById(e.id).style.color = '#012E40';//#012E40
        document.getElementById(e.id).innerText = "X";
        document.getElementById(e.id).disabled = true;
        // then computer play if the game doesn't finish
        if (!GameOver(XOarr)) {
          flagX = false;
          textPlay.innerHTML = "Player O's turn";
          //playcomputer();
           console.log(depth_level);
            const [move,x]=alphaBetaMinimax(XOarr, depth_level, -Infinity, +Infinity, false);
          //  console.log("hard= "+move);
            XOarr[move] = 'O';
  
            document.getElementById(move).style.color = '#F2668B';
            document.getElementById(move).innerText = "O";
            document.getElementById(move).disabled = true;
            choice = [];
            flagX = true;
            if (!GameOver(XOarr)) {
              textPlay.innerHTML = "Player X's turn";
            }
        }
      }
    }
  });
});
//********************************************---------------------------------------------****************---------------------------------------------------************************************************************************************************


function alphaBetaMinimax(node, depth, alpha, beta,player) {
    if (depth == 0 || (whowinner(node) == 1) || (whowinner(node) == 2) || (whowinner(node) == 3) ) {
     // console.log(CheckForWinner(node));
      if (whowinner(node) == 1) return [null,0]; // no one is winner
      else if (whowinner(node) == 2) return [null,depth]; // if X win
      else if (whowinner(node) == 3) return [null,-1*depth]; //if O win
      
    }
  let bestMove = null;
  let bestValue = player ? -Infinity : Infinity;
  let newAlpha = alpha;
  let newBeta = beta;
    const possibleMoves = xoArr_avail(node); //get available moves
    for (let i = 0; i < possibleMoves.length; i++) {
      const move = possibleMoves[i];
      const newState = get_new_node(move, node);
      const [_, value] = alphaBetaMinimax(newState, depth - 1, newAlpha, newBeta, !player);
      node = diasblemove(node, move);
      if (player){
      if ( value > bestValue) {
        bestValue = value;
        bestMove = move;
        newAlpha = Math.max(newAlpha, value);
      } }
      else if (!player){
        if(value < bestValue) {
        bestValue = value;
        bestMove = move;
        newBeta = Math.min(newBeta, value);
      }
    }
      
      if (newAlpha >= newBeta) {
        break;
      }
    }
  
    return [bestMove, bestValue];
      }

function diasblemove(game, move) {
  game[move] = '';
  if (flagX == false) {
    flagX = true;
  } else {
    flagX = false;
  }
  return game;
}

function get_new_node(move, game) {
  var piece;
  if (flagX == false) {
    piece = 'O';
    flagX = true;
  } else {
    piece = 'X';
    flagX = false;
  }
  game[move] = piece;
  return game;
}


function xoArr_avail(xo) {
  var possibleMoves = [];
  for (var i = 0; i < 9; i++) {
    if (xo[i] === '')
      possibleMoves.push(i);
  }
  return possibleMoves;
}
function whowinner(grid) {
    for (let i of winIndex) {
      let[i0,i1,i2]=[i[0],i[1],i[2]];
      let [e1, e2, e3] = [grid[i0], grid[i1], grid[i2]];
      if (e1 != "" && (e2 != "") & (e3 != "")) {
        if (e1 == e2 && e2 == e3) {
          if(e1=='X'){
            return 2;
          }
          else if(e1=='O'){
            return 3;
          }
        }
      }
    }
  // Check if no one win
  for (i = 0; i < 9; i++) {
    if (grid[i] != 'X' && grid[i] != 'O')
      return 0;
  }
  return 1;
}

function GameOver(xo) {
  if (whowinner(xo) == 0) {
    return false;
  }
  else if (whowinner(xo) == 1) {
    textPlay.innerHTML = "NO Winner!";
  }
  else if (whowinner(xo) == 2) {
    WhoWiner.innerHTML = "&#11088;&#11088;&#11088; <br>X win";
    massage.style.display = "block";
    selectDiv.style.display = 'none';
    selectdif.style.display = 'none';
  }
  else {
    WhoWiner.innerHTML = "&#11088;&#11088;&#11088; <br> O win ";
    massage.style.display = "block";
    selectDiv.style.display = 'none';
    selectdif.style.display = 'none';
  }
  return true;


}



