/**
 * @author Johannes Lindén / Uniq
 */

if(window){
	//THEME:
	if (window['themes'] === undefined)document.write('<script src="http://dl.dropbox.com/u/8057785/blenderHTML/js/themesSource.js" ></script>');
	
	//TOOLS:
	if (window['Vector'] === undefined){
		document.write('<script src="src2/worker_Classes.js" ></script>');
		document.write('<script src="src2/Static_Prototypes.js" ></script>');
	}
	//Renderer:
	if(window['Rendering'] === undefined|| typeof Rendering != 'object')
		document.write('<script src="src2/renderer.js" ></script>');
}
else if(self.importScripts){	// if webworker form
	importScripts('http://dl.dropbox.com/u/8057785/blenderHTML/js/themesSource.js');			//THEME
	importScripts('src2/worker_Classes.js');		//TOOLS
	importScripts('src2/Static_Prototypes.js');		//Static TOOLS
	innerWidth=600;
	innerHeight=600;
	self.addEventListener('message',function(e){
		if(e.data.indexOf('load')!=-1)
			load(e.data);
	});
}

//Arc - Ball
var Light=function(hex,intent){
	this.color = new color(hex);
	this.position = new Vector( 0, 0, 500 );
	this.intensity = intent || 1;
};
Light.prototype={
	toString:function(){
		return "{"+this.color+","+this.position+"}";
	}
};
var canvas,context;
var scene,camera,renderer;
function load(e){

	if(self['window']){
		canvas=document.getElementById('View')||0;
		can = document.getElementById("test");
	}
	else
		canvas = postMessage("");
	context=(canvas?canvas.getContext('2d'):new Canvas());
	cantext=(can?can.getContext('2d'):new Canvas());
	
	if(scene == undefined){
		prop=document.getElementById('props');

		scene = new Scene();
		camera = new Camera();
		renderer = new Rendering();

		mouseRay = new Ray();
		mouseRay.shape = "Circle";
		mouseRay.radius = 20;
		mouseRay.point1.position.z = 0;		// not nessesary
		mouseRay.point2.position.z = 500;	// not nessesary

		can.style.position = canvas.style.position = 'absolute';
		can.style.top = canvas.style.top=0;
		can.style.left = canvas.style.left=0;

		cantext.shadowBlur = context.shadowBlur = 1;
		can.style.background = canvas.style.background = "rgba(0,0,0,0)";

		init();
		document.body.style.background=ThemeView3D.windowBackground;// default = "#393939";
		
	}
	can.width = canvas.width=innerWidth;
	can.height = canvas.height=innerHeight;

	prop=document.getElementById('props');
	width = canvas.width -( prop&&prop.style.display == "block"?prop.offsetWidth:0 );
	context.translate(canvas.width/2 -( prop&&prop.style.display == "block"?prop.offsetWidth/2:0 ),canvas.height/2);
	cantext.translate(can.width/2 -( prop&&prop.style.display == "block"?prop.offsetWidth/2:0 ),can.height/2);
	camera.quaternion = current_quaternion;
	render();

	return canvas;
};

/**
 * start och slut på musklick i sfären
 */
var rot_start, rot_end;
var zo_start, zo_end, zoom = 1, zoomFactor = 0.02;

/**
 *	Miljöns berd och höjd (100%, 100%)
 */
var width=innerWidth,height=innerHeight;

/**
 * en ray som anger ett område från kameran till en punkt
 */
var mouseRay;

/**
 * fasta lägen för kameran 
 */
var goal_quaternions = [
	new Quaternion(1,new Vector(0,0,0)),						// 7 btn
	new Quaternion(0.707,new Vector(0.707,0,0)),				// 3 btn
	new Quaternion(0.5,new Vector(0.5,0.5,-0.5)),				// 1 btn
	
	new Quaternion(-90,new Vector(-45,45/2,-45)),				//start pose	
];
if(window) {
	/*
	 * the property-pane element
	 */
	var prop;
}

/**
 * hur skall första vyn se ut?
 */
