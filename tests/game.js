var proclaim = require('proclaim'),
    rules = require('../src/middleware/rules'),
    card = require('../src/middleware/card'),
    _ = require('underscore');

describe('picking up a card', function () {
    var state;
    var firstCardInTheDeck;
    var result;

    before(function () {
        var deck = card.newDeck().cards;
        var player = {
            id: 1,
            hand: [],
            table: []
        };

        state = {
            players: [player],
            deck,
            playedCards: []
        }

        firstCardInTheDeck = state.deck[0];
        result = rules.pickUp(state);
    });

    it('removes top card from the deck', function () {
        proclaim.equal(_.contains(state.deck[0], firstCardInTheDeck), false);
    });

    it('places top card of the deck into the players hand', function () {
        proclaim.equal(result.players[0].hand[0], firstCardInTheDeck);
    });
});

describe('playing a card on a seven', function () {
    it('must be less or equal to seven', function () {

        var eightHearts = {
            id: 'hearts-8',
            suit: 'hearts',
            value: 8,
            faceUp: false
        }

        var sevenDiamonds = {
            id: 'diamonds-7',
            suit: 'diamonds',
            value: 7,
            faceUp: false
        }

        var player = {
            id: 1,
            hand: [eightHearts],
            table: []
        };

        var stateIn = {
            players: [player],
            playedCards: [sevenDiamonds]
        };

        var expectedState = {
            players: [player],
            playedCards: [sevenDiamonds]
        };

        var card = {
            id: player.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);

        proclaim.deepEqual(result, expectedState);
    });
});

describe('playing a card on a three', function () {
    var fourHearts;
    var threeDiamonds;
    var threeHearts;
    before(function () {
        fourHearts = {
            id: 'hearts-4',
            suit: 'hearts',
            value: 4,
            faceUp: false
        }

        threeDiamonds = {
            id: 'diamonds-3',
            suit: 'diamonds',
            value: 3,
            faceUp: false
        }

        threeHearts = {
            id: 'hearts-3',
            suit: 'hearts',
            value: 3,
            faceUp: false
        }
    })

    it('can not be less than a 3', function () {
        var playerBefore = {
            id: 1,
            hand: [fourHearts],
            table: []
        };

        var playerAfter = {
            id: 1,
            hand: [fourHearts],
            table: []
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [threeDiamonds]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [threeDiamonds]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);

        proclaim.deepEqual(result, expectedState);
    });
    it('can not be more than a 3', function () {
        var playerBefore = {
            id: 1,
            hand: [fourHearts],
            table: []
        };

        var playerAfter = {
            id: 1,
            hand: [fourHearts],
            table: []
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [threeDiamonds]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [threeDiamonds]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);

        proclaim.deepEqual(result, expectedState);
    });

    it('must be a 3', function () {
        var playerBefore = {
            id: 1,
            hand: [threeHearts],
            table: []
        };

        var playerAfter = {
            id: 1,
            hand: [],
            table: []
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [threeDiamonds]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [threeHearts, threeDiamonds]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);

        proclaim.deepEqual(result, expectedState);
    });
});

describe('playing a 10 card', function () {
    it('burns the deck', function () {

        var tenHearts = {
            id: 'hearts-10',
            suit: 'hearts',
            value: 10,
            faceUp: false
        }

        var fourDiamonds = {
            id: 'diamonds-4',
            suit: 'diamonds',
            value: 4,
            faceUp: false
        }

        var fourHearts = {
            id: 'hearts-4',
            suit: 'hearts',
            value: 4,
            faceUp: false
        }

        var playerBefore = {
            id: 1,
            hand: [tenHearts],
            table: []
        };

        var playerAfter = {
            id: 1,
            hand: [],
            table: []
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [fourHearts, fourDiamonds]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [],
            burnDeck: [tenHearts, fourHearts, fourDiamonds]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);
        proclaim.deepEqual(result, expectedState);
    });
});


