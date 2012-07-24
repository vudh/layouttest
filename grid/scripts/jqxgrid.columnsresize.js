(function ($) {

    $.extend($.jqx._jqxGrid.prototype, {
        _handlecolumnsresize: function () {
            var self = this;
            if (this.columnsresize) {
                var touchdevice = false;
                if (self.isTouchDevice()) {
                    touchdevice = true;
                }
                var mousemove = 'mousemove.resize' + this.element.id;
                var mousedown = 'mousedown.resize' + this.element.id;
                var mouseup = 'mouseup.resize' + this.element.id;
                if (touchdevice) {
                    var mousemove = 'touchmove.resize' + this.element.id;
                    var mousedown = 'touchstart.resize' + this.element.id;
                    var mouseup = 'touchend.resize' + this.element.id;
                }

                this.removeHandler($(document), mousemove);
                this.addHandler($(document), mousemove, function (event) {
                    var openedmenu = $.data(document.body, "contextmenu" + self.element.id);
                    if (openedmenu != null)
                        return true;

                    if (self.resizablecolumn != null && !self.disabled && self.resizing) {
                        if (self.resizeline != null) {
                            var hostoffset = self.host.offset();
                            var startleft = parseInt(self.resizestartline.offset().left);

                            var minleft = startleft - self._startcolumnwidth
                            var mincolumnwidth = self.resizablecolumn.column.minwidth;
                            if (mincolumnwidth == 'auto') mincolumnwidth = 0;
                            else mincolumnwidth = parseInt(mincolumnwidth);
                            var maxcolumnwidth = self.resizablecolumn.column.maxwidth;
                            if (maxcolumnwidth == 'auto') maxcolumnwidth = 0;
                            else maxcolumnwidth = parseInt(maxcolumnwidth);
                            var pageX = event.pageX;
                            if (touchdevice) {
                                var touches = self.getTouches(event);
                                var touch = touches[0];
                                pageX = touch.pageX;
                            }

                            minleft += mincolumnwidth;

                            var maxleft = maxcolumnwidth > 0 ? startleft + maxcolumnwidth : 0;
                            var canresize = maxcolumnwidth == 0 ? true : self._startcolumnwidth + pageX - startleft < maxcolumnwidth ? true : false;

                            if (canresize) {
                                if (pageX >= hostoffset.left && pageX >= minleft && pageX <= hostoffset.left + self.host.width()) {
                                    if (maxleft != 0 && event.pageX < maxleft) {
                                        self.resizeline.css('left', pageX);
                                    }
                                    else if (maxleft == 0) {
                                        self.resizeline.css('left', pageX);
                                    }

                                    if (touchdevice)
                                        return false;
                                }
                            }
                        }
                    }

                    if (!touchdevice)
                        return false;
                });

                this.removeHandler($(document), mousedown);
                this.addHandler($(document), mousedown, function (event) {
                    var openedmenu = $.data(document.body, "contextmenu" + self.element.id);
                    if (openedmenu != null)
                        return true;

                    if (self.resizablecolumn != null && !self.disabled) {
                        var resizeElement = self.resizablecolumn.columnelement;
                        if (resizeElement.offset().top + resizeElement.height() + 5 < event.pageY) {
                            self.resizablecolumn = null;
                            return;
                        }

                        self._startcolumnwidth = self.resizablecolumn.column.width;
                        self.resizablecolumn.column._width = null;
                        $(document.body).addClass('jqx-disableselect');
                        self._mouseDownResize = new Date();
                        self.resizing = true;

                        self._resizecolumn = self.resizablecolumn.column;
                        self.resizeline = self.resizeline || $('<div style="position: absolute;"></div>');
                        self.resizestartline = self.resizestartline || $('<div style="position: absolute;"></div>');

                        self.resizebackground = self.resizebackground || $('<div style="position: absolute; left: 0; top: 0; background: #000;"></div>');
                        self.resizebackground.css('opacity', 0.01);
                        self.resizebackground.css('cursor', "col-resize");
                        self.resizeline.css('cursor', 'col-resize');
                        self.resizestartline.css('cursor', 'col-resize');

                        self.resizeline.addClass(self.toThemeProperty('jqx-grid-column-resizeline'));
                        self.resizestartline.addClass(self.toThemeProperty('jqx-grid-column-resizestartline'));

                        $(document.body).append(self.resizeline);
                        $(document.body).append(self.resizestartline);
                        $(document.body).append(self.resizebackground);
                        var resizelineoffset = self.resizablecolumn.columnelement.offset();

                        self.resizebackground.css('left', self.host.offset().left);
                        self.resizebackground.css('top', self.host.offset().top);
                        self.resizebackground.width(self.host.width());
                        self.resizebackground.height(self.host.height());
                        self.resizebackground.css('z-index', 999999999);

                        var positionline = function (resizeline) {
                            resizeline.css('left', parseInt(resizelineoffset.left) + self._startcolumnwidth);
                            var hasgroups = self._groupsheader();
                            var groupsheaderheight = hasgroups ? self.groupsheader.height() : 0;
                            var toolbarheight = self.showtoolbar ? self.toolbarheight : 0;
                            groupsheaderheight += toolbarheight;
                            var statusbarheight = self.showstatusbar ? self.statusbarheight : 0;
                            groupsheaderheight += statusbarheight;

                            var pagerheight = 0;
                            if (self.pageable) {
                                pagerheight = self.pagerheight;
                            }
                            var scrollbaroffset = self.hScrollBar.css('visibility') == 'visible' ? 17 : 0;

                            resizeline.css('top', parseInt(resizelineoffset.top));
                            resizeline.css('z-index', 9999999999);
                            resizeline.height(self.host.height() - pagerheight - groupsheaderheight - scrollbaroffset);
                            if (self.enableanimations) {
                                resizeline.show('fast');
                            }
                            else {
                                resizeline.show();
                            }
                        }
                        positionline(self.resizeline);
                        positionline(self.resizestartline);
                    }
                });

                var doresize = function () {
                    $(document.body).removeClass('jqx-disableselect');
                    if (!self.resizing)
                        return;

                    self._mouseUpResize = new Date();
                    var timeout = self._mouseUpResize - self._mouseDownResize;
                    if (timeout < 200) {
                        self.resizing = false;
                        if (self._resizecolumn != null && self.resizeline != null && self.resizeline.css('display') == 'block') {
                            self._resizecolumn = null;
                            self.resizeline.hide();
                            self.resizestartline.hide();
                            self.resizebackground.remove();
                        }
                        return;
                    }

                    self.resizing = false;

                    if (self.disabled)
                        return;

                    if (self._resizecolumn != null && self.resizeline != null && self.resizeline.css('display') == 'block') {
                        var resizelineleft = parseInt(self.resizeline.css('left'));
                        var resizestartlineleft = parseInt(self.resizestartline.css('left'));

                        var newwidth = self._startcolumnwidth + resizelineleft - resizestartlineleft;
                        var oldwidth = self._resizecolumn.width;
                        self._closemenu();
                        self._resizecolumn.width = newwidth;
                        self._updatecolumnwidths();
                        self._updatecellwidths();
                        self._raiseEvent(14, { columntext: self._resizecolumn.text, column: self._resizecolumn.getcolumnproperties(), datafield: self._resizecolumn.datafield, oldwidth: oldwidth, newwidth: newwidth });
                        self._renderrows(self.virtualsizeinfo);

                        self._resizecolumn = null;

                        self.resizeline.hide();
                        self.resizestartline.hide();
                        self.resizebackground.remove();
                    }
                    self.resizablecolumn = null;
                }

                if (window.frameElement) {
                    if (window.top != null) {
                        var eventHandle = function (event) {
                            doresize();
                        };

                        if (window.top.document.addEventListener) {
                            window.top.document.addEventListener('mouseup', eventHandle, false);

                        } else if (window.top.document.attachEvent) {
                            window.top.document.attachEvent("on" + 'mouseup', eventHandle);
                        }
                    }
                }

                this.removeHandler($(document), mouseup);
                this.addHandler($(document), mouseup, function (event) {
                    var openedmenu = $.data(document.body, "contextmenu" + self.element.id);
                    if (openedmenu != null)
                        return true;

                    doresize();
                });
            }
        }
    });
})(jQuery);


