import createCard from './createCard';


const card = createCard();

export default function createBoard(data) {
  const container = document.querySelector('.boards');
  const boardContainer = document.querySelector('.add-board');
  const form = document.querySelector('.add-board form');
  const input = document.querySelector('.add-board__input');
  const saveBtn = document.querySelector('.add-board__save');
  
  console.log('createBoard');
  
  function addBoard(val) {
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
            
            console.log(data);
            
            card.clearContainer();
            
            if (data) {
              const dataBoard = data[0][val];
    
              for (let cardContent in dataBoard) {
                card.create([cardContent, dataBoard[cardContent]]);
              }
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
      
      // TODO
      // добавлять обработку данных (добавление контента) из сторадж при закрытии для активной доски
    }
  });
  
  form.addEventListener('submit', event => {
    event.preventDefault();
    addBoard(input.value);
  });
  
  if (data) {
    const dataObj = data[0];
    
    for (let boardTitle in dataObj) {
      addBoard(boardTitle);
    }
  }
};
