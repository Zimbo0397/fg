
let AnimalsList = require('./animals-list');

const Game = function(id, options) {
    this.options = {
        exchangeRates: {
            rabbits: 1,
            sheeps: 6,
            pigs: 12,
            cows: 36,
            horses: 72
        }
    };

    this.id = id;

    if (options) {
            this.options = Object.assign({}, this.options, options);
    }

    this.state = {
            animalsList: new AnimalsList(),
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

module.exports = Game;