/*+++++++++++++++++++++++++++*/
/* CWeb Javascript - Library */
/* Version: 0.2.4            */
/* Rev: Rev5                 */
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
 *Version 0.2.2.1 (Rev0)
 **Animations.... (Easings)
 *Version 0.2.2 FINAL
 **Added:
 ***Animations:
 ****width
 ****heigth
 ****opacity
 ***AnimationCalls
 ****.animate(AnimMap, [speed]): Example:
 *****$("#Test").animate({width: 50}), "slow") ;
 *Version 0.2.3 FINAL
 **Added:
 ***.click(fn)
 ***.hover(fn_in, fn_out)
 **Fixed:
 ***Animations: Now Cross-Browser
 ***Some other small Fixes
 **Changed:
 ***.class(type, name):
 ****NOW: .addClass(name) + .removeClass(name)
 *Version 0.2.4 (Rev1)
 **Fixed some stuff
 *Version 0.2.4 (Rev2)
 **Fixed: CWeb.getCurrCss: ParseFloat für den Rückgabewert wurde entfernt
 *Version 0.2.4 (Rev3)
 **Fixes
 **Animationen teilweise funktionsfähig mit oncomplete-methode
 *Version 0.2.4 (Rev4)
 **Verbessert: oncomplete Methode für Animationen <-- Funktioniert nicht!
 *Version 0.2.4 (Rev5)
 **Verbessert oncomplete Methode für Animationen <-- NAJA
 */