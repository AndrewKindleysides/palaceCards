var card = require('./card'),
    deal = require('./deal'),
    _ = require('underscore'),
    sendBackHtml = require('./renderHtml');

var state = {};
var gameInProgress = false;

function newGame() {
    gameInProgress = true;
    deck = card.newDeck().cards;
    state = deal(deck, 4);
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
            state.players[0].hand.push(_.first(state.deck));
            state.deck = _.without(state.deck, _.findWhere(state.deck, _.first(state.deck)));
            sendBackHtml(res, state, 'src/templates/game.hbs');
        } else {
            res.send(200);
        }
    }
}
