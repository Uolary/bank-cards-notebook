import '../styles/index.scss';
import {$on} from './helpers/helpers';
import Store from './models/store';
import CardList from './views/cardList';
import Card from './views/card';
import Controller from './controllers/controller';
import ConfirmModal from "./views/confirmModal";
import AddCardModal from "./views/addCardModal";

const store = new Store('cards-list');
const card = new Card();
const cardList = new CardList(card);
const modal = new AddCardModal();
const confirmModal = new ConfirmModal(card);
const controller = new Controller(store, modal, confirmModal, cardList, card);

const app = () => {
  controller.initApp();
};

$on(window, 'load', app);
$on(window, 'hashchange', app);
