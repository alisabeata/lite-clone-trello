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
    const elem = input.parentElement.querySelector('.card__title');
    const list = input.parentElement.nextElementSibling;
    
    if (val.length > 0) {
      elem.textContent = val;
      elem.classList.remove('hidden');

      input.classList.add('hidden');
      
      if (!list.querySelector('.card__list-input')) {
        addListInput(list);
      }
    }
  }
  
  function createNewCard() {
    const card = document.createElement('div');
    
    card.className = 'card';
    card.innerHTML = cardTemplate;
    
    cardsContainer.appendChild(card);
    
    const inpTitle = document.querySelectorAll('.card__inp-title');
    
    for (let i = 0; i < inpTitle.length; i++) {
      inpTitle[i].addEventListener('blur', function () {
        saveCardTitle(this);
      });
    }
  }
  
  function clearContainer() {
    cardsContainer.innerHTML = '';
  }

  
  document.addEventListener('submit', event => {
    switch (event.target.className) {
      case 'card__form':
        event.preventDefault();
        saveCardTitle(event.target.querySelector('.card__inp-title'));
        break;
        
      case 'card__list':
        event.preventDefault();
        addListItem(event.target.querySelector('.card__list-input'), event.target);
        break;
    }
  });
  
  return {
    clearContainer,
    create: createNewCard,
  };
};
