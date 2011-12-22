/*+++++++++++++++++++++++++++*/
/* CWeb Javascript - Library */
/* Version: 0.2.5            */
/* Rev: Rev3                 */
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
 *Version 0.2.4 (Rev6)
 **Added:
 ***.show([speed]): Lässt eine Gruppe von matched Elements stylisch verschwinden
 **Verbessert: oncpmplete Methode für Animationen <-- NAJA
 *Version 0.2.4 (Rev7)
 **Added:
 ***.innerText(Text): Fügt Text in eine Gruppe vom matched Elements ein
 ***.innerHTML(HTML): Fügt Text in eine Gruppe von matched Elements ein
 ***.outerText(): Gibt den Text des 1. matched Elements zurück
 ***.outerHTML(): Gibt den Text des 1. machted Elements zurück
 *Version 0.2.4 (Rev8)
 **Added:
 ***.inner(selector): Hängt den Inhalt des selectors an eine Gruppe von matched Elements als ChildNode an.
                      Dafor aber der Inhalt der Elemente aus der Gruppe der matched Elements gelöscht.
 *Version 0.2.4 (Rev9)
 **Verbessert:
 ***Animations-Handling: Objecte, die kein Element Enthalten, werden ignoriert ==> keine falschen Fehlermeldungen mehr
 ***Animations-Handling: Wenn sich kein Element mehr in der Animationsschleife befindet, wird der AnimationsIntervall gelöscht!
 *Version 0.2.4 FINAL
 **WORKING: Animation: ONCOMPLETE!!! (lastTime Property needs to be resetted!")
 **Einige kleinere Verbesserungen
 *Version 0.2.5 (Rev1)
 **.show([speed]) / .hide([speed]): Verbessert
 *Version 0.2.5 (Rev2)
 **Added:
 ***.fadeOut([speed]): Faded eine Gruppe von matched Elements aus
 ***.fadeIn([speed]): Faded eine Gruppe von matched Elements wieder ein
 **Verbessert:
 ***.show([speed])
 ***.hide([speed])
 *Version 0.2.5 (Rev3)
 **Added:
 ***.slideUp([speed]): Lässt eine Gruppe von matched Elements elegant nach oben verschwinden
 ***.slideDown([speed]): Zeigt eine Gruppe von matched Elements wieder an(Mit Slide-Effekt), die zuerst mit SlideUp, versteckt wurde.
 */