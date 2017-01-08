var _ = require('underscore');

module.exports = {
    pickUp(state) {
        state.players[0].hand.push(_.first(state.deck));
        state.deck = _.without(state.deck, _.findWhere(state.deck, _.first(state.deck)));
        return state;
    }
}
