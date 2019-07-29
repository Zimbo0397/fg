let AnimalsList = require('./animals-list');

const Player = function(id) {
	
    this.id = id;
    this.animalsList = new AnimalsList();
    this.canChangeAnimals = false;

    this.setAnimals = (animalsObj) => {
        this.animalsList.setAnimals(animalsObj);
    }
}

module.exports = Player;