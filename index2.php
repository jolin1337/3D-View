﻿<html>
<head>
<title>3D - View</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<link type="text/css" href="/lib.html/jquery-ui-1.8.17/css/custom-theme/jquery-ui-1.8.17.custom.css" rel="stylesheet" />	
<script type="text/javascript" src="/lib.html/jquery-ui-1.8.17/js/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="/lib.html/jquery-ui-1.8.17/js/jquery-ui-1.8.17.custom.min.js"></script>
<script src="./src2/themesSource.js" ></script>
<script type="text/javascript">
/************ --    Keypad   -- ***********/
/************ --  EventKeys  -- ***********/
//           55  104  57
//            \   +   /
//             \  +  /
//              \ + /
//                  
//  100  ++++++  101  +++++++  102
//                  
//              / + \
//             /  +  \
//            /   +   \
//           97   98   76
//
/************ --   Numkeys   -- ***********/
//           7    8    9
//            \   +   /
//             \  +  /
//              \ + /
//                  
//    4  +++++++  5  ++++++++  6
//                  
//              / + \
//             /  +  \
//            /   +   \
//           1    2    3
/************ --    Keypad   -- ***********/

	var frame=false;
	var typeInter=1;
	var history=[];
	var historyIndex=-1;
	var can=0;
	function steptrow(e){
		if(!history.length)return false;
		
		if(e==38||e==40){
			$('#command').val(history[historyIndex]);
			if(e==38)//upp
				historyIndex--;
			if(e==40)
				historyIndex++;
		}
	}
	function addError(text){
		$('#inf').html(function(i,c){
			return '<br/><div class="ui-state-error ui-corner-all" style="padding: 0 .7em;">'+
				'<p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>'+
				'<span>'+text+'</span>'+
			'</p></div>'+c
		});
	}
	function addInfo(text){
		$('#inf').html(function(i,c){
			return '<br/><div class="ui-state-highlight ui-corner-all" style="padding: 0 .7em;">'+
				'<p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>'+
				'<span>'+text+'</span>'+
			'</p></div>'+c
		});
	}
	function edit_de(text,id){
		$('#inf div:eq('+id+') p span:eq(1)').html(text);
	}
	function clear_de(){
		$('#inf').empty();
	}
	$(function(){
		can=$("#test")[0];
		ct2=can.getContext("2d");
		ct2.translate(innerWidth/2,innerHeight/2);
		can.style.position='absolute';
		can.style.top=0;
		can.style.left=0;
		can.width=innerWidth;
		can.height=innerHeight;
		can.style.zIndex="100";
		can.style.background="rgba(255,255,255,0)";
		//can.style.background="#fff";
		load();
		svg=$(".view3D").css('display')!='none';
		/*$('.view3D').toggle(
			function () {
				$(".view3D").css({display: "block"});
			}, 
			function () {
				$(".view3D").css({display: "none"});
			}
		);*/
		if (window.addEventListener) { //IE9 - Other
			can.addEventListener ("mouseup", mouseReleased, false);
			can.addEventListener ("mousedown", mousePressed, false);
			can.addEventListener ("mousemove", mouseDragged, false);
			can.addEventListener ("keydown", keyDown, false);
			//window.addEventListener ("keydown", keyDown, false);
			
			/*var j=$('#joystick');
			j.bind ("mouseup", mouseReleased);
			j.bind ("mousedown", mousePressed);
			j.bind ("mousemove", mouseDragged);*/
		}
		$('svg.view3D').css('background',ThemeView3D.windowBackground);
		$('#dialog_link').click(function(){
			$('#dialog').dialog('open');
			return false;
		});
		
		$('#dialog_link, ul#icons li').hover(
			function() { $(this).addClass('ui-state-hover'); }, 
			function() { $(this).removeClass('ui-state-hover'); }
		);
		onkeydown=function(e){
			if(String.fromCharCode(e.keyCode)=='I'&&(e.ctrlKey||e.metaKey)){$('#dialog').parent().toggle();return false;}
			return true;
		};

		$('.boolean').button();
	});
	function svgMode(){
		$('.view3D').toggle();
	}	
	function styleObject (obj,rule) {
		var styleTag = document.getElementById("styleObjects");
		var sheet = styleTag['sheet'] ? styleTag.sheet : styleTag.styleSheet;
		
		if (sheet['insertRule']) { //IE9 - Other
			sheet.insertRule (obj+'{'+rule+'}', 0);
		}
		else {  // BIE9
			if (sheet.addRule) {
				sheet.addRule (obj, rule, 0);
			}
		}
	}
	window.onerror=function(msg, url, lineNo){
		if (can.removeEventListener&&window['mouseReleased']) {   // all browsers except IE before version 9
			can.removeEventListener ("mouseup", mouseReleased, true);
			can.removeEventListener ("mousedown", mousePressed, true);
			can.removeEventListener ("mousemove", mouseDragged, true);
			can.removeEventListener ("keydown", keyDown, true);
		}
		var b=document.getElementById('error');
		if(b){
			b.getElementsByTagName('span')[2].innerHTML=msg+" in "+url.split('/')[url.split('/').length-1]+" on line:"+lineNo;
			b.style.display='block';
		}
	};
	var easeOut=function (C){return 1-B(1-C,A);};
	function putThere(o){
		var j=$('#joystick');
		if(event.x<20)
			j.css('left',-260);
		else
			j.css('left',-280);
	}
	function bring(){
		var j=$('#joystick');
		j.css('left',0);
	}
	function setInteractor(type){
		if(type=='scroll-wheel')
			typeInter=1;
		else if(type=='left-mouse')
			typeInter=0;
		else if(type=='right-mouse')
			typeInter=2;
	}
