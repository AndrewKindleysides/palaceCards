var _ = require('underscore'),
    util = require('util');


module.exports = function(deck, noOfPlayers) {
    var state = {
        players: [],
        deck
    }

    for (var i = 0; i < noOfPlayers; i++) {
        var player = {
            hand: [],
            table: []
        };

        for (var p = 0; p <= 9; p++) {
            if (player.hand.length >= 0 && player.hand.length < 3) {
                player.hand.push(_.first(deck));
                deck = _.without(deck, _.findWhere(deck, _.first(deck)));
            } else if (player.table.length >= 0 && player.table.length < 3) {
                player.table.push(_.first(deck));
                deck = _.without(deck, _.findWhere(deck, _.first(deck)));
            } else if (player.table.length >= 3 && player.table.length < 6) {
                var card = _.first(deck);
                card.faceUp = true;
                player.table.push(card);
                deck = _.without(deck, _.findWhere(deck, _.first(deck)));
            }
        }
        state.players.push(player);
    }
    console.log(state.players.length);
}
