export default function dragndrop(elem, containerElems) {
  let dragObject = {};
  
  elem.classList.add('draggable');

  for (let i = 0; i < containerElems.length; i++) {
    containerElems[i].classList.add('droppable');
  }
  
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
  
  function startDrag() {
    var avatar = dragObject.avatar;

    document.body.appendChild(avatar);
    avatar.style.zIndex = 9999;
    avatar.style.position = 'absolute';
  }
  
  function findDroppable(event) {
    dragObject.avatar.hidden = true;
    
    const element = document.elementFromPoint(event.clientX, event.clientY);

    dragObject.avatar.hidden = false;

    if (element == null) return null;

    return element.closest('.droppable');
  }
  
  function onDragEnd(dragObject, dropElem) {
    dragObject.element.hidden = true;
    
    dropElem.classList.add('drop-finish');
    
    dropElem.appendChild(dragObject.element);
    
    const dropChildrens = dropElem.children;
    
    console.log(dropChildrens);
    
    for (let i = 0; i < dropChildrens.length; i++) {
      const currentElem = dropChildrens[i];
      
      currentElem.removeAttribute('hidden');
      currentElem.removeAttribute('style');
    }
    
    setTimeout(function () {
      dropElem.classList.remove('drop-finish');
    }, 500);
  }
  
  function onDragCancel(dragObject) {
    dragObject.avatar.rollback();
  }
  
  function finishDrag(event) {
    var dropElem = findDroppable(event);

    if (!dropElem) {
      onDragCancel(dragObject);
    } else {
      onDragEnd(dragObject, dropElem);
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
  
};