var current_quaternion = goal_quaternions[3];

/**
 * beskriver förändringen i vyn under onMouseDrag(mouse) funktionen
 */
var delta_quaternion = goal_quaternions[0];

/**
 * hanterar vilken typ av ändring som skall göras i miljön med musen
 */
var ROTATION_FLAG = false, ZOOM_FLAG = false, GRAB_FLAG = false;

/**
 * om HAS_DRAGED == true så har vi börjat att rotera
 * annars HAS_DRAGED == false (default) vi kan göra andra operationer
 */
var HAS_DRAGED = false;

/**
 * En array med de punkter som är valda av användaren
 */
 var active_vertices = [];

/*=========================== ACTIONS =======================================================================*/
/**
 * anropas som en init när man skall börja förändra något i miljön med musen
 */
function mousePressed(mouse) {
    if((mouse.button==typeInter||mouse.button==0)&&!mouse.ctrlKey||(mouse['touches']&&mouse.touches.length>=1)){
		ROTATION_FLAG = true;
		if(mouse['touches'] != undefined)
			rot_start = computeSphereVector(mouse['touches'][0].pageX, mouse['touches'][0].pageY);
		else
			rot_start = computeSphereVector(mouse.clientX, mouse.clientY);
	}
	else if(mouse.button==0&&mouse.ctrlKey){
		ZOOM_FLAG=true;
		zo_start = new Vector(mouse.clientX,mouse.clientY,1);
	}
	HAS_DRAGED=false;
	return false;
}

/**
 * anropas så fort musen rör sig, synkroniserad
 */
function mouseDragged(mouse){
	if (ROTATION_FLAG){
		HAS_DRAGED=true;
		if(mouse['touches'] != undefined)
			rot_end = computeSphereVector(mouse['touches'][0].pageX, mouse['touches'][0].pageY); //calc position ArcBall;
		else
			rot_end = computeSphereVector(mouse.clientX, mouse.clientY); //calc position ArcBall;

		delta_quaternion.x=Vector.dot(rot_start,rot_end);
		delta_quaternion.u=rot_start.cross(rot_end); 				//calc delta move;
		rot_start = rot_end;    
		camera.quaternion=current_quaternion = delta_quaternion.mult(camera.quaternion).normalize();
		render();
	}
	else if(ZOOM_FLAG){
		HAS_DRAGED=true;
		zo_end = new Vector(mouse.clientX, mouse.clientY,1);
		var delta_zoom = new Vector(zo_start.x - zo_end.x, zo_start.y - zo_end.y,1);
		zoom+=delta_zoom.y*0.002;
		zo_start=zo_end;
		render();
	}
	else if(GRAB_FLAG){
		var inv = camera.quaternion.inverse();
		if( rot_start.x === -1.1 ){
			for( var i in active_vertices )
				active_vertices[i].realPosition = active_vertices[i].position;
			rot_start = new Vector( mouse.clientX, mouse.clientY, 0 );
		}
		else{
			rot_end = new Vector( mouse.clientX, mouse.clientY, 0 );
			//console.dir(rot_start.data(), rot_end.data());
			var f = new Vector(0,0,500);
			var s = Vector.sub( rot_start, rot_end );
			var k = s.y/s.x ;
			var vec = inv.actOn(s).normalize().mult(k);

			for( var i in active_vertices ){
				active_vertices[i].position = Vector.sub(active_vertices[i].realPosition, vec);
			}
			//rot_start = rot_end;
			render();
		}
	}
}

