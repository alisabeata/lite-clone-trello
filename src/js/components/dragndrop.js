import storageApp from './storage';


const storage = storageApp();

export default function dragndrop(elem, containerElems) {
  const cardItemRemover = document.querySelector('.card-item-remover');
  let dragObject = {};
  let draggableCard;

  elem.ondragstart = () => false;
  
  function getCoords(element) {
    const box = element.getBoundingClientRect();
    
    return {
      top: box.top + window.pageYOffset,
      left: box.left + window.pageXOffset
    };
  }
  
  function createAvatar() {
    const avatar = dragObject.element;
    
    const old = {
      parent: avatar.parentNode,
      nextSibling: avatar.nextSibling,
      position: avatar.position || '',
      left: avatar.left || '',
      top: avatar.top || '',
      zIndex: avatar.zIndex || '',
    };

    avatar.rollback = function() {
      old.parent.insertBefore(avatar, old.nextSibling);
      avatar.style.position = old.position;
      avatar.style.left = old.left;
      avatar.style.top = old.top;
      avatar.style.zIndex = old.zIndex;
    };

    return avatar;
  }
  
  function clearItems() {
    const items = document.querySelectorAll('.draggable');
    
    for (let i = 0; i < items.length; i++) {
      const current = items[i];

      current.removeAttribute('hidden');
      current.removeAttribute('style');
    }
  }
  
  function findDroppable(event) {
    dragObject.avatar.hidden = true;
    
    const element = document.elementFromPoint(event.clientX, event.clientY);

    dragObject.avatar.hidden = false;

    if (element == null) return null;

    return {
      element,
      parent: element.closest('.droppable'),
    };
  }
  
  function onDragEnd(dragObject, dropElems) {
    const dragElem = dragObject.element;
    const dropElem = dropElems.element;
    const elemClass = dropElem.classList;
    const parentElem = dropElems.parent;
    const boardTitle = document.querySelector('.board_open .board__name').textContent;
    
    dragElem.hidden = true;
    
    function changeSorting(card) {
      const listItems = card.querySelectorAll('.card__list-item');
      const cardTitle = card.querySelector('.card__title').textContent;
      let data = storage.getData();

      data[boardTitle][cardTitle] = [];

      for (let i = 0; i < listItems.length; i++) {
        data[boardTitle][cardTitle].push(listItems[i].textContent);
      }
      
      storage.setData(data);
    }
    
    if (parentElem) {
      changeSorting(draggableCard);
      draggableCard = null;
      
      switch (true) {
        case elemClass.contains('card__list-item'):
          parentElem.insertBefore(dragElem, dropElem);
          changeSorting(parentElem.closest('.card'));
          break;
          
        case elemClass.contains('card__list'):
          parentElem.appendChild(dragElem);
          changeSorting(parentElem.closest('.card'));
          break;
          
        case elemClass.contains('card-item-remover'):
          dragObject.avatar.remove();
          break;
          
        default:
          onDragCancel(dragObject);
          break;
      }
      
      clearItems();
      
    } else {
      onDragCancel(dragObject);
      clearItems();
    }
    
    cardItemRemover.hidden = true;
    cardItemRemover.classList.remove('card-item-remover__hover');
  }
  
  function onDragCancel(dragObject) {
    dragObject.avatar.rollback();
  }
  
  function startDrag() {
    const avatar = dragObject.avatar;
    
    draggableCard = dragObject.element.closest('.card');
    console.log(draggableCard);

    document.body.appendChild(avatar);
    avatar.style.zIndex = 9999;
    avatar.style.position = 'absolute';
    
    cardItemRemover.hidden = false;
  }
  
  function finishDrag(event) {
    var dropElems = findDroppable(event);

    if (!dropElems) {
      onDragCancel(dragObject);
    } else {
      onDragEnd(dragObject, dropElems);
    }
  }
  
  function onMouseDown(event) {
    if (event.which != 1) return;
    
    const element = event.target.closest('.draggable');
    
    if (!element) return;
    
    dragObject.element = element;
    dragObject.downX = event.pageX;
    dragObject.downY = event.pageY;
  }
  
  function onMouseMove(event) {
    if (!dragObject.element) return;
    
    if (!dragObject.avatar) {
      const moveX = event.pageX - dragObject.downX;
      const moveY = event.pageY - dragObject.downY;
      
      if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) return;
      
      dragObject.avatar = createAvatar(event);
      
      if (!dragObject.avatar) {
        dragObject = {};
        return;
      }
      
      const coords = getCoords(dragObject.avatar);
      
      dragObject.shiftX = dragObject.downX - coords.left;
      dragObject.shiftY = dragObject.downY - coords.top;
      
      startDrag(event);
    }
    
    dragObject.avatar.style.left = event.pageX - dragObject.shiftX + 'px';
    dragObject.avatar.style.top = event.pageY - dragObject.shiftY + 'px';

    return false;
  }
  
  function onMouseUp(event) {
    if (dragObject.avatar) {
      finishDrag(event);
    }
    
    dragObject = {};
  }
  
  document.onmousemove = onMouseMove;
  document.onmouseup = onMouseUp;
  document.onmousedown = onMouseDown;
  
  
  cardItemRemover.addEventListener('mouseover', function () {
    this.classList.add('card-item-remover__hover');
  });
  
};
