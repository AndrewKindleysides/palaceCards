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

app.get('/', game.intro);
app.get('/game/start', game.start);
app.get('/game/reset', game.reset);
app.get('/game/state', game.state);
app.get('/game/deck/pickUp', game.pickUp);
app.get('/game/playedCards/pickUp', game.playedCardsPickUp);

app.post('/game/table/cardPlayed', game.cardPlayed);

var server = require('http').Server(app);
var io = require('socket.io')(server);

var numUsers = 0;

var players = [];

io.on('connection', function (socket) {
    console.log('a user connected');

    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
        console.log(socket.id);
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {


        // we store the username in the socket session for this client
        socket.username = username;

        game.addPlayer(socket);

        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });
    socket.on('card played', function (data) {
        game.cardPlayedEvent(data);
    });
    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function () {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        if (addedUser) {
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});

server.listen(process.env.PORT || 3000, function () {
    console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
});
