var c99 = {};

c99.Tile = (function() {
	function Tile(number) {
		this.initialize();
		this.number = number;
		this.width = this.height = 80;
	
		var shape = new createjs.Shape();
		shape.graphics.setStrokeStyle(1);
		shape.graphics.beginStroke("#000");
		shape.graphics.beginFill("#efefef");
		
		shape.graphics.rect(0, 0, this.width, this.height);
		
		this.addChild(shape);
		
		var numberText = new createjs.Text(number, "24px Helvetica", "#ac1000");
		numberText.x = this.width/2;
		numberText.y = this.height/2;
		
		numberText.textAlign = "center";
		numberText.textBaseline = "middle";
		
		this.addChild(numberText);
	}
	
	var p = Tile.prototype = new createjs.Container();
	return Tile;
})();

c99.Game = (function(){
	function Count99Game() {
		console.log("Count 99 game starts");
		
		this.canvas = document.getElementById('game-canvas');
		
		this.stage = new createjs.Stage(this.canvas);
		
		this.initGame();
		
		var restartButton = document.getElementById('restart-button');
		restartButton.onclick = (function(event) {
			var gameOverScene = document.getElementById('gameover');
			gameOverScene.classList.remove('gameover-appear');
			this.initGame();
		}).bind(this);
	}	
	
	Count99Game.prototype.initGame = function() {
		this.totalTiles = 3;
		this.nextCount = 1;
		this.nextCountLabel = document.getElementById('next-count');
	
		var tileOnPress = function(event) {
			if(event.target.parent.number === this.nextCount) {
				this.stage.removeChild(event.target.parent);
				this.stage.update();
				this.nextCount++;
				this.nextCountLabel.textContent = this.nextCount;	
				
				if (this.nextCount > this.totalTiles) {
					this.gameOver();
				}
			}
		};	
	
		for (var i = this.totalTiles; i > 0; i--) {
			var tile = new c99.Tile(i);
			this.stage.addChild(tile);
			tile.x = Math.random()*(this.canvas.width - tile.width);
			tile.y = Math.random()*(this.canvas.height - tile.height);
			
			//tile.onPress = (tileOnPress).bind(this);
			tile.addEventListener("click", tileOnPress.bind(this));
		}
		
		this.stage.update();	
	};
	
	Count99Game.prototype.gameOver = function() {
		this.nextCount = 1;
		this.nextCountLabel.textContent = this.nextCount;
		
		var gameOverScene = document.getElementById('gameover');
		gameOverScene.classList.add('gameover-appear');
	};
	
	return Count99Game;
})();

window.onload = function() {
	//entry point
	var game = new c99.Game();	
};