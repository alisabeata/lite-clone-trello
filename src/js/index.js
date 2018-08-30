import detectDevice from './helpers/detectDevice';
import loadPage from './helpers/loadPage';
import createBoard from './components/createBoard';
import storageApp from './components/storage';


const storage = storageApp();
const data = storage.getData() || undefined;

loadPage(detectDevice().isMobile);
createBoard(data);


//storage.setData(`
//  {
//    "board_1": {
//      "card_01": [
//        "text001",
//        "text002",
//        "text003"
//      ],
//      "card_02": [
//        "text004",
//        "text005",
//        "text006"
//      ]
//    },
//    "board_2": {
//      "card_03": [
//        "text007",
//        "text008",
//        "text009"
//      ]
//    },
//    "board_3": {
//      "card_04": []
//    }
//  }`);
//console.log(storage.getData());

//storage.clearStorage();

console.log('init');
