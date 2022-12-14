let mainWrapperModal = document.getElementById('main-cards-wrapper');
let startModal = document.getElementById('start-modal');
let inputModal = document.getElementById('input-modal-card');
let counterModal = document.getElementById('counter-modal-card');
let counterItem = document.getElementById('counter-item');
let btnNext1 = document.getElementById('next-btn-1');
let btnNext2 = document.getElementById('next-btn-2');
let playerValueName = document.getElementById('input-item').value;

//Start game:
let gameModalWrapper = document.getElementById('game-modal-wrapper');
let gameModalTop = document.getElementById('game-modal-top');
// let printPlayerName = document.getElementById('player-name');
let printRandomTextColor = document.getElementById('print-random-color');
let generateColorBtn = document.getElementById('generate-color-btn');
let btnNewName = document.getElementById('btn-new-name-id');
let newNameInput = document.getElementById('new-name-input-id').value

//Pop-up with 2 buttons
let popUpModal = document.getElementById('popup-colors-btn');
let hexaBtn = document.getElementById('hexa-btn');
let rgbBtn = document.getElementById('rgb-btn');

//game middle
let gameModalMiddle = document.getElementById('game-modal-middle');
let colorSquare0 = document.getElementById('0')
let colorSquare1 = document.getElementById('1')
let colorSquare2 = document.getElementById('2')
let colorSquare3 = document.getElementById('3')
let colorSquare4 = document.getElementById('4')
let colorSquare5 = document.getElementById('5')
let colorSquare = document.querySelectorAll('.color-square');

//game bottom
let gameModalBottom = document.getElementById('game-modal-bottom');
let tableThScore = document.querySelectorAll('.th-score');
let tableThName = document.querySelectorAll('.th-name');
let gameOverText = document.getElementById('game-over');
let newGameBtn = document.getElementById('btn-new-game');


let score = 0; 
let currentGame = 1;
let colorArray = [];
// let index = -1;
let scoreArr = [];
let nameArr = [];
let playerName = " ";

nextModal = (currentModal, nextModal,) => {
  currentModal.style.display = 'none';
  nextModal.style.display = 'flex';
};

btnNext1.addEventListener('click', () => {
  nextModal(startModal, inputModal);
})

btnNext2.addEventListener('click', () => {
  nextModal(inputModal, gameModalWrapper);
})

//Modal input name value:
btnNext2.addEventListener('click', () => {
  playerValueName = document.getElementById('input-item').value;
  playerName = playerValueName
});

btnNewName.addEventListener('click', () => {
  newNameInput = document.getElementById('new-name-input-id').value;
  playerName = newNameInput
});


showColorSquares = () => {
  gameModalMiddle.style.display = 'grid';
}

showPopUp = () => {
  popUpModal.style.display = 'none';
  popUpModal.style.display = 'block'
}

closePopUp = () => {
  popUpModal.style.display = 'none'
}

generateColorBtn.addEventListener('click', () => {
  showPopUp()
})


// HEXA BTN

hexaBtn.addEventListener('click', () => {
  printRandomHexaColor();
  showColorSquares();
  closePopUp();
  resetGame();
  enableCards()
  updateThScoreHtml(scoreArr)
  updateThNameHtml(nameArr)
})

printRandomHexaColor = () => {
  colorArray = [];

  colorSquare.forEach((hexColor) => {
    let hexCodeCard = '#' + Math.random().toString(16).substring(2, 8);
    
    hexColor.style.backgroundColor = hexCodeCard;
    // hexColor.innerHTML = hexCodeCard;

    colorArray.push(hexCodeCard);
  });
  
  textHexaColor = colorArray[Math.floor(Math.random() * 6)];
  printRandomTextColor.innerHTML = textHexaColor;

  nameArr.push(playerName);
  scoreArr.push(0);
}


//RGB BTN---------

rgbBtn.addEventListener('click', () => {
  printRandomRgbColor();
  showColorSquares();
  closePopUp();
  resetGame();
  enableCards()
  updateThScoreHtml(scoreArr)
  updateThNameHtml(nameArr)
})

