//moving to coords
//drawing modes (fast/scanlines)
//more swatches

init = function() {
	ctx.init()
	addEventListener("keydown",handleKeyDown);//need to add "interrupt" handlers to keyboard lib
	addEventListener("mousedown",handleMouseCLick);//will update mouse lib later

	resetView()
	ctx.font = "12px sans-serif"
	currentLine = 0

	loop();
}

resetView = function() {
	ITERATIONS = 100
	RES = Math.max(3.5/SCREENWIDTH,2/SCREENHEIGHT)//set up the scale
	var CENTEROFFSET = RES==(3.5/SCREENWIDTH)?{x:0,y:((3.5/SCREENWIDTH)*SCREENHEIGHT)-2}:{x:((2/SCREENHEIGHT)*SCREENWIDTH)-3.5,y:0}//sets up the offset needed to center the set
	STARTX = (2.5+(CENTEROFFSET.x/2))//the top corner of the set
	STARTY = (1+(CENTEROFFSET.y/2))
}

mandelbrot = function(x0,y0,imax)//returns percentage of amount of iterations until it bailed
{//track set and bail when a pattern is detected
	var x=0,y=0,xt,yt;//mandel scale x(-2.5,1),y(-1,1)

	for (i=0;i<imax;i++) {
		xt = x * x - y * y + x0;
		yt = 2 * x * y + y0;
		if (xt*xt + yt*yt > 4) return i/imax;
		x = xt;
		y = yt;
	}

	return imax/imax;
}

handleMouseCLick = function(e) {
	//console.log((e.clientX*RES)-STARTX,(e.clientY*RES)-STARTY)
	centerOn(STARTX-(e.clientX*RES),STARTY-(e.clientY*RES),RES/2);
}
handleKeyDown = function(e) {
	if (e.key.toLowerCase()=="r") {
		resetView()
		currentLine = 0
		loop()
	}
	if (e.key.toLowerCase()=="arrowup") {
		ITERATIONS*=2
		currentLine = 0
		loop()
	}
	if (e.key.toLowerCase()=="arrowdown") {
		ITERATIONS/=2
		currentLine = 0
		loop()
	}
}

centerOn = function(x,y,r) {//sets corner coords and zoom at given center and zoom
	RES = r
	STARTX = x+((SCREENWIDTH*RES)/2);
	STARTY = y+((SCREENHEIGHT*RES)/2);
	currentLine = 0
	loop()
}

setColor = function(color) {//greyscale colorset
	color = (color)*255
	ctx.setColor("rgba("+color+","+color+","+color+",1)")
}

drawSwatch = function(x,y,w,h) {//maybe lower the swatch's res if it takes too much time
	ctx.clearRect(x,y,w,h)
	ctx.setColor("white")
	ctx.strokeRect(x,y,w,h)
	for (var i=0;i<w;i++) {
		setColor(i/w)
		ctx.fillRect(x+i,y,1,h)
	}
}

drawOSD = function() {
	ctx.clearRect(0,0,210,50)
	ctx.setColor("white")
	ctx.fillText("Mandlebrot viewer",0,12)
	ctx.fillText("Click to zoom into a location",0,24)
	ctx.fillText("Press 'R' to reset",0,36)
	ctx.fillText("Use arrow up/down to change precision",0,48)
}

drawError = function() {
	var x = (SCREENWIDTH/2)-(ctx.measureText("Hey now! Calm it down... JS cant handle much more zooming").width/2)
	var y = (SCREENHEIGHT/2)+6
	ctx.clearRect(x-6,y-12,(ctx.measureText("Hey now! Calm it down... JS cant handle much more zooming").width+12),24)
	ctx.setColor("white")
	ctx.fillText("Hey now! Calm it down... JS cant handle much more zooming",x,y)
}

draw = function() {
	y = currentLine
	for(var x=0;x<SCREENWIDTH;x++) {
		setColor((mandelbrot((x*RES)-STARTX,(y*RES)-STARTY,ITERATIONS)))
		ctx.fillRect(x,y,1,1)
	}
	ctx.setColor("red")
	ctx.fillRect(0,y+1,SCREENWIDTH,1)
	
	drawSwatch(SCREENWIDTH-100,0,100,10)
	drawOSD()
}

loop = function() {
	if (currentLine<SCREENHEIGHT) requestAnimationFrame(loop)
	if (RES<1e-16) drawError()
	draw()
	currentLine++
}

window.onload = init;
