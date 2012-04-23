
var themes=themes||{};
themes.shadeColor=function(num,color){
	var colorD=num*2.55;
	//colorD<0?(colorD*=-1):false;
	var toHex = J3DL.Convert.toHexArray(color);
	var color1=toHex[0]*num/100;
	var color2=toHex[1]*num/100;
	var color3=toHex[2]*num/100;
	color1=parseInt(color1);
	color2=parseInt(color2);
	color3=parseInt(color3);
	if(num){
		return "rgba("+(toHex[0]+color1)+","+(toHex[1]+color2)+","+(toHex[2]+color3)+","+1+")";
	}
	return "rgba("+toHex[0]+","+toHex[0]+","+toHex[0]+","+toHex[0]+")";
};
themes.userInterface={
	width:91,
	borderRadius:10,
	regular:{
		outline:"#191919",
		item:"#191919",
		inner:"#999999",
		innerSelected:"#646464",
		text:"#000000",
		textSelected:"#ffffff",
		shaded:function() {
			this.disabled=true;
			this.top=0;
			this.down=0;
		}
	},
	tool:{
		outline:"#191919",
		item:"#191919",
		inner:"#999999",
		innerSelected:"#646464",
		text:"#000000",
		textSelected:"#ffffff",
		shaded:function(){
			this.disabled=false;
			this.top=15;
			this.down=-15;
		}
	},
	radioButtons:{
		outline:"#000000",
		item:"#ffffff",
		inner:"#464646",
		innerSelected:"#5680C2",
		text:"#000000",
		textSelected:"#ffffff",
		shaded:function(){
			this.disabled=false;
			this.top=15;
			this.down=-15;
		}
	},
	text:{
		outline:"#191919",
		item:"#5A5A5A",
		inner:"#999999",
		innerSelected:"#999999",
		text:"#000000",
		textSelected:"#ffffff",
		shaded:{
			disabled:false,
			top:0,
			down:25
		}
	},
	option:{
		outline:"#000000",
		item:"#ffffff",
		inner:"#464646",
		innerSelected:"#464646",
		text:"#000000",
		textSelected:"#ffffff",
		shaded:function(){
			this.disabled=false;
			this.top=15;
			this.down=-15;
		}
	},
	toggle:{
		outline:"#191919",
		item:"#191919",
		inner:"#999999",
		innerSelected:"#646464",
		text:"#000000",
		textSelected:"#ffffff",
		shaded:function(){
			this.disabled=true;
			this.top=0;
			this.down=0;
		}
	},
	numberField:{
		outline:"#191919",
		item:"#5A5A5A",
		inner:"#B4B4B4",
		innerSelected:"#999999",
		text:"#000000",
		textSelected:"#ffffff",
		shaded:{
			disabled:false,
			top:-20,
			down:0
		}
	},
	valueSlider:{
		outline:"#191919",
		item:"#808080",
		inner:"#B4B4B4",
		innerSelected:"#999999",
		text:"#000000",
		textSelected:"#ffffff",
		shaded:function(){
			this.disabled=false;
			this.top=-20;
			this.down=0;
		}
	},
	box:{
		outline:"#191919",
		item:"#191919",
		inner:"#808080",
		innerSelected:"#646464",
		text:"#000000",
		textSelected:"#ffffff",
		shaded:function(){
			this.disabled=true;
			this.top=0;
			this.down=0;
		}
	},
	menu:{
		outline:"#000000",
		item:"#ffffff",
		inner:"#464646",
		innerSelected:"#464646",
		text:"#ffffff",
		textSelected:"#CCCCCC",
		shaded:function(){
			this.disabled=false;
			this.top=15;
			this.down=-15;
		}
	},
	pullDown:{
		outline:"#000000",
		item:"#ffffff",
		inner:"#3F3F3F",
		innerSelected:"#5680C2",
		text:"#000000",
		textSelected:"#000000",
		shaded:function(){
			this.disabled=true;
			this.top=25;
			this.down=-20;
		}
	},
	menuBack:{
		outline:"#000000",
		item:"#646464",
		inner:"rgba(25,25,25,0.9)",
		innerSelected:"rgba(45,45,45,0.9)",
		text:"#A0A0A0",
		textSelected:"#ffffff",
		shaded:function(){
			this.disabled=true;
			this.top=25;
			this.down=-20;
		}
	},
	menuItem:{
		outline:"#000000",
		item:"#ffffff",
		inner:"rgba(0,0,0,0)",
		innerSelected:"#5680C2",
		text:"#ffffff",
		textSelected:"#000000",
		shaded:{
			disabled:true,
			top:38,
			down:0
		}
	},
	scrollBar:{
		outline:"#323232",
		item:"#808080",
		inner:"rgba(80,80,80,0.71)",
		innerSelected:"rgba(100,100,100,0.71)",
		text:"#000000",
		textSelected:"#ffffff",
		shaded:function(){
			this.disabled=false;
			this.top=5;
			this.down=-5;
		}
	},
	progressBar:{
		outline:"#000000",
		item:"#444444",
		inner:"#BEBEBE",
		innerSelected:"rgba(100,100,100,0.71)",
		text:"#000000",
		textSelected:"#ffffff",
		shaded:function(){
			this.disabled=true;
			this.top=5;
			this.down=-5;
		}
	},
	listItem:{
		outline:"#000000",
		item:"#444444",
		inner:"rgba(0,0,0,0)",
		innerSelected:"#5680C2",
		text:"#000000",
		textSelected:"#000000",
		shaded:function(){
			this.disabled=true;
			this.top=0;
			this.down=0;
		}
	},
	state:{
		animated:"#73BE4C",
		animatedSelected:"#5AA633",
		driven:"#B400FF",
		drivenSelected:"#9900E6",
		keyFrame:"#F0EB64",
		keyFrameSelected:"#D7D34B",
		blend:0.5
	},
};
themes.view3D={
	activeObject:"#FF8C19",
	activeSpline:"#DB2512",
	alignHandleSelectedColor:"#F090A0",
	autoHandleSelectedColor:"#F090A0",
	boneSoid:"#C8C8C8",
	edgeCrease:"#CC0099",
	edgeSeam:"#DB2512",
	edgeEdgeSharp:"#FF2020",
	face:"rgba(0,0,0,0.07)",
	faceAreaText:"#000080",
	faceNormal:"#22DDDD",
	freeHandleColor:"#000000",
	grid:"#404040",
	headerText:"#000000",
	lamp:"rgba(0,0,0,0.16)",
	nurbU_Lines:"#909000",
	nurbActiveU_Line:"#F0FF40", 
	groupObjects:"#083008",
	selectedObjects:"#F15800",
	regionBackground:"#727272",
	regionTextHighlight:"#FFFFFF",
	text:"#000000",
	titles:"#000000",
	vectorHadleColor:"#409030",
	vertex:"#000000",
	vertexSelect:"#FF8500",
	wire:"#000000", //default #000000
	activeMeshPropColor:"rgba(255,255,255,0.5)",
	alignHandleColor:"#803060",
	autoHandleColor:"#909000",
	bonePose:"#50C8FF",
	currentFrame:"#60C040",
	edgeLength:"#200000",
	edgeSelect:"#FFA000",
	edgeUVFaveSelect:"#4B4B4B",
	faceAlignText:"#4B4B4B",
	faceAngleText:"#002000",
	faceDotSelected:"#FF8500",
	faceSelected:"rgba(255,133,0,0.24)",	//0x85
	freeHandleSelectedColor:"#000000",
	header:"#727272",
	headerTextHighlight:"#FFFFFF",
	LastSelectedPoint:"#FFFFFF",
	nurbVLines:"#803060",
	nurbActiveVLines:"#F090A0",
	activeGroupedObject:"#55BB55",
	panel:"rgba(165,165,165,0.5)",			//0xA5
	regionText:"#000000",
	regionTextTitles:"#000000",
	textHighLight:"#FFFFFF",
	transform:"#FFFFFF",
	vectorHandleSelectedColor:"#40C030",
	vertexNormal:"#2361DD",
	windowBackground:"#393939",
	outlineWidth:1,
	FaceDotSize:4
	
};
var ThemeView3D={
	
	activeObject:"#FF8C19",
	activeSpline:"#DB2512",
	alignHandleSelectedColor:"#F090A0",
	autoHandleSelectedColor:"#F090A0",
	boneSoid:"#C8C8C8",
	edgeCrease:"#CC0099",
	edgeSeam:"#DB2512",
	edgeEdgeSharp:"#FF2020",
	face:"rgba(0,0,0,0.07)",
	faceAreaText:"#000080",
	faceNormal:"#22DDDD",
	freeHandleColor:"#000000",
	grid:"#404040",
	headerText:"#000000",
	lamp:"rgba(0,0,0,0.16)",
	nurbU_Lines:"#909000",
	nurbActiveU_Line:"#F0FF40", 
	groupObjects:"#083008",
	selectedObjects:"#F15800",
	regionBackground:"#727272",
	regionTextHighlight:"#FFFFFF",
	texwiret:"#000000",
	titles:"#000000",
	vectorHadleColor:"#409030",
	vertex:"#000000",
	vertexSelect:"#FF8500",
	wire:"#000000", //default #000000
	activeMeshPropColor:"rgba(255,255,255,0.5)",
	alignHandleColor:"#803060",
	autoHandleColor:"#909000",
	bonePose:"#50C8FF",
	currentFrame:"#60C040",
	edgeLength:"#200000",
	edgeSelect:"#FFA000",
	edgeUVFaveSelect:"#4B4B4B",
	faceAlignText:"#4B4B4B",
	faceAngleText:"#002000",
	faceDotSelected:"#FF8500",
	faceSelected:"rgba(255,133,0,0.24)",	//0x85
	freeHandleSelectedColor:"#000000",
	header:"#727272",
	headerTextHighlight:"#FFFFFF",
	LastSelectedPoint:"#FFFFFF",
	nurbVLines:"#803060",
	nurbActiveVLines:"#F090A0",
	activeGroupedObject:"#55BB55",
	panel:"rgba(165,165,165,0.5)",			//0xA5
	regionText:"#000000",
	regionTextTitles:"#000000",
	textHighLight:"#FFFFFF",
	transform:"#FFFFFF",
	vectorHandleSelectedColor:"#40C030",
	vertexNormal:"#2361DD",
	windowBackground:"#393939",
	outlineWidth:1,
	FaceDotSize:4,
	
	drawNormals:false,
	normalLength:1,
	vertexSize:3
	
};
var transform_orientation_enum={ "GLOBAL":0, "LOCAL":1, "GIMBAL":2, "NORMAL":3, "VIEW":4, "CUSTOM":5 };
Object.freeze(transform_orientation_enum);