</script>
<style type="text/css">
	body{ font: 62.5% "Trebuchet MS", sans-serif; margin: 0px;overflow:hidden;}
	#joystick{
		-webkit-transition: all 1s ease-out;
	}

	#props{
		position:absolute;
		top:0px;
		right:0px;
		background:rgba(50,50,50,0.8);
		width:290px;
		height:90%; /*#calc(100% - 55px);*/
		padding:50px 5px 5px 10px;
		overflow-y:auto;
		overflow-x:hidden;
		z-index:100;
	}
		#props h1{
			font-size:18pt;
			color:#fff;
		}
		#props .containter{
			margin-left:20px;
			padding:0 20px 0 20px;
			background:rgba(20,20,20,0.5);
			border:1px solid #997;
			border-radius:5px;
			color:#f88;
		}
			#props .containter input{
				border-radius:2px;
				border:0px;
				background:#333;
				margin-bottom:9px;
				color:#fff;
			}
</style>
<style id="styleObjects" >
</style>
<script type="text/javascript" language="Javascript">
function scrolltop(){scroll(0,0);}
</script>
<script src="src2/worker_Classes.js" ></script>
<script src="src2/Static_Prototypes.js" ></script>
<script src="src2/ArcBallJS2.js" ></script>
</head>
<body onresize="load();" >
		<div id="joystick" onclick="bring();" style="display:none;background:#000;width:300px;height:300px;position:absolute;top:50px;left:-280px;" >
			<div style="width:10px;height:100%;float:right;" onmousemove="putThere();" ></div>
			<div onclick=""  style="background:#fff;height:100%;width:280px;float:left;" >
			X
			</div>
		</div>
		<div style="height:100%;width:100%;overflow:hidden;">
		<div id="error" style="position:absolute;z-index:1000000;color:#fff;margin-top:50%;width:100%;text-align:center;display:none;" >
			<p><span class="ui-state-error ui-corner-all" style="margin:10px;padding:100px;padding-top:20px;padding-bottom:10px;">
				<span style="font-size:15pt;color:#ffcccc;" >Error:</span>
				<span> Here goes the message</span>. <a href="javascript:location=location.href;" >Reload</a> the page to try again.
			</span></p>
		</div>
		<!--<svg class="view3D" style="display:none;" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<svg x="50%" y="50%" style="overflow:auto;" >
				<g transform="translate(500,500);" id="View3D"> 
				</g>
			</svg>
			<defs>
				<marker id="vertex"
				  viewBox="0 0 120 120" refX="60" refY="60" 
				  markerUnits="strokeWidth"
				  markerWidth="3" markerHeight="3"
				  orient="0" style="fill: black;">
					
					<path d="M 0 0 L 120 0 L 120 120 L 0 120 L 0 0 z" />
				</marker>
				<marker id="Selectedvertex"
				  viewBox="0 0 120 120" refX="60" refY="60" 
				  markerUnits="strokeWidth"
				  markerWidth="10" markerHeight="10"
				  orient="0" style="fill: black;">
					
					<path d="M 0 0 L 120 0 L 120 120 L 0 120 L 0 0 z" />
				</marker>
			</defs>
		</svg>-->
		<canvas id="test" onselectstart="return false;" ></canvas>	
		<canvas id="View"></canvas>	
		</div>

