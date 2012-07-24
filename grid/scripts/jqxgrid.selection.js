(function ($) {
    $.extend($.jqx._jqxGrid.prototype, {
        // selects a row by index.
        selectrow: function (index, refresh) {
            this._applyrowselection(index, true, refresh);
        },

        // unselects a row by index.
        unselectrow: function (index, refresh) {
            this._applyrowselection(index, false, refresh);
        },

        // selects a cell.
        selectcell: function (row, datafield) {
            this._applycellselection(row, datafield, true);
        },

        // unselects a cell.
        unselectcell: function (row, datafield) {
            this._applycellselection(row, datafield, false);
        },

        // clears the selection.
        clearselection: function (refresh) {
            this.selectedrowindex = -1;

            for (i = 0; i < this.selectedrowindexes.length; i++) {
                this._raiseEvent(3, { rowindex: this.selectedrowindexes[i] });
            }

            this.selectedrowindexes = new Array();
            this.selectedcells = new Array();
            if (!refresh)
                return;

            this._renderrows(this.virtualsizeinfo);
        },

        // gets the selected row index.
        getselectedrowindex: function () {
            return this.selectedrowindex;
        },

        // gets the selected row index.
        getselectedrowindexes: function () {
            return this.selectedrowindexes;
        },

        // gets the selected cell.
        getselectedcell: function () {
            return this.selectedcell;
        },

        // gets the selected cells.
        getselectedcells: function () {
            var cells = new Array();
            for (obj in this.selectedcells) {
                cells[cells.length] = this.selectedcells[obj];
            }

            return cells;
        },

        _applyrowselection: function (index, select, refresh, multiplerows, column) {
            if (index == null)
                return false;

            var oldindex = this.selectedrowindex;

            if (this.selectionmode == 'singlerow') {
                if (select) {
                    this._raiseEvent(2, { rowindex: index, row: this.getrowdata(index) });
                }
                else {
                    this._raiseEvent(3, { rowindex: index, row: this.getrowdata(index) });
                }

                this._raiseEvent(3, { rowindex: oldindex });
                this.selectedrowindexes = new Array();
                this.selectedcells = new Array();
            }

            if (multiplerows == true) {
                this.selectedrowindexes = new Array();
            }

            var indexIn = this.selectedrowindexes.indexOf(index);

            if (select) {
                this.selectedrowindex = index;

                if (this.selectedrowindexes.indexOf(index) == -1) {
                    this.selectedrowindexes.push(index);

                    if (this.selectionmode != 'singlerow') {
                        this._raiseEvent(2, { rowindex: index, row: this.getrowdata(index) });
                    }
                }
                else if (this.selectionmode == 'multiplerows') {
                    this.selectedrowindexes.splice(indexIn, 1);
                    this._raiseEvent(3, { rowindex: this.selectedrowindex, row: this.getrowdata(index) });
                    this.selectedrowindex = this.selectedrowindexes.length > 0 ? this.selectedrowindexes[this.selectedrowindexes.length - 1] : -1;
                }
            }
            else if (indexIn >= 0 || this.selectionmode == 'singlerow' || this.selectionmode == 'multiplerowsextended') {
                this.selectedrowindexes.splice(indexIn, 1);
                this._raiseEvent(3, { rowindex: this.selectedrowindex, row: this.getrowdata(index) });
                this.selectedrowindex = -1;
            }

            if (refresh == undefined || refresh) {
                this._rendervisualrows();
            }

            return true;
        },

        _applycellselection: function (index, column, select, refresh) {
            if (index == null)
                return false;

            if (column == null)
                return false;

            var oldindex = this.selectedrowindex;

            if (this.selectionmode == 'singlecell') {
                var oldcell = this.selectedcell;
                if (oldcell != null) {
                    this._raiseEvent(16, { rowindex: oldcell.rowindex, datafield: oldcell.datafield });
                }
                this.selectedcells = new Array();
            }

            if (this.selectionmode == 'multiplecellsextended') {
                var oldcell = this.selectedcell;
                if (oldcell != null) {
                    this._raiseEvent(16, { rowindex: oldcell.rowindex, datafield: oldcell.datafield });
                }
            }

            var uniquekey = index + "_" + column;

            var cell = { rowindex: index, datafield: column };
            if (select) {
                this.selectedcell = cell;
                if (!this.selectedcells[uniquekey]) {
                    this.selectedcells[uniquekey] = cell;
                    this.selectedcells.length++;
                    this._raiseEvent(15, cell);
                }
                else if (this.selectionmode == "multiplecells") {
                    this.selectedcells[uniquekey] = undefined;
                    this.selectedcells.length--;
                    this._raiseEvent(16, cell);
                }
            }
            else {
                this.selectedcells[uniquekey] = undefined;
                this.selectedcells.length--;
                this._raiseEvent(16, cell);
            }

            if (refresh == undefined || refresh) {
                this._rendervisualrows();
            }

            return true;
        },

        _getcellindex: function (uniquekey) {
            var id = -1;
            $.each(this.selectedcells, function () {
                id++;
                if (this[uniquekey]) {
                    return false;
                }
            });
            return id;
        },

        _clearhoverstyle: function () {
            if (undefined == this.hoveredrow || this.hoveredrow == -1)
                return;

            var cells = this.table.find('.jqx-grid-cell-hover');

            if (cells.length > 0) {
                cells.removeClass(this.toTP('jqx-grid-cell-hover'));
                cells.removeClass(this.toTP('jqx-fill-state-hover'));
            }
            this.hoveredrow = -1;
        },

        _clearselectstyle: function () {
            var rowscount = this.table[0].rows.length;
            for (i = 0; i < rowscount; i++) {
                var tablerow = this.table[0].rows[i];
                var cellslength = tablerow.cells.length;
                for (j = 0; j < cellslength; j++) {
                    var tablecell = tablerow.cells[j];
                    $(tablecell).removeClass(this.toTP('jqx-grid-cell-selected'));
                    $(tablecell).removeClass(this.toTP('jqx-grid-cell-hover'));
                    $(tablecell).removeClass(this.toTP('jqx-fill-state-pressed'));
                    $(tablecell).removeClass(this.toTP('jqx-fill-state-hover'));
                }
            }
        },

        _selectpath: function (row, column) {
            var self = this;
            var minRow = this._lastClickedCell ? Math.min(this._lastClickedCell.row, row) : 0;
            var maxRow = this._lastClickedCell ? Math.max(this._lastClickedCell.row, row) : 0;
            if (minRow <= maxRow) {
                var index1 = this._getcolumnindex(this._lastClickedCell.column);
                var index2 = this._getcolumnindex(column);
                var minColumn = Math.min(index1, index2);
                var maxColumn = Math.max(index1, index2);
                this.selectedcells = new Array();

                for (var r = minRow; r <= maxRow; r++) {
                    for (var c = minColumn; c <= maxColumn; c++) {
                        this._applycellselection(r, self._getcolumnat(c).datafield, true, false);
                    }
                }
                this._rendervisualrows();
            }
        },

        _selectrowwithmouse: function (self, rowinfo, oldindexes, column, ctrlKey, shiftKey) {
            var row = rowinfo.row;

            if (row == undefined)
                return;

            var index = rowinfo.index;
            var tablerow = this.hittestinfo[index].visualrow;

            if (this.hittestinfo[index].details) {
                return;
            }

            var cellclass = tablerow.cells[0].className;
            if (row.group) {
                return;
            }

            if (this.selectionmode == 'multiplerows' || this.selectionmode == 'multiplecells' || (this.selectionmode.indexOf('multiple') != -1 && (shiftKey == true || ctrlKey == true))) {
                var hasindex = oldindexes.indexOf(row.boundindex) != -1;
                var key = row.boundindex + "_" + column;

                if (this.selectionmode.indexOf('cell') != -1) {
                    var hascellindex = this.selectedcells[key] != undefined;
                    if (this.selectedcells[key] != undefined && hascellindex) {
                        this._selectcellwithstyle(self, false, index, column, tablerow);
                    }
                    else {
                        this._selectcellwithstyle(self, true, index, column, tablerow);
                    }
                    if (shiftKey && this._lastClickedCell) {
                        this._selectpath(row.boundindex, column);
                        this.mousecaptured = false;
                        if (this.selectionarea.css('visibility') == 'visible') {
                            this.selectionarea.css('visibility', 'hidden');
                        }
                    }
                }
                else {
                    if (hasindex) {
                        this._selectrowwithstyle(self, tablerow, false, column);
                    }
                    else {
                        this._selectrowwithstyle(self, tablerow, true, column);
                    }

                    if (shiftKey && this._lastClickedCell) {
                        this.selectedrowindexes = new Array();
                        var minRow = this._lastClickedCell ? Math.min(this._lastClickedCell.row, row.boundindex) : 0;
                        var maxRow = this._lastClickedCell ? Math.max(this._lastClickedCell.row, row.boundindex) : 0;
                        for (var r = minRow; r <= maxRow; r++) {
                            this._applyrowselection(r, true, false, false);
                        }
                        this._rendervisualrows();
                    }
                }
            }
            else {
                this._clearselectstyle();
                this._selectrowwithstyle(self, tablerow, true, column);
                if (this.selectionmode.indexOf('cell') != -1) {
                    this._selectcellwithstyle(self, true, index, column, tablerow);
                }
            }
            if (!shiftKey) {
                this._lastClickedCell = { row: row.boundindex, column: column };
            }
        },

        _selectcellwithstyle: function (self, select, row, column, tablerow) {
            var cell = $(tablerow.cells[self._getcolumnindex(column)]);
            cell.removeClass(this.toTP('jqx-grid-cell-hover'));
            cell.removeClass(this.toTP('jqx-fill-state-hover'));
            if (select) {
                cell.addClass(this.toTP('jqx-grid-cell-selected'));
                cell.addClass(this.toTP('jqx-fill-state-pressed'));
            }
            else {
                cell.removeClass(this.toTP('jqx-grid-cell-selected'));
                cell.removeClass(this.toTP('jqx-fill-state-pressed'));
            }
        },

        _selectrowwithstyle: function (self, tablerow, select, column) {
            var cellslength = tablerow.cells.length;

            var startindex = 0;
            if (self.rowdetails && self.showrowdetailscolumn) {
                startindex = 1;
            }

            for (i = startindex; i < cellslength; i++) {
                var tablecell = tablerow.cells[i];
                if (select) {
                    $(tablecell).removeClass(this.toTP('jqx-grid-cell-hover'));
                    $(tablecell).removeClass(this.toTP('jqx-fill-state-hover'));

                    if (self.selectionmode.indexOf('cell') == -1) {
                        $(tablecell).addClass(this.toTP('jqx-grid-cell-selected'));
                        $(tablecell).addClass(this.toTP('jqx-fill-state-pressed'));
                    }
                }
                else {
                    $(tablecell).removeClass(this.toTP('jqx-grid-cell-hover'));
                    $(tablecell).removeClass(this.toTP('jqx-grid-cell-selected'));
                    $(tablecell).removeClass(this.toTP('jqx-fill-state-hover'));
                    $(tablecell).removeClass(this.toTP('jqx-fill-state-pressed'));
                }
            }
        },

        _handlemousemoveselection: function (event, self) {
            if ((self.selectionmode == 'multiplerowsextended' || self.selectionmode == 'multiplecellsextended') && self.mousecaptured) {
                var columnheaderheight = this.showheader ? this.columnsheader.height() + 2 : 0;
                var groupsheaderheight = this._groupsheader() ? this.groupsheader.height() : 0;
                var toolbarheight = this.showtoolbar ? this.toolbarheight : 0;
                groupsheaderheight += toolbarheight;
                var hostoffset = this.host.offset();
                var x = event.pageX;
                var y = event.pageY - groupsheaderheight;
                var columnheadertop = parseInt(this.columnsheader.offset().top);
                var columnheaderbottom = columnheaderheight;
                if (y < columnheaderbottom) y = columnheaderbottom + 5;
                var rectleft = parseInt(Math.min(self.mousecaptureposition.left, x));
                var recttop = -5 + parseInt(Math.min(self.mousecaptureposition.top, y));

                var rectwidth = parseInt(Math.abs(self.mousecaptureposition.left - x));
                var rectheight = parseInt(Math.abs(self.mousecaptureposition.top - y));
                this.selectionarea.css('visibility', 'visible');
                this.selectionarea.width(rectwidth);
                this.selectionarea.height(rectheight);
                this.selectionarea.css('left', rectleft);
                this.selectionarea.css('top', recttop);
            }
        },

        _handlemouseupselection: function (event, self) {
            if (this.selectionarea.css('visibility') != 'visible') {
                self.mousecaptured = false;
                return true;
            }

            if (self.mousecaptured && (self.selectionmode == 'multiplerowsextended' || self.selectionmode == 'multiplecellsextended')) {
                self.mousecaptured = false;
                if (this.selectionarea.css('visibility') == 'visible') {
                    this.selectionarea.css('visibility', 'hidden');

                    var columnheaderheight = this.showheader ? this.columnsheader.height() + 2 : 0;
                    var groupsheaderheight = this._groupsheader() ? this.groupsheader.height() : 0;
                    var toolbarheight = this.showtoolbar ? this.toolbarheight : 0;
                    groupsheaderheight += toolbarheight;
                    var areaoffset = this.selectionarea.offset();

                    var hostoffset = this.host.offset();
                    var x = areaoffset.left - hostoffset.left;
                    var y = areaoffset.top - columnheaderheight - hostoffset.top - groupsheaderheight;
                    var m = y;
                    var arearight = x + this.selectionarea.width();
                    var arealeft = x;

                    var rows = new Array();
                    var indexes = new Array();

                    if (self.selectionmode == 'multiplerowsextended') {
                        while (y < m + this.selectionarea.height()) {
                            var rowinfo = this._hittestrow(x, y);
                            var row = rowinfo.row;
                            var index = rowinfo.index;
                            if (index != -1) {
                                if (!indexes[index]) {
                                    indexes[index] = true;
                                    rows[rows.length] = rowinfo;
                                }
                            }
                            y += 20;
                        }
                        var m = 0;
                        $.each(rows, function () {
                            var rowinfo = this;
                            var row = this.row;
                            if (self.selectionmode != 'none' && self._selectrowwithmouse) {
                                if (event.ctrlKey) {
                                    self._applyrowselection(row.boundindex, true, false, false);
                                }
                                else {
                                    if (m == 0) {
                                        self._applyrowselection(row.boundindex, true, false, true);
                                    }
                                    else {
                                        self._applyrowselection(row.boundindex, true, false, false);
                                    }
                                }
                                m++;
                            }
                        });
                    }
                    else {
                        var hScrollInstance = self.hScrollInstance;
                        var horizontalscrollvalue = hScrollInstance.value;
                        var tablerow = self.table[0].rows[0];

                        if (!event.ctrlKey) {
                            self.selectedcells = new Array();
                        }

                        while (y < m + self.selectionarea.height()) {
                            var rowinfo = self._hittestrow(x, y);
                            var row = rowinfo.row;
                            var index = rowinfo.index;
                            if (index != -1) {
                                if (!indexes[index]) {
                                    indexes[index] = true;
                                    for (i = 0; i < tablerow.cells.length; i++) {
                                        var left = parseInt($(self.columnsrow[0].cells[i]).css('left')) - horizontalscrollvalue;
                                        var right = left + $(self.columnsrow[0].cells[i]).width();
                                        if ((arealeft >= left && arealeft <= right) || (arearight >= left && arearight <= right)
                                        || (left >= arealeft && left <= arearight)) {
                                            self._applycellselection(row.boundindex, self._getcolumnat(i).datafield, true, false);
                                        }
                                    }
                                }
                            }
                            y += 20;
                        }
                    }
                    self._renderrows(self.virtualsizeinfo);
                }
            }
        },

        selectprevcell: function (row, datafield) {
            var columnindex = this._getcolumnindex(datafield);
            var columnscount = this.columns.records.length;
            var prevcolumn = this._getprevvisiblecolumn(columnindex);
            if (prevcolumn != null) {
                this.clearselection();
                this.selectcell(row, prevcolumn.datafield);
            }
        },

        selectnextcell: function (row, datafield) {
            var columnindex = this._getcolumnindex(datafield);
            var columnscount = this.columns.records.length;
            var nextcolumn = this._getnextvisiblecolumn(columnindex);
            if (nextcolumn != null) {
                this.clearselection();
                this.selectcell(row, nextcolumn.datafield);
            }
        },

        _getfirstvisiblecolumn: function () {
            var self = this;
            var length = this.columns.records.length;
            for (var i = 0; i < length; i++) {
                var column = this.columns.records[i];
                if (!column.hidden && column.datafield != null)
                    return column;
            }

            return null;
        },

        _getlastvisiblecolumn: function () {
            var self = this;
            var length = this.columns.records.length;
            for (var i = length - 1; i >= 0; i--) {
                var column = this.columns.records[i];
                if (!column.hidden && column.datafield != null)
                    return column;
            }

            return null;
        },

        _handlekeydown: function (event, self) {
            if (self.editcell) {
                return true;
            }

            if (self.selectionmode == 'none')
                return true;

            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;

            var selectionchanged = false;
            if (event.altKey) {
                return true;
            }

            var hostHeight = Math.round(self._gettableheight());
            // get records per page.
            var pagesize = Math.round(hostHeight / self.rowsheight);
            var datainfo = self.getdatainformation();

            switch (self.selectionmode) {
                case 'singlecell':
                case 'multiplecells':
                case 'multiplecellsextended':
                    var selectedcell = self.getselectedcell();

                    if (selectedcell != null) {
                        var visibleindex = this.getrowvisibleindex(selectedcell.rowindex);
                        var rowindex = visibleindex;
                        var datafield = selectedcell.datafield;
                        var columnindex = self._getcolumnindex(datafield);
                        var columnscount = self.columns.records.length;
                        var selectgridcell = function (row, datafield, clearselection) {
                            var tryselect = function (row, datafield) {
                                var datarow = self.dataview.loadedrecords[row];
                                if (datarow != undefined && datafield != null) {
                                    if (clearselection || clearselection == undefined) {
                                        self.clearselection();
                                    }
                                    var visibleindex = datarow.boundindex;
                                    self.selectcell(visibleindex, datafield);
                                    self._oldselectedcell = self.selectedcell;
                                    selectionchanged = true;
                                    self.ensurecellvisible(row, datafield);
                                    return true;
                                }
                                return false;
                            }

                            if (!tryselect(row, datafield)) {
                                self.ensurecellvisible(row, datafield);
                                tryselect(row, datafield);
                                if (self.virtualmode) {
                                    self.host.focus();
                                }
                            }

                            if (event.shiftKey && key != 9) {
                                if (self.selectionmode == 'multiplecellsextended') {
                                    if (self._lastClickedCell) {
                                        self._selectpath(row, datafield);
                                        self.selectedcell = { rowindex: row, datafield: datafield };
                                        return;
                                    }
                                }
                            }
                            else if (!event.shiftKey) {
                                self._lastClickedCell = { row: row, column: datafield };
                            }
                        }
                        var shift = event.shiftKey && self.selectionmode != 'singlecell';
                        var home = function () {
                            selectgridcell(0, datafield, !shift);
                        }
                        var end = function () {
                            var newindex = datainfo.rowscount - 1;
                            selectgridcell(newindex, datafield, !shift);
                        }

                        var tab = key == 9 && !event.shiftKey;
                        var shifttab = key == 9 && event.shiftKey;
                        if (tab || shifttab) shift = false;
                        var ctrl = event.ctrlKey;
                        if (ctrl && key == 37) {
                            var previouscolumn = self._getfirstvisiblecolumn(columnindex);
                            if (previouscolumn != null) {
                                selectgridcell(rowindex, previouscolumn.datafield);
                            }
                        }
                        else if (ctrl && key == 39) {
                            var next = self._getlastvisiblecolumn(columnindex);
                            if (next != null) {
                                selectgridcell(rowindex, next.datafield);
                            }
                        }
                        else if (key == 39 || tab) {
                            var nextcolumn = self._getnextvisiblecolumn(columnindex);
                            if (nextcolumn != null) {
                                selectgridcell(rowindex, nextcolumn.datafield, !shift);
                            }
                            else {
                                if (!tab) {
                                    selectionchanged = true;
                                }
                            }
                        }
                        else if (key == 37 || shifttab) {
                            var previouscolumn = self._getprevvisiblecolumn(columnindex);
                            if (previouscolumn != null) {
                                selectgridcell(rowindex, previouscolumn.datafield, !shift);
                            }
                            else {
                                if (!shifttab) {
                                    selectionchanged = true;
                                }
                            }
                        }
                        else if (key == 36) {
                            home();
                        }
                        else if (key == 35) {
                            end();
                        }
                        else if (key == 33) {
                            if (rowindex - pagesize >= 0) {
                                var newindex = rowindex - pagesize;
                                selectgridcell(newindex, datafield, !shift);
                            }
                            else {
                                home();
                            }
                        }
                        else if (key == 34) {
                            if (datainfo.rowscount > rowindex + pagesize) {
                                var newindex = rowindex + pagesize;
                                selectgridcell(newindex, datafield, !shift);
                            }
                            else {
                                end();
                            }
                        }
                        else if (key == 38) {
                            if (ctrl) {
                                home();
                            }
                            else {
                                if (rowindex > 0) {
                                    selectgridcell(rowindex - 1, datafield, !shift);
                                }
                                else selectionchanged = true;
                            }
                        }
                        else if (key == 40) {
                            if (ctrl) {
                                end();
                            }
                            else {
                                if (datainfo.rowscount > rowindex + 1) {
                                    selectgridcell(rowindex + 1, datafield, !shift);
                                }
                                else selectionchanged = true;
                            }
                        }
                    }
                    break;
                case 'singlerow':
                case 'multiplerows':
                case 'multiplerowsextended':
                    var rowindex = self.getselectedrowindex();
                    if (rowindex == null || rowindex == -1)
                        return true;

                    rowindex = this.getrowvisibleindex(rowindex);
                    var selectgridrow = function (index, clearselection) {
                        var tryselect = function (index) {
                            var datarecord = self.dataview.loadedrecords[index];
                            if (datarecord != undefined) {
                                var visibleindex = datarecord.boundindex;
                                var tmpindex = self.selectedrowindex;
                                if (clearselection || clearselection == undefined) {
                                    self.clearselection();
                                }
                                self.selectedrowindex = tmpindex;
                                self.selectrow(visibleindex, false);
                                var scrolled = self.ensurerowvisible(index);
                                if (!scrolled) {
                                    self._rendervisualrows();
                                }
                                selectionchanged = true;
                                return true;
                            }
                            return false;
                        }
                        if (!tryselect(index)) {
                            self.ensurerowvisible(index);
                            tryselect(index, clearselection);
                            if (self.virtualmode) {
                                self.host.focus();
                            }
                        }
                    }
                    var shift = event.shiftKey && self.selectionmode != 'singlerow';
                    var home = function () {
                        selectgridrow(0, !shift);
                    }
                    var end = function () {
                        var newindex = datainfo.rowscount - 1;
                        selectgridrow(newindex, !shift);
                    }

                    var ctrl = event.ctrlKey;
                    if (key == 36 || (ctrl && key == 38)) {
                        home();
                    }
                    else if (key == 35 || (ctrl && key == 40)) {
                        end();
                    }
                    else if (key == 33) {
                        if (rowindex - pagesize >= 0) {
                            var newindex = rowindex - pagesize;
                            selectgridrow(newindex, !shift);
                        }
                        else {
                            home();
                        }
                    }
                    else if (key == 34) {
                        if (datainfo.rowscount > rowindex + pagesize) {
                            var newindex = rowindex + pagesize;
                            selectgridrow(newindex, !shift);
                        }
                        else {
                            end();
                        }
                    }
                    else if (key == 38) {
                        if (rowindex > 0) {
                            selectgridrow(rowindex - 1, !shift);
                        }
                        else selectionchanged = true;
                    }
                    else if (key == 40) {
                        if (datainfo.rowscount > rowindex + 1) {
                            selectgridrow(rowindex + 1, !shift);
                        }
                        else selectionchanged = true;
                    }
                    break;
            }

            if (selectionchanged) {
                if (self.editcell != null && self.endcelledit) {
                    self.endcelledit(self.editcell.row, self.editcell.column, true, true);
                }
                return false;
            }
            return true;
        },

        _handlemousemove: function (event, self) {
            if (self.vScrollInstance.isScrolling())
                return;

            var columnheaderheight;
            var groupsheaderheight;
            var hostoffset;
            var x;
            var y;

            if (self.enablehover || self.selectionmode == 'multiplerows') {
                columnheaderheight = this.showheader ? this.columnsheader.height() + 2 : 0;
                groupsheaderheight = this._groupsheader() ? this.groupsheader.height() : 0;
                var toolbarheight = this.showtoolbar ? this.toolbarheight : 0;
                groupsheaderheight += toolbarheight;
                hostoffset = this.host.offset();
                x = event.pageX - hostoffset.left;
                y = event.pageY - columnheaderheight - hostoffset.top - groupsheaderheight;
            }

            if (self.selectionmode == 'multiplerowsextended' || self.selectionmode == 'multiplecellsextended') {
                if (self.mousecaptured == true) {
                    return;
                }
            }

            if (self.enablehover) {
                if (self.disabled) {
                    return;
                }

                if (this.vScrollInstance.isScrolling() || this.hScrollInstance.isScrolling()) {
                    return;
                }

                var rowinfo = this._hittestrow(x, y);
                if (!rowinfo)
                    return;

                var row = rowinfo.row;
                var index = rowinfo.index;

                // if the new index is the same as the last, do nothing.
                if (this.hoveredrow != -1 && index != -1 && this.hoveredrow == index && this.selectionmode.indexOf('cell') == -1) {
                    return;
                }

                this._clearhoverstyle();

                if (index == -1 || row == undefined)
                    return;

                var tablerow = this.hittestinfo[index].visualrow;
                if (tablerow == null)
                    return;

                if (this.hittestinfo[index].details) {
                    return;
                }

                var startindex = 0;
                if (self.rowdetails && self.showrowdetailscolumn) {
                    startindex = 1;
                }

                if (tablerow.cells.length == 0)
                    return;

                var cellclass = tablerow.cells[startindex].className;
                if (row.group || cellclass.indexOf('jqx-grid-cell-selected') != -1)
                    return;

                this.hoveredrow = index;

                if (this.selectionmode.indexOf('cell') != -1) {
                    var cellindex = -1;
                    var hScrollInstance = this.hScrollInstance;
                    var horizontalscrollvalue = hScrollInstance.value;

                    for (i = 0; i < tablerow.cells.length; i++) {
                        var left = parseInt($(this.columnsrow[0].cells[i]).css('left')) - horizontalscrollvalue;
                        var right = left + $(this.columnsrow[0].cells[i]).width();
                        if (right >= x && x >= left) {
                            cellindex = i;
                            break;
                        }
                    }

                    if (cellindex != -1) {
                        var tablecell = tablerow.cells[cellindex];
                        if (tablecell.className.indexOf('jqx-grid-cell-selected') == -1) {
                            if (tablecell.className.indexOf('jqx-grid-group') == -1) {
                                $(tablecell).addClass(this.toTP('jqx-grid-cell-hover'));
                                $(tablecell).addClass(this.toTP('jqx-fill-state-hover'));
                            }
                        }
                    }
                    return;
                }

                for (i = startindex; i < tablerow.cells.length; i++) {
                    var tablecell = tablerow.cells[i];
                    if (tablecell.className.indexOf('jqx-grid-group') == -1) {
                        $(tablecell).addClass(this.toTP('jqx-grid-cell-hover'));
                        $(tablecell).addClass(this.toTP('jqx-fill-state-hover'));
                    }
                }
            }
            else return true;
        }
    });
})(jQuery);


