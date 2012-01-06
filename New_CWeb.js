/*+++++++++++++++++++++++++++*/
/* CWeb Javascript - Library */
/* Version: 0.3.1            */
/* Rev: FINAL                */
/* Credits: Michael Möhrle   */
/*+++++++++++++++++++++++++++*/

var CWeb = (function() {
	var CWeb = function(selector, context) {
		return new CWeb.fn.InitCWeb(selector, context) ;
	},
	
	RegexpID = /^#\w*:*\w*$/,
	RegexpClass = /^\.\w*:*\w*$/,
	RegexpHTML = /^<\s*\w{1,}\s*(\w|\W)*(\/\s*>$|>(\w|\W){1,}\s*<\s*\/\w{1,}>)|>:*\w*$/,
	
	
	_$ = window.$,
	_CWeb = window.CWeb ;
	
CWeb.fn = CWeb.prototype = {
	
	constructor: CWeb,
	InitCWeb: function(selector, context) {
		var elems ;
		if (!context) {
			context = document.body ;	
		}
		elems = this.selecter(selector) ;
		for (var i = 0; i < elems.length; i++) {
			this[i] = elems[i] ;
		}
		this.length = elems.length ;
		this.context = context ;
	 	return this ;
	},
	Version: '0.3.1',
	Rev: 'FINAL',
	length: 0,
	cWeb: true,
	size: function() {
		return this.length ;
	},
	attr: function(type, name, value){
		//Kurzform für (set|add), überprüfen, ob alle anderen Möglichkeiten aussscheiden
		if (!value && type != "remove" && type != "get") {
			return this.each(this, function() {
				this.setAttribute(type, name) ;
			}, [type, name]) ;
		} ;
		if (type == "set" || type == "add") {
			return this.each(this, function() {
				this.setAttribute(name, value) ;
			}, [name, value]) ;
		} ;
		if (type == "remove") {
			return this.each(this, function() {
				this.removeAttribute(name) ;
			}, [name]) ;
		}
		if (type == "get") {
			for (var i = 0; i < this.length; i++) {
				return this[i][name] ;	
			}
		}
		return this;
	},
	css: function(type, cssprop, cssvalue) {
		//Kurzform für add, überprüfen, ob alle anderen Möglichkeiten aussscheiden
		if (!cssvalue && type != "clear" && type != "remove") {
			return this.each(this, function() {
				if (this.style) {
					if (typeof type === "object") {
						for (j in type) {
							this.style[cWeb.toJsStyle(j)] = type[j] ;	
						}
					}
					else {
						this.style[cWeb.toJsStyle(type)] = cssprop ;
					}
				}
			}, [type, cssprop]) ;
		}
		if (type == "add") {
			return this.each(this, function() {
				if (this.style) {
					if (typeof cssprop === "object") {
						for (j in cssprop) {
							this.style[cWeb.toJsStyle(j)] = cssprop[j] ;	
						}
					}
					else {
						this.style[cWeb.toJsStyle(cssprop)] = cssvalue ;	
					}
				}
			}, [cssprop, cssvalue]) ;
		}
		if (type == "remove") {
			return this.each(this, function() {
				if (this.style) {
					if (typeof cssprop === "object") {
						for (j in cssprop) {
							this.style[j] = null ;
						}
					}
					else {
						this.style[cssprop] = null ;
					}
				}
			}, [cssprop]) ;
		}
		if (type == "clear") {
			return this.each(this, function() {
				for (j in this[i].style) {
					if (this.style) {
						this.style[j] = null ;	
					}
				}
			}) ;
		}
		if (type == "get") {
			var Style = new Array() ;
			for (i = 0; i < this.length; i++) {
				if (this[i].style) {
					Style[i] = this[i].style[cssprop] ;	
				}
			}
			return Style ;
		}
	},
	addClass: function(name) {
		return this.each(this, function() {
			this.className = this.className ? " " : "" + this.className ;
		}, [name]) ;
		return this.attr("class", name) ;
	},
	removeClass: function(name) {
		return this.each(this, function() {
			this.className = this.className.replace(name ,"") ;
		}, [name]) ;
		return this.attr("remove", "class") ;
	},
	end: function() {
		return this.Stack("pop") ;
	},
	parent: function() {
		//Aktuelles CWeb-Objekt im Stack speichern
		this.Stack("push", this) ;
		for (i = 0; i < this.length; i++) {
			this[i] = this[i].parentNode ;
		}
		return this ;
	},
	children: function() {
		//Aktuelles CWeb-Objekt im Stack speichern
		this.Stack("push", this) ;
		for (i = 0; i < this.length; i++) {
			var j = 0 ;
			var ChildNodes = new Array();
			ChildNodes[i] = this[i].childNodes ;
			ChildNodes.length = i + 1;
		}
		for (i = 0; i < ChildNodes.length; i++) {
			for (j = 0; j < ChildNodes[i].length; j++) {
				this[i][j] = ChildNodes[i][j] ;	
			}
		}
		return this ;
	},
	append: function() {
		return this.manipDom(arguments, function(a) {
			this.appendChild(a) ;
		}) ;
	},
	prepend: function() {
		return this.manipDom(arguments, function(a) {
			this.insertBefore(a, this.firstChild) ;	
		}) ;
	},
	after: function() {
		return this.manipDom(arguments, function(a) {
			this.parentNode.insertBefore(a, this.nextSibling) ;	
		}) ;
	},
	before: function() {
		return this.manipDom(arguments, function(a) {
			this.parentNode.insertBefore(a, this) ;	
		}) ;
	},
	manipDom: function(args, fn){
		var a = [] ;
		for (var i = 0; i < args.length; i++) {
			a[i] = this.selecter(args[i]) ;
		}
		var self = this ;
		return this.each(this, function() {
			self.each(a, function() {			
				for (var j = 0; j < self.length; j++) {
					//Überprüfen, on die Node geklont werden muss
					if (self.length != 1) {
						fn.apply(self[j], [self.selecter(this).cloneNode(true)]) ;
					}
					else {	//Muss nicht geklont werden
						fn.apply(self[j], [this]) ;
					}
				}
			}, [a, self]) ;
		}, [a, self]) ;
		
	},
	createDomObj: function(HTML) {
		var DomObj = document.createElement("div") ;
		DomObj.innerHTML = HTML ;
		
		return DomObj ;
	},
	wrap: function(a) {
		var Elem = this.selecter(a) ;
		return this.each(this, function() {
			Elem.appendChild(this) ;
		}, [Elem]) ;
	},
	unwrap: function() {
		return this.each(this, function() {
			this.parentNode.appendChild(this) ;
		}) ;
	},
	appendTo: function(target) {
		elem = this.selecter(target) ;
		return this.each(this, function() {
			elem.appendChild(this) ;
		}, [elem]) ;
	},
	innerText: function(Text) {
		return this.each(this, function() {
			this.innerText = Text ;
		}, [Text]) ;
	},
	innerHTML: function(HTML) {
		return this.each(this, function() {
			this.innerHTML = HTML ;	
		}, [HTML]) ;
	},
	outerText: function() {
		return this.each(this, function() {
			return this.outerText ;	
		}) ;
	},
	outerHTML: function() {
		return this.each(this, function() {
			return this.outerHTML ;	
		}) ;
	},
	inner: function(selector) {
		var elem = this.selecter(selector) ;
		return this.each(this, function() {
			this.innerHTML = "" ;
			this.appendChild(elem) ;
		}, [elem]) ;
	},
	includePlugin: function() {
		Plugin = document.createElement("script") ;
		Plugin.setAttribute("type", "text/javascript") ;
		Plugin.setAttribute("src", this.plugin_file) ;
		this[0].parentNode.removeChild(this[0]) ;
		return CWeb(document.body).append(Plugin) ;
	}
	
}
//InitCWeb Prototype = CWeb Prototype
CWeb.fn.InitCWeb.prototype = CWeb.fn ;

CWeb.now = function() {
		return (new Date()).getTime() ;	
	}
CWeb.merge = function(obj, props) {
	for (var prop in props ) {
		obj[prop] = props[prop] ;
	}
	return obj ;
}
CWeb.extend = function(obj, props) {
	return this.merge(obj, props) ;
}

CWeb.fn = CWeb.extend(CWeb.fn, {
	Stack: function(action, obj, caller) {
		//caller = obj, falls caller nicht existiert.
		!caller ? caller = obj : caller ;
		//Stack erstellen, wenn er nicht existiert
		if (!caller.stack) {
			caller.stack = new Array() ;	
		}
		if (action == "push") {
			//caller.Stack.push(obj) ;
			caller.stack = caller.stack.push(obj) ;
			return caller ;
		}
		if (action == "pop") {
			caller.Stack = caller.stack.pop() ;
			return caller ;
		}
	},
	selecter: function(selector) {
		var elem, id, Class, elems, _selector ;
		elem = [] ;
		//Selector für cssSelecter() speichern
		_selector = selector ;
		//Is String?
		if (typeof selector === "string") {
			//Css-Selectoren entfernen
			var Remove = /:(\w*|\W*)$/ ;
			selector = selector.replace(Remove, "") ;
			//Body
			if (selector == "body") {
				elem.push(document.body) ;
			}
			//ID
			else if (RegexpID.test(selector)) {
				id = selector.slice(1) ;
				elem.push(document.getElementById(id)) ;
			}
			//Class
			else if (RegexpClass.test(selector)) {
				Class = selector.slice(1) ;
				elems = document.getElementsByClassName(Class) ;
				for (var i = 0; i < elems.length; i++) {
					elem.push(elems[i]) ;
				}
			}
			//HTML
			else if (RegexpHTML.test(selector)) {
				elem.push(this.createDomObj(selector)) ;
			}
			//HTML-Tag
			else if (document.getElementsByTagName(selector)) {
				elems = document.getElementsByTagName(selector) ;
				for (var i = 0; i < elems.length; i++) {
					elem.push(elems[i]) ;
				}
			}
			//Einfacher Text, wenn obiges nicht zutrifft
			else {
				elem.push(this.createDomObj(selector)) ;	
			}
		}
		try{
			if (selector instanceof Node) {
				elem.push(selector) ;
			}
		}
		catch(e) {
			if (selector.nodeType) {
				elem.push(selector) ;
			}
		}
		elem = this.cssSelecter(_selector, elem) ;
	 	return elem; 
	},
	RegexpHoverSelector: /:hover\W*$/,
	RegexpParentSelector: /:parent\W*$/,
	cssSelecter: function(selector, elems) {
		//Überprüfen, ob der Selector auch ein String ist
		if (typeof selector === "string") {
			//CssSelectoren der Reihe nach testen, es kann immer nur ein Selector gewählt werden!
			if (this.RegexpHoverSelector.test(selector)) {
				
				for (var i = 0; i < elems.length; i++) {
					if (elems[i].isMouseOver) {
						//Element bleibt drin
					}
					else {
						//Element wird gelöscht!
						elems = elems.removeItem(i) ;
						i-- ;
					}
				}
			}
			else if (this.RegexpParentSelector.test(selector)) {
				
			}
		}
		return elems ;
	},
	Data: function(action, data, trace, id) {
		var ret = this ;
		if (!cWeb.data) {
			cWeb.data = [] ;
		}
		if (action == "add") {
			if (id) {
				if (trace) {
					cWeb.data[i][trace] = data ;
					ret.dataID = id ;
				}
				else {
					cWeb.data[i] = data ;
					ret.dataID = id ;	
				}
			}
			else {
				if (trace) {
					var len = cWeb.data.length
					cWeb.data[len] = [] ;
					cWeb.data[len][trace] = data ;
					ret.dataID = len;
				}
				else {
					ret.dataID = cWeb.data.push(data) - 1;	
				}
			}
		}
		if (action == "remove") {
			for (i in cWeb.data) {
				if (cWeb.data[i][data]) {
					cWeb.data = cWeb.data.removeItem(i) ;
				}
			}
		}
		if (action == "get") {
			for (i in this.data) {
				if (cWeb.data[i][data]) {
					ret = cWeb.data[i] ;	
				}
			}
		}
		return ret ;
	},
	dataStack: function(action, data) {
		var ret = this ;
		if (!this.data.Stack) {
			this.data.Stack = [] ;	
		}
		if (action == "push") {
			this.data.Stack.push(data) ;
		}
		if (action == "pop") {
			ret = this.data.Stack.pop() ;
		}
		return ret ;
	},
	slice: function(from, to) {
		if (!to) {
			return this.slice(from) ;
		}
		else {
			return this.slice(from, to) ;
		}
	},
	each: function(obj, fn, args) {
		if (obj.length != undefined) {
			for (var i = 0; i < obj.length; i++) {
				fn.apply(obj[i], args) ;
			}
		}
		else {
			for (var i in obj) {
				fn.apply(obj[i], args) ;	
			}
		}
		return obj ;
	},
	
	push: Array.prototype.push,
	pop: Array.prototype.pop
	

}) ;
CWeb.Browser = {
	isIE: function() {
		if (window.ActiveXObject) {
			return true ;	
		}
		else {
			return false ;	
		}
	}
}
CWeb.Event = {
	add: function(elem, type, handler, params) {
		//Überprüfen, ob das Element schon eine ID besitzt
		if (!elem.eid) {
			elem.eid = cWeb.Event.eid.next() ;
		}
		if (!cWeb.Event.firingList[elem.eid]) {
			cWeb.Event.firingList[elem.eid] = [] ;
		}
		if (!cWeb.Event.firingList[elem.eid][type]) {
			cWeb.Event.firingList[elem.eid][type] = [] ;
		}
		cWeb.Event.firingList[elem.eid][type].push({handler: handler, params: params}) ;
		return cWeb.Event.firingList ;
	},
	remove: function(elem, type, handler) {
		if (!elem.eid) {
			return;
		}
		if (!cWeb.Event.firingList[elem.eid]) {
			return;
		}
		if (!cWeb.Event.firingList[elem.eid][type]) {
			return;
		}
		for (var i in cWeb.Event.firingList[elem.eid][type]) {
			if (cWeb.Event.firingList[elem.eid][type][i][handler]) {
				cWeb.Event.firingList[elem.eid][type] = cWeb.Event.firingList[elem.eid][type].removeItem(i) ;
			}
		}
		return true ;
	},
	eid: {
		next: function() {
			return this.cur++ ;
		},
		cur: 1
	},
	firingList: [],
	triggerHandler: function(event) {
		event = event ? event : this.fixEvent(window.event) ;
		var type, target
		type = event.type ;
		if (event.target) {
			target = event.target ;
		}
		else {
			target = event.srcElement ;	
			event.target = event.scrElement ;
		}
		if (type == "mouseover") {
			target.isMouseOver = true ;
		}
		else if (type == "mouseout"){
			target.isMouseOver = false ;
		}
		var firingList = cWeb.Event.firingList ;
		if (target && target.eid) {
			if (firingList[target.eid]) {
				if (firingList[target.eid][type]) {
					for (var i = 0; i < firingList[target.eid][type].length; i++) {
						firingList[target.eid][type][i]["handler"].apply(window, [event, firingList[target.eid][type][i]["params"]]) ;
					}
				}
			}		
		}
	},
	fixEvent: function(event) {
		if (!event) {return null} ;
		event.preventDefault = function() {
			this.returnValue = false ;
		};
		event.stopPropagnation = function() {
			this.cancelBubble = true ;
		};
		return event ;
	}
	
}
CWeb.fn = CWeb.extend(CWeb.fn, {
	bindEvent: function(type, fn) {
		var self = this ;
		return this.each(this, function() {
			if (document.body.addEventListener) {	
				this.addEventListener(type, cWeb.Event.triggerHandler, false) ;
				cWeb.Event.add(this, type, fn) ;
			}
			else {
				this.attachEvent("on" + type, cWeb.Event.triggerHandler) ;
				cWeb.Event.add(this, type, fn) ;
			}
		}, [type, fn, self]) ;
	},
	unbindEvent: function(type, fn) {
		return this.each(this, function() {
			cWeb.Event.remove(this, type, fn) ;
		}, [type, fn]) ;
	},
	click: function(fn) {
		return this.bindEvent("click", fn) ;
	},
	dblclick: function(fn) {
		return this.bindEvent("dblclick", fn) ;	
	},
	toggle: function(fn_1, fn_2, fn_3) {
		var self = this ;
		this.toggle1 = fn_1 ;
		this.toggle2 = fn_2 ;
		this.toggle3 = fn_3 ;
		this.next = 1 ;
		return this.bindEvent("click", function() {
			if (self.next == 1) {
				self.toggle1.apply(self) ;	
				self.next = 2 ;
			}
			else if (self.next == 2) {
				self.toggle2.apply(self) ;
				if (self.toggle3) {
					self.next = 3 ;
				}
				else {
					self.next = 1 ;	
				}
			}
			else if (self.next == 3) {
				self.toggle3.apply(self) ;
				self.next = 1 ;	
			}
			
		}) ;
	},
	hover: function(fn_in, fn_out) {
		this.bindEvent("mouseover", fn_in) ;
		return this.bindEvent("mouseout", fn_out) ;
	}
}) ;
CWeb.easing = {
	/*
	 *t = Zeit Differenz
	 *z = Ziel Position
	 *s = Start Position
	 *d = Dauer
	 *a = aktuelle Zeit
	 */
	linear: function(t, z, s, d) {
		var step = ( z - s ) / d * t ;
		return step ;
	},
	swing: function(t, z, s, d, a) {
		var step = (( z - s ) / d * t);
		return step ;
	}
}
CWeb.fn = CWeb.extend(CWeb.fn, {
	hide: function(speed, easing, callback) {
		var self = this ;
		if (!speed) {
			speed = "instant" ;
		}
		return this.each(this, function() {
			if (this.hided == false || !this.hided){
				this.hideStyle = [] ;
				this.hideStyle["width"] = CWeb.getCurCss(this, "width") ;
				this.hideStyle["height"] = CWeb.getCurCss(this, "height") ;
				this.hideStyle["opacity"] = CWeb.getCurCss(this, "opacity") ;
			}
			CWeb(this).animate({width: "0px", height: "0px", opacity: "0", hide: true}, speed, easing, function() {
				for (var i = 0; i < self.length; i++) {
					if (self[i]) {
						self[i].hided = true ;
					}
					if (callback) {
						callback.apply() ;
					}
				}
			}) ;
			this.hided = true;
		}, [self, speed, easing, callback]) ;
	},
	show: function(speed, easing, callback) {
		var self = this ;
		if (!speed) {
			speed = "instant" ;
		}
		return this.each(this, function() {
			if (this.hided == true) {
					CWeb(this).animate({width: this.hideStyle["width"], height: this.hideStyle["height"], opacity: this.hideStyle["opacity"], show: true}, speed, easing, function() {
						if (callback) {
							callback.apply() ;
						}
						if (self[i]) {
							self[i].hided = false ;
						}
					}) ;
			}
		}, [self, speed, easing, callback]) ;
	},
	fadeOut: function(speed, easing, callback) {
		var self = this ;
		return this.each(this, function() {
			if (this.faded == false || !this.faded) {
				this.fadeStyle = CWeb.getCurCss(this, "opacity") ;
			}
			CWeb(this).animate({opacity: "0", hide: true}, speed, easing, function() {
				for (var i = 0; i < self.length; i++) {
					if (self[i]) {
						self[i].faded = true ;
					}
					if (callback) {
						callback.apply() ;
					}
				}
			}) ;
			this.faded = true ;
		}, [self, speed, easing, callback]) ;
	},
	fadeIn: function(speed, easing, callback) {
		var self = this ;
		return this.each(this, function() {
			if (!this.faded) {
				this.style["opacity"] = 0 ;
				this.style["filter"] = "alpha(opacity=0)" ;
				this.faded = true ;	
			}
			if (this.faded == true) {
				if (!this.fadeStyle) {
					this.fadeStyle = 1 ;	
				}
				CWeb(this).animate({opacity: this.fadeStyle, show: true}, speed, easing, function() {
						if (callback) {
							callback.apply() ;
						}
						if (self[i]) {
							self[i].faded = false ;
						}
					}) ;
			}
		}, [self, speed, easing, callback]) ;
	},
	slideUp: function(speed, easing, callback) {
		var self = this ;
		return this.each(this, function() {
			if (this.slided == false || !this.slided) {
				this.slideStyle	= CWeb.getCurCss(this, "height") ;
			}
			CWeb(this).animate({height: "0px", hide: true}, speed, easing, function() {
				for (var i = 0; i < self.length; i++) {
					if (self[i]) {
						self[i].slided = true ;
					}
					if (callback) {
						callback.apply() ;
					}
				}
			}) ;
				this.slided = true ;
		}, [self, speed, easing, callback]) ;
		},
	slideDown: function(speed, easing, callback) {
		var self = this ;
		return this.each(this, function() {
			if (this.slided == true) {
				CWeb(this).animate({height: this.slideStyle, show: true}, speed, easing, function() {
						if (callback) {
							callback.apply() ;
						}
						if (self[i]) {
							self[i].slided = false ;
						}
					}) ;
			}
			this.slided = false ;
		}, [self, speed, easing, callback]) ;
	},
	fadeTo: function(to, speed, easing, callback) {
		return this.animate({opacity: to}, speed, easing, callback) ;
	},
	animate: function(cssprops, speed, easing, callback) {
		var props = [] ;
		var opts = [] ;
		if (typeof easing === "string") {
			opts.easing = easing ;
		}
		if (typeof callback === "function") {
			opts.callback = callback ;
		}
		if (typeof easing === "function") {
			opts.callback = easing ;
		}
		if (typeof speed === "function") {
			opts.callback = speed ;
		}
		opts.speed = speed ;
		props["nocss"] = []
		props["nocss"]["speed"] = opts.speed ;
		props["nocss"]["callback"] = opts.callback ;
		props["nocss"]["easing"] = opts.easing ;
		if (speed == "slow") {
			props["nocss"]["timeLeft"] = 750 ;
			props["nocss"]["allTime"] = 750 ;	
		}
		else if (speed == "fast") {
			props["nocss"]["timeLeft"] = 300 ;
			props["nocss"]["allTime"] = 300 ;	
		}
		else if (speed == "instant") {
			props["nocss"]["timeLeft"] = 1 ;
			props["nocss"]["allTime"] = 1 ;	
		}
		else if (typeof speed === "number") {
			props["nocss"]["timeLeft"] = speed ;
			props["nocss"]["allTime"] = speed ;
		}
		else {
			props["nocss"]["timeLeft"] = 500 ;
			props["nocss"]["allTime"] = 500 ;
		}
		
		for (var i in cssprops) {
			props[i] = cssprops[i] ;
		}
		
		this.startAnim() ;
		return this.each(this, function() {
			cWeb.fx.enqueue(this, props) ;
		}, [props]) ;
	},
	startAnim: function() {
		if (!cWeb.animInit) {
			cWeb.animQuery = [] ;
			cWeb.animStarted = false;
			cWeb.animIntervalID = null ;
			cWeb.intervalCount = 5;
			cWeb.animInit = "Done" ;
		}
		if (cWeb.animStarted == true) {return this; }	//Timer muss nicht mehr gestartet werden, wenn er schon gestartet wurde
		cWeb.animIntervalID = setInterval(cWeb.fx.animate, cWeb.intervalCount) ;
		cWeb.animStarted = true;
		return this ;
	},
	stopAnim: function() {
		clearInterval(cWeb.animIntervalID) ;
		cWeb.animIntervalID = null ;
		cWeb.animStarted = false ;
	}
	
	
}) ;
CWeb.fx = {
	enqueue: function(elem, props) {
		for (var i in cWeb.animQuery) {
			if (cWeb.animQuery[i][0] == elem) {
				if (!cWeb.animQuery[i][2]) {
					cWeb.animQuery[i][2] = new Array() ;
				}
				for (var j in props) {
					cWeb.animQuery[i][2].push(props) ;
				}
				return cWeb.animQuery ;
			}
		}
		cWeb.animQuery.push([elem, props]) ;
	},
	dequeue: function(elem) {
		//Überprüfen, ob das Element noch aufgereit ist
		for (var i = 0; i < cWeb.animQuery.length; i++) {
			if (cWeb.animQuery[i][0] == elem) {
				cWeb.animQuery = cWeb.animQuery.removeItem(i) ;
			}
		}
		return cWeb.animQuery ;
	},
	animate: function(){
		//Read Props
		//Additional Properties in cWeb.animQuery[QueryIndex]["nocss"]
		for (var i = 0; i < cWeb.animQuery.length; i++) {
			var self = cWeb.fx ;
			self.queue = cWeb.animQuery[i] ;
			self.elem = self.queue[0] ;
			self.props = self.queue[1] ;
			if (!self.elem) {
				continue ;
			}
			if (!cWeb.animQuery[i]) {
				continue ;
			}
			self.opt = self.props["nocss"] ;
			self.cssprop = self.props ;
			self.callback = self.opt["callback"] ;
			
			//Overflow merken
			self.elem.style["oldOverflow"] = self.elem.style["overflow"] ;
			self.elem.style["overflow"] = "hidden" ;
			
			//Addidional Options
			//show / hide
			if (self.cssprop["show"]) {
				//Überprüfen, ob ein alter Wert existiert
				if (self.elem.style["oldDisplay"]) {
					if (self.elem.style["oldDisplay"] != "hidden" || self.elem.style["oldDisplay"] != "none") {
						self.elem.style["oldDisplay"] = null ;
						self.elem.style["display"] = self.elem.style["oldDisplay"] ;
					}
					else {
						self.elem.style["oldDisplay"] = null ;
						self.elem.style["display"] = "block" ;
					}
				}
				else {
					self.elem.style["oldDisplay"] = null ;
					self.elem.style["display"] = "block" ;
				}
			}
			if (self.elem.style["display"] == "none" && !self.cssprop["hide"]) {
				self.elem.style["display"] = "block" ;
			}
			for (j in self.cssprop) {
				//Werte setzten, die noch nicht gesetzt wurden
				if (j == "nocss" || j == "getItems" || j == "removeItem" || j == "hide" || j == "show") {
					continue ;
				}
				if (typeof self.cssprop[j] === "number") {
					self.cssprop[j] = String(self.cssprop[j]) ;
				}
				if (!self.opt.start) {
					self.opt.start = [] ;
				}
				if (!self.opt.ziel) {
					self.opt.ziel = [] ;
				}
				if (!self.opt.act) {
					self.opt.act = [] ;
				}
				if (!self.opt.start[j]) {
					self.opt.start[j] = parseFloat(cWeb.getCurCss(self.elem, j)) ;
				}
				if (!self.opt.act[j]) {
					self.opt.act[j] = parseFloat(self.opt.start[j]) ;
				}
				if (!self.opt.ziel[j]) {
					self.opt.ziel[j] = parseFloat(self.cssprop[j]) ;
				}
				if (!self.opt.lastTime) {
					self.opt.lastTime = [] ;
				}
				if (!self.opt.actTime) {
					self.opt.actTime = [] ;
				}
				if (!self.opt.lastTime[j]) {
					self.opt.lastTime[j] = cWeb.now() ;
				}
				if (!self.opt.actTime[j]) {
					self.opt.actTime[j] = self.opt.lastTime[j] ;
				}
				var einheit ;
				if (j != "opacity") {
					einheit = self.cssprop[j].replace(parseFloat(self.cssprop[j]), "")
				}
				self.css(j, self.step(j, self.opt.easing), einheit) ;
			}
			cWeb.animQuery[i][1] = self.cssprop ;
			cWeb.animQuery[i][1]["nocss"] = self.opt ;
			if (self.opt.done == true) {
				//Overflow zurücksetzen
				self.elem.style["overflow"] = self.elem.style["oldOverflow"] ;
				//Addidional Options...
				//hide / show
				if (self.cssprop["hide"]) {
					//Alten Wert speichern, nur falls nicht vorhanden
					if (!self.elem.style["oldDisplay"]) {
						self.elem.style["oldDisplay"] = self.elem.style["display"] ;
					}
					self.elem.style["display"] = "none" ;
				}
				if (self.callback) {
					if (typeof callback === "function") {
						callback.apply() ;
					}
				}
				if (cWeb.animQuery[i][2]) {
					if (cWeb.animQuery[i][2][0]) {
						cWeb.animQuery[i][1] = cWeb.animQuery[i][2].shift() ;
					}
					else {
					cWeb.fx.dequeue(self.elem) ;
					}
				}
				else {
					cWeb.fx.dequeue(self.elem) ;
				}
			}
		}
	},
	//Animationsschritt ausrechnen
	step: function(cssprop, easing) {
			/* No CSS - Properties
			 * allTime
			 * timeLeft
			 * callback
			 * last[cssprop]
			 * start[cssprop]
			 * ziel[cssprop]
			 * act[cssprop]
			 * actTime[cssprop]
			 * lastTime[cssprop]
			 */
			 
			this.opt.lastTime[cssprop] = this.opt.actTime[cssprop] ;
			this.opt.actTime[cssprop] = cWeb.now() + 1;
			var timeDiff = this.opt.lastTime[cssprop] - this.opt.actTime[cssprop] ;
			var animPos = this.opt.allTime / this.opt.timeLeft ;
			var animDiff = parseFloat(this.opt.ziel[cssprop]) - parseFloat(this.opt.start[cssprop]) ;
			var step = animDiff / this.opt.allTime * timeDiff ;
			if (!cWeb.easing[easing]) {
				easing = "swing" ;
			}
			step = cWeb.easing[easing](step, animPos) ;
			if (this.opt.ziel[cssprop] < this.opt.start[cssprop]) {
				this.opt.act[cssprop] = parseFloat(this.opt.act[cssprop]) - step ; 
				if (this.opt.act[cssprop] <= this.opt.ziel[cssprop]) {
					this.opt.act[cssprop] = this.opt.ziel[cssprop] ;
					this.opt.done = true ;
				}
				else {
					this.opt.done = false ;
				}
			}
			else if (this.opt.ziel[cssprop] > this.opt.start[cssprop]) {
				this.opt.act[cssprop] = parseFloat(this.opt.act[cssprop]) - step ;
				if (this.opt.act[cssprop] >= this.opt.ziel[cssprop]) {
					this.opt.act[cssprop] = this.opt.ziel[cssprop] ;
					this.opt.done = true ;
				}
				else {
					this.opt.done = false ;
				}
			}
			else {
				this.opt.act[cssprop] = this.opt.ziel[cssprop] ;
				this.opt.done = true ;
			}
			this.opt.timeLeft -= timeDiff ;
			return this.opt.act[cssprop];
	},
	//Style setzten
	css: function(cssprop, cssvalue, einheit) {
			if (cssprop == "opacity") {
				if (cWeb.Browser.isIE() && !this.elem.style.hasLayout) {
					this.elem.style["zoom"] = 1 ;
				}
				if(cWeb.Browser.isIE()) {
					this.elem.style["filter"] = "alpha(opacity=" + parseFloat(cssvalue) * 100 + ")" ;
				}
			}
			if (!einheit || einheit == "") {
				einheit = "px" ;
			}
			if (cssprop != "opacity") {
				//Einheit setzen
				cssvalue = String(cssvalue) + einheit ;
			}
			this.elem.style[cssprop] = cssvalue ;
	}
} ;
CWeb.easing = {
	linear: function(step, animPos) {
		return step ;
	},
	swing: function(step, animPos) {
		return step / animPos * 0.5;
	}
} ;
CWeb.getCurCss = function(elem, css) {
	if (elem.style[css]) {
		return elem.style[css] ;	
	}
	else {
		var ret ;

		if (document.defaultView) {
			if (document.defaultView.getComputedStyle) {
				var Convert = /[A-Z]/g ;
				var prop = css.replace(Convert, function(match) {
					return "-" + match.toLowerCase() ;
				}) ;
				ret = document.defaultView.getComputedStyle(elem)[css] ;
			}
		}
		else if (elem.currentStyle) {
			var Convert = /\-(\w)/g ;
			var prop = css.replace(Convert, function(match) {
				match = match.replace("-", "") ;
				return match.toUpperCase() ;
			}) ;
			ret = elem.currentStyle[prop] ;
			if (ret == "auto") {
				if (prop == "height") {
					ret = elem.scrollHeight ;
				}
				if (prop == "width") {
					ret = elem.scrollWidth ;
				}
			}
		}
		return ret ;
	}
}
CWeb.toJsStyle = function(style) {
	var Convert = /\-(\w)/g ;
	return style.replace(Convert, function(match) {
		match = match.replace("-", "") ;
		return match.toUpperCase() ;
	}) ;
} ;
CWeb.toCssStyle = function(style) {
	var Convert = /[A-Z]/g ;
	return style.replace(Convert, function(match) {
		return "-" + match.toLowerCase() ;
	}) ;
} ;
CWeb.removeItem = function(arr, index) {
	arr = arr.slice(0, index).concat(arr.slice(index + 1 )) ;
	return arr.slice(0, index).concat(arr.slice(index + 1 )) ;
}
//Array Prototype um .removeItem erweitern ;
Array.prototype.removeItem = function(index) {
		return this.slice(0, index).concat(this.slice(index + 1)) ;
} ;
//Object Prototype um .getItems erweitern ;
Object.prototype.getItems = function() {
		var items = [] ;
		for (i in this) {
			var len ;
			len = items.push(i) ;
		}
		return items ;
} ;
var $ = CWeb ;
window.$ = CWeb ;
window.cWeb = CWeb ;
var cWeb = CWeb ;
})() ;