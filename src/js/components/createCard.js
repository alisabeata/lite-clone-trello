import dragndrop from './dragndrop';
import storageApp from './storage';


const storage = storageApp();

export default function createCard() {
  const container = document.querySelector('.cards');
  const cardsContainer = document.querySelector('.cards__inner');
  const cardTemplate = document.querySelector('#card-template').innerHTML;
  let boardTitle;
  
  function addListItem(cardTitle, input, list, dataValue) {
    const item = document.createElement('p');
    const val = input ? input.value : null;
    let data = storage.getData();
    
    if (dataValue || val.length > 0) {
      const itemContent = dataValue || input.value;
      
      item.textContent = itemContent;
      item.className = 'card__list-item';

      list.appendChild(item);
      
      if (itemContent && !dataValue) {
        debugger;
        console.log(data[boardTitle][cardTitle]);
        data[boardTitle][cardTitle].push(itemContent);
      
        storage.setData(data);
      }
      
      console.log(data);
      
      item.classList.add('draggable');
      dragndrop(item, document.querySelectorAll('.card__list'));

      input ? input.value = '' : null;
    }
  }
  
  function addListInput(list, listContent, cardTitle) {
    const cardListInput = document.createElement('input');
    
    cardListInput.type = 'text';
    cardListInput.value = '';
    cardListInput.placeholder = 'add item name';
    cardListInput.className = 'card__list-input';
    
    list.appendChild(cardListInput);
    
    if (listContent) {
      for (let i = 0; i < listContent.length; i++) {
        addListItem(cardTitle, null, list, listContent[i]);
      }
    } else {
      const cardListInputs = document.querySelectorAll('.card__list-input');
    
      for (let i = 0; i < cardListInputs.length; i++) {
        cardListInputs[i].addEventListener('blur', function () {
          addListItem(cardTitle, this, list);
        });
      }
      createNewCard();
    }
  }
  
  function saveCardTitle(input, val, listContent) {
    const currentCard = input.closest('.card');
    const elem = currentCard.querySelector('.card__title');
    const list = currentCard.querySelector('.card__list');
    let data = storage.getData();
    
    boardTitle = document.querySelector('.board_open .board__name').textContent;
    
    const dataBoard = data[boardTitle][val];
    
    if (!dataBoard) {
      data[boardTitle][val] = [];
    }
    
    storage.setData(data);
    
    if (val.length > 0) {
      elem.textContent = val;
      elem.classList.remove('hidden');

      input.classList.add('hidden');
      
      list.classList.add('droppable');
      
      if (!list.querySelector('.card__list-input')) {
        currentCard.classList.add('card_with-title');
        addListInput(list, listContent, val);
      }
    }
  }
  
  function createNewCard(cardTitle, listContent = []) {
    const card = document.createElement('div');
    
    card.className = 'card';
    card.innerHTML = cardTemplate;
    
    cardsContainer.appendChild(card);
    
    const inpTitle = card.querySelector('.card__inp-title');
    
    if (cardTitle) {
      saveCardTitle(inpTitle, cardTitle, listContent);
    }
    
    inpTitle.addEventListener('blur', function () {
      saveCardTitle(this, this.value, listContent);
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
      const title = event.target.querySelector('.card__inp-title');
      
      event.preventDefault();
      
      saveCardTitle(title, title.value);
    }
    
    if (elemClass.contains('card__list')) {
      const cardTitle = event.target.previousElementSibling.querySelector('.card__title').textContent;
      
      event.preventDefault();
      
      addListItem(cardTitle, event.target.querySelector('.card__list-input'), event.target);
    }
  });
  
  return {
    clearContainer,
    create: createNewCard,
  };
};
