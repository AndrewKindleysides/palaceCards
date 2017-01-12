var _ = require('underscore'),
    newState = require('./state');

var three = {
    lastPlayedCard: 3,
    rule: function (state, clickedCard) {
        if (state.playedCards.length > 0 && clickedCard.value === 3) {
            playCard(state, clickedCard);
        }
        return state;
    }
};

var seven = {
    lastPlayedCard: 7,
    rule: function (state, clickedCard) {
        if (state.playedCards.length > 0 && clickedCard.value <= 7) {
            playCard(state, clickedCard);
        }
        return state;
    }
};

var ten = {
    clickedCardValue: 10,
    rule: function (state, clickedCard) {
        if (state.playedCards.length > 0 && clickedCard.value === 10) {

            playCard(state, clickedCard);
            burnDeck(state);
            return state;
        }
    }
};

var noneRuledCards = {
    values: [1,4,5,6,8,9,11,12,13],
    rule: function (state, clickedCard) {
        if (state.playedCards.length > 0 && clickedCard.value > state.playedCards[0].value) {
            playCard(state, clickedCard);               
        }
        return state;      
    }
}

var rules = [three, seven, ten, noneRuledCards];

function playCard(state, clickedCard) {
    state.players[0].hand = _.without(state.players[0].hand, clickedCard);
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
        if (source === 'hand') {

            var clickedCard = _.findWhere(state.players[0].hand, card);

            if (state.playedCards.length === 0) {
                playCard(state, clickedCard);
                return state;
            }

            var validRule = _.filter(rules, function (rule) {
                if(rule.values != undefined && _.contains(rule.values,clickedCard.value))
                {
                    return true;
                }
                
                if (rule.clickedCardValue != undefined) {
                    return rule.clickedCardValue != undefined && rule.clickedCardValue === clickedCard.value
                }
                return rule.lastPlayedCard === state.playedCards[0].value;
            });

            if (validRule.length > 0) {
                validRule[0].rule(state, clickedCard);
            } else {
                playCard(state, clickedCard)
            }
        } else {
            if (source === 'table' && state.players[0].hand.length == 0) {
                if (faceUp === 'true' || faceUp === 'false' && state.players[0].table.length <= 3) {
                    var clickedCard = _.findWhere(state.players[0].table, card);
                    state.players[0].table = _.without(state.players[0].table, clickedCard);
                    state.playedCards.unshift(clickedCard);
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
