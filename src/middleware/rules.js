var _ = require('underscore'),
    newState = require('./state');

var three = {
    lastPlayedCard: 3,
    rule: function(state, clickedCard, source, player) {
        if (state.playedCards.length > 0 && clickedCard.value === 3) {
            playCard(state, clickedCard, source, player);
        }
        return state;
    }
};

var seven = {
    lastPlayedCard: 7,
    rule: function(state, clickedCard, source, player) {
        if (state.playedCards.length > 0 && clickedCard.value <= 7) {
            playCard(state, clickedCard, source, player);
        }
        return state;
    }
};

var ten = {
    clickedCardValue: 10,
    rule: function(state, clickedCard, source, player) {
        if (state.playedCards.length > 0 && clickedCard.value === 10) {

            playCard(state, clickedCard, source, player);
            burnDeck(state);
            return state;
        }
    }
};

var two = {
    clickedCardValue: 2,
    rule: function(state, clickedCard, source, player) {
        if (state.playedCards.length > 0 && clickedCard.value !== 3) {
            playCard(state, clickedCard, source, player);
        }
        return state;
    }
};

var noneRuledCards = {
    values: [1, 4, 5, 6, 8, 9, 11, 12, 13],
    rule: function(state, clickedCard, source, player) {
        if (state.playedCards.length > 0 && clickedCard.value >= state.playedCards[0].value) {
            playCard(state, clickedCard, source, player);
        }
        return state;
    }
}

var rules = [three, seven, ten, noneRuledCards];

function playCard(state, clickedCard, source, player) {
    if (source === 'hand') {
        state.players[player].hand = _.without(state.players[player].hand, clickedCard);
    } else {
        state.players[player].table = _.without(state.players[player].table, clickedCard);
    }
    state.playedCards.unshift(clickedCard);
}

function playAllCardsOfNumber(state, clickedCard, player) {
    var clickedCards = _.where(state.players[player].hand, {
        value: clickedCard.value
    });

    for (var i = 0; i < clickedCards.length; i++) {
        state.players[player].hand = _.without(state.players[player].hand, clickedCards[i]);
        state.playedCards.unshift(clickedCards[i]);
    }
    return state;
}

function burnDeck(state) {
    state.burnDeck = state.playedCards;
    state.playedCards = [];
}

function doMove(state, clickedCard, source, player) {
    if (state.playedCards.length === 0) {
        playCard(state, clickedCard, source, player);
        return state;
    }

    var validRule = _.filter(rules, function(rule) {
        if (rule.values != undefined && _.contains(rule.values, clickedCard.value)) {
            return true;
        }

        if (rule.clickedCardValue != undefined) {
            return rule.clickedCardValue != undefined && rule.clickedCardValue === clickedCard.value
        }

        return rule.lastPlayedCard === state.playedCards[0].value || state.playedCards.length === 0;
    });

    if (validRule.length > 0) {
        validRule[0].rule(state, clickedCard, source, player);
    } else {
        playCard(state, clickedCard, source, player);
    }
}

module.exports = {
    pickUp(state, player) {
        state.players[player].hand.push(_.first(state.deck));
        state.deck = _.without(state.deck, _.findWhere(state.deck, _.first(state.deck)));
        return state;
    },
    cardPlayed(source, card, faceUp, state, player) {
        faceUp = (faceUp === "true");
        if (source === 'hand') {
            var clickedCard = _.findWhere(state.players[player].hand, card);

            doMove(state, clickedCard, source, player);
        } else {
            if (source === 'table' && state.players[player].hand.length == 0) {
                var clickedCard = _.findWhere(state.players[player].table, card);
                if (faceUp == true) {
                    doMove(state, clickedCard, source, player)
                } else {
                    if (faceUp == false && state.players[player].table.length <= 3) {
                        clickedCard.faceUp = true;
                        state.players[player].table = _.without(state.players[player].table, clickedCard);
                        state.players[player].hand.unshift(clickedCard);
                    }
                }
            }
        }

        if (state.playedCards.length >= 4) {
            if (state.playedCards[0].value == state.playedCards[1].value &&
                state.playedCards[1].value == state.playedCards[2].value &&
                state.playedCards[2].value == state.playedCards[3].value) {

                burnDeck(state);
            }
        }

        return state;
    }
}
