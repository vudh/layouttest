function ResizePageContentHeight(page) {    
	var $page = $(page),
		$content = $page.children( ".ui-content" ),
		hh = $page.children( ".ui-header" ).outerHeight() || 0,
		fh = $page.children( ".ui-footer" ).outerHeight() || 0,
		pt = parseFloat($content.css( "padding-top" )),
		pb = parseFloat($content.css( "padding-bottom" )),
		wh = window.innerHeight;
	
	if (hh == 0) hh = 48;
	$content.height(wh - (hh + fh) - (pt + pb));
}

$(":jqmData(role='page')").live("pageshow", function (event) {
    var $page = $(this);

    // For the demos that use this script, we want the content area of each
    // page to be scrollable in the 'y' direction.

    //$page.find( ".ui-content" ).attr( "data-" + $.mobile.ns + "scroll", "y" );

    // This code that looks for [data-scroll] will eventually be folded
    // into the jqm page processing code when scrollview support is "official"
    // instead of "experimental".

    $page.find(":jqmData(scroll):not(.ui-scrollview-clip)").each(function () {
        var $this = $(this);
        var id = $this.prop('id');
        // XXX: Remove this check for ui-scrolllistview once we've
        //      integrated list divider support into the main scrollview class.
        if ($this.hasClass("ui-scrolllistview")) {
            $this.scrolllistview();
        } else {
            var st = $this.jqmData("scroll") + "",
				paging = st && st.search(/^[xy]p$/) != -1,
				dir = st && st.search(/^[xy]/) != -1 ? st.charAt(0) : null,

				opts = {
				    direction: dir || undefined,
				    paging: paging || undefined,
				    scrollMethod: $this.jqmData("scroll-method") || undefined
				    ,onScrollMove: function () {
				        var pullDownEl, pullDownOffset, pullUpEl, pullUpOffset;
				        pullDownEl = $('#' + id + ' .pullDown');
				        pullUpEl = $('#' + id + ' .pullUp');
				        pullDownOffset = pullDownEl.offsetHeight;
				        pullUpOffset = pullUpEl.offsetHeight;

				        if (this._sy > 5 && !pullDownEl.hasClass('flip')) {
				            pullDownEl.addClass('flip');
				            $('#' + id + ' .pullDownLabel').html('Release to refresh...');
				            //this.minScrollY = 0;
				        }
				        else if (this._sy < 5 && pullDownEl.hasClass('flip')) {
				            pullDownEl.removeClass();
				            pullDownEl.addClass('pullDown');
				            $('#' + id + ' .pullDownLabel').html('Pull down to load previous page...');
				            //this.minScrollY = -pullDownOffset;
				        }
				        else if (this._sy < (this._maxY - 5) && !pullUpEl.hasClass('flip')) {
				            pullUpEl.addClass('flip');
				            $('#' + id + ' .pullUpLabel').html('Release to refresh...');
				            this._maxY = this.maxScrollY;
				        }
				        else if (this._sy > (this._maxY + 5) && pullUpEl.hasClass('flip')) {
				            pullUpEl.removeClass();
				            pullUpEl.addClass('pullUp');
				            $('#' + id + ' .pullUpLabel').html('Pull up to load next page...');
				            this._maxY = pullUpOffset;
				        }
				    },
				    onScrollEnd: function () {
				        var pullDownEl, pullUpEl;
				        pullDownEl = $('#' + id + ' .pullDown');
				        pullUpEl = $('#' + id + ' .pullUp');
				        var pageIndex = pageIndexes[id];
				        
				        if (pullDownEl.hasClass('flip')) {
				            pullDownEl.addClass('loading');
				            $('#' + id + ' .pullDownLabel').html('Loading...');

				            pageIndex = pageIndex - 1;
				            pullDownAction(id, pageIndex); // Execute custom function (ajax call?)
				        }
				        else if (pullUpEl.hasClass('flip')) {
				            pullUpEl.addClass('loading');
				            $('#' + id + ' .pullUpLabel').html('Loading...');
				            pageIndex = pageIndex + 1;
				            pullUpAction(id, pageIndex); // Execute custom function (ajax call?)
				        }

				        pageIndexes[id] = pageIndex;
				    }
				};

            scrollers[id] = $this.scrollview(opts);
            pageIndexes[id] = 0;
        }
    });

    // For the demos, we want to make sure the page being shown has a content
    // area that is sized to fit completely within the viewport. This should
    // also handle the case where pages are loaded dynamically.

    ResizePageContentHeight(event.target);
    //$.mobile.fixedToolbars.show(true, this);
});

$(window).bind("orientationchange", function (event) {
    //ResizePageContentHeight($(".ui-page"));
    ResizePageContentHeight($.mobile.activePage);
});

$(window).resize(function () {
    ResizePageContentHeight($.mobile.activePage);
});

//$(window).load(function () {
//    ResizePageContentHeight($.mobile.activePage);
//});

// $().isChildOf
/*(function ($) {
    $.fn.extend({
        isChildOf: function (filter_string) {

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

function IsSwipeOn(e) {
    var element = $(e);
    return element.hasClass('noscroll')
      || element.isChildOf('.noscroll');
}

var hd = $.mobile.scrollview.prototype._handleDragStart;
var hm = $.mobile.scrollview.prototype._handleDragMove;
var hu = $.mobile.scrollview.prototype._handleDragStop;

$.mobile.scrollview.prototype._handleDragMove = function (e, x, y) {
    if (IsSwipeOn(e.target)) {
        e.preventDefault();

        return;
    }

    hm.call(this, e, x, y);
};

$.mobile.scrollview.prototype._handleDragStart = function (e, x, y) {    
    if (IsSwipeOn(e.target)) return;

    hd.call(this, e, x, y);
};

$.mobile.scrollview.prototype._handleDragStop = function (e) {
    if (IsSwipeOn(e.target)) return;

    hu.call(this, e);
};*/