describe('playing a normal card with no specific rule', function () {
    var fourHearts;
    var fiveDiamonds;
    var sixHearts;

    before(function () {
        fourHearts = {
            id: 'hearts-4',
            suit: 'hearts',
            value: 4,
            faceUp: false
        }

        fiveDiamonds = {
            id: 'diamonds-5',
            suit: 'diamonds',
            value: 5,
            faceUp: false
        }

        sixHearts = {
            id: 'hearts-6',
            suit: 'hearts',
            value: 6,
            faceUp: false
        }


    })

    it('can not be less than the last played card', function () {
        var playerBefore = {
            id: 1,
            hand: [fourHearts],
            table: []
        };

        var playerAfter = {
            id: 1,
            hand: [fourHearts],
            table: []
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [fiveDiamonds]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [fiveDiamonds]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);

        proclaim.deepEqual(result, expectedState);
    });

    it('has to be higher than the last played card', function () {
        var playerBefore = {
            id: 1,
            hand: [sixHearts],
            table: []
        };

        var playerAfter = {
            id: 1,
            hand: [],
            table: []
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [fiveDiamonds]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [sixHearts, fiveDiamonds]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);

        proclaim.deepEqual(result, expectedState);
    });

});

describe('playing a 2 card', function () {
    var cards;
    var twoSpades, threeSpades;
    before(function () {
        cards = card.addSuit('spades');
        twoSpades = _.findWhere(cards, {
            value: 2
        });

        threeSpades = _.findWhere(cards, {
            value: 3
        });

        cards = _.without(cards, threeSpades);
    });

    it('can be played on any card other than a 3', function () {
        _.each(cards, function (card) {

            var playerBefore = {
                id: 1,
                hand: [twoSpades],
                table: []
            };

            var playerAfter = {
                id: 1,
                hand: [],
                table: []
            };

            var stateIn = {
                players: [playerBefore],
                playedCards: [card]
            };

            var expectedState = {
                players: [playerAfter],
                playedCards: [twoSpades, card]
            };

            var card = {
                id: playerBefore.hand[0].id
            };

            var result = rules.cardPlayed('hand', card, false, stateIn);

            proclaim.deepEqual(result, expectedState);
        });
    });

    it('can not be played on a 3', function () {
        var threeHearts = {
            id: 'hearts-3',
            suit: 'hearts',
            value: 3,
            faceUp: false
        }
        var playerBefore = {
            id: 1,
            hand: [twoSpades],
            table: []
        };

        var playerAfter = {
            id: 1,
            hand: [twoSpades],
            table: []
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [threeHearts]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [threeHearts]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);

        proclaim.deepEqual(result, expectedState);

    });
});

describe('cards of the same value', function () {
    it('can be played on each other', function () {
        var fourHearts = {
            id: 'hearts-4',
            suit: 'hearts',
            value: 4,
            faceUp: false
        }

        var fourSpades = {
            id: 'spades-4',
            suit: 'spades',
            value: 4,
            faceUp: false
        }

        var playerBefore = {
            id: 1,
            hand: [fourHearts],
            table: []
        };

        var playerAfter = {
            id: 1,
            hand: [],
            table: []
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [fourSpades]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [fourHearts, fourSpades]
        };

        var card = {
            id: playerBefore.hand[0].id
        };

        var result = rules.cardPlayed('hand', card, false, stateIn);

        proclaim.deepEqual(result, expectedState);
    });
});

describe('the players face up table cards', function () {
    it('can not be played when player has cards in their hand', function () {
        var sixHearts = {
            id: 'hearts-6',
            suit: 'hearts',
            value: 6,
            faceUp: false
        }

        var fiveSpades = {
            id: 'spades-5',
            suit: 'spades',
            value: 5,
            faceUp: false
        }

        var nineSpades = {
            id: 'spades-9',
            suit: 'spades',
            value: 9,
            faceUp: false
        }

        var elevenSpades = {
            id: 'spades-11',
            suit: 'spades',
            value: 11,
            faceUp: false
        }

        var fourClubs = {
            id: 'clubs-4',
            suit: 'clubs',
            value: 4,
            faceUp: false
        }


        var playerBefore = {
            id: 1,
            hand: [elevenSpades],
            table: [sixHearts, fiveSpades, nineSpades]
        };

        var playerAfter = {
            id: 1,
            hand: [elevenSpades],
            table: [sixHearts, fiveSpades, nineSpades]
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [fourClubs]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [fourClubs]
        };

        var card = {
            id: playerBefore.table[0].id
        };

        var result = rules.cardPlayed('table', card, true, stateIn);

        proclaim.deepEqual(result, expectedState);
    });

    it('can be played when player has no cards in their hand', function () {
        var cards = card.addSuit('spades');

        cards[5].faceUp = true;
        cards[7].faceUp = true;
        cards[8].faceUp = true;

        var playerBefore = {
            id: 1,
            hand: [],
            table: [cards[5], cards[7], cards[8], cards[4], cards[6], cards[1]]
        };

        var playerAfter = {
            id: 1,
            hand: [],
            table: [cards[7], cards[8], cards[4], cards[6], cards[1]]
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [cards[0]]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [cards[5], cards[0]]
        };

        var playedCard = {
            id: playerBefore.table[0].id
        };

        var result = rules.cardPlayed('table', playedCard, 'true', stateIn);
        proclaim.deepEqual(result, expectedState);
    });
});

