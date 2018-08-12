export default function addBoardButton() {
  const btn = document.querySelector('.add-board-btn');
  const addBoard = document.querySelector('.add-board');
  
  btn.addEventListener('click', () => {
    addBoard.classList.toggle('hidden');
  });
};