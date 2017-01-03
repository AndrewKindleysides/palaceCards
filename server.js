var express = require('express'),
    app = express(),
    logger = require('morgan'),
    game = require('./src/middleware/game'),
    bodyParser = require('body-parser'),
    sassMiddleware = require('node-sass-middleware'),
    cssPath = __dirname + '/src/css';

app.use(logger('dev'));
app.use('/src/css', sassMiddleware({
    src: cssPath,
    dest: cssPath,
    debug: false,
    outputStyle: 'expanded'
}));

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use('/src/imgs', express.static('src/imgs'));
app.use('/src/css', express.static('src/css'));
app.use('/src/scripts', express.static('src/scripts'));

app.get('/game/start', game.start);
app.get('/game/reset', game.reset);
app.get('/game/state', game.state);
app.get('/game/deck/pickUp', game.pickUp);
app.get('/game/playedCards/pickUp', game.playedCardsPickUp);

app.post('/game/table/cardPlayed', game.cardPlayed);

app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
});
