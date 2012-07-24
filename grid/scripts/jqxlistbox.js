
(function ($) {

    $.jqx.jqxWidget("jqxListBox", "", {});

    $.extend($.jqx._jqxListBox.prototype, {
        defineInstance: function () {
            // Type: Boolean
            // Default: true    
            // enables/disables the listbox.
            this.disabled = false;
            // gets or sets the listbox width.
            this.width = null;
            // gets or sets the listbox height.
            this.height = null;
            // Represents the collection of list items.
            this.items = new Array();
            // Type: Boolean
            // Default: false
            // enables/disables the multiple selection.
            this.multiple = false;
            // Gets or sets the selected index.
            this.selectedIndex = -1;
            // Gets the selected item indexes.
            this.selectedIndexes = new Array();
            // Type: Object
            // Default: null
            // data source.
            this.source = null;
            // Type: Number
            // Default: 15
            // gets or sets the scrollbars size.
            this.scrollBarSize = 15;
            // Type: Boolean
            // Default: true
            // enables/disables the hover state.
            this.enableHover = true;
            // Type: Boolean
            // Default: true
            // enables/disables the selection.
            this.enableSelection = true;
            // gets the visible items. // this property is internal for the listbox.
            this.visualItems = new Array();
            // gets the groups. // this property is internal for the listbox.
            this.groups = new Array();
            // Type: Boolean
            // Default: true
            // gets or sets whether the items width should be equal to the listbox's width.
            this.equalItemsWidth = true;
            // gets or sets the height of the ListBox Items. When the itemHeight == - 1, each item's height is equal to its desired height.
            this.itemHeight = -1;
            // this property is internal for the listbox.
            this.visibleItems = new Array();
            // Type: String
            // Default: Group
            // represents the text of the empty group. This is displayed only when the items are not loaded from html select element.
            this.emptyGroupText = 'Group';
            // Type: Boolean
            // Default: false
            // Gets or sets whether the listbox should display a checkbox next to each item.
            this.checkboxes = false;
            // Type: Boolean
            // Default: false
            // Gets or sets whether the listbox checkboxes have three states - checked, unchecked and indeterminate.           
            this.hasThreeStates = false;
            // Type: Boolean
            // Default: false
            // Gets or sets whether the listbox's height is equal to the sum of its items height          
            this.autoHeight = false;
            // represents the listbox's events.    
            // Type: Boolean
            // Default: true
            // Gets or sets whether the listbox items are with rounded corners.         
            this.roundedcorners = true;
            this.touchMode = 'auto';
            this.displayMember = "";
            this.valueMember = "";
            // Type: String
            // Default: startswithignorecase
            // Possible Values: 'none, 'contains', 'containsignorecase', 'equals', 'equalsignorecase', 'startswithignorecase', 'startswith', 'endswithignorecase', 'endswith'
            this.searchMode = 'startswithignorecase';
            this.incrementalSearch = true;
            this.incrementalSearchDelay = 700;
            this.allowDrag = false;
            this.allowDrop = true;
            // Possible values: 'none, 'default', 'copy'
            this.dropAction = 'default';
            this.touchModeStyle = 'auto';
            this.keyboardNavigation = true;
            this.enableMouseWheel = true;
            this.events =
            [
            // triggered when the user selects an item.
                'select',
            // triggered when the user unselects an item.
                'unselect',
            // triggered when the selection is changed.
                'change',
            // triggered when the user checks or unchecks an item. 
                'checkChange',
            // triggered when the user drags an item. 
               'dragStart',
            // triggered when the user drops an item. 
               'dragEnd'
            ];
        },

        createInstance: function (args) {
            var self = this;
            this.host.addClass(this.toThemeProperty("jqx-listbox"));
            this.host.addClass(this.toThemeProperty("jqx-reset"));
            this.host.addClass(this.toThemeProperty("jqx-rc-all"));
            this.host.addClass(this.toThemeProperty("jqx-widget"));
            this.host.addClass(this.toThemeProperty("jqx-widget-content"));

            var isPercentage = false;

            if (this.width != null && this.width.toString().indexOf("%") != -1) {
                this.host.width(this.width);
                isPercentage = true;
            }
            if (this.height != null && this.height.toString().indexOf("%") != -1) {
                this.host.height(this.height);
                if (this.host.height() == 0) {
                    this.host.height(200);
                }
                isPercentage = true;
            }
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

            var listBoxStructure = $("<div tabIndex=0 style='-webkit-appearance: none; background: transparent; outline: none; width:100%; height: 100%; align:left; border: 0px; padding: 0px; margin: 0px; left: 0px; top: 0px; valign:top; position: relative;'>" +
                "<div tabIndex=1 style='-webkit-appearance: none; border: none; background: transparent; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; align:left; left: 0px; top: 0px; valign:top; position: relative;'>" +
                "<div id='listBoxContent' tabIndex=2 style='-webkit-appearance: none; border: none; background: transparent; outline: none; border: none; padding: 0px; overflow: hidden; margin: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
                "<div id='verticalScrollBar" + this.element.id + "' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
                "<div id='horizontalScrollBar" + this.element.id + "' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
                "<div id='bottomRight' style='align:left; valign:top; left: 0px; top: 0px; border: none; position: absolute;'/>" +
                "</div>" +
                "</div>");

            this.host.attr('tabIndex', 1);
            this.host.append(listBoxStructure);
            var verticalScrollBar = this.host.find("#verticalScrollBar" + this.element.id);
            if (!verticalScrollBar.jqxScrollBar) {
                alert('jqxscrollbar.js is not loaded.');
                return;
            }

            this.vScrollBar = verticalScrollBar.jqxScrollBar({ 'vertical': true, theme: this.theme, touchMode: this.touchMode, largestep: parseInt(this.host.height()) / 2 });
            var horizontalScrollBar = this.host.find("#horizontalScrollBar" + this.element.id);
            this.hScrollBar = horizontalScrollBar.jqxScrollBar({ 'vertical': false, touchMode: this.touchMode, theme: this.theme });

            this.content = this.host.find("#listBoxContent");
            this.bottomRight = this.host.find("#bottomRight").addClass(this.toThemeProperty('jqx-listbox-bottomright'));
            this.bottomRight[0].id = "bottomRight" + this.element.id;
            this.vScrollBar.css('visibility', 'inherit');
            this.hScrollBar.css('visibility', 'inherit');
            this.vScrollInstance = $.data(this.vScrollBar[0], 'jqxScrollBar').instance;
            this.hScrollInstance = $.data(this.hScrollBar[0], 'jqxScrollBar').instance;
            if (this.isTouchDevice()) {
                var overlayContent = $("<div class='overlay' style='-webkit-appearance: none; border: none; background: transparent; outline: none; border: none; padding: 0px; overflow: hidden; margin: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>");
                this.content.parent().append(overlayContent);
                this.overlayContent = this.host.find('.overlay');
            }
            this._updateTouchScrolling();

            this.host.addClass('jqx-disableselect');

            if (isPercentage) {
                $(window).resize(function () {
                    self._updateSize();
                });
            }

            if (this.host.jqxDragDrop) {
                jqxListBoxDragDrop();
            }
        },

        _updateTouchScrolling: function () {
            var self = this;
            if (this.isTouchDevice()) {
                self.enableHover = false;
                var element = this.overlayContent ? this.overlayContent : this.content;

                $(element).unbind('touchstart.touchScroll');
                $(element).unbind('touchmove.touchScroll');
                $(element).unbind('touchend.touchScroll');
                $(element).unbind('touchcancel.touchScroll');

                $.jqx.mobile.touchScroll(element, self.vScrollInstance.max, function (left, top) {
                    if (self.vScrollBar.css('visibility') != 'hidden') {
                        var oldValue = self.vScrollInstance.value;
                        self.vScrollInstance.setPosition(oldValue + top);
                        self._lastScroll = new Date();
                    }
                    if (self.hScrollBar.css('visibility') != 'hidden') {
                        var oldValue = self.hScrollInstance.value;
                        self.hScrollInstance.setPosition(oldValue + left);
                        self._lastScroll = new Date();
                    }
                }, this.element.id);
                if (self.vScrollBar.css('visibility') != 'visible' && self.hScrollBar.css('visibility') != 'visible') {
                    $.jqx.mobile.setTouchScroll(false, this.element.id);
                }
                else {
                    $.jqx.mobile.setTouchScroll(true, this.element.id);
                }
            }
        },

        isTouchDevice: function () {
            var isTouchDevice = $.jqx.mobile.isTouchDevice();
            if (this.touchMode == true) {
                isTouchDevice = true;
                $.jqx.mobile.setMobileSimulator(this.element);
            }
            else if (this.touchMode == false) {
                isTouchDevice = false;
            }
            if (isTouchDevice && this.touchModeStyle != false) {
                this.scrollBarSize = 10;
            }
            if (isTouchDevice) {
                this.host.addClass(this.toThemeProperty('jqx-touch'));
            }

            return isTouchDevice;
        },

        beginUpdate: function () {
            this.updatingListBox = true;
        },

        endUpdate: function () {
            this.updatingListBox = false;
            this._addItems();
            this._renderItems();
        },

        beginUpdateLayout: function () {
            this.updating = true;
        },

        resumeUpdateLayout: function () {
            this.updating = false;
            this.vScrollInstance.value = 0;
            this._render(false);
        },

        _updateSize: function () {
            var me = this;
            var hostWidth = me.host.width();
            var hostHeight = me.host.height();

            if (!me._oldWidth) {
                me._oldWidth = hostWidth;
            }

            if (!me._oldHeight) {
                me._oldHeight = hostHeight;
            }

            setTimeout(function () {
                if (hostWidth != me._oldWidth) {
                    me._updatescrollbars();
                    me._renderItems();
                }

                if (hostHeight != me._oldHeight) {
                    if (me.items) {
                        if (me.items.length > 0 && me.virtualItemsCount * me.items[0].height < hostHeight) {
                            me._render(false);
                        }
                        else {
                            me._updatescrollbars();
                            me._renderItems();
                        }
                    }
                }

                me._oldWidth = hostWidth;
                me._oldHeight = hostHeight;
            }, 1);
        },

        propertyChangedHandler: function (object, key, oldvalue, value) {
            if (this.isInitialized == undefined || this.isInitialized == false)
                return;

            if (key == 'source' || key == 'scrollBarSize' || key == 'equalItemsWidth' || key == 'checkboxes') {
                object.clearSelection();
                object.refresh();
            }

            if (key == "touchMode") {
                object._removeHandlers();
                object.vScrollBar.jqxScrollBar({ touchMode: value });
                object.hScrollBar.jqxScrollBar({ touchMode: value });
                object._updateTouchScrolling();
                object._addHandlers();
            }

            if (!this.updating) {
                if (key == "width" || key == "height") {
                    setTimeout(function () {
                        object.vScrollInstance.value = 0;
                        if (key == "width") {
                            if (oldvalue != value) {
                                object.host.width(value);
                                object._updatescrollbars();
                                object._renderItems();
                            }
                        }
                        else {
                            if (oldvalue != value) {
                                object.host.height(value);
                                if (object.items) {
                                    if (object.items.length > 0 && object.virtualItemsCount * object.items[0].height < value) {
                                        object._render(false);
                                    }
                                    else {
                                        object._updatescrollbars();
                                        object._renderItems();
                                    }
                                }
                            }
                        }
                    }, 1);
                }
            }

            if (key == 'theme') {
                if (oldvalue != value) {
                    object.hScrollBar.jqxScrollBar({ theme: object.theme });
                    object.vScrollBar.jqxScrollBar({ theme: object.theme });
                    object.host.removeClass();
                    object.host.addClass(object.toThemeProperty("jqx-listbox"));
                    object.host.addClass(object.toThemeProperty("jqx-widget"));
                    object.host.addClass(object.toThemeProperty("jqx-widget-content"));
                    object.host.addClass(object.toThemeProperty("jqx-reset"));
                    object.host.addClass(object.toThemeProperty("jqx-rc-all"));
                    object.refresh();
                }
            }

            if (key == 'selectedIndex') {
                object.clearSelection();
                object.selectIndex(value, true);
            }

            if (key == "displayMember" || key == "valueMember") {
                if (oldvalue != value) {
                    var oldSelectedIndex = object.selectedIndex;
                    object.refresh();
                    object.selectedIndex = oldSelectedIndex;
                    object.selectedIndexes[oldSelectedIndex] = oldSelectedIndex;
                }
                object._renderItems();
            }

            if (key == 'autoHeight') {
                object._render();
            }
        },

        loadFromSelect: function (id) {
            if (id == null)
                return;

            var searchElementId = '#' + id;
            var selectElement = $(searchElementId);
            if (selectElement.length > 0) {
                var options = selectElement.find('option');
                var groups = selectElement.find('optgroup');
                var index = 0;
                var selectedOption = -1;
                var optionItems = new Array();

                $.each(options, function () {
                    var hasGroup = groups.find(this).length > 0;
                    var group = null;

                    if (this.text != this.value && (this.label == null || this.label == '')) {
                        this.label = this.text;
                    }

                    var item = { disabled: this.disabled, value: this.value, label: this.label, title: this.title, originalItem: this };

                    var ie7 = $.browser.msie && $.browser.version < 8;
                    if (ie7) {
                        if (item.value == '' && this.text != null && this.text.length > 0) {
                            item.value = this.text;
                        }
                    }

                    if (hasGroup) {
                        group = groups.find(this).parent()[0].label;
                        item.group = group;
                    }

                    if (this.selected) selectedOption = index;
                    optionItems[index] = item;
                    index++;
                });

                this.source = optionItems;
                this.fromSelect = true;
                this.clearSelection();
                this.selectedIndex = selectedOption;
                this.selectedIndexes[this.selectedIndex] = this.selectedIndex;
                this.refresh();
            }
        },

        refresh: function (initialRefresh) {
            var me = this;
            var verticalScrollBar = this.host.find("#verticalScrollBar" + this.element.id);
            if (!verticalScrollBar.jqxScrollBar) {
                return;
            }
            this.visibleItems = new Array();
            var selectInitialItem = function (initialRefresh) {
                if (initialRefresh == true) {
                    if (me.selectedIndex != -1) {
                        var tmpIndex = me.selectedIndex;
                        me.selectedIndex = -1;
                        me.selectIndex(tmpIndex);
                    }
                }
            }
            if ($.jqx.dataAdapter && this.source != null && this.source._source) {
                this.databind(this.source);
                selectInitialItem(initialRefresh);
                return;
            }
            this.items = this.loadItems(this.source);
            this._render();
            selectInitialItem(initialRefresh);
        },

        _render: function (ensurevisible) {
            this._addItems();
            this._renderItems();
            var vScrollInstance = $.data(this.vScrollBar[0], 'jqxScrollBar').instance;
            vScrollInstance.setPosition(0);
            this._cachedItemHtml = new Array();
            if (ensurevisible == undefined || ensurevisible) {
                if (this.items != undefined && this.items != null) {
                    if (this.selectedIndex >= 0 && this.selectedIndex < this.items.length) {
                        this.selectIndex(this.selectedIndex);
                        this.ensureVisible(this.selectedIndex);
                    }
                }
            }

            if (this.allowDrag && this._enableDragDrop) {
                this._enableDragDrop();
                if (this.isTouchDevice()) {
                    this._removeHandlers();
                    if (this.overlayContent) {
                        this.overlayContent.remove();
                        this.overlayContent = null;
                    }
                    this._updateTouchScrolling();
                    this._addHandlers();
                    return;
                }
            }
            this._updateTouchScrolling();
        },

        _createID: function () {
            var id = Math.random() + '';
            id = id.replace('.', '');
            id = '99' + id;
            id = id / 1;
            while (this.items[id]) {
                id = Math.random() + '';
                id = id.replace('.', '');
                id = id / 1;
            }
            return 'listitem' + id;
        },

        _hitTest: function (hitLeft, hitTop) {
            var top = parseInt(this.vScrollInstance.value);
            var firstIndex = this._searchFirstVisibleIndex(hitTop + top, this.renderedVisibleItems)
            if (this.renderedVisibleItems[firstIndex] != undefined && this.renderedVisibleItems[firstIndex].isGroup)
                return null;

            if (this.renderedVisibleItems.length > 0) {
                var lastItem = this.renderedVisibleItems[this.renderedVisibleItems.length - 1];
                if (lastItem.height + lastItem.top < hitTop + top) {
                    return null;
                }
            }

            firstIndex = this._searchFirstVisibleIndex(hitTop + top)
            return this.visibleItems[firstIndex];

            return null;
        },

        _searchFirstVisibleIndex: function (value, collection) {
            if (value == undefined) {
                value = parseInt(this.vScrollInstance.value);
            }
            var min = 0;
            if (collection == undefined || collection == null) {
                collection = this.visibleItems;
            }

            var max = collection.length;
            while (min <= max) {
                mid = parseInt((min + max) / 2)
                var item = collection[mid];
                if (item == undefined)
                    break;

                if (item.initialTop > value && item.initialTop + item.height > value) {
                    max = mid - 1;
                } else if (item.initialTop < value && item.initialTop + item.height <= value) {
                    min = mid + 1;
                } else {
                    return mid;
                    break;
                }
            }

            return 0;
        },

        _renderItems: function () {
            if (this.items == undefined || this.items.length == 0)
                return;

            if (this.updatingListBox == true)
                return;

            var vScrollInstance = this.vScrollInstance;
            var hScrollInstance = this.hScrollInstance;
            var top = parseInt(vScrollInstance.value);
            var left = parseInt(hScrollInstance.value);
            var itemsLength = this.items.length;
            var width = parseInt(this.content.width()) + parseInt(hScrollInstance.max);
            var vScrollBarWidth = parseInt(this.vScrollBar.outerWidth());
            if (this.vScrollBar.css('visibility') != 'visible') {
                vScrollBarWidth = 0;
            }

            if (this.hScrollBar.css('visibility') != 'visible') {
                width = parseInt(this.content.width());
            }
            var virtualItemsCount = this._getVirtualItemsCount();
            var renderCollection = new Array();
            var y = 0;
            var hostHeight = this.host.outerHeight();
            var maxWidth = 0;
            var visibleIndex = 0;
            var renderIndex = 0;

            if (vScrollInstance.value == 0 || this.visibleItems.length == 0) {
                for (indx = 0; indx < this.items.length; indx++) {
                    var item = this.items[indx];
                    if (item.visible) {
                        item.top = -top;
                        item.initialTop = -top;
                        if (!item.isGroup && item.visible) {
                            this.visibleItems[visibleIndex++] = item;
                            item.visibleIndex = visibleIndex - 1;
                        }

                        this.renderedVisibleItems[renderIndex++] = item;

                        item.left = -left;
                        var bottom = item.top + item.height;
                        if (bottom >= 0 && item.top - item.height <= hostHeight) {
                            renderCollection[y++] = { index: indx, item: item };
                        }

                        top -= item.height;
                    }
                }
            }
            var firstIndex = top > 0 ? this._searchFirstVisibleIndex(this.vScrollInstance.value, this.renderedVisibleItems) : 0;
            var initialHeight = 0;
            y = 0;
            var scrollValue = this.vScrollInstance.value;
            var iterations = 0;
            while (initialHeight < 100 + hostHeight) {
                var item = this.renderedVisibleItems[firstIndex];
                if (item == undefined)
                    break;
                if (item.visible) {
                    item.left = -left;
                    var bottom = item.top + item.height - scrollValue;
                    if (bottom >= 0 && item.initialTop - scrollValue - item.height <= 2 * hostHeight) {
                        renderCollection[y++] = { index: firstIndex, item: item };
                    }
                }

                firstIndex++;
                if (item.visible) {
                    initialHeight += item.initialTop - scrollValue + item.height - initialHeight;
                }
                iterations++;
                if (iterations > this.items.length - 1)
                    break;
            }

            var listItemNormalClass = this.toThemeProperty('jqx-listitem-state-normal') + ' ' + this.toThemeProperty('jqx-item');
            var listItemGroupClass = this.toThemeProperty('jqx-listitem-state-group');
            var listItemDisabledClass = this.toThemeProperty('jqx-listitem-state-disabled') + ' ' + this.toThemeProperty('jqx-fill-state-disabled');
            var middle = 0;
            var me = this;
            for (indx = 0; indx < this.visualItems.length; indx++) {
                var itemElement = this.visualItems[indx];
                var hideItem = function () {
                    var spanElement = itemElement.find('#spanElement');
                    spanElement.css({ 'visibility': 'hidden' });
                    spanElement.removeClass();

                    if (me.checkboxes && me.host.jqxCheckBox) {
                        var checkbox = itemElement.find('.chkbox');
                        checkbox.css({ 'visibility': 'hidden' });
                    }
                }

                if (indx < renderCollection.length) {
                    var item = renderCollection[indx].item;
                    if (item.initialTop - scrollValue >= hostHeight) {
                        hideItem();
                        continue;
                    }

                    var spanElement = itemElement.find('#spanElement');
                    if (spanElement.length == 0)
                        continue;

                    spanElement.removeClass();
                    spanElement.css({ 'display': 'block', 'visibility': 'inherit' });

                    if (!item.isGroup && !this.selectedIndexes[item.index] >= 0) {
                        spanElement.addClass(listItemNormalClass);
                    }
                    else {
                        spanElement.addClass(listItemGroupClass);
                    }

                    if (item.disabled || this.disabled) {
                        spanElement.addClass(listItemDisabledClass);
                    }

                    if (this.roundedcorners) {
                        spanElement.addClass(this.toThemeProperty('jqx-rc-all'));
                    }

                    if (this.renderer) {
                        if (!item.key) item.key = this.generatekey();
                        if (!this._cachedItemHtml) this._cachedItemHtml = new Array();
                        if (this._cachedItemHtml[item.key]) {
                            if (spanElement[0].innerHTML != this._cachedItemHtml[item.key]) {
                                spanElement[0].innerHTML = this._cachedItemHtml[item.key];
                            }
                        }
                        else {
                            var html = this.renderer(item.index, item.label, item.value);
                            spanElement[0].innerHTML = html;
                            this._cachedItemHtml[item.key] = spanElement[0].innerHTML;
                        }

                    }
                    else {
                        if (item.html != null && item.html.toString().length > 0) {
                            spanElement[0].innerHTML = item.html;
                        }
                        else if (item.label != null || item.value != null) {
                            if (item.label != null) {
                                if (spanElement[0].innerHTML !== item.label) {
                                    spanElement[0].innerHTML = item.label;
                                }
                            }
                            else {
                                if (spanElement[0].innerHTML !== item.value) {
                                    spanElement[0].innerHTML = item.value;
                                }
                            }
                        }
                    }

                    itemElement[0].style.left = item.left + 'px';
                    itemElement[0].style.top = item.initialTop - scrollValue + 'px';

                    item.element = spanElement[0];
                    $.data(spanElement[0], 'item', item);
                    if (item.title) {
                        spanElement[0].title = item.title;
                    }

                    if (this.equalItemsWidth && !item.isGroup) {
                        if (maxWidth == 0) {
                            var itemWidth = parseInt(width);
                            var diff = parseInt(spanElement.outerWidth()) - parseInt(spanElement.width());
                            itemWidth -= diff;
                            var borderSize = 1;
                            if (borderSize != null) {
                                borderSize = parseInt(borderSize);
                            }
                            else borderSize = 0;
                            itemWidth -= 2 * borderSize;
                            maxWidth = itemWidth;
                            if (this.checkboxes && this.host.jqxCheckBox) {
                                maxWidth -= 18;
                            }
                        }
                        spanElement.width(maxWidth);
                        item.width = maxWidth;
                    }
                    else {
                        if (spanElement.width() < this.host.width()) {
                            spanElement.width(this.host.width() - 2);
                        }
                    }

                    if (this.checkboxes && this.host.jqxCheckBox && !item.isGroup) {
                        if (middle == 0) {
                            middle = (parseInt(itemElement.outerHeight(true)) - 16) / 2;
                            middle++;
                        }
                        var checkbox = $(itemElement.children()[0]);
                        checkbox[0].item = item;
                        spanElement.css({ 'left': '18px' });
                        checkbox.css('top', middle + 'px');
                        checkbox.css({ 'display': 'block', 'visibility': 'inherit' });
                        var checked = checkbox.jqxCheckBox('checked');
                        if (checked != item.checked) {
                            checkbox.jqxCheckBox({ checked: item.checked, disabled: item.disabled });
                        }
                    }

                    if (this.selectedIndexes[item.visibleIndex] >= 0 && !item.disabled) {
                        spanElement.addClass(this.toThemeProperty('jqx-listitem-state-selected'));
                        spanElement.addClass(this.toThemeProperty('jqx-fill-state-pressed'));
                    }
                }
                else {
                    hideItem();
                }
            }
        },

        generatekey: function () {
            var S4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        },

        _calculateVirtualSize: function () {
            var width = 0;
            var height = 2;
            var currentItem = 0;
            var spanElement = $("<span></span>");
            var itemsPerPage = 0;
            var hostHeight = this.host.outerHeight();

            $(document.body).append(spanElement);
            for (currentItem = 0; currentItem < this.items.length; currentItem++) {
                var item = this.items[currentItem];

                if (item.isGroup && (item.label == '' && item.html == '')) {
                    continue;
                }

                if (!item.visible)
                    continue;


                if (!item.isGroup) {
                    spanElement.addClass(this.toThemeProperty('jqx-listitem-state-normal jqx-rc-all'));
                }
                else {
                    spanElement.addClass(this.toThemeProperty('jqx-listitem-state-group jqx-rc-all'));
                }
                spanElement.addClass(this.toThemeProperty('jqx-fill-state-normal'));
                if (this.isTouchDevice()) {
                    spanElement.addClass(this.toThemeProperty('jqx-touch'));
                }
                if (this.equalItemsWidth) {
                    spanElement.css('float', 'left');
                }

                if (this.renderer) {
                    var html = this.renderer(item.index, item.label, item.value);
                    spanElement[0].innerHTML = html;
                }
                else {
                    if (item.html != null && item.html.toString().length > 0) {
                        spanElement['html'](item.html);
                    }
                    else if (item.label != null || item.value != null) {
                        if (item.label != null) {
                            spanElement['text'](item.label);
                        }
                        else spanElement['text'](item.value);
                    }
                }

                var spanHeight = spanElement.outerHeight();
                var spanWidth = spanElement.outerWidth();

                if (this.itemHeight > -1) {
                    spanHeight = this.itemHeight;
                }

                item.height = spanHeight;
                item.width = spanWidth;
                height += spanHeight;
                width = Math.max(width, spanWidth);

                if (height <= hostHeight) {
                    itemsPerPage++;
                }
            }

            if (itemsPerPage < 10) itemsPerPage = 10;

            spanElement.remove();
            return { width: width + 4, height: height, itemsPerPage: itemsPerPage };
        },

        _getVirtualItemsCount: function () {
            if (this.virtualItemsCount == 0) {
                var virtualItemsCount = parseInt(this.host.height()) / 5;
                if (virtualItemsCount > this.items.length) {
                    virtualItemsCount = this.items.length;
                }
                return virtualItemsCount;
            }
            else return this.virtualItemsCount;
        },

        _addItems: function () {
            if (this.updatingListBox == true)
                return;

            if (this.items == undefined || this.items.length == 0) {
                this.virtualSize = { width: 0, height: 0, itemsPerPage: 0 };
                this._updatescrollbars();
                this.renderedVisibleItems = new Array();
                if (this.itemswrapper) {
                    this.itemswrapper.children().remove();
                }
                return;
            }
            var self = this;
            var top = 0;
            this.visibleItems = new Array();
            this.renderedVisibleItems = new Array();
            this.content.find('.jqx-listitem-state-normal').remove();
            this.content.find('.jqx-listitem-state-pressed').remove();
            this.content.find('.jqx-listitem-state-hover').remove();
            this.content.find('.jqx-listitem-state-disabled').remove();
            this.content.find('.jqx-listitem-state-group ').remove();

            this._removeHandlers();
            this.content[0].innerHTML = '';

            this.itemswrapper = $('<div tabIndex=1 style="outline: 0 none; overflow:hidden; width:100%; position: relative;"></div>');
            this.itemswrapper.height(2 * this.host.height());
            this.content.append(this.itemswrapper);

            var virtualSize = this._calculateVirtualSize();
            var virtualItemsCount = virtualSize.itemsPerPage * 2;
            if (this.autoHeight) {
                virtualItemsCount = this.items.length;
            }

            this.virtualItemsCount = Math.min(virtualItemsCount, this.items.length);
            var me = this;
            var virtualWidth = virtualSize.width;
            this.virtualSize = virtualSize;
            this.itemswrapper.width(Math.max(this.host.width(), 17 + virtualSize.width));
            for (virtualItemIndex = 0; virtualItemIndex < this.virtualItemsCount; virtualItemIndex++) {
                var item = this.items[virtualItemIndex];
                var itemElement = $("<div style='border: none; tabIndex=0 width:100%; height: 100%; align:left; valign:top; position: absolute;'></div>");
                var spanElement = $("<span id='spanElement'></span>");

                itemElement[0].id = self._createID();
                if (this.allowDrag && this._enableDragDrop) {
                    itemElement.addClass('draggable');
                }

                spanElement.appendTo(itemElement);
                itemElement.appendTo(this.itemswrapper);

                if (this.checkboxes && this.host.jqxCheckBox) {
                    var checkbox = $('<div tabIndex=1 style="background-color: transparent; padding: 0; margin: 0; position: absolute; float: left; width: 16px; height: 16px;" class="chkbox"/>');
                    itemElement.css('float', 'left');
                    spanElement.css('float', 'left');
                    itemElement.prepend(checkbox);
                    checkbox.jqxCheckBox({ checked: item.checked, animationShowDelay: 0, animationHideDelay: 0, disabled: item.disabled, enableContainerClick: false, keyboardCheck: false, hasThreeStates: this.hasThreeStates, theme: this.theme });
                    item.checkBoxElement = checkbox[0];
                    var updated = function (event, checked) {
                        var checkItem = event.owner.element.item;
                        if (checkItem != null) {
                            var args = event.args;
                            if (checked) {
                                me.checkIndex(checkItem.index, false);
                            }
                            else if (checked == false) {
                                me.uncheckIndex(checkItem.index, false);
                            }
                            else me.indeterminate(checkItem.index, false);
                        }
                        me.focused = true;
                    }
                    checkbox.jqxCheckBox('updated', updated);
                }

                itemElement.height(item.height);
                itemElement.css('top', top);
                top += item.height;
                this.visualItems[virtualItemIndex] = itemElement;
            };

            this._addHandlers();

            this._updatescrollbars();
            if ($.browser.msie && $.browser.version < 8) {
                this.host.attr('hideFocus', true);
                this.host.find('div').attr('hideFocus', true);
            }
        },

        _updatescrollbars: function () {
            this._arrange();
            var virtualHeight = this.virtualSize.height;
            var virtualWidth = this.virtualSize.width;
            var vScrollInstance = this.vScrollInstance;
            var hScrollInstance = this.hScrollInstance;

            if (virtualHeight > this.host.outerHeight()) {
                var hScrollOffset = 0; //parseInt(this.hScrollBar.height());
                if (virtualWidth > this.host.outerWidth()) {
                    hScrollOffset = this.hScrollBar.outerHeight() + 2;
                }

                vScrollInstance.max = 2 + parseInt(virtualHeight) + hScrollOffset - parseInt(this.host.height());
                this.vScrollBar.css('visibility', 'inherit');
            } else this.vScrollBar.css('visibility', 'hidden');

            if (virtualWidth > this.host.outerWidth()) {
                hScrollInstance.max = parseInt(virtualWidth) - parseInt(this.content.width()) + parseInt(this.hScrollBar.height());
                this.hScrollBar.css('visibility', 'inherit');
            }
            else this.hScrollBar.css('visibility', 'hidden');
            this.hScrollBar.jqxScrollBar('setPosition', 0);
            this._arrange();
            if (this.itemswrapper) {
                this.itemswrapper.width(Math.max(this.host.width(), 17 + virtualWidth));
                this.itemswrapper.height(2 * this.host.height());
            }
        },

        clear: function () {
            this.source = null;
            this.clearSelection();
            this.refresh();
        },

        // clears the selection.
        clearSelection: function (render) {
            for (indx = 0; indx < this.selectedIndexes.length; indx++) {
                this.selectedIndexes[indx] = -1;
            }
            this.selectedIndex = -1;
            if (render != false) {
                this._renderItems();
            }
        },

        // unselects item by index.
        unselectIndex: function (index, render) {
            if (isNaN(index))
                return;

            this.selectedIndexes[index] = -1;
            if (render == undefined || render == true) {
                this._renderItems();
                this._raiseEvent('1', { index: index, type: type });
            }

            this._raiseEvent('2', { index: index, item: this.getItem(index) });
        },

        // gets item's instance.
        getItem: function (index) {
            if (index == -1 || isNaN(index))
                return null;

            var result = null;
            var item = $.each(this.items, function () {
                if (this.index == index) {
                    result = this;
                    return false;
                }
            });

            return result;
        },

        getVisibleItem: function (index) {
            if (index == -1 || isNaN(index))
                return null;

            return this.visibleItems[index];
        },

        // checks a specific item by its index.
        checkIndex: function (index, render) {
            if (!this.checkboxes || !this.host.jqxCheckBox) {
                return;
            }

            if (isNaN(index))
                return;

            if (index < 0 || index >= this.visibleItems.length)
                return;

            if (this.visibleItems[index] != null && this.visibleItems[index].disabled) {
                return;
            }

            if (this.disabled)
                return;

            var item = this.getItem(index);
            if (item != null) {
                var checkbox = $(item.checkBoxElement);
                item.checked = true;
                if (render == undefined || render == true) {
                    this._renderItems();
                }
            }

            this._raiseEvent(3, { label: item.label, value: item.value, checked: true });
        },

        getCheckedItems: function () {
            if (!this.checkboxes || !this.host.jqxCheckBox) {
                return null;
            }

            var checkedItems = new Array();
            $.each(this.items, function () {
                if (this.checked) {
                    checkedItems[checkedItems.length] = this;
                }
            });
            return checkedItems;
        },

        checkAll: function () {
            if (!this.checkboxes || !this.host.jqxCheckBox) {
                return;
            }

            if (this.disabled)
                return;

            $.each(this.items, function () {
                this.checked = true;
            });

            this._renderItems();
            this._raiseEvent(3, { checked: true });
        },

        uncheckAll: function () {
            if (!this.checkboxes || !this.host.jqxCheckBox) {
                return;
            }

            if (this.disabled)
                return;

            $.each(this.items, function () {
                this.checked = false;
            });

            this._renderItems();
            this._raiseEvent(3, { checked: false });
        },

        // unchecks a specific item by its index.
        uncheckIndex: function (index, render) {
            if (!this.checkboxes || !this.host.jqxCheckBox) {
                return;
            }

            if (isNaN(index))
                return;

            if (index < 0 || index >= this.visibleItems.length)
                return;

            if (this.visibleItems[index] != null && this.visibleItems[index].disabled) {
                return;
            }

            if (this.disabled)
                return;

            var item = this.getItem(index);
            if (item != null) {
                var checkbox = $(item.checkBoxElement);
                item.checked = false;
                if (render == undefined || render == true) {
                    this._renderItems();
                }
            }
            this._raiseEvent(3, { label: item.label, value: item.value, checked: false });
        },

        // sets a specific item's checked property to null.
        indeterminateIndex: function (index, render) {
            if (!this.checkboxes || !this.host.jqxCheckBox) {
                return;
            }

            if (isNaN(index))
                return;

            if (index < 0 || index >= this.visibleItems.length)
                return;

            if (this.visibleItems[index] != null && this.visibleItems[index].disabled) {
                return;
            }

            if (this.disabled)
                return;

            var item = this.getItem(index);
            if (item != null) {
                var checkbox = $(item.checkBoxElement);
                item.checked = null;
                if (render == undefined || render == true) {
                    this._renderItems();
                }
            }
            this._raiseEvent(3, { checked: null });
        },

        // gets the selected index.
        getSelectedIndex: function () {
            return this.selectedIndex;
        },

        // gets all selected items.
        getSelectedItems: function () {
            var items = this.getItems();
            var selectedIndexes = this.selectedIndexes;
            var selectedItems = [];
            // get selected items.
            for (var index in selectedIndexes) {
                if (selectedIndexes[index] != -1) {
                    selectedItems[selectedItems.length] = items[index];
                }
            }

            return selectedItems;
        },

        // gets the selected item.
        getSelectedItem: function () {
            return this.getItem(this.selectedIndex);
        },

        // selects an item.
        selectIndex: function (index, ensureVisible, render, forceSelect, type) {
            if (isNaN(index))
                return;

            if (index < -1 || index >= this.visibleItems.length)
                return;

            if (this.visibleItems[index] != null && this.visibleItems[index].disabled) {
                return;
            }

            if (this.disabled)
                return;

            if (!this.multiple && this.selectedIndex == index)
                return;

            this.focused = true;
            var newSelection = false;
            if (this.selectedIndex != index) newSelection = true;
            var oldIndex = this.selectedIndex;
            if (this.selectedIndex == index && !this.multiple) {
                oldIndex = -1;
            }

            if (type == undefined) {
                type = 'none';
            }

            var newItem = this.getItem(index);
            var oldItem = this.getItem(oldIndex);
            if (this.visibleItems && this.visibleItems.length != this.items.length) {
                newItem = this.getVisibleItem(index);
                oldItem = this.getVisibleItem(oldIndex);
            }

            if (forceSelect != undefined && forceSelect) {
                this._raiseEvent('1', { index: oldIndex, type: type, item: oldItem });
                this.selectedIndex = index;
                this.selectedIndexes[oldIndex] = -1;
                this.selectedIndexes[index] = index;
                this._raiseEvent('0', { index: index, type: type, item: newItem });
            }
            else {
                if (this.multiple) {
                    if (this.selectedIndexes[index] == undefined || this.selectedIndexes[index] == -1) {
                        this.selectedIndexes[index] = index;
                        this.selectedIndex = index;
                        this._raiseEvent('0', { index: index, type: type, item: newItem });
                    }
                    else {
                        oldIndex = this.selectedIndexes[index];
                        this.selectedIndexes[index] = -1;
                        this.selectedIndex = -1;
                        this._raiseEvent('1', { index: oldIndex, type: type, item: oldItem });
                    }
                }
                else {
                    this._raiseEvent('1', { index: oldIndex, type: type, item: oldItem });
                    this.selectedIndex = index;
                    this.selectedIndexes[oldIndex] = -1;
                    oldIndex = index;
                    this.selectedIndexes[index] = index;
                    this._raiseEvent('0', { index: index, type: type, item: newItem });
                }
            }

            if (render == undefined || render == true) {
                this._renderItems();
            }

            if (ensureVisible != undefined && ensureVisible != null && ensureVisible == true) {
                this.ensureVisible(index);
            }

            this._raiseEvent('2', { index: index, item: newItem });
            return newSelection;
        },

        // checks whether an item is in the visible view.
        isIndexInView: function (index) {
            if (isNaN(index)) {
                return false;
            }

            if (index < 0 || index >= this.items.length) {
                return false;
            }

            var scrollValue = this.vScrollInstance.value;
            var item = this.visibleItems[this.selectedIndex];
            if (item == undefined)
                return true;

            var itemTop = item.initialTop;
            var itemHeight = item.height;

            if (itemTop - scrollValue < 0 || itemTop - scrollValue + itemHeight >= this.host.outerHeight()) {
                return false;
            }

            return true;
        },

        //[optimize]
        _itemsInPage: function () {
            var itemsCount = 0;
            var me = this;

            $.each(this.items, function () {
                if ((this.initialTop + this.height) >= me.content.height()) {
                    return false;
                }
                itemsCount++;
            });

            return itemsCount;
        },

        _firstItemIndex: function () {
            if (this.visibleItems != null) {
                if (this.visibleItems[0].isGroup) {
                    return this._nextItemIndex(0);
                }
                else return 0;
            }

            return -1;
        },

        _lastItemIndex: function () {
            if (this.visibleItems != null) {
                if (this.visibleItems[this.visibleItems.length - 1].isGroup) {
                    return this._prevItemIndex(this.visibleItems.length - 1);
                }
                else return this.visibleItems.length - 1;
            }

            return -1;
        },

        _nextItemIndex: function (index) {
            for (indx = index + 1; indx < this.visibleItems.length; indx++) {
                if (this.visibleItems[indx]) {
                    if (!this.visibleItems[indx].disabled && !this.visibleItems[indx].isGroup) {
                        return indx;
                    }
                }
            }

            return -1;
        },

        _prevItemIndex: function (index) {
            for (indx = index - 1; indx >= 0; indx--) {
                if (this.visibleItems[indx]) {
                    if (!this.visibleItems[indx].disabled && !this.visibleItems[indx].isGroup) {
                        return indx;
                    }
                }
            }

            return -1;
        },

        // get all matches of a searched value.
        _getMatches: function (value, startindex) {
            if (value == undefined || value.length == 0)
                return -1;

            if (startindex == undefined) startindex = 0;

            var items = this.getItems();
            var me = this;
            var index = -1;
            var newItemsIndex = 0;

            $.each(items, function (i) {
                var itemValue = '';
                if (!this.isGroup) {
                    if (this.label) {
                        itemValue = this.label;
                    }
                    else if (this.value) {
                        itemValue = this.value;
                    }
                    else if (this.title) {
                        itemValue = this.title;
                    }
                    else itemValue = 'jqxItem';

                    var mathes = false;
                    switch (me.searchMode) {
                        case 'containsignorecase':
                            mathes = $.jqx.string.containsIgnoreCase(itemValue, value);
                            break;
                        case 'contains':
                            mathes = $.jqx.string.contains(itemValue, value);
                            break;
                        case 'equals':
                            mathes = $.jqx.string.equals(itemValue, value);
                            break;
                        case 'equalsignorecase':
                            mathes = $.jqx.string.equalsIgnoreCase(itemValue, value);
                            break;
                        case 'startswith':
                            mathes = $.jqx.string.startsWith(itemValue, value);
                            break;
                        case 'startswithignorecase':
                            mathes = $.jqx.string.startsWithIgnoreCase(itemValue, value);
                            break;
                        case 'endswith':
                            mathes = $.jqx.string.endsWith(itemValue, value);
                            break;
                        case 'endswithignorecase':
                            mathes = $.jqx.string.endsWithIgnoreCase(itemValue, value);
                            break;
                    }

                    if (mathes && this.visibleIndex >= startindex) {
                        index = this.visibleIndex;
                        return false;
                    }
                }
            });

            return index;
        },

        // gets all items that match to a search value.
        findItems: function (value) {
            var items = this.getItems();
            var me = this;
            var index = 0;
            var matchItems = new Array();

            $.each(items, function (i) {
                var itemValue = '';
                if (!this.isGroup) {
                    if (this.label) {
                        itemValue = this.label;
                    }
                    else if (this.value) {
                        itemValue = this.value;
                    }
                    else if (this.title) {
                        itemValue = this.title;
                    }
                    else itemValue = 'jqxItem';

                    var mathes = false;
                    switch (me.searchMode) {
                        case 'containsignorecase':
                            mathes = $.jqx.string.containsIgnoreCase(itemValue, value);
                            break;
                        case 'contains':
                            mathes = $.jqx.string.contains(itemValue, value);
                            break;
                        case 'equals':
                            mathes = $.jqx.string.equals(itemValue, value);
                            break;
                        case 'equalsignorecase':
                            mathes = $.jqx.string.equalsIgnoreCase(itemValue, value);
                            break;
                        case 'startswith':
                            mathes = $.jqx.string.startsWith(itemValue, value);
                            break;
                        case 'startswithignorecase':
                            mathes = $.jqx.string.startsWithIgnoreCase(itemValue, value);
                            break;
                        case 'endswith':
                            mathes = $.jqx.string.endsWith(itemValue, value);
                            break;
                        case 'endswithignorecase':
                            mathes = $.jqx.string.endsWithIgnoreCase(itemValue, value);
                            break;
                    }

                    if (mathes) {
                        matchItems[index++] = this;
                    }
                }
            });

            return matchItems;
        },

        _handleKeyDown: function (event) {
            var key = event.keyCode;
            var self = this;
            var index = self.selectedIndex;
            var selectedIndex = self.selectedIndex;
            var newSelection = false;

            if (!this.keyboardNavigation)
                return;

            if (event.altKey) key = -1;
            if (self.incrementalSearch) {
                var matchindex = -1;
                if (!self._searchString) {
                    self._searchString = "";
                }

                if ((key == 8 || key == 46) && self._searchString.length >= 1) {
                    self._searchString = self._searchString.substr(0, self._searchString.length - 1);
                }

                var letter = String.fromCharCode(key);

                var isDigit = (!isNaN(parseInt(letter)));
                if ((key >= 65 && key <= 97) || isDigit || key == 8 || key == 32 || key == 46) {
                    if (!event.shiftKey) {
                        letter = letter.toLocaleLowerCase();
                    }

                    var startIndex = 1 + self.selectedIndex;
                    if (key != 8 && key != 32 && key != 46) {
                        if (self._searchString.length > 0 && self._searchString.substr(0, 1) == letter) {
                            startIndex = 1 + self.selectedIndex;
                        }
                        else {
                            self._searchString += letter;
                        }
                    }

                    if (key == 32) {
                        self._searchString += " ";
                    }

                    var matches = this._getMatches(self._searchString, startIndex);
                    matchindex = matches;
                    if (matchindex == self._lastMatchIndex || matchindex == -1) {
                        var matches = this._getMatches(self._searchString, 0);
                        matchindex = matches;
                    }
                    self._lastMatchIndex = matchindex;

                    if (matchindex >= 0) {
                        if (self.multiple) {
                            self.clearSelection(false);
                        }
                        self.selectIndex(matchindex, false, false, false, 'keyboard');
                        var isInView = self.isIndexInView(matchindex);
                        if (!isInView) {
                            self.ensureVisible(matchindex);
                        }
                        else {
                            self._renderItems();
                        }
                    }
                }

                if (self._searchTimer != undefined) {
                    clearTimeout(self._searchTimer);
                }

                if (key == 27 || key == 13) {
                    self._searchString = "";
                }

                self._searchTimer = setTimeout(function () {
                    self._searchString = "";
                }, self.incrementalSearchDelay);
                if (matchindex >= 0) {
                    return;
                }
            }

            if (key == 33) {
                var itemsInPage = self._itemsInPage();
                if (self.selectedIndex - itemsInPage >= 0) {
                    if (self.multiple) {
                        self.clearSelection(false);
                    }
                    self.selectIndex(selectedIndex - itemsInPage, false, false, false, 'keyboard');
                }
                else {
                    if (self.multiple) {
                        self.clearSelection(false);
                    }
                    self.selectIndex(self._firstItemIndex(), false, false, false, 'keyboard');
                }
                self._searchString = "";
            }

            if (key == 32 && this.checkboxes) {
                var checkItem = this.getItem(index);
                if (checkItem != null) {
                    if (checkItem.checked == true) {
                        checkItem.checked = this.hasThreeStates ? null : false;
                    }
                    else {
                        checkItem.checked = checkItem.checked != null;
                    }

                    switch (checkItem.checked) {
                        case true:
                            this.checkIndex(index);
                            break;
                        case false:
                            this.uncheckIndex(index);
                            break;
                        default:
                            this.indeterminateIndex(index);
                            break;
                    }

                    event.preventDefault();
                }
                self._searchString = "";
            }

            if (key == 36) {
                if (self.multiple) {
                    self.clearSelection(false);
                }
                self.selectIndex(self._firstItemIndex(), false, false, false, 'keyboard');
                self._searchString = "";
            }

            if (key == 35) {
                if (self.multiple) {
                    self.clearSelection(false);
                }
                self.selectIndex(self._lastItemIndex(), false, false, false, 'keyboard');
                self._searchString = "";
            }

            if (key == 34) {
                var itemsInPage = self._itemsInPage();
                if (self.selectedIndex + itemsInPage < self.visibleItems.length) {
                    if (self.multiple) {
                        self.clearSelection(false);
                    }
                    self.selectIndex(selectedIndex + itemsInPage, false, false, false, 'keyboard');
                }
                else {
                    if (self.multiple) {
                        self.clearSelection(false);
                    }
                    self.selectIndex(self._lastItemIndex(), false, false, false, 'keyboard');
                }
                self._searchString = "";
            }

            if (key == 38) {
                self._searchString = "";
                if (self.selectedIndex > 0) {
                    var newIndex = self._prevItemIndex(self.selectedIndex);
                    if (newIndex != self.selectedIndex && newIndex != -1) {
                        if (self.multiple) {
                            self.clearSelection(false);
                        }
                        self.selectIndex(newIndex, false, false, false, 'keyboard');
                    }
                    else return true;
                }
                else return false;
            }
            else if (key == 40) {
                self._searchString = "";
                if (self.selectedIndex + 1 < self.visibleItems.length) {
                    var newIndex = self._nextItemIndex(self.selectedIndex);
                    if (newIndex != self.selectedIndex && newIndex != -1) {
                        if (self.multiple) {
                            self.clearSelection(false);
                        }
                        self.selectIndex(newIndex, false, false, false, 'keyboard');
                    }
                    else return true;
                }
                else return false;
            }

            if (key == 35 || key == 36 || key == 38 || key == 40 || key == 34 || key == 33) {
                var isInView = self.isIndexInView(self.selectedIndex);
                if (!isInView) {
                    self.ensureVisible(self.selectedIndex);
                }
                else {
                    self._renderItems();
                }

                return false;
            }

            return true;
        },

        // performs mouse wheel.
        wheel: function (event, self) {
            if (self.autoHeight || !self.enableMouseWheel) {
                event.returnValue = true;
                return true;
            }

            var delta = 0;
            if (!event) /* For IE. */
                event = window.event;

            if (event.originalEvent && event.originalEvent.wheelDelta) {
                event.wheelDelta = event.originalEvent.wheelDelta;
            }

            if (event.wheelDelta) { /* IE/Opera. */
                delta = event.wheelDelta / 120;
            } else if (event.detail) { /** Mozilla case. */
                delta = -event.detail / 3;
            }

            if (delta) {
                var result = self._handleDelta(delta);
                if (result) {
                    if (event.preventDefault)
                        event.preventDefault();

                    if (event.originalEvent != null) {
                        event.originalEvent.mouseHandled = true;
                    }

                    if (event.stopPropagation != undefined) {
                        event.stopPropagation();
                    }
                }

                if (result) {
                    result = false;
                    event.returnValue = result;
                    return result;
                }
                else {
                    return false;
                }
            }

            if (event.preventDefault)
                event.preventDefault();
            event.returnValue = false;
        },

        _handleDelta: function (delta) {
            var oldvalue = this.vScrollInstance.value;
            if (delta < 0) {
                this.scrollDown();
            }
            else this.scrollUp();
            var newvalue = this.vScrollInstance.value;
            if (oldvalue != newvalue) {
                return true;
            }

            return false;
        },

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

        _removeHandlers: function () {
            var self = this;
            this.removeHandler(this.vScrollBar, 'valuechanged');
            this.removeHandler(this.hScrollBar, 'valuechanged');
            this.removeHandler(this.host, 'mousewheel');
            this.removeHandler(this.host, 'keydown');
            this.removeHandler(this.content, 'mouseleave');
            this.removeHandler(this.content, 'focus');
            this.removeHandler(this.content, 'blur');
            this.removeHandler(this.content, 'mouseenter');
            this.removeHandler(this.content, 'mouseup');
            this.removeHandler(this.content, 'mousedown');
            this.removeHandler(this.content, 'touchend');
            this.removeHandler(this.content, 'mousemove');
            if ($.browser.msie) {
                this.removeHandler(this.content, 'selectstart');
            }
        },

        _addHandlers: function () {
            var self = this;
            this.focused = false;
            var animating = false;
            var prevValue = 0;
            var object = null;
            var prevValue = 0;
            var newValue = 0;
            var lastScroll = new Date();
            var isTouchDevice = this.isTouchDevice();

            if ((this.width != null && this.width.toString().indexOf("%") != -1) ||
            (this.height != null && this.height.toString().indexOf("%") != -1)) {
                this.autoUpdateId = setInterval(function () {
                    if (self.host.height() != self._oldheight || self.host.width() != self._oldwidth) {
                        self._oldwidth = self.host.width();
                        self._oldheight = self.host.height();

                        if (self.items) {
                            if (self.items.length > 0 && self.virtualItemsCount * self.items[0].height < self._oldheight) {
                                self._render(false);
                            }
                            else {
                                self._updatescrollbars();
                                self._renderItems();
                            }
                        }
                    }

                }, 100);
            }

            this.addHandler(this.vScrollBar, 'valuechanged', function (event) {
                //                if (isTouchDevice) {
                //                    prevValue = event.previousValue;
                //                    if (newValue == event.currentValue)
                //                        return;

                //                    newValue = event.currentValue;
                //                    if (self._vAnimation) self._vAnimation.stop();
                //                    self._vAnimation = $({ count: prevValue }).animate({ count: newValue }, {
                //                        duration: 200,
                //                        easing: 'easeInOutCirc',
                //                        step: function () {
                //                            self.vScrollInstance.value = this.count;
                //                            self._renderItems();
                //                            animating = true;
                //                        },
                //                        complete: function () {
                //                            animating = false;
                //                        }
                //                    });
                //                }
                //                else self._renderItems();
                self._renderItems();
            });

            this.addHandler(this.hScrollBar, 'valuechanged', function () {
                self._renderItems();
            });

            this.addHandler(this.host, 'mousewheel', function (event) {
                self.wheel(event, self);
            });

            this.addHandler(this.host, 'keydown', function (event) {
                if (self.focused) {
                    return self._handleKeyDown(event);
                }
            });

            this.addHandler(this.content, 'mouseleave', function (event) {
                self.focused = false;
                var hoveredItem = $.data(self.element, 'hoveredItem');
                if (hoveredItem != null) {
                    $(hoveredItem).removeClass(self.toThemeProperty('jqx-listitem-state-hover'));
                    $(hoveredItem).removeClass(self.toThemeProperty('jqx-fill-state-hover'));
                }
            });

            this.addHandler(this.content, 'focus', function (event) {
                self.focused = true;
            });

            this.addHandler(this.content, 'blur', function (event) {
                self.focused = false;
            });

            this.addHandler(this.content, 'mouseenter', function (event) {
                self.focused = true;
            });

            if (this.enableSelection) {
                var isTouch = self.isTouchDevice();
                var eventName = !isTouch ? 'mousedown' : 'touchend';

                if (this.overlayContent) {
                    this.addHandler(this.overlayContent, 'touchend', function (event) {
                        if (isTouch) {
                            self._newScroll = new Date();
                            if (self._newScroll - self._lastScroll < 500) {
                                return false;
                            }
                        }

                        var touches = self.getTouches(event);
                        var touch = touches[0];
                        var selfOffset = self.host.offset();
                        var left = parseInt(touch.pageX);
                        var top = parseInt(touch.pageY);
                        if (self.touchmode == true) {
                            left = parseInt(touch._pageX);
                            top = parseInt(touch._pageY);
                        }
                        left = left - selfOffset.left;
                        top = top - selfOffset.top;
                        var item = self._hitTest(left, top);
                        if (item != null && !item.isGroup) {
                            if (item.html.indexOf('href') != -1) {
                                setTimeout(function () {
                                    self.selectIndex(item.visibleIndex, false, true, false, 'mouse');
                                }, 100);
                            }
                            else {
                                self.selectIndex(item.visibleIndex, false, true, false, 'mouse');
                            }
                        }
                    });
                }

                this.addHandler(this.content, eventName, function (event) {
                    if (isTouch) {
                        self._newScroll = new Date();
                        if (self._newScroll - self._lastScroll < 500) {
                            return false;
                        }
                    }

                    self.focused = true;
                    if (!self.isTouchDevice()) {
                        self.content.focus();
                    }
                    if (event.target.id != 'listBoxContent' && self.itemswrapper[0] != event.target) {
                        var target = event.target;
                        var targetOffset = $(target).offset();
                        var selfOffset = self.host.offset();
                        var y = parseInt(targetOffset.top) - parseInt(selfOffset.top);
                        var x = parseInt(targetOffset.left) - parseInt(selfOffset.left);
                        var item = self._hitTest(x, y);
                        if (item != null && !item.isGroup) {
                            if (item.html.indexOf('href') != -1) {
                                setTimeout(function () {
                                    self.selectIndex(item.visibleIndex, false, true, false, 'mouse');
                                }, 100);
                            }
                            else {
                                self.selectIndex(item.visibleIndex, false, true, false, 'mouse');
                            }
                        }
                        if (eventName == 'mousedown') {
                            return false;
                        }
                    }

                    return true;
                });

                this.addHandler(this.content, 'mouseup', function (event) {
                    self.vScrollInstance.handlemouseup(self, event);
                });

                if ($.browser.msie) {
                    this.addHandler(this.content, 'selectstart', function (event) {
                        return false;
                    });
                }
            }
            // hover behavior.
            var isTouchDevice = this.isTouchDevice();
            if (this.enableHover && !isTouchDevice) {
                this.addHandler(this.content, 'mousemove', function (event) {
                    if (isTouchDevice)
                        return true;

                    if (!self.enableHover)
                        return true;

                    var which = $.browser.msie == true && $.browser.version < 9 ? 0 : 1;
                    if (event.target == null)
                        return true;

                    if (self.disabled)
                        return true;

                    self.focused = true;
                    var scrolling = self.vScrollInstance.isScrolling();
                    if (!scrolling && event.target.id != 'listBoxContent') {
                        if (self.itemswrapper[0] != event.target) {
                            var target = event.target;
                            var targetOffset = $(target).offset();
                            var selfOffset = self.host.offset();
                            var y = parseInt(targetOffset.top) - parseInt(selfOffset.top);
                            var x = parseInt(targetOffset.left) - parseInt(selfOffset.left);
                            var item = self._hitTest(x, y);
                            if (item != null && !item.isGroup && !item.disabled) {
                                var selectedElement = $.data(self.element, 'hoveredItem');
                                if (selectedElement != null) {
                                    $(selectedElement).removeClass(self.toThemeProperty('jqx-listitem-state-hover'));
                                    $(selectedElement).removeClass(self.toThemeProperty('jqx-fill-state-hover'));
                                }

                                $.data(self.element, 'hoveredItem', item.element);
                                var $element = $(item.element);
                                $element.addClass(self.toThemeProperty('jqx-listitem-state-hover'));
                                $element.addClass(self.toThemeProperty('jqx-fill-state-hover'));
                            }
                        }
                    }
                });
            }
        },

        //[optimize]
        _arrange: function () {
            var width = null;
            var height = null;
            var me = this;
            var _setHostHeight = function (height) {
                height = me.host.height();
                if (height == 0) {
                    height = 200;
                    me.host.height(height);
                }
                return height;
            }

            if (this.width != null && this.width.toString().indexOf("px") != -1) {
                width = this.width;
            }
            else
                if (this.width != undefined && !isNaN(this.width)) {
                    width = this.width;
                };

            if (this.height != null && this.height.toString().indexOf("px") != -1) {
                height = this.height;
            }
            else if (this.height != undefined && !isNaN(this.height)) {
                height = this.height;
            };

            if (this.width != null && this.width.toString().indexOf("%") != -1) {
                this.host.width(this.width);
                width = this.host.width();
            }
            if (this.height != null && this.height.toString().indexOf("%") != -1) {
                this.host.height(this.height);
                height = _setHostHeight(height);
            }

            var hostBorderSize = this.host.css('border-width');
            if (hostBorderSize == null) {
                hostBorderSize = 0;
            }

            if (width != null) {
                width = parseInt(width);
                this.host.width(this.width);
            }

            if (!this.autoHeight) {
                if (height != null) {
                    height = parseInt(height);
                    this.host.height(this.height);
                    _setHostHeight(height);
                }
            }
            else {
                if (this.virtualSize) {
                    this.host.height(this.virtualSize.height);
                    this.height = this.virtualSize.height;
                }
            }

            // scrollbar Size.
            var scrollSize = this.scrollBarSize;
            if (isNaN(scrollSize)) {
                scrollSize = parseInt(scrollSize);
                if (isNaN(scrollSize)) {
                    scrollSize = '17px';
                }
                else scrollSize = scrollSize + 'px';
            }

            scrollSize = parseInt(scrollSize);
            var scrollOffset = 4;
            var bottomSizeOffset = 2;
            var rightSizeOffset = 0;
            // right scroll offset. 
            if (this.vScrollBar) {
                if (this.vScrollBar.css('visibility') != 'hidden') {
                    rightSizeOffset = scrollSize + scrollOffset;
                }
                else {
                    this.vScrollBar.jqxScrollBar('setPosition', 0);
                }
            }
            else return;

            if (this.hScrollBar) {
                // bottom scroll offset.
                if (this.hScrollBar.css('visibility') != 'hidden') {
                    bottomSizeOffset = scrollSize + scrollOffset;
                }
                else {
                    this.hScrollBar.jqxScrollBar('setPosition', 0);
                }
            }
            else return;

            var hScrollTop = parseInt(height) - scrollOffset - scrollSize;
            if (hScrollTop < 0) hScrollTop = 0;

            this.hScrollBar.height(scrollSize);
            this.hScrollBar.css({ top: hScrollTop + 'px', left: '0px' });
            this.hScrollBar.width(width - scrollSize - scrollOffset + 'px');

            if (rightSizeOffset == 0) {
                this.hScrollBar.width(width - 2);
            }

            this.vScrollBar.width(scrollSize);
            this.vScrollBar.height(parseInt(height) - bottomSizeOffset + 'px');
            this.vScrollBar.css({ left: parseInt(width) - parseInt(scrollSize) - scrollOffset + 'px', top: '0px' });
            var vScrollInstance = this.vScrollInstance;
            vScrollInstance.disabled = this.disabled;
            vScrollInstance._arrange();

            var hScrollInstance = this.hScrollInstance;
            hScrollInstance.disabled = this.disabled;
            hScrollInstance._arrange();

            if ((this.vScrollBar.css('visibility') != 'hidden') && (this.hScrollBar.css('visibility') != 'hidden')) {
                this.bottomRight.css('visibility', 'inherit');
                this.bottomRight.css({ left: 1 + parseInt(this.vScrollBar.css('left')), top: 1 + parseInt(this.hScrollBar.css('top')) });
                this.bottomRight.width(parseInt(scrollSize) + 3);
                this.bottomRight.height(parseInt(scrollSize) + 3);
            }
            else this.bottomRight.css('visibility', 'hidden');

            this.content.width(parseInt(width) - rightSizeOffset);
            this.content.height(parseInt(height) - bottomSizeOffset);
            if (this.overlayContent) {
                this.overlayContent.width(parseInt(width) - rightSizeOffset);
                this.overlayContent.height(parseInt(height) - bottomSizeOffset);
            }
        },

        // scrolls to a list box item.
        ensureVisible: function (index) {
            var isInView = this.isIndexInView(index);
            if (!isInView) {
                if (index < 0)
                    return;
                if (this.autoHeight) {
                    var vScrollInstance = $.data(this.vScrollBar[0], 'jqxScrollBar').instance;
                    vScrollInstance.setPosition(0);
                }
                else {
                    for (indx = 0; indx < this.visibleItems.length; indx++) {
                        var item = this.visibleItems[indx];
                        if (item.visibleIndex == index && !item.isGroup) {
                            var vScrollInstance = $.data(this.vScrollBar[0], 'jqxScrollBar').instance;
                            vScrollInstance.setPosition(item.initialTop);
                            break;
                        }
                    }
                }
            }

            this._renderItems();
        },

        // scrolls down.
        scrollDown: function () {
            if (this.vScrollBar.css('visibility') == 'hidden')
                return false;

            var vScrollInstance = this.vScrollInstance;
            if (vScrollInstance.value + vScrollInstance.largestep <= vScrollInstance.max) {
                vScrollInstance.setPosition(vScrollInstance.value + vScrollInstance.largestep);
                return true;
            }
            else {
                vScrollInstance.setPosition(vScrollInstance.max);
                return true;
            }

            return false;
        },

        // scrolls up.
        scrollUp: function () {
            if (this.vScrollBar.css('visibility') == 'hidden')
                return false;

            var vScrollInstance = this.vScrollInstance;
            if (vScrollInstance.value - vScrollInstance.largestep >= vScrollInstance.min) {
                vScrollInstance.setPosition(vScrollInstance.value - vScrollInstance.largestep);
                return true;
            }
            else {
                if (vScrollInstance.value != vScrollInstance.min) {
                    vScrollInstance.setPosition(vScrollInstance.min);
                    return true;
                }
            }
            return false;
        },

        databind: function (source) {
            this.records = new Array();
            var isdataadapter = source._source ? true : false;
            var dataadapter = new $.jqx.dataAdapter(source,
                {
                    autoBind: false
                }
            );

            if (isdataadapter) {
                dataadapter = source;
                source = source._source;
            }

            var initadapter = function (me) {
                if (source.type != undefined) {
                    dataadapter._options.type = source.type;
                }
                if (source.formatdata != undefined) {
                    dataadapter._options.formatData = source.formatdata;
                }
                if (source.contenttype != undefined) {
                    dataadapter._options.contentType = source.contenttype;
                }
                if (source.async != undefined) {
                    dataadapter._options.async = source.async;
                }
            }

            var updatefromadapter = function (me) {
                me.records = dataadapter.records;
                var recordslength = me.records.length;
                me.items = new Array();
                for (i = 0; i < recordslength; i++) {
                    var record = me.records[i];
                    var value = record[me.valueMember];
                    var label = record[me.displayMember];
                    var listBoxItem = new $.jqx._jqxListBox.item();
                    listBoxItem.label = label;
                    listBoxItem.value = value;
                    listBoxItem.html = "";
                    listBoxItem.visible = true;
                    listBoxItem.originalItem = record;
                    listBoxItem.index = i;
                    listBoxItem.group = '';
                    listBoxItem.groupHtml = '';
                    listBoxItem.disabled = false;

                    me.items[i] = listBoxItem;
                }
                me._render();
                if (me.rendered) {
                    me.rendered();
                }
            }

            initadapter(this);

            var me = this;
            switch (source.datatype) {
                case "local":
                case "array":
                default:
                    if (source.localdata != null) {
                        dataadapter.dataBind();
                        updatefromadapter(this);
                        dataadapter.unbindBindingUpdate(this.element.id);
                        dataadapter.bindBindingUpdate(this.element.id, function () {
                            updatefromadapter(me);
                        });
                    }
                    break;
                case "json":
                case "jsonp":
                case "xml":
                case "xhtml":
                case "script":
                case "text":
                case "csv":
                case "tab":
                    {
                        if (source.localdata != null) {
                            dataadapter.dataBind();
                            updatefromadapter(this);
                            dataadapter.unbindBindingUpdate(this.element.id);
                            dataadapter.bindBindingUpdate(this.element.id, function () {
                                updatefromadapter(me);
                            });
                            return;
                        }

                        var postdata = {};
                        if (dataadapter._options.data) {
                            $.extend(dataadapter._options.data, postdata);
                        }
                        else {
                            if (source.data) {
                                $.extend(postdata, source.data);
                            }
                            dataadapter._options.data = postdata;
                        }
                        var updateFunc = function () {
                            updatefromadapter(me);
                        }

                        dataadapter.unbindDownloadComplete(me.element.id);
                        dataadapter.bindDownloadComplete(me.element.id, updateFunc);

                        dataadapter.dataBind();
                    }
            }
        },

        loadItems: function (items) {
            if (items == null) {
                this.groups = new Array();
                this.items = new Array();
                this.visualItems = new Array();
                return;
            }

            var self = this;
            var index = 0;
            var length = 0;
            var itemIndex = 0;
            this.groups = new Array();
            this.items = new Array();
            this.visualItems = new Array();
            var listItems = new Array();

            $.map(items, function (item) {
                if (item == undefined)
                    return null;

                var listBoxItem = new $.jqx._jqxListBox.item();
                var group = item.group;
                var groupHtml = item.groupHtml;
                var title = item.title;

                if (title == null || title == undefined) {
                    title = '';
                }

                if (group == null || group == undefined) {
                    group = '';
                }

                if (groupHtml == null || groupHtml == undefined) {
                    groupHtml = '';
                }

                if (!self.groups[group]) {
                    self.groups[group] = { items: new Array(), index: -1, caption: group, captionHtml: groupHtml };
                    index++;

                    var groupID = index + 'jqxGroup';
                    self.groups[groupID] = self.groups[group];
                    length++;
                }

                var uniqueGroup = self.groups[group];
                uniqueGroup.index++;
                uniqueGroup.items[uniqueGroup.index] = listBoxItem;

                if (typeof item === "string") {
                    listBoxItem.label = item;
                    listBoxItem.value = item;
                }
                else if (item.label == null && item.value == null && item.html == null && item.group == null && item.groupHtml == null) {
                    listBoxItem.label = item.toString();
                    listBoxItem.value = item.toString();
                }
                else {
                    listBoxItem.label = item.label || item.value;
                    listBoxItem.value = item.value || item.label;
                }

                if (typeof item != "string") {
                    if (self.displayMember != "") {
                        listBoxItem.label = item[self.displayMember];
                    }

                    if (self.valueMember != "") {
                        listBoxItem.value = item[self.valueMember];
                    }
                }

                listBoxItem.originalItem = item;
                listBoxItem.title = title;
                listBoxItem.html = item.html || '';
                listBoxItem.group = group;
                listBoxItem.checked = item.checked || false;
                listBoxItem.groupHtml = item.groupHtml || '';
                listBoxItem.disabled = item.disabled || false;
                listBoxItem.visible = item.visible || true;
                listBoxItem.index = itemIndex;
                listItems[itemIndex] = listBoxItem;
                itemIndex++;
                return listBoxItem;
            });

            var itemsArray = new Array();
            var uniqueItemIndex = 0;

            if (this.fromSelect == undefined || this.fromSelect == false) {
                for (indx = 0; indx < length; indx++) {
                    var index = indx + 1;
                    var groupID = index + 'jqxGroup';
                    var group = this.groups[groupID];
                    if (group == undefined || group == null)
                        break;

                    if (indx == 0 && group.caption == '' && group.captionHtml == '' && length <= 1) {
                        return group.items;
                    }
                    else {
                        var listBoxItem = new $.jqx._jqxListBox.item();
                        listBoxItem.isGroup = true;
                        listBoxItem.label = group.caption;
                        if (group.caption == '' && group.captionHtml == '') {
                            group.caption = this.emptyGroupText;
                            listBoxItem.label = group.caption;
                        }

                        listBoxItem.html = group.captionHtml;
                        itemsArray[uniqueItemIndex] = listBoxItem;
                        uniqueItemIndex++;
                    }

                    for (j = 0; j < group.items.length; j++) {
                        itemsArray[uniqueItemIndex] = group.items[j];
                        uniqueItemIndex++;
                    }
                }
            }
            else {
                var uniqueItemIndex = 0;
                var checkedGroups = new Array();

                $.each(listItems, function () {
                    if (!checkedGroups[this.group]) {
                        if (this.group != '') {
                            var listBoxItem = new $.jqx._jqxListBox.item();
                            listBoxItem.isGroup = true;
                            listBoxItem.label = this.group;
                            itemsArray[uniqueItemIndex] = listBoxItem;
                            uniqueItemIndex++;
                            checkedGroups[this.group] = true;
                        }
                    }

                    itemsArray[uniqueItemIndex] = this;
                    uniqueItemIndex++;
                });
            }

            return itemsArray;
        },

        _mapItem: function (item) {
            var listBoxItem = new $.jqx._jqxListBox.item();
            if (typeof item === "string") {
                listBoxItem.label = item;
                listBoxItem.value = item;
            }
            else if (typeof item === 'number') {
                listBoxItem.label = item.toString();
                listBoxItem.value = item.toString();
            }
            else {
                listBoxItem.label = item.label || item.value;
                listBoxItem.value = item.value || item.label;
            }
            if (!listBoxItem.label && !listBoxItem.value && !item.html) {
                listBoxItem.label = listBoxItem.value = item;
            }

            listBoxItem.html = item.html || '';
            listBoxItem.group = item.group || '';
            listBoxItem.title = item.title || '';
            listBoxItem.groupHtml = item.groupHtml || '';
            listBoxItem.disabled = item.disabled || false;
            listBoxItem.visible = item.visible || true;
            return listBoxItem;
        },

        // adds a new item.
        addItem: function (item) {
            if (this.items == undefined || this.items.length == 0) {
                this.source = new Array();
                this.source[0] = item;
                this.refresh();
                return;
            }

            return this.insertAt(item, this.items.length);
        },

        // inserts an item at a specific position.
        insertAt: function (item, index) {
            if (item == null)
                return false;

            if (this.items == undefined || this.items.length == 0) {
                this.source = new Array();
                this.source[0] = item;
                this.refresh();
                return false;
            }

            var listBoxItem = this._mapItem(item);
            if (index == -1 || index == undefined || index == null || index >= this.items.length) {
                listBoxItem.index = this.items.length;
                this.items[this.items.length] = listBoxItem;
            }
            else {
                var itemsArray = new Array();
                var currentItemIndex = 0;
                var inserted = false;
                var visualItemIndex = 0;
                for (var itemIndex = 0; itemIndex < this.items.length; itemIndex++) {
                    if (this.items[itemIndex].isGroup == false) {
                        if (visualItemIndex >= index && !inserted) {
                            itemsArray[currentItemIndex++] = listBoxItem;
                            listBoxItem.index = index;
                            visualItemIndex++;
                            inserted = true;
                        }
                    }

                    itemsArray[currentItemIndex] = this.items[itemIndex];
                    if (!this.items[itemIndex].isGroup) {
                        itemsArray[currentItemIndex].index = visualItemIndex;
                        visualItemIndex++;
                    }
                    currentItemIndex++;
                }

                this.items = itemsArray;
            }

            this.visibleItems = new Array();
            this.renderedVisibleItems = new Array();
            var vScrollInstance = $.data(this.vScrollBar[0], 'jqxScrollBar').instance;
            var value = vScrollInstance.value;
            vScrollInstance.setPosition(0);
            this._addItems();
            this._renderItems();
            if (this.allowDrag && this._enableDragDrop) {
                this._enableDragDrop();
            }
            vScrollInstance.setPosition(value);
            return true;
        },

        // removes an item from a specific position.
        removeAt: function (index) {
            if (index < 0 || index > this.items.length - 1)
                return false;

            var itemHeight = this.items[index].height;
            this.items.splice(index, 1);
            var itemsArray = new Array();
            var currentItemIndex = 0;
            var inserted = false;
            var visualItemIndex = 0;
            for (var itemIndex = 0; itemIndex < this.items.length; itemIndex++) {
                itemsArray[currentItemIndex] = this.items[itemIndex];
                if (!this.items[itemIndex].isGroup) {
                    itemsArray[currentItemIndex].index = visualItemIndex;
                    visualItemIndex++;
                }
                currentItemIndex++;
            }

            this.items = itemsArray;

            var vScrollInstance = $.data(this.vScrollBar[0], 'jqxScrollBar').instance;
            var vScrollInstance = $.data(this.vScrollBar[0], 'jqxScrollBar').instance;
            var value = vScrollInstance.value;
            vScrollInstance.setPosition(0);

            this.visibleItems = new Array();
            this.renderedVisibleItems = new Array();
            if (this.items.length > 0) {
                if (this.virtualSize) {
                    this.virtualSize.height -= itemHeight;
                    var virtualItemsCount = this.virtualSize.itemsPerPage * 2;
                    if (this.autoHeight) {
                        virtualItemsCount = this.items.length;
                    }

                    this.virtualItemsCount = Math.min(virtualItemsCount, this.items.length);
                }

                this._updatescrollbars();
            }
            else {
                this._addItems();
            }
            this._renderItems();
            if (this.allowDrag && this._enableDragDrop) {
                this._enableDragDrop();
            }
            if (this.vScrollBar.css('visibility') != 'hidden') {
                vScrollInstance.setPosition(value);
            }
            else {
                vScrollInstance.setPosition(0);
            }

            return true;
        },

        removeItem: function (item) {
            this.removeAt(item.index);
        },

        // gets all items.
        getItems: function () {
            return this.items;
        },

        // disables an item at position.
        disableAt: function (index) {
            if (!this.items)
                return false;

            if (index < 0 || index > this.items.length - 1)
                return false;

            this.items[index].disabled = true;
            this._renderItems();
            return true;
        },

        // enables an item at position.
        enableAt: function (index) {
            if (!this.items)
                return false;

            if (index < 0 || index > this.items.length - 1)
                return false;

            this.items[index].disabled = false;
            this._renderItems();
            return true;
        },

        destroy: function () {
            this._removeHandlers();
            this.vScrollBar.jqxScrollBar('destroy');
            this.hScrollBar.jqxScrollBar('destroy');
            this.vScrollBar.remove();
            this.hScrollBar.remove();
            this.host
			.removeClass("jqx-listbox jqx-rc-all");
            this.host.remove();
        },

        _raiseEvent: function (id, arg) {
            if (arg == undefined)
                arg = { owner: null };

            var evt = this.events[id];
            args = arg;
            args.owner = this;

            var event = new jQuery.Event(evt);
            event.owner = this;
            event.args = args;
            if (this.host != null) {
                var result = this.host.trigger(event);
            }
            return result;
        }
    })
})(jQuery);

(function ($) {
    $.jqx._jqxListBox.item = function () {
        var result =
        {
            group: '',
            groupHtml: '',
            selected: false,
            isGroup: false,
            highlighted: false,
            value: null,
            label: '',
            html: null,
            visible: true,
            disabled: false,
            element: null,
            width: null,
            height: null,
            initialTop: null,
            top: null,
            left: null,
            title: '',
            index: -1,
            checkBoxElement: null,
            originalItem: null,
            checked: false,
            visibleIndex: -1
        }
        return result;
    }
})(jQuery);