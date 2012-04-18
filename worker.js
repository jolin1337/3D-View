importScripts("src2/worker_Classes.js");
self.onmessage=function(event){
	var obj = Load_obj(event.data);
	self.postMessage(obj);
};