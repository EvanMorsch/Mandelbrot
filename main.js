//create a centering function
//zooming
//moving
//changing iterations
//drawing modes (fast/scanlines)
//osd

init = function() {
	ctx.init()

	RES = Math.max(3.5/SCREENWIDTH,2/SCREENHEIGHT)//set up the scale
	var CENTEROFFSET = RES==(3.5/SCREENWIDTH)?{x:0,y:((3.5/SCREENWIDTH)*SCREENHEIGHT)-2}:{x:((2/SCREENHEIGHT)*SCREENWIDTH)-3.5,y:0}//sets up the offset needed to center the set
	STARTX = (2.5+(CENTEROFFSET.x/2))//the top corner of the set
	STARTY = (1+(CENTEROFFSET.y/2))
	currentLine = 0

	loop();
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

setColor = function(color) {
	ctx.setColor("rgba("+color+","+color+","+color+",1)")
}

draw = function() {
	y = currentLine
	for(var x=0;x<SCREENWIDTH;x++) {
		setColor((mandelbrot((x*RES)-STARTX,(y*RES)-STARTY,100)*255))
		ctx.fillRect(x,y,1,1)
	}
	ctx.setColor("red")
	ctx.fillRect(0,y+1,SCREENWIDTH,1)
}

loop = function() {
	if (currentLine<SCREENHEIGHT) requestAnimationFrame(loop)
	draw()
	currentLine++
}

window.onload = init;
