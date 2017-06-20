var game = new Phaser.Game(720, 1280, Phaser.AUTO, 'area', {
	preload: preload,
		create: create,
		update: update
});

var tuin;
const MAX_AANTAL_PLANTEN = 1;

function preload() {
	//game.load.image('onkruid', 'images/onkruid.png');
	//game.load.image('aarde', 'aarde.png');
	game.load.image('coin', 'images/coin.png');


	//game.add.image('coin', 64, 64);
}

function create() {
	tuin = game.add.group();
	var onkruid;
	for(var i=0; i < MAX_AANTAL_PLANTEN; i++) {
		var randX = Math.random() * game.world.bounds.width;
		var randY = Math.random() * game.world.bounds.height;
		onkruid = tuin.create(randX, randY, 'coin', i);
		item.inputEnabled = true;
		item.input.start(0, true);
		item.events.onInputDown.add(plantDown);
		item.events.onInputUp.add(plantUp);
		item.events.onInputOut.add(plantOut);
	}
}

function update() {
}

function plantDown(item, pointer) {
	console.log("plant_down");
}

function plantUp(item, pointer) {
	console.log("plant_down");
}

function plantOut(item, pointer) {
	console.log("plant_down");
}

