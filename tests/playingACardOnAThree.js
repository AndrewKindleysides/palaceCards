var proclaim = require('proclaim'),
    rules = require('../src/middleware/rules'),
    card = require('../src/middleware/card'),
    _ = require('underscore');

describe('playing a card on a three', function() {
    var fourHearts;
    var threeDiamonds;
    var threeHearts;
    before(function() {
        fourHearts = {
            id: 'hearts-4',
            suit: 'hearts',
            value: 4,
            faceUp: false
        }

        threeDiamonds = {
            id: 'diamonds-3',
            suit: 'diamonds',
            value: 3,
            faceUp: false
        }

        threeHearts = {
            id: 'hearts-3',
            suit: 'hearts',
            value: 3,
            faceUp: false
        }
    })

    it('can not be less than a 3', function() {
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
            playedCards: [threeDiamonds]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [threeDiamonds]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);

        proclaim.deepEqual(result, expectedState);
    });
    it('can not be more than a 3', function() {
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
            playedCards: [threeDiamonds]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [threeDiamonds]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);

        proclaim.deepEqual(result, expectedState);
    });

    it('must be a 3', function() {
        var playerBefore = {
            id: 1,
            hand: [threeHearts],
            table: []
        };

        var playerAfter = {
            id: 1,
            hand: [],
            table: []
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [threeDiamonds]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [threeHearts, threeDiamonds]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);

        proclaim.deepEqual(result, expectedState);
    });
});
