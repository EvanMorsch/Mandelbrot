//color scaler function (b-w scale)

var c = document.getElementById("Canvas");
ctx = c.getContext("2d");

ctx.init = function() {
	//make the size changable as a parameter?
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	SCREENWIDTH = window.innerWidth;
	SCREENHEIGHT = window.innerHeight;
	//camera = new _camera(new _VECTOR3D(0,0,0));
	return true;
}
ctx.setColor = function(col) {
	ctx.strokeStyle = col
	ctx.fillStyle = col
}
