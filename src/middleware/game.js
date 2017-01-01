var card = require('./card'),
    deal = require('./deal'),
    sendBackHtml = require('./renderHtml');

module.exports = {
    start: function (req, res) {
        var deck = card.newDeck();
        var state = deal(deck.cards, 4);
        sendBackHtml(res, state, 'src/templates/game.hbs');
    }
}
