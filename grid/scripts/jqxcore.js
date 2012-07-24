(function ($) {
    $.jqx = $.jqx || {}

    $.jqx.define = function (namespace, classname, baseclass) {
        namespace[classname] = function () {
            if (this.baseType) {
                this.base = new namespace[this.baseType]();
                this.base.defineInstance();
            }
            this.defineInstance();
        }

        namespace[classname].prototype.defineInstance = function () { };
        namespace[classname].prototype.base = null;
        namespace[classname].prototype.baseType = undefined;

        if (baseclass && namespace[baseclass])
            namespace[classname].prototype.baseType = baseclass;
    }

    // method call
    $.jqx.invoke = function (object, args) {
        if (args.length == 0)
            return;

        var method = typeof (args) == Array || args.length > 0 ? args[0] : args;
        var methodArg = typeof (args) == Array || args.length > 1 ? Array.prototype.slice.call(args, 1) : $({}).toArray();

        while (object[method] == undefined && object.base != null)
            object = object.base;

        if (object[method] != undefined && $.isFunction(object[method]))
            return object[method].apply(object, methodArg);

        if (typeof method == 'string') {
            var methodLowerCase = method.toLowerCase();
            return object[methodLowerCase].apply(object, methodArg);
        }

        return;
    }

    $.jqx.hasFunction = function (object, args) {
        if (args.length == 0)
            return false;

        if (object == undefined)
            return false;

        var method = typeof (args) == Array || args.length > 0 ? args[0] : args;
        var methodArg = typeof (args) == Array || args.length > 1 ? Array.prototype.slice.call(args, 1) : {};

        while (object[method] == undefined && object.base != null)
            object = object.base;

        if (object[method] && $.isFunction(object[method]))
            return true;

        if (typeof method == 'string') {
            var methodLowerCase = method.toLowerCase();
            if (object[methodLowerCase] && $.isFunction(object[methodLowerCase]))
                return true;
        }

        return false;
    }

    $.jqx.isPropertySetter = function (args) {
        if (args.length == 2)
            return true;

        return args.length == 1 && typeof (args[0]) == 'object';
    }

    $.jqx.set = function (object, args) {
        if (args.length == 1 && typeof (args[0]) == 'object') {
            $.each(args[0], function (key, value) {
                var obj = object;
                while (obj[key] == undefined && obj.base != null)
                    obj = obj.base;

                if (obj[key] != undefined || obj[key] == null) {
                    $.jqx.setvalueraiseevent(obj, key, value);
                }
            });
        }
        else if (args.length == 2) {
            while (object[args[0]] == undefined && object.base)
                object = object.base;

            if (object[args[0]] != undefined || object[args[0]] == null)
                $.jqx.setvalueraiseevent(object, args[0], args[1]);
        }
    }

    $.jqx.setvalueraiseevent = function (object, key, value) {
        var oldVal = object[key];

        object[key] = value;

        if (!object.isInitialized)
            return;

        if (object.propertyChangedHandler != undefined)
            object.propertyChangedHandler(object, key, oldVal, value);

        if (object.propertyChangeMap != undefined && object.propertyChangeMap[key] != undefined)
            object.propertyChangeMap[key](object, key, oldVal, value);
    };

    $.jqx.get = function (object, args) {
        if (args == undefined || args == null)
            return undefined;

        if (object[args] != undefined)
            return object[args];

        if (args.length != 1)
            return undefined;

        while (object[args[0]] == undefined && object.base)
            object = object.base;

        if (object[args[0]] != undefined)
            return object[args[0]];
    }

    $.jqx.jqxWidgetProxy = function (controlName, element, args) {
        var host = $(element);
        var vars = $.data(element, controlName);
        if (vars == undefined) {
            return undefined;
        }

        var obj = vars.instance;

        if ($.jqx.hasFunction(obj, args))
            return $.jqx.invoke(obj, args);

        if ($.jqx.isPropertySetter(args)) {
            $.jqx.set(obj, args);
            return undefined;

        } else {
            if (typeof (args) == 'object' && args.length == 0)
                return;
            else if (typeof (args) == 'object' && args.length > 0)
                return $.jqx.get(obj, args[0]);
            else if (typeof (args) == 'string')
                return $.jqx.get(obj, args);
        }

        throw "jqxCore: Property or method does not exist.";
        return undefined;
    }

    $.jqx.jqxWidget = function (name, base, params) {
        try {
            jqxArgs = Array.prototype.slice.call(params, 0);
        }
        catch (e) {
            jqxArgs = '';
        }

        var controlName = name;

        var baseControl = '';
        if (base)
            baseControl = '_' + base;
        $.jqx.define($.jqx, '_' + controlName, baseControl);

        $.fn[controlName] = function () {
            var args = Array.prototype.slice.call(arguments, 0);
            var returnVal = null;

            if (args.length == 0 || (args.length == 1 && typeof (args[0]) == 'object')) {
                return this.each(function () {
                    var host = $(this);
                    var element = this; // element == this == host[0]
                    var vars = $.data(element, controlName);
                    if (vars == null) {
                        vars = {};
                        vars.element = element;
                        vars.host = host;
                        vars.instance = new $.jqx['_' + controlName]();
                        $.data(element, controlName, vars);

                        var inits = new Array();
                        var instance = vars.instance;
                        while (instance) {
                            instance.isInitialized = false;
                            inits.push(instance);
                            //instance.theme = '';
                            instance = instance.base;
                        }
                        inits.reverse();
                        inits[0].theme = '';

                        $.jqx.jqxWidgetProxy(controlName, this, args);

                        for (var i in inits) {
                            instance = inits[i];
                            if (i == 0) {
                                instance.host = host;
                                instance.element = element;
                            }
                            if (instance.createInstance != null) {
                                instance.createInstance(args);
                            }
                        }

                        for (var i in inits)
                            inits[i].isInitialized = true;

                        vars.instance.refresh(true);

                        returnVal = this;
                    }
                    else {
                        $.jqx.jqxWidgetProxy(controlName, this, args);
                    }
                }); // each
            }
            else {
                this.each(function () {
                    var result = $.jqx.jqxWidgetProxy(controlName, this, args);

                    if (returnVal == null)
                        returnVal = result;
                }); // each
            }

            // fix theme images, if browser is IE5.5 or IE6.0.
            if ($.browser.msie && $.browser.version < 7) {
                $.jqx.utilities.correctPNG();
            }

            return returnVal;
        }

        try {
            $.extend($.jqx['_' + controlName].prototype, Array.prototype.slice.call(params, 0)[0]);
        }
        catch (e) {
        }

        $.extend($.jqx['_' + controlName].prototype, {
            toThemeProperty: function (propertyName, override) {
                if (this.theme == '')
                    return propertyName;

                if (override != null && override) {
                    return propertyName + '-' + this.theme;
                }

                return propertyName + ' ' + propertyName + '-' + this.theme;
            }
        });

        $.jqx['_' + controlName].prototype.refresh = function () {
            if (this.base)
                this.base.refresh();
        }
        $.jqx['_' + controlName].prototype.createInstance = function () {
        }
        $.jqx['_' + controlName].prototype.propertyChangeMap = {};

        $.jqx['_' + controlName].prototype.addHandler = function (source, event, func, data) {
            switch (event) {
                case 'mousewheel':
                    if (window.addEventListener) {
                        if ($.browser.mozilla) {
                            source[0].addEventListener('DOMMouseScroll', func, false);
                        }
                        else {
                            source[0].addEventListener('mousewheel', func, false);
                        }
                        return false;
                    }
                    break;
                case 'mousemove':
                    if (window.addEventListener && !data) {
                        source[0].addEventListener('mousemove', func, false);
                        return false;
                    }
                    break;
            }

            if (data == undefined || data == null) {
                source.bind(event, func);
            }
            else {
                source.bind(event, data, func);
            }
        };

        $.jqx['_' + controlName].prototype.removeHandler = function (source, event, func) {
            switch (event) {
                case 'mousewheel':
                    if (window.removeEventListener) {
                        if ($.browser.mozilla) {
                            source[0].removeEventListener('DOMMouseScroll', func, false);
                        }
                        else {
                            source[0].removeEventListener('mousewheel', func, false);
                        }
                        return false;
                    }
                    break;
            }

            if (func == undefined) {
                source.unbind(event);
            }
            else source.unbind(event, func);
        };
    } // jqxWidget

    // jqxUtilities
    $.jqx.utilities = $.jqx.utilities || {};
    $.extend($.jqx.utilities,
    {
        setTheme: function (oldTheme, theme, element) {
            if (typeof element === 'undefined') {
                return;
            }
            var classNames = element[0].className.split(' '),
                oldClasses = [], newClasses = [],
                children = element.children();
            for (var i = 0; i < classNames.length; i += 1) {
                if (classNames[i].indexOf(oldTheme) >= 0) {
                    if (oldTheme.length > 0) {
                        oldClasses.push(classNames[i]);
                        newClasses.push(classNames[i].replace(oldTheme, theme));
                    }
                    else {
                        newClasses.push(classNames[i] + '-' + theme);
                    }
                }
            }
            this._removeOldClasses(oldClasses, element);
            this._addNewClasses(newClasses, element);
            for (var i = 0; i < children.length; i += 1) {
                this.setTheme(oldTheme, theme, $(children[i]));
            }
        },

        _removeOldClasses: function (classes, element) {
            for (var i = 0; i < classes.length; i += 1) {
                element.removeClass(classes[i]);
            }
        },

        _addNewClasses: function (classes, element) {
            for (var i = 0; i < classes.length; i += 1) {
                element.addClass(classes[i]);
            }
        },

        correctPNG: function () // correctly handle PNG transparency in Win IE 5.5 & 6.
        {
            var arVersion = navigator.appVersion.split("MSIE")
            var version = parseFloat(arVersion[1])
            if ((version >= 5.5 && version < 7) && (document.body.filters)) {
                for (var i = 0; i < document.images.length; i++) {
                    var img = document.images[i]
                    var imgName = img.src.toUpperCase()
                    if (imgName.substring(imgName.length - 3, imgName.length) == "PNG") {
                        var imgID = (img.id) ? "id='" + img.id + "' " : ""
                        var imgClass = (img.className) ? "class='" + img.className + "' " : ""
                        var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
                        var imgStyle = "display:inline-block;" + img.style.cssText
                        if (img.align == "left") imgStyle = "float:left;" + imgStyle
                        if (img.align == "right") imgStyle = "float:right;" + imgStyle
                        if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
                        var strNewHTML = "<span " + imgID + imgClass + imgTitle
                    + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
                    + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
                    + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
                        img.outerHTML = strNewHTML
                        i = i - 1
                    }
                }
            }
        },

        alphaBlend: function (a, b, alpha) {
            var ca = Array(
              parseInt('0x' + a.substring(1, 3)),
              parseInt('0x' + a.substring(3, 5)),
              parseInt('0x' + a.substring(5, 7))
            );
            var cb = Array(
              parseInt('0x' + b.substring(1, 3)),
              parseInt('0x' + b.substring(3, 5)),
              parseInt('0x' + b.substring(5, 7))
            );
            r = '0' + Math.round(ca[0] + (cb[0] - ca[0]) * alpha).toString(16);
            g = '0' + Math.round(ca[1] + (cb[1] - ca[1]) * alpha).toString(16);
            b = '0' + Math.round(ca[2] + (cb[2] - ca[2]) * alpha).toString(16);
            return '#'
              + r.substring(r.length - 2)
              + g.substring(g.length - 2)
              + b.substring(b.length - 2);
        }
    });

    $.jqx.mobile = $.jqx.mobile || {};

    $.extend($.jqx.mobile,
    {
        setMobileSimulator: function (element, value) {
            if (this.isTouchDevice()) {
                return;
            }

            this.simulatetouches = true;
            if (value == false) {
                this.simulatetouches = false;
            }

            var eventMap = {
                'mousedown': 'touchstart',
                'mouseup': 'touchend',
                'mousemove': 'touchmove'
            };

            if (window.addEventListener) {
                window.addEventListener('load', function () {
                    for (var key in eventMap) {
                        if (element.addEventListener) {
                            element.addEventListener(key, function (e) {
                                var event = createTouchEvent(eventMap[e.type], e);
                                e.target.dispatchEvent(event);

                                var fn = e.target['on' + eventMap[e.type]];
                                if (typeof fn === 'function') fn(e);
                            }, false);
                        }

                        document.addEventListener(key, function (e) {

                            var event = createTouchEvent(eventMap[e.type], e);
                            //              e.target.dispatchEvent(event);

                            var fn = e.target['on' + eventMap[e.type]];
                            if (typeof fn === 'function') fn(e);
                        }, false);
                    }
                }, false);
            }

            var createTouchEvent = function (name, e) {
                var event = document.createEvent('MouseEvents');

                event.initMouseEvent(
                    name,
                    e.bubbles,
                    e.cancelable,
                    e.view,
                    e.detail,
                    e.screenX,
                    e.screenY,
                    e.clientX,
                    e.clientY,
                    e.ctrlKey,
                    e.altKey,
                    e.shiftKey,
                    e.metaKey,
                    e.button,
                    e.relatedTarget
                );
                event._pageX = e.pageX;
                event._pageY = e.pageY;

                return event;
            };
        },

        isTouchDevice: function () {
            var txt = "Browser CodeName: " + navigator.appCodeName + "";
            txt += "Browser Name: " + navigator.appName + "";
            txt += "Browser Version: " + navigator.appVersion + "";
            txt += "Cookies Enabled: " + navigator.cookieEnabled + "";
            txt += "Platform: " + navigator.platform + "";
            txt += "User-agent header: " + navigator.userAgent + "";

            if (txt.indexOf('Android') != -1)
                return true;

            if (txt.indexOf('IEMobile') != -1)
                return true;

            if (txt.indexOf('Windows Phone OS') != -1)
                return true;

            if (txt.indexOf('Windows Phone 6.5') != -1)
                return true;

            if (txt.indexOf('BlackBerry') != -1 && txt.indexOf('Mobile Safari') != -1)
                return true;

            if (txt.indexOf('ipod') != -1)
                return true;

            if (txt.indexOf('nokia') != -1 || txt.indexOf('Nokia') != -1)
                return true;

            if (txt.indexOf('Chrome/17') != -1)
                return false;

            // check for IPad, IPhone, IE and Chrome
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        },

        getLeftPos: function (inputObj) {
            var returnValue = inputObj.offsetLeft;
            while ((inputObj = inputObj.offsetParent) != null) {
                if (inputObj.tagName != 'HTML') {
                    returnValue += inputObj.offsetLeft;
                    if (document.all) returnValue += inputObj.clientLeft;
                }
            }
            return returnValue;
        },

        getTopPos: function (inputObj) {
            var returnValue = inputObj.offsetTop;
            while ((inputObj = inputObj.offsetParent) != null) {
                if (inputObj.tagName != 'HTML') {
                    returnValue += (inputObj.offsetTop - inputObj.scrollTop);
                    if (document.all) returnValue += inputObj.clientTop;
                }
            }

            if (this.isSafariMobileBrowser()) {
                if (this.isSafari4MobileBrowser() && this.isIPadSafariMobileBrowser()) {
                    return returnValue;
                }

                returnValue = returnValue + $(window).scrollTop();
            }

            return returnValue;
        },

        isChromeMobileBrowser: function () {
            var agent = navigator.userAgent.toLowerCase();
            var result = agent.indexOf('android') != -1;
            return result;
        },

        isOperaMiniMobileBrowser: function () {
            var agent = navigator.userAgent.toLowerCase();
            var result = agent.indexOf('opera mini') != -1 || agent.indexOf('opera mobi') != -1;
            return result;
        },

        isOperaMiniBrowser: function () {
            var agent = navigator.userAgent.toLowerCase();
            var result = agent.indexOf('opera mini') != -1;
            return result;
        },

        isNewSafariMobileBrowser: function () {
            var agent = navigator.userAgent.toLowerCase();
            var result = agent.indexOf('ipad') != -1 || agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1;
            result = result && (agent.indexOf('version/5') != -1);
            return result;
        },

        isSafari4MobileBrowser: function () {
            var agent = navigator.userAgent.toLowerCase();
            var result = agent.indexOf('ipad') != -1 || agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1;
            result = result && (agent.indexOf('version/4') != -1);
            return result;
        },

        isSafariMobileBrowser: function () {
            var agent = navigator.userAgent.toLowerCase();
            var result = agent.indexOf('ipad') != -1 || agent.indexOf('iphone') != -1 || agent.indexOf('ipod') != -1;
            return result;
        },

        isIPhoneSafariMobileBrowser: function () {
            var agent = navigator.userAgent.toLowerCase();
            var result = agent.indexOf('iphone') != -1;
            return result;
        },

        isIPadSafariMobileBrowser: function () {
            var agent = navigator.userAgent.toLowerCase();
            var result = agent.indexOf('ipad') != -1;
            return result;
        },

        isMobileBrowser: function () {
            var agent = navigator.userAgent.toLowerCase();
            var result = agent.indexOf('ipad') != -1 || agent.indexOf('iphone') != -1 || agent.indexOf('android') != -1;
            return result;
        },

        // Get the touch points from this event
        getTouches: function (e) {
            if (e.originalEvent) {
                if (e.originalEvent.touches && e.originalEvent.touches.length) {
                    return e.originalEvent.touches;
                } else if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                    return e.originalEvent.changedTouches;
                }
            }

            if (!e.touches) {
                e.touches = new Array();
                e.touches[0] = e.originalEvent;
            }

            return e.touches;
        },

        // Dispatches a fake mouse event from a touch event
        dispatchMouseEvent: function (name, touch, target) {
            if (this.simulatetouches)
                return;

            var e = document.createEvent('MouseEvent');
            e.initMouseEvent(name, true, true, touch.view, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
            if (target != null) {
                target.dispatchEvent(e);
            }
        },

        // Find the root node of this target
        getRootNode: function (target) {
            while (target.nodeType !== 1) {
                target = target.parentNode;
            }
            return target;
        },

        setTouchScroll: function (enable, key) {
            if (!this.enableScrolling) this.enableScrolling = [];
            this.enableScrolling[key] = enable;
        },

        touchScroll: function (element, scrollHeight, callback, key) {
            if (element == null)
                return;

            var me = this;
            var scrollY = 0;
            var touchY = 0;
            var movedY = 0;
            var scrollX = 0;
            var touchX = 0;
            var movedX = 0;
            var scrolling = false;
            var moved = false;
            var $element = $(element);
            var touchTags = ['select', 'input', 'textarea'];
            var touchStart = 0;
            var touchEnd = 0;
            if (!this.enableScrolling) this.enableScrolling = [];
            this.enableScrolling[key] = true;
            var key = key;

            $element.bind('touchstart.touchScroll', function (event) {
                if (!me.enableScrolling[key])
                    return true;

                // Allow certain HTML tags to receive touch events
                if ($.inArray(event.target.tagName.toLowerCase(), touchTags) !== -1) {
                    return;
                }

                var touches = me.getTouches(event);
                var touch = touches[0];
                if (touches.length == 1) {
                    me.dispatchMouseEvent('mousedown', touch, me.getRootNode(touch.target));
                }

                scrolling = true;
                moved = false;
                touchY = touch.pageY;
                touchX = touch.pageX;
                if (me.simulatetouches) {
                    touchY = touch._pageY;
                    touchX = touch._pageX;
                }

                scrollY = 0;
                scrollX = 0;
                return true;
            });

            $element.bind('touchmove.touchScroll', function (event) {
                if (!me.enableScrolling[key])
                    return true;

                if (!scrolling) {
                    return true;
                }

                var touches = me.getTouches(event);
                if (touches.length > 1) {
                    return true;
                }

                var pageY = touches[0].pageY;
                var pageX = touches[0].pageX;

                if (me.simulatetouches) {
                    pageY = touches[0]._pageY;
                    pageX = touches[0]._pageX;
                }

                var dy = pageY - touchY;
                var dx = pageX - touchX;
                touchEnd = pageY;
                touchHorizontalEnd = pageX;
                movedY = dy - scrollY;
                movedX = dx - scrollX;
                moved = true;
                scrollY = dy;
                scrollX = dx;
                callback(-movedX * 3, -movedY * 3, dx, dy, event);
                event.preventDefault();
                event.stopPropagation();

                return false;
            });

            if (this.simulatetouches) {
                $(window).bind('mouseup.touchScroll', function (event) {
                    scrolling = false;
                });

                if (window.frameElement) {
                    if (window.top != null) {
                        var eventHandle = function (event) {
                            scrolling = false;
                        };

                        if (window.top.document.addEventListener) {
                            window.top.document.removeEventListener('mouseup', eventHandle, false);
                            window.top.document.addEventListener('mouseup', eventHandle, false);
                        } else if (window.top.document.attachEvent) {
                            window.top.document.attachEvent("on" + 'mouseup', eventHandle);
                        }
                    }
                }

                $(document).bind('touchend', function (event) {
                    if (!scrolling) {
                        return true;
                    }
                    scrolling = false;
                    var touch = me.getTouches(event)[0],
						target = me.getRootNode(touch.target);

                    // Dispatch fake mouse up and click events if this touch event did not move
                    me.dispatchMouseEvent('mouseup', touch, target);
                    me.dispatchMouseEvent('click', touch, target);
                });
            }

            $element.bind('touchend.touchScroll touchcancel.touchScroll', function (event) {
                if (!me.enableScrolling[key])
                    return true;

                var touch = me.getTouches(event)[0];
                if (!scrolling) {
                    return true;
                }
                scrolling = false;
                if (moved) {
                    me.dispatchMouseEvent('mouseup', touch, target);
                } else {
                    var touch = me.getTouches(event)[0],
						target = me.getRootNode(touch.target);

                    //        event.preventDefault();
                    //         event.stopPropagation();
                    // Dispatch fake mouse up and click events if this touch event did not move
                    me.dispatchMouseEvent('mouseup', touch, target);
                    me.dispatchMouseEvent('click', touch, target);
                }
            });
        }
    });

    $.jqx.cookie = $.jqx.cookie || {};
    $.extend($.jqx.cookie,
    {
        cookie: function (key, value, options) {
            // set cookie.
            if (arguments.length > 1 && String(value) !== "[object Object]") {
                options = jQuery.extend({}, options);

                if (value === null || value === undefined) {
                    options.expires = -1;
                }

                if (typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }

                value = String(value);

                return (document.cookie = [
                encodeURIComponent(key), '=',
                options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
        ].join(''));
            }
            // get cookie...
            options = value || {};
            var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
            return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
        }
    });

    // stringutilities
    $.jqx.string = $.jqx.string || {};
    $.extend($.jqx.string,
    {
        contains: function (fullString, value) {
            if (fullString == null || value == null)
                return false;

            return fullString.indexOf(value) != -1;
        },

        containsIgnoreCase: function (fullString, value) {
            if (fullString == null || value == null)
                return false;

            return fullString.toUpperCase().indexOf(value.toUpperCase()) != -1;
        },

        equals: function (fullString, value) {
            if (fullString == null || value == null)
                return false;

            fullString = this.normalize(fullString);

            if (value.length == fullString.length) {
                return fullString.slice(0, value.length) == value;
            }

            return false;
        },

        equalsIgnoreCase: function (fullString, value) {
            if (fullString == null || value == null)
                return false;

            fullString = this.normalize(fullString);

            if (value.length == fullString.length) {
                return fullString.toUpperCase().slice(0, value.length) == value.toUpperCase();
            }

            return false;
        },

        startsWith: function (fullString, value) {
            if (fullString == null || value == null)
                return false;

            return fullString.slice(0, value.length) == value;
        },

        startsWithIgnoreCase: function (fullString, value) {
            if (fullString == null || value == null)
                return false;

            return fullString.toUpperCase().slice(0, value.length) == value.toUpperCase();
        },

        normalize: function (fullString) {
            if (fullString.charCodeAt(fullString.length - 1) == 65279) {
                fullString = fullString.substring(0, fullString.length - 1);
            }

            return fullString;
        },

        endsWith: function (fullString, value) {
            if (fullString == null || value == null)
                return false;

            fullString = this.normalize(fullString);
            return fullString.slice(-value.length) == value;
        },

        endsWithIgnoreCase: function (fullString, value) {
            if (fullString == null || value == null)
                return false;

            fullString = this.normalize(fullString);

            return fullString.toUpperCase().slice(-value.length) == value.toUpperCase();
        }
    });

    $.extend(jQuery.easing, {
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInQuad: function (x, t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
    });
})(jQuery);

(function ($) {
    $.fn.extend({
        ischildof: function (filter_string) {
            var parents = $(this).parents().get();

            for (j = 0; j < parents.length; j++) {
                if ($(parents[j]).is(filter_string)) {
                    return true;
                }
            }

            return false;
        }
    });
})(jQuery); 