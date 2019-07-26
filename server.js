// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO.listen(server);
app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/scripts', function(request, response) {
	response.sendFile(path.join(__dirname, './client/dist/bundle.js'));
  });

// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

var users = [],
		connections = [],
		games = [];
		
	const Game = function(options) {
		this.options = {
				exchangeRates: {
						rabbits: 1,
						sheeps: 6,
						pigs: 12,
						cows: 36,
						horses: 72
				}
		};

		if (options) {
				this.options = Object.assign({}, this.options, options);
		}

		this.state = {
				animalsList: new animalsList(),
				playersList: []
		}

		this.addPlayer = (player) => {
				this.state.playersList.push(player);
		};

		this.removePlayer = (id) => {
				this.state.playersList.splice(id, 1);
		}

		const getPlayerById = (id) => {
				return this.state.playersList.find((us) => {is.id === id});
		};

		this.onPlayerdisconnect = (id) => {
				const isPlIngame = getPlayerById(id);

				if (isPlIngame) {
						this.removePlayer(id);
				}
		};

		this.exchangeAnimals = (from, to) => {
				return Math.floor(this.options.exchangeRates[from] / this.options.exchangeRates[to]); 
		};

		this.moveAnimals = (animalsObj, from, to) => {

		};
}
	
	const animalsList = function(animals) {
	
			const an = animals || {};
	
			this.rabbits = an.rabbits || 0;
			this.sheeps = an.sheeps || 0;
			this.pigs = an.pigs || 0;
			this.cows = an.cows || 0;
			this.horses = an.horses || 0;
	
			this.setAnimals = (animalObj) => {
	
					for (animal in animalObj) {
							this[animal] = animalObj[animal];
					}
			};
			return this;
	}
	
	const player = function(id) {
	
			this.Id = id;
			this.animalsList = new animalsList();
			this.canChangeAnimals = false;
	
			this.setAnimals = (animalsObj) => {
					this.animalsList.setAnimals(animalsObj);
			}
	}

io.sockets.on('connection', function(socket) {
	connections.push(socket);

	socket.on('new Game', (data) => {
		const game = new Game({id: socket.id});
		games.push(game);
		socket.emit('update', games);
	});

	socket.on('disconnect', function(data) {
		connections.splice(connections.indexOf(socket), 1);
		const game = games.find(gm => gm.id === socket.id);
		games.splice(games.indexOf(game), 1);

		socket.emit('update', games);
	});
});