describe('the players face down table cards', function () {
    it('can not be played when player has cards in their hand', function () {
        var cards = card.addSuit('spades');

        cards[5].faceUp = true;
        cards[7].faceUp = true;
        cards[8].faceUp = true;

        var playerBefore = {
            id: 1,
            hand: [cards[9]],
            table: [cards[5], cards[7], cards[8], cards[4], cards[6], cards[1]]
        };

        var playerAfter = {
            id: 1,
            hand: [cards[9]],
            table: [cards[5], cards[7], cards[8], cards[4], cards[6], cards[1]]
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [cards[0]]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [cards[0]]
        };

        var playedCard = {
            id: playerBefore.table[4].id
        };

        var result = rules.cardPlayed('table', playedCard, playerBefore.table[4].faceUp, stateIn);
        proclaim.deepEqual(result, expectedState);
    });

    it('can not be played when player has face up table cards', function () {
        var cards = card.addSuit('spades');

        cards[5].faceUp = true;
        cards[7].faceUp = true;
        cards[8].faceUp = true;

        var playerBefore = {
            id: 1,
            hand: [],
            table: [cards[5], cards[7], cards[8], cards[4], cards[6], cards[1]]
        };

        var playerAfter = {
            id: 1,
            hand: [],
            table: [cards[5], cards[7], cards[8], cards[4], cards[6], cards[1]]
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [cards[0]]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [cards[0]]
        };

        var playedCard = {
            id: playerBefore.table[3].id
        };

        var result = rules.cardPlayed('table', playedCard, playerBefore.table[3].faceUp, stateIn);
        proclaim.deepEqual(result, expectedState);
    });

    it('can be played when player has no face down table cards and no cards in their hand', function () {
        var cards = card.addSuit('spades');

        var playerBefore = {
            id: 1,
            hand: [],
            table: [cards[8], cards[9], cards[10]]
        };

        var playerAfter = {
            id: 1,
            hand: [],
            table: [cards[9], cards[10]]
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: [cards[0]]
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [cards[8], cards[0]]
        };

        var playedCard = {
            id: playerBefore.table[0].id
        };

        var result = rules.cardPlayed('table', playedCard, playerBefore.table[0].faceUp, stateIn);
        proclaim.deepEqual(result, expectedState);
    });
});

describe('playing table cards on a burned Deck', function () {
    it('works', function () {
        var cards = card.addSuit('spades');

        cards[5].faceUp = true;
        cards[7].faceUp = true;
        cards[8].faceUp = true;

        var playerBefore = {
            id: 1,
            hand: [],
            table: [cards[5], cards[7], cards[8], cards[4], cards[6], cards[1]]
        };

        var playerAfter = {
            id: 1,
            hand: [],
            table: [cards[7], cards[8], cards[4], cards[6], cards[1]]
        };

        var stateIn = {
            players: [playerBefore],
            playedCards: []
        };

        var expectedState = {
            players: [playerAfter],
            playedCards: [cards[5]]
        };

        var playedCard = {
            id: playerBefore.table[0].id
        };

        var result = rules.cardPlayed('table', playedCard, 'true', stateIn);
        proclaim.deepEqual(result, expectedState);
    });
});
//playing table card when no cards played due to a burnDeck