function mouseReleased(mouse){
	ROTATION_FLAG&&(ROTATION_FLAG=false);
	ZOOM_FLAG&&(ZOOM_FLAG=false);
	rot_start=rot_end;
	if( !GRAB_FLAG && !HAS_DRAGED && SpaceView3D.cursor_location && SpaceView3D.show_cursor && (mouse.button==typeInter||mouse.button==0)) {
		var inv = camera.quaternion.inverse();
		SpaceView3D.cursor_location.position = inv.actOn(
			new Vector( 
				mouse.clientX -  canvas.width/2 +( prop&&prop.style.display == "block"?prop.offsetWidth/2:0 ), 
				mouse.clientY -  canvas.height/2, 
				camera.quaternion.actOn(SpaceView3D.cursor_location.position).z
			));
		render();
	}
	else if( !GRAB_FLAG && !HAS_DRAGED && mouse.button == 2 ) {
		var v = new Vector(mouse.clientX - canvas.width/2 -( prop&&prop.style.display == "block"?prop.offsetWidth/2:0 ),mouse.clientY - canvas.height/2,500);
		//scene.objects[0].Faces[0].vertices[0].position = v;
		if((v=selection(v))) {
			try{
				v = v[0].split(',');
			}catch(e){
				try{
					v = v.split(',');
				}catch(e){
					return;
				}
			}
			if(!mouse.ctrlKey)
				disableObjects();
			try{
				scene.objects[v[0]].Faces[v[1]].vertices[v[2]].activeVertex = !scene.objects[v[0]].Faces[v[1]].vertices[v[2]].activeVertex;
			}catch(e){
				if(v.length > 2)
					scene.objects[v[0]].Faces[v[1]].handles[v[2]].activeSpline = !scene.objects[v[0]].Faces[v[1]].handles[v[2]].activeSpline;
				else
					scene.objects[v[0]].Faces[v[1]].activeSpline = !scene.objects[v[0]].Faces[v[1]].activeSpline;
			}
			render();
		}
	}
	else if(GRAB_FLAG){
		if ( mouse.button == 2 )
			for( var i in active_vertices)
				active_vertices[i].position = active_vertices[i].realPosition;
		active_vertices = [];
		GRAB_FLAG = false;
		render();
	}
} 

function keyDown(key){
	if(!ROTATION_FLAG&&key.target.tagName!="INPUT"){
		switch(key.keyCode) {
			case 97:		// 1 btn
				camera.quaternion=current_quaternion=goal_quaternions[2];
				break;
			case 99:		// 3 btn
				camera.quaternion=current_quaternion=goal_quaternions[1];
				break;
			case 103:	// 7 btn
				camera.quaternion=current_quaternion=goal_quaternions[0];
				break;
			case 101:	// 5 btn
				view3D.view_persportho();
				break;
			case key.DOM_VK_N:
				if( prop != null){
					prop.style.display = (prop.style.display=='block'?'none':'block');
					load();
				}
				break;
			case key.DOM_VK_G:
				GRAB_FLAG = true;
				active_vertices = renderer.getSelected(scene);
				rot_start = new Vector(-1.1,-1.1,-1.1);
				break;
			case key.DOM_VK_ESCAPE:
				if( GRAB_FLAG ) {
					GRAB_FLAG = false;
					for(var i in active_vertices)
						active_vertices[i].position = active_vertices[i].realPosition;
				}
				break;
			default:
				//console.log("Key: "+"("+key.keyCode+") whas pressed");
				//console.dir(key);
				break;
		}

		render();
	}
}
function init(){
	var objt  = [];
	var col= new color(100,100,100);
	var col2= new color(0,0,0);
	var yello = new color(255,255,1);
	var s=window.location.search.split(';');
	for(var i=0;i<s.length;i++){
		s[i]=s[i].replace("?","");
		if(s[i]=="Cube")
			objt[i] = new Cube(0,0,0,300,col, new color(255));
		else if(s[i]=="Circle")
			objt[i] = new Circle(0,0,0,300,15, col, new color(255));
		else if(s[i]=="Cylinder")
			objt[i] = new Cylinder(0,0,0,100,300,5, col, new color(255));
		else if(s[i]=="Plane")
			objt[i] = new Plane(0,0,0,300, col, new color(255));
		else if(s[i]=="TriForce")
			objt[i] = new TriForce(0,0,0,300,yello) ;
		else if(s[i]=="Test")
			objt[i] = new Test(0,0,0, col ,new color(255));
		else if(s[i]=="BeizerCurve")
			objt[i] = new BeizerCurve(0,0,0);
		else try{
			if ( s[i] != "" )
				objt[i] = eval(s[i].replace(/%20/gi," "));
			else throw new Error("ERRROR!");
		}
		catch(e){
			//objt[i] = new Cube(0,0,0,300,col,new color(255));
		}
		try{
			for( var i in objt[0].Faces){
				objt[0].Faces[i].material = new Material(255,255,255);
				//objt[0].Faces[i].material = new Material(parseInt(Math.random()*255),parseInt(Math.random()*255),parseInt(Math.random()*255));
				//objt[0].Faces[i].material.image= new Image();
				//objt[0].Faces[i].material.image.src="./images/littlebotbunny_art.jpg";
				objt[0].Faces[i].material.image.onload=function(){
					//console.log(this.complete);
				}
			}
		}catch(e){
			
		}
	}
	/*
	objt[1] = new Cube(150,0,0,40, new color(255,1,1), new color(255));
	objt[2] = new Cube(0,150,0,40, new color(0,255,0), new color(255));
	objt[3] = new Cube(0,0,150,40, new color(0,0,255), new color(255));*/

	//scene.addObject(new BeizerCurve(0,0,0));
	for(var i=0;i<objt.length;i++){
		objt[i].activeObject=true;
		if(objt[i]!==undefined)
			scene.addObject(objt[i]);
	}
	var l=new Light(255,1);
	scene.addLight(l);
}
function render(){  
	if(context){
		context.clearRect(
			-innerWidth/2 +( prop&&prop.style.display == "block"?prop.offsetWidth/2:0 ),
			-innerHeight/2,
			innerWidth,
			innerHeight);
		return renderer.render(scene,camera,{mode: view3D["MODE"]});
	}
	return true;
}

