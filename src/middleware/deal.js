var _ = require('underscore'),
    util = require('util');


module.exports = function(deck, noOfPlayers) {
    var localDeck = deck;
    var state = {
        players: [],
        deck,
        playedCards: []
    }

    for (var i = 0; i < noOfPlayers; i++) {
        var player = {
            id: i + 1,
            hand: [],
            table: []
        };

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
        state.players.push(player);
    }
    state.deck = localDeck;
    return state;
}
