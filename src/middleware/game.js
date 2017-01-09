var card = require('./card'),
    deal = require('./deal'),
    _ = require('underscore'),
    sendBackHtml = require('./renderHtml'),
    rules = require('./rules');

var state = {};
var gameInProgress = false;

function newGame() {
    gameInProgress = true;
    deck = card.newDeck().cards;
    state = deal(deck, 1);
}

module.exports = {
    start: function (req, res) {
        if (!gameInProgress) {
            newGame();
        }
        sendBackHtml(res, state, 'src/templates/game.hbs');
    },
    state: function (req, res) {
        res.send(state);
    },
    reset: function (req, res) {
        gameInProgress = false;
        newGame();
        sendBackHtml(res, state, 'src/templates/game.hbs');
    },
    pickUp: function (req, res) {
        if (gameInProgress && state.deck.length > 0) {
            state = rules.pickUp(state);
            sendBackHtml(res, state, 'src/templates/game.hbs');
        } else {
            res.send(200);
        }
    },
    playedCardsPickUp: function (req, res) {
        state.players[0].hand = _.union(state.players[0].hand, state.playedCards);
        state.playedCards = [];
        sendBackHtml(res, state, 'src/templates/game.hbs');
    },
    cardPlayed: function (req, res) {
        var card = {
            id: req.body.id
        };
        state = rules.cardPlayed(req.body.source, card, req.body.faceUp, state);
        sendBackHtml(res, state, 'src/templates/game.hbs');

    }
}