<div id="props">
	<h1>Properties:</h1>

	<h2>SpaceView3D:</h2>
	<div class="containter">
		<div id="SpaceView3D" >
		<script type="text/javascript" >
		function spUpdateInputs(obj,opt){
			try{
				SpaceView3D[opt]=eval(obj.value);
			}catch(e){
				if(SpaceView3D[opt].src)
					SpaceView3D[opt].src=obj.value;
				else
					SpaceView3D[opt]=obj.value;
			};
			load();
			render();
			obj.blur();
		}
		var SpaceView3D = SpaceView3D || {};
		var tmpStr="";
		for(var i in SpaceView3D){
			try{
			if(typeof SpaceView3D[i] == "boolean" )
				tmpStr+="<p><label for='SpaceView3D."+i+"' >"+i.replace(/_/g," ") +"</label><input type='checkbox' "+(SpaceView3D[i]?"checked":"")+" onclick='SpaceView3D[\""+i+"\"]= !SpaceView3D[\""+i+"\"];render();' class='"+ (typeof SpaceView3D[i]) +"' onblur='//spUpdateInputs(this,\""+i+"\");' id='SpaceView3D."+i+"' /></p>";
			else if(typeof SpaceView3D[i] == "string")
				tmpStr+="<label for='SpaceView3D."+i+"' >"+i.replace(/_/g," ")+'('+ (typeof SpaceView3D[i] )  +"):</label><br/><input type='text' class='"+ (typeof SpaceView3D[i]) +"' onkeydown='if(event.keyCode==13) spUpdateInputs(this,\""+i+"\");' onblur='spUpdateInputs(this,\""+i+"\");' id='SpaceView3D."+i+"' value='"+(SpaceView3D[i]!=undefined?SpaceView3D[i].toString():null)+"' /><br/>";
			else if(typeof SpaceView3D[i] == "number")
				tmpStr+="<label for='SpaceView3D."+i+"' >"+i.replace(/_/g," ")+'('+ (typeof SpaceView3D[i] )  +"):</label><br/><input type='text' class='"+ (typeof SpaceView3D[i]) +"' onkeydown='if(event.keyCode==13) spUpdateInputs(this,\""+i+"\");' onblur='spUpdateInputs(this,\""+i+"\");' id='SpaceView3D."+i+"' value='"+(SpaceView3D[i]!=undefined?SpaceView3D[i].toString():null)+"' /><br/>";
			else if(typeof SpaceView3D[i] == "object")
				tmpStr+="<label for='SpaceView3D."+i+"' >"+i.replace(/_/g," ")+'('+ (typeof SpaceView3D[i] )  +"):</label><br/><input type='text' class='"+ (typeof SpaceView3D[i]) +"' onkeydown='if(event.keyCode==13) spUpdateInputs(this,\""+i+"\");' onblur='spUpdateInputs(this,\""+i+"\");' id='SpaceView3D."+i+"' value='"+(SpaceView3D[i]!=undefined?SpaceView3D[i].toString():null)+"' /><br/>";
			}catch(e){}
		}
		$("#SpaceView3D").html(tmpStr);
		</script>
		</div>
	</div><br/>
	<h2>ThemeView3D:</h2>
	<div class="containter">
		<script type="text/javascript" >
			function thUpdateInputs(obj,opt){
				try{
					ThemeView3D[opt]=eval(obj.value);
				}catch(e){
					ThemeView3D[opt]=obj.value;
				};
				load();
				render();
				obj.blur();
			}
			var ThemeView3D = ThemeView3D || {};
			for(var i in ThemeView3D){
				document.write("<label for='ThemeView3D."+i+"' >"+i.replace(/_/g," ")+':<br/><input type="text" onblur="thUpdateInputs(this,\''+i+'\');" onkeydown="if(event.keyCode==13)thUpdateInputs(this,\''+i+'\');" value="'+ThemeView3D[i]+'" id="ThemeView3D.'+i+'" /><br/>');
			}
		</script>
	</div><br/>
</div>
</body>
</html>