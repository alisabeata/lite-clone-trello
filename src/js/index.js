import detectDevice from './helpers/detectDevice';
import loadPage from './helpers/loadPage';
import addBoardButton from './components/addBoardButton';
import createBoard from './components/createBoard';

loadPage(detectDevice().isMobile);

console.log('init');

addBoardButton();
createBoard();
