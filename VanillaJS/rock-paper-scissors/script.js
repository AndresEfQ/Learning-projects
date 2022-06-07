function init() {
  let optionImages = document.querySelector('.container');
  optionImages.addEventListener('click', controller.handlePlayerSelection);
  let goButton = document.querySelector('.header button');
  goButton.addEventListener('click', controller.setRound);
}

window.onload = init;

// handles the data
let model = {
  playerScore: 0,
  computerScore: 0,
  score: '',
  message: '',
  gameEnd: false,
  
  roundResult: {
    rockScissors: ["You win! rock smashes scissors", '1'],
    rockPaper: ["You loose! paper covers rock", '-1'],
    paperRock: ["You win! paper covers rock", '1'],
    paperScissors: ["You loose! scissors cuts paper", '-1'],
    scissorsRock: ["You loose! rock smashes scissors", '-1'],
    scissorsPaper: ["You win! scissors cuts paper", '1']
  },
  
  updateScore: function(selection) {
    if (!this.roundResult[selection]) {
      model.score = `${model.playerScore} - ${model.computerScore}`;
      return;
    } else if (this.roundResult[selection][1] === '1') {
      this.playerScore++;
    } else if (this.roundResult[selection][1] === '-1') {
      this.computerScore++;
    }
    model.score = `${model.playerScore} - ${model.computerScore}`;
  },

  chooseMessage: function(score, selection) {
    let message = '';
    switch (score) {
      case '1 - 0':
        message = 'You started with the right foot, good job!';
        break;
      case '0 - 1':
        message = 'It\'s only one point, it doesn\'t matter';
        break;
      case '0 - 0':
      case '1 - 1':
      case '2 - 2':
      case '3 - 3':
        message = 'You\'re tied, keep going, you can make it';
        break;
      case '4 - 4':
        message = 'Such a close game, next point wins the game';
        break;
      case '2 - 0':
        message = 'You\'re good at this game, keep it up';
        break;
      case '3 - 0':
        message = 'You\'re really good, keep going';
        break;
      case '4 - 0':
        message = 'Wow! you\'re so close to the perfect game';
        break;
      case '5 - 0':
        message = 'PERFECT! You\'re a legend';
        break;
      case '0 - 2':
        message = 'Just a bad strike, no worries';
        break;
      case '0 - 3':
        message = 'Ok, you must step up your game';
        break;
      case '0 - 4':
        message = 'No way, you should at least get one point';
        break;
      case '0 - 5':
        message = 'OMG!, the machine did a perfect game :(';
        break;
      case '5 - 1':
      case '5 - 2':
      case '5 - 3':
      case '5 - 4':
        message = 'That\'s game, congratulations';
        break;
      case '1 - 5':
      case '2 - 5':
      case '3 - 5':
      case '4 - 5':
        message = 'That\'s game, so sorry...';
        break;
      default:
        if (model.roundResult[selection][1] === '1') {
          message = 'Good Job, keep going';
        } else {
          message = 'Next round will be better';
        }
    }
    return message;
  },
  
  checkGameEnd: function() {
    if (model.playerScore === 5 || model.computerScore === 5) {
      model.gameEnd = true;
    }
  },
  
  restartGame: function() {
    let button = document.querySelector('.setRound');
    let instruction = document.querySelector('.instruction');
    button.textContent = `New \r\nGame`;
    model.playerScore = 0;
    model.computerScore = 0;
    model.gameEnd = false;
    instruction.textContent = 'Do you want to play a new game?'
  }
};

