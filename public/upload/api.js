  // #EDITOR:DIRECTIVE:REFRESHOPENER/#
(function (win, doc, arg) {
	var $ = win[arg.root] = {
//		root : '_1234567890',		<-- remember this is passed in
//		type : 'input/fileupload',      <-- this too
		 arg : arg,
		 doc : doc,
		 win : win,
	   chunkSize : '',
	   jobstatus : '',
		flow : [{
				step: 0,
				desc: "Debug, Unused",
				show: ["label","file","upload","progress","cancel","status","repeat"]
			},{
				step: 1,
				desc: "Choose",
				show: ["label","file","upload"]
			},{
				step: 2,
				desc: "Upload",
				show: ["progress","cancel","status"]
			},{
				step: 3,
				desc: "Complete",
				show: ["label","file","status","repeat"]
			}
		],
	       files : [],
	       queue : [],
	     sending : 0,
		elementids : [
			'parent',
			'label',
			'file',
			'upload',
			'cancel',
			'progress',
			'status',
			'repeat'
		],
		init : function(){
			var script = $.doc.getElementsByTagName('SCRIPT');
			var n = script.length;
			var i;
			var scriptAttribs;
			var j;
			var z;
			for (i = 0; i < n; i = i + 1) {
				if (script[i].dataset.type==$.arg.type) {
					$.arg.attribs={};
					$.arg.script=script[i];
					scriptAttribs=script[i].attributes;
					for(j=0; j<scriptAttribs.length;j++){
						z = scriptAttribs[j].name
						if(z.slice(0,5) == 'data-'){
							z = z.slice(5);
						}
						$.arg.attribs[z]=scriptAttribs[j].value;
					}
					$.struc = {};
					$.struc.body = $.doc.createElement('DIV');
					$.struc.body.dataset.id = $.arg.root + '_body';
					script[i].parentNode.insertBefore($.struc.body, script[i]);
					script[i].parentNode.removeChild(script[i]);
					$.event = {};
					$.event.sent = new Event($.arg.root+'_sent');
					$.event.load = new Event('load');
					$.event.start = new Event('start');
					$.event.complete = new Event('complete');
					i=n+10;
				}
			}
			if(i==n+11){$.arg.found=true;} else {$.arg.found=false;}
		},
		log : function(){
			if( $.arg.attribs.console == 'true' ){ console.log.apply(null, arguments); }
		},
		pref : function(){
			prefs = [
				'style',
				'test'
			];
			for(var i=0;i<prefs.length;i++){
				if (typeof $.arg.attribs[prefs[i]] === 'undefined'){$.arg.attribs[prefs[i]]=''};
			}
		},
	 	addCSS: function(fileName) {
 			var head = document.head;
 			var style = document.createElement("style");
			var t = document.createTextNode($.whichCSS());
			style.appendChild(t);
			head.appendChild(style);
		},
		whichCSS : function(){
			var option = `div[data-id="`+$.arg.root+`_body"][data-theme=fill] input#`+$.arg.root+`_file.`+$.arg.root+`hide, input#`+$.arg.root+`_file.`+$.arg.root+`hide {  width: 0.2px;  height: 0.1px;  opacity: 0;  overflow: hidden;  position: absolute;  z-index: -1; }  div[data-id="`+$.arg.root+`_body"], div[data-id="`+$.arg.root+`_body"] * {  box-sizing: border-box; }  div[data-id="`+$.arg.root+`_body"] label + input[type=file] * {  pointer-events: none; }  div[data-id="`+$.arg.root+`_body"][data-theme] {  display: flex;  justify-content: center;  align-items: center;  width: auto;  width: 100%;  height: 100%; } div[data-id="`+$.arg.root+`_body"][data-theme] div, div[data-id="`+$.arg.root+`_body"][data-theme] input#`+$.arg.root+`_file, div[data-id="`+$.arg.root+`_body"][data-theme] label, div[data-id="`+$.arg.root+`_body"][data-theme] progress {  flex-grow: 4; } div[data-id="`+$.arg.root+`_body"][data-theme] button {  flex-grow: 1; } div[data-id="`+$.arg.root+`_body"][data-theme] progress::-webkit-progress-value {  transition: width 2s; } div[data-id="`+$.arg.root+`_body"][data-theme] progress {  border-radius: 100px;  background-color: #efefef;  height: 0.5em; } div[data-id="`+$.arg.root+`_body"][data-theme] progress::-webkit-progress-bar {  background-color: rgba(0, 0, 0, 0);  border-radius: 100px; } div[data-id="`+$.arg.root+`_body"][data-theme] progress::-webkit-progress-value {  border-radius: 100px 0 0 100px;  background-color: #0275ff; } div[data-id="`+$.arg.root+`_body"][data-theme] progress[value="100"]::-webkit-progress-value {  border-radius: 100px; }  div[data-id="`+$.arg.root+`_body"][data-theme=fill] button, div[data-id="`+$.arg.root+`_body"][data-theme=fill] label, div[data-id="`+$.arg.root+`_body"][data-theme=fill] div[type=status], div[data-id="`+$.arg.root+`_body"][data-theme=fill] input#`+$.arg.root+`_file, div[data-id="`+$.arg.root+`_body"][data-theme=dark] button, div[data-id="`+$.arg.root+`_body"][data-theme=dark] label, div[data-id="`+$.arg.root+`_body"][data-theme=dark] div[type=status], div[data-id="`+$.arg.root+`_body"][data-theme=dark] input#`+$.arg.root+`_file, div[data-id="`+$.arg.root+`_body"][data-theme=light] button, div[data-id="`+$.arg.root+`_body"][data-theme=light] label, div[data-id="`+$.arg.root+`_body"][data-theme=light] div[type=status], div[data-id="`+$.arg.root+`_body"][data-theme=light] input#`+$.arg.root+`_file {  border: none;  padding: 3em 1em;  text-align: center;  text-decoration: none;  font-size: 1em;  font-family: sans-serif;  margin-bottom: 4px; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] input#`+$.arg.root+`_file, div[data-id="`+$.arg.root+`_body"][data-theme=dark] input#`+$.arg.root+`_file, div[data-id="`+$.arg.root+`_body"][data-theme=light] input#`+$.arg.root+`_file {  padding: 0.8em 2em; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] div[type=status], div[data-id="`+$.arg.root+`_body"][data-theme=dark] div[type=status], div[data-id="`+$.arg.root+`_body"][data-theme=light] div[type=status] {  background-color: rgba(0, 0, 0, 0); } div[data-id="`+$.arg.root+`_body"][data-theme=fill] progress, div[data-id="`+$.arg.root+`_body"][data-theme=dark] progress, div[data-id="`+$.arg.root+`_body"][data-theme=light] progress {  appearance: none;  border: none;  width: 100%;  position: relative;  margin: 4px;  height: 3.2em; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] #`+$.arg.root+`_loader, div[data-id="`+$.arg.root+`_body"][data-theme=dark] #`+$.arg.root+`_loader, div[data-id="`+$.arg.root+`_body"][data-theme=light] #`+$.arg.root+`_loader {  width: 2em;  height: 2em;  top: -1.2em;  left: -0.8em; }  div[data-id="`+$.arg.root+`_body"][data-theme=fill] {  display: table; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] label, div[data-id="`+$.arg.root+`_body"][data-theme=fill] button, div[data-id="`+$.arg.root+`_body"][data-theme=fill] div[type=status], div[data-id="`+$.arg.root+`_body"][data-theme=fill] input#`+$.arg.root+`_file, div[data-id="`+$.arg.root+`_body"][data-theme=fill] progress {  margin: 0;  padding: 0;  height: 100%;  display: table-cell;  text-align: center;  vertical-align: middle; }  div[data-id="`+$.arg.root+`_body"][data-theme=light] button, div[data-id="`+$.arg.root+`_body"][data-theme=light] label, div[data-id="`+$.arg.root+`_body"][data-theme=light] input#`+$.arg.root+`_file {  background-color: #d2e7ff;  color: #444444; } div[data-id="`+$.arg.root+`_body"][data-theme=light] button:hover, div[data-id="`+$.arg.root+`_body"][data-theme=light] button:focus, div[data-id="`+$.arg.root+`_body"][data-theme=light] label:hover, div[data-id="`+$.arg.root+`_body"][data-theme=light] label:focus, div[data-id="`+$.arg.root+`_body"][data-theme=light] label.`+$.arg.root+`active, div[data-id="`+$.arg.root+`_body"][data-theme=light] input#`+$.arg.root+`_file:hover, div[data-id="`+$.arg.root+`_body"][data-theme=light] input#`+$.arg.root+`_file:focus {  background-color: #fff6e9; } div[data-id="`+$.arg.root+`_body"][data-theme=light] progress[value] {  background-color: #fffef9;  color: royalblue; } div[data-id="`+$.arg.root+`_body"][data-theme=light] progress::-webkit-progress-value {  background-color: #e3f0ff; } div[data-id="`+$.arg.root+`_body"][data-theme=light] progress[value]::-webkit-progress-bar {  background-color: #fffef9; } div[data-id="`+$.arg.root+`_body"][data-theme=light] progress::-moz-progress-bar {  background-color: #e3f0ff; } div[data-id="`+$.arg.root+`_body"][data-theme=light] #`+$.arg.root+`_loader {  border: 0.4em solid #fffef9;  border-top: 0.4em solid #e3f0ff; }  div[data-id="`+$.arg.root+`_body"][data-theme=dark] button, div[data-id="`+$.arg.root+`_body"][data-theme=dark] label, div[data-id="`+$.arg.root+`_body"][data-theme=dark] input#`+$.arg.root+`_file {  background-color: #216ae1;  color: #dddddd; } div[data-id="`+$.arg.root+`_body"][data-theme=dark] button:hover, div[data-id="`+$.arg.root+`_body"][data-theme=dark] button:focus, div[data-id="`+$.arg.root+`_body"][data-theme=dark] label:hover, div[data-id="`+$.arg.root+`_body"][data-theme=dark] label:focus, div[data-id="`+$.arg.root+`_body"][data-theme=dark] label.`+$.arg.root+`active, div[data-id="`+$.arg.root+`_body"][data-theme=dark] input#`+$.arg.root+`_file:hover, div[data-id="`+$.arg.root+`_body"][data-theme=dark] input#`+$.arg.root+`_file:focus {  background-color: #f4d47c;  color: #444444; } div[data-id="`+$.arg.root+`_body"][data-theme=dark] progress[value] {  background-color: #bebebe;  color: royalblue; } div[data-id="`+$.arg.root+`_body"][data-theme=dark] progress::-webkit-progress-value {  background-color: #082c6c; } div[data-id="`+$.arg.root+`_body"][data-theme=dark] progress[value]::-webkit-progress-bar {  background-color: #bebebe; } div[data-id="`+$.arg.root+`_body"][data-theme=dark] progress::-moz-progress-bar {  background-color: #082c6c; } div[data-id="`+$.arg.root+`_body"][data-theme=dark] #`+$.arg.root+`_loader {  border: 0.4em solid #bebebe;  border-top: 0.4em solid #082c6c; }  div[data-id="`+$.arg.root+`_body"][data-theme=fill] button {  background-color: #d2e7ff;  color: #444444; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] label, div[data-id="`+$.arg.root+`_body"][data-theme=fill] input#`+$.arg.root+`_file {  background-color: #fffef9;  color: #444444; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] button:hover, div[data-id="`+$.arg.root+`_body"][data-theme=fill] button:focus, div[data-id="`+$.arg.root+`_body"][data-theme=fill] label:hover, div[data-id="`+$.arg.root+`_body"][data-theme=fill] label:focus, div[data-id="`+$.arg.root+`_body"][data-theme=fill] label.`+$.arg.root+`active, div[data-id="`+$.arg.root+`_body"][data-theme=fill] input#`+$.arg.root+`_file:hover, div[data-id="`+$.arg.root+`_body"][data-theme=fill] input#`+$.arg.root+`_file:focus {  background-color: #fff6e9; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] progress[value] {  background-color: #fffef9;  color: royalblue; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] progress::-webkit-progress-value {  background-color: #e3f0ff; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] progress[value]::-webkit-progress-bar {  background-color: #fffef9; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] progress::-moz-progress-bar {  background-color: #e3f0ff; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] #`+$.arg.root+`_loader {  border: 0.4em solid #fffef9;  border-top: 0.4em solid #e3f0ff; }  label#`+$.arg.root+`_label.`+$.arg.root+`show {  display: block; }  label#`+$.arg.root+`_label.`+$.arg.root+`hide {  display: none; }  button#`+$.arg.root+`_upload.`+$.arg.root+`show {  display: block; }  button#`+$.arg.root+`_upload.`+$.arg.root+`hide {  display: none; }  button#`+$.arg.root+`_cancel.`+$.arg.root+`show {  display: block; }  button#`+$.arg.root+`_cancel.`+$.arg.root+`hide {  display: none; }  progress#`+$.arg.root+`_progress.`+$.arg.root+`show {  display: block; }  progress#`+$.arg.root+`_progress.`+$.arg.root+`hide {  display: none; }  div#`+$.arg.root+`_status.`+$.arg.root+`show {  display: block; }  div#`+$.arg.root+`_status.`+$.arg.root+`hide {  display: none; }  button#`+$.arg.root+`_repeat.`+$.arg.root+`show {  display: block; }  button#`+$.arg.root+`_repeat.`+$.arg.root+`hide {  display: none; }  div[data-id="`+$.arg.root+`_body"][data-theme=fill] label#`+$.arg.root+`_label.`+$.arg.root+`show {  display: table-cell; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] label#`+$.arg.root+`_label.`+$.arg.root+`hide {  display: none; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] button#`+$.arg.root+`_upload.`+$.arg.root+`show {  display: table-cell; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] button#`+$.arg.root+`_upload.`+$.arg.root+`hide {  display: none; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] button#`+$.arg.root+`_cancel.`+$.arg.root+`show {  display: table-cell; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] button#`+$.arg.root+`_cancel.`+$.arg.root+`hide {  display: none; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] progress#`+$.arg.root+`_progress.`+$.arg.root+`show {  display: table-cell; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] progress#`+$.arg.root+`_progress.`+$.arg.root+`hide {  display: none; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] div#`+$.arg.root+`_status.`+$.arg.root+`show {  display: table-cell; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] div#`+$.arg.root+`_status.`+$.arg.root+`hide {  display: none; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] button#`+$.arg.root+`_repeat.`+$.arg.root+`show {  display: table-cell; } div[data-id="`+$.arg.root+`_body"][data-theme=fill] button#`+$.arg.root+`_repeat.`+$.arg.root+`hide {  display: none; }  div[data-id="`+$.arg.root+`_body"]:not([data-theme]) label#`+$.arg.root+`_label.`+$.arg.root+`show {  display: inline-block; } div[data-id="`+$.arg.root+`_body"]:not([data-theme]) button#`+$.arg.root+`_upload.`+$.arg.root+`show {  display: inline-block; } div[data-id="`+$.arg.root+`_body"]:not([data-theme]) button#`+$.arg.root+`_cancel.`+$.arg.root+`show {  display: inline-block; } div[data-id="`+$.arg.root+`_body"]:not([data-theme]) progress#`+$.arg.root+`_progress.`+$.arg.root+`show {  display: inline-block; } div[data-id="`+$.arg.root+`_body"]:not([data-theme]) div#`+$.arg.root+`_status.`+$.arg.root+`show {  display: inline-block; } div[data-id="`+$.arg.root+`_body"]:not([data-theme]) button#`+$.arg.root+`_repeat.`+$.arg.root+`show {  display: inline-block; }  /** ---------  ANIMATED */ progress#`+$.arg.root+`_progress::-webkit-progress-value {  transition: width 2s; }  /*# sourceMappingURL=build_cssCOMPILED.css.map */ `;
			return option;
		},
		show : function(elem){
			$.e[elem].id.classList.add($.arg.root+'show'); 
			$.e[elem].id.classList.remove($.arg.root+'hide');
		},
		hide : function(elem){
			$.e[elem].id.classList.add($.arg.root+'hide');
			$.e[elem].id.classList.remove($.arg.root+'show');
		},
		step : function(s){
			//
			// Control Show/Hide with classes
			//
			var ids=$.elementids;
			for(var i=1;i<ids.length;i++){			// start at 1, since the 0 element is the parent element
				if($.flow[s].show.includes(ids[i])){
					$.show(ids[i]);
				} else {
					$.hide(ids[i]);
				}
			}
			if(s==4){

			} else {
				if($.arg.attribs.labelfile=='label'){			// (labelfile override)
					$.hide('file');
				}
				if($.arg.attribs.labelfile=='file'){			// (labelfile override)
					$.hide('label');
				}
				if($.arg.attribs.auto=='true'){				// (auto upload override)
					$.hide('upload');
				}
				if(typeof $.arg.attribs.repeat == 'undefined'){		// (repeat off override)
					$.hide('repeat');
					if(s==3){
						$.hide('file');
						$.hide('label');
					}
				} else if($.arg.attribs.repeat=='auto'){		// (repeat auto override)
					$.hide('repeat');
				} else if($.arg.attribs.repeat=='button'){		// (repeat button override)
					if(s==3){
						$.hide('file');
						$.hide('label');
					}
				}

				if(s==1 && $.arg.attribs.auto=='confirm' && $.filesValue == ''){
					$.hide('upload');
				}

				$.arg.currentstep=s;
				if($.arg.attribs.user=='terry' || $.arg.attribs.user=='ben' || $.arg.attribs.console=='true'){
					var e=document.getElementById('step')
					if(e){e.innerHTML='Step '+s;}
				}
			}
		},
		html : function(){
			// Inject HTML into div
			// <div data-id="_1596893786033_body"></div>
			if($.arg.attribs.theme){$.struc.body.dataset.theme=$.arg.attribs.theme;}
			if($.arg.attribs.id){$.struc.body.id=$.arg.attribs.id;}
			if($.arg.attribs.class){$.struc.body.className=$.arg.attribs.class;}
			if($.arg.attribs.style){$.struc.body.setAttribute("style",$.arg.attribs.style);}
			if($.arg.attribs.naming == 'multiple'){$.arg.attribs.multiple=' multiple ';} else {$.arg.attribs.multiple='';}

			$.chunkSize = parseInt($.arg.attribs.chunksize,10);
			if($.chunkSize>=500000 && $.chunkSize<=50000000){} else {$.chunkSize = 1000000;} // limit between 500kb and 50mb default 1mb

			$.maxsockets = parseInt($.arg.attribs.maxsockets,10);
			if($.maxsockets==10000){
				// Exception for testing for failures, this should force some error XHR connections
			} else {
				if($.maxsockets>=1 && $.maxsockets<=10){} else {$.maxsockets = 2;} // limit between 1 and 10 default 2
			}

			$.struc.body.innerHTML=`<!--#EDITOR:DIRECTIVE:REFRESHOPENER/#--><label id="`+$.arg.root+`_label" for="`+$.arg.root+`_file" >Attach File(s)</label><input id="`+$.arg.root+`_file" type="file" `+$.arg.attribs.multiple+` ><button id="`+$.arg.root+`_upload" type="button" >Upload</button><button id="`+$.arg.root+`_cancel" type="button" >Cancel</button><progress id="`+$.arg.root+`_progress" value=".2" class="animated" data-original-title="Border style" data-placement="top"></progress><div id="`+$.arg.root+`_status" type="status" >status</div><button id="`+$.arg.root+`_repeat" type="button" >Attach More</button>`;
			$.e={};
			var ids=$.elementids;
			for(var i=0;i<ids.length;i++){
				if(i==0) {
					var x=$.struc.body;	// parent element
				} else {
					var x=doc.getElementById($.arg.root+'_'+ids[i]);
				}
				if(x){
					$.e[ids[i]]={};
					$.e[ids[i]].id=x;
					$.e[ids[i]].default=x.innerHTML;
				} else {
					$.log('ERROR: document.getElementById("'+$.arg.root+'_'+ids[i]+'") not found');
				}
			}

			if($.arg.attribs.naming == 'single' || $.arg.attribs.naming=='multiple' || !$.arg.attribs.naming){
				// Leave it alone
			} else {
				$.e.label.default=$.arg.attribs.naming;
				$.e.label.id.innerHTML=$.e.label.default;
			}


			if(typeof $.arg.attribs.theme != 'undefined'){$.struc.body.dataset.theme=$.arg.attribs.theme;}
			if(typeof $.arg.attribs.labelfile == 'undefined'){$.arg.attribs.labelfile='label';}
			if($.arg.attribs.accept){
				$.e.file.id.accept = $.arg.attribs.accept+"/*";
			}

			if($.arg.attribs.batchid){$.struc.body.dataset.batchid=$.arg.attribs.batchid;} else {$.struc.body.dataset.batchid=$.uuid();}

			$.setProgressElement();
			$.struc.body.dispatchEvent($.event.load);
			$.step(1);
		},
		prepare : function(){
			if($.filesValue==''){
				window.onbeforeunload = '';
				return false;
			}
			window.onbeforeunload = function() {return true}; // Add Unsaved Warning
			$.files.id = $.struc.body.dataset.batchid;  // $.uuid();
			$.files.abort = false;		// This is flagged true if we are aborting, used to prevent re queuing if aborting

			for (let j=0; j<$.filesFiles.length; j++){
				$.files[j] = {};
				$.files[j].batchid = $.files.id;
				$.files[j].name = $.filesFiles[j].name;
				$.files[j].size = $.filesFiles[j].size;
				$.files[j].type = $.filesFiles[j].type;
				$.files[j].lastModified = $.filesFiles[j].lastModified;
				$.files[j].element = $.filesFiles[j];
				$.files[j].pieces = [];
				let x=0,y=0;
				for (let i=0; i<$.files[j].size/$.chunkSize; i++){
					$.files[j].pieces[i] = {};
 					x = y;
					if (y+$.chunkSize>$.files[j].size) {
						y = $.files[j].size;
					} else {
						y = y + $.chunkSize;
					}
					$.files[j].pieces[i].from = x+1;
					$.files[j].pieces[i].to = y;
					$.files[j].pieces[i].sent = 0;				// Terry: added these variables
					$.files[j].pieces[i].total = Math.floor((y-x)*(4/3));	// This is the base64 total. Will be replaced with computed length from data reader
					$.files[j].pieces[i].status = 'pending';		//
					$.files[j].pieces[i].xhr = {};				// xhr will be the actual request
					$.files[j].pieces[i].digest;
					$.files[j].pieces[i].response = '';			//
				}
			}
		},
		uuid : function(){
			// https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
			let chars = '0123456789abcdef'.split('');
			let uuid = [], rnd = Math.random, r;
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4'; // version 4
			for (var i = 0; i < 36; i++){
				if (!uuid[i]){
					r = 0 | rnd()*16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
				}
			}
			return uuid.join('');
		},
	       queueIt : function(i, j){
			if (i !== undefined && j !== undefined) {
				let piece = {"i" : i, "j" : j};
				$.queue.push(piece);
			}
			while ($.queue[0] && $.sending < $.maxsockets){
				let x = $.queue[0].i;
				let y = $.queue[0].j;

				let blob=$.files[x].element;

				let from=$.files[x].pieces[y].from - 1;
				let to=$.files[x].pieces[y].to;

				let slice=blob.slice(from,to);

				$.send(slice,x,y);
				$.queue.shift();
				$.sending++;
			}
	       },
		upload : function(){
			if($.filesValue==''){return $.log('ERROR: Cannot Upload, Please choose some file(s).')}
			if(typeof $.arg.attribs.action=='undefined'){return $.log('Missing Action, bypassing actual send')}

			$.struc.body.dispatchEvent($.event.start);
			for (let i=0; i<$.files.length; i++){
				for (let j=0; j<$.files[i].pieces.length; j++){
					$.queueIt(i, j);
					$.files[i].pieces[j].status='queued';
				}
			}
			$.status('ready',0,0);
		},
		//
		// ready	<== The blob is ready needs to be sent
		// encoding	<== the xhr object has been created and setup, just waiting for the blob to be base64 encoded, and the digest to be calculated
		// send		<== start sending the base64 encoded blob
		// progress	<== a progress event was detected
		// sent		<== we recieved a finished XHR state and a response with a status of 200
		// failure	<== we recieved a finished XHR state and a response with a non 200 non 0 status
		// error	<== we recieved a finished XHR state and a status of 0 which means it wasn't sent and an error occured, we will retry
		// change	<== onreadystatechange detected
		//
                setProgressElement : function(p,bytes,totalbytes,chunks,totalchunks){
			var title,bytes;
			if(typeof p == 'undefined'){
				$.e.progress.id.value= 0;
				$.e.progress.id.setAttribute('title','Choose Some Files');
			} else {
				$.e.progress.id.value= p;
				if($.filesValue==''){
					$.e.progress.id.setAttribute('title','');
				} else {
					if($.filesFiles.length>1){
						title=$.filesFiles.length+' files (confirmed '+chunks+' of '+totalchunks+' pieces)'
					} else {
						title='(confirmed '+chunks+' of '+totalchunks+' pieces)'
					}
					if(bytes==totalbytes){

					} else {
						title=title+' ('+$.size(bytes)+' of '+$.size(totalbytes)+')'
					}
					$.e.progress.id.setAttribute('title',title);
				}
			}
		},
		status : function(text,i,j){
			let total=0;
			let progress=0;
			let finished=true;
			let inProgress=0;
			let cnt=0,tot=0,p=0;
			for (let x=0; x<$.files.length; x++){
				for (let y=0; y<$.files[x].pieces.length; y++){
					total=total+ $.files[x].pieces[y].total;
					progress=progress+$.files[x].pieces[y].sent;
					tot=tot+1;
					if($.files[x].pieces[y].status == 'sent'){cnt=cnt+1;}
				}
			}
			if(total==0 || tot==0){
				p=0;
			} else {
				p=(5*(progress/total) + (cnt/tot))/6;
			}
			$.setProgressElement(p,progress,total,cnt,tot);
			$.e.status.id.innerHTML=parseFloat(p*100).toFixed(0)+"%";


			if($.files && $.files[i] && $.files[i].pieces){
				$.files[i].pieces[j].status=text;
				for (let x=0; x<$.files.length; x++){
					for (let y=0; y<$.files[x].pieces.length; y++){
						if($.files[x].pieces[y].status != 'sent'){finished=false;}
					}
				}
			}
			if(finished){
				let p=1;
				$.e.progress.id.value=p;						
				$.e.status.id.innerHTML='100%';
				$.s_end();
				window.onbeforeunload = '';
			}
		},
		send : function(blob,i,j){
			$.step(2); // We are still at step 2 the blobs have only been sent not complete
			if(typeof $.arg.attribs.action=='undefined'){
				$.files[i].pieces[j].sent=$.files[i].pieces[j].total;
				$.files[i].pieces[j].response='Missing Action bypassing Send';
				$.status('sent',i,j);
				return;
			} else {
				let xhr = new XMLHttpRequest();
				$.files[i].pieces[j].xhr=xhr;
				xhr.responseType = 'json';
				xhr.open("PUT", $.arg.attribs.action, true);
				xhr.setRequestHeader("Content-Type", "text/plain");
				xhr.setRequestHeader("Batch-Id", $.files.id);
				xhr.setRequestHeader("Authorization",$.arg.attribs.authorization);
				xhr.setRequestHeader("Naming",$.arg.attribs.naming);
				xhr.setRequestHeader("Destination",$.arg.attribs.destination);
				xhr.setRequestHeader("Content-Range","bytes "+(parseInt($.files[i].pieces[j].from,10))+"-"+($.files[i].pieces[j].to)+"/"+$.files[i].size);
				xhr.setRequestHeader("File-Chunk","file "+(i+1)+", (chunk "+(j+1)+" of "+($.files[i].pieces.length)+") of "+($.files.length));
				xhr.onreadystatechange = function() {
					let jsonStatus=0;
					if(this.response && this.response.status){jsonStatus=this.response.status;}
					if (this.readyState === XMLHttpRequest.DONE && this.status === 200 && jsonStatus == 200) {
						$.files[i].pieces[j].response=JSON.stringify(this.response);
						$.status('sent',i,j);
						$.sending--;
						$.struc.body.dispatchEvent($.event.sent);
					} else if (     (this.readyState === XMLHttpRequest.DONE && this.status >= 300 && this.status < 600)     ||     (this.readyState === XMLHttpRequest.DONE && this.status == 200 && jsonStatus != 200)     ) {
						$.log('Abort Mission',this.readyState,XMLHttpRequest.DONE,this.status,jsonStatus);
						$.files[i].pieces[j].response='xhr event: '+this.readyState+' '+this.status;
						$.status('failure',i,j);
						$.e.status.id.innerHTML="W Ohh Boy, that was unexpected, Aborting ("+this.status+", "+jsonStatus+")"+JSON.stringify(this.response);
						$.e.status.id.setAttribute('title','Unexpected Response Status: '+this.status);
						$.sending--;
						$.abort();
						$.clearfiles();
						$.step(3);
					} else if (this.readyState === XMLHttpRequest.DONE && this.status == 0) {

			 			if($.files && $.files[0] && $.files.abort == false){
							// Good we can go on
						} else {
							return;
						}
						$.log('Re Queue Mission',i,j,this.readyState,XMLHttpRequest.DONE,this.status,jsonStatus);
						$.files[i].pieces[j].response='xhr event: '+this.readyState+' '+this.status;
						$.maxsockets=1; 		// Since we had an XHR error lets throttle our max connections way back
						$.status('error',i,j);
						$.sending--;
						$.queueIt(i, j);
					} else {
						$.files[i].pieces[j].response='xhr event: '+this.readyState+' '+this.status;
						$.status('change',i,j);
					}
				}
				xhr.upload={};
				xhr.upload.onprogress = function(event) {
					$.files[i].pieces[j].sent=event.loaded;
					$.status('progress',i,j);
					// $.log(`Uploaded ${event.loaded} of ${event.total}`,i,j);
				}
				$.status('encoding',i,j);
				$.sha256(blob).then(function(digest){
					let reader = new FileReader();
					reader.readAsDataURL(blob);
					reader.onloadend = function() {
			 			if($.files && $.files[0]){
							// Good we can go on
						} else {
							return;
						}
						$.files[i].pieces[j].total=reader.result.length;
						$.status('send',i,j);
						$.files[i].pieces[j].digest=digest;
						xhr.setRequestHeader("Digest", digest);
						xhr.setRequestHeader("Length", reader.result.length);
						xhr.send(reader.result);
					}
				});
			}
		},
		s_end : function(){
 			if(!$.files || !$.files[0] || !$.files[0].batchid){return}

			if(typeof $.arg.attribs.action=='undefined'){
				$.done('(Missing Action) ');
				return;
			} else {
				let xhr = new XMLHttpRequest();
				xhr.open("POST", $.arg.attribs.action, true);
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.onreadystatechange = function() {
					if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
						//$.log(this.responseText,this);
						$.done('');
					}
				}
				var a={
					batchid:$.files[0].batchid,
					authorization:$.arg.attribs.authorization,
					destination:$.arg.attribs.destination,
					naming:$.arg.attribs.naming,
					files:[]
				};
				for (let x=0; x<$.files.length; x++){
					b={
						name:$.files[x].name,
						size:$.files[x].size,
						type:$.files[x].type,
						lastModified:$.files[x].lastModified,
						chunks:$.files[x].pieces.length
					};
					a.files[x]=b;
				}
				xhr.send(JSON.stringify(a));
			}
		},
		done : function(t){
			if($.arg.attribs.destfilename){
				$.e.status.id.innerHTML=t+'"'+$.arg.attribs.destfilename+'" updated';
			} else if ($.files.length==1){
				$.e.status.id.innerHTML=t+"Upload Complete";
			} else {
				$.e.status.id.innerHTML=t+"Upload Complete ("+$.files.length+" files)";
			}
			$.struc.body.dispatchEvent($.event.complete);
			$.step(3);
			$.clearfiles();
			$.jobstatus='done';
			return;
		},
		sha256 : function(str_or_blob) {
			if(str_or_blob instanceof Blob){
				return new Response(str_or_blob).arrayBuffer().then(function(buffer){
					return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
						return $.hex(hash);
					});
				});
			} else {
				// We transform the string into an arraybuffer.
				var buffer = new TextEncoder("utf-8").encode(str_or_blob);
				return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
					return $.hex(hash);
				});
			}
		},
		hex : function(buffer) {
			var hexCodes = [];
			var view = new DataView(buffer);
			for (var i = 0; i < view.byteLength; i += 4) {
				// Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
				var value = view.getUint32(i)
				// toString(16) will give the hex representation of the number without padding
				var stringValue = value.toString(16)
				// We use concatenation and slice for padding
				var padding = '00000000'
				var paddedValue = (padding + stringValue).slice(-padding.length)
				hexCodes.push(paddedValue);
			}
			// Join all the hex strings into one
			return hexCodes.join("");
		},
		size : function(bytes) {
			let s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
			let e = Math.floor(Math.log(bytes) / Math.log(1024));
			let p = 1;if(e==0){p=0;}
			return (bytes / Math.pow(1024, e)).toFixed(p) + " " + s[e];
		},
                populatelabel : function(){
			if($.filesValue=='' || $.arg.attribs.labelfile == 'both'){
				$.e.label.id.innerHTML=$.e.label.default;
			} else {
				if($.filesFiles.length>1){
					var bytes=0;
					for(var i=0;i<$.filesFiles.length;i++){
						bytes=bytes+$.filesFiles[i].size;
					}
					$.e.label.id.innerHTML=$.e.label.default+' ('+$.filesFiles.length+' files, '+$.size(bytes)+')';
				} else {
					var bytes=$.filesFiles[0].size;
					var val=$.filesValue.replace(/^.*\\/, "");
					if(val.length>22){val=val.substring(0,10)+'&hellip;'+val.substring(val.length-10,val.length);}
					$.e.label.id.innerHTML=$.e.label.default+' ('+val+', '+$.size(bytes)+')';
				}
			}
		},
		abort : function(){
			// Loop through files and pieces and abort all xhr requests

 			if($.files){
				// Good we can go on
			} else {
				return;
			}
			$.files.abort = true;
			for (let x=0; x<$.files.length; x++){
				if(typeof $.files[x].pieces != 'undefined'){
					for (let y=0; y<$.files[x].pieces.length; y++){
						if(typeof $.files[x].pieces[y].xhr.abort == 'function'){$.files[x].pieces[y].xhr.abort();}
					}
				}
			}
			window.onbeforeunload = '';
		},
		clearfiles : function(){
			$.filesValue='';
			$.e.file.id.value='';
			$.files=[];
			$.queue=[];
			$.sending=0;
			$.e.label.id.innerHTML=$.e.label.default;
			$.filesValue=$.e.file.id.value;
			$.filesFiles=$.e.file.id.files;
	                $.setProgressElement();
			$.jobstatus='';
		},
		behavior : function(){


			$.e.label.id.addEventListener('dragover',function(j) {
				j.preventDefault();
				j.stopPropagation();
				$.e.label.id.classList.add($.arg.root+'active');
				return false;
			});


			$.e.label.id.addEventListener('dragleave',function(e) {
				e.preventDefault();
				e.stopPropagation();
				$.e.label.id.classList.remove($.arg.root+'active');
				return false;
			});


			$.e.label.id.addEventListener('drop',function(e) {
				$.e.label.id.classList.remove($.arg.root+'active');
				if (e.dataTransfer) {
					if (e.dataTransfer.files.length) {
						e.preventDefault();
						e.stopPropagation();
						$.filesFiles=e.dataTransfer.files;
						// $.log('File: '+$.filesValue);
						$.prepare();
						$.filesValue=$.files[0].name;
						$.populatelabel();
						$.step(1);
						if($.arg.attribs.auto=='true'){$.upload();}
					}
				} else {
					$.log('Missing Dropped Feature');
				}
				return false;
			});


			$.e.file.id.addEventListener('change',function(){

				$.filesValue=$.e.file.id.value;
				$.filesFiles=$.e.file.id.files;

				// $.log('File: '+$.filesValue);
				$.populatelabel();
				$.prepare();
				$.step(1);
				if($.arg.attribs.auto=='true'){$.upload();}
			});


			$.e.upload.id.addEventListener('click',function(){
				$.upload();
			});			// prepare() has already run by this point so we just upload


			$.e.cancel.id.addEventListener('click',function(){
				$.abort();
				$.clearfiles();
				$.step(1);
			});


			$.e.repeat.id.addEventListener('click',function(){
				$.abort();
				$.clearfiles();
				$.step(1);
			});
			$.struc.body.addEventListener($.arg.root+'_sent',function(e){
				$.queueIt();
			}, false);
		}
	};
	$.init();
	if($.arg.attribs.user=='terry' || $.arg.attribs.user=='ben' || $.arg.attribs.console=='true'){
		win['U']=$;
	}
	if($.arg.found){
		$.html();
		$.addCSS();
		$.behavior();
	} else {
		console.log('not my script');
	}
}(window, document, {root: '_' + new Date().getTime(),type:'input/fileupload'}));