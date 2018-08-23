import dragndrop from './dragndrop';


export default function createCard() {
  const container = document.querySelector('.cards');
  const cardsContainer = document.querySelector('.cards__inner');
  const cardTemplate = document.querySelector('#card-template').innerHTML;
  
  function addListItem(input, list) {
    const item = document.createElement('p');
    const val = input.value;
    
    if (val.length > 0) {
      item.textContent = input.value;
      item.className = 'card__list-item';

      list.appendChild(item);
      
      item.classList.add('draggable');
      dragndrop(item, document.querySelectorAll('.card__list'));

      input.value = '';
    }
  }
  
  function addListInput(list) {
    const cardListInput = document.createElement('input');
    
    cardListInput.type = 'text';
    cardListInput.value = '';
    cardListInput.placeholder = 'add item name';
    cardListInput.className = 'card__list-input';
    
    list.appendChild(cardListInput);
    
    createNewCard();
    
    const cardListInputs = document.querySelectorAll('.card__list-input');
    
    for (let i = 0; i < cardListInputs.length; i++) {
      cardListInputs[i].addEventListener('blur', function () {
        addListItem(this, list);
      });
    }
  }
  
  function saveCardTitle(input) {
    const val = input.value;
    const currentCard = input.closest('.card');
    const elem = currentCard.querySelector('.card__title');
    const list = currentCard.querySelector('.card__list');
    
    console.log(currentCard);
    
    if (val.length > 0) {
      elem.textContent = val;
      elem.classList.remove('hidden');

      input.classList.add('hidden');
      
      list.classList.add('droppable');
      
      if (!list.querySelector('.card__list-input')) {
        currentCard.classList.add('card_with-title');
        addListInput(list);
      }
    }
  }
  
  function createNewCard() {
    const card = document.createElement('div');
    
    card.className = 'card';
    card.innerHTML = cardTemplate;
    
    cardsContainer.appendChild(card);
    
    const inpTitle = card.querySelector('.card__inp-title');
    
    inpTitle.addEventListener('blur', function () {
      saveCardTitle(this);
    });
  }
  
  function clearContainer() {
    cardsContainer.innerHTML = '';
  }
  
  document.addEventListener('click', event => {
    if (event.target.classList.contains('card__close')) {
      event.target.closest('.card').remove();
      
      if (!document.querySelectorAll('.card').length) {
        createNewCard();
      }
    }
  });
  
  document.addEventListener('submit', event => {
    const elemClass = event.target.classList;
    
    if (elemClass.contains('card__form')) {
      event.preventDefault();
      saveCardTitle(event.target.querySelector('.card__inp-title'));
    }
    
    if (elemClass.contains('card__list')) {
      event.preventDefault();
        addListItem(event.target.querySelector('.card__list-input'), event.target);
    }
  });
  
  document.addEventListener('blur', () => {
    console.log('bluuuuuur');
  });
  
  return {
    clearContainer,
    create: createNewCard,
  };
};
