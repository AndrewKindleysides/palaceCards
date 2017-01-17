var proclaim = require('proclaim'),
    rules = require('../src/middleware/rules'),
    card = require('../src/middleware/card'),
    _ = require('underscore');

describe('the players face down table cards', function() {
    it('can not be played when player has cards in their hand', function() {
        var cards = card.addSuit('spades');

        cards[5].faceUp = 'true';
        cards[7].faceUp = 'true';
        cards[8].faceUp = 'true';

        var playerBefore = {
            id: 1,
            hand: [cards[9]],
            table: [cards[5], cards[7], cards[8], cards[4], cards[6], cards[1]]
        };

        var playerAfter = {
            id: 1,
            hand: [cards[9]],
            table: [cards[5], cards[7], cards[8], cards[4], cards[6], cards[1]]
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [cards[0]]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [cards[0]]
        };

        var playedCard = {
            id: playerBefore.table[4].id
        };

        var result = rules.cardPlayed('table', playedCard, playerBefore.table[4].faceUp, stateIn, 0);
        proclaim.deepEqual(result, expectedState);
    });

    it('can not be played when player has face up table cards', function() {
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
            table: [cards[5], cards[7], cards[8], cards[4], cards[6], cards[1]]
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [cards[0]]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [cards[0]]
        };

        var playedCard = {
            id: playerBefore.table[3].id
        };

        var result = rules.cardPlayed('table', playedCard, playerBefore.table[3].faceUp, stateIn, 0);
        proclaim.deepEqual(result, expectedState);
    });

    it('are placed into the players hand when clicked', function() {
        var cards = card.addSuit('spades');

        var playerBefore = {
            id: 1,
            hand: [],
            table: [cards[8], cards[9], cards[10]]
        };

        var cardAfter = cards[8];
        cardAfter.faceUp = true;

        var playerAfter = {
            id: 1,
            hand: [cardAfter],
            table: [cards[9], cards[10]]
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [cards[0]]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [cards[0]]
        };

        var playedCard = {
            id: playerBefore.table[0].id
        };

        var result = rules.cardPlayed('table', playedCard, playerBefore.table[0].faceUp, stateIn, 0);
        proclaim.deepEqual(result, expectedState);
    });
});
