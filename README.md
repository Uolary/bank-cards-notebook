# [Notebook of bank cards](https://uolary.github.io/bank-cards-notebook/dist/index.html)

## Description

- List of bank cards, each card is a 16-digit card number, user comment, image of the card type (Visa / Mastercard).
- It is possible to add a new bank card. When adding a card to the list, its number and optional comment are indicated.
- It is possible to remove a card from the list with user confirmation.
- The list of maps is saved in localStorage.
- Cards that are not valid Visa / Mastercard are not added to the list.
- Comment length - no more than 1024 characters. Displaying a comment in the list of cards - in one line.

## Commands

* `` npm run dev`` - build development.
* `` npm run build`` - build production.
* `` npm start`` - track files and open them in the browser.
* `` npm run stats`` - look at the sizes and stats of the bundle.

## Development

To determine the type of card by its number, the [creditcard.js](https://contaazul.github.io/creditcard.js/) library was used.
