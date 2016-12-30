var _ = require('underscore');

function addSuit(suit) {
    var cards = [];
    for (var i = 1; i <= 13; i++) {
        cards.push({
            suit,
            value: i,
            faceUp: false
        });
    }
    return cards;
}

module.exports = {
    newDeck: function () {
        var diamonds = addSuit('diamonds');
        var hearts = addSuit('hearts');
        var spades = addSuit('spades');
        var clubs = addSuit('clubs');
        var deck = _.union(diamonds, hearts, spades, clubs);

        return {
            cards: _.shuffle(deck)
        };
    }
}
