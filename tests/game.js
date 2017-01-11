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

        var result = rules.cardPlayed('hand', card, false, stateIn);

        proclaim.deepEqual(result, expectedState);
    });
});

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
