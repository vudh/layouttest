
(function ($) {

    $.jqx.jqxWidget("jqxGrid", "", {});

    $.extend($.jqx._jqxGrid.prototype, {
        defineInstance: function () {
            // enables or disables the grid.
            this.disabled = false;
            // sets the width.
            this.width = 600;
            // sets the height.
            this.height = 400;
            // sets the pager's height.
            this.pagerheight = 28;
            // sets the group header's height.
            this.groupsheaderheight = 34;
            // sets the default page size.
            this.pagesize = 10;
            // sets the available page sizes.
            this.pagesizeoptions = ['5', '10', '20'];
            // sets the rows height.
            this.rowsheight = 25;
            // sets the columns height.
            this.columnsheight = 25;
            // sets the group indent size. This size is used when the grid is grouped.
            this.groupindentwidth = 30;
            // enables or disables row details.
            this.rowdetails = false;
            // indents the row's details with the sum of the grouping columns and row details column indents.
            this.enablerowdetailsindent = true;
            // enables or disables the built-in mouse-wheel behavior.
            this.enablemousewheel = true;
            // renders the row details.
            this.initrowdetails = null;
            // enables or disables editing.
            this.editable = false;
            // sets the edit mode. - click, dblclick, selectedcell or programmatic.
            this.editmode = 'selectedcell';
            // enables or disables paging.
            this.pageable = false;
            // enables or disables grouping.
            this.groupable = false;
            // enables or disables sorting.
            this.sortable = false;
            // enables or disables filtering.
            this.filterable = false;
            // displays the filter icon only when the column is filtered.
            this.autoshowfiltericon = true;
            // displays a background for the filtered column.
            this.showfiltercolumnbackground = true;
            // displays a background for the pinned column.
            this.showpinnedcolumnbackground = true;
            // displays a background for the sort column.
            this.showsortcolumnbackground = true;
            // enables or disables alternating rows.
            this.altrows = false;
            // sets the alternating rows start.
            this.altstart = 1;
            // sets the alternating rows step.
            this.altstep = 1;
            // shows or hides the details column.
            this.showrowdetailscolumn = true;
            // shows or hides the grid's toolbar.
            this.showtoolbar = false;
            this.toolbarheight = 34;
            this.showstatusbar = false;
            this.statusbarheight = 34;
            // adds groups.
            this.groups = [];
            // custom groups renderer.
            this.groupsrenderer = null;
            // custom renderer for the grouping columns displayed in the grouping header.
            this.groupcolumnrenderer = null;
            // groups default expand state.
            this.groupsexpandedbydefault = false;
            // sets the pager renderer.
            this.pagerrenderer = null;
            this.touchmode = 'auto';
            // sets the grid columns.
            this.columns = [];
            // selected row index.
            this.selectedrowindex = -1;
            this.selectedrowindexes = new Array();
            this.selectedcells = new Array();
            this.selectedcell = null;
            this.tableZIndex = 799;
            this.headerZIndex = 499;
            // sets the grid source.
            this.source =
            {
                beforeprocessing: null,
                beforesend: null,
                loaderror: null,
                localdata: null,
                data: null,
                datatype: 'array',
                // {name: name, map: map}
                datafields: [],
                url: "",
                root: '',
                record: '',
                id: '',
                totalrecords: 0,
                recordstartindex: 0,
                recordendindex: 0,
                loadallrecords: true,
                sortcolumn: null,
                sortdirection: null,
                sort: null,
                filter: null,
                sortcomparer: null
            };
            // sets the grid data view.
            this.dataview = null;
            // sets the rendering delay. 
            this.updatedelay = 0;
            // sets the auto height option. This option is appropriate when the grid's paging is enables or when the grid has quite a few rows.
            this.autoheight = false;
            // shows or hides the grid's columns header.
            this.showheader = true;
            // shows or hides the grid's grouping header.
            this.showgroupsheader = true;
            // enables or disables the grouping closing buttons.
            this.closeablegroups = true;
            // sets the scrollbars size.
            this.scrollbarsize = 15;
            // enables or disables the virtual scrolling.
            this.virtualmode = false;
            // sets a custom sorting behavior.
            this.sort = null;
            // displays a dropdown button in each column.
            this.columnsmenu = true;
            // enables the resizing of grid columns.
            this.columnsresize = false;
            // sets the width of the columns menu in each column.
            this.columnsmenuwidth = 15;
            this.popupwidth = 'auto';
            // changes the sort state when the user clickes a column header.
            // 0 - disables toggling.
            // 1 - enables togging. Click on a column toggles the sort direction.
            // 2 - enables remove sorting option.
            this.sorttogglestates = 2;
            // callback function invoked when the rows are rendered.
            this.rendergridrows = null;
            // enables or disables the grid animations - slide and fade effects.
            this.enableanimations = true;
            // enables or disables the grid tooltips.
            this.enabletooltips = false;
            // enables or disables the selection.
            // possible values: 'none', 'singlerow', 'multiplerows, 'multiplerowsextended, 'singlecell, 'multiplecells, 'multiplecellsextended'
            this.selectionmode = 'singlerow';
            // enables or disables the rows hover state.
            this.enablehover = true;
            // this message is displayed when the user tries to call a method before the binding complete.
            this.loadingerrormessage = "The data is still loading. When the data binding is completed, the Grid raises the 'bindingcomplete' event. Call this function in the 'bindingcomplete' event handler.";
            // vertical scroll step.
            this.verticalscrollbarstep = 5;
            // vertical large step.
            this.verticalscrollbarlargestep = 400;
            // horizontal step.
            this.horizontalscrollbarstep = 5;
            // horizontal large step.
            this.horizontalscrollbarlargestep = 50;
            this.keyboardnavigation = true;
            this.touchModeStyle = 'auto';
            // private members
            this._updating = false;
            this._pagescache = new Array();
            this._pageviews = new Array();
            this._cellscache = new Array();
            this._rowdetailscache = new Array();
            this._rowdetailselementscache = new Array();
            this._requiresupdate = false;
            this._hasOpenedMenu = false;

            this.events =
	   	    [
            /*0*/'initialized',
            /*1*/'rowclick',
            /*2*/'rowselect',
            /*3*/'rowunselect',
            /*4*/'groupexpand',
            /*5*/'groupcollapse',
            /*6*/'sort',
            /*7*/'columnclick',
            /*8*/'cellclick',
            /*9*/'pagechanged',
            /*10*/'pagesizechanged',
            /*11*/'bindingcomplete',
            /*12*/'groupschanged',
            /*13*/'filter',
            /*14*/'columnresized',
            /*15*/'cellselect',
            /*16*/'cellunselect',
            /*17*/'cellbeginedit',
            /*18*/'cellendedit',
            /*19*/'cellvaluechanged',
            /*20*/'rowexpand',
            /*21*/'rowcollapse',
            /*22*/'rowdoubleclick',
            /*23*/'celldoubleclick'
           ];
        },

        createInstance: function (args) {
            var gridStructure = $("<div tabIndex=0 style='overflow: hidden; -webkit-appearance: none; outline: none; width:100%; height: 100%; align:left; border: 0px; padding: 0px; margin: 0px; left: 0px; top: 0px; valign:top; position: relative;'>" +
                "<div id='wrapper" + this.element.id + "' tabIndex=1 style='overflow: hidden; -webkit-appearance: none; border: none; background: transparent; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; align:left; left: 0px; top: 0px; valign:top; position: relative;'>" +
                "<div id='toolbar' style='visibility: hidden; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>" +
                "<div id='groupsheader' style='visibility: hidden; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>" +
                "<div id='content" + this.element.id + "' tabIndex=2 style='overflow: hidden; -webkit-appearance: none; border: none; background: transparent; outline: none; border: none; padding: 0px; margin-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
                "<div id='verticalScrollBar" + this.element.id + "' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
                "<div id='horizontalScrollBar" + this.element.id + "' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
                "<div id='bottomRight' style='align:left; valign:top; left: 0px; top: 0px; border: none; position: absolute;'/>" +
                "<div id='statusbar' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
                "<div id='pager' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/>" +
                "</div>" +
                "</div>");

            this._fieldsmapping();
            this.element.innerText = '';
            this.element.innerHTML = '';
            this.host.append(gridStructure);
            this.host.addClass(this.toTP('jqx-grid'));
            this.host.addClass(this.toTP('jqx-reset'));
            this.host.addClass(this.toTP('jqx-rc-all'));
            this.host.addClass(this.toTP('jqx-widget'));
            this.host.addClass(this.toTP('jqx-widget-content'));

            this.wrapper = this.host.find("#wrapper" + this.element.id);
            this.content = this.host.find("#content" + this.element.id);
            this.content.addClass(this.toTP('jqx-reset'));

            var verticalScrollBar = this.host.find("#verticalScrollBar" + this.element.id);
            var horizontalScrollBar = this.host.find("#horizontalScrollBar" + this.element.id);
            this.bottomRight = this.host.find("#bottomRight").addClass(this.toTP('jqx-grid-bottomright'));

            if (!verticalScrollBar.jqxScrollBar) {
                alert('jqxscrollbar is not loaded.');
                return;
            }
            this.editors = new Array();

            this.vScrollBar = verticalScrollBar.jqxScrollBar({ 'vertical': true, touchMode: this.touchmode, step: this.verticalscrollbarstep, largestep: this.verticalscrollbarlargestep, theme: this.theme, _triggervaluechanged: false });
            this.hScrollBar = horizontalScrollBar.jqxScrollBar({ 'vertical': false, touchMode: this.touchmode, step: this.horizontalscrollbarstep, largestep: this.horizontalscrollbarlargestep, theme: this.theme, triggervaluechanged: false });

            this.pager = this.host.find("#pager");
            this.toolbar = this.host.find("#toolbar");
            this.toolbar[0].id = "toolbar" + this.element.id;
            this.toolbar.addClass(this.toTP('jqx-grid-toolbar'));
            this.toolbar.addClass(this.toTP('jqx-widget-header'));

            this.statusbar = this.host.find("#statusbar");
            this.statusbar[0].id = "statusbar" + this.element.id;
            this.statusbar.addClass(this.toTP('jqx-grid-statusbar'));
            this.statusbar.addClass(this.toTP('jqx-widget-header'));

            this.pager.addClass(this.toTP('jqx-grid-pager'));
            this.pager.addClass(this.toTP('jqx-widget-header'));

            this.groupsheader = this.host.find("#groupsheader");
            this.groupsheader.addClass(this.toTP('jqx-grid-groups-header'));
            this.groupsheader.addClass(this.toTP('jqx-widget-header'));

            this.vScrollBar.css('visibility', 'hidden');
            this.hScrollBar.css('visibility', 'hidden');

            this.vScrollInstance = $.data(this.vScrollBar[0], 'jqxScrollBar').instance;
            this.hScrollInstance = $.data(this.hScrollBar[0], 'jqxScrollBar').instance;
            this.gridtable = null;

            this.dataloadelement = $('<div style="position: absolute;"></div>');
            this.dataloadelement.addClass(this.toTP('jqx-grid-load'));
            this.dataloadelement.width(this.width);
            this.dataloadelement.height(this.height);

            this.host.prepend(this.dataloadelement);
            this.isNestedGrid = this.host.parent() ? this.host.parent().css('z-index') == 2000 : false;

            if (this.localizestrings) {
                this.localizestrings();
            }

            this.databind(this.source);

            if (this.showtoolbar) {
                this.toolbar.css('visibility', 'visible');
            }
            if (this.showstatusbar) {
                this.statusbar.css('visibility', 'visible');
            }
            if (this.pageable && this._initpager) {
                this._initpager();
            }

            this._arrange();
            this.tableheight = null;
            var me = this;
            var clearoffset = function () {
                if (me.content) {
                    me.content[0].scrollTop = 0;
                    me.content[0].scrollLeft = 0;
                }
                if (me.gridcontent) {
                    me.gridcontent[0].scrollLeft = 0;
                    me.gridcontent[0].scrollTop = 0;
                }
            }

            this.content.bind('mousedown', function () {
                clearoffset();
            });

            this.content.bind('scroll', function (event) {
                clearoffset();
                return false;
            });

            this.host.addClass('jqx-disableselect');
            this.content.addClass('jqx-disableselect');

            this.addHandler(this.host, 'loadContent', function (event) {
                if (me.gridmenu && me.gridmenu.width() < 120) {
                    me._initmenu();
                    me.prerenderrequired = true;
                    me._rendercolumnheaders();
                }
                return false;
            });

            if ((this.width != null && this.width.toString().indexOf('%') != -1) || (this.height != null && this.height.toString().indexOf('%') != -1)) {
                $(window).bind('resize.' + this.element.id, function () {
                    var width = $(window).width();
                    var height = $(window).height();

                    if (width != me._windowWidth || height != me._windowHeight) {
                        me._updatesize();
                    }

                    me._windowWidth = width;
                    me._windowHeight = height;

                });

                setInterval(function () {
                    var width = me.host.width();
                    var height = me.host.height();
                    if (me._lastWidth != width || me._lastHeight != height) {
                        me._updatesize();
                    }
                    me._lastWidth = width;
                    me._lastHeight = height;
                }, 250);
            }
        },

        hiddenParent: function () {
            var me = this;
            if (me.host.css('display') != 'block')
                return true;
            var hiddenParent = false;
            $.each(me.host.parents(), function () {
                if ($(this).css('display') != 'block') {
                    hiddenParent = true;
                    return false;
                }
            });
            return hiddenParent;
        },

        _updatesize: function (updateWidth, updateHeight) {
            if (this._loading) {
                return;
            }

            var me = this;

            if (this.hiddenParent()) {
                return;
            }

            var hostWidth = me.host.width();
            var hostHeight = me.host.height();

            if (!me._oldWidth) {
                me._oldWidth = hostWidth;
            }

            if (!me._oldHeight) {
                me._oldHeight = hostHeight;
            }

            if (me._resizeTimer) {
                clearTimeout(me._resizeTimer);
            }

            var delay = $.browser.msie ? 10 : 1;

            me._resizeTimer = setTimeout(function () {
                if (hostWidth != me._oldWidth || updateWidth == true) {
                    me._arrange();
                    me._updatecolumnwidths();
                    me._updatecellwidths();
                    me._renderrows(me.virtualsizeinfo);
                }

                if (hostHeight != me._oldHeight || updateHeight == true) {
                    var hasgroups = me.groupable && me.groups.length > 0;
                    var isVScrollHidden = me.vScrollBar.css('visibility') != 'visible';

                    if (!hasgroups) {
                        me._arrange();
                        me.virtualsizeinfo = me._calculatevirtualheight();
                        if (parseInt(hostHeight) >= parseInt(me._oldHeight)) {
                            me.prerenderrequired = true;
                        }
                        me._renderrows(me.virtualsizeinfo);
                    }
                    else {
                        if (value >= oldvalue) {
                            me._render(true, false, false);
                        }
                        else {
                            me.rendergridcontent(true, false);
                        }
                    }

                    if (isVScrollHidden && me.vScrollBar.css('visibility') == 'visible') {
                        me._arrange();
                        me._updatecolumnwidths();
                        me._updatecellwidths();
                    }
                }

                me._oldWidth = hostWidth;
                me._oldHeight = hostHeight;
            }, delay);
        },

        _fieldsmapping: function () {
            if (this.showToolbar) {
                this._mapField("showtoolbar", this.showToolbar);
            }
            if (this.toolbarHeight) {
                this._mapField("toolbarheight", this.toolbarHeight);
            }
            if (this.pagerHeight) {
                this._mapField("pagerHeight", this.pagerHeight);
            }
            if (this.groupsHeaderHeight) {
                this._mapField("groupsHeaderHeight", this.groupsHeaderHeight);
            }
            if (this.pageSize) {
                this._mapField("pageSize", this.pageSize);
            }
            if (this.pagerHeight) {
                this._mapField("pagerHeight", this.pagerHeight);
            }
            if (this.pageSizeOptions) {
                this._mapField("pageSizeOptions", this.pageSizeOptions);
            }
            if (this.rowsHeight) {
                this._mapField("rowsHeight", this.rowsHeight);
            }
            if (this.columnsHeight) {
                this._mapField("columnsHeight", this.columnsHeight);
            }
            if (this.groupIndentWidth) {
                this._mapField("groupIndentWidth", this.groupIndentWidth);
            }
            if (this.rowDetails) {
                this._mapField("rowDetails", this.rowDetails);
            }
            if (this.enableRowDetailsIndent) {
                this._mapField("enableRowDetailsIndent", this.enableRowDetailsIndent);
            }
            if (this.enableMouseWheel) {
                this._mapField("enableMouseWheel", this.enableMouseWheel);
            }
            if (this.initRowDetails) {
                this._mapField("initRowDetails", this.initRowDetails);
            }
            if (this.editMode) {
                this._mapField("editMode", this.editMode);
            }
            if (this.autoShowFilterIcon) {
                this._mapField("autoShowFilterIcon", this.autoShowFilterIcon);
            }
            if (this.showFilterColumnBackground) {
                this._mapField("showFilterColumnBackground", this.showFilterColumnBackground);
            }
            if (this.showPinnedColumnBackground) {
                this._mapField("showPinnedColumnBackground", this.showPinnedColumnBackground);
            }
            if (this.showSortColumnBackground) {
                this._mapField("showSortColumnBackground", this.showSortColumnBackground);
            }
            if (this.altRows) {
                this._mapField("altRows", this.altRows);
            }
            if (this.altStart) {
                this._mapField("altStart", this.altStart);
            }
            if (this.altStep) {
                this._mapField("altStep", this.altStep);
            }
            if (this.showRowDetailsColumn) {
                this._mapField("showRowDetailsColumn", this.showRowDetailsColumn);
            }
            if (this.groupsRenderer) {
                this._mapField("groupsRenderer", this.groupsRenderer);
            }
            if (this.groupColumnRenderer) {
                this._mapField("groupColumnRenderer", this.groupColumnRenderer);
            }
            if (this.groupsExpandedByDefault) {
                this._mapField("groupsExpandedByDefault", this.groupsExpandedByDefault);
            }
            if (this.pagerRenderer) {
                this._mapField("pagerRenderer", this.pagerRenderer);
            }
            if (this.updateDelay) {
                this._mapField("updateDelay", this.updateDelay);
            }
            if (this.autoHeight) {
                this._mapField("autoHeight", this.autoHeight);
            }
            if (this.showHeader) {
                this._mapField("showHeader", this.showHeader);
            }
            if (this.showGroupsHeader) {
                this._mapField("showGroupsHeader", this.showGroupsHeader);
            }
            if (this.closeableGroups) {
                this._mapField("closeableGroups", this.closeableGroups);
            }
            if (this.scrollbarSize) {
                this._mapField("scrollbarSize", this.scrollbarSize);
            }
            if (this.virtualMode) {
                this._mapField("virtualMode", this.virtualMode);
            }
            if (this.columnsMenu) {
                this._mapField("columnsMenu", this.columnsMenu);
            }
            if (this.columnsResize) {
                this._mapField("columnsResize", this.columnsResize);
            }
            if (this.columnsMenuWidth) {
                this._mapField("columnsMenuWidth", this.columnsMenuWidth);
            }
            if (this.sortToggleStates) {
                this._mapField("sortToggleStates", this.sortToggleStates);
            }
            if (this.renderGridRows) {
                this._mapField("renderGridRows", this.renderGridRows);
            }
            if (this.enableAnimations) {
                this._mapField("enableAnimations", this.enableAnimations);
            }
            if (this.enableTooltips) {
                this._mapField("enableTooltips", this.enableTooltips);
            }
            if (this.selectionMode) {
                this._mapField("selectionMode", this.selectionMode);
            }
            if (this.enableHover) {
                this._mapField("enableHover", this.enableHover);
            }
            if (this.loadingErrorMessage) {
                this._mapField("loadingErrorMessage", this.loadingErrorMessage);
            }
            if (this.verticalScrollBarStep) {
                this._mapField("verticalScrollBarStep", this.verticalScrollBarStep);
            }
            if (this.verticalScrollBarLargeStep) {
                this._mapField("verticalScrollBarLargeStep", this.verticalScrollBarLargeStep);
            }
            if (this.horizontalScrollBarStep) {
                this._mapField("horizontalScrollBarStep", this.horizontalScrollBarStep);
            }
            if (this.horizontalScrollbarLargeStep) {
                this._mapField("horizontalScrollbarLargeStep", this.horizontalScrollbarLargeStep);
            }
            if (this.keyboardNavigation) {
                this._mapField("keyboardNavigation", this.keyboardNavigation);
            }
        },

        _mapField: function (name, value) {
            if (name == null)
                return false;

            this[name.toLowerCase()] = value;
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

        _updateTouchScrolling: function () {
            var me = this;
            if (me.isTouchDevice()) {
                me.enablehover = false;
                if (me.gridcontent) {
                    me.gridcontent.unbind('touchstart.touchScroll');
                    me.gridcontent.unbind('touchmove.touchScroll');
                    me.gridcontent.unbind('touchend.touchScroll');
                    me.gridcontent.unbind('touchcancel.touchScroll');

                    $.jqx.mobile.touchScroll(me.gridcontent[0], me.vScrollInstance.max, function (left, top) {
                        if (me.vScrollBar.css('visibility') == 'visible') {
                            var oldValue = me.vScrollInstance.value;
                            me.vScrollInstance.setPosition(oldValue + top);
                        }
                        if (me.hScrollBar.css('visibility') == 'visible') {
                            var oldValue = me.hScrollInstance.value;
                            me.hScrollInstance.setPosition(oldValue + left);
                        }
                        me._lastScroll = new Date();
                    });
                }
            }
        },

        isTouchDevice: function () {
            if (this.touchDevice != undefined)
                return this.touchDevice;

            var isTouchDevice = $.jqx.mobile.isTouchDevice();
            this.touchDevice = isTouchDevice;
            if (this.touchmode == true) {
                isTouchDevice = true;
                $.jqx.mobile.setMobileSimulator(this.element);
                this.touchDevice = isTouchDevice;
            }
            else if (this.touchmode == false) {
                isTouchDevice = false;
            }
            if (isTouchDevice && this.touchModeStyle != false) {
                this.scrollbarsize = 10;
                this.host.addClass(this.toThemeProperty('jqx-touch'));
                this.host.find('jqx-widget-content').addClass(this.toThemeProperty('jqx-touch'));
                this.host.find('jqx-widget-header').addClass(this.toThemeProperty('jqx-touch'));
            }
            return isTouchDevice;
        },

        toTP: function (name) {
            return this.toThemeProperty(name);
        },

        localizestrings: function (localizationobj) {
            this._cellscache = new Array();
            if ($.jqx.dataFormat) {
                $.jqx.dataFormat.cleardatescache();
            }

            if (this._loading) {
                alert(this.loadingerrormessage);
                return false;
            }

            if (localizationobj != null) {
                if (localizationobj.pagergotopagestring) {
                    this.gridlocalization.pagergotopagestring = localizationobj.pagergotopagestring;
                }
                if (localizationobj.pagershowrowsstring) {
                    this.gridlocalization.pagershowrowsstring = localizationobj.pagershowrowsstring;
                }
                if (localizationobj.pagerrangestring) {
                    this.gridlocalization.pagerrangestring = localizationobj.pagerrangestring;
                }
                if (localizationobj.pagernextbuttonstring) {
                    this.gridlocalization.pagernextbuttonstring = localizationobj.pagernextbuttonstring;
                }
                if (localizationobj.pagerpreviousbuttonstring) {
                    this.gridlocalization.pagerpreviousbuttonstring = localizationobj.pagerpreviousbuttonstring;
                }
                if (localizationobj.groupsheaderstring) {
                    this.gridlocalization.groupsheaderstring = localizationobj.groupsheaderstring;
                }
                if (localizationobj.sortascendingstring) {
                    this.gridlocalization.sortascendingstring = localizationobj.sortascendingstring;
                }
                if (localizationobj.sortdescendingstring) {
                    this.gridlocalization.sortdescendingstring = localizationobj.sortdescendingstring;
                }
                if (localizationobj.sortremovestring) {
                    this.gridlocalization.sortremovestring = localizationobj.sortremovestring;
                }
                if (localizationobj.groupbystring) {
                    this.gridlocalization.groupbystring = localizationobj.groupbystring;
                }
                if (localizationobj.groupremovestring) {
                    this.gridlocalization.groupremovestring = localizationobj.groupremovestring;
                }
                if (localizationobj.firstDay) {
                    this.gridlocalization.firstDay = localizationobj.firstDay;
                }
                if (localizationobj.days) {
                    this.gridlocalization.days = localizationobj.days;
                }
                if (localizationobj.months) {
                    this.gridlocalization.months = localizationobj.months;
                }
                if (localizationobj.AM) {
                    this.gridlocalization.AM = localizationobj.AM;
                }
                if (localizationobj.PM) {
                    this.gridlocalization.PM = localizationobj.PM;
                }
                if (localizationobj.patterns) {
                    this.gridlocalization.patterns = localizationobj.patterns;
                }
                if (localizationobj.percentsymbol) {
                    this.gridlocalization.percentsymbol = localizationobj.percentsymbol;
                }
                if (localizationobj.currencysymbol) {
                    this.gridlocalization.currencysymbol = localizationobj.currencysymbol;
                }
                if (localizationobj.currencysymbolposition) {
                    this.gridlocalization.currencysymbolposition = localizationobj.currencysymbolposition;
                }
                if (localizationobj.decimalseparator) {
                    this.gridlocalization.decimalseparator = localizationobj.decimalseparator;
                }
                if (localizationobj.thousandsseparator) {
                    this.gridlocalization.thousandsseparator = localizationobj.thousandsseparator;
                }
                if (localizationobj.filterclearstring) {
                    this.gridlocalization.filterclearstring = localizationobj.filterclearstring;
                }
                if (localizationobj.filterstring) {
                    this.gridlocalization.filterstring = localizationobj.filterstring;
                }
                if (localizationobj.filtershowrowstring) {
                    this.gridlocalization.filtershowrowstring = localizationobj.filtershowrowstring;
                }
                if (localizationobj.filterorconditionstring) {
                    this.gridlocalization.filterorconditionstring = localizationobj.filterorconditionstring;
                }
                if (localizationobj.filterandconditionstring) {
                    this.gridlocalization.filterandconditionstring = localizationobj.filterandconditionstring;
                }
                if (localizationobj.filterstringcomparisonoperators) {
                    this.gridlocalization.filterstringcomparisonoperators = localizationobj.filterstringcomparisonoperators;
                }
                if (localizationobj.filternumericcomparisonoperators) {
                    this.gridlocalization.filternumericcomparisonoperators = localizationobj.filternumericcomparisonoperators;
                }
                if (localizationobj.filterdatecomparisonoperators) {
                    this.gridlocalization.filterdatecomparisonoperators = localizationobj.filterdatecomparisonoperators;
                }
                if (localizationobj.filterbooleancomparisonoperators) {
                    this.gridlocalization.filterbooleancomparisonoperators = localizationobj.filterbooleancomparisonoperators;
                }
                if (this._initpager) {
                    this._initpager();
                }
                if (this._initgroupsheader) {
                    this._initgroupsheader();
                }
                if (this._initmenu) {
                    this._initmenu();
                }
                if (localizationobj.validationstring) {
                    this.gridlocalization.validationstring = localizationobj.validationstring;
                }
                this._renderrows(this.virtualsizeinfo);
            }
            else {
                this.gridlocalization = {
                    // separator of parts of a date (e.g. '/' in 11/05/1955)
                    '/': "/",
                    // separator of parts of a time (e.g. ':' in 05:44 PM)
                    ':': ":",
                    // the first day of the week (0 = Sunday, 1 = Monday, etc)
                    firstDay: 0,
                    days: {
                        // full day names
                        names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        // abbreviated day names
                        namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        // shortest day names
                        namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                    },
                    months: {
                        // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
                        names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                        // abbreviated month names
                        namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
                    },
                    // AM and PM designators in one of these forms:
                    // The usual view, and the upper and lower case versions
                    //      [standard,lowercase,uppercase]
                    // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                    //      null
                    AM: ["AM", "am", "AM"],
                    PM: ["PM", "pm", "PM"],
                    eras: [
                    // eras in reverse chronological order.
                    // name: the name of the era in this culture (e.g. A.D., C.E.)
                    // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                    // offset: offset in years from gregorian calendar
                    {"name": "A.D.", "start": null, "offset": 0 }
                ],
                    twoDigitYearMax: 2029,
                    patterns: {
                        // short date pattern
                        d: "M/d/yyyy",
                        // long date pattern
                        D: "dddd, MMMM dd, yyyy",
                        // short time pattern
                        t: "h:mm tt",
                        // long time pattern
                        T: "h:mm:ss tt",
                        // long date, short time pattern
                        f: "dddd, MMMM dd, yyyy h:mm tt",
                        // long date, long time pattern
                        F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                        // month/day pattern
                        M: "MMMM dd",
                        // month/year pattern
                        Y: "yyyy MMMM",
                        // S is a sortable format that does not vary by culture
                        S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss"
                    },
                    percentsymbol: "%",
                    currencysymbol: "$",
                    currencysymbolposition: "before",
                    decimalseparator: '.',
                    thousandsseparator: ',',
                    pagergotopagestring: "Go to page:",
                    pagershowrowsstring: "Show rows:",
                    pagerrangestring: " of ",
                    pagerpreviousbuttonstring: "previous",
                    pagernextbuttonstring: "next",
                    groupsheaderstring: "Drag a column and drop it here to group by that column",
                    sortascendingstring: "Sort Ascending",
                    sortdescendingstring: "Sort Descending",
                    sortremovestring: "Remove Sort",
                    groupbystring: "Group By this column",
                    groupremovestring: "Remove from groups",
                    filterclearstring: "Clear",
                    filterstring: "Filter",
                    filtershowrowstring: "Show rows where:",
                    filterorconditionstring: "Or",
                    filterandconditionstring: "And",
                    filterstringcomparisonoperators: ['empty', 'not empty', 'contains', 'contains(match case)',
                       'does not contain', 'does not contain(match case)', 'starts with', 'starts with(match case)',
                       'ends with', 'ends with(match case)', 'equal', 'equal(match case)', 'null', 'not null'],
                    filternumericcomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal', 'null', 'not null'],
                    filterdatecomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal', 'null', 'not null'],
                    filterbooleancomparisonoperators: ['equal', 'not equal'],
                    validationstring: "Entered value is not valid"
                };
            }
        },

        _initmenu: function () {
            var self = this;

            if (this.host.jqxMenu) {
                if (this.gridmenu) {
                    if (this.filterable) {
                        if (this._destroyfilterpanel) {
                            this._destroyfilterpanel();
                        }
                    }
                    this.gridmenu.jqxMenu('destroy');
                    this.gridmenu.remove();
                }
                this.menuitemsarray = new Array();
                this.gridmenu = $('<div id="gridmenu' + this.element.id + '" style="z-index: 9999999999999;"></div>');
                this.host.append(this.gridmenu);
                var menuitems = $('<ul></ul>');
                var imgsortasc = '<div class="jqx-grid-sortasc-icon"></div>';
                var sortascendingitem = $('<li>' + imgsortasc + this.gridlocalization.sortascendingstring + '</li>');
                var imgsortdesc = '<div class="jqx-grid-sortdesc-icon"></div>';
                var sortdescendingitem = $('<li>' + imgsortdesc + this.gridlocalization.sortdescendingstring + '</li>');
                var imgsortclear = '<div class="jqx-grid-sortremove-icon"></div>';
                var sortremoveitem = $('<li>' + imgsortclear + this.gridlocalization.sortremovestring + '</li>');
                var imggroupby = '<div class="jqx-grid-groupby-icon"></div>';
                var groupbyitem = $('<li>' + imggroupby + this.gridlocalization.groupbystring + '</li>');
                var groupremoveitem = $('<li>' + imggroupby + this.gridlocalization.groupremovestring + '</li>');
                var separatoritem = $('<li type="separator"></li>');
                var filteritem = $('<li class="filter" style="height: 170px;" ignoretheme="true">' + '<div class="filter"></div>' + '</li>');

                var maxstringlength = this.gridlocalization.sortascendingstring.length;
                var maxstring = this.gridlocalization.sortascendingstring;
                if (this.gridlocalization.sortdescendingstring.length > maxstringlength) {
                    maxstringlength = this.gridlocalization.sortdescendingstring.length;
                    maxstring = this.gridlocalization.sortdescendingstring;
                }
                if (this.gridlocalization.sortremovestring.length > maxstringlength) {
                    maxstringlength = this.gridlocalization.sortremovestring.length;
                    maxstring = this.gridlocalization.sortremovestring;
                }
                if (this.groupable && this._initgroupsheader) {
                    if (this.gridlocalization.groupbystring.length > maxstringlength) {
                        maxstringlength = this.gridlocalization.groupbystring.length;
                        maxstring = this.gridlocalization.groupbystring;
                    }
                    if (this.gridlocalization.groupremovestring.length > maxstringlength) {
                        maxstringlength = this.gridlocalization.groupremovestring.length;
                        maxstring = this.gridlocalization.groupremovestring;
                    }
                }
                var stringwidth = 200;
                maxstring = $.trim(maxstring).replace(/\&nbsp\;/ig, '').replace(/\&#160\;/ig, '');
                var measurestring = $('<span>' + maxstring + '</span>');
                measurestring.addClass(this.toThemeProperty('jqx-menu-item'));
                this.host.append(measurestring);
                stringwidth = measurestring.outerWidth() + 60;
                measurestring.remove();
                var itemscount = 0;
                if (this.sortable && this._togglesort) {
                    menuitems.append(sortascendingitem);
                    this.menuitemsarray[0] = sortascendingitem[0];

                    menuitems.append(sortdescendingitem);
                    this.menuitemsarray[1] = sortdescendingitem[0];

                    menuitems.append(sortremoveitem);
                    this.menuitemsarray[2] = sortremoveitem[0];
                    itemscount = 3;
                }

                if (this.groupable && this._initgroupsheader) {
                    menuitems.append(groupbyitem);
                    this.menuitemsarray[3] = groupbyitem[0];

                    menuitems.append(groupremoveitem);
                    this.menuitemsarray[4] = groupremoveitem[0];
                    itemscount += 2;
                }

                var itemsheight = itemscount * 27 + 3;
                var closeonclick = true;
                if (this.filterable) {
                    if (this._initfilterpanel) {
                        this.menuitemsarray[5] = filteritem[0];
                        this.menuitemsarray[6] = filteritem[0];
                        menuitems.append(separatoritem);
                        menuitems.append(filteritem);
                        itemsheight += 176;
                        var filterpanel = $(filteritem).find('div:first');
                        stringwidth += 20;
                        this._initfilterpanel(this, filterpanel, "", stringwidth);
                        closeonclick = false;
                        this.removeHandler($(document), 'click.menu' + self.element.id, self._closemenuafterclick, self);
                        this.addHandler($(document), 'click.menu' + self.element.id, self._closemenuafterclick, self);
                    }
                    else {
                        alert('jqxgrid.filter.js is not loaded.');
                    }
                }

                this.gridmenu.append(menuitems);

                if ($.browser.msie && $.browser.version < 8 && this.filterable) {
                    $("#listBoxfilter1" + this.element.id).css('z-index', 4990);
                    $("#listBoxfilter2" + this.element.id).css('z-index', 4990);
                    $("#listBoxfilter3" + this.element.id).css('z-index', 4990);
                    $('#gridmenu' + this.element.id).css('z-index', 5000);
                    $('#gridmenu' + this.element.id).bind('initialized', function () {
                        $('#menuWrappergridmenu' + self.element.id).css('z-index', 4980);
                    });
                }

                if (this.menuitemsarray[0] == undefined) {
                    itemsheight = 65;
                }

                this.addHandler(this.gridmenu, 'keydown', function (event) {
                    if (event.keyCode == 27) {
                        self.gridmenu.jqxMenu('close');
                    }
                    else if (event.keyCode == 13 && self.filterable) {
                        if (self._buildfilter) {
                            var filter1 = $($.find('#filter1' + self.element.id)).jqxDropDownList('container').css('display') == 'block';
                            var filter2 = $($.find('#filter2' + self.element.id)).jqxDropDownList('container').css('display') == 'block';
                            var filter3 = $($.find('#filter3' + self.element.id)).jqxDropDownList('container').css('display') == 'block';
                            var clearButton = $($.find('#filterclearbutton' + self.element.id)).hasClass('jqx-fill-state-focus');
                            if (clearButton) {
                                var column = $.data(document.body, "contextmenu" + self.element.id).column;
                                self._clearfilter(self, self.element, column);
                                self.gridmenu.jqxMenu('close');
                            }
                            else {
                                if (!filter1 && !filter2 && !filter3) {
                                    var column = $.data(document.body, "contextmenu" + self.element.id).column;
                                    self.gridmenu.jqxMenu('close');
                                    self._buildfilter(self, filteritem, column);
                                }
                            }
                        }
                    }
                });
                if (this.popupwidth != 'auto') {
                    stringwidth = this.popupwidth;
                }

                this.gridmenu.jqxMenu({ width: stringwidth, height: itemsheight, autoCloseOnClick: closeonclick, autoOpenPopup: false, mode: 'popup', theme: this.theme, animationShowDuration: 0, animationHideDuration: 0, animationShowDelay: 0 });
                if (this.filterable) {
                    this.gridmenu.jqxMenu('_setItemProperty', filteritem[0].id, 'closeOnClick', false);
                }
                this._handlemenueevents();
            }
            else {
                this.columnsmenu = false;
            }
        },

        _closemenuafterclick: function (event) {
            var me = event != null ? event.data : this;
            var matches = false;

            if (event.target.className.indexOf('filter') != -1) {
                return;
            }

            if (event.target.className.indexOf('jqx-grid-cell') != -1) {
                me.gridmenu.jqxMenu('close');
                return;
            }

            var gridbounds = me.host.offset();
            var x = event.pageX;
            var y = event.pageY;

            $.each($(event.target).parents(), function () {
                if (this.id != null && this.id.indexOf('filter') != -1) {
                    matches = true;
                    return false;
                }

                if (this.className.indexOf('filter') != -1) {
                    matches = true;
                    return false;
                }

                if (this.className.indexOf('jqx-grid-cell') != -1) {
                    me.gridmenu.jqxMenu('close');
                    return false;
                }
                if (this.className.indexOf('jqx-grid-column') != -1) {
                    me.gridmenu.jqxMenu('close');
                    return false;
                }
            });

            if (matches) {
                return;
            }
            me.gridmenu.jqxMenu('close');

            //            if (x < gridbounds.left || x > gridbounds.left + me.host.width()) {
            //                me.gridmenu.jqxMenu('close');
            //                return;
            //            }

            //            if (y < gridbounds.top || y > gridbounds.top + me.host.height()) {
            //                me.gridmenu.jqxMenu('close');
            //                return;
            //            }
        },

        _handlemenueevents: function () {
            var self = this;
            this.removeHandler(this.gridmenu, 'closed');
            this.addHandler(this.gridmenu, 'closed', function (event) {
                self._closemenu();
            });

            this.removeHandler(this.gridmenu, 'itemclick');
            this.addHandler(this.gridmenu, 'itemclick', function (event) {
                var clickeditem = event.args;

                for (i = 0; i < self.menuitemsarray.length; i++) {
                    var currentitem = self.menuitemsarray[i];
                    if (clickeditem == currentitem) {
                        if ($(clickeditem).attr('ignoretheme') != undefined) {
                            return;
                        }

                        var menu = $.data(document.body, "contextmenu" + self.element.id);
                        var column = menu.column;
                        if (self.filterable) {
                            self.gridmenu.jqxMenu('close');
                        }

                        if (menu != null) {
                            switch (i) {
                                case 0:
                                    self.sortby(column.datafield, 'ascending', null);
                                    break;
                                case 1:
                                    self.sortby(column.datafield, 'descending', null);
                                    break;
                                case 2:
                                    self.sortby(column.datafield, null, null);
                                    break;
                                case 3:
                                    self.addgroup(column.datafield);
                                    break;
                                case 4:
                                    self.removegroup(column.datafield);
                                    break;
                                case 5:
                                    var filteritem = $(self.menuitemsarray[6]);
                                    $(filteritem).css('display', 'block');
                                    break;
                                case 7:
                                    break;
                            }
                        }
                        break;
                    }
                }
            });
        },

        // get information about the data records.
        getdatainformation: function () {
            var totalrecords = this.dataview.totalrecords;
            if (this.summaryrows) {
                totalrecords += this.summaryrows.length;
            }

            return { rowscount: totalrecords, sortinformation: this.getsortinformation(), paginginformation: this.getpaginginformation() }
        },

        // gets sort information.
        getsortinformation: function () {
            return { sortcolumn: this.sortcolumn, sortdirection: this.sortdirection };
        },

        // get paging information.
        getpaginginformation: function () {
            return { pagenum: this.dataview.pagenum, pagesize: this.pagesize, pagescount: Math.ceil(this.dataview.totalrecords / this.pagesize) };
        },

        _updaterowsproperties: function () {
            this._updatehiddenrows();
            this._updaterowheights();
            this._updaterowdetails();
        },

        _updatehiddenrows: function () {
            var me = this;
            this.hiddens = new Array();
            var hiddenboundrows = this.hiddenboundrows;
            $.each(hiddenboundrows, function (index) {
                if (this.index != undefined) {
                    var boundindex = this.index;
                    var visibleindex = me.getrowvisibleindex(index);
                    me.hiddens[visibleindex] = this.hidden;
                }
            });
        },

        _updaterowheights: function () {
            var me = this;
            this.heights = new Array();
            var heightboundrows = this.heightboundrows;
            $.each(heightboundrows, function (index) {
                if (this.index != undefined) {
                    var boundindex = this.index;
                    var visibleindex = me.getrowvisibleindex(index);
                    me.heights[visibleindex] = this.height;
                }
            });
        },

        _updaterowdetails: function () {
            var me = this;
            this.details = new Array();
            var detailboundrows = this.detailboundrows;
            $.each(detailboundrows, function (index) {
                if (this.index != undefined) {
                    var boundindex = this.index;
                    var visibleindex = me.getrowvisibleindex(index);
                    me.details[visibleindex] = this.details;
                }
            });
        },

        _getmenuitembyindex: function (index) {
            if (index == undefined)
                return null;

            return this.menuitemsarray[index];
        },

        _closemenu: function () {
            if (this._hasOpenedMenu) {
                if (this.gridmenu != null) {
                    this.gridmenu.jqxMenu('close');
                }

                var menu = $.data(document.body, "contextmenu" + this.element.id);
                var menuoffset = 16;
                if (menu != null) {
                    if (this.enableanimations) {
                        $(menu.columnsmenu).animate({
                            'margin-left': 0
                        }, 'fast', function () {
                            $(menu.columnsmenu).css('display', 'none');
                        });
                        menu.column.iconscontainer.animate({
                            'margin-left': -32
                        }, 'fast');
                    }
                    else {
                        $(menu.columnsmenu).css('display', 'none');
                        menu.column.iconscontainer.css('margin-left', -32);
                    }

                    $.data(document.body, "contextmenu" + this.element.id, null)
                }
                this._hasOpenedMenu = false;


                var filteritem = this._getmenuitembyindex(5);
                if (filteritem) {
                    var condition = $(filteritem).find('#filter1' + this.element.id);
                    var filteroperator = $(filteritem).find('#filter2' + this.element.id);
                    var condition2 = $(filteritem).find('#filter3' + this.element.id);
                    condition.jqxDropDownList('hideListBox');
                    filteroperator.jqxDropDownList('hideListBox');
                    condition2.jqxDropDownList('hideListBox');
                }
            }
        },

        scrolloffset: function (top, left) {
            if (top == null || left == null || top == undefined || left == undefined)
                return;

            this.vScrollBar.jqxScrollBar('setPosition', top);
            this.hScrollBar.jqxScrollBar('setPosition', left);
        },

        scrollleft: function (left) {
            if (left == null || left == undefined)
                return;

            this.hScrollBar.jqxScrollBar('setPosition', left);
        },

        scrolltop: function (top) {
            if (top == null || top == undefined)
                return;

            this.vScrollBar.jqxScrollBar('setPosition', top);
        },

        beginupdate: function () {
            this._updating = true;
            this._datachanged = false;
        },

        endupdate: function () {
            this.resumeupdate();
        },

        resumeupdate: function () {
            this._updating = false;
            if (this._datachanged == true) {
                var verticalScrollValue = this.vScrollInstance.value;
                this.render(true, true, false);
                this._datachanged = false;
                if (verticalScrollValue != 0 && verticalScrollValue < this.vScrollInstance.max) {
                    this.scrolltop(verticalScrollValue);
                }
            }
            else {
                this.rendergridcontent(true);
                this._renderrows(this.virtualsizeinfo);
            }
        },

        updating: function () {
            return this._updating;
        },

        showloadelement: function () {
            if (this.renderloadelement) {
                this.dataloadelement.html(this.renderloadelement());
            }

            $(this.dataloadelement).css('visibility', 'visible');
            $(this.dataloadelement).css('display', 'block');
        },

        hideloadelement: function () {
            $(this.dataloadelement).css('visibility', 'hidden');
            $(this.dataloadelement).css('display', 'none');
        },

        databind: function (source) {
            if (this.host.css('display') == 'block') {
                $(this.dataloadelement).css('visibility', 'visible');
                $(this.dataloadelement).css('display', 'block');
                if (this.table != null)
                    this.table.css('visibility', 'hidden');
                this.dataloadelement.width(this.host.width());
                this.dataloadelement.height(this.host.height());
            }
            if (!this._initgroupsheader && this.groups.length > 0) {
                this.groups = new Array();
            }

            var me = this;
            if (source == null) {
                source = new Array();
            }

            if (!source.recordstartindex) {
                source.recordstartindex = 0;
            }
            if (!source.recordendindex) {
                source.recordendindex = 0;
            }
            if (source.loadallrecords == undefined || source.loadallrecords == null) {
                source.loadallrecords = true;
            }
            if (source.sortcomparer == undefined || source.sortcomparer == null) {
                source.sortcomparer = null;
            }
            if (source.filter == undefined || source.filter == null) {
                source.filter = null;
            }
            if (source.sort == undefined || source.sort == null) {
                source.sort = null;
            }
            if (source.data == undefined || source.data == null) {
                source.data = null;
            }

            this.dataview = this.dataview || new $.jqx.dataview();
            if ($.jqx.dataview.sort) {
                $.extend(this.dataview, new $.jqx.dataview.sort());
            }
            if ($.jqx.dataview.grouping) {
                $.extend(this.dataview, new $.jqx.dataview.grouping());
            }

            this.dataview.suspendupdate();
            this.dataview.pageable = this.pageable;
            this.dataview.groupable = this.groupable;
            this.dataview.groups = this.groups;
            this.dataview.virtualmode = this.virtualmode;
            this.dataview.grid = this;
            this._loading = true;

            this.dataview.update = function () {
                me._loading = false;
                if (me.dataview.isupdating()) {
                    me.dataview.resumeupdate(false);
                }
                if (me.pageable && me.pagerrenderer) {
                    if (me._initpager)
                        me._initpager();
                    else alert('jqxgrid.pager.js is not loaded.');
                }

                if (me.source.sortcolumn && me.sortby) {
                    me.render();
                    me.sortby(me.source.sortcolumn, me.source.sortdirection, me.source.sortcomparer);
                    me.source.sortcolumn = null;
                }
                else {
                    var datatype = me.source.datatype;
                    if (datatype != 'local' || datatype != 'array') {
                        var virtualheight = me.virtualsizeinfo == null || (me.virtualsizeinfo != null && me.virtualsizeinfo.virtualheight == 0);
                        if (!me.virtualmode || me.pageable || virtualheight) {
                            me._render(true, true, true, me.menuitemsarray && !me.virtualmode);
                        }
                        else {
                            if (me.virtualmode && me.dataview.totalrecords == 0 && me.dataview.filters.length > 0) {
                                me._render(true, true, true, me.menuitemsarray && !me.virtualmode);
                            }
                            else {
                                me._pagescache = new Array();
                                me._renderrows(me.virtualsizeinfo);
                            }
                        }
                    }
                }
                $(me.dataloadelement).css('visibility', 'hidden');
                $(me.dataloadelement).css('display', 'none');
                if (me.table != null) {
                    if ($.browser.msie && $.browser.version < 8) {
                        me.table.css('visibility', 'visible');
                    }
                    else {
                        me.table.css('visibility', 'inherit');
                    }
                }

                me._raiseEvent(11);
                if (!me.initializedcall) {
                    me._raiseEvent(0);
                    me.initializedcall = true;
                    if (me.ready) {
                        me.ready();
                    }
                    if ((me.width != null && me.width.toString().indexOf('%') != -1) || (me.height != null && me.height.toString().indexOf('%') != -1)) {
                        me._updatesize(true);
                    }

                    if (me.host.css('visibility') == 'hidden') {
                        var ie7 = $.browser.msie && $.browser.version < 8;

                        if (me.vScrollBar.css('visibility') == 'visible') {
                            me.vScrollBar.css('visibility', 'inherit');
                        }

                        if (me.hScrollBar.css('visibility') == 'visible') {
                            me.hScrollBar.css('visibility', 'inherit');
                        }

                        me._intervalTimer = setInterval(function () {
                            if (me.host.css('visibility') == 'visible') {
                                me._updatesize(true);
                                clearInterval(me._intervalTimer);
                            }
                        }, 100);
                    }
                }
                else me._updateTouchScrolling();
            }

            this.dataview.databind(source);

            if (this.dataview.isupdating()) {
                this.dataview.resumeupdate(false);
            }

            this._initializeRows();
        },

        scrollto: function (left, top) {
            if (undefined != left) {
                this.hScrollInstance.setPosition(left);
            }

            if (undefined != top) {
                this.vScrollInstance.setPosition(top);
            }
        },

        ensurerowvisible: function (index) {
            var pagesize = this._getpagesize();
            var pagenumber = Math.floor(index / pagesize);

            if (!this._pageviews[pagenumber] && !this.pageable) {
                this._updatepageviews();
            }

            var result = false;
            if (this.pageable && this.gotopage) {
                if (this.dataview.pagenum != pagenumber) {
                    this.gotopage(pagenumber);
                    result = true;
                }
            }

            var value = this.vScrollInstance.value;
            var height = this._gettableheight() - this.rowsheight;
            var rowindexinpage = pagesize * (index / pagesize - pagenumber);
            rowindexinpage = Math.round(rowindexinpage);

            if (this._pageviews[pagenumber]) {
                var top = this._pageviews[pagenumber].top;
                var rowposition = top + rowindexinpage * this.rowsheight;
                if (this.rowdetails) {
                    for (i = pagesize * pagenumber; i < index; i++) {
                        if (this.details[i].rowdetailshidden == false) {
                            rowposition += this.details[i].rowdetailsheight;
                        }
                    }
                }

                if (rowposition < value) {
                    this.scrolltop(rowposition);
                    result = true;
                }
                else if (rowposition > value + height + 2) {
                    this.scrolltop(rowposition - height);
                    result = true;
                }
            }
            else if (this.pageable) {
                var rowposition = rowindexinpage * this.rowsheight;
                if (this.rowdetails) {
                    for (i = pagesize * pagenumber; i < pagesize * pagenumber + rowindexinpage; i++) {
                        if (this.details[i].rowdetailshidden == false) {
                            rowposition += this.details[i].rowdetailsheight;
                        }
                    }
                }

                if (rowposition < value || rowposition > value + height) {
                    this.scrollto(0, rowposition);
                    result = true;
                }
            }
            return result;
        },

        ensurecellvisible: function (index, datafield) {
            var hvalue = this.hScrollBar.jqxScrollBar('value');
            var result = this.ensurerowvisible(index);
            var left = 0;
            var self = this;
            if (this.columns.records) {
                var value = hvalue;
                var gridwidth = this.host.width();
                var columnindex = 0;
                var vScrollOffset = this.vScrollBar.css('visibility') == 'visible' ? 20 : 0;
                var hresult = false;
                $.each(this.columns.records, function () {
                    if (this.datafield == datafield) {
                        var newleft = 0;
                        if (left + this.width > value + gridwidth - vScrollOffset) {
                            newleft = left + this.width - value - gridwidth + vScrollOffset;
                            self.scrollleft(newleft + value);
                            hresult = true;
                        }
                        else if (left <= value) {
                            newleft = left - this.width;
                            self.scrollleft(newleft);
                            hresult = true;
                        }

                        if (columnindex == 0) {
                            self.scrollleft(0);
                            hresult = true;
                        }
                        else if (columnindex == self.columns.records.length - 1) {
                            if (self.hScrollBar.css('visibility') == 'visible') {
                                self.scrollleft(self.hScrollBar.jqxScrollBar('max'));
                                hresult = true;
                            }
                        }
                        return false;
                    }
                    columnindex++;
                    left += this.width;
                });
                if (!hresult) {
                    self.scrollleft(value);
                }
            }
            return result;
        },

        setrowheight: function (index, height) {
            if (this._loading) {
                alert(this.loadingerrormessage);
                return false;
            }

            if (index == null || height == null)
                return false;

            this.heightboundrows[index] = { index: index, height: height };

            index = this.getrowvisibleindex(index);
            if (index < 0)
                return false;

            if (this.rows.records[index]) {
                this.rows.records[index].height = height;
            }
            else {
                row = new jqxGridRow(this, null);
                row.height = height;
                this.rows.replace(index, row);
            }
            this.heights[index] = height;

            this.rendergridcontent(true);
            return true;
        },

        getrowheight: function (index) {
            if (index == null)
                return null;

            index = this.getrowvisibleindex(index);
            if (index < 0)
                return false;

            if (this.rows.records[index]) {
                return this.rows.records[index].height;
            }
        },

        setrowdetails: function (index, details, height, hidden) {
            if (index == undefined || index == null || index < 0)
                return;

            var detailskey = this.dataview.generatekey();
            this.detailboundrows[index] = { index: index, details: { rowdetails: details, rowdetailsheight: height, rowdetailshidden: hidden, key: detailskey} };

            index = this.getrowvisibleindex(index);
            if (index < 0)
                return false;

            return this._setrowdetails(index, details, height, hidden, detailskey);
        },

        getcolumn: function (datafield) {
            var column = null;
            if (this.columns.records) {
                $.each(this.columns.records, function () {
                    if (this.datafield == datafield) {
                        column = this;
                        return false;
                    }
                });
            }
            return column;
        },

        _getcolumnindex: function (datafield) {
            var index = -1;
            if (this.columns.records) {
                $.each(this.columns.records, function () {
                    index++;
                    if (this.datafield == datafield) {
                        return false;
                    }
                });
            }
            return index;
        },

        _getcolumnat: function (index) {
            var column = this.columns.records[index];
            return column;
        },

        _getprevvisiblecolumn: function (index) {
            var self = this;
            while (index > 0) {
                index--;
                var column = self.getcolumnat(index);
                if (!column)
                    return null;

                if (!column.hidden)
                    return column;
            }
            return null;
        },

        _getnextvisiblecolumn: function (index) {
            var self = this;
            while (index < this.columns.records.length) {
                index++;
                var column = self.getcolumnat(index);

                if (!column)
                    return null;

                if (!column.hidden)
                    return column;
            }
            return null;
        },

        getcolumnat: function (index) {
            if (!isNaN(index)) {
                var column = this.columns.records[index];
                return column;
            }

            return null;
        },

        _getcolumn: function (datafield) {
            var column = null;
            $.each(this._columns, function () {
                if (this.datafield == datafield || this.dataField == datafield) {
                    column = this;
                    return false;
                }
            });
            return column;
        },

        _setcolumnproperty: function (datafield, propertyname, value) {
            if (datafield == null || propertyname == null || value == null)
                return null;

            var column = this.getcolumn(datafield);
            if (column == null)
                return;

            column[propertyname] = value;

            var _cachedcolumn = this._getcolumn(datafield);
            if (_cachedcolumn != null) {
                _cachedcolumn[propertyname] = value;
            }
            this._cellscache = new Array();

            switch (propertyname) {
                case "text":
                    this.prerenderrequired = true;
                    this._rendercolumnheaders();
                    if (this._groupsheader()) {
                        if (this._initgroupsheader) {
                            this._initgroupsheader();
                        }
                    }
                    break;
                case "hidden":
                case "hideable":
                case "renderer":
                case "cellsrenderer":
                case "align":
                case "cellsalign":
                case "cellsformat":
                case "pinned":
                case "contenttype":
                case "resizable":
                case "filterable":
                case "groupable":
                case "editable":
                case "cellclass":
                case "class":
                    this.prerenderrequired = true;
                    this.rendergridcontent(true);
                    if (this.updating()) {
                        return false;
                    }

                    this._renderrows(this.virtualsizeinfo);

                    break;
                case "width":
                case "minwidth":
                case "maxwidth":
                    if (this.updating()) {
                        return false;
                    }
                    this._updatecolumnwidths();
                    this._updatecellwidths();
                    this._renderrows(this.virtualsizeinfo);
                    break;
            }
        },

        _getcolumnproperty: function (datafield, propertyname) {
            if (datafield == null || propertyname == null)
                return null;

            var column = this.getcolumn(datafield);
            return column[propertyname];
        },

        // sets a property of a column.
        setcolumnproperty: function (datafield, propertyname, value) {
            this._setcolumnproperty(datafield, propertyname, value);
        },

        // gets the value of a column property.
        getcolumnproperty: function (datafield, propertyname) {
            return this._getcolumnproperty(datafield, propertyname);
        },

        // hides a column.
        hidecolumn: function (datafield) {
            this._setcolumnproperty(datafield, 'hidden', true);
        },

        // shows a column.
        showcolumn: function (datafield) {
            this._setcolumnproperty(datafield, 'hidden', false);
        },

        // gets column's hidden.
        iscolumnvisible: function (datafield) {
            return !this._getcolumnproperty(datafield, 'hidden');
        },

        // pins the column.
        pincolumn: function (datafield) {
            this._setcolumnproperty(datafield, 'pinned', true);
        },

        // unpins the column.
        unpincolumn: function (datafield) {
            this._setcolumnproperty(datafield, 'pinned', false);
        },

        iscolumnpinned: function (datafield) {
            return this._getcolumnproperty(datafield, 'pinned');
        },

        _setrowdetails: function (index, details, height, hidden, detailskey) {
            if (height == 0) {
                height = 100;
            }

            if (index == null || height == null)
                return false;

            if (detailskey != null) {
                this.details[index] = { rowdetails: details, rowdetailsheight: height, rowdetailshidden: hidden, detailskey: detailskey };
            }
            else {
                var olddetailskey = this.details[index] != null ? this.details[index].detailskey : null;
                var newdetails = { rowdetails: details, rowdetailsheight: height, rowdetailshidden: hidden, detailskey: olddetailskey };

                var me = this;

                for (var i = 0; i < this.detailboundrows.length; i++) {
                    if (this.detailboundrows[i] != undefined) {
                        var olddetails = this.detailboundrows[i];
                        if (olddetails.details.key == olddetailskey) {
                            olddetails.details.rowdetailsheight = newdetails.rowdetailsheight;
                            olddetails.details.rowdetailshidden = newdetails.rowdetailshidden;
                            olddetails.details.rowdetails = newdetails.rowdetails;
                            break;
                        }
                    }
                }
                this.details[index] = newdetails;
            }

            this.rendergridcontent(true);
            return true;
        },

        // gets the row details.
        getrowdetails: function (index) {
            if (index == null)
                return false;

            index = this.getrowvisibleindex(index);
            return this._getrowdetails(index);
        },


        _getrowdetails: function (index) {
            if (index == null)
                return false;

            if (index < 0)
                return false;

            if (this.details[index]) {
                return this.details[index];
            }
        },

        // gets all records count.
        getrecordscount: function () {
            return this.dataview.totalrecords;
        },

        // shows the row details.
        showrowdetails: function (index) {
            if (this._loading) {
                alert(this.loadingerrormessage);
                return false;
            }
            if (index == null)
                return false;

            index = this.getrowvisibleindex(index);
            if (index < 0)
                return false;

            var details = this._getrowdetails(index);
            return this._setrowdetailsvisibility(index, details, false);
        },

        // hides the row details.
        hiderowdetails: function (index) {
            if (this._loading) {
                alert(this.loadingerrormessage);
                return false;
            }

            index = this.getrowvisibleindex(index);
            if (index < 0)
                return false;

            var details = this._getrowdetails(index);
            return this._setrowdetailsvisibility(index, details, true);
        },

        _togglerowdetails: function (row) {
            var index = row.visibleindex;
            var details = this._getrowdetails(index);
            if (details != null) {
                var hidden = !details.rowdetailshidden;
                return this._setrowdetailsvisibility(index, details, hidden);
            }
            return false;
        },

        _setrowdetailsvisibility: function (index, details, hidden) {
            if (details != null) {
                this.details[index].rowdetailshidden = hidden;
            }
            else {
                return false;
            }

            var newdetails = this.details[index];
            if (hidden) {
                this._raiseEvent(21, { rowindex: index, details: newdetails.rowdetails, height: newdetails.rowdetailsheight });
            }
            else {
                this._raiseEvent(20, { rowindex: index, details: newdetails.rowdetails, height: newdetails.rowdetailsheight });
            }
            return this._setrowdetails(index, newdetails.rowdetails, newdetails.rowdetailsheight, newdetails.rowdetailshidden);
        },

        // gets the row's visible index.
        getrowvisibleindex: function (boundindex) {
            if (boundindex == undefined || boundindex == null || boundindex < 0)
                return false;

            if (this.virtualmode) {
                var row = this.dataview.loadedrecords[boundindex];
                if (row == undefined) {
                    return -1;
                }
                return row.visibleindex;
            }

            var row = this.dataview.bounditems[boundindex];
            if (row == undefined) {
                return -1;
            }

            return row.visibleindex;
        },

        // hides a row.
        hiderow: function (index) {
            if (this._loading) {
                alert(this.loadingerrormessage);
                return false;
            }

            if (index == undefined || index == null || index < 0)
                return false;

            if (index == null)
                return false;

            this.hiddenboundrows[index] = { index: index, hidden: true };
            index = this.getrowvisibleindex(index);

            return this._setrowvisibility(index, true);
        },

        // shows a row.
        showrow: function (index) {
            if (this._loading) {
                alert(this.loadingerrormessage);
                return false;
            }

            if (index == undefined || index == null || index < 0)
                return false;

            if (index == null)
                return false;

            this.hiddenboundrows[index] = { index: index, hidden: false };
            index = this.getrowvisibleindex(index);

            return this._setrowvisibility(index, false);
        },
        // is row hidden
        isrowhiddenat: function (index) {
            if (index == null)
                return null;

            index = this.getrowvisibleindex(index);

            if (this.rows.records[index]) {
                return this.rows.records[index].hidden;
            }
        },

        _setrowvisibility: function (index, hidden, refresh) {
            if (index == null)
                return false;

            this.hiddens[index] = hidden;

            if (refresh == undefined || refresh) {
                this.rendergridcontent(true);
                return true;
            }
            return false;
        },

        _loadrows: function () {
            if (!this._pageviews[this.dataview.pagenum] && !this.pageable)
                return;

            var top = !this.pageable ? this._pageviews[this.dataview.pagenum].top : 0;
            if (!this.pageable && this._pagescache[this.dataview.pagenum] != undefined) {
                return null;
            }

            if (!this.virtualsizeinfo) {
                return;
            }

            var self = this;
            var storage = new Array();
            var datastorage = new Array();
            var hasgroups = self.groupable && self.groups.length > 0;
            var totalrows = this.dataview.totalrecords;
            var virtualheight = this.virtualsizeinfo.virtualheight;
            var rowindex = 0;

            this.rows.beginupdate();
            var pagesize = this.dataview.pagesize;
            if (this.pageable && hasgroups) {
                pagesize = this.dataview.rows.length;
            }

            for (i = 0; i < pagesize; i++) {
                if (i >= this.dataview.rows.length)
                    break;

                var datarow = this.dataview.rows[i];
                var row = null;
                if (!self.rows.records[datarow.visibleindex]) {
                    row = new jqxGridRow(self, datarow);
                }
                else {
                    row = self.rows.records[datarow.visibleindex];
                    row.setdata(datarow);
                }

                row.hidden = this.hiddens[row.visibleindex];
                var details = this.details[row.visibleindex];
                if (details) {
                    row.rowdetails = details.rowdetails;
                    row.rowdetailsheight = details.rowdetailsheight;
                    row.rowdetailshidden = details.rowdetailshidden;
                }
                else row.rowdetails = null;

                if (hasgroups && this.pageable && row.parentbounddata != null) {
                    var parentrow = storage[row.parentbounddata.uniqueid];
                    if (parentrow != null) {
                        var groupstate = this._findgroupstate(parentrow.uniqueid);

                        if (this._setsubgroupsvisibility) {
                            this._setsubgroupsvisibility(this, row.parentbounddata, !groupstate, false);
                        }

                        row.hidden = this.hiddens[row.visibleindex];
                    }

                    if (parentrow != null && parentrow != undefined) {
                        row.parentrow = parentrow;
                        parentrow.subrows[parentrow.subrows.length++] = row;
                    }
                }

                if (row.hidden)
                    continue;

                var num = datarow.visibleindex;
                if (!this.heights[num]) {
                    this.heights[num] = this.rowsheight;
                }

                row.height = this.heights[num];

                if (this.rowdetails) {
                    if (row.rowdetails && !row.rowdetailshidden) {
                        row.height += row.rowdetailsheight;
                    }
                }

                storage[row.uniqueid] = row;
                datastorage[rowindex++] = row;

                row.top = top;
                top += row.height;

                var recordindex = num;
                self.rows.replace(recordindex, row);
            }

            this.rows.resumeupdate();

            if (datastorage.length > 0) {
                this._pagescache[this.dataview.pagenum] = datastorage;
            }
        },

        _gettableheight: function () {
            if (this.tableheight != undefined)
                return this.tableheight;

            var realheight = this.host.height();

            if (this.columnsheader) {
                var columnheaderheight = this.columnsheader.outerHeight();
                if (!this.showheader) {
                    columnheaderheight = 0;
                }
            }

            realheight -= columnheaderheight;

            if (this.hScrollBar.css('visibility') == 'visible') {
                realheight -= this.hScrollBar.outerHeight();
            }

            if (this.pageable) {
                realheight -= this.pager.outerHeight();
            }

            if (this._groupsheader()) {
                realheight -= this.groupsheader.outerHeight();
            }

            if (this.showtoolbar) {
                realheight -= this.toolbarheight;
            }

            if (this.showstatusbar) {
                realheight -= this.statusbarheight;
            }

            if (realheight > 0) {
                this.tableheight = realheight;
                return realheight;
            }

            return this.host.height();
        },

        _getpagesize: function () {
            if (this.pageable) {
                return this.pagesize;
            }

            if (this.virtualmode) {
                var hostHeight = Math.round(this.host.height()) + 2 * this.rowsheight;

                var visiblerecords = Math.round(hostHeight / this.rowsheight);
                return visiblerecords;
            }

            if (this.autoheight) {
                if (this.dataview.totalrows == 0)
                    return 1;
                return this.dataview.totalrows;
            }

            if (this.dataview.totalrows < 100 && this.dataview.totalrecords < 100 && this.dataview.totalrows > 0) {
                return this.dataview.totalrows;
            }

            return 100;
        },

        _calculatevirtualheight: function () {
            var self = this;

            var hostHeight = Math.round(this.host.height()) + 2 * this.rowsheight;
            realheight = this._gettableheight();
            var visiblerecords = Math.round(hostHeight / this.rowsheight);

            this.heights = new Array();
            this.hiddens = new Array();
            this.details = new Array();
            this.expandedgroups = new Array();

            this.hiddenboundrows = new Array();
            this.heightboundrows = new Array();
            this.detailboundrows = new Array();

            var totalrows = Math.max(this.dataview.totalrows, this.dataview.totalrecords);
            if (this.pageable) {
                totalrows = this.pagesize;
                if (this.pagesize > Math.max(this.dataview.totalrows, this.dataview.totalrecords) && this.autoheight) {
                    totalrows = Math.max(this.dataview.totalrows, this.dataview.totalrecords);
                }
            }

            var virtualheight = totalrows * this.rowsheight;
            var top = 0;
            var index = 0;
            var lasttop = 0;
            var pagesize = this._getpagesize();
            var pageheight = pagesize * this.rowsheight;
            var i = 0;
            while (i <= totalrows + pagesize) {
                top += pageheight;
                if (i - pagesize < totalrows && i >= totalrows) {
                    var rows = i - totalrows;
                    if (rows > 0) {
                        lasttop -= pageheight;
                        this._pageviews[index - 1] = { top: lasttop, height: pageheight - rows * this.rowsheight };
                    }
                    break;
                }
                else {
                    this._pageviews[index++] = { top: lasttop, height: pageheight };
                }
                lasttop = top;
                i += pagesize;
            }

            this.vScrollBar.jqxScrollBar({ value: 0 });
            if (virtualheight > realheight && !this.autoheight) {
                this.vScrollBar.css('visibility', 'visible');
                this.vScrollBar.jqxScrollBar({ max: virtualheight - realheight });
            }
            else {
                this.vScrollBar.css('visibility', 'hidden');
            }

            this.dataview.pagesize = pagesize;
            this.dataview.updateview();
            return { visiblerecords: visiblerecords, virtualheight: virtualheight };
        },

        _updatepageviews: function () {
            if (this.updating())
                return;
            this._pagescache = new Array();
            this._pageviews = new Array();
            this.tableheight = null;
            var self = this;
            var hostHeight = Math.round(this.host.height()) + 2 * this.rowsheight;
            var visiblerecords = Math.round(hostHeight / this.rowsheight);
            var totalrows = Math.max(this.dataview.totalrows, this.dataview.totalrecords);
            var virtualheight = totalrows * this.rowsheight;
            var top = 0;
            var currentheight = 0;
            var index = 0;
            var lasttop = 0;
            var k = 0;
            var pagesize = this._getpagesize();

            if (!this.pageable) {
                for (i = 0; i < totalrows; i++) {
                    var rowinfo = { index: i, height: this.heights[i], hidden: this.hiddens[i], details: this.details[i] }
                    if (this.heights[i] == undefined) {
                        this.heights[i] = this.rowsheight;
                        rowinfo.height = this.rowsheight;
                    }
                    if (this.hiddens[i] == undefined) {
                        this.hiddens[i] = false;
                        rowinfo.hidden = false;
                    }
                    if (this.details[i] == undefined) {
                        this.details[i] = null;
                    }
                    if (rowinfo.height != self.rowsheight) {
                        virtualheight -= self.rowsheight;
                        virtualheight += rowinfo.height;
                    }

                    if (rowinfo.hidden) {
                        virtualheight -= rowinfo.height;
                    }
                    else {
                        currentheight += rowinfo.height;
                        var detailsheight = 0;
                        if (this.rowdetails) {
                            if (rowinfo.details && rowinfo.details.rowdetails && !rowinfo.details.rowdetailshidden) {
                                detailsheight = rowinfo.details.rowdetailsheight;
                                currentheight += detailsheight;
                                virtualheight += detailsheight;
                            }
                        }
                        top += rowinfo.height + detailsheight;
                    }

                    k++;
                    if (k >= pagesize || i == totalrows - 1) {
                        this._pageviews[index++] = { top: lasttop, height: currentheight };
                        currentheight = 0;
                        lasttop = top;
                        k = 0;
                    }
                }
            }
            else {
                if (this._updatepagedview) {
                    virtualheight = this._updatepagedview(totalrows, virtualheight, 0);
                }
                if (this.autoheight) {
                    this._arrange();
                }
            }

            var tableheight = this._gettableheight();
            if (virtualheight > tableheight) {
                if (this.pageable && this.gotopage) {
                    virtualheight = this._pageviews[0].height; // -this._gettableheight();
                    if (virtualheight < 0) {
                        virtualheight = this._pageviews[0].height;
                    }
                }

                if (this.vScrollBar.css('visibility') != 'visible') {
                    this.vScrollBar.css('visibility', 'visible');
                }
                if (virtualheight <= tableheight || this.autoheight) {
                    this.vScrollBar.css('visibility', 'hidden');
                }

                if (virtualheight - tableheight > 0) {
                    var max = virtualheight - tableheight;
                    this.vScrollBar.jqxScrollBar({ max: max });
                }
                else {
                    this.vScrollBar.jqxScrollBar({ value: 0, max: virtualheight });
                }
            }
            else {
                this.vScrollBar.css('visibility', 'hidden');
                this.vScrollBar.jqxScrollBar({ value: 0 });
            }

            this._arrange();

            if (this.autoheight) {
                visiblerecords = Math.round(this.host.height() / this.rowsheight);
            }

            this.virtualsizeinfo = { visiblerecords: visiblerecords, virtualheight: virtualheight };
        },

        updatebounddata: function () {
            this.databind(this.source);
        },

        refreshdata: function () {
            this._refreshdataview();
            this.render();
        },

        _refreshdataview: function () {
            this.dataview.refresh();
        },

        refresh: function (initialRefresh) {
            if (initialRefresh != true) {
                if (this.virtualsizeinfo != null) {
                    //   this._requiresupdate = true;
                    this._cellscache = new Array();
                    this._renderrows(this.virtualsizeinfo);
                    this._updatesize();
                }
            }
        },

        render: function () {
            this._render(true, true, true, true);
        },

        clear: function () {
            this.databind(null);
            this.render();
        },

        _render: function (initialization, forceupdate, rendercolumns, rendermenu) {
            if (this.dataview == null)
                return;

            if (this.editcell != null && this.endcelledit) {
                this.endcelledit(this.editcell.row, this.editcell.column, true, false);
            }
            this._removeHandlers();
            this._addHandlers();
            this._initializeRows();

            this._requiresupdate = forceupdate != undefined ? forceupdate : true;

            if (rendercolumns) {
                if (!this._requiresupdate) {
                    if (rendermenu != false) {
                        this._initmenu();
                    }
                }

                if (this.columns == null) {
                    this.columns = new $.jqx.collection(this.element);
                }
                else {
                    this._initializeColumns();
                }
            }

            this.tableheight = null;
            this._pagescache = new Array();
            this._pageviews = new Array();

            if (this._requiresupdate) {
                this._clearcaches();
                if (rendermenu != false) {
                    this._initmenu();
                }
            }

            this.virtualsizeinfo = null;
            this.prerenderrequired = true;

            if (this.groupable && this.groups.length > 0 && this.rowdetails) {
                this.gridcontent.html('');
                this.gridcontent = null;
            }

            if (rendercolumns) {
                this.content.html('');
                this.columnsheader = this.columnsheader || $('<div style="overflow: hidden;"></div>');
                this.columnsheader.remove();
                this.columnsheader.addClass(this.toTP('jqx-widget-header'));
                this.columnsheader.addClass(this.toTP('jqx-grid-header'));
            }
            else {
                if (this.gridcontent) {
                    this.gridcontent.html('');
                }
            }

            if (!this.showheader) {
                this.columnsheader.css('display', 'none');
            }
            else {
                if (this.columnsheader) {
                    this.columnsheader.css('display', 'block');
                }
            }

            this.gridcontent = this.gridcontent || $('<div style="width: 100%; overflow: hidden; position: absolute;"></div>');
            this.gridcontent.remove();
            this.columnsheader.height(this.columnsheight);
            this.content.append(this.columnsheader);
            this.content.append(this.gridcontent);
            this._arrange();

            if (this._initgroupsheader) {
                this._initgroupsheader();
            }

            this.selectionarea = this.selectionarea || $("<div style='z-index: 99999; visibility: hidden; position: absolute;'></div>");
            this.selectionarea.addClass(this.toThemeProperty('jqx-grid-selectionarea'));
            this.selectionarea.addClass(this.toThemeProperty('jqx-fill-state-pressed'));
            this.content.append(this.selectionarea);
            this.tableheight = null;

            this.rendergridcontent(false, rendercolumns);
            if (this.groups.length > 0 && this.groupable) {
                this.suspendgroupevents = true;
                if (this.collapseallgroups) {
                    if (!this.groupsexpandedbydefault) {
                        this.collapseallgroups();
                        this._updatescrollbarsafterrowsprerender();
                    }
                    else {
                        this.expandallgroups();
                    }
                }
                this.suspendgroupevents = false;
            }

            if (this.pageable && this.updatepagerdetails) {
                this.updatepagerdetails();
                if (this.autoheight) {
                    this._updatepageviews();
                }
            }
            this._updateTouchScrolling();

            // callback when the rendering is complete.
            if (this.rendered) {
                this.rendered();
            }
        },

        rendergridcontent: function (requiresupdate, rendercolumns) {
            if (this.updating()) {
                return false;
            }

            if (requiresupdate == undefined || requiresupdate == null) {
                requiresupdate = false;
            }

            this._requiresupdate = requiresupdate;

            var prerender = this.prerenderrequired;
            if (this.prerenderrequired) {
                this._arrange();
            }

            var me = this;
            var rendercolumns = rendercolumns;
            if (rendercolumns == null || rendercolumns == undefined) {
                rendercolumns = true;
            }

            this.tableheight = null;
            me.virtualsizeinfo = me.virtualsizeinfo || me._calculatevirtualheight();
            if (me.pageable && !me.autoheight) {
                if (me.dataview.totalrows < me.pagesize) {
                    me._requiresupdate = true;
                }
            }

            if (rendercolumns) {
                me._rendercolumnheaders();
            }
            else {
                if (this._rendersortcolumn) {
                    this._rendersortcolumn();
                }
                if (this._renderfiltercolumn) {
                    this._renderfiltercolumn();
                }
            }

            me._renderrows(me.virtualsizeinfo);

            if (this.gridcontent[0].scrollTop != 0) {
                this.gridcontent[0].scrollTop = 0;
            }

            if (this.gridcontent[0].scrollLeft != 0) {
                this.gridcontent[0].scrollLeft = 0;
            }

            if (prerender) {
                var tableheight = this.tableheight;
                this._arrange();
                if (tableheight != this.tableheight && this.autoheight) {
                    me._renderrows(me.virtualsizeinfo);
                }
            }

            return true;
        },

        _updatecolumnwidths: function () {
            var totalwidth = this.host.width();
            var allcharacters = '';
            if (this.columns == undefined || this.columns.records == undefined)
                return;

            $.each(this.columns.records, function (i, value) {
                if (!(this.hidden && this.hideable)) {
                    if (this.width != 'auto' && !this._width) {
                        totalwidth -= this.width;
                    }
                    else {
                        allcharacters += this.text;
                    }
                }
            });

            var tableheight = this._gettableheight();

            if (this.virtualsizeinfo && this.virtualsizeinfo.virtualheight > tableheight) {
                if (this.groupable && this.groups.length > 0) {
                    if (this.dataview && this.dataview.loadedrootgroups && !this.groupsexpandedbydefault) {
                        var groupsheight = this.dataview.loadedrootgroups.length * this.rowsheight;
                        if (groupsheight > tableheight) {
                            totalwidth -= this.scrollbarsize + 5;
                        }
                    }
                    else {
                        totalwidth -= this.scrollbarsize + 5;
                    }
                }
                else {
                    totalwidth -= this.scrollbarsize + 5;
                }
            }

            var columnheader = this.columnsheader.find('#columntable' + this.element.id);
            if (columnheader.length == 0)
                return;

            var columns = columnheader.find('.jqx-grid-column-header');
            var left = 0;
            $.each(this.columns.records, function (i, value) {
                var column = $(columns[i]);
                if (this.width != 'auto' && !this._width) {
                    column.width(this.width);
                }
                else {
                    var width = Math.round(totalwidth * (this.text.length / allcharacters.length));
                    if (isNaN(width)) {
                        width = this.minwidth;
                    }

                    if (width < 0) {
                        $element = $('<span>' + this.text + '</span>');
                        $(document.body).append($element);
                        width = 10 + $element.width();
                        $element.remove();
                    }
                    if (width < this.minwidth)
                        width = this.minwidth;
                    if (width > this.maxwidth) {
                        width = this.maxwidth;
                    }

                    this._width = 'auto';
                    this.width = width;
                    column.width(this.width);
                }
                column.css('left', left);

                if (!(this.hidden && this.hideable)) {
                    left += this.width;
                }

                this._requirewidthupdate = true;
            });
            this.columnsheader.width(2 + left);
        },

        _rendercolumnheaders: function () {
            var self = this;

            if (!this.prerenderrequired) {
                if (this._rendersortcolumn) {
                    this._rendersortcolumn();
                }
                if (this._renderfiltercolumn) {
                    this._renderfiltercolumn();
                }
                return;
            }

            this._columnsbydatafield = new Array();
            this.columnsheader.find('#columntable' + this.element.id).remove();
            var columnheader = $('<div id="columntable' + this.element.id + '" style="height: 100%; position: relative;"></div>')
            columnheader[0].cells = new Array();

            var k = 0;
            var left = 0;

            var allcharacters = "";
            var totalwidth = this.host.width();

            var pinnedcolumns = new Array();
            var normalcolumns = new Array();

            $.each(this.columns.records, function (i, value) {
                if (!(this.hidden && this.hideable)) {
                    if (this.width != 'auto' && !this._width) {
                        if (this.width < this.minwidth && this.minwidth != 'auto') {
                            totalwidth -= this.minwidth;
                        }
                        else if (this.width > this.maxwidth && this.maxwidth != 'auto') {
                            totalwidth -= this.maxwidth;
                        }
                        else {
                            totalwidth -= this.width;
                        }
                    }
                    else {
                        allcharacters += this.text;
                    }
                }
                if (this.pinned) {
                    pinnedcolumns[pinnedcolumns.length] = this;
                }
                else {
                    normalcolumns[normalcolumns.length] = this;
                }
            });

            for (i = 0; i < pinnedcolumns.length; i++) {
                this.columns.replace(i, pinnedcolumns[i]);
            }
            for (j = 0; j < normalcolumns.length; j++) {
                this.columns.replace(pinnedcolumns.length + j, normalcolumns[j]);
            }
            var zindex = this.headerZIndex;
            var groupslength = self.groupable ? self.groups.length : 0;
            if (this.rowdetails && this.showrowdetailscolumn) {
                groupslength++;
            }

            var headerheight = self.columnsheader.height();
            var tableheight = this._gettableheight();

            if (this.virtualsizeinfo && this.virtualsizeinfo.virtualheight > tableheight) {
                if (this.groupable && this.groups.length > 0) {
                    if (this.dataview && this.dataview.loadedrootgroups && !this.groupsexpandedbydefault) {
                        var groupsheight = this.dataview.loadedrootgroups.length * this.rowsheight;
                        if (groupsheight > tableheight) {
                            totalwidth -= this.scrollbarsize + 5;
                        }
                    }
                    else {
                        totalwidth -= this.scrollbarsize + 5;
                    }
                }
                else {
                    if (!this.autoheight) {
                        totalwidth -= this.scrollbarsize + 5;
                    }
                }
            }

            $.each(this.columns.records, function (i, value) {
                var column = $('<div style="position: absolute; height: 100%;"></div>');
                column.addClass(self.toTP('jqx-grid-column-header'));
                column.addClass(self.toTP('jqx-widget-header'));

                if (this.classname != '' && this.classname) {
                    column.addClass(this.classname);
                }

                column.css('z-index', zindex--);
                var desiredwidth = this.width;

                if (this.width != 'auto' && !this._width) {
                    if (desiredwidth < this.minwidth && this.minwidth != 'auto') {
                        desiredwidth = this.minwidth;
                    }
                    if (desiredwidth > this.maxwidth && this.maxwidth != 'auto') {
                        desiredwidth = this.maxwidth;
                    }

                    column.width(desiredwidth);
                }
                else {
                    var width = Math.round(totalwidth * (this.text.length / allcharacters.length));
                    if (isNaN(width)) {
                        width = this.minwidth;
                    }

                    if (width < 0) {
                        $element = $('<span>' + this.text + '</span>');
                        $(document.body).append($element);
                        width = 10 + $element.width();
                        $element.remove();
                    }
                    if (width < this.minwidth)
                        width = this.minwidth;
                    if (width > this.maxwidth) {
                        width = this.maxwidth;
                    }

                    this._width = 'auto';
                    this.width = width;
                    desiredwidth = this.width;
                    column.width(this.width);
                }

                if (this.hidden && this.hideable) {
                    column.css('display', 'none');
                }

                var columncontentcontainer = $('<div style="height: 100%; width: 100%;"></div>');

                var columnsmenu = $('<div style="display: none; left: 100%; top: 0%; position: absolute;"></div>');
                var menuinnerelement = $('<div style="width: 100%; height:100%;"></div>');
                menuinnerelement.addClass(self.toTP('jqx-grid-column-menubutton'));
                menuinnerelement.appendTo(columnsmenu);
                columnsmenu.height(headerheight);
                if (!self.enableanimations) {
                    columnsmenu.css('margin-left', -16);
                }

                var sortasc = $('<div class="sortasc" style="float: right; display: none; width: 16px;"><div style="width: 100%; height:100%;"></div></div>');
                var sortdesc = $('<div class="sortdesc" style="float: right; display: none; width: 16px;"><div style="width: 100%; height:100%;"></div></div>');
                var filtericon = $('<div class="filtericon" style="float: right; display: none; width: 16px;"><div style="width: 100%; height:100%;"></div></div>');

                if (!self.autoshowfiltericon && this.filterable) {
                    filtericon.css('display', 'block');
                }

                sortasc.height(headerheight);
                sortdesc.height(headerheight);
                filtericon.height(headerheight);

                sortasc.find('div').addClass(self.toTP('jqx-grid-column-sortascbutton'));
                sortdesc.find('div').addClass(self.toTP('jqx-grid-column-sortdescbutton'));
                filtericon.find('div').addClass(self.toTP('jqx-grid-column-filterbutton'));

                this.sortasc = sortasc[0];
                this.sortdesc = sortdesc[0];
                this.filtericon = filtericon[0];
                this.columnsmenu = columnsmenu[0];
                columnheader[0].cells[i] = column[0];
                columnsmenu.width(self.columnsmenuwidth);
                var showcolumnsmenu = self.columnsmenu;
                var shouldhandledragdrop = false;
                var detailscolumn = false;

                if ((self.groupable && groupslength > 0 && k < groupslength) || (self.rowdetails && k < groupslength)) {
                    k++;
                    showcolumnsmenu &= false;
                    this.sortable = false;
                    this.editable = false;
                    detailscolumn = true;
                }
                else {
                    var columnContent = this.renderer != null ? this.renderer(this.text, this.align) : self._rendercolumnheader(this.text, this.align);
                    if (columnContent == null) {
                        columnContent = self._rendercolumnheader(this.text, this.align);
                    }
                    showcolumnsmenu &= true;
                    shouldhandledragdrop = true;
                }
                columncontentcontainer.append(columnContent);

                if (columnContent != null) {
                    var iconscontainer = $('<div class="iconscontainer" style="margin-left: -32px; display: block; position: absolute; left: 100%; top: 0%; width: 32px;"></div>');
                    columnsmenu.addClass(self.toTP('jqx-widget-header'));
                    iconscontainer.height(headerheight);
                    columncontentcontainer.append(iconscontainer);
                    iconscontainer.append(filtericon);
                    iconscontainer.append(sortasc);
                    iconscontainer.append(sortdesc);
                    sortdesc.addClass(self.toTP('jqx-widget-header'));
                    sortasc.addClass(self.toTP('jqx-widget-header'));
                    filtericon.addClass(self.toTP('jqx-widget-header'));
                    this.iconscontainer = iconscontainer;
                }

                if (showcolumnsmenu) {
                    self._handlecolumnsmenu(self, columncontentcontainer, column, columnsmenu, this);
                }

                column.append(columncontentcontainer);
                columnheader.append(column);

                if (self.groupable && shouldhandledragdrop) {
                    column[0].id = self.dataview.generatekey();
                    if (self._handlecolumnstogroupsdragdrop) {
                        self._handlecolumnstogroupsdragdrop(this, column);
                    }
                    else alert('jqxgrid.grouping.js is not loaded');
                }

                var columnitem = this;
                self.addHandler(column, 'click', function (event) {
                    if (self.sorttogglestates > 0 && self._togglesort) {
                        self._togglesort(columnitem);
                    }
                    event.preventDefault();
                    self._raiseEvent(7, { column: columnitem.getcolumnproperties(), datafield: columnitem.datafield, originalEvent: event });
                });

                if (columnitem.resizable && self.columnsresize && !detailscolumn) {
                    var isTouchDevice = false;
                    var eventname = 'mousemove';
                    if (self.isTouchDevice()) {
                        isTouchDevice = true;
                        eventname = 'touchstart';
                    }
                    self.addHandler(column, eventname, function (event) {
                        var pagex = parseInt(event.pageX);
                        var offset = 5;
                        var columnleft = parseInt(column.offset().left);
                        if (self._handlecolumnsresize) {
                            if (isTouchDevice) {
                                var touches = self.getTouches(event);
                                var touch = touches[0];
                                pagex = touch.pageX;
                                offset = 40;
                                if (pagex >= columnleft + columnitem.width - offset) {
                                    self.resizablecolumn = { columnelement: column, column: columnitem };
                                    column.css('cursor', "col-resize");
                                }
                                else {
                                    column.css('cursor', "");
                                    self.resizablecolumn = null;
                                }
                                return true;
                            }

                            if (pagex >= columnleft + columnitem.width - offset) {
                                if (pagex <= columnleft + columnitem.width + offset) {
                                    self.resizablecolumn = { columnelement: column, column: columnitem };
                                    column.css('cursor', "col-resize");
                                    return false;
                                }
                            }
                            else {
                                column.css('cursor', "");
                                self.resizablecolumn = null;
                            }
                        }
                    });
                }

                column.css('left', left);

                if (!(this.hidden && this.hideable)) {
                    left += desiredwidth;
                }
            });

            if (left > 0) {
                this.columnsheader.width(2 + left);
            }
            else {
                this.columnsheader.width(left);
            }

            this.columnsrow = columnheader;
            self.columnsheader.append(columnheader);
            columnheader.width(left);
            if (this._handlecolumnsdragdrop) {
                this._handlecolumnsdragdrop();
            }
            if (this._rendersortcolumn) {
                this._rendersortcolumn();
            }
            if (this._renderfiltercolumn) {
                this._renderfiltercolumn();
            }
            if (this._handlecolumnsresize) {
                this._handlecolumnsresize();
            }
        },

        _handlecolumnsmenu: function (self, columncontentcontainer, column, columnsmenu, columnitem) {
            self.dragmousedown = null;
            columnsmenu[0].id = self.dataview.generatekey();

            columncontentcontainer.append(columnsmenu);
            column[0].columnsmenu = columnsmenu[0];
            var menuoffset = 16;

            var showcolumnsmenu = function () {
                if (!self.resizing) {
                    if (self.menuitemsarray.length > 0) {
                        if (!self.enableanimations) {
                            columnsmenu.css('display', 'block');
                            columnitem.iconscontainer.css('margin-left', '-48px');
                        }
                        else {
                            columnsmenu.css('display', 'block');
                            columnsmenu.animate({
                                'margin-left': -menuoffset
                            }, 'fast');
                            columnitem.iconscontainer.animate({
                                'margin-left': -48
                            }, 'fast');
                        }
                    }
                }
            }

            self.addHandler(column, 'mouseenter', function (event) {
                showcolumnsmenu();
            });

            self.addHandler(column, 'mouseleave', function (event) {
                if (self.menuitemsarray.length > 0) {
                    var menu = $.data(document.body, "contextmenu" + self.element.id);
                    if (menu != undefined && columnsmenu[0].id == menu.columnsmenu.id) {
                        return;
                    }

                    if (!self.enableanimations) {
                        columnsmenu.css('display', 'none');
                        columnitem.iconscontainer.css('margin-left', '-32px');
                    }
                    else {
                        columnsmenu.css('margin-left', -menuoffset);
                        columnsmenu.animate({
                            'margin-left': 0
                        }, 'fast', function () {
                            columnsmenu.css('display', 'none');
                        });
                        columnitem.iconscontainer.animate({
                            'margin-left': -32
                        }, 'fast');
                    }
                }
            });

            var canopen = true;
            var openedmenu = "";
            var $filtericon = $(columnitem.filtericon);

            self.addHandler(columnsmenu, 'mousedown', function (event) {
                canopen = !$.data(self.gridmenu[0], 'contextMenuOpened' + self.gridmenu[0].id);
                openedmenu = $.data(document.body, "contextmenu" + self.element.id);
                if (openedmenu != null) {
                    openedmenu = openedmenu.column.datafield;
                }
            });

            self.addHandler($filtericon, 'mousedown', function (event) {
                canopen = !$.data(self.gridmenu[0], 'contextMenuOpened' + self.gridmenu[0].id);
                openedmenu = $.data(document.body, "contextmenu" + self.element.id);
                if (openedmenu != null) {
                    openedmenu = openedmenu.column.datafield;
                }

            });

            var opencolumnsmenu = function () {
                var offset = columnsmenu.offset();
                var top = columnsmenu.height();

                if (!canopen) {
                    canopen = true;

                    if (openedmenu == columnitem.datafield) {
                        self._closemenu();
                        return false;
                    }
                }


                if (self.host.width() > parseInt(offset.left) + self.gridmenu.width()) {
                    self.gridmenu.jqxMenu('open', offset.left, offset.top + top);
                }
                else {
                    self.gridmenu.jqxMenu('open', columnsmenu.width() + offset.left - self.gridmenu.width(), offset.top + top);
                }

                self._hasOpenedMenu = true;

                var sortascmenuitem = self._getmenuitembyindex(0);
                var sortdescmenuitem = self._getmenuitembyindex(1);
                var sortremovemenuitem = self._getmenuitembyindex(2);
                var groupmenuitem = self._getmenuitembyindex(3);
                var groupremoveitem = self._getmenuitembyindex(4);
                var filteritem = self._getmenuitembyindex(5);

                if (sortascmenuitem != null && sortdescmenuitem != null && sortremovemenuitem != null) {
                    var sortable = columnitem.sortable && self.sortable;
                    self.gridmenu.jqxMenu('disable', sortascmenuitem.id, !sortable);
                    self.gridmenu.jqxMenu('disable', sortdescmenuitem.id, !sortable);
                    self.gridmenu.jqxMenu('disable', sortremovemenuitem.id, !sortable);

                    if (columnitem.datafield) {
                        if (self.sortcolumn == columnitem.datafield) {
                            var sortinfo = self.getsortinformation();
                            if (sortable) {
                                if (sortinfo.sortdirection.ascending) {
                                    self.gridmenu.jqxMenu('disable', sortascmenuitem.id, true);
                                }
                                else {
                                    self.gridmenu.jqxMenu('disable', sortdescmenuitem.id, true);
                                }
                            }
                        }
                        else {
                            self.gridmenu.jqxMenu('disable', sortremovemenuitem.id, true);
                        }
                    }
                }
                if (groupmenuitem != null && groupremoveitem != null) {
                    if (!self.groupable || !columnitem.groupable) {
                        self.gridmenu.jqxMenu('disable', groupremoveitem.id, true);
                        self.gridmenu.jqxMenu('disable', groupmenuitem.id, true);
                    }
                    else {
                        if (self.groups && self.groups.indexOf(columnitem.datafield) != -1) {
                            self.gridmenu.jqxMenu('disable', groupmenuitem.id, true);
                            self.gridmenu.jqxMenu('disable', groupremoveitem.id, false);
                        }
                        else {
                            self.gridmenu.jqxMenu('disable', groupmenuitem.id, false);
                            self.gridmenu.jqxMenu('disable', groupremoveitem.id, true);
                        }
                    }
                }
                if (filteritem != null) {
                    self._updatefilterpanel(self, filteritem, columnitem);
                    var itemscount = 0;
                    if (self.sortable && self._togglesort) {
                        itemscount += 3;
                    }

                    if (self.groupable && self.addgroup) {
                        itemscount += 2;
                    }

                    var height = itemscount * 27 + 3;

                    if (self.filterable) {
                        if (!columnitem.filterable) {
                            self.gridmenu.height(height);
                            $(self.filteritem).css('display', 'none');
                        }
                        else {
                            self.gridmenu.height(height + 176);
                            $(self.filteritem).css('display', 'block');
                        }
                    }
                }
                $.data(document.body, "contextmenu" + self.element.id, { column: columnitem, columnsmenu: columnsmenu[0] });
            }

            self.addHandler($filtericon, 'click', function (event) {
                showcolumnsmenu();
                opencolumnsmenu();
                return false;
            });

            self.addHandler(columnsmenu, 'click', function (event) {
                opencolumnsmenu();
                return false;
            });
        },

        _rendercolumnheader: function (text, align) {
            if (align == 'center')
                return $('<div style="text-align: center; margin-top: 5px;">' + '<a href="#">' + text + '</a>' + '</div>');

            var link = $('<a style="float: ' + align + ';" href="#">' + text + '</a>');
            return link;
        },

        _renderrows: function (virtualsizeinfo) {
            var self = this;

            if ((this.pageable || this.groupable) && this.autoheight) {
                if (this.table != null && this.table[0].rows != null && this.table[0].rows.length != this.dataview.rows.length) {
                    self.prerenderrequired = true;
                }
            }

            if (!this.pageable && this.autoheight && (this.virtualmode || this.unboundmode)) {
                var recordscount = this.source.totalrecords;
                if (!isNaN(recordscount)) {
                    if (this.table != null && this.table[0].rows != null && this.table[0].rows.length != recordscount) {
                        self.prerenderrequired = true;
                    }
                }
            }

            self._prerenderrows(virtualsizeinfo);
            if (self._requiresupdate) {
                self._requiresupdate = false;
                self._updatepageviews();
            }

            if (this.virtualmode) {
                var loadondemand = function () {
                    if (self.rendergridrows) {
                        var startboundindex = self._startboundindex;
                        if (startboundindex == undefined) startboundindex = 0;
                        var endboundindex = startboundindex + 1 + self.dataview.pagesize;
                        if (startboundindex != null && endboundindex != null) {
                            var isdataadapter = self.source._source ? true : false;
                            var sourcestartindex = !isdataadapter ? self.source.recordstartindex : self.source._source.recordstartindex;
                            if (sourcestartindex != startboundindex) {
                                if (!isdataadapter) {
                                    self.source.recordstartindex = startboundindex;
                                    self.source.recordendindex = endboundindex;
                                }
                                else {
                                    self.source._source.recordstartindex = startboundindex;
                                    self.source._source.recordendindex = endboundindex;
                                }
                                self.updatebounddata();
                            }
                        }
                    }
                }

                if (this.loadondemand) {
                    loadondemand();
                    this.loadondemand = false;
                }
                self._rendervisualrows();
            }
            else {
                if (navigator && navigator.userAgent.indexOf('Chrome') == -1 && navigator.userAgent.indexOf('Safari') != -1) {
                    this.updatedelay = 1;
                }
                if ($.browser.mozilla && this.updatedelay == 0 && this.vScrollInstance.isScrolling()) {
                    timer = setTimeout(function () {
                        self._rendervisualrows();
                    }, 0.01);
                    return;
                }

                if (this.updatedelay == 0) {
                    self._rendervisualrows();
                }
                else {
                    var timer = $.data(document.body, "Grid" + this.element.id);
                    if (timer != null) {
                        clearTimeout(timer);
                    }
                    if (this.vScrollInstance.isScrolling() || this.hScrollInstance.isScrolling()) {
                        timer = setTimeout(function () {
                            self._rendervisualrows();
                        }, this.updatedelay);
                        $.data(document.body, "Grid" + this.element.id, timer);
                    }
                    else {
                        $.data(document.body, "Grid" + this.element.id, null);
                        self._rendervisualrows();
                    }
                }
            }
        },

        _renderhorizontalscroll: function () {
            var hScrollInstance = this.hScrollInstance;
            var horizontalscrollvalue = hScrollInstance.value;
            var left = parseInt(horizontalscrollvalue);
            if (this.table == null)
                return;

            var rows = this.table[0].rows.length;
            var columnsrow = this.columnsrow;
            var columnstart = this.groupable && this.groups.length > 0 ? this.groups.length : 0;
            var columnend = this.columns.records.length - columnstart;
            var columns = this.columns.records;

            for (i = 0; i < rows; i++) {
                var tablerow = this.table[0].rows[i];
                for (j = 0; j < columnstart + columnend; j++) {
                    var tablecell = tablerow.cells[j];
                    if (tablecell != undefined) {
                        var column = columns[j];
                        if (!column.pinned) {
                            tablecell.style.marginLeft = -left + 'px';
                            if (i == 0) {
                                var columncell = columnsrow[0].cells[j];
                                columncell.style.marginLeft = -left + 'px';
                            }
                        }
                    }
                }
            }

            if (this.editcell && !this.editrow) {
                if (this._showcelleditor && this.editcell.editing) {
                    this._showcelleditor(this.editcell.row, this.getcolumn(this.editcell.column), this.editcell.element, this.editcell.init);
                }
            }
        },

        _updaterowdetailsvisibility: function () {
            if (this.rowdetails) {
                for (i = 0; i < this._rowdetailselementscache.length; i++) {
                    $(this._rowdetailselementscache[i]).css('display', 'none');
                }
            }
        },

        _getvisualcolumnsindexes: function (left, tablewidth, columnstart, columnend, hasgroups) {
            if (this.rowdetails) {
                return { start: 0, end: columnstart + columnend };
            }

            var xcolumn = 0;
            var hcolumnstart = -1;
            var hcolumnend = columnstart + columnend;
            var haspinnedcolumn = false;

            if (!hasgroups) {
                for (j = 0; j < columnstart + columnend; j++) {
                    var rendercolumn = j;

                    if (!haspinnedcolumn) {
                        if (this.columns.records[j].pinned) {
                            haspinnedcolumn = true;
                        }
                    }

                    if (!this.columns.records[j].hidden) {
                        xcolumn += this.columns.records[j].width;
                    }

                    if (xcolumn >= left && hcolumnstart == -1) {
                        hcolumnstart = j;
                    }

                    if (xcolumn > tablewidth + left) {
                        hcolumnend = j
                        break;
                    }
                }
            }

            hcolumnend++;
            if (hcolumnend > columnstart + columnend) {
                hcolumnend = columnstart + columnend;
            }

            if (hcolumnstart == -1 || haspinnedcolumn) {
                hcolumnstart = 0;
            }

            return { start: hcolumnstart, end: hcolumnend };
        },

        _rendervisualrows: function () {
            var vScrollInstance = this.vScrollInstance;
            var hScrollInstance = this.hScrollInstance;
            var verticalscrollvalue = vScrollInstance.value;
            var horizontalscrollvalue = hScrollInstance.value;
            var top = parseInt(verticalscrollvalue);
            var left = parseInt(horizontalscrollvalue);
            var tableheight = this._gettableheight();
            var tablewidth = this.host.width();

            var hasgroups = this.groupable && this.groups.length > 0;
            this.visiblerows = new Array();
            this.hittestinfo = new Array();

            if (this.editcell && this.editrow == undefined) {
                this._hidecelleditor();
            }

            if (this.virtualmode && !this.pageable) {
                this._pagescache = new Array();
            }

            if (this._pagescache.length == 0) {
                this.dataview.updateview();
                this._loadrows();
            }

            if (this.vScrollBar.css('visibility') != 'visible') {
                top = 0;
            }

            if (!this.pageable) {
                var pagenum = this._findvisiblerow(top, this._pageviews);

                if (pagenum == -1) {
                    this._clearvisualrows();
                    return;
                }

                if (pagenum != this.dataview.pagenum) {
                    this.dataview.pagenum = pagenum;
                    this.dataview.updateview();
                    this._loadrows();
                }
                else if (!this._pagescache[this.dataview.pagenum]) {
                    this._loadrows();
                }
            }

            var columnstart = this.groupable && this.groups.length > 0 ? this.groups.length : 0;
            var columnend = this.columns.records.length - columnstart;
            var firstvisiblerow = this._findvisiblerow(top, this._pagescache[this.dataview.pagenum]);
            var rowstorender = this._pagescache[this.dataview.pagenum];
            var startindex = firstvisiblerow;
            if (startindex < 0) startindex = 0;

            var emptyheight = 0;
            var renderedrows = 0;
            var renderedheight = 0;
            var tableoffset = 0;
            var pagesize = this.virtualsizeinfo.visiblerecords;
            var groupslength = this.groupable ? this.groups.length : 0;
            var cellclass = this.toTP('jqx-grid-cell');

            if (hasgroups) {
                cellclass = ' ' + this.toTP('jqx-grid-group-cell');
            }

            if (this.isTouchDevice()) {
                cellclass += ' ' + this.toTP('jqx-touch');
            }

            var rowheight = this.rowsheight;
            var altrowindex = startindex;
            var rendercellfunc = this._rendercell;
            var enableselection = true;

            var visualcolumnsindexes = this._getvisualcolumnsindexes(left, tablewidth, columnstart, columnend, hasgroups);
            var hcolumnstart = visualcolumnsindexes.start;
            var hcolumnend = visualcolumnsindexes.end;

            if (startindex >= 0) {
                this._updaterowdetailsvisibility();
                this._startboundindex = rowstorender != null ? rowstorender[startindex].bounddata.boundindex : 0;
                for (var renderindex = 0; renderindex < pagesize && renderedrows < pagesize; renderindex++) {
                    var renderrow = rowstorender != undefined ? rowstorender[startindex + renderindex] : null;

                    if (renderrow == null) {
                        startindex = -renderindex;
                        if (this._pagescache[this.dataview.pagenum + 1]) {
                            rowstorender = this._pagescache[this.dataview.pagenum + 1];
                            this.dataview.pagenum++;
                        }
                        else {
                            var pageviewslength = this._pageviews.length;
                            do {
                                if (this.dataview.pagenum < this._pageviews.length - 1) {
                                    this.dataview.pagenum++;
                                    rowstorender = undefined;
                                    if (this._pageviews[this.dataview.pagenum].height > 0) {
                                        this.dataview.updateview();
                                        this._loadrows();
                                        rowstorender = this._pagescache[this.dataview.pagenum];
                                    }
                                }
                                else {
                                    rowstorender = undefined;
                                    break;
                                }
                            } while (rowstorender == undefined && this.dataview.pagenum < pageviewslength);
                        }

                        if (rowstorender != undefined) {
                            renderrow = rowstorender[startindex + renderindex]
                        }
                    }

                    if (renderrow != null) {
                        if (renderrow.hidden)
                            continue;

                        if (renderindex == 0) {
                            var topoffset = Math.abs(top - renderrow.top);
                            // this.table.css('top', -topoffset);
                            this.table[0].style.top = -topoffset + 'px';
                            tableoffset = -topoffset;
                        }

                        var tablerow = this.table[0].rows[renderedrows];
                        var $tablerow = $(tablerow);
                        if (!tablerow) continue;
                        if (parseInt(tablerow.style.height) != renderrow.height) {
                            $tablerow.height(renderrow.height);
                        }

                        renderedheight += renderrow.height;
                        var hasdetails = this.rowdetails && renderrow.rowdetails;
                        var showdetails = !renderrow.rowdetailshidden;
                        if (hasdetails && showdetails) {
                            $tablerow.height(renderrow.height - renderrow.rowdetailsheight);
                            pagesize++;
                        }

                        var selected = this._isrowselected(enableselection, renderrow);
                        for (cindex = hcolumnstart; cindex < hcolumnend; cindex++) {
                            var rendercolumn = cindex;
                            this._rendervisualcell(rendercellfunc, cellclass, selected, hasdetails, showdetails, hasgroups, groupslength, tablerow, renderrow, rendercolumn, renderedrows);
                        }

                        if (renderrow.group != undefined && this._rendergroup) {
                            this._rendergroup(groupslength, tablerow, renderrow, columnstart, columnend, renderedrows);
                        }

                        this.visiblerows[this.visiblerows.length] = renderrow;
                        this.hittestinfo[this.hittestinfo.length] = { row: renderrow, visualrow: tablerow, details: false };

                        if (hasdetails && showdetails) {
                            renderedrows++;
                            var tablerow = this.table[0].rows[renderedrows];
                            this._renderrowdetails(cellclass, tablerow, renderrow, columnstart, columnend, renderedrows);

                            this.visiblerows[this.visiblerows.length] = renderrow;
                            this.hittestinfo[this.hittestinfo.length] = { row: renderrow, visualrow: tablerow, details: true };
                        }

                        if (renderedheight + tableoffset >= tableheight)
                            break;
                    }
                    else {
                        cansetheight = true;
                        this._clearvisualrow(left, hasgroups, renderedrows, columnstart, columnend);
                        if (renderedheight + emptyheight + parseInt(this.table.css('top')) <= tableheight) {
                            emptyheight += rowheight;
                        }
                    }
                    renderedrows++;
                }
                this._horizontalvalue = left;

                if (emptyheight > 0) {
                    if (this.vScrollBar.css('visibility') == 'visible') {
                        var tabletop = parseInt(this.table.css('top'));
                        var lastpageview = this._pageviews[this._pageviews.length - 1];
                        var oldmax = vScrollInstance.max;
                        var newmax = lastpageview.top + lastpageview.height - tableheight; //tabletop + this.visiblerows[this.visiblerows.length - 1].top + tableheight; //offset + vScrollInstance.max - emptyheight;
                        if (this.hScrollBar.css('visibility') == 'visible') {
                            newmax += 6;
                        }

                        if (oldmax != newmax) {
                            vScrollInstance.max = newmax;
                            vScrollInstance.setPosition(vScrollInstance.max);
                        }
                    }
                }
            }
        },

        _clearvisualrows: function () {
            var pagesize = this.virtualsizeinfo.visiblerecords;
            var hScrollInstance = this.hScrollInstance;
            var horizontalscrollvalue = hScrollInstance.value;
            var left = parseInt(horizontalscrollvalue);
            var hasgroups = this.groupable && this.groups.length > 0;

            for (renderindex = 0; renderindex < pagesize; renderindex++) {
                this._clearvisualrow(left, hasgroups, renderindex, 0, this.columns.records.length);
            }
        },

        _isrowselected: function (enableselection, row) {
            var selected = false;

            if (enableselection && row.bounddata != null) {
                if (this.selectionmode != "singlerow") {
                    if (this.selectedrowindexes.indexOf(row.bounddata.boundindex) != -1) {
                        selected = true;
                    }
                }
                else {
                    if (row.bounddata.boundindex == this.selectedrowindex) {
                        selected = true;
                    }
                }
            }

            return selected;
        },

        _rendervisualcell: function (rendercellfunc, cellclass, selected, hasdetails, showdetails, hasgroups, groupslength, tablerow, renderrow, rendercolumn, renderedrows) {
            var cell = null;
            var column = this.columns.records[rendercolumn];
            cellvalue = this._getcellvalue(column, renderrow);
            var tablecell = tablerow.cells[rendercolumn];
            var classname = cellclass;

            if (column.cellclassname != '' && column.cellclassname) {
                classname += ' ' + column.cellclassname;
            }

            if (this.selectionmode.indexOf('cell') != -1) {
                if (this.selectedcells[renderrow.boundindex + '_' + column.datafield]) {
                    selected = true;
                }
                else selected = false;
            }

            var issortcolumn = this.showsortcolumnbackground && this.sortcolumn && column.datafield == this.sortcolumn;
            if (issortcolumn) {
                classname += ' ' + this.toTP('jqx-grid-cell-sort');
            }

            if (column.filter && this.showfiltercolumnbackground) {
                classname += ' ' + this.toTP('jqx-grid-cell-filter');
            }

            if (column.pinned && this.showpinnedcolumnbackground) {
                classname += ' ' + this.toTP('jqx-grid-cell-pinned');
            }

            if (this.altrows && renderrow.group == undefined) {
                var altrowindex = renderrow.visibleindex;
                if (altrowindex >= this.altstart) {
                    if ((this.altstart + altrowindex) % (1 + this.altstep) == 0) {
                        if (!issortcolumn) {
                            classname += ' ' + this.toTP('jqx-grid-cell-alt');
                        }
                        else classname += ' ' + this.toTP('jqx-grid-cell-sort-alt');

                        if (column.filter && this.showfiltercolumnbackground) {
                            classname += ' ' + this.toTP('jqx-grid-cell-filter-alt');
                        }

                        if (column.pinned && this.showpinnedcolumnbackground) {
                            classname += ' ' + this.toTP('jqx-grid-cell-pinned-alt');
                        }
                    }
                }
            }

            if (rendercolumn <= groupslength) {
                if (hasgroups || this.rowdetails) {
                    var $tablecell = $(tablecell);
                    var cellwidth = this.columns.records[rendercolumn].width;

                    if (parseInt(tablecell.style.width) != cellwidth) {
                        $tablecell.width(cellwidth);
                    }
                }
            }

            var selectedstate = true;
            if (this.rowdetails && hasdetails) {
                if (showdetails && !hasgroups) {
                    classname += ' ' + this.toTP('jqx-grid-details-cell');
                }
                else if (hasgroups) {
                    classname += ' ' + this.toTP('jqx-grid-group-details-cell');
                }

                if (this.showrowdetailscolumn) {
                    if (renderrow.group == undefined && rendercolumn == groupslength) {
                        if (showdetails) {
                            classname += ' ' + this.toTP('jqx-grid-group-expand');
                        }
                        else {
                            classname += ' ' + this.toTP('jqx-grid-group-collapse');
                        }
                        selectedstate = false;
                    }
                }
            }

            if (selected && selectedstate) {
                classname += ' ' + this.toTP('jqx-grid-cell-selected');
                classname += ' ' + this.toTP('jqx-fill-state-pressed');
            }

            if (tablecell.className != classname) {
                tablecell.className = classname;
            }

            if (renderrow.group != undefined) {
                cellvalue = "";
                tablecell.title = "";
                tablecell.innerHTML = "";

                return;
            }
            rendercellfunc(this, column, renderrow, cellvalue, tablecell);
        },

        _rendercell: function (me, column, row, value, tablecell) {
            var lookupkey = row.uniqueid + "_" + column.visibleindex;

            if (me.editcell && !me.editrow) {
                if (me.editcell.row == row.boundindex && me.editcell.column == column.datafield) {
                    me.editcell.element = tablecell;
                    if (me.editcell.editing) {
                        if (me._showcelleditor) {
                            me._showcelleditor(me.editcell.row, column, me.editcell.element, me.editcell.init);
                            return;
                        }
                    }
                }
            }
            else if (me.editrow) {
                if (me.editrow == row.boundindex) {
                    me.editcells[column.datafield].element = tablecell;
                    if (me.editcells[column.datafield].editing) {
                        if (me._showcelleditor) {
                            me._showcelleditor(me.editcells[column.datafield].row, column, tablecell, me.editcells[column.datafield].init);
                            return;
                        }
                    }
                }
            }

            var cachedcell = me._cellscache[lookupkey];
            if (cachedcell) {
                if (column.columntype == "checkbox") {
                    if (me.host.jqxCheckBox) {
                        if (value == "") value = false;
                        var empty = tablecell.innerHTML.toString().length == 0;
                        if (tablecell.checkbox && !me.groupable && !empty) {
                            tablecell.checkboxrow = row.boundindex;
                            tablecell.checkbox.jqxCheckBox({ checked: value });
                        }
                        else {
                            me._rendercheckboxcell(me, tablecell, column, row, value);
                        }
                        return;
                    }
                }
                else if (column.columntype == "button") {
                    if (me.host.jqxButton) {
                        if (value == "") value = false;
                        if (column.cellsrenderer != null) {
                            value = column.cellsrenderer(row.boundindex, column.datafield, value, defaultcellsrenderer, column.getcolumnproperties());
                        }

                        if (tablecell.button && !me.groupable) {
                            tablecell.buttonrow = row.boundindex;
                            tablecell.button.val(value);
                        }
                        else {
                            me._renderbuttoncell(me, tablecell, column, row, value);
                        }
                        return;
                    }
                }

                var cellelement = cachedcell.element;
                if (tablecell.innerHTML.toLowerCase() != cellelement.toLowerCase()) {
                    tablecell.innerHTML = cellelement;
                    if (me.enabletooltips) {
                        tablecell.title = cachedcell.title;
                    }
                }
                return;
            }

            if (me.enabletooltips) {
                if (column.cellsformat != '') {
                    if ($.jqx.dataFormat) {
                        if ($.jqx.dataFormat.isNumber(value)) {
                            value = $.jqx.dataFormat.formatnumber(value, column.cellsformat, me.gridlocalization);
                        }
                        else if ($.jqx.dataFormat.isDate(value)) {
                            value = $.jqx.dataFormat.formatdate(value, column.cellsformat, me.gridlocalization);
                        }
                    }
                }
                tablecell.title = value;
            }

            if (column.columntype == "checkbox") {
                me._rendercheckboxcell(me, tablecell, column, row, value);
                me._cellscache[lookupkey] = { element: "", title: value };
                return;
            }
            else if (column.columntype == "button") {
                if (column.cellsrenderer != null) {
                    value = column.cellsrenderer(row.boundindex, column.datafield, value, defaultcellsrenderer, column.getcolumnproperties());
                }
                me._renderbuttoncell(me, tablecell, column, row, value);
                me._cellscache[lookupkey] = { element: "", title: value };
                return;
            }
            else if (column.columntype == "number") {
                value = row.visibleindex;
            }

            var defaultcellsrenderer = me._defaultcellsrenderer(value, column);
            var cellelement = null;
            if (column.cellsrenderer != null) {
                cellelement = column.cellsrenderer(row.boundindex, column.datafield, value, defaultcellsrenderer, column.getcolumnproperties());
            }
            else {
                cellelement = defaultcellsrenderer;
            }

            if (cellelement == null) {
                cellelement = defaultcellsrenderer;
            }

            me._cellscache[lookupkey] = { element: cellelement, title: value };
            tablecell.innerHTML = cellelement;

            return true;
        },

        _rendercheckboxcell: function (me, tablecell, column, row, value) {
            if (me.host.jqxCheckBox) {
                var $tablecell = $(tablecell);
                if (value == "") value = false;
                if (value == "1") value = true;
                if (value == "0") value = false;
                if (value == 1) value = true;
                if (value == 0) value = false;
                if (value == 'true') value = true;
                if (value == 'false') value = false;

                if ($tablecell.find('.jqx-checkbox').length == 0) {
                    tablecell.innerHTML = '<div tabIndex=0 style="opacity: 0.99; position: absolute; top: 50%; left: 50%; margin-top: -7px; margin-left: -10px;"></div>';
                    $(tablecell.firstChild).jqxCheckBox({ enableContainerClick: false, animationShowDelay: 0, animationHideDelay: 0, locked: true, theme: me.theme, checked: value });

                    if (this.editable && column.editable) {
                        $(tablecell.firstChild).jqxCheckBox({ locked: false });
                    }

                    tablecell.checkbox = $(tablecell.firstChild);
                    tablecell.checkboxrow = row.boundindex;
                    var checkinstance = $.data(tablecell.firstChild, "jqxCheckBox").instance;
                    checkinstance.updated = function (event, checked) {
                        if (column.editable) {
                            var totalrows = me.table[0].rows.length;
                            var columnindex = me._getcolumnindex(column.datafield);

                            for (currentCheckbox = 0; currentCheckbox < totalrows; currentCheckbox++) {
                                var checkboxcell = me.table[0].rows[currentCheckbox].cells[columnindex].firstChild;
                                $(checkboxcell).jqxCheckBox('destroy');
                            }

                            if (me.editcell && me.editcell.validated == false) {
                                me.setcellvalue(tablecell.checkboxrow, column.datafield, !checked, true);
                            }
                            else {
                                me._raiseEvent(17, { rowindex: tablecell.checkboxrow, datafield: column.datafield, value: !checked, columntype: column.columntype });
                                me.setcellvalue(tablecell.checkboxrow, column.datafield, checked, true);
                                me._raiseEvent(18, { rowindex: tablecell.checkboxrow, datafield: column.datafield, oldvalue: !checked, value: checked, columntype: column.columntype });
                            }
                        }
                    }
                }
                else {
                    tablecell.checkboxrow = row.boundindex;
                    $(tablecell.firstChild).jqxCheckBox({ checked: value });
                }
            }
        },

        _renderbuttoncell: function (me, tablecell, column, row, value) {
            if (me.host.jqxButton) {
                var $tablecell = $(tablecell);
                if (value == "") value = false;
                if ($tablecell.find('.jqx-button').length == 0) {
                    tablecell.innerHTML = '<input type="button" style="opacity: 0.99; position: absolute; top: 0%; left: 0%; padding: 0px; margin-top: 2px; margin-left: 2px;"/>';
                    $(tablecell.firstChild).val(value);
                    $(tablecell.firstChild).attr("hideFocus", "true");
                    $(tablecell.firstChild).jqxButton({ theme: me.theme, height: me.rowsheight - 4, width: column.width - 4 });
                    tablecell.button = $(tablecell.firstChild);
                    tablecell.buttonrow = row.boundindex;
                    $(tablecell.firstChild).bind('click', function (event) {
                        if (column.buttonclick) {
                            column.buttonclick(tablecell.buttonrow, event);
                        }
                    });
                }
                else {
                    tablecell.buttonrow = row.boundindex;
                    $(tablecell.firstChild).val(value);
                }
            }
        },

        _clearvisualrow: function (left, hasgroups, renderedrows, columnstart, columnend) {
            var cellclass = this.toTP('jqx-grid-cell');
            if (hasgroups) {
                cellclass = ' ' + this.toTP('jqx-grid-group-cell');
            }

            for (var j = 0; j < columnstart + columnend; j++) {
                if (this.table[0].rows[renderedrows]) {
                    var tablecell = this.table[0].rows[renderedrows].cells[j];
                    tablecell.className = cellclass;
                    var columnrecord = this.columns.records[j];
                    if (this._horizontalvalue != left && !columnrecord.pinned) {
                        $(tablecell).css('margin-left', -left);
                    }
                    var cellwidth = columnrecord.width;
                    if (cellwidth < columnrecord.minwidth) cellwidth = columnrecord.minwidth;
                    if (cellwidth > columnrecord.maxwidth) cellwidth = columnrecord.maxwidth;

                    if (parseInt(tablecell.style.width) != cellwidth) {
                        $(tablecell).width(cellwidth);
                    }
                    tablecell.title = "";
                    tablecell.innerHTML = "";
                    $(this.table[0].rows[renderedrows]).height(this.rowsheight)
                }
            }
        },

        _findgroupstate: function (uniqueid) {
            var group = this._findgroup(uniqueid);
            if (group == null) {
                return false;
            }
            return group.expanded;
        },

        _findgroup: function (uniqueid) {
            var group = null;

            if (this.expandedgroups[uniqueid])
                return this.expandedgroups[uniqueid];

            return group;
        },

        _clearcaches: function () {
            this._columnsbydatafield = new Array();
            this._pagescache = new Array();
            this._pageviews = new Array();
            this._cellscache = new Array();
            this.heights = new Array();
            this.hiddens = new Array();
            this.hiddenboundrows = new Array();
            this.heightboundrows = new Array();
            this.detailboundrows = new Array();
            this.details = new Array();
            this.expandedgroups = new Array();
            this._rowdetailscache = new Array();
            this._rowdetailselementscache = new Array();
            if ($.jqx.dataFormat) {
                $.jqx.dataFormat.cleardatescache();
            }
            this.tableheight = null;
        },

        _getColumnText: function (datafield) {
            if (this._columnsbydatafield == undefined) {
                this._columnsbydatafield = new Array();
            }

            if (this._columnsbydatafield[datafield])
                return this._columnsbydatafield[datafield];

            var columnname = datafield;
            $.each(this.columns.records, function () {
                if (this.datafield == datafield) {
                    columnname = this.text;
                    return false;
                }
            });

            this._columnsbydatafield[datafield] = columnname;
            return columnname;
        },

        isscrollingvertically: function () {
            var isscrolling = (this.vScrollBar.jqxScrollBar('isScrolling'))
            return isscrolling;
        },

        _renderrowdetails: function (cellclass, tablerow, renderrow, columnstart, columnend, renderedrows) {
            var $tablerow = $(tablerow);
            var cellindex = 0;
            var indent = this.rowdetails && this.showrowdetailscolumn ? (1 + this.groups.length) * this.groupindentwidth : (this.groups.length) * this.groupindentwidth;
            if (this.groupable && this.groups.length > 0) {
                for (var detailsIndex = 0; detailsIndex <= columnend; detailsIndex++) {
                    var tablecell = $(tablerow.cells[detailsIndex]);
                    tablecell[0].innerHTML = "";
                    tablecell[0].className = 'jqx-grid-details-cell';
                }
            }
            var tablecell = $(tablerow.cells[cellindex]);
            tablecell.css('width', '100%');
            $tablerow.height(renderrow.rowdetailsheight);
            tablecell[0].className = cellclass;

            var boundindex = renderrow.bounddata.boundindex;
            var lookupkey = boundindex + "_";

            if (this._rowdetailscache[lookupkey]) {
                var cache = this._rowdetailscache[lookupkey];
                var $detailselement = cache.html;

                if (this.initrowdetails) {
                    if (this._rowdetailscache[lookupkey].element) {
                        var element = this._rowdetailscache[lookupkey].element;
                        var tablecelloffset = tablecell.offset();
                        var gridcontentoffset = this.gridcontent.offset();
                        var top = parseInt(tablecelloffset.top) - parseInt(gridcontentoffset.top);
                        var left = parseInt(tablecelloffset.left) - parseInt(gridcontentoffset.left);

                        $(element).css('top', top);
                        $(element).css('left', left);
                        $(element).css('display', 'block');
                    }
                }
                else {
                    tablecell[0].innerHTML = $detailselement;
                }
                return;
            }

            tablecell[0].innerHTML = '';
            if (!this.enablerowdetailsindent) {
                indent = 0;
            }

            var detailselement = '<div style="overflow: hidden; width: 100%; height: 100%; margin-left: ' + indent + 'px;">' + renderrow.rowdetails + '</div>';
            this._rowdetailscache[lookupkey] = { id: tablerow.id, html: detailselement }
            if (this.initrowdetails) {
                var element = $(detailselement)[0];
                $(this.gridcontent).prepend($(element));

                $(element).css('position', 'absolute');
                $(element).width(this.host.width() - indent);
                $(element).height(tablecell.height());

                var tablecelloffset = tablecell.offset();
                $(element).css('z-index', 2000);
                if (this.isTouchDevice()) {
                    $(element).css('z-index', 99999);
                }
                var tablecelloffset = tablecell.offset();
                var gridcontentoffset = this.gridcontent.offset();
                var top = parseInt(tablecelloffset.top) - parseInt(gridcontentoffset.top);
                var left = parseInt(tablecelloffset.left) - parseInt(gridcontentoffset.left);

                $(element).css('top', top);
                $(element).css('left', left);

                this.content[0].scrollTop = 0;
                this.content[0].scrollLeft = 0;

                this.initrowdetails(boundindex, element, this.element);

                this._rowdetailscache[lookupkey].element = element;
                this._rowdetailselementscache[boundindex] = element;
            }
            else {
                tablecell[0].innerHTML = detailselement;
            }
        },

        _defaultcellsrenderer: function (value, column) {
            if (column.cellsformat != '') {
                if (!this.enabletooltips) {
                    if ($.jqx.dataFormat) {
                        if ($.jqx.dataFormat.isDate(value)) {
                            value = $.jqx.dataFormat.formatdate(value, column.cellsformat, this.gridlocalization);
                        }
                        else if ($.jqx.dataFormat.isNumber(value)) {
                            value = $.jqx.dataFormat.formatnumber(value, column.cellsformat, this.gridlocalization);
                        }
                    }
                }
            }

            if (column.cellsalign == 'center')
                return '<div style="text-align: center; margin-top: 5px;">' + value + '</div>';

            return '<span style="margin: 4px; float: ' + column.cellsalign + ';">' + value + '</span>';
        },

        _getcellvalue: function (column, row) {
            var value = null;
            value = row.bounddata[column.datafield];

            if (value == null) value = "";
            return value;
        },

        // gets a cell.
        getcell: function (row, datafield) {
            if (row == null || datafield == null)
                return null;

            var rowindex = parseInt(row);
            var datarow = row;
            var value = '';

            if (!isNaN(rowindex)) {
                datarow = this.getrowdata(rowindex);
            }

            if (datarow != null) {
                value = datarow[datafield];
            }

            return this._getcellresult(value, row, datafield);
        },
        // gets the rendered cell data.
        getrenderedcell: function (row, datafield) {
            if (row == null || datafield == null)
                return null;

            var rowindex = parseInt(row);
            var datarow = row;
            var value = '';

            if (!isNaN(rowindex)) {
                datarow = this.getrenderedrowdata(rowindex);
            }

            if (datarow != null) {
                value = datarow[datafield];
            }
            return this._getcellresult(value, row, datafield);
        },

        _getcellresult: function (value, row, datafield) {
            var column = this.getcolumn(datafield);
            if (column == null || column == undefined) {
                return null;
            }

            var properties = column.getcolumnproperties();

            var hidden = properties.hidden;
            var width = properties.width;
            var pinned = properties.pinned;
            var align = properties.cellsalign;
            var format = properties.cellsformat;
            var height = this.getrowheight(row);

            // invalid row.
            if (height == false) {
                return null;
            }

            return { value: value, row: row, column: datafield, width: width, height: height, hidden: hidden, pinned: pinned, align: align, format: format };
        },

        setcellvalue: function (row, datafield, value, refresh) {
            if (row == null || datafield == null)
                return false;

            var rowindex = parseInt(row);
            var datasourcerowindex = rowindex;

            var datarow = row;
            if (!isNaN(rowindex)) {
                datarow = this.getrowdata(rowindex);
            }

            var hasfilter = false;
            if (this.filterable && this._initfilterpanel && this.dataview.filters.length) {
                hasfilter = true;
            }
            if (this.virtualmode) {
                this._pagescache = new Array();
            }

            var oldvalue = "";
            if (datarow != null && datarow[datafield] != value) {
                oldvalue = datarow[datafield];
                datarow[datafield] = value;
                var renderedrow = this.getrenderedrowdata(rowindex, true);
                renderedrow[datafield] = value;
                if (hasfilter) {
                    datasourcerowindex = datarow.dataindex;
                    this.dataview.cachedrecords[datarow.dataindex][datafield] = value;
                }
            }
            else {
                this._renderrows(this.virtualsizeinfo);
                return false;
            }

            if (this.sortcolumn && this.dataview.sortby) {
                var sortinformation = this.getsortinformation();
                this.dataview.clearsortdata();
                this.dataview.sortby(sortinformation.sortcolumn, sortinformation.sortdirection.ascending);
            }

            this._cellscache = new Array();

            if (this.source.updaterow) {
                this.source.updaterow(datasourcerowindex, datarow);
            }

            var rowid = this.getrowid(row);
            var scrollvalue = this.vScrollInstance.value;

            if (refresh == true || refresh == undefined) {
                var me = this;
                var updatepager = function () {
                    if (me.pageable && me.updatepagerdetails) {
                        me.updatepagerdetails();
                        if (me.autoheight) {
                            me._updatepageviews();
                        }
                    }
                }

                if (hasfilter) {
                    this.dataview.refresh();
                    this.rendergridcontent(true, true);
                    updatepager();
                }
                else if (this.sortcolumn) {
                    this.dataview.reloaddata();
                    this.rendergridcontent(true, true);
                    updatepager();
                }
                else if (this.groupable && this.groups.length > 0) {
                    this.dataview.reloaddata();
                    this.render();
                    var datarow = this.getrowdata(row);
                    var renderedrow = this.getrenderedrowdata(rowindex, true);
                    var parentItem = renderedrow.parentItem;
                    this._setgroupstate(parentItem, true, true);
                }
                else {
                    this.dataview.updateview();
                    this._renderrows(this.virtualsizeinfo);
                }
            }
            this.vScrollInstance.setPosition(scrollvalue);
            this._raiseEvent(19, { rowindex: row, datafield: datafield, newvalue: value, oldvalue: oldvalue });
            return true;
        },

        // get cell's bound value.
        getcellvalue: function (row, datafield) {
            if (row == null || datafield == null)
                return null;

            var rowindex = parseInt(row);
            var datarow = row;
            if (!isNaN(rowindex)) {
                datarow = this.getrowdata(rowindex);
            }

            if (datarow != null) {
                var value = datarow[datafield];
                return value;
            }

            return null;
        },

        getrows: function () {
            var length = this.dataview.records.length;
            if (this.dataview.sortdata) {
                var rows = new Array();
                for (var i = 0; i < length; i++) {
                    var item = {};
                    item = $.extend({}, this.dataview.sortdata[i].value);
                    rows[i] = item;
                }
                return rows;
            }
            else return this.dataview.records;
        },

        // get getrowdata.
        getrowdata: function (boundindex) {
            if (boundindex == undefined)
                boundindex = 0;

            if (this.virtualmode) {
                var record = this.dataview.records[boundindex];
                return record;
            }
            else if (boundindex >= 0 && boundindex < this.dataview.bounditems.length) {
                var record = this.dataview.records[boundindex];
                return record;
            }

            return null;
        },
        // get visible row data.
        getrenderedrowdata: function (boundindex, bypasspaging) {
            if (boundindex == undefined)
                boundindex = 0;

            if (this.virtualmode) {
                var visibleindex = this.getrowvisibleindex(boundindex);
                var record = this.dataview.loadedrecords[visibleindex];
                return record;
            }

            if (boundindex >= 0 && boundindex < this.dataview.bounditems.length) {
                if (this.groupable && this.groups.length > 0) {
                    var visibleindex = this.getrowvisibleindex(boundindex);
                    var record = this.dataview.loadedrecords[visibleindex];
                }
                else {
                    var record = this.dataview.loadedrecords[boundindex];
                    if (this.pageable && (bypasspaging == undefined || bypasspaging == false)) {
                        var record = this.dataview.loadedrecords[this.dataview.pagesize * this.dataview.pagenum + boundindex];
                    }
                }
                return record;
            }

            return null;
        },

        // get row id.
        getrowid: function (boundindex) {
            if (boundindex == undefined)
                boundindex = 0;

            if (boundindex >= 0 && boundindex < this.dataview.bounditems.length) {
                var id = this.dataview.bounditems[boundindex].uid;
                return id;
            }

            return null;
        },

        // update row.
        updaterow: function (rowid, rowdata, refresh) {
            if (rowid != undefined && rowdata != undefined) {
                var success = this.dataview.updaterow(rowid, rowdata);
                var scrollvalue = this.vScrollInstance.value;
                if (refresh == undefined || refresh == true) {
                    this._datachanged = true;
                    if (this._updating == undefined || this._updating == false) {
                        this._updateGridData();
                    }
                }

                if (this.source.updaterow) {
                    this.source.updaterow(rowid, rowdata);
                }
                this.vScrollInstance.setPosition(scrollvalue);

                return success;
            }

            return false;
        },

        _updateGridData: function () {
            var hasfilter = false;
            if (this.filterable && this._initfilterpanel && this.dataview.filters.length) {
                hasfilter = true;
            }
            if (hasfilter) {
                this.dataview.refresh();
                this.render();
            }
            else if (this.sortcolumn || (this.groupable && this.groups.length > 0)) {
                this.dataview.reloaddata();
                this.render();
            }
            else {
                this._cellscache = new Array();
                this._pagescache = new Array();
                this._renderrows(this.virtualsizeinfo);
            }
        },

        // delete row.
        deleterow: function (rowid) {
            if (rowid != undefined) {
                this._datachanged = true;
                var scrollvalue = this.vScrollInstance.value;
                var success = this.dataview.deleterow(rowid);
                if (this._updating == undefined || this._updating == false) {
                    this._render(true, true, false);
                }
                if (this.source.deleterow) {
                    this.source.deleterow(rowid);
                }

                this.vScrollInstance.setPosition(scrollvalue);
                return success;
            }

            return false;
        },

        // add row.
        addrow: function (rowid, rowdata, position) {
            if (rowdata != undefined) {
                this._datachanged = true;
                if (position == undefined) {
                    position = 'last';
                }

                var scrollvalue = this.vScrollInstance.value;
                var success = this.dataview.addrow(rowid, rowdata, position);
                if (this._updating == undefined || this._updating == false) {
                    this._render(true, true, false);
                }

                if (this.source.addrow) {
                    this.source.addrow(rowdata.uid, rowdata, position);
                }

                this.vScrollInstance.setPosition(scrollvalue);
                return success;
            }
            return false;
        },

        _findvisiblerow: function (value, collection) {
            if (value == undefined) {
                value = parseInt(this.vScrollInstance.value);
            }
            var min = 0;
            if (collection == undefined || collection == null) {
                collection = this.rows.records;
            }

            var max = collection.length;
            while (min <= max) {
                mid = parseInt((min + max) / 2)
                var item = collection[mid];

                if (item == undefined)
                    break;

                if (item.top > value && item.top + item.height > value) {
                    max = mid - 1;
                } else if (item.top < value && item.top + item.height < value) {
                    min = mid + 1;
                } else {
                    return mid;
                    break;
                }
            }

            return -1;
        },

        _updatecellwidths: function () {
            var virtualsizeinfo = this.virtualsizeinfo;
            var me = this;

            if (this.gridcontent == undefined)
                return;

            this.table = this.gridcontent.find('#contenttable' + this.element.id);
            var hasgroups = this.groupable && this.groups.length > 0;
            var tablewidth = 0;
            var pagesize = virtualsizeinfo.visiblerecords;

            if (this.pageable && this.autoheight) {
                pagesize = this.dataview.pagesize;
                if (this.groupable) {
                    this.dataview.updateview();
                    pagesize = this.dataview.rows.length;
                }
            }

            if (!this.pageable && this.autoheight) {
                pagesize = this.dataview.totalrecords;
            }

            if (this.rowdetails) {
                pagesize += this.dataview.pagesize;
            }

            var columnslength = this.columns.records.length;

            for (i = 0; i < pagesize; i++) {
                var tablerow = this.table[0].rows[i];
                if (!tablerow)
                    break;

                var cells = tablerow.cells;
                var left = 0;
                for (j = 0; j < columnslength; j++) {
                    var columnrecord = this.columns.records[j];
                    var width = columnrecord.width;
                    var tablecolumn = $(cells[j]);
                    tablecolumn.css('left', left);
                    tablecolumn.width(width);
                    tablecolumn[0].left = left;
                    if (!(columnrecord.hidden && columnrecord.hideable)) {
                        left += width;
                    }
                    else {
                        tablecolumn.css('display', 'none');
                    }
                }

                if (tablewidth == 0) {
                    this.table.width(parseInt(left) + 2);
                    tablewidth = left;
                }
            }

            this._updatescrollbarsafterrowsprerender();
        },

        _updatescrollbarsafterrowsprerender: function () {
            var hscrollbarvisibility = this.hScrollBar.css('visibility');
            var offset = 0;
            if (this.vScrollBar.css('visibility') == 'visible') {
                offset = this.scrollbarsize + 3;
            }
            if (this.table.width() - 2 > this.host.width() - offset) {
                if (hscrollbarvisibility != 'visible') {
                    this.hScrollBar.css('visibility', 'visible');
                    this._arrange();
                }

                if (this.vScrollBar.css('visibility') == 'visible') {
                    var vscrollbarmax = this.vScrollBar.jqxScrollBar('max');
                    this.vScrollBar.jqxScrollBar('max', vscrollbarmax + this.scrollbarsize + 4);
                }

                this.hScrollBar.jqxScrollBar('max', offset + this.table.width() - this.host.width());
            }
            else {
                if (hscrollbarvisibility != 'hidden') {
                    this.hScrollBar.css('visibility', 'hidden');
                    this._arrange();
                }
            }
            this._renderhorizontalscroll();
        },

        _prerenderrows: function (virtualsizeinfo) {
            var me = this;
            if (this.prerenderrequired == true) {
                this.prerenderrequired = false;
                if (this.editable && this._destroyeditors) {
                    this._destroyeditors();
                }

                if (this.gridcontent == undefined)
                    return;

                this.gridcontent.find('#contenttable' + this.element.id).remove();
                if (this.table != null) {
                    this.table.remove();
                    this.table = null;
                }

                this.table = $('<div id="contenttable' + this.element.id + '" style="overflow: hidden; position: relative;" height="100%"></div>');
                this.gridcontent.addClass(this.toTP('jqx-grid-content'));
                this.gridcontent.addClass(this.toTP('jqx-widget-content'));
                this.gridcontent.append(this.table);
                var hasgroups = this.groupable && this.groups.length > 0;
                var tablewidth = 0;
                this.table[0].rows = new Array();
                var cellclass = this.toTP('jqx-grid-cell');
                if (hasgroups) {
                    cellclass = ' ' + this.toTP('jqx-grid-group-cell');
                }

                var pagesize = virtualsizeinfo.visiblerecords;

                if (this.pageable && this.autoheight) {
                    pagesize = this.dataview.pagesize;
                    if (this.groupable) {
                        this.dataview.updateview();
                        pagesize = this.dataview.rows.length;
                    }
                }

                if (!this.pageable && this.autoheight) {
                    pagesize = this.dataview.totalrecords;
                }

                if (this.groupable && this.autoheight && !this.pageable) {
                    pagesize = this.dataview.rows.length;
                }

                if (this.rowdetails) {
                    pagesize += this.dataview.pagesize;
                }

                var columnslength = this.columns.records.length;

                if ($.browser.msie && $.browser.version > 8) {
                    this.table.css('opacity', '0.99');
                }

                if ($.browser.mozilla) {
                    this.table.css('opacity', '0.99');
                }

                var isIE7 = $.browser.msie && $.browser.version < 8;
                if (isIE7) {
                    this.host.attr("hideFocus", "true");
                }

                var zindex = this.tableZIndex;
                if (pagesize * columnslength > zindex) {
                    zindex = pagesize * columnslength;
                }

                for (i = 0; i < pagesize; i++) {
                    var tablerow = $('<div style="position: relative;" id="row' + i + this.element.id + '"></div>');
                    var left = 0;
                    this.table[0].rows[i] = tablerow[0];
                    this.table[0].rows[i].cells = new Array();
                    for (j = 0; j < columnslength; j++) {
                        var columnrecord = this.columns.records[j];
                        var width = columnrecord.width;
                        if (width < columnrecord.minwidth) width = columnrecord.minwidth;
                        if (width > columnrecord.maxwidth) width = columnrecord.maxwidth;

                        var tablecolumn = $('<div style="overflow: hidden; position: absolute; height: 100%;" class="' + cellclass + '"></div>');
                        tablerow.append(tablecolumn);
                        tablecolumn.css('left', left);
                        tablecolumn.css('z-index', zindex--);
                        tablecolumn.width(width);
                        tablecolumn[0].left = left;
                        if (!(columnrecord.hidden && columnrecord.hideable)) {
                            left += width;
                        }
                        else {
                            tablecolumn.css('display', 'none');
                        }

                        this.table[0].rows[i].cells[j] = tablecolumn[0];
                    }

                    if (isIE7) {
                        tablerow.css('z-index', zindex--);
                    }

                    if (tablewidth == 0) {
                        this.table.width(parseInt(left) + 2);
                        tablewidth = left;
                    }

                    this.table.append(tablerow);
                    tablerow.height(this.rowsheight);
                }

                this._updatescrollbarsafterrowsprerender();
            }
        },

        _groupsheader: function () {
            return this.groupable && this.showgroupsheader;
        },

        _arrange: function () {
            var width = null;
            var height = null;
            this.tableheight = null;
            var me = this;
            var isPercentageWidth = false;
            var isPercentageHeight = false;

            if (this.width != null && this.width.toString().indexOf("px") != -1) {
                width = this.width;
            }
            else
                if (this.width != undefined && !isNaN(this.width)) {
                    width = this.width;
                };

            if (this.width != null && this.width.toString().indexOf("%") != -1) {
                width = this.width;
                isPercentageWidth = true;
            }

            if (this.height != null && this.height.toString().indexOf("px") != -1) {
                height = this.height;
            }
            else if (this.height != undefined && !isNaN(this.height)) {
                height = this.height;
            };

            if (this.height != null && this.height.toString().indexOf("%") != -1) {
                height = this.height;
                isPercentageHeight = true;
            }

            var baseheight = function () {
                var height = 0;
                var columnheaderheight = me.showheader ? me.columnsheader != null ? me.columnsheader.height() + 2 : 0 : 0;
                height += columnheaderheight;
                if (me.pageable) {
                    height += me.pagerheight;
                }
                if (me._groupsheader()) {
                    height += me.groupsheaderheight;
                }
                if (me.showtoolbar) {
                    height += me.toolbarheight;
                }
                if (me.showstatusbar) {
                    height += me.statusbarheight;
                }
                if (me.hScrollBar.css('visibility') == 'visible') {
                    height += 20;
                }

                return height;
            }

            if (this.autoheight && this.virtualsizeinfo) {
                if (this.pageable && this.gotopage) {
                    var newheight = this.host.height() - this._gettableheight();
                    height = newheight + (this._pageviews[0] ? this._pageviews[0].height : 0);
                    if (height == 0) {
                        height = baseheight();
                    }
                }
                else {
                    var newheight = this.host.height() - this._gettableheight();
                    if (this._pageviews.length > 0) {
                        height = newheight + this._pageviews[this._pageviews.length - 1].height + this._pageviews[this._pageviews.length - 1].top;
                        this.vScrollBar.css('visibility', 'hidden')
                    }
                }
            }
            else if (this.autoheight) {
                height = this.dataview.totalrecords * this.rowsheight;
                if (this._loading) {
                    height = 250;
                    this.dataloadelement.height(height);
                }
                height += baseheight();

                if (height > 10000)
                    height = 10000;
            }

            var hostBorderSize = this.host.css('border-width');
            if (hostBorderSize == null) {
                hostBorderSize = 0;
            }

            if (width != null) {
                width = parseInt(width);
                this.host.width(this.width);
                if (isPercentageWidth) {
                    width = this.host.width();
                    if (width <= 2) {
                        width = 600;
                        this.host.width(width);
                    }
                    if (!this._oldWidth) {
                        this._oldWidth = width;
                    }
                }
            }
            else this.host.width(250);

            if (height != null) {
                if (!isPercentageHeight) {
                    height = parseInt(height);
                }

                this.host.height(height);
                if (isPercentageHeight && !this.autoheight) {
                    height = this.host.height();
                    if (height == 0) {
                        height = 400;
                        this.host.height(height);
                    }
                    if (!this._oldHeight) {
                        this._oldHeight = height;
                    }
                }
            }
            else this.host.height(250);

            if (this.autoheight) {
                this.tableheight = null;
                this._gettableheight()
            }

            var top = 0;

            if (this.showtoolbar) {
                this.toolbar.width(width);
                this.toolbar.height(this.toolbarheight - 1);
                this.toolbar.css('top', 0);
                top += this.toolbarheight;
                height -= parseInt(this.toolbarheight);
            }
            else this.toolbar.height(0);

            if (this.showstatusbar) {
                this.statusbar.width(width);
                this.statusbar.height(this.statusbarheight - 1);
            }
            else this.statusbar.height(0);

            if (this._groupsheader()) {
                this.groupsheader.width(width);
                this.groupsheader.height(this.groupsheaderheight);
                this.groupsheader.css('top', top);
                var groupsheaderheight = this.groupsheader.height() + 1;
                top += groupsheaderheight;
                if (height > groupsheaderheight) {
                    height -= parseInt(groupsheaderheight);
                }
            }
            else {
                this.groupsheader.width(width);
                this.groupsheader.height(this.groupsheaderheight);
                this.groupsheader.css('top', top);
                this.content.css('top', top + this.groupsheader.height());
            }

            // scrollbar Size.
            var scrollSize = this.scrollbarsize;
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
            if (this.vScrollBar.css('visibility') == 'visible') {
                rightSizeOffset = scrollSize + scrollOffset;
            }

            // bottom scroll offset.
            if (this.hScrollBar.css('visibility') == 'visible') {
                bottomSizeOffset = scrollSize + scrollOffset + 2;
            }

            var pageheight = 0;
            if (this.pageable) {
                pageheight = this.pagerheight;
                bottomSizeOffset += this.pagerheight;
            }
            if (this.showstatusbar) {
                bottomSizeOffset += this.statusbarheight;
                pageheight += this.statusbarheight;
            }

            this.hScrollBar.height(scrollSize);
            this.hScrollBar.css({ top: top + height - scrollOffset - scrollSize - pageheight + 'px', left: '0px' });
            this.hScrollBar.width(width - scrollSize - scrollOffset + 'px');

            if (rightSizeOffset == 0) {
                this.hScrollBar.width(width - 2);
            }

            this.vScrollBar.width(scrollSize);
            this.vScrollBar.height(parseInt(height) - bottomSizeOffset + 'px');
            this.vScrollBar.css({ left: parseInt(width) - parseInt(scrollSize) - scrollOffset + 'px', top: top });
            var vScrollInstance = this.vScrollInstance;
            vScrollInstance.disabled = this.disabled;
            vScrollInstance.refresh();

            var hScrollInstance = this.hScrollInstance;
            hScrollInstance.disabled = this.disabled;
            hScrollInstance.refresh();

            if ((this.vScrollBar.css('visibility') == 'visible') && (this.hScrollBar.css('visibility') == 'visible')) {
                this.bottomRight.css('visibility', 'visible');
                this.bottomRight.css({ left: 1 + parseInt(this.vScrollBar.css('left')), top: parseInt(this.hScrollBar.css('top')) });
                this.bottomRight.width(parseInt(scrollSize) + 3);
                this.bottomRight.height(parseInt(scrollSize) + 4);
            }
            else this.bottomRight.css('visibility', 'hidden');

            this.content.width(width - rightSizeOffset);
            this.content.height(height - bottomSizeOffset + 2);
            this.content.css('top', top);

            if (this.showstatusbar) {
                this.statusbar.css('top', 1 + top + height - this.statusbarheight - (this.pageable ? this.pagerheight : 0));
            }

            if (this.pageable) {
                this.pager.width(width);
                this.pager.height(this.pagerheight);
                this.pager.css('top', top + height - this.pagerheight);
            }
            else this.pager.height(0);

            if (this.table != null) {
                var offset = 0;
                if (this.vScrollBar.css('visibility') == 'visible') {
                    offset = this.scrollbarsize + 3;
                }

                var newoffset = offset + this.table.width() - this.host.width();

                this.hScrollBar.jqxScrollBar('max', newoffset);
                if (this.hScrollBar.css('visibility') == 'visible' && newoffset == 0) {
                    this.hScrollBar.css('visibility', 'hidden');
                    this._arrange();
                }
            }
            this.dataloadelement.width(this.host.width());
            this.dataloadelement.height(this.host.height());
        },

        // destroy grid.
        destroy: function () {
            if (this.host.jqxDropDownList) {
                var clearbutton = $($.find('#filterclearbutton' + this.element.id));
                var filterbutton = $($.find('#filterbutton' + this.element.id));
                var condition = $($.find('#filter1' + this.element.id));
                var filteroperator = $($.find('#filter2' + this.element.id));
                var condition2 = $($.find('#filter3' + this.element.id));
                var input1 = $($.find('.filtertext1' + this.element.id));
                var input2 = $($.find('.filtertext2' + this.element.id));
                if (input1.length > 0 && input2.length > 0) {
                    input1.removeClass();
                    input2.removeClass();
                    input1.remove();
                    input2.remove();
                }

                this.removeHandler(clearbutton, 'click');
                this.removeHandler(filterbutton, 'click');
                condition.jqxDropDownList('destroy');
                filteroperator.jqxDropDownList('destroy');
                condition2.jqxDropDownList('destroy');
            }

            if (this.host.jqxMenu) {
                if (this.gridmenu) {
                    this.removeHandler($(document), 'click.menu' + this.element.id);
                    this.removeHandler(this.gridmenu, 'keydown');
                    this.removeHandler(this.gridmenu, 'closed');
                    this.removeHandler(this.gridmenu, 'itemclick');
                    this.gridmenu.jqxMenu('destroy');
                    this.gridmenu.remove();
                }
            }

            if (this.pagershowrowscombo) {
                this.pagershowrowscombo.jqxDropDownList('destroy');
            }

            if (this.pagerrightbutton) {
                this.removeHandler(this.pagerrightbutton, 'mousedown');
                this.removeHandler(this.pagerrightbutton, 'mouseup');
                this.removeHandler(this.pagerrightbutton, 'click');
                this.pagerrightbutton.jqxButton('destroy');
            }

            if (this.pagerleftbutton) {
                this.removeHandler(this.pagerleftbutton, 'mousedown');
                this.removeHandler(this.pagerleftbutton, 'mouseup');
                this.removeHandler(this.pagerleftbutton, 'click');
                this.pagerleftbutton.jqxButton('destroy');
            }

            this.removeHandler($(document), 'mousedown.resize' + this.element.id);
            this.removeHandler($(document), 'mouseup.resize' + this.element.id);
            this.removeHandler($(document), 'mousemove.resize' + this.element.id);

            this.columns = new $.jqx.collection(this.element);
            this.rows = new $.jqx.collection(this.element);
            this.hScrollInstance.destroy();
            this.vScrollInstance.destroy();
            this.hScrollBar.remove();
            this.vScrollBar.remove();
            this._removeHandlers();
            this._clearcaches();
            this.dataview._clearcaches();
            this.content.remove();
            this.host.remove();
        },

        _initializeColumns: function () {
            var me = this;
            var _columns = new $.jqx.collection(this.element);
            var visibleindex = 0;

            if (!this._columns) {
                this._columns = this.columns;
            }
            else {
                this.columns = this._columns;
            }

            if (this.groupable) {
                $.each(this.groups, function (index) {
                    var column = new jqxGridColumn(me, this);
                    column.visibleindex = visibleindex++;
                    column.width = me.groupindentwidth;
                    //        column.pinned = true;
                    _columns.add(column);
                });
            }

            if (this.rowdetails && this.showrowdetailscolumn) {
                var column = new jqxGridColumn(me, this);
                column.visibleindex = visibleindex++;
                column.width = me.groupindentwidth;
                column.pinned = true;
                _columns.add(column);
            }

            $.each(this.columns, function (index) {
                var column = new jqxGridColumn(me, this);
                column.visibleindex = visibleindex++;
                _columns.add(column);
            });

            this.columns = _columns;
        },

        _initializeRows: function () {
            var _rows = new $.jqx.collection(this.element);
            this.rows = _rows;
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
            var result = this.host.trigger(event);
            // save the new event arguments.
            arg = event.args;
            return result;
        },

        // performs mouse wheel.
        wheel: function (event, self) {
            if (self.autoheight) {
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

        // scrolls down.
        scrollDown: function () {
            if (this.vScrollBar.css('visibility') == 'hidden')
                return;

            var vScrollInstance = this.vScrollInstance;
            if (vScrollInstance.value + this.rowsheight <= vScrollInstance.max) {
                vScrollInstance.setPosition(parseInt(vScrollInstance.value) + this.rowsheight);
            }
            else vScrollInstance.setPosition(vScrollInstance.max);
        },

        // scrolls up.
        scrollUp: function () {
            if (this.vScrollBar.css('visibility') == 'hidden')
                return;

            var vScrollInstance = this.vScrollInstance;
            if (vScrollInstance.value - this.rowsheight >= vScrollInstance.min) {
                vScrollInstance.setPosition(parseInt(vScrollInstance.value) - this.rowsheight);
            }
            else vScrollInstance.setPosition(vScrollInstance.min);
        },

        _removeHandlers: function () {
            var self = this;
            this.removeHandler(this.vScrollBar, 'valuechanged');
            this.removeHandler(this.hScrollBar, 'valuechanged');
            var eventname = 'mousedown';

            if (this.isTouchDevice()) {
                eventname = 'touchend';
            }
            this.removeHandler(this.host, eventname);
            this.removeHandler(this.content, 'mousemove');
            this.removeHandler(this.host, 'mouseleave');
            this.removeHandler(this.content, 'mouseenter');
            this.removeHandler(this.content, 'mouseleave');
            this.removeHandler(this.content, 'selectstart.' + this.element.id);
            this.removeHandler(this.host, 'dragstart.' + this.element.id);
            this.removeHandler(this.host, 'keydown.edit' + this.element.id);
            this.removeHandler($(document), 'keydown.edit' + this.element.id);
            this.removeHandler($(document), 'mousemove.selection' + this.element.id);
            this.removeHandler($(document), 'mouseup.selection' + this.element.id);
        },

        _addHandlers: function () {
            var self = this;

            this.addHandler(this.host, 'dragstart.' + this.element.id, function (event) {
                return false;
            });

            var isTouch = self.isTouchDevice();

            this.vScrollInstance.valuechanged = function (params) {
                self._closemenu();
                self._renderrows(self.virtualsizeinfo);
                if (!self.pageable && !self.groupable && self.dataview.virtualmode) {
                    if (self.loadondemandupdate) {
                        clearTimeout(self.loadondemandupdate);
                    }

                    self.loadondemandupdate = setTimeout(function () {
                        self.loadondemand = true;
                        self._renderrows(self.virtualsizeinfo);
                    }, 100);
                }
                if (isTouch) {
                    self._lastScroll = new Date();
                }
            }

            this.hScrollInstance.valuechanged = function (params) {
                self._closemenu();
                if (navigator && navigator.userAgent.indexOf('Safari') != -1) {
                    setTimeout(function () {
                        self._renderhorizontalscroll();
                        self._renderrows(self.virtualsizeinfo);
                        if (self.editcell && !self.editrow) {
                            if (self._showcelleditor && self.editcell.editing) {
                                self._showcelleditor(self.editcell.row, self.getcolumn(self.editcell.column), self.editcell.element, self.editcell.init);
                            }
                        }
                    }, 1);
                }
                else {
                    self._renderhorizontalscroll();
                    self._renderrows(self.virtualsizeinfo);
                    if (self.editcell && !self.editrow) {
                        if (self._showcelleditor && self.editcell.editing) {
                            self._showcelleditor(self.editcell.row, self.getcolumn(self.editcell.column), self.editcell.element, self.editcell.init);
                        }
                    }
                }
                if (isTouch) {
                    self._lastScroll = new Date();
                }
            }

            this._mousewheelfunc = this._mousewheelfunc || function (event) {
                if (!self.editcell && self.enablemousewheel) {
                    self.wheel(event, self);
                    return false;
                }
            };

            this.removeHandler(this.host, 'mousewheel', this._mousewheelfunc);
            this.addHandler(this.host, 'mousewheel', this._mousewheelfunc);

            var eventname = 'mousedown';

            if (this.isTouchDevice()) {
                eventname = 'touchend';
            }

            this.addHandler(this.host, eventname, function (event) {
                if (self.isTouchDevice()) {
                    self._newScroll = new Date();
                    if (self._newScroll - self._lastScroll < 500) {
                        return false;
                    }
                    if ($(event.target).ischildof(self.vScrollBar)) {
                        return false;
                    }
                    if ($(event.target).ischildof(self.hScrollBar)) {
                        return false;
                    }
                }
                self._mousedown = new Date();
                var result = self._handlemousedown(event, self);
                if (self.isNestedGrid) {
                    event.stopPropagation();
                }

                self._lastmousedown = new Date();
                return result;
            });

            this.addHandler(this.host, 'dblclick', function (event) {
                if (self.editable && self.begincelledit && self.editmode == 'dblclick') {
                    self._handledblclick(event, self);
                }
                self.mousecaptured = false;
                return true;
            });

            this.addHandler(this.content, 'mousemove', function (event) {
                if (self._handlemousemove) {
                    return self._handlemousemove(event, self);
                }
            });

            this.addHandler($(document), 'mousemove.selection' + this.element.id, function (event) {
                if (self._handlemousemoveselection) {
                    return self._handlemousemoveselection(event, self);
                }
            });

            this.addHandler($(document), 'mouseup.selection' + this.element.id, function (event) {
                if (self._handlemouseupselection) {
                    self._handlemouseupselection(event, self);
                }
            });

            if (window.frameElement) {
                if (window.top != null) {
                    var eventHandle = function (event) {
                        if (self._handlemouseupselection) {
                            self._handlemouseupselection(event, self);
                        }
                    };

                    if (window.top.document.addEventListener) {
                        window.top.document.addEventListener('mouseup', eventHandle, false);

                    } else if (window.top.document.attachEvent) {
                        window.top.document.attachEvent("on" + 'mouseup', eventHandle);
                    }
                }
            }

            this.focused = false;
            this.addHandler(this.content, 'mouseenter', function (event) {
                self.focused = true;
            });

            this.addHandler(this.content, 'mouseleave', function (event) {
                if (self._handlemousemove) {
                    if (self.enablehover) {
                        self._clearhoverstyle();
                    }
                }
                self.focused = false;
            });

            this.addHandler(this.content, 'selectstart.' + this.element.id, function (event) {
                if (!self.editcell) {
                    return false;
                }
            });

            this.addHandler($(document), 'keydown.edit' + this.element.id, function (event) {
                var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
                if (self.editable && self.editcell) {
                    if (key == 13 || key == 27) {
                        if (self._handleeditkeydown) {
                            result = self._handleeditkeydown(event, self);
                        }
                    }
                }
                if (key == 27) {
                    self.mousecaptured = false;
                    if (self.selectionarea.css('visibility') == 'visible') {
                        self.selectionarea.css('visibility', 'hidden');
                    }
                }
                if ($.browser.msie && self.focused && !self.isNestedGrid) {
                    var result = true;
                    var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
                    if (!self.editcell && self.editable && self.editmode != 'programmatic') {
                        if (self._handleeditkeydown) {
                            result = self._handleeditkeydown(event, self);
                        }
                    }
                    if (result && self.keyboardnavigation && self._handlekeydown) {
                        result = self._handlekeydown(event, self);
                        if (!result) {
                            if (event.preventDefault)
                                event.preventDefault();

                            if (event.stopPropagation != undefined) {
                                event.stopPropagation();
                            }
                        }
                        return result;
                    }
                }

                return true;
            });

            this.addHandler(this.host, 'keydown.edit' + this.element.id, function (event) {
                var result = true;

                if (self.editable && self.editmode != 'programmatic') {
                    if (self._handleeditkeydown) {
                        result = self._handleeditkeydown(event, self);
                    }
                }
                if (!$.browser.msie) {
                    if (result && self.keyboardnavigation && self._handlekeydown) {
                        result = self._handlekeydown(event, self);
                        if (self.isNestedGrid) {
                            event.stopPropagation();
                        }
                    }
                }
                else if (self.isNestedGrid) {
                    if (result && self.keyboardnavigation && self._handlekeydown) {
                        result = self._handlekeydown(event, self);
                        event.stopPropagation();
                    }
                }

                if (!result) {
                    if (event.preventDefault)
                        event.preventDefault();

                    if (event.stopPropagation != undefined) {
                        event.stopPropagation();
                    }
                }
                return result;
            });
        },

        _hittestrow: function (x, y) {
            if (this.vScrollInstance == null || this.hScrollInstance == null)
                return;

            if (x == undefined) x = 0;
            if (y == undefined) y == 0;

            var vScrollInstance = this.vScrollInstance;
            var hScrollInstance = this.hScrollInstance;
            var verticalscrollvalue = vScrollInstance.value;
            if (this.vScrollBar.css('visibility') != 'visible') {
                verticalscrollvalue = 0;
            }
            var horizontalscrollvalue = hScrollInstance.value;
            if (this.hScrollBar.css('visibility') != 'visible') {
                horizontalscrollvalue = 0;
            }
            var top = parseInt(verticalscrollvalue) + y;
            var left = parseInt(horizontalscrollvalue) + x;

            if (this.visiblerows == null) {
                return;
            }

            var hitIndex = this._findvisiblerow(top, this.visiblerows);
            if (hitIndex >= 0) {
                var hitRow = this.visiblerows[hitIndex];
                var hasdetails = this.rowdetails && hitRow.rowdetails;
                var showdetails = !hitRow.rowdetailshidden;
                if (hasdetails) {
                    var prevRow = this.visiblerows[hitIndex - 1];
                    if (prevRow == hitRow) {
                        hitRow = prevRow;
                        hitIndex--;
                    }

                    if (showdetails) {
                        var rowstop = $(this.hittestinfo[hitIndex].visualrow).position().top + parseInt(this.table.css('top'));
                        var rowsheight = $(this.hittestinfo[hitIndex].visualrow).height();
                        if (!(y >= rowstop && y <= rowstop + rowsheight)) {
                            hitIndex++;
                            hitRow = this.visiblerows[hitIndex];
                        }
                    }
                }
            }
            return { index: hitIndex, row: hitRow };
        },

        getcellatposition: function (left, top) {
            var self = this;
            var columnheaderheight = this.showheader ? this.columnsheader.height() + 2 : 0;
            var groupsheaderheight = this._groupsheader() ? this.groupsheader.height() : 0;
            var toolbarheight = this.showtoolbar ? this.toolbarheight : 0;
            groupsheaderheight += toolbarheight;

            var hostoffset = this.host.offset();
            var x = left - hostoffset.left;
            var y = top - columnheaderheight - hostoffset.top - groupsheaderheight;
            var rowinfo = this._hittestrow(x, y);
            var row = rowinfo.row;
            var index = rowinfo.index;
            var tablerow = this.table[0].rows[index];

            if (this.dataview && this.dataview.records.length == 0) {
                var rows = this.table[0].rows;
                var rowY = 0;
                for (i = 0; i < rows.length; i++) {
                    if (y >= rowY && y < rowY + this.rowsheight) {
                        tablerow = rows[i];
                        break;
                    }
                    rowY += this.rowsheight;
                }
                row = { boundindex: i };
            }

            if (tablerow == null)
                return true;

            var hScrollInstance = this.hScrollInstance;
            var horizontalscrollvalue = hScrollInstance.value;
            var cellindex = 0;
            var groupslength = this.groupable ? this.groups.length : 0;

            for (i = 0; i < tablerow.cells.length; i++) {
                var columnleft = parseInt($(this.columnsrow[0].cells[i]).css('left'));
                var left = columnleft - horizontalscrollvalue;
                if (self.columns.records[i].pinned) {
                    left = columnleft;
                }

                var right = left + $(this.columnsrow[0].cells[i]).width();
                if (right >= x && x >= left) {
                    cellindex = i;
                    break;
                }
            }

            if (row != null) {
                var column = this._getcolumnat(cellindex);
                return { row: row.boundindex, column: column.datafield, value: this.getcellvalue(row.boundindex, column.datafield) };
            }

            return null;
        },

        _handlemousedown: function (event, self) {
            if (event.target == null) {
                return true;
            }

            if (self.disabled) {
                return true;
            }

            if ($(event.target).ischildof(this.columnsheader)) {
                return true;
            }

            var rightclick;
            if (event.which) rightclick = (event.which == 3);
            else if (event.button) rightclick = (event.button == 2);

            if (rightclick) {
                return true;
            }

            var middleclick;
            if (event.which) middleclick = (event.which == 2);
            else if (event.button) middleclick = (event.button == 1);

            if (middleclick) {
                return true;
            }

            var columnheaderheight = this.showheader ? this.columnsheader.height() + 2 : 0;
            var groupsheaderheight = this._groupsheader() ? this.groupsheader.height() : 0;
            var toolbarheight = this.showtoolbar ? this.toolbarheight : 0;
            groupsheaderheight += toolbarheight;

            var hostoffset = this.host.offset();
            var left = parseInt(event.pageX);
            var top = parseInt(event.pageY);
            if (this.isTouchDevice()) {
                var touches = self.getTouches(event);
                var touch = touches[0];
                left = parseInt(touch.pageX);
                top = parseInt(touch.pageY);
                if (self.touchmode == true) {
                    left = parseInt(touch._pageX);
                    top = parseInt(touch._pageY);
                }
            }
            var x = left - hostoffset.left;
            var y = top - columnheaderheight - hostoffset.top - groupsheaderheight;
            var rowinfo = this._hittestrow(x, y);
            var row = rowinfo.row;
            var index = rowinfo.index;
            var targetclassname = event.target.className;
            var tablerow = this.table[0].rows[index];
            if (tablerow == null)
                return true;

            self.mousecaptured = true;
            self.mousecaptureposition = { left: event.pageX, top: event.pageY - groupsheaderheight };

            var hScrollInstance = this.hScrollInstance;
            var horizontalscrollvalue = hScrollInstance.value;
            var cellindex = -1;
            var groupslength = this.groupable ? this.groups.length : 0;

            for (var i = 0; i < tablerow.cells.length; i++) {
                var columnleft = parseInt($(this.columnsrow[0].cells[i]).css('left'));
                var left = columnleft - horizontalscrollvalue;
                if (self.columns.records[i].pinned) {
                    left = columnleft;
                }

                var column = this._getcolumnat(i);
                if (column != null && column.hidden) {
                    continue;
                }

                var right = left + $(this.columnsrow[0].cells[i]).width();
                if (right >= x && x >= left) {
                    cellindex = i;
                    break;
                }
            }

            if (row != null && cellindex >= 0) {
                this._raiseEvent(1, { rowindex: row.boundindex, visibleindex: row.visibleindex, group: row.group });
                var column = this._getcolumnat(cellindex);
                this._raiseEvent(8, { rowindex: row.boundindex, column: column ? column.getcolumnproperties() : null, datafield: column ? column.datafield : null, columnindex: cellindex });

                // handle double clicks.
                var _triggeredEvents = false;
                if (this._lastmousedown != null) {
                    if (this._mousedown - this._lastmousedown < 300) {
                        if (this._clickedrowindex == row.boundindex) {
                            this._raiseEvent(22, { rowindex: row.boundindex, visibleindex: row.visibleindex, group: row.group });
                            if (this._clickedcolumn == column.datafield) {
                                this._raiseEvent(23, { rowindex: row.boundindex, column: column ? column.getcolumnproperties() : null, datafield: column ? column.datafield : null, columnindex: cellindex });
                            }
                            _triggeredEvents = true;
                            this._clickedrowindex = -1;
                            this._clickedcolumn = null;
                        }
                    }
                }

                if (!_triggeredEvents) {
                    this._clickedrowindex = row.boundindex;
                    this._clickedcolumn = column.datafield;
                }
                // end of handle double clicks.

                if (targetclassname.indexOf('jqx-grid-group-expand') != -1 || targetclassname.indexOf('jqx-grid-group-collapse') != -1) {
                    if (groupslength > 0 && cellindex < groupslength && this._togglegroupstate) {
                        this._togglegroupstate(row.bounddata, true);
                    }
                    else if (cellindex == groupslength && this.rowdetails && this.showrowdetailscolumn) {
                        this._togglerowdetails(row.bounddata, true);
                        this.gridcontent[0].scrollTop = 0;
                        this.gridcontent[0].scrollLeft = 0;
                    }
                }
                else {
                    if (row.boundindex != -1) {
                        var oldselectedrowindexes = this.selectedrowindexes.slice(0);
                        var isoldcell = false;
                        if (self.selectionmode != 'none' && this._selectrowwithmouse) {
                            if (self.selectionmode == 'multiplecellsextended' || self.selectionmode == 'multiplerowsextended') {
                                if (!event.ctrlKey && !event.shiftKey) {
                                    self.selectedrowindexes = new Array();
                                    self.selectedcells = new Array();
                                }
                            }

                            if (self.selectionmode.indexOf('cell') == -1) {
                                if (this.selectedrowindex != row.boundindex) {
                                    this._applyrowselection(row.boundindex, true, false, null, column.datafield);
                                    this._selectrowwithmouse(self, rowinfo, oldselectedrowindexes, column.datafield, event.ctrlKey, event.shiftKey);
                                } 
                            }
                            else {
                                if (column.datafield != null) {
                                    this._selectrowwithmouse(self, rowinfo, oldselectedrowindexes, column.datafield, event.ctrlKey, event.shiftKey);
                                    this._applycellselection(row.boundindex, column.datafield, true, false);
                                }
                            }

                            if (self._oldselectedcell) {
                                if (self._oldselectedcell.datafield == self.selectedcell.datafield && self._oldselectedcell.rowindex == self.selectedcell.rowindex) {
                                    isoldcell = true;
                                }
                            }
                            self._oldselectedcell = self.selectedcell;
                        }
                        if (self.editable && self.begincelledit) {
                            var canselect = self.editmode == 'click' || (isoldcell && self.editmode == 'selectedcell');
                            if (self.selectionmode.indexOf('cell') == -1) {
                                canselect = true;
                            }

                            if (canselect) {
                                if (row.boundindex != undefined && column.editable) {
                                    var result = self.begincelledit(row.boundindex, column.datafield, column.defaulteditorvalue);
                                    if (result)
                                        return true;
                                }
                            }

                            if (self.selectionmode.indexOf('cell') != -1) {
                                if (self.editmode == 'selectedcell' && !isoldcell && self.editcell) {
                                    self.endcelledit(self.editcell.row, self.editcell.column, false, true);
                                }
                            }
                            return true;
                        }
                    }
                }
            }
            return true;
        },

        _columnPropertyChanged: function (column, key, oldvalue, value) {
        },

        _rowPropertyChanged: function (row, key, oldvalue, value) {
        },

        propertyChangedHandler: function (object, key, oldvalue, value) {
            if (this.isInitialized == undefined || this.isInitialized == false)
                return;

            switch (key) {
                case "touchmode":
                    object._removeHandlers();
                    object.touchDevice = null;
                    object.vScrollBar.jqxScrollBar({ touchMode: value });
                    object.hScrollBar.jqxScrollBar({ touchMode: value });
                    object._updateTouchScrolling();
                    object._addHandlers();
                    break;
                case "rendergridrows":
                    object.updatebounddata();
                    break;
                case "editmode":
                    object._removeHandlers();
                    object._addHandlers();
                    break;
                case "source":
                    object.virtualsizeinfo = null;
                    object.updatebounddata();
                    if (object.virtualmode && !object._loading) {
                        object.loadondemand = true;
                        object._renderrows(object.virtualsizeinfo);
                    }
                    break;
                case "horizontalscrollbarstep":
                case "verticalscrollbarstep":
                case "horizontalscrollbarlargestep":
                case "verticalscrollbarlargestep":
                    this.vScrollBar.jqxScrollBar({ step: this.verticalscrollbarstep, largestep: this.verticalscrollbarlargestep });
                    this.hScrollBar.jqxScrollBar({ step: this.horizontalscrollbarstep, largestep: this.horizontalscrollbarlargestep });
                    break;
                case "closeablegroups":
                    if (object._initgroupsheader) {
                        object._initgroupsheader();
                    }
                    break;
                case "showgroupsheader":
                    object.rendergridcontent();
                    break;
                case "theme":
                    if (object.pager) {
                        object.pager.removeClass();
                        object.pager.addClass(object.toTP('jqx-grid-pager'));
                        object.pager.addClass(object.toTP('jqx-widget-header'));
                        if (object.pageable && object._updatepagertheme) {
                            object._updatepagertheme();
                        }
                    }
                    if (object.groupsheader) {
                        object.groupsheader.removeClass();
                        object.groupsheader.addClass(object.toTP('jqx-grid-groups-header'));
                        object.groupsheader.addClass(object.toTP('jqx-widget-header'));
                    }
                    object.toolbar.removeClass();
                    object.toolbar.addClass(object.toTP('jqx-grid-toolbar'));
                    object.toolbar.addClass(object.toTP('jqx-widget-header'));
                    object.statusbar.removeClass();
                    object.statusbar.addClass(object.toTP('jqx-grid-statusbar'));
                    object.statusbar.addClass(object.toTP('jqx-widget-content'));
                    object.vScrollBar.jqxScrollBar({ theme: object.theme });
                    object.hScrollBar.jqxScrollBar({ theme: object.theme });
                    object.host.removeClass();
                    object.host.addClass(object.toTP('jqx-grid'));
                    object.host.addClass(object.toTP('jqx-reset'));
                    object.host.addClass(object.toTP('jqx-rc-all'));
                    object.host.addClass(object.toTP('jqx-widget'));
                    object.host.addClass(object.toTP('jqx-widget-content'));
                    object.bottomRight.removeClass();
                    object.bottomRight.addClass(object.toTP('jqx-grid-bottomright'));
                    object.toolbar.addClass(object.toTP('jqx-grid-toolbar'));
                    object.toolbar.addClass(object.toTP('jqx-widget-header'));
                    object.statusbar.addClass(object.toTP('jqx-grid-statusbar'));
                    object.statusbar.addClass(object.toTP('jqx-widget-header'));

                    object.render();

                    break;
                case "showtoolbar":
                case "toolbarheight":
                    object._arrange();
                    object.refresh();
                    break;
                case "showstatusbar":
                case "statusbarheight":
                    object._arrange();
                    object.refresh();
                    break;
                case "filterable":
                    if (oldvalue != value) {
                        object.render();
                    }
                    break;
                case "autoshowfiltericon":
                case "showfiltercolumnbackground":
                case "showpinnedcolumnbackground":
                case "showsortcolumnbackground":
                    object.rendergridcontent();
                    break;
                case "showrowdetailscolumn":
                    object.render();
                    break;
                case "scrollbarsize":
                    object._arrange();
                    break;
                case "width":
                    if (oldvalue != value) {
                        if (!this._loading) {
                            if (value != oldvalue) {
                                object._arrange();
                                object._updatecolumnwidths();
                                object._updatecellwidths();
                                object._renderrows(object.virtualsizeinfo);
                            }
                        }
                    }
                    break;
                case "height":
                    if (oldvalue != value) {
                        if (!this._loading) {
                            if (value != oldvalue) {
                                var hasgroups = object.groupable && object.groups.length > 0;
                                var isVScrollHidden = object.vScrollBar.css('visibility') != 'visible';

                                if (!hasgroups) {
                                    object._arrange();
                                    object.virtualsizeinfo = object._calculatevirtualheight();
                                    if (parseInt(value) >= parseInt(oldvalue)) {
                                        object.prerenderrequired = true;
                                    }
                                    object._renderrows(object.virtualsizeinfo);
                                }
                                else {
                                    if (value >= oldvalue) {
                                        object._render(true, false, false);
                                    }
                                    else {
                                        object.rendergridcontent(true, false);
                                    }
                                }

                                if (isVScrollHidden && object.vScrollBar.css('visibility') == 'visible') {
                                    object._arrange();
                                    object._updatecolumnwidths();
                                    object._updatecellwidths();
                                }
                            }
                        }
                    }
                    break;
                case "altrows":
                case "altstart":
                case "altstep":
                    object._renderrows(object.virtualsizeinfo);
                    break;
                case "groupsheaderheight":
                    object._arrange();
                    if (object._initgroupsheader) {
                        object._initgroupsheader();
                    }
                    break;
                case "pagerheight":
                    if (oldvalue != value)
                        object._initpager();
                    break;
                case "selectedrowindex":
                    object.selectrow(value);
                    break;
                case "selectionmode":
                    if (oldvalue != value) {
                        if (value == 'none') {
                            object.selectedrowindexes = new Array();
                            object.selectedcells = new Array();
                            object.selectedrowindex = -1;
                        }
                        object._renderrows(object.virtualsizeinfo);
                    }
                    break;
                case "showheader":
                    if (value) {
                        object.columnsheader.css('display', 'block');
                    }
                    else {
                        object.columnsheader.css('display', 'none');
                    }
                    break;
                case "virtualmode":
                    object.dataview.virtualmode = object.virtualmode;
                    object.dataview.refresh(false);
                    object._render(false, false, false);
                    break;
                case "columnsmenu":
                    if (oldvalue != value) {
                        object.render();
                    }
                    break;
                case "columns":
                    object._columns = null;
                    object.render();
                    break;
                case "autoheight":
                    if (oldvalue != value) {
                        object._render(false, false, true);
                    }
                    break;
                case "pagesizeoptions":
                case "pageable":
                case "pagesize":
                    if (oldvalue != value) {
                        if (object._loading) {
                            alert(object.loadingerrormessage);
                            return;
                        }
                        if (object._initpager) {
                            object.dataview.pageable = object.pageable;
                            object.dataview.pagenum = 0;
                            object.dataview.pagesize = object._getpagesize();
                            if (object.virtualmode) {
                                object.updatebounddata();
                            }
                            object.dataview.refresh(true);
                            object._initpager();
                            if (key == "pagesizeoptions") {
                                if (value != null && value.length > 0) {
                                    object.pagesize = value[0];
                                    object.dataview.pagesize = value[0];
                                    object.prerenderrequired = true;
                                    object._requiresupdate = true;
                                    object.dataview.pagenum = -1;
                                    object.gotopage(0);
                                }
                            }
                        }
                        object._render(false, false, false);
                    }
                    break;
                case "groups":
                    object.updatebounddata();
                    break;
                case "groupable":
                    object.dataview.groupable = object.groupable;
                    object.dataview.pagenum = 0;
                    object.dataview.refresh(false);
                    object._render(false, false, true);
                    break;
            }
        }
    });

    function jqxGridColumn(owner, data) {
        this.owner = owner;
        this.datafield = null;
        this.text = '';
        this.sortable = true;
        this.hideable = true;
        this.editable = true;
        this.hidden = false;
        this.groupable = true;
        this.renderer = null;
        this.cellsrenderer = null;
        // checkbox column, number column, button column
        this.checkchange = null,
        this.buttonclick = null,
        this.columntype = null;
        this.cellsformat = "";
        this.align = 'left';
        this.cellsalign = 'left';
        this.width = 'auto';
        this.minwidth = 25;
        this.maxwidth = 'auto';
        this.pinned = false;
        this.visibleindex = -1;
        this.filterable = true;
        this.filter = null;
        this.resizable = true;
        this.initeditor = null;
        this.createeditor = null;
        this.validation = null;
        this.classname = '';
        this.cellclassname = '';
        this.cellendedit = null;
        this.cellbeginedit = null;
        this.getcolumnproperties = function () {
            return { sortable: this.sortable, hideable: this.hideable,
                hidden: this.hidden, groupable: this.groupable, width: this.width, align: this.align, editable: this.editable,
                minwidth: this.minwidth, maxwidth: this.maxwidth, resizable: this.resizable, datafield: this.datafield, text: this.text,
                cellsalign: this.cellsalign, pinned: this.pinned, cellsformat: this.cellsformat, columntype: this.columntype, classname: this.classname, cellclassname: this.cellclassname
            };
        },

        this.setproperty = function (propertyname, value) {
            if (this[propertyname]) {
                var oldvalue = this[propertyname];
                this[propertyname] = value;
                this.owner._columnPropertyChanged(this, propertyname, value, oldvalue);
            }
        }

        this._initfields = function (data) {
            if (data != null) {
                if (data.datafield != undefined) {
                    this.datafield = data.datafield;
                }
                if (data.dataField != undefined) {
                    this.datafield = data.dataField;
                }
                if (data.text != undefined) {
                    this.text = data.text;
                }
                if (data.sortable != undefined) {
                    this.sortable = data.sortable;
                }
                if (data.hideable != undefined) {
                    this.hideable = data.hideable;
                }
                if (data.hidden != undefined) {
                    this.hidden = data.hidden;
                }
                if (data.groupable != undefined) {
                    this.groupable = data.groupable;
                }
                if (data.renderer != undefined) {
                    this.renderer = data.renderer;
                }
                if (data.align != undefined) {
                    this.align = data.align;
                }
                if (data.cellsalign != undefined) {
                    this.cellsalign = data.cellsalign;
                }
                if (data.cellsformat != undefined) {
                    this.cellsformat = data.cellsformat;
                }
                if (data.width != undefined) {
                    this.width = data.width;
                }
                if (data.minwidth != undefined) {
                    this.minwidth = data.minwidth;
                }
                if (data.maxwidth != undefined) {
                    this.maxwidth = data.maxwidth;
                }
                if (data.cellsrenderer != undefined) {
                    this.cellsrenderer = data.cellsrenderer;
                }
                if (data.columntype != undefined) {
                    this.columntype = data.columntype;
                }
                if (data.checkchange != undefined) {
                    this.checkchange = data.checkchange;
                }
                if (data.buttonclick != undefined) {
                    this.buttonclick = data.buttonclick;
                }
                if (data.pinned != undefined) {
                    this.pinned = data.pinned;
                }
                if (data.visibleindex != undefined) {
                    this.visibleindex = data.visibleindex;
                }
                if (data.filterable != undefined) {
                    this.filterable = data.filterable;
                }
                if (data.filter != undefined) {
                    this.filter = data.filter;
                }
                if (data.resizable != undefined) {
                    this.resizable = data.resizable;
                }
                if (data.editable != undefined) {
                    this.editable = data.editable;
                }
                if (data.initeditor != undefined) {
                    this.initeditor = data.initeditor;
                }
                if (data.createeditor != undefined) {
                    this.createeditor = data.createeditor;
                }
                if (data.validation != undefined) {
                    this.validation = data.validation;
                }
                if (data.cellbeginedit != undefined) {
                    this.cellbeginedit = data.cellbeginedit;
                }
                if (data.cellendedit != undefined) {
                    this.cellendedit = data.cellendedit;
                }
                if (data.classname != undefined) {
                    this.classname = data.classname;
                }
                if (data.cellclassname != undefined) {
                    this.cellclassname = data.cellclassname;
                }
            }
        }

        this._initfields(data);
        return this;
    }

    function jqxGridRow(owner, data) {
        this.setdata = function (data) {
            if (data != null) {
                this.bounddata = data;
                this.boundindex = data.boundindex;
                this.visibleindex = data.visibleindex;
                this.group = data.group;
                this.parentbounddata = data.parentItem;
                this.uniqueid = data.uniqueid;
                this.level = data.level;
            }
        }
        this.setdata(data);
        this.parentrow = null;
        this.subrows = new Array();
        this.owner = owner;
        this.height = 25;
        this.hidden = false;
        this.rowdetails = null;
        this.rowdetailsheight = 100;
        this.rowdetailshidden = true;
        this.top = -1;

        this.getrowinfo = function () {
            return { hidden: this.hidden, rowdetails: this.rowdetails, rowdetailsheight: this.rowdetailsheight,
                showdetails: !this.rowdetailshidden, height: this.height, index: this.visibleindex
            };
        }

        this.setrowinfo = function (data) {
            this.hidden = data.hidden;
            this.rowdetails = data.rowdetails;
            this.rowdetailsheight = data.rowdetailsheight;
            this.rowdetailshidden = !data.showdetails;
            this.height = data.height;
        }

        return this;
    }

    $.jqx.collection = function (owner) {
        this.records = new Array();
        this.owner = owner;
        this.updating = false;
        this.beginupdate = function () {
            this.updating = true;
        }

        this.resumeupdate = function () {
            this.updating = false;
        }

        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (elt /*, from*/) {
                var len = this.length;

                var from = Number(arguments[1]) || 0;
                from = (from < 0)
                    ? Math.ceil(from)
                    : Math.floor(from);
                if (from < 0)
                    from += len;

                for (; from < len; from++) {
                    if (from in this &&
                    this[from] === elt)
                        return from;
                }
                return -1;
            };
        }

        this._raiseEvent = function (args) {
            var event = new jQuery.Event('collectionchanged');
            event.owner = this.owner;
            event.args = args;
            $(this.owner).trigger(event);
        }

        this.replace = function (index, object) {
            this.records[index] = object;
            if (!this.updating) {
                this._raiseEvent({ type: 'replace', element: object });
            }
        }

        this.isempty = function (index) {
            if (this.records[index] == undefined) {
                return true;
            }

            return false;
        }

        this.initialize = function (size) {
            if (size < 1) size = 1;
            this.records[size - 1] = -1;
        }

        this.length = function () {
            return this.records.length;
        }

        this.indexOf = function (object) {
            return this.records.indexOf(object);
        }

        this.add = function (object) {
            if (object == null)
                return false;

            this.records[this.records.length] = object;
            if (!this.updating) {
                this._raiseEvent({ type: 'add', element: object });
            }
            return true;
        }

        this.insertAt = function (index, object) {
            if (index == null || index == undefined)
                return false;

            if (object == null)
                return false;

            if (index >= 0) {
                if (index < this.records.length) {
                    this.records.splice(index, 0, object);
                    if (!this.updating) {
                        this._raiseEvent({ type: 'insert', index: index, element: object });
                    }
                    return true;
                }
                else return this.add(object);
            }

            return false;
        }

        this.remove = function (object) {
            if (object == null || object == undefined)
                return false;

            var index = this.records.indexOf(object);
            if (index != -1) {
                this.records.splice(index, 1);
                if (!this.updating) {
                    this._raiseEvent({ type: 'remove', element: object });
                }
                return true;
            }

            return false;
        }

        this.removeAt = function (index) {
            if (index == null || index == undefined)
                return false;

            if (index < 0)
                return false;

            if (index < this.records.length) {
                var object = this.records[index];
                this.records.splice(index, 1);
                if (!this.updating) {
                    this._raiseEvent({ type: 'removeAt', index: index, element: object });
                }
                return true;
            }

            return false;
        }

        return this;
    }

    $.jqx.dataview = function () {
        this.self = this;
        this.grid = null;
        this.uniqueId = "id";
        this.records = [];
        this.rows = [];
        this.columns = [];
        this.groups = [];
        this.filters = new Array();
        this.updated = null;
        this.update = null;
        this.suspend = false;
        this.pagesize = 0;
        this.pagenum = 0;
        this.totalrows = 0;
        this.totalrecords = 0;
        this.groupable = true;
        this.loadedrecords = [];
        this.loadedrootgroups = [];
        this.loadedgroups = [];
        this.loadedgroupsByKey = [];
        this.virtualmode = true;
        this._cachegrouppages = new Array();
        this.source = null;
        this.changedrecords = new Array();
        this.rowschangecallback = null;

        this.suspendupdate = function () {
            this.suspend = true;
        },

        this.isupdating = function () {
            return this.suspend;
        },

        this.resumeupdate = function (refresh) {
            this.suspend = false;

            if (refresh == undefined)
                refresh = true;

            this.refresh(refresh);
        },

        this.getrecords = function () {
            return this.records;
        },

        this.clearrecords = function () {
            this.recordids = new Array();
        }

        this.databind = function (source, objectuniqueId) {
            var isdataadapter = source._source ? true : false;
            var dataadapter = null;

            if (isdataadapter) {
                dataadapter = source;
                source = source._source;
            }
            else {
                dataadapter = new $.jqx.dataAdapter(source,
                {
                    autoBind: false
                });
            }

            var initadapter = function (me) {
                dataadapter._options.virtualmode = me.virtualmode;
                dataadapter._options.totalrecords = me.totalrecords;
                dataadapter._options.originaldata = me.originaldata;
                dataadapter._options.recordids = me.recordids;
                dataadapter._options.cachedrecords = new Array();
                dataadapter._options.pagenum = me.pagenum;
                dataadapter._options.pageable = me.pageable;
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
                if (source.updaterow != undefined) {
                    dataadapter._options.updaterow = source.updaterow;
                }
                if (source.addrow != undefined) {
                    dataadapter._options.addrow = source.addrow;
                }
                if (source.deleterow != undefined) {
                    dataadapter._options.deleterow = source.deleterow;
                }

                if (me.pagesize == 0) me.pagesize = 10;
                dataadapter._options.pagesize = me.pagesize;
            }

            var updatefromadapter = function (me) {
                me.totalrecords = dataadapter.totalrecords;
                if (!me.virtualmode) {
                    me.originaldata = dataadapter.originaldata;
                    me.records = dataadapter.records;
                    me.recordids = dataadapter.recordids;
                    me.cachedrecords = dataadapter.cachedrecords;
                }
                else {
                    var rendergridrowsobj = { startindex: me.pagenum * me.pagesize, endindex: (me.pagenum * me.pagesize + me.pagesize) };
                    if (source.recordstartindex) {
                        rendergridrowsobj.startindex = source.recordstartindex;
                    }
                    if (source.recordendindex) {
                        rendergridrowsobj.endindex = source.recordendindex;
                    }
                    else if (!me.grid.pageable) {
                        rendergridrowsobj.endindex = rendergridrowsobj.startindex + 100;
                        if (me.grid.autoheight) {
                            rendergridrowsobj.endindex = rendergridrowsobj.startindex + me.totalrecords;
                        }
                    }
                    rendergridrowsobj.data = dataadapter.records;
                    if (me.grid.rendergridrows && me.totalrecords > 0) {
                        source.records = me.grid.rendergridrows(rendergridrowsobj);
                    }

                    if (!source.records || me.totalrecords == 0) {
                        source.records = new Array();
                    }

                    me.originaldata = source.records;
                    me.records = source.records;
                    me.cachedrecords = source.records;
                }
            }

            initadapter(this);

            this.source = source;
            if (objectuniqueId !== undefined) {
                uniqueId = objectuniqueId;
            }

            var me = this;
            switch (source.datatype) {
                case "local":
                case "array":
                default:
                    if (source.localdata == null) {
                        source.localdata = [];
                    }

                    if (source.localdata != null) {
                        dataadapter.unbindBindingUpdate(me.grid.element.id);
                        dataadapter.dataBind();

                        var updateFunc = function (changeType) {
                            updatefromadapter(me);

                            if (changeType == 'updateData') {
                                me.refresh();
                                me.grid._updateGridData();
                            }
                            else {
                                if (source.recordstartindex && this.virtualmode) {
                                    me.updateview(source.recordstartindex, source.recordstartindex + me.pagesize);
                                }
                                else {
                                    me.refresh();
                                }
                                me.update();
                            }
                        }

                        updateFunc();
                        dataadapter.bindBindingUpdate(me.grid.element.id, updateFunc);
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
                            dataadapter.unbindBindingUpdate(me.grid.element.id);
                            dataadapter.dataBind();

                            var updateFunc = function (changeType) {
                                updatefromadapter(me);

                                if (changeType == 'updateData') {
                                    me.refresh();
                                    me.grid._updateGridData();
                                }
                                else {
                                    if (source.recordstartindex) {
                                        me.updateview(source.recordstartindex, source.recordstartindex + me.pagesize);
                                    }
                                    else {
                                        me.refresh();
                                    }

                                    me.update();
                                }
                            }

                            updateFunc();
                            dataadapter.bindBindingUpdate(me.grid.element.id, updateFunc);
                            return;
                        }

                        var filterdata = {};
                        var filterslength = 0;
                        var postdata = {};
                        for (x = 0; x < this.filters.length; x++) {
                            var filterdatafield = this.filters[x].datafield;
                            var filter = this.filters[x].filter;
                            var filters = filter.getfilters();
                            postdata[filterdatafield + "operator"] = filter.operator;
                            for (m = 0; m < filters.length; m++) {
                                filters[m].datafield = filterdatafield;
                                postdata["filtervalue" + filterslength] = filters[m].value;
                                postdata["filtercondition" + filterslength] = filters[m].condition;
                                postdata["filteroperator" + filterslength] = filters[m].operator;
                                postdata["filterdatafield" + filterslength] = filterdatafield;

                                filterslength++;
                            }
                        }

                        postdata.filterscount = filterslength;
                        postdata.groupscount = me.groups.length;
                        for (x = 0; x < me.groups.length; x++) {
                            postdata["group" + x] = me.groups[x];
                        }

                        $.extend(postdata, { sortdatafield: me.sortfield, sortorder: me.sortfielddirection, pagenum: me.pagenum, pagesize: me.grid.pagesize });

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

                            if (source.recordstartindex) {
                                me.updateview(source.recordstartindex, source.recordstartindex + me.pagesize);
                            }
                            else {
                                me.refresh();
                            }

                            me.update();
                        }

                        dataadapter.unbindDownloadComplete(me.grid.element.id);
                        dataadapter.bindDownloadComplete(me.grid.element.id, updateFunc);
                        dataadapter.dataBind();
                    }
            }
        }

        this.getid = function (id, record, index) {
            if ($(id, record).length > 0) {
                return $(id, record).text();
            }

            if (id) {
                if (id.toString().length > 0) {
                    var result = $(record).attr(id);
                    if (result != null && result.toString().length > 0) {
                        return result;
                    }
                }
            }

            return index;
        }

        this.getvaluebytype = function (value, datafield) {
            var originalvalue = value;
            if (datafield.type == 'date') {
                var tmpvalue = new Date(value);

                if (tmpvalue.toString() == 'NaN' || tmpvalue.toString() == "Invalid Date") {
                    if ($.jqx.dataFormat) {
                        value = $.jqx.dataFormat.tryparsedate(value);
                    }
                    else value = tmpvalue;
                }
                else {
                    value = tmpvalue;
                }

                if (value == null) {
                    value = originalvalue;
                }
            }
            else if (datafield.type == 'float') {
                var value = parseFloat(value);
                if (isNaN(value)) {
                    value = originalvalue;
                }
            }
            else if (datafield.type == 'int') {
                var value = parseInt(value);
                if (isNaN(value)) {
                    value = originalvalue;
                }
            }
            else if (datafield.type == 'bool') {
                if (value != null) {
                    if (value.toLowerCase() == 'false') {
                        value = false;
                    }
                    else if (value.toLowerCase() == 'true') {
                        value = true;
                    }
                }

                if (value == 1) {
                    value = true;
                }
                else if (value == 0) {
                    value = false;
                }
                else value = '';
            }

            return value;
        }

        this.setpaging = function (args) {
            if (args.pageSize != undefined) {
                this.pagesize = args.pageSize;
            }

            if (args.pageNum != undefined) {
                this.pagenum = Math.min(args.pageNum, Math.ceil(this.totalrows / this.pagesize));
            }

            this.refresh();
        }

        this.getpagingdetails = function () {
            return { pageSize: this.pagesize, pageNum: this.pagenum, totalrows: this.totalrows };
        }

        this._clearcaches = function () {
            this.sortcache = {};
            this.sortdata = [];
            this.changedrecords = new Array();
            this.records = new Array();
            this.cacheddata = new Array();
            this.originaldata = new Array();
            this.bounditems = new Array();
            this.loadedrecords = new Array();
            this.loadedrootgroups = new Array();
            this.loadedgroups = new Array();
            this.loadedgroupsByKey = new Array();
            this._cachegrouppages = new Array();
            this.recordsbyid = {};
        }

        this.addfilter = function (field, filter) {
            var filterindex = -1;
            for (m = 0; m < this.filters.length; m++) {
                if (this.filters[m].datafield == field) {
                    filterindex = m;
                    break;
                }
            }

            if (filterindex == -1) {
                this.filters[this.filters.length] = { filter: filter, datafield: field };
            }
            else {
                this.filters[filterindex] = { filter: filter, datafield: field };
            }
        }

        this.removefilter = function (field) {
            for (i = 0; i < this.filters.length; i++) {
                if (this.filters[i].datafield == field) {
                    this.filters.splice(i, 1);
                    break;
                }
            }
        }

        this.getItemFromIndex = function (i) {
            return this.records[i];
        }

        this.updaterow = function (rowid, rowdata) {
            if (rowdata != undefined && rowid != undefined) {

                rowdata.uid = rowid;
                if (!(rowdata[this.source.id])) {
                    rowdata[this.source.id] = rowdata.uid;
                }

                var record = this.recordsbyid["id" + rowid];
                var recordindex = this.records.indexOf(record);
                this.records[recordindex] = rowdata;
                this.refresh();
                this.changedrecords[rowdata.uid] = { Type: "Update", OldData: record, Data: rowdata };
                return true;
            }
            return false;
        }

        this.addrow = function (rowid, rowdata, position) {
            if (rowdata != undefined) {
                if (!rowid) {
                    rowdata.uid = this.getid(this.source.id, rowdata, this.totalrecords);
                    var record = this.recordsbyid["id" + rowdata.uid];
                    while (record != null) {
                        var uid = Math.floor(Math.random() * 10000).toString();
                        rowdata.uid = uid;
                        record = this.recordsbyid["id" + uid];
                    }
                }
                else rowdata.uid = rowid;

                if (!(rowdata[this.source.id])) {
                    rowdata[this.source.id] = rowdata.uid;
                }

                if (position == 'last') {
                    this.records.push(rowdata);
                }
                else {
                    this.records.splice(0, 0, rowdata);
                }

                this.totalrecords++;
                this.refresh();

                this.changedrecords[rowdata.uid] = { Type: "New", Data: rowdata };
                return true;
            }
            return false;
        }

        this.deleterow = function (rowid) {
            if (rowid != undefined) {
                if (this.recordsbyid["id" + rowid]) {
                    var record = this.recordsbyid["id" + rowid];
                    var recordindex = this.records.indexOf(record);
                    this.changedrecords[rowid] = { Type: "Delete", Data: this.records[recordindex] };
                    this.records.splice(recordindex, 1);
                    this.totalrecords--;
                    this.refresh();
                    return true;
                }
                return false;
            }

            return false;
        }

        this.reload = function (_records, _rows, _filter, _updated, fullupdate, startindex, endindex) {
            var self = this;
            var diff = new Array();
            var records = _records;
            var rows = _rows;
            var filter = _filter;
            var updated = _updated;

            var rl = rows.length;
            var currentRowIndex = 0;
            var currentPageIndex = 0;
            var item, id;
            this.columns = [];
            this.bounditems = new Array();
            this.loadedrecords = new Array();
            this.loadedrootgroups = new Array();
            this.loadedgroups = new Array();
            this.loadedgroupsByKey = new Array();
            this._cachegrouppages = new Array();
            this.recordsbyid = {};

            if (this.totalrecords == 0) {
                Object.size = function (obj) {
                    var size = 0, key;
                    for (key in obj) {
                        if (obj.hasOwnProperty(key)) size++;
                    }
                    return size;
                };

                var totalrecords = Object.size(records);
                this.totalrecords = totalrecords;

                $.each(this.records, function (i) {
                    var item = this;
                    var index = 0;
                    $.each(item, function (columnName, value) {
                        self.columns[index++] = columnName;
                    });

                    return false;
                });
            }

            if (this.virtualmode) {
                if (this.pageable) {
                    this.updateview();
                    return;
                }

                var startindex = 0;
                if (!this.groupable) {
                    this.updateview();
                    return;
                }
                else {
                    var endindex = this.totalrecords;
                }
            }
            else {
                var startindex = 0;
                var endindex = this.totalrecords;
            }

            if (this.groupable && this.groups.length > 0 && this.loadgrouprecords) {
                var visualRows = startindex;
                visualRows = this.loadgrouprecords(0, startindex, endindex, filter, currentPageIndex, updated, rows, rl, diff);
            }
            else {
                currentRowIndex = this.loadflatrecords(startindex, endindex, filter, currentPageIndex, updated, rows, rl, diff);
            }

            if (rl > currentPageIndex)
                rows.splice(currentPageIndex, rl - currentPageIndex);


            if (this.groups.length > 0 && this.groupable) {
                this.totalrows = visualRows;
            }
            else {
                this.totalrows = currentRowIndex;
            }

            return diff;
        }

        this.loadflatrecords = function (startindex, endindex, filter, currentPageIndex, updated, rows, rl, diff) {
            var self = this;
            var i = startindex;
            var currentRowIndex = startindex;
            endindex = Math.min(endindex, this.totalrecords);

            var hassortdata = this.sortdata != null;
            var localdata = this.source.id && (this.source.datatype == 'local' || this.source.datatype == 'array' || this.source.datatype == '');

            var data = hassortdata ? this.sortdata : this.records;

            for (obj = startindex; obj < endindex; obj++) {
                var item = {};
                if (!hassortdata) {
                    item = $.extend({}, data[obj]);
                    id = item[self.uniqueId];
                    item.boundindex = i;
                    self.loadedrecords[i] = item;

                    if (!item.uid) {
                        item.uid = self.getid(self.source.id, item, i);
                    }
                    self.recordsbyid["id" + item.uid] = data[obj];
                    item.uniqueid = self.generatekey();
                    self.bounditems[this.bounditems.length] = item;
                }
                else {
                    item = $.extend({}, data[obj].value);
                    id = item[self.uniqueId];
                    item.boundindex = data[obj].index;
                    if (!item.uid) {
                        item.uid = self.getid(self.source.id, item, item.boundindex);
                    }
                    self.recordsbyid["id" + item.uid] = data[obj].value;
                    self.loadedrecords[i] = item;
                    item.uniqueid = self.generatekey();
                    self.bounditems[item.boundindex] = item;
                }

                if (currentPageIndex >= rl || id != rows[currentPageIndex][self.uniqueId] || (updated && updated[id]))
                    diff[diff.length] = currentPageIndex;

                rows[currentPageIndex] = item;
                currentPageIndex++;

                item.visibleindex = currentRowIndex;
                currentRowIndex++;
                i++;
            }

            if (self.grid.summaryrows) {
                var rowindex = i;
                $.each(self.grid.summaryrows, function () {
                    var item = $.extend({}, this);
                    item.boundindex = endindex++;
                    self.loadedrecords[rowindex] = item;
                    item.uniqueid = self.generatekey();
                    self.bounditems[self.bounditems.length] = item;
                    rows[currentPageIndex] = item;
                    currentPageIndex++;
                    item.visibleindex = currentRowIndex;
                    currentRowIndex++;
                    rowindex++;
                });
            }

            return currentRowIndex;
        },

        this.updateview = function (from, to) {
            var self = this;
            var currentRowIndex = this.pagesize * this.pagenum;
            var currentPageIndex = 0;
            var rows = new Array();
            var filter = this.filters;
            var updated = this.updated;
            var rl = rows.length;

            if (this.pageable) {
                if (this.virtualmode) {
                    if (!this.groupable || this.groups.length == 0) {
                        this.loadflatrecords(this.pagesize * this.pagenum, this.pagesize * (1 + this.pagenum), filter, currentPageIndex, updated, rows, rl, []);
                        this.totalrows = rows.length;
                    }
                    else if (this.groupable && this.groups.length > 0 && this.loadgrouprecords) {
                        if (this._cachegrouppages[this.pagenum + '_' + this.pagesize] != undefined) {
                            this.rows = this._cachegrouppages[this.pagenum + '_' + this.pagesize];
                            this.totalrows = this.rows.length;
                            return;
                        }

                        this.loadgrouprecords(0, this.pagesize * this.pagenum, this.pagesize * (1 + this.pagenum), filter, currentPageIndex, updated, rows, rl, []);
                        this._cachegrouppages[this.pagenum + '_' + this.pagesize] = this.rows;
                        this.totalrows = this.rows.length;
                        return;
                    }
                }
            }
            else {
                if (this.virtualmode && (!this.groupable || this.groups.length == 0)) {
                    var pagesize = this.pagesize;
                    if (pagesize == 0) {
                        pagesize = Math.min(100, this.totalrecords);
                    }
                    var start = pagesize * this.pagenum;
                    if (this.loadedrecords.length == 0) start = 0;

                    if (from != null && to != null) {
                        this.loadflatrecords(from, to, filter, currentPageIndex, updated, rows, rl, []);
                    }
                    else {
                        this.loadflatrecords(this.pagesize * this.pagenum, this.pagesize * (1 + this.pagenum), filter, currentPageIndex, updated, rows, rl, []);
                    }
                    this.totalrows = this.loadedrecords.length;
                    this.rows = rows;
                    if (rows.length >= pagesize) {
                        return;
                    }
                }
            }

            if (this.groupable && this.pageable && this.groups.length > 0 && this._updategroupsinpage) {
                rows = this._updategroupsinpage(self, filter, currentRowIndex, currentPageIndex, rl, this.pagesize * this.pagenum, this.pagesize * (1 + this.pagenum));
            }
            else {
                for (i = this.pagesize * this.pagenum; i < this.pagesize * (1 + this.pagenum); i++) {
                    var item = i < this.loadedrecords.length ? this.loadedrecords[i] : null;
                    if (item == null) continue;

                    if (!this.pagesize || (currentRowIndex >= this.pagesize * this.pagenum && currentRowIndex <= this.pagesize * (this.pagenum + 1))) {
                        rows[currentPageIndex] = item;
                        currentPageIndex++;
                    }

                    currentRowIndex++;
                }
            }

            if ((rows.length == 0 || rows.length < this.pagesize) && !this.pageable && this.virtualmode) {
                currentPageIndex = rows.length;
                var startlength = rows.length;
                for (i = this.pagesize * this.pagenum; i < this.pagesize * (1 + this.pagenum) - startlength; i++) {
                    var item = {};
                    item.boundindex = i + startlength;
                    item.visibleindex = i + startlength;
                    item.uniqueid = self.generatekey();
                    item.empty = true;
                    self.bounditems[i + startlength] = item;
                    rows[currentPageIndex] = item;
                    currentPageIndex++;
                }
            }

            this.rows = rows;
        }

        this.generatekey = function () {
            var S4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        }

        this.reloaddata = function () {
            this.reload(this.records, this.rows, this.filter, this.updated, true);
        }

        this.refresh = function (fullupdate) {
            if (this.suspend) return;

            if (fullupdate == undefined) {
                fullupdate = true;
            }

            var countBefore = this.rows.length;
            var totalrowsBefore = this.totalrows;

            if (this.filters.length > 0 && !this.virtualmode) {
                var filter = "";
                var length = this.cachedrecords.length;
                var filtereddata = new Array();
                this.totalrecords = 0;
                var data = this.cachedrecords;
                this._dataIndexToBoundIndex = new Array();
                var filterslength = this.filters.length;

                if (this.source != null && this.source.filter != undefined && this.source.localdata != undefined) {
                    filtereddata = this.source.filter(this.filters, data, length);
                    if (filtereddata == undefined) {
                        filtereddata = new Array();
                    }
                    this.records = filtereddata;
                }
                else if (this.source.filter == null || this.source.filter == undefined) {
                    for (row = 0; row < length; row++) {
                        var datarow = data[row];
                        var filterresult = undefined;
                        for (j = 0; j < filterslength; j++) {
                            var filter = this.filters[j].filter;
                            var value = datarow[this.filters[j].datafield];
                            var result = filter.evaluate(value);

                            if (filterresult == undefined) filterresult = result;
                            else {
                                if (filter.operator == 'or') {
                                    filterresult = filterresult || result;
                                }
                                else {
                                    filterresult = filterresult && result;
                                }
                            }
                        }

                        if (filterresult) {
                            filtereddata[filtereddata.length] = $.extend({ dataindex: row }, datarow);
                            this._dataIndexToBoundIndex[row] = { boundindex: filtereddata.length - 1 };
                        }
                        else this._dataIndexToBoundIndex[row] = null;
                    }
                    this.records = filtereddata;
                }
                if (this.sortdata) {
                    var lookupkey = this.sortfield;
                    if (this.sortcache[lookupkey]) {
                        this.sortdata = null;
                        var direction = this.sortcache[lookupkey].direction;
                        this.sortcache[lookupkey] = null;
                        this.sortby(this.sortfield, direction);
                        return;
                    }
                }
            }
            else if (this.filters.length == 0 && !this.virtualmode) {
                if (this.cachedrecords) {
                    this.totalrecords = 0;
                    var data = this.cachedrecords;
                    this.records = data;
                    if (this.sortdata) {
                        var lookupkey = this.sortfield;
                        if (this.sortcache[lookupkey]) {
                            this.sortdata = null;
                            var direction = this.sortcache[lookupkey].direction;
                            this.sortcache[lookupkey] = null;
                            this.sortby(this.sortfield, direction);
                            return;
                        }
                    }
                }
            }

            var diff = this.reload(this.records, this.rows, this.filter, this.updated, fullupdate);
            this.updated = null;

            if (this.rowschangecallback != null) {
                if (totalrowsBefore != totalrows) this.rowschangecallback({ type: "PagingChanged", data: getpagingdetails() });
                if (countBefore != rows.length) this.rowschangecallback({ type: "RowsCountChanged", data: { previous: countBefore, current: rows.length} });
                if (diff.length > 0 || countBefore != rows.length) this.rowschangecallback({ type: "RowsChanged", data: { previous: countBefore, current: rows.length, diff: diff} });
            }
        }

        return this;
    }
})(jQuery);