// updates the ui
let view = {
  scorePara: document.getElementById('score'),
  container: document.querySelector('.container'),
  
  showModal: function() {
    let optionImages = document.querySelector('.container');
    modal = document.createElement('p');
    modal.className = 'modal';
    modal.innerHTML = '<span>Rock</span><span>Paper</span><span>Scissors</span><span>Shoot!</span>';
    optionImages.appendChild(modal);
    modal.addEventListener('animationend', (e) => {
      if (e.target.nodeName === 'P') {
        modal.classList.add('hidden');
        view.allowClick()
      }
    });
  },
  
  showPlayerSelection: function(playerSelection) {
    document.querySelector(`.${playerSelection}`).parentNode.classList.add('player-selected');
  },

  hidePlayerSelection: function(playerSelection) {
    document.querySelector(`.${playerSelection}`).parentNode.classList.remove('player-selected');
  },

  showComputerSelection: function(computerSelection) {
    let img = document.querySelector(`.${computerSelection.toLowerCase()}`);
    let robotDiv = document.createElement('div');
    let robotImg = document.createElement('img');
    robotImg.src = './images/robot.png'
    robotDiv.className = 'computer-selected';
    robotDiv.appendChild(robotImg);
    img.parentNode.appendChild(robotDiv);
    img.classList.add('blurred');
  },

  hideComputerSelection: function(computerSelection) {
    let img = document.querySelector(`.${computerSelection.toLowerCase()}`);
    let robotDiv = document.querySelector('.blurred').nextSibling;
    img.parentNode.removeChild(robotDiv);
    img.classList.remove('blurred');
  },

  showRoundResult: function(roundResult) {
    let messageNode = this.scorePara.firstChild;
    let roundResultText = document.createTextNode(roundResult);

    if (messageNode) {
      this.scorePara.insertBefore(roundResultText, messageNode);
    } else {
      this.scorePara.appendChild(roundResultText);
    }
  },

  hideRoundResult: function() {
    let roundResultText = this.scorePara.firstChild;

    this.scorePara.removeChild(roundResultText);
  },

  showMessage: function(score, message) {
    let previousMessage = this.scorePara.childNodes[1];
    let messageText = document.createTextNode(`\r\n ${score} ${message}`);

    if (previousMessage) {
      this.scorePara.replaceChild(messageText, previousMessage);
    } else {
      this.scorePara.appendChild(messageText);
    }
  },  

  allowClick: function() {
    view.container.style.pointerEvents = 'auto';
  },

  disableClick: function() {
    view.container.style.pointerEvents = 'none';
  }
};

// handles the logic
let controller = {
  playerSelection: undefined,
  computerSelection: undefined,

  setRound: function(e) {
    // hide the selections and result from the previous round
    let instruction = document.querySelector('.instruction');
    if (controller.playerSelection) {
      view.hidePlayerSelection(controller.playerSelection);
      view.hideComputerSelection(controller.computerSelection);
      view.hideRoundResult();
      controller.playerSelection = undefined;
      controller.computerSelection = undefined;
    }
    instruction.textContent = 'First one to make 5 points wins'
    view.showModal();
  },

  playRound: function(playerSelection, computerSelection) {
    let selection = playerSelection + computerSelection;
    view.disableClick();

    if (playerSelection === computerSelection.toLowerCase()) {
      view.showRoundResult('It\s a tie!, no one wins');
    } else {
      view.showRoundResult(model.roundResult[selection][0]);
    }
    
    model.updateScore(selection);
    console.log(model.gameEnd);
    view.showMessage(model.score, model.chooseMessage(model.score, selection));
    model.checkGameEnd();
    if (model.gameEnd === true) {
      model.restartGame();
    }
  },

  getComputerSelection: function() {
    let choices = ['Rock', 'Paper', 'Scissors'];
    return choices[Math.floor(Math.random() * 3)];
  },

  handlePlayerSelection: function(e) {
    if (e.target.nodeName === 'IMG') {
      let button = document.querySelector('.setRound');
      controller.playerSelection = e.target.alt;
      controller.computerSelection = controller.getComputerSelection();
      view.showPlayerSelection(controller.playerSelection);
      view.showComputerSelection(controller.computerSelection);
      button.textContent = 'Next\n\rRound';
      controller.playRound(controller.playerSelection, controller.computerSelection);
    }
  },
};

