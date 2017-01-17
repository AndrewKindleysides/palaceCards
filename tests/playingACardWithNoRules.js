var proclaim = require('proclaim'),
    rules = require('../src/middleware/rules'),
    card = require('../src/middleware/card'),
    _ = require('underscore');

describe('playing a normal card with no specific rule', function() {
    var fourHearts;
    var fiveDiamonds;
    var sixHearts;

    before(function() {
        fourHearts = {
            id: 'hearts-4',
            suit: 'hearts',
            value: 4,
            faceUp: false
        }

        fiveDiamonds = {
            id: 'diamonds-5',
            suit: 'diamonds',
            value: 5,
            faceUp: false
        }

        sixHearts = {
            id: 'hearts-6',
            suit: 'hearts',
            value: 6,
            faceUp: false
        }


    })

    it('can not be less than the last played card', function() {
        var playerBefore = {
            id: 1,
            hand: [fourHearts],
            table: []
        };

        var playerAfter = {
            id: 1,
            hand: [fourHearts],
            table: []
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [fiveDiamonds]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [fiveDiamonds]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn, 0);

        proclaim.deepEqual(result, expectedState);
    });

    it('has to be higher than the last played card', function() {
        var playerBefore = {
            id: 1,
            hand: [sixHearts],
            table: []
        };

        var playerAfter = {
            id: 1,
            hand: [],
            table: []
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [fiveDiamonds]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [sixHearts, fiveDiamonds]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn, 0);

        proclaim.deepEqual(result, expectedState);
    });

});
