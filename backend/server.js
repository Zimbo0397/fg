// Dependencies
let express = require('express');
let http = require('http');
let path = require('path');
let socketIO = require('socket.io');
let app = express();
let server = http.Server(app);
let io = socketIO.listen(server);
let Game = require('./componets/game');
let Player = require('./componets/player');

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/scripts', function(request, response) {
	response.sendFile(path.join(__dirname, '.././client/dist/bundle.js'));
});


// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

let players = [],
	games = [],
	connections = {};

io.on('connection', function(socket) {
	console.log('connect', socket.id);
	const id = socket.id;
	if (games.length) {
		socket.emit('update', games);
	}

	createPlayer(id);

	socket.emit('userCreated', id);

	socket.on('disconnect', async function(data) {
		console.log('disconnect', socket.id);
		removeGameById(id);
		removePlayerById(id);
		await io.emit('update', games);
		// console.log('disconnect');
	});

	socket.on('newGame', function(data) {
		const id = socket.id;
		
		if (hasGame(id)) {return;}
		
		createGame(id);
		io.emit('update', games);
	});

	socket.on('connectToGame', function(gmId) {
		const plId = socket.id;
	
		connectPlToGame(plId, gmId);
	
		io.emit('update', games);
	});

	socket.on('setName', function(name) {
		const player = getPlayerById(socket.id);
	
		player.name = name;
	
		io.emit('update', games);
	});

	
});


function createGame(id) {
	const game = new Game(id),
		  player = getPlayerById(id);

		game.addPlayer(player);
		games.push(game);
}

function removeGameById(id) {
	const game = getGameById(id),
		gameIndex = games.indexOf(game);
		

		if (gameIndex < 0) {return;}

		games.splice(games.indexOf(game), 1);

		for (var con in connections) {
			if (connections[con] === id) {
				delete connections[con];
			}
		}
		
};

function getGameById(id) {
	const game = games.find(gm => gm.id === id);
	return game;
};

function connectPlToGame(plId, gmId) {
	if (alreadyInGame(plId, gmId)) {return;}

	const game = getGameById(gmId),
		  player = getPlayerById(plId);

	game.state.playersList.push(player);
	connections[plId] = gmId;
}

function createPlayer(id) {
	const player = new Player(id);
		players.push(player);
};

function removePlayerById(id) {
	const player = getPlayerById(id),
		  gameId = connections[id];
	
		players.splice(players.indexOf(player), 1);

	if (!gameId) {return;}

	const  game = getGameById(gameId),
		   plList = game.state.playersList
		   plIndexInGame = plList.indexOf(player);

		plList.splice(plIndexInGame, 1);
		delete connections[id];
};

function getPlayerById(id) {
	const player = players.find(pl => pl.id === id);
	return player;
};

function hasGame(id) {
	return !!games.find(function(game) {return game.id === id});
} 

function alreadyInGame(plId, gmId) {
	const game = getGameById(gmId);
	
	return (plId === gmId) || !!game.state.playersList.find((pl) => {return pl.id === plId});
}
