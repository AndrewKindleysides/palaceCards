var proclaim = require('proclaim'),
    _ = require('underscore'),
    card = require('../src/middleware/card');

describe('a new deck of cards', function () {
    var deck;
    before(function () {
        deck = card.newDeck().cards;
    });

    it('has 52 cards', function () {
        proclaim.equal(deck.length, 52);
    });

    it('has 13 cards of suit spades', function () {
        checkSuit('spades', deck);
    });

    it('has 13 cards of suit clubs', function () {
        checkSuit('spades', deck);
    });

    it('has 13 cards of suit hearts', function () {
        checkSuit('spades', deck);
    });

    it('has 13 cards of suit diamonds', function () {
        checkSuit('spades', deck);
    });
});

function checkSuit(suit, deck) {
    for (var i = 1; i <= 13; i++) {
        var card = _.where(deck, {
            id: suit + '-' + i
        });

        proclaim.equal(card.length, 1);
        proclaim.equal(card[0].suit, suit);
        proclaim.equal(card[0].value, i);
    }
}
