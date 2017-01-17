var proclaim = require('proclaim'),
    rules = require('../src/middleware/rules'),
    card = require('../src/middleware/card'),
    _ = require('underscore');

describe('playing a card on a seven', function() {
    it('must be less or equal to seven', function() {

        var eightHearts = {
            id: 'hearts-8',
            suit: 'hearts',
            value: 8,
            faceUp: false
        }

        var sevenDiamonds = {
            id: 'diamonds-7',
            suit: 'diamonds',
            value: 7,
            faceUp: false
        }

        var player = {
            id: 1,
            hand: [eightHearts],
            table: []
        };

        var stateIn = {
            players: [player],
            playedCards: [sevenDiamonds]
        };

        var expectedState = {
            players: [player],
            playedCards: [sevenDiamonds]
        };

        var card = {
            id: player.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn, 0);

        proclaim.deepEqual(result, expectedState);
    });
});
