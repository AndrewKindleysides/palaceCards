var proclaim = require('proclaim'),
    player = require('../src/middleware/player'),
    deal = require('../src/middleware/deal'),
    card = require('../src/middleware/card'),
    _ = require('underscore');

describe('dealing cards', function () {
    var playerA;
    var playerB;
    var playerC;
    var playerD;
    beforeEach(function () {
        playerA = {
            id: 0,
            socketId: 'aabbccdd',
            hand: [],
            table: []
        };

        playerB = {
            id: 1,
            socketId: 'bbffrree',
            hand: [],
            table: []
        };

        playerC = {
            id: 2,
            socketId: 'llppooss',
            hand: [],
            table: []
        };

        playerD = {
            id: 3,
            socketId: 'wwiiuujj',
            hand: [],
            table: []
        };
    })
    it('with 1 player gives cards to each player', function () {
        var deck = card.newDeck().cards;
        var players = [playerA]
        var actual = deal(deck, players);

        // proclaim.equal(actual.players[0].hand.length, 3);
        // proclaim.equal(actual.players[0].table.length, 6);
        proclaim.equal(actual.players.length, 1);
        proclaim.equal(actual.deck.length, 43);

    });
    it('with 2 players gives cards to each player', function () {
        var deck = card.newDeck().cards;
        var players = [playerA, playerB]
        var actual = deal(deck, players);

        // proclaim.equal(actual.players[0].hand.length, 3);
        // proclaim.equal(actual.players[0].table.length, 6);
        // proclaim.equal(actual.players[1].hand.length, 3);
        // proclaim.equal(actual.players[1].table.length, 6);
        proclaim.equal(actual.players.length, 2);
        proclaim.equal(actual.deck.length, 34);

    });
    it('with 3 players gives cards to each player', function () {
        var deck = card.newDeck().cards;
        var players = [playerA, playerB, playerC]
        var actual = deal(deck, players);

        // proclaim.equal(actual.players[0].hand.length, 3);
        // proclaim.equal(actual.players[0].table.length, 6);
        // proclaim.equal(actual.players[1].hand.length, 3);
        // proclaim.equal(actual.players[1].table.length, 6);
        // proclaim.equal(actual.players[2].hand.length, 3);
        // proclaim.equal(actual.players[2].table.length, 6);
        proclaim.equal(actual.players.length, 3);
        proclaim.equal(actual.deck.length, 25);
    });
    it('with 4 players gives cards to each player', function () {
        var deck = card.newDeck().cards;
        var players = [playerA, playerB, playerC, playerD]
        var actual = deal(deck, players);

        // proclaim.equal(actual.players[0].hand.length, 3);
        // proclaim.equal(actual.players[0].table.length, 6);
        // proclaim.equal(actual.players[1].hand.length, 3);
        // proclaim.equal(actual.players[1].table.length, 6);
        // proclaim.equal(actual.players[2].hand.length, 3);
        // proclaim.equal(actual.players[2].table.length, 6);
        // proclaim.equal(actual.players[3].hand.length, 3);
        // proclaim.equal(actual.players[3].table.length, 6);
        proclaim.equal(actual.players.length, 4);
        proclaim.equal(actual.deck.length, 16);
    });
});
