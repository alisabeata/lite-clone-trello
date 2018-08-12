export default function loadingPage(isMobile) {
  const loaded = function () {
    isMobile ? document.body.classList.add('js-mobile') : document.body.classList.add('js-desktop');
    
    document.body.classList.remove('no-js');
    document.body.classList.add('page-is-loaded');
  };
  
  document.addEventListener('DOMContentLoaded', loaded);
};