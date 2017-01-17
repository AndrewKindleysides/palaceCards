var proclaim = require('proclaim'),
    rules = require('../src/middleware/rules'),
    card = require('../src/middleware/card'),
    _ = require('underscore');

describe('picking up a card', function() {
    var state;
    var firstCardInTheDeck;
    var result;

    before(function() {
        var deck = card.newDeck().cards;
        var player = {
            id: 1,
            hand: [],
            table: []
        };

        state = {
            players: [player],
            deck,
            playedCards: []
        }

        firstCardInTheDeck = state.deck[0];
        result = rules.pickUp(state, 0);
    });

    it('removes top card from the deck', function() {
        proclaim.equal(_.contains(state.deck[0], firstCardInTheDeck), false);
    });

    it('places top card of the deck into the players hand', function() {
        proclaim.equal(result.players[0].hand[0], firstCardInTheDeck);
    });
});
