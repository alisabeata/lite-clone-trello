export default function storageApp() {
  function setItem(name, data) {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    
    try {
      localStorage.setItem(name, data);
    } catch (e) {
      if (e == QUOTA_EXCEEDED_ERR) {
        alert('Data storage limit exceeded');
      }
    }
    
  }
  
  function getItem(name) {
    return localStorage.getItem(name);
  }
  
  function removeItem(name) {
    localStorage.removeItem(name);
  }
  
  function clearStorage() {
    localStorage.clear();
  }
  
  return {
    setItem,
    getItem,
    removeItem,
    clearStorage
  };
};
