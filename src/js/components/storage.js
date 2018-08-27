export default function storageApp() {
  function setData(data) {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    
    try {
      localStorage.setItem('data', data);
    } catch (event) {
      if (event == QUOTA_EXCEEDED_ERR) {
        alert('Data storage limit exceeded');
      }
    }
  }
  
  function getData(name) {
    let data;
    
    try {
      data = JSON.parse(localStorage.getItem('data'));
    } catch (event) {
      data = localStorage.getItem('data');
    }
    
    return data;
  }
  
  function remove(name) {
    localStorage.removeItem(name);
  }
  
  function clearStorage() {
    localStorage.clear();
  }
  
  return {
    setData,
    getData,
    remove,
    clearStorage,
  };
};
