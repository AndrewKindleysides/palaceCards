var _ = require('underscore');

module.exports = {
    pickUp(state) {
        state.players[0].hand.push(_.first(state.deck));
        state.deck = _.without(state.deck, _.findWhere(state.deck, _.first(state.deck)));
        return state;
    },
    cardPlayed(source, card, faceUp, stateIn) {
        var state = stateIn;

        if (source === 'hand') {
            var clickedCard = _.findWhere(state.players[0].hand, card);

            var clickedCards = _.where(state.players[0].hand, {
                value: clickedCard.value
            });

            for (var i = 0; i < clickedCards.length; i++) {
                state.players[0].hand = _.without(state.players[0].hand, clickedCards[i]);
                state.playedCards.unshift(clickedCards[i]);
            }
        }

        if (source === 'table' && state.players[0].hand.length == 0) {
            if (faceUp === 'true' || faceUp === 'false' && state.players[0].table.length <= 3) {
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

        return state;
    }
}
