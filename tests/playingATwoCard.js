var proclaim = require('proclaim'),
    rules = require('../src/middleware/rules'),
    card = require('../src/middleware/card'),
    _ = require('underscore');

describe('playing a 2 card', function() {
    var cards;
    var twoSpades, threeSpades;
    before(function() {
        cards = card.addSuit('spades');
        twoSpades = _.findWhere(cards, {
            value: 2
        });

        threeSpades = _.findWhere(cards, {
            value: 3
        });

        cards = _.without(cards, threeSpades);
    });

    it('can be played on any card other than a 3', function() {
        _.each(cards, function(card) {
            var playerBefore = {
                id: 1,
                hand: [twoSpades],
                table: []
            };

            var playerAfter = {
                id: 1,
                hand: [],
                table: []
            };

            var stateIn = {
                players: [playerBefore],
                playedCards: [card]
            };

            var expectedState = {
                players: [playerAfter],
                playedCards: [twoSpades, card]
            };

            var card = {
                id: playerBefore.hand[0].id
            };

            var result = rules.cardPlayed('hand', card, false, stateIn);

            proclaim.deepEqual(result, expectedState);
        });
    });

    it('can not be played on a 3', function() {
        var threeHearts = {
            id: 'hearts-3',
            suit: 'hearts',
            value: 3,
            faceUp: false
        }
        var playerBefore = {
            id: 1,
            hand: [twoSpades],
            table: []
        };

        var playerAfter = {
            id: 1,
            hand: [twoSpades],
            table: []
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [threeHearts]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [threeHearts]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);

        proclaim.deepEqual(result, expectedState);

    });
});
