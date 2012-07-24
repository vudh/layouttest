/*
* jqxscrollbar.js
*
* This source is property of jqwidgets and/or its partners and is subject to jqwidgets Source Code License agreement and jqwidgets EULA.
* Copyright (c) 2011 jqwidgets.
* <Licensing info>
* 
* http://www.jQWidgets.com
*
*/

/* Depends:
*   jqxcore.js
    jqxbuttons.js
*/

// Type: Number
// Default: null
// Sets the scrollbar height.
//Name: height = null;
// Type: Number
// Default: null
// Sets the scrollbar width.
//Name: width = null;
// Type: Number
// Default: false. This means that the scrollbar is horizontally oriented by default.
// Sets the scrollbar orientation.
//Name: vertical = false;
// Type: Number
// Default: 0
// Sets the minimum scroll value.
//Name: min = 0;
// Type: Number
// Default: 0
// Sets the maximum scroll value.
//Name: max = 1000;
// Type: Number
// Default: 0
// Sets the scroll value. The value can be between min and max.
//Name: value = Name: min;
// Type: Number
// Default: 0
// Sets the scroll step when any arrow button is clicked.
//Name: step = 10;
// Type: Number
// Default: 0
// Sets the scroll step when the user clicks on the empty scroll space between arrow button and thumb.
// Name: largestep = 50;
// Type: Number
// Default: 10
// sets the thumb's minimum size.
//Name: thumbMinSize = 10;
// Type: String
// Default: ''
// sets the rounded corners string.
//Name: roundedCorners = 'all';
// Type: Boolean
// Default: false
// Sets whether the scrollbar is disabled or not.
//Name: disabled = false;

