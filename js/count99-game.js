var c99 = {};

c99.Game = (function(){
	function Count99Game() {
		console.log("Count 99 game starts");
		
		this.canvas = document.getElementById('game-canvas');
		
		//EaselJS Stage
		this.stage = new createjs.Stage(this.canvas);
		
		var shape = new createjs.Shape();
		shape.graphics.setStrokeStyle(1);
		shape.graphics.beginStroke("#000");
		shape.graphics.beginFill("#efefef");
		
		shape.graphics.rect(0, 0, 80, 80);  //x,y,width,height
		
		this.stage.addChild(shape);
		
		this.stage.update();
	}	
	
	return Count99Game;
})();

window.onload = function() {
	//entry point
	var game = new c99.Game();	
};