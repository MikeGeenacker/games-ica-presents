var game = new Phaser.Game(720, 1280, Phaser.AUTO, 'area', {
    preload: preload,
    create: create,
    update: update
});

var client = new Eureca.Client({ uri: 'http://localhost:3000/' });
var rpc;

client.ready(function(remote) {
	rpc = remote;
}); 

var tuin;
var payed = false;
var coinText;
var coins = 0;
var gameEnded = false;
var score = 0;
var s = []; // s voor tweens
const MAX_AANTAL_PLANTEN = 3;
var doorleft;
var doorright;

function preload() {
    //game.load.image('onkruid', 'images/onkruid.png');
    //game.load.image('aarde', 'aarde.png');
    game.load.image('coin', 'images/coin.png');
	game.load.image('onkruid', 'images/bosje.png');
    game.load.image('door-right', 'images/door-right.png');
    game.load.image('door-left', 'images/door-left.png');
	game.load.image('background', 'images/bg.png');


    //game.add.image('coin', 64, 64);
}

function create() {

	var background = game.add.sprite(0, 0, 'background');
    tuin = game.add.group();
    doorleft = game.add.sprite(-360, 0, 'door-left');
    doorright = game.add.sprite(480, 0, 'door-right');
    var onkruid;
    for (var i = 0; i < MAX_AANTAL_PLANTEN; i++) {
        var randX = game.rnd.integerInRange(64, game.world.bounds.width - 64);
        var randY = game.rnd.integerInRange(64, game.world.bounds.height - 64);
        onkruid = tuin.create(randX, randY, 'onkruid', i);
        onkruid.inputEnabled = true;
        onkruid.input.start(0, true);
        //TODO veranderen, geen idee hoe je points moet indienen
        onkruid.anchor.x = 0.5;
        onkruid.anchor.y = 0.5;
        onkruid.events.onInputDown.add(plantDown);
        onkruid.events.onInputUp.add(plantUp);
        onkruid.events.onInputOut.add(plantOut);
        onkruid.tween = game.add.tween(onkruid.scale);
        onkruid.tween.to({
            x: .1,
            y: .1
        }, 100, Phaser.Easing.Linear.None);
        onkruid.tween.to({
            x: .6,
            y: .6
        }, 100, Phaser.Easing.Linear.None);
        onkruid.tween.to({
            x: .1,
            y: .1
        }, 100, Phaser.Easing.Linear.None);
        onkruid.tween.to({
            x: .3,
            y: .3
        }, 100, Phaser.Easing.Linear.None);
        onkruid.tween.to({
            x: .1,
            y: .1
        }, 100, Phaser.Easing.Linear.None);
        onkruid.tween.to({
            x: .1,
            y: .1
        }, 100, Phaser.Easing.Linear.None);
    }

    // TEXT
    text = game.add.text(game.world.centerX, game.world.centerY + 200, "0", {
        font: "70px Arial",
        fill: "#8b8b8b",
        align: "center",
        stroke: "#8b8b8b",
        strokeThickness: "8"
    });
    text.anchor.setTo(0.5, 0.5);
	text.alpha = 0;

}

function tweenDoors(left_door, right_door) {
    left_door.tween = game.add.tween(left_door.position);
    left_door.tween.to({
        x: 0,
        y: 0
    }, 1000, Phaser.Easing.Linear.None);

    right_door.tween = game.add.tween(right_door.position);
    right_door.tween.to({
        x: 0,
        y: 0
    }, 1000, Phaser.Easing.Linear.None);

    right_door.tween.onComplete.add(function() {
        countCoinsTween();
    });
    right_door.tween.start();
    left_door.tween.start();

}

function countCoinsTween() {
    if (!gameEnded) {
        gameEnded = true;
    }
}

function scaleTween(item) {
    item.tween.onComplete.add(function() {
        item.destroy();
        score++;
    }, this);
    item.tween.start();
}

function update() {
    if (score == MAX_AANTAL_PLANTEN) {
        tweenDoors(doorleft, doorright);
        score++;
    }
    if (gameEnded) {
		text.alpha = 1;
        if (coins < 100)
            coins++;
        text.setText(coins);
		if(coins == 100) {
		payUser();
		}
	}

 }
function payUser() {
    if(!payed)
		rpc.sendCoins(2); //adres zou hier ingevuld moeten worden mbv localstorage
	payed = true;
}

function plantDown(item, pointer) {
    console.log("plant_down");
    scaleTween(item);
}

function plantUp(item, pointer) {
    console.log("plant_up");
}

function endGameTween() {
    //var c = new Phaser.Color.getColor(255, 255, 255);
    game.stage.backgroundColor = "#FFFFFF";
}

function plantOut(item, pointer) {
    console.log("plant_out");
}