export default function createCard() {
  const container = document.querySelector('.cards');
  const cardsContainer = document.querySelector('.cards__inner');
  const cardTemplate = document.querySelector('#card-template').innerHTML;
  
  
  function addTitle(input) {
    const title = input.parentElement.querySelector('.card__title');
    const val = input.value;
    
    if (val.length > 0) {
      title.textContent = val;
      title.classList.remove('hidden');

      input.classList.add('hidden');
    }
  }
  
  function addCard() {
    const card = document.createElement('div');
    
    card.className = 'card';
    card.innerHTML = cardTemplate;
    
    cardsContainer.appendChild(card);
    
    const inpTitle = document.querySelectorAll('.card__inp-title');
    
    for (let i = 0; i < inpTitle.length; i++) {
      inpTitle[i].addEventListener('blur', function () {
        addTitle(this);
      });
    }
  }
  
  function createAddBtn() {
    const btn = document.createElement('button');
    
    btn.textContent = 'Add card';
    
    container.appendChild(btn);
    
    btn.addEventListener('click', function () {
      addCard();
    });
  }
  
  document.addEventListener('submit', event => {
    if (event.target.className === 'card__form') {
      event.preventDefault();
      
      const input = event.target.querySelector('.card__inp-title');
      
      addTitle(input);
    }
  });
  
  return {
    addTitle,
    createAddBtn,
    create: addCard,
  };
};
