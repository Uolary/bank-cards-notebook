import '../styles/index.scss';
import '../assets/fonts/Roboto-Regular.ttf';
import {$on} from "./helpers/helpers";
import Store from "./models/store";
import CardList from "./views/cardList";
import Card from "./views/card";
import Controller from "./controllers/controller";
import Modal from "./views/modal";

const store = new Store('cards-list');
const modal = new Modal();
const card = new Card();
const cardList = new CardList(card);
const controller = new Controller(store, modal, cardList, card);

const app = () => {
  controller.initApp();
};

$on(window, 'load', app);
$on(window, 'hashchange', app);