function disableObjects(){
	
	var all=(scene?scene.objects:arguments[1].objects),o=all.length;

	for(var i=0;i<o;i++) {
		var object = all[i];
		var ans = [];
		var f=object.Faces.length;

		for(var j=0;j<f;j++){
			var face = object.Faces[j];

			if ( face instanceof Face ) {
				face.activeFace=false;
				var v = face.vertices.length;

				for(var k=0;k<v;k++)
					face.vertices[k].activeVertex=false;
			}

			if ( face instanceof VertexC ) {
				var v = face.handles.length;
				face.activeSpline=false;

				for(var k=0;k<v;k++)
					face.handles[k].activeSpline=false;
			}
		}
	}
}

function selection(loc){
	if(context){
		loc.z = 500;
		mouseRay.point1.position = loc.clone();
		loc.z = 0;
		mouseRay.point2.position = loc.clone();
		var res = renderer.selectRay(mouseRay, {single:false,scene:scene, camera:camera});
		if(!res)return false;
		var I=res.length;
		for( var i= 0;i<I;i++ )
			for(var j=i+1; j<I;j++)
				if(res[i] == res[j])
					res.splice(j,1);
		return res;
	}
	return false;
}
/**
 * Beräkning av x och y muspositioner
 */ 
function computeSphereVector(x, y){
	var g = width/5.0;           //radien av sfären/globen

	var pX = (x-width/2.0)/g;    
	var pY = (y-height/2.0)/g;
	var L2 = pX*pX + pY*pY;
	var pZ = Math.sqrt(1); 
	return new Vector(pX, pY, pZ);
} 

var animater_quaternion = new Quaternion(1 ,  new Vector(0, 0, 0 ) )

//Animate
function animate(){
	var rs = computeSphereVector(1,1);
	var re = computeSphereVector(30,1);
	animater_quaternion.x=Vector.dot(rs,re);
	animater_quaternion.u=rs.cross(re); 				//calc delta move; 
	camera.quaternion = current_quaternion = animater_quaternion.mult(current_quaternion).normalize();
	render();	
	if(!window["stopAnimate"])
		window["setTimeout"]("animate()",70);
}