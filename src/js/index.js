import detectDevice from './helpers/detectDevice';
import loadPage from './helpers/loadPage';
import createBoard from './components/createBoard';

loadPage(detectDevice().isMobile);

console.log('init');

createBoard();
