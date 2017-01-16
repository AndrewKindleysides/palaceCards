var _ = require('underscore'),
    newState = require('./state');

var three = {
    lastPlayedCard: 3,
    rule: function(state, clickedCard, source) {
        if (state.playedCards.length > 0 && clickedCard.value === 3) {
            playCard(state, clickedCard, source);
        }
        return state;
    }
};

var seven = {
    lastPlayedCard: 7,
    rule: function(state, clickedCard, source) {
        if (state.playedCards.length > 0 && clickedCard.value <= 7) {
            playCard(state, clickedCard, source);
        }
        return state;
    }
};

var ten = {
    clickedCardValue: 10,
    rule: function(state, clickedCard, source) {
        if (state.playedCards.length > 0 && clickedCard.value === 10) {

            playCard(state, clickedCard, source);
            burnDeck(state);
            return state;
        }
    }
};

var two = {
    clickedCardValue: 2,
    rule: function(state, clickedCard, source) {
        if (state.playedCards.length > 0 && clickedCard.value !== 3) {
            playCard(state, clickedCard, source);
        }
        return state;
    }
};

var noneRuledCards = {
    values: [1, 4, 5, 6, 8, 9, 11, 12, 13],
    rule: function(state, clickedCard, source) {
        if (state.playedCards.length > 0 && clickedCard.value >= state.playedCards[0].value) {
            playCard(state, clickedCard, source);
        }
        return state;
    }
}

var rules = [three, seven, ten, noneRuledCards];

function playCard(state, clickedCard, source) {
    if (source === 'hand') {
        state.players[0].hand = _.without(state.players[0].hand, clickedCard);
    } else {
        state.players[0].table = _.without(state.players[0].table, clickedCard);
    }
    state.playedCards.unshift(clickedCard);
}

function playAllCardsOfNumber(state, clickedCard) {
    var clickedCards = _.where(state.players[0].hand, {
        value: clickedCard.value
    });

    for (var i = 0; i < clickedCards.length; i++) {
        state.players[0].hand = _.without(state.players[0].hand, clickedCards[i]);
        state.playedCards.unshift(clickedCards[i]);
    }
    return state;
}

function burnDeck(state) {
    state.burnDeck = state.playedCards;
    state.playedCards = [];
}

module.exports = {
    pickUp(state) {
        state.players[0].hand.push(_.first(state.deck));
        state.deck = _.without(state.deck, _.findWhere(state.deck, _.first(state.deck)));
        return state;
    },
    cardPlayed(source, card, faceUp, state) {
        faceUp = (faceUp === "true");
        if (source === 'hand') {

            if (state.playedCards.length === 0) {
                playCard(state, clickedCard, source);
                return state;
            }
            var clickedCard = _.findWhere(state.players[0].hand, card);
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
                validRule[0].rule(state, clickedCard, 'hand');
            } else {
                playCard(state, clickedCard, source);
            }
        } else {
            if (source === 'table' && state.players[0].hand.length == 0) {
                var clickedCard = _.findWhere(state.players[0].table, card);
                if (faceUp == true) {
                    if (state.playedCards.length === 0) {
                        playCard(state, clickedCard, source);
                        return state;
                    }
                    var validRule = _.filter(rules, function(rule) {
                        if (rule.values != undefined && _.contains(rule.values, clickedCard.value)) {
                            return true;
                        }

                        if (rule.clickedCardValue != undefined) {
                            return rule.clickedCardValue != undefined && rule.clickedCardValue === clickedCard.value
                        }

                        return rule.lastPlayedCard === state.playedCards[0].value;
                    });

                    if (validRule.length > 0) {
                        validRule[0].rule(state, clickedCard, 'table');
                    } else {
                        state.players[0].table = _.without(state.players[0].table, clickedCard);
                        state.playedCards.unshift(clickedCard);
                    }
                } else {
                    if (faceUp == false && state.players[0].table.length <= 3) {
                        clickedCard.faceUp = true;
                        state.players[0].table = _.without(state.players[0].table, clickedCard);
                        state.players[0].hand.unshift(clickedCard);
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
