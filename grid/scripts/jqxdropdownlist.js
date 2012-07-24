

(function ($) {

    $.jqx.jqxWidget("jqxDropDownList", "", {});

    $.extend($.jqx._jqxDropDownList.prototype, {
        defineInstance: function () {
            // enables/disables the dropdownlist.
            this.disabled = false;
            // gets or sets the listbox width.
            this.width = null;
            // gets or sets the listbox height.
            this.height = null;
            // Represents the collection of list items.
            this.items = new Array();
            // Gets or sets the selected index.
            this.selectedIndex = -1;
            // data source.
            this.source = null;
            // gets or sets the scrollbars size.
            this.scrollBarSize = 15;
            // gets or sets the scrollbars size.
            this.arrowSize = 19;
            // enables/disables the hover state.
            this.enableHover = true;
            // enables/disables the selection.
            this.enableSelection = true;
            // gets the visible items. // this property is internal for the dropdownlist.
            this.visualItems = new Array();
            // gets the groups. // this property is internal for the dropdownlist.
            this.groups = new Array();
            // gets or sets whether the items width should be equal to the dropdownlist's width.
            this.equalItemsWidth = true;
            // gets or sets the height of the ListBox Items. When the itemHeight == - 1, each item's height is equal to its desired height.
            this.itemHeight = -1;
            // represents the dropdownlist's events.
            this.visibleItems = new Array();
            // emptry group's text.
            this.emptyGroupText = 'Group';
            // Type: Number
            // Default: 100
            // Showing Popup Animation's delay.
            if (this.showDelay == undefined) {
                this.showDelay = 350;
            }
            // Type: Number
            // Default: 200
            // Hiding Popup Animation's delay.
            if (this.hideDelay == undefined) {
                this.hideDelay = 400;
            }
            // default, none
            // Type: String.
            // enables or disables the animation.
            this.animationType = 'default';
            // Type: String
            // Default: auto ( the drop down takes the dropdownlist's width.)
            // Sets the popup's width.
            this.dropDownWidth = 'auto';
            // Type: String
            // Default: 200px ( the height is 200px )
            // Sets the popup's height.
            this.dropDownHeight = '200px';
            // Type: Boolean
            // Default: false
            // Sets the popup's height to be equal to the items summary height;            
            this.autoDropDownHeight = false;
            this.keyboardSelection = true;

            // Type: Boolean
            // Default: false
            // Enables or disables the browser detection.
            this.enableBrowserBoundsDetection = false;
            this.displayMember = "";
            this.valueMember = "";
            this.searchMode = 'startswithignorecase';
            this.incrementalSearch = true;
            this.incrementalSearchDelay = 700;
            this.renderer = null;
            this.events =
	   	    [
            // occurs when the dropdownlist is opened.
		      'open',
            // occurs when the dropdownlist is closed.
              'close',
            // occurs when an item is selected.
              'select',
            // occurs when an item is unselected.
              'unselect',
            // occurs when the selection is changed.
              'change'
            ];
        },

        createInstance: function (args) {
            this.isanimating = false;

            var comboStructure = $("<div tabIndex=0 style='background-color: transparent; -webkit-appearance: none; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; border: 0px; position: relative;'>" +
                "<div id='dropdownlistWrapper' style='outline: none; background-color: transparent; border: none; float: left; width:100%; height: 100%; position: relative;'>" +
                "<div id='dropdownlistContent' style='outline: none; background-color: transparent; border: none; float: left; position: relative;'/>" +
                "<div id='dropdownlistArrow' style='background-color: transparent; border: none; float: right; position: relative;'><div></div></div>" +
                "</div>" +
                "</div>");

            if ($.jqx._jqxListBox == null || $.jqx._jqxListBox == undefined) {
                alert("jqxListBox is not loaded.");
            }
            var me = this;
            this.addHandler(this.host, 'loadContent', function (event) {
                me._arrange();
            });

            try {
                var listBoxID = 'listBox' + this.element.id;
                var oldContainer = $($.find('#' + listBoxID));
                if (oldContainer.length > 0) {
                    oldContainer.remove();
                }

                var container = $("<div style='overflow: hidden; background-color: transparent; border: none; position: absolute;' id='listBox" + this.element.id + "'><div id='innerListBox" + this.element.id + "'></div></div>");
                container.appendTo(document.body);
                this.container = container;
                this.listBoxContainer = $($.find('#innerListBox' + this.element.id));

                var width = this.width;
                if (this.dropDownWidth != 'auto') {
                    width = this.dropDownWidth;
                }

                if (this.dropDownHeight == null) {
                    this.dropDownHeight = 200;
                }

                this.listBoxContainer.jqxListBox({ itemHeight: this.itemHeight, width: width, searchMode: this.searchMode, incrementalSearch: this.incrementalSearch, incrementalSearchDelay: this.incrementalSearchDelay, displayMember: this.displayMember, valueMember: this.valueMember, height: this.dropDownHeight, autoHeight: this.autoDropDownHeight, scrollBarSize: this.scrollBarSize, source: this.source, theme: this.theme });
                this.container.width(parseInt(width) + 25);
                this.container.height(parseInt(this.dropDownHeight) + 25);
                this.listBoxContainer.css({ position: 'absolute', zIndex: 9999999999999, top: 0, left: 0 });
                this.listBox = $.data(this.listBoxContainer[0], "jqxListBox").instance;
                this.listBox.enableSelection = this.enableSelection;
                this.listBox.enableHover = this.enableHover;
                this.listBox.equalItemsWidth = this.equalItemsWidth;
                this.listBox.selectIndex(this.selectedIndex);
                this.listBox._arrange();
                if (this.renderer) {
                    this.listBox.renderer = this.renderer;
                }
                this.listBox.rendered = function () {
                    me.listBox.selectIndex(me.selectedIndex);
                    me.renderSelection('mouse');
                }
                var me = this;

                this.addHandler(this.listBoxContainer, 'unselect', function (event) {
                    me._raiseEvent('3', { index: event.args.index, type: event.args.type, item: event.args.item });
                });

                this.addHandler(this.listBoxContainer, 'change', function (event) {
                    me._raiseEvent('4', { index: event.args.index, type: event.args.type, item: event.args.item });
                });

                if (this.animationType == 'none') {
                    this.container.css('display', 'none');
                }
                else {
                    this.container.hide();
                }
            }
            catch (e) {

            }

            this.touch = $.jqx.mobile.isTouchDevice();
            this.comboStructure = comboStructure;
            this.host.append(comboStructure);

            this.dropdownlistWrapper = this.host.find('#dropdownlistWrapper');
            this.dropdownlistArrow = this.host.find('#dropdownlistArrow');
            this.arrow = $(this.dropdownlistArrow.children()[0]);
            this.dropdownlistContent = this.host.find('#dropdownlistContent');
            this.dropdownlistContent.addClass(this.toThemeProperty('jqx-dropdownlist-content'));
            this.dropdownlistWrapper.addClass(this.toThemeProperty('jqx-disableselect'));
            this.addHandler(this.dropdownlistWrapper, 'selectstart', function () { return false; });
            this.dropdownlistWrapper[0].id = "dropdownlistWrapper" + this.element.id;
            this.dropdownlistArrow[0].id = "dropdownlistArrow" + this.element.id;
            this.dropdownlistContent[0].id = "dropdownlistContent" + this.element.id;

            var self = this;
            this.propertyChangeMap['disabled'] = function (instance, key, oldVal, value) {
                if (value) {
                    instance.host.addClass(self.toThemeProperty('jqx-dropdownlist-state-disabled'));
                    instance.host.addClass(self.toThemeProperty('jqx-fill-state-disabled'));
                    instance.dropdownlistContent.addClass(self.toThemeProperty('jqx-dropdownlist-content-disabled'));
                }
                else {
                    instance.host.removeClass(self.toThemeProperty('jqx-dropdownlist-state-disabled'));
                    instance.host.removeClass(self.toThemeProperty('jqx-fill-state-disabled'));
                    instance.dropdownlistContent.removeClass(self.toThemeProperty('jqx-dropdownlist-content-disabled'));
                }
            }

            if (this.disabled) {
                this.host.addClass(this.toThemeProperty('jqx-dropdownlist-state-disabled'));
                this.host.addClass(this.toThemeProperty('jqx-fill-state-disabled'));
                this.dropdownlistContent.addClass(this.toThemeProperty('jqx-dropdownlist-content-disabled'));
            }

            this.host.addClass(this.toThemeProperty('jqx-widget'));
            this.host.addClass(this.toThemeProperty('jqx-widget-content'));
            this.host.addClass(this.toThemeProperty('jqx-dropdownlist-state-normal'));
            this.host.addClass(this.toThemeProperty('jqx-rc-all'));
            this.host.addClass(this.toThemeProperty('jqx-fill-state-normal'));

            this.arrow.addClass(this.toThemeProperty('icon-arrow-down'));
            this.arrow.addClass(this.toThemeProperty('icon'));

            this._setSize();
            this.render();
            // fix for IE7
            if ($.browser.msie && $.browser.version < 8) {
                if (this.host.parents('.jqx-window').length > 0) {
                    var zIndex = this.host.parents('.jqx-window').css('z-index');
                    container.css('z-index', zIndex + 10);
                    this.listBoxContainer.css('z-index', zIndex + 10);
                }
            }
        },

        getItems: function () {
            if (!this.listBox) {
                return new Array();
            }

            return this.listBox.items;
        },

        //[optimize]
        _setSize: function () {
            if (this.width != null && this.width.toString().indexOf("px") != -1) {
                this.host.width(this.width);
            }
            else
                if (this.width != undefined && !isNaN(this.width)) {
                    this.host.width(this.width);
                };

            if (this.height != null && this.height.toString().indexOf("px") != -1) {
                this.host.height(this.height);
            }
            else if (this.height != undefined && !isNaN(this.height)) {
                this.host.height(this.height);
            };

            var isPercentage = false;
            if (this.width != null && this.width.toString().indexOf("%") != -1) {
                isPercentage = true;
                this.host.width(this.width);
            }

            if (this.height != null && this.height.toString().indexOf("%") != -1) {
                isPercentage = true;
                this.host.height(this.height);
            }

            if (isPercentage) {
                this.refresh(false);
                var me = this;
                var width = this.host.width();
                if (this.dropDownWidth != 'auto') {
                    width = this.dropDownWidth;
                }
                this.listBoxContainer.jqxListBox({ width: width });
                this.container.width(parseInt(width) + 25);

                var resizeFunc = function () {
                    me._arrange();
                    if (me.dropDownWidth == 'auto') {
                        var width = me.host.width();
                        me.listBoxContainer.jqxListBox({ width: width });
                        me.container.width(parseInt(width) + 25);
                    }
                }

                $(window).resize(function () {
                    resizeFunc();
                });

                setInterval(function () {
                    var width = me.host.width();
                    var height = me.host.height();
                    if (me._lastWidth != width || me._lastHeight != height) {
                        resizeFunc();
                    }
                    me._lastWidth = width;
                    me._lastHeight = height;
                }, 100);
            }
        },

        // returns true when the listbox is opened, otherwise returns false.
        isOpened: function () {
            var me = this;
            var openedListBox = $.data(document.body, "openedJQXListBox");
            if (openedListBox != null && openedListBox == me.listBoxContainer) {
                return true;
            }

            return false;
        },

        render: function () {
            var self = this;
            var hovered = false;

            if (!this.touch) {
                this.host.hover(function () {
                    if (!self.disabled && self.enableHover) {
                        hovered = true;
                        self.host.addClass(self.toThemeProperty('jqx-dropdownlist-state-hover'));
                        self.arrow.addClass(self.toThemeProperty('icon-arrow-down-hover'));
                        self.host.addClass(self.toThemeProperty('jqx-fill-state-hover'));
                    }
                }, function () {
                    if (!self.disabled && self.enableHover) {
                        self.host.removeClass(self.toThemeProperty('jqx-dropdownlist-state-hover'));
                        self.host.removeClass(self.toThemeProperty('jqx-fill-state-hover'));
                        self.arrow.removeClass(self.toThemeProperty('icon-arrow-down-hover'));
                        hovered = false;
                    }
                });
            }

            this.addHandler(this.dropdownlistWrapper, 'mousedown',
            function (event) {
                if (!self.disabled) {
                    var isOpen = self.container.css('display') == 'block';
                    if (!self.isanimating) {
                        if (isOpen) {
                            self.hideListBox();
                        }
                        else {
                            self.showListBox();
                        }
                    }
                }
            });

            this.addHandler($(document), 'mousedown.' + this.element.id, self.closeOpenedListBox, { me: this, listbox: this.listBox, id: this.element.id });
            if (this.touch) {
                this.addHandler($(document), 'touchstart.' + this.element.id, self.closeOpenedListBox, { me: this, listbox: this.listBox, id: this.element.id });
            }

            if (window.frameElement) {
                if (window.top != null) {
                    var eventHandle = function (event) {
                        if (self.isOpened()) {
                            var data = { me: self, listbox: self.listBox, id: self.element.id };
                            event.data = data;
                            //self.closeOpenedListBox(event);
                        }
                    };

                    if (window.top.document.addEventListener) {
                        window.top.document.addEventListener('mousedown', eventHandle, false);

                    } else if (window.top.document.attachEvent) {
                        window.top.document.attachEvent("on" + 'mousedown', eventHandle);
                    }
                }
            }

            this.addHandler(this.host, 'keydown', function (event) {
                var isOpen = self.container.css('display') == 'block';

                if (self.host.css('display') == 'none') {
                    return true;
                }

                if (event.keyCode == '13') {
                    if (!self.isanimating) {
                        if (isOpen) {
                            self.renderSelection();
                            self.hideListBox();
                            if (!self.keyboardSelection) {
                                self._raiseEvent('2', { index: self.selectedIndex, type: 'keyboard', item: self.getItem(self.selectedIndex) });
                            }
                        }
                        else {
                            self.showListBox();
                        }
                    }
                }

                if (event.keyCode == 115) {
                    if (!self.isanimating) {
                        if (!self.isOpened()) {
                            self.showListBox();
                        }
                        else if (self.isOpened()) {
                            self.hideListBox();
                        }
                    }
                    return false;
                }

                if (event.altKey) {
                    if (self.host.css('display') == 'block') {
                        if (event.keyCode == 38) {
                            if (self.isOpened()) {
                                self.hideListBox();
                            }
                        }
                        else if (event.keyCode == 40) {
                            if (!self.isOpened()) {
                                self.showListBox();
                            }
                        }
                    }
                }

                if (event.keyCode == '27') {
                    if (!self.ishiding) {
                        self.hideListBox();
                        if (self.tempSelectedIndex != undefined) {
                            self.selectIndex(self.tempSelectedIndex);
                        }
                    }
                }

                if (isOpen && !self.disabled) {
                    return self.listBox._handleKeyDown(event);
                }
            });
            this.addHandler(this.listBoxContainer, 'select', function (event) {
                if (!self.disabled) {
                    if (event.args.type != 'keyboard' || self.keyboardSelection) {
                        self.renderSelection();
                        self._raiseEvent('2', { index: event.args.index, type: event.args.type, item: event.args.item });
                        if (event.args.type == 'mouse') {
                            self.hideListBox();
                        }
                    }
                }
            });
            if (this.listBox) {
                if (this.listBox.content) {
                    this.addHandler(this.listBox.content, 'click', function (event) {
                        if (!self.disabled) {
                            self.renderSelection('mouse');
                            if (!self.touch) {
                                self.hideListBox();
                            }
                            if (!self.keyboardSelection) {
                                self._raiseEvent('2', { index: self.selectedIndex, type: 'keyboard', item: self.getItem(self.selectedIndex) });
                            }
                        }
                    });
                }
            }

            this.addHandler(this.host.find('div:first'), 'focus', function () {
                self.host.addClass(self.toThemeProperty('jqx-dropdownlist-state-focus'));
                self.host.addClass(self.toThemeProperty('jqx-fill-state-focus'));
            });
            this.addHandler(this.host.find('div:first'), 'blur', function () {
                self.host.removeClass(self.toThemeProperty('jqx-dropdownlist-state-focus'));
                self.host.removeClass(self.toThemeProperty('jqx-fill-state-focus'));
            });
        },

        removeHandlers: function () {
            var self = this;
            this.removeHandler(this.dropdownlistWrapper, 'mousedown');
            if (this.listBox) {
                if (this.listBox.content) {
                    this.removeandler(this.listBox.content, 'click');
                }
            }
            this.removeHandler(this.host, 'keydown');
            this.removeHandler(this.host.find('div:first'), 'focus');
            this.removeHandler(this.host.find('div:first'), 'blur');
            this.host.unbind('hover');
        },

        // gets an item by index.
        getItem: function (index) {
            var item = this.listBox.getItem(index);
            return item;
        },

        // renders the selection.
        renderSelection: function () {
            if (this.listBox == null)
                return;

            var item = this.listBox.getItem(this.listBox.selectedIndex);
            if (item == null) {
                this.dropdownlistContent.html("");
                return;
            }

            this.selectedIndex = this.listBox.selectedIndex;
            var spanElement = $('<span style="color: inherit; border: none; background-color: transparent;"></span>');
            spanElement.appendTo($(document.body));
            spanElement.addClass(this.toThemeProperty('jqx-listitem-state-normal'));
            spanElement.addClass(this.toThemeProperty('jqx-item'));
            try {
                if (item.html != undefined && item.html != null && item.html.toString().length > 0) {
                    spanElement.html(item.html);
                }
                else if (item.label != undefined && item.label != null && item.label.toString().length > 0) {
                    spanElement.html(item.label);
                }
                else if (item.value != undefined && item.value != null && item.value.toString().length > 0) {
                    spanElement.html(item.value);
                }
                else if (item.title != undefined && item.title != null && item.title.toString().length > 0) {
                    spanElement.html(item.title);
                }
            }
            catch (error) {
                var errorMessage = error;
            }

            var fontsize = this.dropdownlistContent.css('font-size');
            var fontfamily = this.dropdownlistContent.css('font-family');
            var topPadding = this.dropdownlistContent.css('padding-top');
            var bottomPadding = this.dropdownlistContent.css('padding-bottom');

            spanElement.css('font-size', fontsize);
            spanElement.css('font-family', fontfamily);
            spanElement.css('padding-top', topPadding);
            spanElement.css('padding-bottom', bottomPadding);

            var spanHeight = spanElement.outerHeight();
            spanElement.remove();
            spanElement.removeClass();
            if (this.selectionRenderer) {
                this.dropdownlistContent.html(this.selectionRenderer(spanElement));
            }
            else {
                this.dropdownlistContent.html(spanElement);
            }

            var height = this.host.height();
            if (this.height != null && this.height != undefined) {
                height = parseInt(this.height);
            }

            var top = (parseInt(height) - parseInt(spanHeight)) / 2;

            if (top > 0) {
                this.dropdownlistContent.css('margin-top', top + 'px');
                this.dropdownlistContent.css('margin-bottom', top + 'px');
            }
        },

        dataBind: function () {
            this.listBoxContainer.jqxListBox({ source: this.source });
            this.renderSelection('mouse');
            if (this.source == null) {
                this.clearSelection();
            }
        },

        clear: function () {
            this.listBoxContainer.jqxListBox({ source: null });
            this.clearSelection();
        },

        // clears the selection.
        clearSelection: function (render) {
            this.selectedIndex = -1;
            this.listBox.clearSelection();
            this.renderSelection();
            this.dropdownlistContent.html("");
        },

        // unselects an item at specific index.
        // @param Number
        unselectIndex: function (index, render) {
            if (isNaN(index))
                return;

            this.listBox.unselectIndex(index, render);
            this.renderSelection();
        },

        // selects an item at specific index.
        // @param Number
        selectIndex: function (index, ensureVisible, render, forceSelect) {
            this.listBox.selectIndex(index, ensureVisible, render, forceSelect);
            this.renderSelection();
        },

        // gets the selected index.
        getSelectedIndex: function () {
            return this.selectedIndex;
        },

        // gets the selected item.
        getSelectedItem: function () {
            return this.getItem(this.selectedIndex);
        },

        // inserts an item at specific index.
        // @param Number
        insertAt: function (item, index) {
            if (item == null)
                return false;

            return this.listBox.insertAt(item, index);
        },

        // adds a new item.
        addItem: function (item) {
            return this.listBox.addItem(item);
        },

        // removes an item at specific index.
        // @param Number
        removeAt: function (index) {
            var result = this.listBox.removeAt(index);
            this.renderSelection('mouse');
            return result;
        },

        // ensures that an item is visible.
        // @param Number
        ensureVisible: function (index) {
            this.listBox.ensureVisible(index);
        },

        // disables an item at specific index.
        // @param Number
        disableAt: function (index) {
            this.listBox.disableAt(index);
        },

        // enables an item at specific index.
        // @param Number
        enableAt: function (index) {
            this.listBox.enableAt(index);
        },

        _findPos: function (obj) {
            while (obj && (obj.type == 'hidden' || obj.nodeType != 1 || $.expr.filters.hidden(obj))) {
                obj = obj['nextSibling'];
            }
            var position = $(obj).offset();
            return [position.left, position.top];
        },

        testOffset: function (element, offset, inputHeight) {
            var dpWidth = element.outerWidth();
            var dpHeight = element.outerHeight();
            var viewWidth = $(window).width() + $(window).scrollLeft();
            var viewHeight = $(window).height() + $(window).scrollTop();

            if (offset.left + dpWidth > viewWidth) {
                if (dpWidth > this.host.width()) {
                    var hostLeft = this.host.offset().left;
                    var hOffset = dpWidth - this.host.width();
                    offset.left = hostLeft - hOffset + 2;
                }
            }
            offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
                Math.abs(dpHeight + inputHeight + 22) : 0);

            return offset;
        },

        open: function () {
            this.showListBox();
        },

        close: function () {
            this.hideListBox();
        },

        //OBSOLETE use close instead. 
        hide: function () {
            this.close();
        },

        //OBSOLETE use open instead. 
        show: function () {
            this.open();
        },

        // shows the listbox.
        showListBox: function () {
            var self = this;
            var listBox = this.listBoxContainer;
            var listBoxInstance = this.listBox;
            var scrollPosition = $(window).scrollTop();
            var scrollLeftPosition = $(window).scrollLeft();
            var top = parseInt(this._findPos(this.host[0])[1]) + parseInt(this.host.outerHeight()) - 1 + 'px';
            var left = parseInt(this.host.offset().left) + 'px';
            var isMobileBrowser = $.jqx.mobile.isSafariMobileBrowser();

            if (this.listBox == null)
                return;

            this.ishiding = false;
            if (!this.keyboardSelection) {
                this.listBox.selectIndex(this.selectedIndex);
                this.listBox.ensureVisible(this.selectedIndex);
            }

            this.tempSelectedIndex = this.selectedIndex;

            if (this.autoDropDownHeight) {
                this.container.height(this.listBoxContainer.height() + 25);
            }

            if (isMobileBrowser != null && isMobileBrowser) {
                left = $.jqx.mobile.getLeftPos(this.element);
                top = $.jqx.mobile.getTopPos(this.element) + parseInt(this.host.outerHeight());
            }

            listBox.stop();
            this.host.addClass(this.toThemeProperty('jqx-dropdownlist-state-selected'));
            this.host.addClass(this.toThemeProperty('jqx-fill-state-pressed'));
            this.arrow.addClass(this.toThemeProperty('icon-arrow-down-selected'));

            this.container.css('left', left);
            this.container.css('top', top);
            listBoxInstance._arrange();

            var closeAfterSelection = true;
            var positionChanged = false;
            if (this.enableBrowserBoundsDetection) {
                var newOffset = this.testOffset(listBox, { left: parseInt(this.container.css('left')), top: parseInt(top) }, parseInt(this.host.outerHeight()));
                if (parseInt(this.container.css('top')) != newOffset.top) {
                    positionChanged = true;
                    listBox.css('top', 23);
                }
                else listBox.css('top', 0);

                this.container.css('top', newOffset.top);
                if (parseInt(this.container.css('left')) != newOffset.left) {
                    this.container.css('left', newOffset.left);
                }
            }

            if (this.animationType == 'none') {
                this.container.css('display', 'block');
                $.data(document.body, "openedJQXListBoxParent", self);
                $.data(document.body, "openedJQXListBox", listBox);
            }
            else {
                this.container.css('display', 'block');
                var height = listBox.outerHeight();
                self.isanimating = true;
                if (positionChanged) {
                    listBox.css('margin-top', height);
                }
                else {
                    listBox.css('margin-top', -height);
                }

                listBox.animate({ 'margin-top': 0 }, this.showDelay, function () {
                    $.data(document.body, "openedJQXListBoxParent", self);
                    $.data(document.body, "openedJQXListBox", listBox);
                    self.ishiding = false;
                    self.isanimating = false;
                });

            }
            listBoxInstance._renderItems();
            this._raiseEvent('0', listBoxInstance);
        },

        // hides the listbox.
        hideListBox: function () {
            var listBox = this.listBoxContainer;
            var listBoxInstance = this.listBox;
            var container = this.container;
            var me = this;
            $.data(document.body, "openedJQXListBox", null);
            if (this.animationType == 'none') {
                this.container.css('display', 'none');
            }
            else {
                if (!me.ishiding) {
                    listBox.stop();
                    var height = listBox.outerHeight();
                    listBox.css('margin-top', 0);
                    me.isanimating = true;

                    var animationValue = -height;
                    if (parseInt(this.container.offset().top) < parseInt(this.host.offset().top)) {
                        animationValue = height;
                    }

                    listBox.animate({ 'margin-top': animationValue }, this.hideDelay, function () {
                        container.css('display', 'none');
                        me.isanimating = false;
                        me.ishiding = false;
                    });
                }
            }

            this.ishiding = true;
            this.host.removeClass(this.toThemeProperty('jqx-dropdownlist-state-selected'));
            this.host.removeClass(this.toThemeProperty('jqx-fill-state-pressed'));
            this.arrow.removeClass(this.toThemeProperty('icon-arrow-down-selected'));
            this._raiseEvent('1', listBoxInstance);
        },

        /* Close popup if clicked elsewhere. */
        closeOpenedListBox: function (event) {
            var self = event.data.me;
            var $target = $(event.target);
            var openedListBox = event.data.listbox;
            if (openedListBox == null)
                return true;

            if ($(event.target).ischildof(event.data.me.host)) {
                return true;
            }

            var dropdownlistInstance = self;

            var isListBox = false;
            $.each($target.parents(), function () {
                if (this.className != 'undefined') {
                    if (this.className.indexOf) {
                        if (this.className.indexOf('jqx-listbox') != -1) {
                            isListBox = true;
                            return false;
                        }
                        if (this.className.indexOf('jqx-dropdownlist') != -1) {
                            if (self.element.id == this.id) {
                                isListBox = true;
                            }
                            return false;
                        }
                    }
                }
            });

            if (openedListBox != null && !isListBox) {
                self.hideListBox();
            }

            return true;
        },

        loadFromSelect: function (id) {
            this.listBox.loadFromSelect(id);
        },

        refresh: function (initialRefresh) {
            this._arrange();
            this.renderSelection();
            if (initialRefresh != true) {
                this.dataBind();
            }
        },

        _arrange: function () {
            var width = parseInt(this.host.width());
            var height = parseInt(this.host.height());
            var arrowHeight = this.arrowSize;
            var arrowWidth = this.arrowSize;
            var rightOffset = 3;
            var contentWidth = width - arrowWidth - 2 * rightOffset;
            if (contentWidth > 0) {
                this.dropdownlistContent.width(contentWidth + 'px');
            }

            this.dropdownlistContent.height(height);
            this.dropdownlistContent.css('left', 0);
            this.dropdownlistContent.css('top', 0);

            this.dropdownlistArrow.width(arrowWidth);
            this.dropdownlistArrow.height(height);
        },

        destroy: function () {
            this.removeHandler(this.listBoxContainer, 'select');
            this.removeHandler(this.listBoxContainer, 'unselect');
            this.removeHandler(this.listBoxContainer, 'change');
            this.removeHandler(this.dropdownlistWrapper, 'selectstart');
            this.removeHandler(this.dropdownlistWrapper, 'mousedown');
            this.removeHandler(this.host, 'keydown');
            this.removeHandler(this.listBoxContainer, 'select');
            this.removeHandler(this.host, 'loadContent');
            this.removeHandler(this.listBox.content, 'click');
            this.removeHandler(this.host.find('div:first'), 'focus');
            this.removeHandler(this.host.find('div:first'), 'blur');

            this.listBoxContainer.jqxListBox('destroy');
            this.listBoxContainer.remove();
            this.host.removeClass();
            this.removeHandler($(document), 'mousedown.' + this.element.id, self.closeOpenedListBox);
            if (this.touch) {
                this.removeHandler($(document), 'touchstart.' + this.element.id);
            }

            this.host.remove();
        },

        //[optimize]
        _raiseEvent: function (id, arg) {
            if (arg == undefined)
                arg = { owner: null };

            var evt = this.events[id];
            args = arg;
            args.owner = this;

            var event = new jQuery.Event(evt);
            event.owner = this;
            if (id == 2 || id == 3 || id == 4) {
                event.args = arg;
            }

            var result = this.host.trigger(event);
            return result;
        },

        propertyChangedHandler: function (object, key, oldvalue, value) {
            if (object.isInitialized == undefined || object.isInitialized == false)
                return;
            if (key == 'renderer') {
                object.listBox.renderer = object.renderer;
            }
            if (key == 'itemHeight') {
                object.listBox.itemHeight = value;
            }
            if (key == 'source') {
                object.listBoxContainer.jqxListBox({ source: object.source });
                object.renderSelection();
                if (value == null) {
                    object.clear();
                }
            }

            if (key == "displayMember" || key == "valueMember") {
                object.listBoxContainer.jqxListBox({ displayMember: object.displayMember, valueMember: object.valueMember });
                object.renderSelection();
            }

            if (key == 'theme' && value != null) {
                object.listBoxContainer.jqxListBox({ theme: value });
                object.dropdownlistContent.removeClass();
                object.dropdownlistContent.addClass(object.toThemeProperty('jqx-dropdownlist-content'));
                object.dropdownlistWrapper.removeClass();
                object.dropdownlistWrapper.addClass(object.toThemeProperty('jqx-disableselect'));
                object.host.removeClass();
                object.host.addClass(object.toThemeProperty('jqx-fill-state-normal'));
                object.host.addClass(object.toThemeProperty('jqx-dropdownlist-state-normal'));
                object.host.addClass(object.toThemeProperty('jqx-rc-all'));
                object.host.addClass(object.toThemeProperty('jqx-widget'));
                object.host.addClass(object.toThemeProperty('jqx-widget-content'));
                object.arrow.removeClass();
                object.arrow.addClass(object.toThemeProperty('icon-arrow-down'));
                object.arrow.addClass(object.toThemeProperty('icon'));
            }

            if (key == "autoDropDownHeight" && value != oldvalue) {
                object.listBoxContainer.jqxListBox({ autoHeight: object.autoDropDownHeight });
                if (object.autoDropDownHeight) {
                    object.container.height(object.listBoxContainer.height() + 25);
                }
                else {
                    object.listBoxContainer.jqxListBox({ height: object.dropDownHeight });
                    object.container.height(parseInt(object.dropDownHeight) + 25);
                }
            }

            if (key == "searchMode") {
                object.listBoxContainer.jqxListBox({ searchMode: object.searchMode });
            }

            if (key == "incrementalSearch") {
                object.listBoxContainer.jqxListBox({ incrementalSearch: object.incrementalSearch });
            }

            if (key == "incrementalSearchDelay") {
                object.listBoxContainer.jqxListBox({ incrementalSearchDelay: object.incrementalSearchDelay });
            }

            if (key == "dropDownHeight") {
                if (!object.autoDropDownHeight) {
                    object.listBoxContainer.jqxListBox({ height: object.dropDownHeight });
                    object.container.height(parseInt(object.dropDownHeight) + 25);
                }
            }

            if (key == "dropDownWidth" || key == "scrollBarSize") {
                var width = object.width;
                if (object.dropDownWidth != 'auto') {
                    width = object.dropDownWidth;
                }

                object.listBoxContainer.jqxListBox({ width: width, scrollBarSize: object.scrollBarSize });
                object.container.width(parseInt(width) + 25);
            }

            if (key == 'width' || key == 'height') {
                object._setSize();
                object._arrange();
            }

            if (key == 'selectedIndex') {
                if (object.listBox != null) {
                    object.listBox.selectIndex(value);
                    object.renderSelection();
                }
            }
        }
    });
})(jQuery);
