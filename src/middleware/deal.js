var _ = require('underscore'),
    util = require('util');


module.exports = function (deck, noOfPlayers) {
    var state = {
        players: [],
        deck
    }

    for (var i = 0; i <= noOfPlayers; i++) {
        var player = {
            hand: [],
            table: []
        };

        for (var p = 0; p <= 9; p++) {
            _.each(deck, deal);
            deck = _.without(deck, _.findWhere(deck, ));
        }

        state.players.push(player);
    }

    console.log(util.inspect(state, false, null))

    function deal(card) {
        player.hand.push(card);
        // if (player.hand.lengh < 3) {
        //     player.hand.push(card);
        // } else if (player.table.length >= 0 || player.table.length < 4) {
        //     player.table.push(card);
        // } else {
        //     card.faceUp = true;
        //     player.table.push(card);
        // }
        // dealtCards.push(card);

    }
}