printRandomRgbColor = () => {
  colorArray = [];

  colorSquare.forEach((rgbColor) => {
    let ranRgbColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    
    rgbColor.style.backgroundColor = ranRgbColor;
    // rgbColor.innerHTML = ranRgbColor

    colorArray.push(ranRgbColor);
  });

  textRgbColor = colorArray[Math.floor(Math.random() * 6)];
  printRandomTextColor.innerHTML = textRgbColor;

  nameArr.push(playerName);
  scoreArr.push(0);
}


//6 CARDS-----

getCurrentScore = () => {
  return scoreArr[scoreArr.length - 1];
}

//Is square match with text color:
colorSquare.forEach(function(matchColor) {
  
  matchColor.addEventListener('click', function(event) {
   let squareColorId = colorArray[event.target.id]
   let textColorGenerated = printRandomTextColor.innerHTML;

    if(textColorGenerated === squareColorId) {
      gameOverText.innerHTML = 'GAME OVER !';
      gameOverText.style.color = 'red';
      event.target.style.border = '5px solid red';
      scoreArr[scoreArr.length - 1] = getCurrentScore() + 1
      disabledCards()
    } else {
      event.target.style.visibility = 'hidden';
      scoreArr[scoreArr.length - 1] = getCurrentScore()  + 1

      if(getCurrentScore() === 5) {
        gameOverText.innerHTML = 'YOU WON !';
        gameOverText.style.color = 'green';
        scoreArr[scoreArr.length - 1] = getCurrentScore()  + 1
        disabledCards()
      }
    }
    updateThScoreHtml(scoreArr);
    updateThNameHtml(nameArr)
  })
})

updateThNameHtml = (namePlayer) => {
  let valueStart = namePlayer.length - 5;

  if(valueStart < 0) {
    valueStart = 0
  }

  for(let i = valueStart, j = 0; i < namePlayer.length; i++, j++) {
    tableThName[j].innerHTML = nameArr[i] 
  }
}

updateThScoreHtml = (niz) => {
  let startValue = niz.length - 5;
  
  if(startValue < 0) {
    startValue = 0
  }

  for(let i = startValue, j = 0; i < niz.length; i++, j++) {
    tableThScore[j].innerHTML = scoreArr[i]

    if(scoreArr[i] === 0) {
      tableThScore[j].style.backgroundColor = '#FFF7E9'
      tableThScore[j].style.color = '#000'
    }
    if(scoreArr[i] > 0 && scoreArr[i] <= 5 && i != (niz.length - 1)) {
      tableThScore[j].style.backgroundColor = '#FF4A4A'
      tableThScore[j].style.color = '#FFF'
    } 
    else if(scoreArr[i] > 5) {
      tableThScore[j].style.backgroundColor = '#59CE8F'
      tableThScore[j].style.color = '#FFF'
    }
  }
}

//NEW GAME - NEW SCORE COUNTER:
resetGame = () => {
  gameOverText.innerHTML = "";
  score = 0;
  colorSquare.forEach(function(showCards) {
    showCards.style.visibility = "visible";
    showCards.style.border = "none";
  })
}


disabledCards = () => {
  colorSquare.forEach(function(disableCards) {
    disableCards.style.pointerEvents = "none";
  })
}

enableCards = () => {
  colorSquare.forEach(function(enableCards) {
    enableCards.style.pointerEvents = "unset";
  })
}


//TESTT ---

// printRandomTextHexaColor = () => {
//   let symbols = '0123456789ABCDEF'
//   let color = '#';

//   for(let i = 0; i < 6; i++) {
//     color = color + symbols[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }


// hideColorSquare = () => {
//   colorSquare.forEach(function (item) {
//     item.addEventListener('click', function () {
//       item.style.visibility = "hidden"
//     });
//   })
// }


//Counter modal:
// startCounterModal = () => {
//   let counter = 0;
//   let counterArr = [3, 2, 1, 'START'];

//   let countDown = () => {
//     counterItem.innerHTML = counterArr[counter]
//     counter ++

//     if(counter > counterArr.length) {
//       clearInterval(counterIntervalId);
//       nextModal(counterModal, gameModalWrapper)
//     }
//   }
//   let counterIntervalId = setInterval(countDown, 1000);
// }

// newGameBtn.addEventListener('click', () => {
//   gameOverText.innerHTML = ""
//   score = 0;
//   colorSquare.forEach(function(showCards) {
//     showCards.style.visibility = "visible"
//     showCards.style.border = "none"
    
    
//   })
// })
