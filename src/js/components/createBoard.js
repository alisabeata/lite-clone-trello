import createCard from './createCard';
import storageApp from './storage';

const card = createCard();
const storage = storageApp();

storage.setItem('name', 'data11111');


export default function createBoard() {
  const container = document.querySelector('.boards');
  const boardContainer = document.querySelector('.add-board');
  const form = document.querySelector('.add-board form');
  const input = document.querySelector('.add-board__input');
  const saveBtn = document.querySelector('.add-board__save');
  
  function addBoard() {
    const val = input.value;
    
    if (val.length > 0) {
      const board = document.createElement('a');

      board.className = 'board board_empty';
      board.setAttribute('href', '');
      board.innerHTML = `<span class="close-icon board__close">x</span>${val}`;

      container.appendChild(board);

      input.value = '';
      
      board.addEventListener('click', function (event) {
        const thisBoard = this;
        const boards = document.querySelectorAll('.board');
        
        if (!event.target.classList.contains('board__close')) {
          event.preventDefault();
        
          if (!thisBoard.classList.contains('board_open')) {
            for (let i = 0; i < boards.length; i++) {
              boards[i].classList.remove('board_open');
            }

            thisBoard.classList.add('board_open');

            card.clearContainer();
            card.create();

            thisBoard.classList.remove('board_empty');
          }
        }
      });
    }
  }
  
  saveBtn.addEventListener('click', () => {
    addBoard();
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
    addBoard();
  });
};
