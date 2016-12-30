var card = require('./card'),
    deal = require('./deal'),
    sendBackHtml = require('./renderHtml');

module.exports = {
    start: function (req, res) {
        var deck = card.newDeck();
        var board = deal(deck.cards, 4);
        sendBackHtml(res, deck, 'src/templates/game.hbs');
    }
}