(function ($) {

    $.jqx.jqxWidget("myWidget", "", {});
    $.extend($.jqx._myWidget.prototype, {
        var1: 5,
        var2: 10,
        foo: function (val) {
            this.var1 *= val;
        },

        bar: function () {
            alert(this.var1);
        },

        createInstance: function (args) {
        }
    });

    ////////////////////////////////////////
    ////////////////////////////////////////

    $.jqx.jqxWidget("jqxScrollBar", "", {});

    $.extend($.jqx._jqxScrollBar.prototype, {

        defineInstance: function () {
            // Type: Number
            // Default: null
            // Sets the scrollbar height.
            this.height = null;
            // Type: Number
            // Default: null
            // Sets the scrollbar width.
            this.width = null;
            // Type: Number
            // Default: false. This means that the scrollbar is horizontally oriented by default.
            // Sets the scrollbar orientation.
            this.vertical = false;
            // Type: Number
            // Default: 0
            // Sets the minimum scroll value.
            this.min = 0;
            // Type: Number
            // Default: 0
            // Sets the maximum scroll value.
            this.max = 1000;
            // Type: Number
            // Default: 0
            // Sets the scroll value. The value can be between min and max.
            this.value = this.min;
            // Type: Number
            // Default: 0
            // Sets the scroll step when any arrow button is clicked.
            this.step = 10;
            // Type: Number
            // Default: 0
            // Sets the scroll step when the user clicks on the empty scroll space between arrow button and thumb.
            this.largestep = 50;
            // Type: Number
            // Default: 10
            // sets the thumb's minimum size.
            this.thumbMinSize = 10;
            // Type: Number
            // Default: 0
            // sets the thumb's size.
            this.thumbSize = 0;
            // Type: String
            // Default: 'all'
            // sets the rounded corners string.
            this.roundedCorners = 'all';
            // Type: Boolean
            // Default: true
            // Sets whether the scroll buttons are visible.
            this.showButtons = true;
            // Type: Boolean
            // Default: false
            // Sets whether the scrollbar is disabled or not.
            this.disabled = false;
            // Sets whether the scrollbar is on touch device.
            this.touchMode = 'auto';
            this.touchModeStyle = 'auto';
            this.thumbTouchSize = 8;
            // disable jquery trigger function. It is very slow if you call it on mouse move. This could improve performance.
            this._triggervaluechanged = true;
        },

        createInstance: function (args) {
            var self = this;

            this.host.append("<div id='jqxScrollOuterWrap' style='width:100%; height: 100%; align:left; border: 0px; valign:top; position: relative;'>" +
                "<div id='jqxScrollWrap' style='width:100%; height: 100%; left: 0px; top: 0px; align:left; valign:top; position: absolute;'>" +
                "<div id='jqxScrollBtnUp' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
                "<div id='jqxScrollAreaUp' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
                "<div id='jqxScrollThumb' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
                "<div id='jqxScrollAreaDown' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
                "<div id='jqxScrollBtnDown' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
                "</div>" +
                "</div>");

            if (this.width != undefined && parseInt(this.width) > 0) {
                this.host.width(parseInt(this.width));
            }

            if (this.height != undefined && parseInt(this.height) > 0) {
                this.host.height(parseInt(this.height));
            }

            this.btnUp = this.host.find('#jqxScrollBtnUp');
            this.btnDown = this.host.find('#jqxScrollBtnDown');
            this.btnThumb = this.host.find('#jqxScrollThumb');
            this.areaUp = this.host.find('#jqxScrollAreaUp');
            this.arrowUp = $('<div style="width: 100%; height: 100%;"></div>');
            this.arrowUp.appendTo(this.btnUp);
            this.arrowDown = $('<div style="width: 100%; height: 100%;"></div>');
            this.arrowDown.appendTo(this.btnDown);
            this.areaDown = this.host.find('#jqxScrollAreaDown');
            this.scrollWrap = this.host.find('#jqxScrollWrap');
            this.scrollOuterWrap = this.host.find('#jqxScrollOuterWrap');

            this.btnUp[0].id = "jqxScrollBtnUp" + this.element.id;
            this.btnDown[0].id = "jqxScrollBtnDown" + this.element.id;
            this.btnThumb[0].id = "jqxScrollThumb" + this.element.id;
            this.areaUp[0].id = "jqxScrollAreaUp" + this.element.id;
            this.areaDown[0].id = "jqxScrollAreaDown" + this.element.id;
            this.scrollWrap[0].id = "jqxScrollWrap" + this.element.id;
            this.scrollOuterWrap[0].id = "jqxScrollOuterWrap" + this.element.id;

            if (!this.host.jqxRepeatButton) {
                alert('jqxbuttons.js is not loaded.');
                return;
            }

            this.btnUp.jqxRepeatButton({ overrideTheme: true });
            this.btnDown.jqxRepeatButton({ overrideTheme: true });
            this.btnDownInstance = $.data(this.btnDown[0], 'jqxRepeatButton').instance;
            this.btnUpInstance = $.data(this.btnUp[0], 'jqxRepeatButton').instance;

            this.areaUp.jqxRepeatButton({ overrideTheme: true, delay: 300 });
            this.areaDown.jqxRepeatButton({ overrideTheme: true, delay: 300 });
            this.btnThumb.jqxButton({ overrideTheme: true });
            this.propertyChangeMap['value'] = function (instance, key, oldVal, value) {
                instance.setPosition(value);
            }

            this.propertyChangeMap['theme'] = function (instance, key, oldVal, value) {
                instance.setTheme();
            }

            this.propertyChangeMap['max'] = function (instance, key, oldVal, value) {
                if (oldVal != value) {
                    instance.setPosition(instance.value);
                    instance._arrange();
                }
            }

            this.propertyChangeMap['min'] = function (instance, key, oldVal, value) {
                if (oldVal != value) {
                    instance.setPosition(instance.value);
                    instance._arrange();
                }
            }

            this.propertyChangeMap['touchMode'] = function (instance, key, oldVal, value) {
                if (oldVal != value) {
                    instance._updateTouchBehavior();
                }
            }

            this.buttonUpCapture = false;
            this.buttonDownCapture = false;

            this._updateTouchBehavior();
            this.setPosition(this.value);
            this._addHandlers();
            this.setTheme();
        }, // createInstance

        _updateTouchBehavior: function () {
            this.isTouchDevice = $.jqx.mobile.isTouchDevice();
            if (this.touchMode == true) {
                this.isTouchDevice = true;
                $.jqx.mobile.setMobileSimulator(this.btnThumb[0]);
                this._removeHandlers();
                this._addHandlers();
                this.setTheme();
            }
            else if (this.touchMode == false) {
                this.isTouchDevice = false;
            }
        },

        _addHandlers: function () {
            var self = this;

            if (self.isTouchDevice) {
                this.addHandler(this.btnThumb, 'touchend', function (event) {
                    var btnThumbPressedClass = self.vertical ? self.toThemeProperty('jqx-scrollbar-thumb-state-pressed') : self.toThemeProperty('jqx-scrollbar-thumb-state-pressed-horizontal');
                    var btnThumbPressedFillClass = self.toThemeProperty('jqx-fill-state-pressed');
                    self.btnThumb.removeClass(btnThumbPressedClass);
                    self.btnThumb.removeClass(btnThumbPressedFillClass);
                    if (!self.disabled) self.handlemouseup(self, event);
                });

                this.addHandler(this.btnThumb, 'touchstart', function (event) {
                    if (!self.disabled) {
                        if (self.touchMode == true) {
                            event.clientX = event.originalEvent.clientX;
                            event.clientY = event.originalEvent.clientY;
                        }
                        else {
                            var e = event;
                            if (e.originalEvent.touches && e.originalEvent.touches.length) {
                                event.clientX = e.originalEvent.touches[0].clientX;
                                event.clientY = e.originalEvent.touches[0].clientY;
                            }
                        }

                        self.handlemousedown(event);
                    }
                });

                $.jqx.mobile.touchScroll(this.element, self.max, function (left, top, dx, dy, event) {
                    if (self.host.css('visibility') == 'visible') {
                        if (self.touchMode == true) {
                            event.clientX = event.originalEvent.clientX;
                            event.clientY = event.originalEvent.clientY;
                        }
                        else {
                            var e = event;
                            if (e.originalEvent.touches && e.originalEvent.touches.length) {
                                event.clientX = e.originalEvent.touches[0].clientX;
                                event.clientY = e.originalEvent.touches[0].clientY;
                            }
                        }
                        var btnThumbPressedClass = self.vertical ? self.toThemeProperty('jqx-scrollbar-thumb-state-pressed') : self.toThemeProperty('jqx-scrollbar-thumb-state-pressed-horizontal');
                        self.btnThumb.addClass(btnThumbPressedClass);
                        self.btnThumb.addClass(self.toThemeProperty('jqx-fill-state-pressed'));

                        self.handlemousemove(event);
                    }
                });
            }

            this.addHandler(this.btnUp, 'click', function (event) {
                if (self.buttonUpCapture && !self.isTouchDevice) {
                    if (!self.disabled) self.setPosition(self.value - self.step);
                }
                else if (!self.disabled && self.isTouchDevice) self.setPosition(self.value - self.step);
            });
            this.addHandler(this.btnDown, 'click', function (event) {
                if (self.buttonDownCapture && !self.isTouchDevice) {
                    if (!self.disabled) self.setPosition(self.value + self.step)
                }
                else if (!self.disabled && self.isTouchDevice) self.setPosition(self.value + self.step);
            });

            if (!this.isTouchDevice) {
                if (window.frameElement) {
                    if (window.top != null) {
                        var eventHandle = function (event) {
                            if (!self.disabled) self.handlemouseup(self, event);
                        };

                        if (window.top.document.addEventListener) {
                            window.top.document.addEventListener('mouseup', eventHandle, false);

                        } else if (window.top.document.attachEvent) {
                            window.top.document.attachEvent("on" + 'mouseup', eventHandle);
                        }
                    }
                }

                this.addHandler(this.btnDown, 'mouseup', function (event) {
                    if (!self.btnDownInstance.base.disabled) {
                        self.buttonDownCapture = false;
                        self.btnDown.removeClass(self.toThemeProperty('jqx-scrollbar-button-state-pressed'));
                        self.btnDown.removeClass(self.toThemeProperty('jqx-fill-state-pressed'));
                        self._removeArrowClasses('pressed', 'down');
                        self.handlemouseup(self, event);
                        self.setPosition(self.value + self.step)
                        return false;
                    }
                });
                this.addHandler(this.btnUp, 'mouseup', function (event) {
                    if (!self.btnUpInstance.base.disabled) {
                        self.buttonUpCapture = false;
                        self.btnUp.removeClass(self.toThemeProperty('jqx-scrollbar-button-state-pressed'));
                        self.btnUp.removeClass(self.toThemeProperty('jqx-fill-state-pressed'));
                        self._removeArrowClasses('pressed', 'up');
                        self.handlemouseup(self, event);
                        self.setPosition(self.value - self.step)
                        return false;
                    }
                });

                this.addHandler(this.btnDown, 'mousedown', function (event) {
                    if (!self.btnDownInstance.base.disabled) {
                        self.buttonDownCapture = true;
                        self.btnDown.addClass(self.toThemeProperty('jqx-fill-state-pressed'));
                        self.btnDown.addClass(self.toThemeProperty('jqx-scrollbar-button-state-pressed'));
                        self._addArrowClasses('pressed', 'down');
                        return false;
                    }
                });
                this.addHandler(this.btnUp, 'mousedown', function (event) {
                    if (!self.btnUpInstance.base.disabled) {
                        self.buttonUpCapture = true;
                        self.btnUp.addClass(self.toThemeProperty('jqx-fill-state-pressed'));
                        self.btnUp.addClass(self.toThemeProperty('jqx-scrollbar-button-state-pressed'));
                        self._addArrowClasses('pressed', 'up');
                        return false;
                    }
                });
            }

            var eventName = 'click';
            if (this.isTouchDevice) {
                eventName = 'touchend';
            }

            this.addHandler(this.areaUp, eventName, function (event) {
                if (!self.disabled) {
                    self.setPosition(self.value - self.largestep); return false;
                }
            });
            this.addHandler(this.areaDown, eventName, function (event) {
                if (!self.disabled) {
                    self.setPosition(self.value + self.largestep);
                    return false;
                }
            });
            this.addHandler(this.areaUp, 'mousedown', function (event) { if (!self.disabled) { return false; } });
            this.addHandler(this.areaDown, 'mousedown', function (event) { if (!self.disabled) { return false; } });

            this.addHandler(this.btnThumb, 'mousedown', function (event) {
                if (!self.disabled) {
                    self.handlemousedown(event);
                }
                return false;
            });
            this.addHandler(this.btnThumb, 'dragstart', function (event) {
                return false;
            });

            this.addHandler($(document), 'mouseup.' + this.element.id, function (event) { if (!self.disabled) self.handlemouseup(self, event); });

            if (!this.isTouchDevice) {
                this.addHandler($(document), 'mousemove.' + this.element.id, function (event) { if (!self.disabled) self.handlemousemove(event); });
                this.addHandler($(document), 'mouseleave.' + this.element.id, function (event) { if (!self.disabled) self.handlemouseleave(event); });
                this.addHandler($(document), 'mouseenter.' + this.element.id, function (event) { if (!self.disabled) self.handlemouseenter(event); });

                if (!self.disabled) {
                    this.btnUp.hover(function () {
                        if (!self.disabled && !self.btnUpInstance.base.disabled && self.touchMode != true) {
                            self.btnUp.addClass(self.toThemeProperty('jqx-scrollbar-button-state-hover'));
                            self.btnUp.addClass(self.toThemeProperty('jqx-fill-state-hover'));
                            self._addArrowClasses('hover', 'up');
                        }
                    }, function () {
                        if (!self.disabled && !self.btnUpInstance.base.disabled && self.touchMode != true) {
                            self.btnUp.removeClass(self.toThemeProperty('jqx-scrollbar-button-state-hover'));
                            self.btnUp.removeClass(self.toThemeProperty('jqx-fill-state-hover'));
                            self._removeArrowClasses('hover', 'up');
                        }
                    });

                    var thumbHoverClass = self.toThemeProperty('jqx-scrollbar-thumb-state-hover');
                    if (!self.vertical) {
                        thumbHoverClass = self.toThemeProperty('jqx-scrollbar-thumb-state-hover-horizontal');
                    }

                    this.btnThumb.hover(function () {
                        if (!self.disabled && self.touchMode != true) {
                            self.btnThumb.addClass(thumbHoverClass);
                            self.btnThumb.addClass(self.toThemeProperty('jqx-fill-state-hover'));
                        }
                    }, function () {
                        if (!self.disabled && self.touchMode != true) {
                            self.btnThumb.removeClass(thumbHoverClass);
                            self.btnThumb.removeClass(self.toThemeProperty('jqx-fill-state-hover'));
                        }
                    });

                    this.btnDown.hover(function () {
                        if (!self.disabled && !self.btnDownInstance.base.disabled && self.touchMode != true) {
                            self.btnDown.addClass(self.toThemeProperty('jqx-scrollbar-button-state-hover'));
                            self.btnDown.addClass(self.toThemeProperty('jqx-fill-state-hover'));
                            self._addArrowClasses('hover', 'down');
                        }
                    }, function () {
                        if (!self.disabled && !self.btnDownInstance.base.disabled && self.touchMode != true) {
                            self.btnDown.removeClass(self.toThemeProperty('jqx-scrollbar-button-state-hover'));
                            self.btnDown.removeClass(self.toThemeProperty('jqx-fill-state-hover'));
                            self._removeArrowClasses('hover', 'down');
                        }
                    });
                }
            }
        },

        destroy: function () {
            var btnUp = this.btnUp;
            var btnDown = this.btnDown;
            var btnThumb = this.btnThumb;
            var elWrap = this.scrollWrap;
            var areaUp = this.areaUp;
            var areaDown = this.areaDown;

            areaDown.removeClass();
            areaUp.removeClass();
            btnDown.removeClass();
            btnUp.removeClass();
            btnThumb.removeClass();

            btnUp.jqxRepeatButton('destroy');
            btnDown.jqxRepeatButton('destroy');
            areaUp.jqxRepeatButton('destroy');
            areaDown.jqxRepeatButton('destroy');
            btnThumb.jqxButton('destroy');

            this._removeHandlers();
            this.host.removeClass();
            this.host.remove();
        },

        _removeHandlers: function () {
            this.removeHandler(this.btnUp, 'click');
            this.removeHandler(this.btnDown, 'click');
            this.removeHandler(this.btnDown, 'mouseup');
            this.removeHandler(this.btnUp, 'mouseup');
            this.removeHandler(this.btnDown, 'mousedown');
            this.removeHandler(this.btnUp, 'mousedown');
            this.removeHandler(this.areaUp, 'mousedown');
            this.removeHandler(this.areaDown, 'mousedown');
            this.removeHandler(this.areaUp, 'click');
            this.removeHandler(this.areaDown, 'click');
            this.removeHandler(this.btnThumb, 'mousedown');
            this.removeHandler($(document), 'mouseup.' + this.element.id);
            this.removeHandler($(document), 'mousemove.' + this.element.id);
            this.removeHandler($(document), 'mouseleave.' + this.element.id);
            this.removeHandler($(document), 'mouseenter.' + this.element.id);
            this.btnUp.unbind('hover');
            this.btnThumb.unbind('hover');
            this.btnDown.unbind('hover');
            var self = this;
        },

        _addArrowClasses: function (state, button) {
            if (state == 'pressed') state = 'selected';
            if (state != '') {
                state = '-' + state;
            }

            if (this.vertical) {
                if (button == 'up' || button == undefined) {
                    this.arrowUp.addClass(this.toThemeProperty("icon-arrow-up" + state));
                }

                if (button == 'down' || button == undefined) {
                    this.arrowDown.addClass(this.toThemeProperty("icon-arrow-down" + state));
                }
            }
            else {
                if (button == 'up' || button == undefined) {
                    this.arrowUp.addClass(this.toThemeProperty("icon-arrow-left" + state));
                }

                if (button == 'down' || button == undefined) {
                    this.arrowDown.addClass(this.toThemeProperty("icon-arrow-right" + state));
                }
            }
        },

        _removeArrowClasses: function (state, button) {
            if (state == 'pressed') state = 'selected';
            if (state != '') {
                state = '-' + state;
            }

            if (this.vertical) {
                if (button == 'up' || button == undefined) {
                    this.arrowUp.removeClass(this.toThemeProperty("icon-arrow-up" + state));
                }

                if (button == 'down' || button == undefined) {
                    this.arrowDown.removeClass(this.toThemeProperty("icon-arrow-down" + state));
                }
            }
            else {
                if (button == 'up' || button == undefined) {
                    this.arrowUp.removeClass(this.toThemeProperty("icon-arrow-left" + state));
                }

                if (button == 'down' || button == undefined) {
                    this.arrowDown.removeClass(this.toThemeProperty("icon-arrow-right" + state));
                }
            }
        },

        setTheme: function () {
            var btnUp = this.btnUp;
            var btnDown = this.btnDown;
            var btnThumb = this.btnThumb;
            var elWrap = this.scrollWrap;
            var areaUp = this.areaUp;
            var areaDown = this.areaDown;
            var arrowUp = this.arrowUp;
            var arrowDown = this.arrowDown;
            this.scrollWrap.removeClass();
            this.host.removeClass();
            arrowUp.removeClass();
            arrowDown.removeClass();
            areaDown.removeClass();
            areaUp.removeClass();
            btnDown.removeClass();
            btnUp.removeClass();
            btnThumb.removeClass();
            this.scrollWrap.removeClass();
            this.host.removeClass();

            this.scrollWrap.addClass(this.toThemeProperty('jqx-reset'));
            this.scrollOuterWrap.addClass(this.toThemeProperty('jqx-reset'));
            this.areaUp.addClass(this.toThemeProperty('jqx-reset'));
            this.areaDown.addClass(this.toThemeProperty('jqx-reset'));
            this.host.addClass(this.toThemeProperty('jqx-scrollbar'));
            this.host.addClass(this.toThemeProperty('jqx-widget'));
            this.host.addClass(this.toThemeProperty('jqx-widget-content'));

            btnDown.addClass(this.toThemeProperty('jqx-scrollbar-button-state-normal'));
            btnUp.addClass(this.toThemeProperty('jqx-scrollbar-button-state-normal'));

            if (this.vertical) {
                arrowUp.addClass(this.toThemeProperty("icon-arrow-up"));
                arrowDown.addClass(this.toThemeProperty("icon-arrow-down"));
                btnThumb.addClass(this.toThemeProperty('jqx-scrollbar-thumb-state-normal'));
            }
            else {
                arrowUp.addClass(this.toThemeProperty("icon-arrow-left"));
                arrowDown.addClass(this.toThemeProperty("icon-arrow-right"));
                btnThumb.addClass(this.toThemeProperty('jqx-scrollbar-thumb-state-normal-horizontal'));
            }

            btnThumb.addClass(this.toThemeProperty('jqx-fill-state-normal'));

            if (this.disabled) {
                elWrap.addClass(this.toThemeProperty('jqx-fill-state-disabled'));
                elWrap.removeClass(this.toThemeProperty('jqx-scrollbar-state-normal'));
            }
            else {
                elWrap.addClass(this.toThemeProperty('jqx-scrollbar-state-normal'));
                elWrap.removeClass(this.toThemeProperty('jqx-fill-state-disabled'));
            }

            if (btnUp.jqxRepeatButton('disabled') != this.disabled)
                btnUp.jqxRepeatButton('disabled', this.disabled);
            if (btnDown.jqxRepeatButton('disabled') != this.disabled)
                btnDown.jqxRepeatButton('disabled', this.disabled);
            if (btnThumb.jqxButton('disabled') != this.disabled)
                btnThumb.jqxButton('disabled', this.disabled);

            if (this.isTouchDevice && this.touchModeStyle != false) {
                this.showButtons = false;
                btnThumb.addClass(this.toThemeProperty('jqx-scrollbar-thumb-state-normal-touch'));
            }
        },

        // returns true, if the user is dragging the thumb or the increase or decrease button is pressed.
        isScrolling: function () {
            if (this.thumbCapture == undefined || this.buttonDownCapture == undefined || this.buttonUpCapture == undefined)
                return false;

            return this.thumbCapture || this.buttonDownCapture || this.buttonUpCapture;
        },

        handlemousedown: function (event) {
            if (this.thumbCapture == undefined || this.thumbCapture == false) {
                this.thumbCapture = true;
                var btnThumb = this.btnThumb;
                if (btnThumb != null) {
                    btnThumb.addClass(this.toThemeProperty('jqx-fill-state-pressed'));
                    if (this.vertical) {
                        btnThumb.addClass(this.toThemeProperty('jqx-scrollbar-thumb-state-pressed'));
                    }
                    else {
                        btnThumb.addClass(this.toThemeProperty('jqx-scrollbar-thumb-state-pressed-horizontal'));
                    }
                }
            }

            this.dragStartX = event.clientX;
            this.dragStartY = event.clientY;
            this.dragStartValue = this.value;
        },

        toggleHover: function (event, element) {
            //element.toggleClass('jqx-fill-state-hover');
        },

        refresh: function () {
            this._arrange();
        },

        _setElementPosition: function (element, x, y) {
            if (!isNaN(x)) {
                element[0].style.left = x + 'px';
            }
            if (!isNaN(y)) {
                element[0].style.top = y + 'px';
            }
        },

        _setElementTopPosition: function (element, y) {
            if (!isNaN(y)) {
                element[0].style.top = y + 'px';
            }
        },

        _setElementLeftPosition: function (element, x) {
            if (!isNaN(x)) {
                element[0].style.left = x + 'px';
            }
        },

        handlemouseleave: function (event) {
            var btnUp = this.btnUp;
            var btnDown = this.btnDown;

            btnUp.removeClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
            btnDown.removeClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
            this._removeArrowClasses('pressed');

            if (this.thumbCapture != true)
                return;

            var btnThumb = this.btnThumb;
            var btnThumbPressedClass = this.vertical ? this.toThemeProperty('jqx-scrollbar-thumb-state-pressed') : this.toThemeProperty('jqx-scrollbar-thumb-state-pressed-horizontal');
            btnThumb.removeClass(btnThumbPressedClass);
            btnThumb.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
        },

        handlemouseenter: function (event) {
            var btnUp = this.btnUp;
            var btnDown = this.btnDown;

            if (this.buttonUpCapture) {
                btnUp.addClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
                btnUp.addClass(this.toThemeProperty('jqx-fill-state-pressed'));
                this._addArrowClasses('pressed', 'up');
            }

            if (this.buttonDownCapture) {
                btnDown.addClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
                btnDown.addClass(this.toThemeProperty('jqx-fill-state-pressed'));
                this._addArrowClasses('pressed', 'down');
            }

            if (this.thumbCapture != true)
                return;

            var btnThumb = this.btnThumb;
            if (this.vertical) {
                btnThumb.addClass(this.toThemeProperty('jqx-scrollbar-thumb-state-pressed'));
            }
            else {
                btnThumb.addClass(this.toThemeProperty('jqx-scrollbar-thumb-state-pressed-horizontal'));
            }
            btnThumb.addClass(this.toThemeProperty('jqx-fill-state-pressed'));
        },

        handlemousemove: function (event) {
            var btnUp = this.btnUp;
            var btnDown = this.btnDown;
            var which = 0;

            if (btnDown == null || btnUp == null)
                return;

            if (btnUp != null && btnDown != null && this.buttonDownCapture != undefined && this.buttonUpCapture != undefined) {
                if (this.buttonDownCapture && event.which == which) {
                    btnDown.removeClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
                    btnDown.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
                    this._removeArrowClasses('pressed', 'down');

                    this.buttonDownCapture = false;
                }
                else if (this.buttonUpCapture && event.which == which) {
                    btnUp.removeClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
                    btnUp.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
                    this._removeArrowClasses('pressed', 'up');
                    this.buttonUpCapture = false;
                }
            }

            if (this.thumbCapture != true)
                return false;

            var btnThumb = this.btnThumb;

            if (event.which == which && !this.isTouchDevice) {
                this.thumbCapture = false;
                this._arrange();
                var btnThumbPressedClass = this.vertical ? this.toThemeProperty('jqx-scrollbar-thumb-state-pressed') : this.toThemeProperty('jqx-scrollbar-thumb-state-pressed-horizontal');
                btnThumb.removeClass(btnThumbPressedClass);
                btnThumb.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
                return true;
            }

            if (event.preventDefault != undefined) {
                event.preventDefault();
            }

            if (event.originalEvent != null) {
                event.originalEvent.mouseHandled = true;
            }

            if (event.stopPropagation != undefined) {
                event.stopPropagation();
            }

            var diff = 0;

            try {
                if (!this.vertical)
                    diff = event.clientX - this.dragStartX;
                else
                    diff = event.clientY - this.dragStartY;
                var btnAndThumbSize = (this.vertical) ?
                    btnUp.height() + btnDown.height() + btnThumb.height() :
                    btnUp.width() + btnDown.width() + btnThumb.width();

                var ratio = (this.max - this.min) / (this.scrollBarSize - btnAndThumbSize);
                diff *= ratio;
                this.setPosition(this.dragStartValue + diff);
            }
            catch (error) {
                alert(error);
            }

            return false;
        },

        handlemouseup: function (self, event) {
            var prevent = false;

            if (this.thumbCapture) {
                this.thumbCapture = false;

                var btnThumb = this.btnThumb;
                var btnThumbPressedClass = this.vertical ? this.toThemeProperty('jqx-scrollbar-thumb-state-pressed') : this.toThemeProperty('jqx-scrollbar-thumb-state-pressed-horizontal');
                btnThumb.removeClass(btnThumbPressedClass);
                btnThumb.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
                prevent = true;
            }

            if (this.buttonUpCapture || this.buttonDownCapture) {
                var btnUp = this.btnUp;
                var btnDown = this.btnDown;

                this.buttonUpCapture = false;
                this.buttonDownCapture = false;
                btnUp.removeClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
                btnDown.removeClass(this.toThemeProperty('jqx-scrollbar-button-state-pressed'));
                btnUp.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
                btnDown.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
                this._removeArrowClasses('pressed');

                prevent = true;
            }

            if (prevent) {
                if (event.preventDefault != undefined) {
                    event.preventDefault();
                }

                if (event.originalEvent != null) {
                    event.originalEvent.mouseHandled = true;
                }

                if (event.stopPropagation != undefined) {
                    event.stopPropagation();
                }
            }
        },

        // sets the value.
        // @param Number. Sets the ScrollBar's value.
        setPosition: function (position) {
            var element = this.element;

            if (position == undefined || position == NaN)
                position = this.min;

            if (position >= this.max) {
                position = this.max;
            }

            if (position < this.min) {
                position = this.min;
            }

            var event = new jQuery.Event('valuechanged');
            if (this.value != position) {
                if (position == this.max) {
                    var completeEvent = new jQuery.Event('complete');
                    this.host.trigger(completeEvent);
                }

                event.previousValue = this.value;
                event.currentValue = position;

                this.value = position;
                this._positionelements();
                //this._arrange();

                if (this._triggervaluechanged) {
                    this.host.trigger(event);
                }

                if (this.valuechanged) {
                    this.valuechanged({ currentValue: event.currentValue, previousvalue: event.previousValue });
                }
            }

            return position;
        },

        _getThumbSize: function (scrollLen) {
            var diff = this.max - this.min;

            var size = 0;
            if (diff > 1) {
                size = (scrollLen / (diff + scrollLen) * scrollLen);
            }
            else if (diff == 1) {
                size = scrollLen;
            }

            if (this.thumbSize > 0) {
                size = this.thumbSize;
            }

            if (size < this.thumbMinSize)
                size = this.thumbMinSize;

            return Math.min(size, scrollLen);
        },

        _positionelements: function () {
            var element = this.element;
            var elAreaUp = this.areaUp;
            var elAreaDown = this.areaDown;
            var elBtnUp = this.btnUp;
            var elBtnDown = this.btnDown;
            var elThumb = this.btnThumb;
            var elWrap = this.scrollWrap;

            var height = this._height ? this._height : this.host.height();
            var width = this._width ? this._width : this.host.width();

            var btnSize = (!this.vertical) ? height : width;
            if (!this.showButtons) {
                btnSize = 0;
            }

            var scrollBarSize = (!this.vertical) ? width : height;
            this.scrollBarSize = scrollBarSize;
            var thumbSize = this._getThumbSize(scrollBarSize - 2 * btnSize);
            thumbSize = Math.round(thumbSize);

            if (thumbSize < this.thumbMinSize)
                thumbSize = this.thumbMinSize;

            if (height == NaN || height < 10)
                height = 10;

            if (width == NaN || width < 10)
                width = 10;

            btnSize += 2;
            this.btnSize = btnSize;

            var btnAndThumbSize = this._btnAndThumbSize;

            if (!this._btnAndThumbSize) {
                var btnAndThumbSize = (this.vertical) ?
                2 * this.btnSize + elThumb.outerHeight() :
                2 * this.btnSize + elThumb.outerWidth();

                btnAndThumbSize = Math.round(btnAndThumbSize);
            }

            var upAreaSize = (scrollBarSize - btnAndThumbSize) / (this.max - this.min) * this.value;
            upAreaSize = Math.round(upAreaSize);

            if (this.vertical) {
                elAreaDown[0].style.height = scrollBarSize - upAreaSize - btnAndThumbSize + 'px';
                elAreaUp[0].style.height = upAreaSize + 'px';

                this._setElementTopPosition(elAreaUp, btnSize);
                this._setElementTopPosition(elThumb, btnSize + upAreaSize);
                this._setElementTopPosition(elAreaDown, btnSize + upAreaSize + thumbSize);
            }
            else {
                elAreaUp[0].style.width = upAreaSize + 'px';
                elAreaDown[0].style.width = scrollBarSize - upAreaSize - btnAndThumbSize + 'px';

                this._setElementLeftPosition(elAreaUp, btnSize);
                this._setElementLeftPosition(elThumb, btnSize + upAreaSize);
                this._setElementLeftPosition(elAreaDown, 2 + btnSize + upAreaSize + thumbSize);
            }
        },

        _arrange: function () {
            var element = this.element;
            var elAreaUp = this.areaUp;
            var elAreaDown = this.areaDown;
            var elBtnUp = this.btnUp;
            var elBtnDown = this.btnDown;
            var elThumb = this.btnThumb;
            var elWrap = this.scrollWrap;

            if (this.roundedCorners == 'all') {
                if (this.vertical) {
                    elBtnUp.jqxRepeatButton();
                    elBtnDown.jqxRepeatButton();
                    var rct = $.jqx.cssroundedcorners('top');
                    rct = this.toThemeProperty(rct);
                    elBtnUp.addClass(rct);

                    var rcb = $.jqx.cssroundedcorners('bottom');
                    rcb = this.toThemeProperty(rcb);
                    elBtnDown.addClass(rcb);

                }
                else {
                    elBtnUp.jqxRepeatButton();
                    elBtnDown.jqxRepeatButton();
                    var rcl = $.jqx.cssroundedcorners('left');
                    rcl = this.toThemeProperty(rcl);
                    elBtnUp.addClass(rcl);

                    var rcr = $.jqx.cssroundedcorners('right');
                    rcr = this.toThemeProperty(rcr);
                    elBtnDown.addClass(rcr);
                }
            }
            else {
                var rc = $.jqx.cssroundedcorners(this.roundedCorners);
                rc = this.toThemeProperty(rc);
                elBtnUp.addClass(rc);
                elBtnDown.addClass(rc);
            }

            elThumb.jqxButton();
            var rc = $.jqx.cssroundedcorners(this.roundedCorners);
            rc = this.toThemeProperty(rc);
            elThumb.addClass(rc);

            var height = this.host.height();
            var width = this.host.width();
            this._width = width;
            this._height = height;
            var btnSize = (!this.vertical) ? height : width;
            if (!this.showButtons) {
                btnSize = 0;
            }

            elBtnUp.css({ width: btnSize + 'px' });
            elBtnUp.css({ height: btnSize + 'px' });
            elBtnDown.css({ width: btnSize + 'px' });
            elBtnDown.css({ height: btnSize + 'px' });

            if (this.vertical)
                elWrap.css({ width: width + 2 + 'px' });
            else
                elWrap.css({ height: height + 2 + 'px' });

            // position the up button
            this._setElementPosition(elBtnUp, 0, 0);

            // position the down button
            if (this.vertical) {
                this._setElementPosition(elBtnDown, 0, height - elBtnDown.outerHeight());
            }
            else {
                this._setElementPosition(elBtnDown, width - elBtnDown.outerWidth(), 0);
            }

            var scrollBarSize = (!this.vertical) ? width : height;
            this.scrollBarSize = scrollBarSize;
            var thumbSize = this._getThumbSize(scrollBarSize - 2 * btnSize);
            thumbSize = Math.round(thumbSize);

            if (thumbSize < this.thumbMinSize)
                thumbSize = this.thumbMinSize;

            var touchStyle = false;
            if (this.isTouchDevice && this.touchModeStyle != false) {
                touchStyle = true;
            }

            if (!this.vertical) {
                elThumb.css({ width: thumbSize + 'px' });
                elThumb.css({ height: height + 'px' });
                if (touchStyle) {
                    elThumb.css({ height: this.thumbTouchSize + 'px' });
                    elThumb.css('margin-top', (this.host.height() - this.thumbTouchSize) / 2);
                }
            }
            else {
                elThumb.css({ width: width + 'px' });
                elThumb.css({ height: thumbSize + 'px' });
                if (touchStyle) {
                    elThumb.css({ width: this.thumbTouchSize + 'px' });
                    elThumb.css('margin-left', (this.host.width() - this.thumbTouchSize) / 2);
                }
            }

            if (height == NaN || height < 10)
                height = 10;

            if (width == NaN || width < 10)
                width = 10;

            btnSize += 2;
            this.btnSize = btnSize;

            var btnAndThumbSize = (this.vertical) ?
                2 * this.btnSize + elThumb.outerHeight() :
                2 * this.btnSize + elThumb.outerWidth();

            btnAndThumbSize = Math.round(btnAndThumbSize);
            this._btnAndThumbSize = btnAndThumbSize;

            var upAreaSize = (scrollBarSize - btnAndThumbSize) / (this.max - this.min) * this.value;
            upAreaSize = Math.round(upAreaSize);
            if (isNaN(upAreaSize)) {
                upAreaSize = 0;
            }

            if (this.vertical) {
                elAreaDown.css({ height: (scrollBarSize - upAreaSize - btnAndThumbSize) + 'px', width: width + 'px' });
                elAreaUp.css({ height: upAreaSize + 'px', width: width + 'px' });
                var hostHeight = parseInt(this.host.height());
                if (hostHeight - 3 * parseInt(btnSize) < 0) {
                    elThumb.css('visibility', 'hidden');
                }
                else if (hostHeight < btnAndThumbSize) {
                    elThumb.css('visibility', 'hidden');
                }
                else if (this.host.css('visibility') == 'visible') {
                    elThumb.css('visibility', 'inherit');
                }

                this._setElementPosition(elAreaUp, 0, btnSize);
                this._setElementPosition(elThumb, 0, btnSize + upAreaSize);
                this._setElementPosition(elAreaDown, 0, btnSize + upAreaSize + thumbSize);
            }
            else {
                elAreaUp.css({ width: upAreaSize + 'px', height: height + 'px' });
                elAreaDown.css({ width: (scrollBarSize - upAreaSize - btnAndThumbSize) + 'px', height: height + 'px' });
                var hostWidth = parseInt(this.host.width());
                if (hostWidth - 3 * parseInt(btnSize) < 0) {
                    elThumb.css('visibility', 'hidden');
                }
                else if (hostWidth < btnAndThumbSize) {
                    elThumb.css('visibility', 'hidden');
                }
                else if (this.host.css('visibility') == 'visible') {
                    elThumb.css('visibility', 'inherit');
                }

                this._setElementPosition(elAreaUp, btnSize, 0);
                this._setElementPosition(elThumb, btnSize + upAreaSize, 0);
                this._setElementPosition(elAreaDown, 2 + btnSize + upAreaSize + thumbSize, 0);
            }
        }
    }); // jqxScrollBar
})(jQuery);

