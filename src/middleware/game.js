var card = require('./card'),
    deal = require('./deal'),
    _ = require('underscore'),
    sendBackHtml = require('./renderHtml'),
    rules = require('./rules');

var state = {};
var gameInProgress = false;

function newGame(players) {
    gameInProgress = true;
    deck = card.newDeck().cards;
    state = deal(deck, players);
}

module.exports = {
    intro: function(req, res) {
        sendBackHtml(res, state, 'src/templates/intro.hbs');
    },
    start: function(req, res) {
        if (!gameInProgress) {
            newGame([playerA = {
                id: 0,
                socketId: 'aabbccdd',
                hand: [],
                table: []
            }]);
        }
        sendBackHtml(res, state, 'src/templates/game.hbs');
    },
    state: function(req, res) {
        res.send(state);
    },
    reset: function(req, res) {
        gameInProgress = false;
        newGame();
        sendBackHtml(res, state, 'src/templates/game.hbs');
    },
    pickUp: function(req, res) {
        var player = 0;
        if (gameInProgress && state.deck.length > 0) {
            state = rules.pickUp(state, player);
            sendBackHtml(res, state, 'src/templates/game.hbs');
        } else {
            res.send(200);
        }
    },
    playedCardsPickUp: function(req, res) {
        var player = 0;
        state.players[player].hand = _.union(state.players[player].hand, state.playedCards);
        state.playedCards = [];
        sendBackHtml(res, state, 'src/templates/game.hbs');
    },
    cardPlayed: function(req, res) {
        var card = {
            id: req.body.id
        };
        var player = 0;
        state = rules.cardPlayed(req.body.source, card, req.body.faceUp, state, player);
        sendBackHtml(res, state, 'src/templates/game.hbs');

    }
}
