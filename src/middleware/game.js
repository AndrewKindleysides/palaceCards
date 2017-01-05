var card = require('./card'),
    deal = require('./deal'),
    _ = require('underscore'),
    sendBackHtml = require('./renderHtml');

var state = {};
var gameInProgress = false;

function newGame() {
    gameInProgress = true;
    deck = card.newDeck().cards;
    state = deal(deck, 1);
}

module.exports = {
    start: function(req, res) {
        if (!gameInProgress) {
            newGame();
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
        if (gameInProgress && state.deck.length > 0) {
            state.players[0].hand.push(_.first(state.deck));
            state.deck = _.without(state.deck, _.findWhere(state.deck, _.first(state.deck)));
            sendBackHtml(res, state, 'src/templates/game.hbs');
        } else {
            res.send(200);
        }
    },
    playedCardsPickUp: function(req, res) {
        state.players[0].hand = _.union(state.players[0].hand, state.playedCards);
        state.playedCards = [];
        sendBackHtml(res, state, 'src/templates/game.hbs');
    },
    cardPlayed: function(req, res) {
        var card = {
            id: req.body.id
        };

        if (req.body.source === 'hand') {
            var clickedCard = _.findWhere(state.players[0].hand, card);
            var clickedCards = _.where(state.players[0].hand, {
                value: clickedCard.value
            });

            console.dir(clickedCards);

            state.players[0].hand = _.without(state.players[0].hand, clickedCards[0], clickedCards[1]);
            state.playedCards.unshift(clickedCards[0]);
            state.playedCards.unshift(clickedCards[1]);
        }

        if (req.body.source === 'table' && state.players[0].hand.length == 0) {
            if (req.body.faceUp === 'true' || req.body.faceUp === 'false' && state.players[0].table.length <= 3) {
                var clickedCard = _.findWhere(state.players[0].table, card);
                state.players[0].table = _.without(state.players[0].table, clickedCard);
                state.playedCards.unshift(clickedCard);
            }
        }

        if (state.playedCards.length >= 4) {
            if (state.playedCards[0].value == state.playedCards[1].value &&
                state.playedCards[1].value == state.playedCards[2].value &&
                state.playedCards[2].value == state.playedCards[3].value) {

                state.burnDeck = state.playedCards;
                state.playedCards = [];

            }

        }

        sendBackHtml(res, state, 'src/templates/game.hbs');

    }
}
