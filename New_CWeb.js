/*+++++++++++++++++++++++++++*/
/* CWeb Javascript - Library */
/* Version: 0.2.2            */
/* Rev: 1                    */
/* Credits: Michael Möhrle   */
/*+++++++++++++++++++++++++++*/

/*
 *Changelog:                                    
 *Version 0.1 (Rev2):                           
 **Added HTML RegExp                             
 *Version 0.1 (Rev3):    
 **Added Possibility to use HTML-Strings as selector
 **Addes Type-property
 *Version 0.1 (Rev4):
 **Type-property now ready to use
 *Version 0.1 FINAL
 **CWeb(-HTML-String-).append() -->Funktioniert ab jetzt!
 *Version 0.1.1 (Rev1)
 **Removed type and .append() for HTML-String, now appended at call (Use the context-argument)
 *Version 0.2 FINAL
 **Added:
 ***.class(type, name): types: add, remove
 ***.attr(type, name, value): types: set, remove, get
 ***.css(type, cssprop, cssvalue): types: add, remove, clear, get
 ***.parent(): returns the parents of the matched elements
 ***.childs(): returns the childs of the matched elements
 ***.end(): returns the last CWeb-Object from the CWeb-Stack
 **Stack implemented
 *Version 0.2.1 (Rev1)
 **.append(a), etc, can now handle the same selectors than the CWeb-Object!
 *Version 0.2.1 (Rev2)
 **NEW Selectors: Plain Text now supported
 *Version 0.2.2 (Rev0)
 **Added:
 ***.wrap(a): wraps all matched elements (a = selector)
 ***.unwrap(): unwraps all matched elements
 *Version 0.2.2 (Rev1)
 **Implementing: Animations <-- DO NOT WORK
 *Version 0.2.2 (Rev2)
 **Fixed .attr(type, name, value): Falls type versehentlich falsch geschrieben wurde.
 **Added:
 ***Kurzform für .style([type], cssprop, cssvalue):
 ****Wenn man Attribute hinzufügen möchte, muss man nicht mehr zusätzlich am Anfang "add" angeben
 ***.appendTo(target): Hängt alle Matched elements zu target an.
 ***.attr(type, name, value): Nun für "set" auch "add" zulässig
 ***Kurzform für .attr([type], name, value)_
 ****Wenn man Attribute hinzufügen möchte, muss man nicht mehr zusätzlich am Anfang "add" angeben
 */  
                      
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
		if (selector instanceof Node) {
			this[0] = selector ;
			this.length = 1 ;
			this.context = context ;
	
		}
	 	return this ;
	},
	Version: '0.2.2',
	Rev: '1',
	length: 0,
	size: function() {
		return this.length ;
	},
	attr: function(type, name, value){
		//Kurzform für (set|add), überprüfen, ob alle anderen Möglichkeiten aussscheiden
		if (!value && type != "remove" && type != "get") {
			return this.each(this, function() {
				this[type] = name ;
			}, [type, name]) ;
		}
		if (type == "set" || "add") {
			return this.each(this, function() {
				this[name] = value ;
			}, [name, value]) ;
		}
		if (type == "remove") {
			return this.each(this, function() {
				this[name] = null ;	
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
	class: function(type, name) {
		if (type == "add") {
			return this.each(this, function() {
				var Classes = this.classList ;
				Classes[Classes.length] = name ;
				this.classList = Classes ;
			}, [name]) ;
		}
		if (type == "remove") {
			return this.each(this, function() {
				this.classList[name] = null ;
			}, [name]) ; ;
		}
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
	}
}
//InitCWeb Prototype = CWeb Prototype
CWeb.fn.InitCWeb.prototype = CWeb.fn ;

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
		if (selector instanceof Node) {
			elem = selector ;
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
	pop: Array.prototype.pop,

}) ;
CWeb.fn = CWeb.extend(CWeb.fn, {
	intervalCount: 100,
	animate: function(speed, cssprops) {
		var props = [] ;
		props["speed"] = speed ;
		if (speed == "slow") {
			props["timeLeft"] = 1500 ;
			props["allTime"] = 1500 ;	
		}
		if (speed == "fast") {
			props["timeLeft"] = 500 ;
			props["allTime"] = 500 ;	
		}
		for (i in cssprops) {
			props[i] = cssprops[i] ;
		}
		this.startAnim() ;
		self = this ;
		return this.each(this, function() {
			self.addQuery(this, props)
		}, [props, self]) ;
	},
	addQuery: function(elems, props) {
		for (i in elems) {
			for (j in props) {
				this.animQuery.push([i, j]) ;	
			}
		}
	},
	doAnim: function(self) {
		var elem, props ;
		var currTime = new Date().now ;
		for (i in this.animQuery) {
			elem = this.animQuery[i][0] ;
			props = this.animQuery[i][1] ;
			var lastTime = this.animQuery[i][3] ;
			this.animQuery[i][3] = currTime ;
			props["timeLeft"] -= lastTime ;
			alert(this) ;
			alert(props["width"]) ;
			if (props["width"]) {
				this.css("add", "width", "2px" /*/ props["allTime"] * props["timeLeft"]*/) ;
			}
		}
	},
	animQuery:[],
	animStarted: false,
	animIntervalID: null,
	startAnim: function() {
		this.animIntervalID = setInterval(this.doAnimation, this.IntervalCount) ;
		this.animStarted = true;
	},
	stopAnim: function() {
		clearInterval(self.animIntervalID) ;
		self.animIntervalID = null ;
		self.animStarted = false ;
	},
	
	
}) ;
$ = CWeb ;
window.$ = CWeb ;

})() ;