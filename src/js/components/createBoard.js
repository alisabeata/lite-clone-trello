import createCard from './createCard';
import storageApp from './storage';


const storage = storageApp();
const card = createCard();

export default function createBoard(data = {}) {
  const container = document.querySelector('.boards');
  const boardContainer = document.querySelector('.add-board');
  const form = document.querySelector('.add-board form');
  const input = document.querySelector('.add-board__input');
  const saveBtn = document.querySelector('.add-board__save');
  
  function addBoard(val) {
    if (val.length > 0) {
      const board = document.createElement('a');
      let data = storage.getData();

      board.className = 'board board_empty';
      board.setAttribute('href', '');
      board.innerHTML = `<span class="close-icon board__close">x</span><span class="board__name">${val}</span>`;

      container.appendChild(board);
      
      if (!data[val]) {
        data[val] = {};
      }
      
      storage.setData(data);

      input.value = '';
      
      board.addEventListener('click', function (event) {
        const thisBoard = this;
        const boards = document.querySelectorAll('.board');
        const dataBoard = storage.getData()[val];
        
        if (!event.target.classList.contains('board__close')) {
          event.preventDefault();
        
          if (!thisBoard.classList.contains('board_open')) {
            
            
            for (let i = 0; i < boards.length; i++) {
              boards[i].classList.remove('board_open');
            }

            thisBoard.classList.add('board_open');
            
            card.clearContainer();
            
            for (let cardTitle in dataBoard) {
              card.create(cardTitle, dataBoard[cardTitle]);
            }
            
            card.create();

            thisBoard.classList.remove('board_empty');
          }
        }
      });
    }
  }
  
  saveBtn.addEventListener('click', () => {
    addBoard(input.value);
  });
  
  document.addEventListener('click', event => {
    if (event.target.classList.contains('board__close')) {
      const parentBoard = event.target.closest('.board');
      
      event.preventDefault();
      
      if (parentBoard.classList.contains('board_open')) {
        card.clearContainer();
      }
      
      parentBoard.remove();
    }
  });
  
  form.addEventListener('submit', event => {
    event.preventDefault();
    addBoard(input.value);
  });
  
  if (Object.keys(data).length > 0) {
    for (let boardTitle in data) {
      addBoard(boardTitle);
    }
  }
};
