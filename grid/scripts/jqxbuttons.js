

(function ($) {
    $.jqx.cssroundedcorners = function (value) {
        var cssMap = {
            'all': 'jqx-rc-all',
            'top': 'jqx-rc-t',
            'bottom': 'jqx-rc-b',
            'left': 'jqx-rc-l',
            'right': 'jqx-rc-r',
            'top-right': 'jqx-rc-tr',
            'top-left': 'jqx-rc-tl',
            'bottom-right': 'jqx-rc-br',
            'bottom-left': 'jqx-rc-br'
        };

        for (prop in cssMap) {
            if (!cssMap.hasOwnProperty(prop))
                continue;

            if (value == prop)
                return cssMap[prop];
        }
    }

    $.jqx.jqxWidget("jqxButton", "", {});

    $.extend($.jqx._jqxButton.prototype, {
        defineInstance: function () {
            this.cursor = 'arrow';
            // rounds the button corners.
            this.roundedCorners = 'all';
            // enables / disables the button
            this.disabled = false;
            // sets height to the button.
            this.height = null;
            // sets width to the button.
            this.width = null;
            this.overrideTheme = false;
            this.enableHover = true;
        },

        createInstance: function (args) {
            var self = this;

            if (this.width != null && (this.width.toString().indexOf("px") != -1 || this.width.toString().indexOf("%") != -1)) {
                this.host.width(this.width);
            }
            else
                if (this.width != undefined && !isNaN(this.width)) {
                    this.host.width(this.width);
                };

            if (this.height != null && (this.height.toString().indexOf("px") != -1 || this.height.toString().indexOf("%") != -1)) {
                this.host.height(this.height);
            }
            else if (this.height != undefined && !isNaN(this.height)) {
                this.host.height(this.height);
            };

            if (!this.overrideTheme) {
                this.host.addClass(this.toThemeProperty($.jqx.cssroundedcorners(this.roundedCorners)));
            }

            this.host.onselectstart = function () { };
            this.isTouchDevice = $.jqx.mobile.isTouchDevice();

            this.host.addClass(this.toThemeProperty('jqx-button'));
            this.host.addClass(this.toThemeProperty('jqx-widget'));
            this.host.css({ cursor: this.cursor });

            if (!this.isTouchDevice) {
                this.addHandler(this.host, 'mouseenter', function (event) {
                    if (!self.disabled && self.enableHover) {
                        self.isMouseOver = true;
                        self.refresh();
                    }
                });

                this.addHandler(this.host, 'mouseleave', function (event) {
                    if (!self.disabled && self.enableHover) {
                        self.isMouseOver = false;
                        self.refresh();
                    }
                });
            }

            this.addHandler(this.host, 'mousedown', function (event) {
                if (!self.disabled) {
                    self.isPressed = true;
                    self.refresh();
                }
            });

            this.addHandler(this.host, 'focus', function (event) {
                if (!self.disabled) {
                    self.isFocused = true;
                    self.refresh();
                }
            });

            this.addHandler(this.host, 'blur', function (event) {
                if (!self.disabled) {
                    self.isFocused = false;
                    self.refresh();
                }
            });

            this.addHandler($(document), 'mouseup.button' + this.element.id, function (event) {
                if (!self.disabled) {
                    self.isPressed = false;
                    self.refresh();
                }
            });

            if (window.frameElement) {
                if (window.top != null) {
                    var eventHandle = function (event) {
                        self.isPressed = false;
                        self.refresh();
                    };

                    if (window.top.document) {
                        if (window.top.document.addEventListener) {
                            window.top.document.addEventListener('mouseup', eventHandle, false);

                        } else if (window.top.document.attachEvent) {
                            window.top.document.attachEvent("on" + 'mouseup', eventHandle);
                        }
                    }
                }
            }

            this.propertyChangeMap['roundedCorners'] = function (instance, key, oldVal, value) {
                instance.refresh();
            }
            this.propertyChangeMap['disabled'] = function (instance, key, oldVal, value) {
                self.host[0].disabled = value;
                instance.refresh();
            }

            this.propertyChangeMap['theme'] = function (instance, key, oldVal, value) {
                instance.host.removeClass();

                instance.host.addClass(instance.toThemeProperty('jqx-button'));
                instance.host.addClass(instance.toThemeProperty('jqx-widget'));
                if (!instance.overrideTheme) {
                    instance.host.addClass(instance.toThemeProperty($.jqx.cssroundedcorners(instance.roundedCorners)));
                }
                instance.refresh();
            }
        }, // createInstance

        _removeHandlers: function () {
            this.removeHandler(this.host, 'mouseenter');
            this.removeHandler(this.host, 'mouseleave');
            this.removeHandler(this.host, 'mousedown');
            this.removeHandler($(document), 'mouseup.button' + this.element.id);
        },

        destroy: function () {
            this._removeHandlers();
            this.host.removeClass();
            this.host.remove();
        },

        refresh: function () {
            if (this.overrideTheme)
                return;

            var cssFocused = this.toThemeProperty('jqx-fill-state-focus');
            var cssDisabled = this.toThemeProperty('jqx-fill-state-disabled');
            var cssNormal = this.toThemeProperty('jqx-fill-state-normal');
            var cssHover = this.toThemeProperty('jqx-fill-state-hover');
            var cssPressed = this.toThemeProperty('jqx-fill-state-pressed');
            var cssPressedHover = this.toThemeProperty('jqx-fill-state-pressed');
            var cssCurrent = '';
            this.host[0].disabled = this.disabled;

            if (this.disabled) {
                cssCurrent = cssDisabled;
            }
            else {
                if (this.isMouseOver && !this.isTouchDevice) {
                    if (this.isPressed)
                        cssCurrent = cssPressedHover;
                    else
                        cssCurrent = cssHover;
                }
                else {
                    if (this.isPressed)
                        cssCurrent = cssPressed;
                    else
                        cssCurrent = cssNormal;
                }
            }

            if (this.host.hasClass(cssDisabled) && cssDisabled != cssCurrent)
                this.host.removeClass(cssDisabled);

            if (this.host.hasClass(cssNormal) && cssNormal != cssCurrent)
                this.host.removeClass(cssNormal);

            if (this.host.hasClass(cssHover) && cssHover != cssCurrent)
                this.host.removeClass(cssHover);

            if (this.host.hasClass(cssPressed) && cssPressed != cssCurrent)
                this.host.removeClass(cssPressed);

            if (this.host.hasClass(cssPressedHover) && cssPressedHover != cssCurrent)
                this.host.removeClass(cssPressedHover);

            if (!this.host.hasClass(cssCurrent))
                this.host.addClass(cssCurrent);

            if (this.isFocused) {
                this.host.addClass(cssFocused);
            }
            else this.host.removeClass(cssFocused);
        }
    });

    //// LinkButton
    $.jqx.jqxWidget("jqxLinkButton", "", {});

    $.extend($.jqx._jqxLinkButton.prototype, {
        createInstance: function (args) {
            var self = this;
            this.host.onselectstart = function () { return false; }
            var height = this.height || this.host.height();
            var width = this.width || this.host.width();
            this.href = this.host.attr('href');
            this.target = this.host.attr('target');
            this.content = this.host.text();
            this.element.innerHTML = "";
            this.host.append("<input type='button' class='jqx-wrapper'/>");
            var wrapElement = this.host.find('input');
            wrapElement.addClass(this.toThemeProperty('jqx-reset'));
            wrapElement.width(width);
            wrapElement.height(height);
            wrapElement.val(this.content);
            this.host.find('tr').addClass(this.toThemeProperty('jqx-reset'));
            this.host.find('td').addClass(this.toThemeProperty('jqx-reset'));
            this.host.find('tbody').addClass(this.toThemeProperty('jqx-reset'));
            this.host.css('color', 'inherit');
            this.host.addClass(this.toThemeProperty('jqx-link'));

            wrapElement.css({ width: width });
            wrapElement.css({ height: height });
            var param = args == undefined ? {} : args[0] || {};
            wrapElement.jqxButton(param);

            if (this.disabled) {
                this.host[0].disabled = true;
            }

            this.propertyChangeMap['disabled'] = function (instance, key, oldVal, value) {
                self.host[0].disabled = value;
            }

            this.addHandler(wrapElement, 'click', function (event) {
                if (!this.disabled) {
                    self.onclick(event);
                }
                return false;
            });
        },

        onclick: function (event) {
            if (this.target != null) {
                window.open(this.href, this.target);
            }
            else {
                window.location = this.href;
            }
        }
    });
    //// End of LinkButton

    //// RepeatButton
    $.jqx.jqxWidget("jqxRepeatButton", "jqxButton", {});

    $.extend($.jqx._jqxRepeatButton.prototype, {
        createInstance: function (args) {
            var self = this;
            // repeat click delay.
            this.delay = this.delay || 50;

            var isTouchDevice = $.jqx.mobile.isTouchDevice();

            this.addHandler($(document), 'mouseup', function (event) {
                if (!isTouchDevice) {
                    if (self.timeout != null) {
                        clearTimeout(self.timeout);
                        self.timeout = null;
                    }

                    clearInterval(self.timer);
                    self.timer = null;
                }
            });

            this.addHandler(this.base.host, 'mousedown', function (event) {
                if (!isTouchDevice) {
                    if (self.timer != null) {
                        clearInterval(self.timer);
                    }

                    self.timeout = setTimeout(function () {
                        clearInterval(self.timer);
                        self.timer = setInterval(function (event) { self.ontimer(event); }, self.delay);
                    }, 150);
                }
            });

            this.addHandler(this.base.host, 'mousemove', function (event) {
                if (!isTouchDevice) {
                    if (event.which == 0) {
                        if (self.timer != null) {
                            clearInterval(self.timer);
                            self.timer = null;
                        }
                    }
                }
            });
        },

        stop: function () {
            clearInterval(this.timer);
            this.timer = null;
        },

        ontimer: function (event) {
            var event = new jQuery.Event('click');
            if (this.base != null && this.base.host != null) {
                this.base.host.trigger(event);
            }
        }
    });
    //// End of RepeatButton
    //// ToggleButton
    $.jqx.jqxWidget("jqxToggleButton", "jqxButton", {});

    $.extend($.jqx._jqxToggleButton.prototype, {
        defineInstance: function () {
            this.toggled = false;
        },

        createInstance: function (args) {
            var self = this;
            this.base.overrideTheme = true;
            this.isTouchDevice = $.jqx.mobile.isTouchDevice();

            this.addHandler(this.base.host, 'click', function (event) {
                self.toggle();
            });

            if (!this.isTouchDevice) {
                this.addHandler(this.base.host, 'mouseenter', function (event) {
                    if (!self.base.disabled) {
                        self.refresh();
                    }
                });

                this.addHandler(this.base.host, 'mouseleave', function (event) {
                    if (!self.base.disabled) {
                        self.refresh();
                    }
                });
            }

            this.addHandler(this.base.host, 'mousedown', function (event) {
                if (!self.base.disabled) {
                    self.refresh();
                }
            });

            this.addHandler($(document), 'mouseup', function (event) {
                if (!self.base.disabled) {
                    self.refresh();
                }
            });
        },

        _removeHandlers: function () {
            this.removeHandler(this.base.host, 'click');
            this.removeHandler(this.base.host, 'mouseenter');
            this.removeHandler(this.base.host, 'mouseleave');
            this.removeHandler(this.base.host, 'mousedown');
            this.removeHandler($(document), 'mouseup');
        },

        toggle: function () {
            this.toggled = !this.toggled;
            this.refresh();
        },

        unCheck: function () {
            this.toggled = false;
            this.refresh();
        },

        check: function () {
            this.toggled = true;
            this.refresh();
        },

        refresh: function () {
            var cssDisabled = this.base.toThemeProperty('jqx-fill-state-disabled');
            var cssNormal = this.base.toThemeProperty('jqx-fill-state-normal');
            var cssHover = this.base.toThemeProperty('jqx-fill-state-hover');
            var cssPressed = this.base.toThemeProperty('jqx-fill-state-pressed');
            var cssPressedHover = this.base.toThemeProperty('jqx-fill-state-pressed');
            var cssCurrent = '';
            this.base.host[0].disabled = this.base.disabled;

            if (this.base.disabled) {
                cssCurrent = cssDisabled;
            }
            else {
                if (this.base.isMouseOver && !this.isTouchDevice) {
                    if (this.base.isPressed || this.toggled)
                        cssCurrent = cssPressedHover;
                    else
                        cssCurrent = cssHover;
                }
                else {
                    if (this.base.isPressed || this.toggled)
                        cssCurrent = cssPressed;
                    else
                        cssCurrent = cssNormal;
                }
            }

            if (this.base.host.hasClass(cssDisabled) && cssDisabled != cssCurrent)
                this.base.host.removeClass(cssDisabled);

            if (this.base.host.hasClass(cssNormal) && cssNormal != cssCurrent)
                this.base.host.removeClass(cssNormal);

            if (this.base.host.hasClass(cssHover) && cssHover != cssCurrent)
                this.base.host.removeClass(cssHover);

            if (this.base.host.hasClass(cssPressed) && cssPressed != cssCurrent)
                this.base.host.removeClass(cssPressed);

            if (this.base.host.hasClass(cssPressedHover) && cssPressedHover != cssCurrent)
                this.base.host.removeClass(cssPressedHover);

            if (!this.base.host.hasClass(cssCurrent))
                this.base.host.addClass(cssCurrent);
        }
    });
    //// End of ToggleButton

})(jQuery);