var pivot_point_enum={ "BOUNDING_BOX_CENTER":0, "CURSOR":1, "INDIVIDUAL_ORIGINS":2, "MEDIAN_POINT":3, "ACTIVE_ELEMENT":4 };
Object.freeze(pivot_point_enum);

var SpaceView3D={
	camera:null,
	clip_end:1000.0,
	clip_start:0.1,
	current_orientation:function (){return null},
	cursor:(function(){
		var img=new Image();
		img.onload=function(){
			this.complete=true;
		};
		img.src="./images/cursor.png";
		img.toString=function(){return this.src;};
		return img;
	})(),			//hidden
	cursor_location:(function(){
		return new Vertex();
	})(),
	show_cursor:true,
	grid_lines:16,
	grid_scale:1.0,
	grid_subdivisions:10,
	layers:[ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
	layewirers_used:function(){return [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ];},
	lens:0.0,
	local_view:function(){return this;},
	lock_bone:"",
	lock_camera:false,
	lock_camera_and_layers:false,
	lock_cursor:false,
	lock_object:null,
	pivot_point:pivot_point_enum["BOUNDING_BOX_CENTER"],
	region_3d:null,
	region_quadview:null,
	show_all_objects_origin:false,
	show_axis_x:true,
	show_axis_y:true,
	show_axis_z:false,
	show_background_images:false,
	show_floor:false,
	show_outline_selected:false,
	show_relationship_lines:false,
	show_textured_solid:false,
	transform_orientation:transform_orientation_enum["GLOBAL"],
	use_manipulator_rotate:false,
	use_manipulator_scale:false,
	use_manipulator_translate:false,
	use_occlude_geometry:false,
	use_pivot_point_align:false,
	viewport_shade:"solid",
	debug: false
};
var view3D={
	ii:true,
	perspectiveOtho:function(){
		view3D.ii=(view3D.ii==true?false:true);
	},
	MODE:"objectmode",	// editmode, objectmode
	toggle:function(str,v1,v2){
		if(v1)
			view3D[str] = (view3D[str] == v1?(v2?v2:v1):v1);
		else
			view3D[str] = (view3D[str]?false:true);
	}
};
