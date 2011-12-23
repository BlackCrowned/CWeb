/*+++++++++++++++++++++++++++*/
/* CWeb Javascript - Library */
/* Version: 0.2.6            */
/* Rev: Beta                 */
/* Credits: Michael Möhrle   */
/*+++++++++++++++++++++++++++*/

var CWeb = (function() {
	var CWeb = function(selector, context) {
		return new CWeb.fn.InitCWeb(selector, context) ;
	},
	
	RegexpID = /^#\w*$/,
	RegexpHTML = /^<\s*\w{1,}\s*(\w|\W)*(\/\s*>$|>(\w|\W){1,}\s*<\s*\/\w{1,}>)|>$/,
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
			//ID
			if (RegexpID.test(selector)) {
				id = selector.slice(1) ;
				elem = document.getElementById(id) ;
				this[0] = elem ;
				this.context = context ;
				this.length = 1 ;
			}
			else if (RegexpHTML.test(selector)) {
				var elem = this.createDomObj(selector) ;
				this[0] = context.appendChild(elem) ;
				this.context = context ;
				this.length = 1 ;
			}
			else {
				var elem = this.createDomObj("<p>" + selector + "</p>") ;
				this[0] = context.appendChild(elem) ;
				this.context = context ;
				this.length = 1 ;	
			}
		}
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
	Version: '0.2.5',
	Rev: 'Beta',
	length: 0,
	size: function() {
		return this.length ;
	},
	attr: function(type, name, value){
		//Kurzform für (set|add), überprüfen, ob alle anderen Möglichkeiten aussscheiden
		if (!value && type != "remove" && type != "get") {
			return this.each(this, function() {
				this.setAttribute(type, name) ;
			}, [type, name]) ;
		}
		if (type == "set" || "add") {
			return this.each(this, function() {
				this.setAttribute(name, value) ;
			}, [name, value]) ;
		}
		if (type == "remove") {
			return this.each(this, function() {
				this.removeAttribute(name) ;
			}, [name]) ;
		}
		if (type == "get") {
			for (i = 0; i < this.length; i++) {
				return this[i][name] ;	
			}
		}
		return this;
	},
	css: function(type, cssprop, cssvalue) {
		//Kurzform für add, überprüfen, ob alle anderen Möglichkeiten aussscheiden
		if (!cssvalue && type != "clear" && type != "remove") {
			return this.each(this, function() {
				this.style[type] = cssprop ;
			}, [type, cssprop]) ;
		}
		if (type == "add") {
			return this.each(this, function() {
				this.style[cssprop] = cssvalue ;	
			}, [cssprop, cssvalue]) ;
		}
		if (type == "remove") {
			return this.each(this, function() {
				this.style[cssprop] = null ;	
			}, [cssprop]) ;
		}
		if (type == "clear") {
			return this.each(this, function() {
				for (j in this[i].style) {
					this.style[j] = null ;	
				}
			}) ;
		}
		if (type == "get") {
			var Style = new Array() ;
			for (i = 0; i < this.length; i++) {
				Style[i] = this[i].style[cssprop] ;	
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
	childs: function() {
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
		a = args ;
		for (i = 0; i < a.length; i++) {
			a[i] = this.selecter(args[i]) ;	
		}
		return this.each(this, function() {
			if (a.length == undefined) {
				a.length = 0 ;
				for (i in a) {
					a.length++ ;
				}
			}
			for (i = a.length; i >= 1; i--) {
				fn.apply(this, a) ;
				//1. Element entfernen
				a[0] = a[i - 1] ;
			}
		}) ;
	},
	createDomObj: function(HTML) {
		var DomObj = document.createElement("div") ;
		DomObj.innerHTML = HTML ;
		
		return DomObj ;
	},
	wrap: function(a) {
		
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
	}
	
}
//InitCWeb Prototype = CWeb Prototype
CWeb.fn.InitCWeb.prototype = CWeb.fn ;

CWeb.now = function() {
		return (new Date()).getTime() ;	
	}
CWeb.merge = function(obj, props) {
	for (prop in props ) {
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
		var elem, id ;
		//Is String?
		if (typeof selector === "string") {
			//ID
			if (RegexpID.test(selector)) {
				id = selector.slice(1) ;
				elem = document.getElementById(id) ;
			}
			else if (RegexpHTML.test(selector)) {
				elem = this.createDomObj(selector) ;
			}
			else {
				elem = this.createDomObj("<p>" + selector + "</p>") ;
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
			for (i = 0; i < obj.length; i++) {
				fn.apply(obj[i], args) ;	
			}
		}
		else {
			for (i in obj) {
				fn.apply(obj[i], args) ;	
			}
		}
		return obj ;
	},
	
	push: Array.prototype.push,
	pop: Array.prototype.pop
	

}) ;
CWeb.fn = CWeb.extend(CWeb.fn, {
	bindEvent: function(type, fn) {
		return this.each(this, function() {
			if (document.body.addEventListener) {
				this.addEventListener(type, fn, false) ;
			}
			else {
				this.attachEvent("on" + type, fn) ;
			}
		}, [type, fn]) ;
	},
	click: function(fn) {
		return this.bindEvent("click", fn) ;
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
		self = this ;
		return this.each(this, function() {
			if (this.hidden == false || !this.hidden) {
				this.hideStyle = [] ;
				this.hideStyle["width"] = CWeb.getCurCss(this, "width") ;
				this.hideStyle["height"] = CWeb.getCurCss(this, "height") ;
				this.hideStyle["opacity"] = CWeb.getCurCss(this, "opacity") ;
				CWeb(this).animate({width: "0px", height: "0px", opacity: "0"}, speed, callback) ;
				this.hidden = true;
			}
		}, [self, speed, callback]) ;
	},
	show: function(speed, callback) {
		self = this ;
		return this.each(this, function() {
			if (this.hidden == true) {
					CWeb(this).animate({width: this.hideStyle["width"], height: this.hideStyle["height"], opacity: this.hideStyle["opacity"]}, speed, callback) ;
				this.hidden = false ;
			}
		}, [self, speed, callback]) ;
	},
	fadeOut: function(speed, callback) {
		self = this ;
		return this.each(this, function() {
			if (this.faded == false || !this.faded) {
				this.fadeStyle = CWeb.getCurCss(this, "opacity") ;
				CWeb(this).animate({opacity: "0"}, speed, callback) ;
				this.faded = true ;
			}
		}, [self, speed, callback]) ;
	},
	fadeIn: function(speed, callback) {
		self = this ;
		return this.each(this, function() {
			if (this.faded == true) {
				if (!this.fadeStyle) {
					this.fadeStyle = 1 ;	
				}
				CWeb(this).animate({opacity: this.fadeStyle}, speed, callback) ;
				this.faded = false;
			}
		}, [self, speed, callback]) ;
	},
	slideUp: function(speed, callback) {
		self = this ;
		return this.each(this, function() {
			if (this.slided == false || !this.slided) {
				this.slideStyle	= CWeb.getCurCss(this, "height") ;
				CWeb(this).animate({height: "0px"}, speed).animate({opacity: "0"}, "instant", callback) ;
				this.slided = true ;
			}
		}, [self, speed, callback]) ;
		},
	slideDown: function(speed, callback) {
		self = this ;
		return this.each(this, function() {
			if (this.slided == true) {
				CWeb(this).css("opacity", "1").animate({height: this.slideStyle}, speed, callback) ;
				this.slided = false ;
			}
		}, [self, speed, callback]) ;
	},
	animate: function(cssprops, speed, callback) {
		var props = [] ;
		props["speed"] = speed ;
		props["lastTime"] = CWeb.now() ;
		props["callback"] = callback ;
		
		if (speed == "slow") {
			props["timeLeft"] = 750 ;
			props["allTime"] = 750 ;	
		}
		else if (speed == "fast") {
			props["timeLeft"] = 300 ;
			props["allTime"] = 300 ;	
		}
		else if (speed == "instant") {
			props["timeLeft"] = 1 ;
			props["allTime"] = 1 ;	
		}
		else  {
			props["timeLeft"] = 500 ;
			props["allTime"] = 500 ;
		}
		for (i in cssprops) {
			props[i] = cssprops[i] ;
		}
		
		this.startAnim() ;
		var self = this ;
		this.css("overflow", "hidden") ;
		return this.each(this, function() {
			self.enqueue(this, props) ;
		}, [props]) ;
	},
	doAnimation: function() {
		for (i in window.animQuery) {
			//Variablen vorbereiten
			if (i == "removeItem") {	//Verhindern, dass .removeItem als Array-Object angenommen wird
				continue ;	
			}
			try {
				if (!window.animQuery[i][0]) {	//Verhindern, dass fehlerhafte Elemente Fehler im IE verursachen
					window.animQuery = window.animQuery.removeItem(i) ;	
					continue ;
				}
			}
			catch(e) {
				window.animQuery = window.animQuery.removeItem(i) ;
				continue ;
			}
			if (!window.animQuery[i][0].style) {	//Verhindern, dass Elemente ohne style, Attribute verwendet werden. z.B: DOMObject
				window.animQuery = window.animQuery.removeItem(i) ;
				continue ;	
			}
			var elem = window.animQuery[i][0] ;
			var props = window.animQuery[i][1] ;
			var actTime = CWeb.now() ;
			var lastTime = props["lastTime"] ;
			var timeLeft = props["timeLeft"] ;
			var allTime = props["allTime"] ;
			var diffTime = actTime - lastTime ;
			var nextWidth = undefined;
			var nextHeight = undefined;
			var nextOp = undefined;
			var nextLeft = undefined;		
			
			
			if (props["width"]) {
				var einheit, step ;
				var zielPos = parseInt(props["width"]) ;
				var curPos = parseFloat(CWeb.getCurCss(elem, "width")) ;
				var startPos = !props["startWidth"] ? props["startWidth"] = parseFloat(CWeb.getCurCss(elem, "width")) : props["startWidth"] ;
				typeof props["width"] === "string" ? einheit = props["width"].replace(zielPos, "") : einheit = "px" ;
				if (einheit == "") {einheit = "px" ;}
				//Step mit easing
				step = CWeb.easing.linear(diffTime, zielPos, startPos, allTime) ;
				nextWidth = curPos + step
				//Verhindern, dass die Animation über das Ziel hinausläuft
				if (zielPos > startPos) {
					if ((nextWidth + step) > zielPos) {
					nextWidth = zielPos ;
					props["DONE"] = true ;
					}
					else {props["DONE"] = false ;}
				}
				else if(zielPos < startPos) {
					if ((nextWidth + step) < zielPos) {
					nextWidth = zielPos ;
					props["DONE"] = true ;
					}
					
				}
				
				nextWidth = String(nextWidth) + einheit ;
			}
			if (props["left"]) {
				var einheit, step ;
				var zielPos = parseInt(props["left"]) ;
				var curPos = parseFloat(CWeb.getCurCss(elem, "left")) ;
				var startPos = !props["startLeft"] ? props["startLeft"] = parseFloat(CWeb.getCurCss(elem, "left")) : props["startLeft"] ;
				typeof props["left"] === "string" ? einheit = props["left"].replace(zielPos, "") : einheit = "px" ;
				if (einheit == "") {einheit = "px" ;}
				//Step mit easing
				step = CWeb.easing.linear(diffTime, zielPos, startPos, allTime) ;
				nextLeft = curPos + step
				//Verhindern, dass die Animation über das Ziel hinausläuft
				if (zielPos > startPos) {
					if ((nextLeft + step) > zielPos) {
					nextLeft = zielPos ;
					props["DONE"] = true ;
					}
					else {props["DONE"] = false ;}
				}
				else if(zielPos < startPos) {
					if ((nextLeft + step) < zielPos) {
					nextLeft = zielPos ;
					props["DONE"] = true ;
					}
					
				}
				
				nextLeft = String(nextLeft) + einheit ;
			}
			if (props["height"]) {
				var einheit, step ;
				var zielPos = parseInt(props["height"]) ;
				var curPos = parseFloat(CWeb.getCurCss(elem, "height")) ;
				var startPos = !props["startHeight"] ? props["startHeight"] = parseFloat(CWeb.getCurCss(elem, "height")) : props["startHeight"] ;
				typeof props["height"] === "string" ? einheit = props["height"].replace(zielPos, "") : einheit = "px" ;
				if (einheit == "") {einheit = "px" ;}
				//Step mit easing
				step = CWeb.easing.linear(diffTime, zielPos, startPos, allTime) ;
				nextHeight = curPos + step
				//Verhindern, dass die Animation über das Ziel hinausläuft
				if (zielPos > startPos) {
					if ((nextHeight + step) > zielPos) {
					nextHeight = zielPos ;
					props["DONE"] = true ;
					}
					else {props["DONE"] = false ;}
				}
				else if(zielPos < startPos) {
					if ((nextHeight + step) < zielPos) {
					nextHeight = zielPos ;
					props["DONE"] = true ;
					}
					else {props["DONE"] = false ;}
				}
				
				nextHeight = String(nextHeight) + einheit ;
			}
			
			if (props["opacity"]) {
				var step ;
				var zielOp = props["opacity"] ;
				var curOp = parseFloat(CWeb.getCurCss(elem, "opacity")) ;
				var startOp = !props["startOp"] ? props["startOp"] = parseFloat(CWeb.getCurCss(elem, "opacity"))  : props["startOp"] ;
				//Step mit easing
				step = CWeb.easing.linear(diffTime, zielOp, startOp, allTime) ;
				nextOp = curOp + step ;
				//Verhindern, dass die Animation über das Ziel hinausläuft
				if (zielOp > startOp) {
					if ((nextOp + step) > zielOp) {
					nextOp = zielOp ;
					props["DONE"] = true ;
					}
					else {props["DONE"] = false ;}
				}
				else if(zielOp < startOp) {
					if ((nextOp + step) < zielOp) {
						nextOp = zielOp ;
						props["DONE"] = true ;
					}
					else {props["DONE"] = false ;}
				}
			}
			//Variablen aktualisieren
			timeLeft -= diffTime ;
			//Variablen in props speichern
			props["timeLeft"]-= diffTime ;
			props["lastTime"] = actTime ;
			
			//Styles anwenden:
			if (nextWidth != undefined) {elem.style["width"] = nextWidth ;}
			if (nextHeight != undefined) {elem.style["height"] = nextHeight; }
			if (nextOp != undefined) {
				elem.style["opacity"] = nextOp; 
				elem.style["filter"] = "alpha(opacity=" + nextOp * 100 + ")" ;
			}
			if (nextLeft != undefined) {elem.style["left"] = nextLeft ;}
			//Variablen im animQuery speichern
			if (props["DONE"] == false) {
				window.animQuery[i][1] = props ;
			}
			else if (props["DONE"] == true) {
				//Callback ausführen !Nur wenn Vorhanden!
				if (props["callback"]) {
					props["callback"].apply() ;
					window.animQuery[i][1]["callback"] = undefined ;
				}
				elem.style.overflow = undefined ;
				if (window.animQuery[i][2]) {
					if (window.animQuery[i][2][0]) {
						window.animQuery[i][1] = window.animQuery[i][2].shift() ;
						window.animQuery[i][1]["lastTime"] = CWeb.now() ;
					}
					else {
						window.animQuery = window.animQuery.removeItem(i) ;
						//Falls keine Animation mehr ausgeführt werden muss, AnimationsIntervall Stoppen!
						if (window.animQuery.length == 0) {
							CWeb().stopAnim() ;
						}
					}
				}
				else {
					window.animQuery = window.animQuery.removeItem(i) ;
					//Falls keine Animation mehr ausgeführt werden muss, AnimationsIntervall Stoppen!
					if (window.animQuery.length == 0) {
						CWeb().stopAnim() ;
					}
				}
			}
			
					
		}
	},
	
	enqueue: function(elem, props) {
		for (i in window.animQuery) {
			if (window.animQuery[i][0] == elem) {
				if (!window.animQuery[i][2]) {
					window.animQuery[i][2] = new Array() ;
				}
				for (j in props) {
					//window.animQuery[i][2][window.animQuery[i][2].length][j] = props[j] ;
					window.animQuery[i][2].push(props) ;
				}
				return window.animQuery ;
			}
		}
		window.animQuery.push([elem, props]) ;
	},
	startAnim: function() {
		if (!window.animInit) {
			window.animQuery = [] ;
			window.animStarted = false;
			window.animIntervalID = null ;
			window.intervalCount = 10 ;
			window.animInit = "Done" ;
		}
		if (window.animStarted == true) {return this; }	//Timer muss nicht mehr gestartet werden, wenn er schon gestartet wurde
		window.animIntervalID = setInterval(this.doAnimation, window.intervalCount) ;
		window.animStarted = true;
		return this ;
	},
	stopAnim: function() {
		clearInterval(window.animIntervalID) ;
		window.animIntervalID = null ;
		window.animStarted = false ;
	}
	
	
}) ;
CWeb.getCurCss = function(elem, css) {
	if (elem.style[css]) {
		return elem.style[css] ;	
	}
	else {
		try  {
			return document.defaultView.getComputedStyle(elem)[css] ;
		}
		catch(e) {
			var ret = elem.currentStyle[css] ;
			while (ret == "auto" || "inherit") {
				try {
					elem = elem.parentNode ;
					ret = elem.currentStyle[css] ;	
				}
				catch(e) {
					ret = window.screen.width;	
					return ret ;
				}
			}
			return ret ;
		}
	}
}
CWeb.removeItem = function(arr, index) {
	arr = arr.slice(0, index).concat(arr.slice(index + 1 )) ;
	return arr.slice(0, index).concat(arr.slice(index + 1 )) ;
}
//Array Prototype um .removeItem erweitern ;
Array.prototype = CWeb.extend(Array.prototype, {
	removeItem: function(index) {
		return this.slice(0, index).concat(this.slice(index + 1)) ;
	}
}) ;
$ = CWeb ;
window.$ = CWeb ;

})() ;