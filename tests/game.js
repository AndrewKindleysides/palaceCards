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
        result = rules.pickUp(state);
    });

    it('removes top card from the deck', function() {
        proclaim.equal(_.contains(state.deck[0], firstCardInTheDeck), false);
    });

    it('places top card of the deck into the players hand', function() {
        proclaim.equal(result.players[0].hand[0], firstCardInTheDeck);
    });
});

describe('playing a card on a seven', function() {
    it('must be less or equal to seven', function() {
        var player = {
            id: 1,
            hand: [{
                id: 'hearts-8',
                suit: 'hearts',
                value: 8,
                faceUp: false
            }],
            table: []
        };

        var stateIn = {
            players: [player],
            playedCards: [{
                id: 'diamonds-7',
                suit: 'diamonds',
                value: 7,
                faceUp: false
            }]
        };

        var expectedState = {
            players: [player],
            playedCards: [{
                id: 'diamonds-7',
                suit: 'diamonds',
                value: 7,
                faceUp: false
            }]
        };

        var card = {
            id: player.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);

        proclaim.equal(result, expectedState);
    });
});
