/*+++++++++++++++++++++++++++*/
/* CWeb Javascript - Library */
/* Version: 0.2.9.5          */
/* Rev: FINAL                */
/* Credits: Michael Möhrle   */
/*+++++++++++++++++++++++++++*/

var CWeb = (function() {
	var CWeb = function(selector, context) {
		return new CWeb.fn.InitCWeb(selector, context) ;
	},
	
	RegexpID = /^#\w*$/,
	RegexpClass = /^\.\w*$/,
	RegexpHTML = /^<\s*\w{1,}\s*(\w|\W)*(\/\s*>$|>(\w|\W){1,}\s*<\s*\/\w{1,}>)|>$/,
	
	RegexpHoverSelector = /:hover\W*$/,
	_$ = window.$,
	_CWeb = window.CWeb ;
	
CWeb.fn = CWeb.prototype = {
	
	constructor: CWeb,
	InitCWeb: function(selector, context) {
		var elem, id ;
		if (!context) {
			context = document.body ;	
		}
		//Is String?
		if (typeof selector === "string") {
			//Body
			if (selector == "body") {
				this[0] = document.body ;
				this.context = context ;
				this.length = 1 ;	
			}
			//ID
			else if (RegexpID.test(selector)) {
				id = selector.slice(1) ;
				elem = document.getElementById(id) ;
				this[0] = elem ;
				this.context = context ;
				this.length = 1 ;
			}
			//Class
			else if (RegexpClass.test(selector)) {
				Class = selector.slice(1) ;
				elems = document.getElementsByClassName(Class) ;
				for (i = 0; i < elems.lenght; i++) {
					this[i] = elems[i] ;
					this.length = i + 1 ;	
				}
				this.context = context ;
			}
			//HTML
			else if (RegexpHTML.test(selector)) {
				elem = this.createDomObj(selector) ;
				this[0] = context.appendChild(elem) ;
				this.context = context ;
				this.length = 1 ;
			}
			//Einfacher Text, wenn Obiges nicht zutrifft
			else {
				elem = this.createDomObj("<p>" + selector + "</p>") ;
				this[0] = context.appendChild(elem) ;
				this.context = context ;
				this.plugin_file = selector ;
				this.length = 1 ;	
			}
		}
		//Is CWeb Object
		if (selector) {
			if (selector.Rev) {
				return selector ;	
			}
		}
		//Is DOMElement
		try{
			if (selector instanceof Node) {
				this[0] = selector ;
				this.length = 1 ;
				this.context = context ;
	
			}
		}
		catch(e) {
			try {
				if (selector.nodeType) {
					this[0] = selector ;
					this.length = 1 ;
					this.context = context ;
				}
			}
			catch(ex) {
				
			}
		}
	 	return this ;
	},
	Version: '0.2.9.5',
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
							this.style[j] = type[j] ;	
						}
					}
					else {
						this.style[type] = cssprop ;
					}
				}
			}, [type, cssprop]) ;
		}
		if (type == "add") {
			return this.each(this, function() {
				if (this.style) {
					if (typeof cssprop === "object") {
						for (j in cssprop) {
							this.style[j] = cssprop[j] ;	
						}
					}
					else {
						this.style[cssprop] = cssvalue ;	
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
		return this.attr("class", name) ;
	},
	removeClass: function(name) {
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
		var elem, id, Class ;
		//Is String?
		if (typeof selector === "string") {
			//Body
			if (selector == "body") {
				elem = document.body ;
			}
			//ID
			else if (RegexpID.test(selector)) {
				id = selector.slice(1) ;
				elem = document.getElementById(id) ;
			}
			//Class
			else if (RegexpClass.test(selector)) {
				Class = selector.slice(1) ;
				elem = document.getElementsByClassName(Class) ;
			}
			//HTML
			else if (RegexpHTML.test(selector)) {
				elem = this.createDomObj(selector) ;
			}
			//Einfacher Text, wenn obiges nicht zutrifft
			else {
				elem = this.createDomObj(selector) ;
			}
		}
		try{
			if (selector instanceof Node) {
				elem = selector
			}
		}
		catch(e) {
			if (selector.nodeType) {
				elem = selector
			}
		}
	 	return elem ;
	},
	cssSelecter: function(selector, elem) {
		//CWeb-Object auf dem Stack speichern
		this.Stack("push", this) ;
		
		//Überprüfen, ob der Selector auch ein String ist
		if (typeof selector === "string") {
			//CssSelectoren der Reihe nach testen, es kann immer nur ein Selector gewählt werden!
			if (RegexpHoverSelector.test(selector)) {
				
			}
		}
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
	hide: function(speed, callback) {
		var self = this ;
		if (!speed) {
			speed = "instant" ;
		}
		return this.each(this, function() {
			if (this.hidden == false || !this.hidden) {
				this.hideStyle = [] ;
				this.hideStyle["width"] = CWeb.getCurCss(this, "width") ;
				this.hideStyle["height"] = CWeb.getCurCss(this, "height") ;
				this.hideStyle["opacity"] = CWeb.getCurCss(this, "opacity") ;
			}
			CWeb(this).animate({width: "0px", height: "0px", opacity: "0", hide: true}, speed, function() {
				for (var i = 0; i < self.length; i++) {
					if (self[i]) {
						self[i].hidden = true ;
					}
					if (callback) {
						callback.apply() ;
					}
				}
			}) ;
			this.hidden = true;
		}, [self, speed, callback]) ;
	},
	show: function(speed, callback) {
		var self = this ;
		if (!speed) {
			speed = "instant" ;
		}
		return this.each(this, function() {
			if (this.hidden == true) {
					CWeb(this).animate({width: this.hideStyle["width"], height: this.hideStyle["height"], opacity: this.hideStyle["opacity"], show: true}, speed, function() {
						if (callback) {
							callback.apply() ;
						}
						if (self[i]) {
							self[i].hidden = false ;
						}
					}) ;
			}
		}, [self, speed, callback]) ;
	},
	fadeOut: function(speed, callback) {
		var self = this ;
		return this.each(this, function() {
			if (this.faded == false || !this.faded) {
				this.fadeStyle = CWeb.getCurCss(this, "opacity") ;
			}
			CWeb(this).animate({opacity: "0", hide: true}, speed,function() {
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
		}, [self, speed, callback]) ;
	},
	fadeIn: function(speed, callback) {
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
				CWeb(this).animate({opacity: this.fadeStyle, show: true}, speed, function() {
						if (callback) {
							callback.apply() ;
						}
						if (self[i]) {
							self[i].faded = false ;
						}
					}) ;
			}
		}, [self, speed, callback]) ;
	},
	slideUp: function(speed, callback) {
		var self = this ;
		return this.each(this, function() {
			if (this.slided == false || !this.slided) {
				this.slideStyle	= CWeb.getCurCss(this, "height") ;
			}
			CWeb(this).animate({height: "0px", hide: true}, speed, function() {
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
		}, [self, speed, callback]) ;
		},
	slideDown: function(speed, callback) {
		var self = this ;
		return this.each(this, function() {
			if (this.slided == true) {
				CWeb(this).animate({height: this.slideStyle, show: true}, speed, function() {
						if (callback) {
							callback.apply() ;
						}
						if (self[i]) {
							self[i].slided = false ;
						}
					}) ;
			}
		}, [self, speed, callback]) ;
	},
	animate: function(cssprops, speed, callback) {
		var props = [] ;
		props["nocss"] = []
		props["nocss"]["speed"] = speed ;
		props["nocss"]["lastTime"] = CWeb.now() ;
		props["nocss"]["callback"] = callback ;
		
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
		var self = this ;
		return this.each(this, function() {
			self.enqueue(this, props) ;
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
		//cWeb.animIntervalID = setInterval(this.doAnimation, cWeb.intervalCount) ;
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
		//Überprüfen, ob das Element schon eingereit ist: Animation anhängen
		for (var i = 0; i < cWeb.animQuery.length; i++) {
			if (cWeb.animQuery[i][0] == elem) {
				cWeb.animQuers[i][0].push(props) ;
			}
		}
		//Optionen werden einfach angereit.
		var i = cWeb.animQuery.push([]) - 1;
		cWeb.animQuery[i].push(elem) ;
		cWeb.animQuery[i][0].push(props) ;
		return cWeb.animQuery ;
		
	},
	dequeue: function(elem, animIndex) {
		//Überprüfen, ob das Element noch aufgereit ist
		for (var i = 0; i < cWeb.animQuery.length; i++) {
			if (cWeb.animQuery[i][0] == elem) {
				//Falls nur eine bestimmte Animation gelöscht werden soll
				if (animIndex || animIndex == 0) {
					//Überprüfen, ob diese Animation überhaupt noch eine eingereit ist
					if (!cWeb.animQuery[i][0][animIndex]) {
						//Falls animIndex = 0 ist, ganzes Element aus der Reihe löschen
						if (animIndex == 0) {
							cWeb.animQuery = cWeb.animQuery.removeItem(i) ;
						}
						return null ;
					}
					//Animation aus der Reihe löschen
					cWeb.animQuery[i][0] = cWeb.animQuery[i][0].removeItem(animIndex) ;
				}
				//Ansonsten ganzes Element aus der Reihe löschen
				else {
					cWeb.animQuery = cWeb.animQuery.removeItem(i) ;
				}
			}
		}
		return cWeb.animQuery ;
	},
	getqueue: function(elem) {
		//Überprüfen, ob das Element noch aufgereit ist
		for (var i = 0; i < cWeb.animIndex.length; i++) {
			if (cWeb.animQuery[i][0] == elem) {
				//Überprüfen, ob noch Animationen existieren, ansonsten Element löschen und null zurückgeben
				if (!cWeb.animQuery[i][0][0]) {
					this.dequeue(elem) ;
					return null ;
				}
				else {
					return cWeb.animQuery[i][0][0] ;
				}
			}
		}
	},
	getQueuedElemById: function(id) {
		if (cWeb.amimQuery[i]) {
			if (cWeb.animQuery[i][0]) {
				return cWeb.animQuery[i][0] ;
			}
		}
	},
	queuelen: function() {
		return cWeb.animQuery.length ;
	},
	animate: function(){
		//Read Props
		//Additional Properties in cWeb.animQuery[QueryIndex]["nocss"]
		for (var i = 0; i < this.queuelen; i++) {
			this.elem = this.getQueuedElemById(i) ;
			this.opt = this.getqueue(this.elem)["nocss"] ;
			this.cssprop = this.getqueue(this.elem) ;
			this.cssprop["nocss"] = null ;
			var self = this ;
		}
		//Style setzten
		this.css = function(elem, cssprop, cssvalue) {
			
			if (cssprop == "opacity") {
				if (cWeb.Browser.isIE() && !elem.style.hasLayout) {
					elem.style["zoom"] = 1 ;
				}
				if(cWeb.Browser.isIE()) {
					elem.style["filter"] = "alpha(opacity=" + parseFloat(cssvalue) * 100 + ")" ;
				}
			}
			
			elem.style[cssprop] = cssvalue ;
		}
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