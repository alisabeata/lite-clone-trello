import createCard from './createCard';

const card = createCard();

export default function createBoard() {
  const container = document.querySelector('.boards');
  const form = document.querySelector('.add-board form');
  const input = document.querySelector('.add-board__input');
  const saveBtn = document.querySelector('.add-board__save');
  const closeBtn = document.querySelector('.add-board__close');
  
  function addBoard(val) {
    const board = document.createElement('a');
    
    board.className = 'board';
    board.setAttribute('href', '');
    board.textContent = val;
    
    container.appendChild(board);
    
    input.value = '';
    
    board.addEventListener('click', event => {
      event.preventDefault();
      
      document.querySelector('.add-board').classList.add('hidden');
      
      if (!document.querySelector('.cards button')) {
        card.createAddBtn();
      } else {
        card.create();
      }
    });
  }
  
  saveBtn.addEventListener('click', () => {
    if (input.value.length > 0) {
      addBoard(input.value);
    }
  });
  
  closeBtn.addEventListener('click', () => {
    input.value = '';
    document.querySelector('.add-board').classList.add('hidden');
  });
  
  form.addEventListener('submit', event => {
    event.preventDefault();
  });
};
