var proclaim = require('proclaim'),
    rules = require('../src/middleware/rules'),
    card = require('../src/middleware/card'),
    _ = require('underscore');

describe('start of the game', function() {
    it('any card from the players hand can be played', function() {
        var cards = card.addSuit('spades');

        cards[5].faceUp = 'true';
        cards[7].faceUp = 'true';
        cards[8].faceUp = 'true';

        cards[1].faceUp = 'true';
        cards[2].faceUp = 'true';
        cards[3].faceUp = 'true';

        var playerBefore = {
            id: 1,
            hand: [cards[5], cards[7], cards[8]],
            table: [cards[1], cards[2], cards[3], cards[4], cards[6], cards[10]]
        };

        var playerAfter = {
            id: 1,
            hand: [cards[7], cards[8]],
            table: [cards[1], cards[2], cards[3], cards[4], cards[6], cards[10]]
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: []
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [cards[5]]
        };

        var playedCard = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', playedCard, playerBefore.table[0].faceUp, stateIn, 0);
        proclaim.deepEqual(result, expectedState);
    });
});
