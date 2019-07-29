const AnimalsList = function(animals) {
	
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
};

module.exports = AnimalsList;