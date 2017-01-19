var _ = require('underscore'),
    util = require('util'),
    state = require('./state');

module.exports = function(deck, players) {
    var localDeck = deck;
    var localState = state;
    _.each(players, function(player) {
        for (var i = 0; i < players.length; i++) {
            for (var p = 0; p <= 9; p++) {
                if (player.hand.length >= 0 && player.hand.length < 3) {
                    player.hand.push(_.first(localDeck));
                    localDeck = _.without(localDeck, _.findWhere(localDeck, _.first(localDeck)));
                } else if (player.table.length >= 0 && player.table.length < 3) {
                    player.table.push(_.first(localDeck));
                    localDeck = _.without(localDeck, _.findWhere(localDeck, _.first(localDeck)));
                } else if (player.table.length >= 3 && player.table.length < 6) {
                    var card = _.first(localDeck);
                    card.faceUp = true;
                    player.table.push(card);
                    localDeck = _.without(localDeck, _.findWhere(localDeck, _.first(localDeck)));
                }
            }
        }
    });

    localState.players = players;
    localState.deck = localDeck;
    return localState;
}
