var proclaim = require('proclaim'),
    rules = require('../src/middleware/rules'),
    card = require('../src/middleware/card'),
    _ = require('underscore');

describe('the players face up table cards', function() {
    it('can not be played when player has cards in their hand', function() {
        var sixHearts = {
            id: 'hearts-6',
            suit: 'hearts',
            value: 6,
            faceUp: false
        }

        var fiveSpades = {
            id: 'spades-5',
            suit: 'spades',
            value: 5,
            faceUp: false
        }

        var nineSpades = {
            id: 'spades-9',
            suit: 'spades',
            value: 9,
            faceUp: false
        }

        var elevenSpades = {
            id: 'spades-11',
            suit: 'spades',
            value: 11,
            faceUp: false
        }

        var fourClubs = {
            id: 'clubs-4',
            suit: 'clubs',
            value: 4,
            faceUp: false
        }


        var playerBefore = {
            id: 1,
            hand: [elevenSpades],
            table: [sixHearts, fiveSpades, nineSpades]
        };

        var playerAfter = {
            id: 1,
            hand: [elevenSpades],
            table: [sixHearts, fiveSpades, nineSpades]
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [fourClubs]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [fourClubs]
        };

        var card = {
            id: playerBefore.table[0].id
        };

        var result = rules.cardPlayed('table', card, true, stateIn);

        proclaim.deepEqual(result, expectedState);
    });

    it('can be played when player has no cards in their hand', function() {
        var cards = card.addSuit('spades');

        cards[5].faceUp = 'true';
        cards[7].faceUp = 'true';
        cards[8].faceUp = 'true';

        var playerBefore = {
            id: 1,
            hand: [],
            table: [cards[5], cards[7], cards[8], cards[4], cards[6], cards[1]]
        };

        var playerAfter = {
            id: 1,
            hand: [],
            table: [cards[7], cards[8], cards[4], cards[6], cards[1]]
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [cards[0]]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [cards[5], cards[0]]
        };

        var playedCard = {
            id: playerBefore.table[0].id
        };

        var result = rules.cardPlayed('table', playedCard, playerBefore.table[0].faceUp, stateIn);
        proclaim.deepEqual(result, expectedState);
    });
});
