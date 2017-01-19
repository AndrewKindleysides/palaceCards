var proclaim = require('proclaim'),
    rules = require('../src/middleware/rules'),
    card = require('../src/middleware/card'),
    _ = require('underscore');

describe('cards of the same value', function () {
    it('can be played on each other', function () {
        var fourHearts = {
            id: 'hearts-4',
            suit: 'hearts',
            value: 4,
            faceUp: false
        }

        var fourSpades = {
            id: 'spades-4',
            suit: 'spades',
            value: 4,
            faceUp: false
        }

        var playerBefore = {
            id: 1,
            hand: [fourHearts],
            table: []
        };

        var playerAfter = {
            id: 1,
            hand: [],
            table: []
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [fourSpades]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [fourHearts, fourSpades]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn, 0);

        proclaim.deepEqual(result, expectedState);
    });
});
