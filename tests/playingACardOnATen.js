var proclaim = require('proclaim'),
    rules = require('../src/middleware/rules'),
    card = require('../src/middleware/card'),
    _ = require('underscore');

describe('playing a 10 card', function() {
    it('burns the deck', function() {

        var tenHearts = {
            id: 'hearts-10',
            suit: 'hearts',
            value: 10,
            faceUp: false
        }

        var fourDiamonds = {
            id: 'diamonds-4',
            suit: 'diamonds',
            value: 4,
            faceUp: false
        }

        var fourHearts = {
            id: 'hearts-4',
            suit: 'hearts',
            value: 4,
            faceUp: false
        }

        var playerBefore = {
            id: 1,
            hand: [tenHearts],
            table: []
        };

        var playerAfter = {
            id: 1,
            hand: [],
            table: []
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [fourHearts, fourDiamonds]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [],
            burnDeck: [tenHearts, fourHearts, fourDiamonds]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);
        proclaim.deepEqual(result, expectedState);
    });
});
