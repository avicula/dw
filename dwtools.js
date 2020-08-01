if (window.location.href.indexOf("dreamwidth.org") > -1) {
    function detect_txtbx() {
        var txtbx = document.getElementById("body") || document.getElementById("commenttext") || document.getElementById("draft") || document.getElementById("id-event-1");
        if (txtbx !== null) {

            clearInterval(timer);

            //various html code
            var htmlmap = ['Italic', 'Bold', 'Underline', 'Strike', 'Blockquote', 'Header', 'List', 'Bullet', 'Raw'];
            var htmlcode = [
                '<i></i>',
                '<b></b>',
                '<u></u>',
                '<s></s>',
                '<blockquote></blockquote>',
                '<span style="font: bold 1em sans-serif;"></span>',
                '<ul></ul>',
                '<li style="list-style: square;"></li>',
                '<raw-code></raw-code>',
            ];

            var list = document.createElement('select');
            list.setAttribute('id', 'htmlList');
            for (var i = 0; i < htmlmap.length; i++) {
                var codeEl = document.createElement('option');
                codeEl.setAttribute('value', htmlcode[i]);
                codeEl.innerHTML = htmlmap[i];
                list.appendChild(codeEl);
            }

            function insertAfter(newElement, targetElement) {
                var parent = targetElement.parentNode;
                if (parent.lastchild == targetElement) {
                    parent.appendChild(newElement);
                } else {
                    parent.insertBefore(newElement, targetElement.nextSibling);
                }
            }

            //make the button
            var htmltag = document.createElement('input');
            htmltag.setAttribute('id', 'htmlButton');
            htmltag.setAttribute('type', 'button');
            htmltag.setAttribute('value', 'HTML');

            //make the button
            var texttag = document.createElement('input');
            texttag.setAttribute('id', 'textButton');
            texttag.setAttribute('type', 'button');
            texttag.setAttribute('value', 'Text');

            //make the button
            var smalltag = document.createElement('input');
            smalltag.setAttribute('id', 'smallButton');
            smalltag.setAttribute('type', 'button');
            smalltag.setAttribute('value', 'Small');

            if (txtbx = document.getElementById("draft")) {
                insertAfter(list, document.getElementById("subject"));
            } else if (txtbx = document.getElementById("id-event-1")) {
                insertAfter(list, document.getElementById("editor"));
            } else if (txtbx = document.getElementById("body") || document.getElementById("commenttext")) {
                insertAfter(list, document.getElementById("prop_editor"));
            }

            insertAfter(htmltag, document.getElementById("htmlList"));
            insertAfter(texttag, document.getElementById("htmlButton"));
            insertAfter(smalltag, document.getElementById("textButton"));

            function doGetCaretPosition(ctrl) {
                var CaretPos = 0; // IE Support
                if (document.selection) {
                    ctrl.focus();
                    var Sel = document.selection.createRange();
                    Sel.moveStart('character', -ctrl.value.length);
                    CaretPos = Sel.text.length;
                }
                // Firefox support
                else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
                    CaretPos = ctrl.selectionStart;
                    return (CaretPos);
                }
            }

            function setCaretPosition(ctrl, pos) {
                if (ctrl.setSelectionRange) {
                    ctrl.focus();
                    ctrl.setSelectionRange(pos, pos);
                } else if (ctrl.createTextRange) {
                    var range = ctrl.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            }

            function HTMLButtonClickAction() {
                var start = txtbx.selectionStart;
                var end = txtbx.selectionEnd;
                var sel = txtbx.value.substring(start, end);
                var toAdd = document.getElementById('htmlList').value;
                var curPos = doGetCaretPosition(txtbx);
                var curVal = txtbx.value;
                var htmlLength = toAdd.indexOf("</");
                var res = toAdd.replace("></", ">" + sel + "</");
                txtbx.value = curVal.substring(0, start) + res + curVal.substring(end, curVal.length); //adds the stuff
                setCaretPosition(txtbx, curPos + htmlLength + sel.length);
            }

            function TextButtonClickAction() {
                var start = txtbx.selectionStart;
                var end = txtbx.selectionEnd;
                var sel = txtbx.value.substring(start, end);
                var toAdd = '<span style="font: larger monospace;"></span>';
                var curPos = doGetCaretPosition(txtbx);
                var curVal = txtbx.value;
                var htmlLength = toAdd.indexOf("</");
                var res = toAdd.replace("></", ">" + sel + "</");
                txtbx.value = curVal.substring(0, start) + res + curVal.substring(end, curVal.length); //adds the stuff
                setCaretPosition(txtbx, curPos + htmlLength + sel.length);
            }

            function SmallButtonClickAction() {
                var start = txtbx.selectionStart;
                var end = txtbx.selectionEnd;
                var sel = txtbx.value.substring(start, end);
                var toAdd = '<small>[]</small>';
                var curPos = doGetCaretPosition(txtbx);
                var curVal = txtbx.value;
                var htmlLength = toAdd.indexOf("]</");
                var res = toAdd.replace("[]", "[" + sel + "]");
                txtbx.value = curVal.substring(0, start) + res + curVal.substring(end, curVal.length); //adds the stuff
                setCaretPosition(txtbx, curPos + htmlLength + sel.length);
            }

            //--- Activate the newly added button.
            document.getElementById("htmlButton").addEventListener("click", HTMLButtonClickAction, false);
            document.getElementById("textButton").addEventListener("click", TextButtonClickAction, false);
            document.getElementById("smallButton").addEventListener("click", SmallButtonClickAction, false);

        }
    }

    timer = setInterval(detect_txtbx, 100);


    //--- View all icons.
    var icons = window.location.href.endsWith("dreamwidth.org/icons") || window.location.href.endsWith("dreamwidth.org/icons?sortorder=keyword");
    if (icons) {
        location.replace(location += (location.search ? '&' : '?') + 'view=all');
    }

    $(document).ready(function() {

        //--- Auto click.
        $('input[name="adult_check"]').trigger('click');

        //--- Browse icons.
        $('head').append(`
<style type="text/css">
.image-text-toggle, .image-size-toggle { display:block; text-align:right; margin-bottom:.5em; font-size:90%; }
.iconselector_searchbox { float:left; padding-bottom:1em; }
#iconselector_icons_list { list-style-type:none; }
#iconselector_icons_list li { float:left; margin:.25em; padding:.25em; width: 110px; text-align:center; border: rgba(204,204,204,.5) 1px solid; overflow:hidden; }
.half_icons #iconselector_icons_list li { width:270px; text-align:left; }
.half_icons.no_meta #iconselector_icons_list li { width: auto; }
.half_icons #iconselector_icons_list img { width: auto; max-height: 100%; height: auto; max-width: 100%; vertical-align:middle; }
.icon_image { text-align:center; padding:5px; height:100px; width:100px; overflow:hidden; }
#iconselector_icons_list img { width: auto; max-height: 100%; height: auto; max-width: 100%; }
.half_icons .icon_image { float:left; height:50px; width:50px; overflow:hidden; }
.meta_wrapper { height: 5em; font-size:90%; line-height:1.2em; }
.half_icons .meta_wrapper { float:left; width:200px; padding:5px; }
.no_meta .meta_wrapper { display: none; }
.image-text-toggle.no_meta .toggle-meta-on, .image-text-toggle .toggle-meta-off, .image-size-toggle.half_icons .toggle-full-image, .image-size-toggle .toggle-half-image { display:none; }
.image-text-toggle.no_meta .toggle-meta-off, .image-text-toggle .toggle-meta-on, .image-size-toggle.half_icons .toggle-half-image, .image-size-toggle .toggle-full-image { display:inline; }
.icon-comment { margin-top:.5em; }
.kwmenu { clear:left; padding-bottom:.1em; }
.kwmenu .keyword { font-size:90%; border: rgba(204,204,204,.5) 1px solid; -webkit-border-radius: 6px; -moz-border-radius: 6px; border-radius: 6px; margin:0 .2em; padding:.2em .3em; line-height:1.1em; text-align:center; }
.kwmenu .keyword, .kwmenu .keyword { text-decoration:none; }
.kwmenu .selected, #iconselector_icons_list .iconselector_selected { border: rgba(204,204,204,1) 1px solid;  }
.kwmenu .selected { border-width: 2px; }
.iconselector_top { margin-bottom:1em; }
.kwmenu label, .kwmenu .keywords { display: inline-block !important; }
.iconselector .ui-dialog-content { overflow: visible; }
#iconselector_icons { overflow: auto; }
#iconselector_select { float:right; margin-top:-.3em; }
.iconselector .ui-dialog { padding:0; }
.iconselector .ui-dialog .ui-dialog-content { padding:.5em; }
.iconselector .ui-dialog .ui-dialog-titlebar { padding:.3em; }
.iconselector .ui-dialog .ui-dialog-buttonpane { padding:.3em 0; text-align:center; margin:0; }
.iconselector .ui-dialog .ui-dialog-buttonpane button { margin:0; padding:0; float:none; }
.iconselector { padding-bottom:1em; }
#ljqrttopcomment #qrformdiv, #ljqrtbottomcomment #qrformdiv, #entries #qrformdiv { margin: 1.5em auto !important; padding: 0; }
#qrformdiv { max-width: 900px !important; margin: 1.5em 0; padding: 0 !important; border: 0; }
#qrformdiv #qrform { padding: 2em !important; border: rgba(204,204,204,.5) 1px solid; }
#qrformdiv .qr-meta { width: 75px; margin-right: 5px; display: inline-block !important; float: left; }
#qrformdiv .qr-meta * { height: auto !important; width: 75px !important; display: inline-block !important; }
#qrformdiv .qr-body { min-width: 270px; display: flex; }
#qrformdiv .ljuser, #qrformdiv #submitmoreopts, #comment-text-quote { display: none !important; }
#qrformdiv .qr-icon a::after, #qrformdiv .qr-icon button::after { content: none !important; }
#qrformdiv #randomicon { margin: 0 !important; padding: 0 !important; }
</style>
`);

        (function($) {
            var kwtoicon = {};
            var opts;

            $.fn.iconselector = function(options) {
                opts = $.extend({}, $.fn.iconselector.defaults, options);

                $.fn.iconselector.owner = $(this);

                if (opts.selectorButtons) {
                    $(opts.selectorButtons)
                        .click(function(e) {
                            _open.apply($.fn.iconselector.owner, [opts]);
                            e.preventDefault();
                        });
                }

                return $(this).wrap("<span class='iconselect_trigger_wrapper'></span>");
            };

            // selected icon
            $.fn.iconselector.selected = null;
            // selected keyword
            $.fn.iconselector.selectedKeyword = null;

            $.fn.iconselector.defaults = {
                title: 'Choose Icon',
                width: "70%",
                height: $(window).height() * 0.8,
                selectedClass: "iconselector_selected",
                onSelect: function() {},
                selectorButtons: null,

                // user options
                metatext: true,
                smallicons: false
            };

            function _dialogHTML() {
                return "<div>\
      <div class='iconselector_top'>\
        <span class='iconselector_searchbox'>\
          Search: <input type='search' id='iconselector_search'>\
        </span>\
        <span class='image-text-toggle' id ='iconselector_image_text_toggle'>\
          <span class='toggle-meta-on'>Meta text / <a href='#' class='no_meta_text'>No meta text</a></span>\
          <span class='toggle-meta-off'><a href='#' class ='meta_text'>Meta text</a> / No meta text</span>\
        </span>\
        <span class='image-size-toggle' id='iconselector_image_size_toggle'>\
          <span class='toggle-half-image'>Small images / <a href='#' class='full_image'>Large images</a></span>\
          <span class='toggle-full-image'><a href='#' class='half_image'>Small images</a> / Large images</span>\
        </span>\
        <div class='kwmenu'>\
          <label for='iconselector_kwmenu'>Keywords of selected icon:</label>\
          <div class='keywords'></div>\
          <input id='iconselector_select' disabled='disabled' type='button' value='Select'>\
        </div>\
      </div>\
      <div id='iconselector_icons'><span class='iconselector_status'>Loading...</span></div>\
    </div>";
            };

            function _selectContainer($container, keyword, replaceKwMenu) {
                $("#" + $.fn.iconselector.selected).removeClass(opts.selectedClass);
                if ($container.length == 0) return;

                $.fn.iconselector.selected = $container.attr("id");
                $container.addClass(opts.selectedClass);
                $container.show();

                if (keyword != null) {
                    // select by keyword
                    $.fn.iconselector.selectedKeyword = keyword;
                } else {
                    // select by picid (first keyword)
                    $.fn.iconselector.selectedKeyword = $container.data("defaultkw");
                }

                if (replaceKwMenu) {
                    var $keywords = $container.find(".keywords");
                    $(".iconselector_top .keywords", $.fn.iconselector.instance)
                        .replaceWith($keywords.clone());
                    if ($keywords.length > 0)
                        $("#iconselector_select").prop("disabled", false);
                    else
                        $("#iconselector_select").prop("disabled", true);
                } else {
                    $(".iconselector_top .selected", $.fn.iconselector.instance)
                        .removeClass("selected");
                }

                // can't rely on a cached value, because it may have been replaced
                $(".iconselector_top .keywords", $.fn.iconselector.instance)
                    .find("a.keyword")
                    .filter(function() {
                        return $(this).text() == $.fn.iconselector.selectedKeyword;
                    })
                    .addClass("selected");
            }

            function _selectByKeyword(keyword) {
                var iconcontainer_id = kwtoicon[keyword];
                if (iconcontainer_id)
                    _selectContainer($("#" + iconcontainer_id), keyword, true);
            }

            function _selectByKeywordClick(event) {
                var $keyword = $(event.target).closest("a.keyword");
                if ($keyword.length > 0) {
                    var keyword = $keyword.text();
                    var iconcontainer_id = kwtoicon[keyword];
                    if (iconcontainer_id)
                        _selectContainer($("#" + iconcontainer_id), keyword, false);
                }

                event.stopPropagation();
                event.preventDefault();
            }

            function _selectByClick(event) {
                var $icon = $(event.target).closest("li");
                var $keyword = $(event.target).closest("a.keyword");

                _selectContainer($icon, $keyword.length > 0 ? $keyword.text() : null, true);

                event.stopPropagation();
                event.preventDefault();
            };

            function _selectByEnter(event) {
                if (event.keyCode && event.keyCode === $.ui.keyCode.ENTER) {
                    var $originalTarget = $(event.originalTarget);
                    if ($originalTarget.hasClass("keyword")) {
                        $originalTarget.click();
                    } else if ($originalTarget.is("a")) {
                        return;
                    }
                    _selectCurrent();
                }
            }

            function _selectCurrent() {
                if ($.fn.iconselector.selectedKeyword) {
                    $.fn.iconselector.owner.val($.fn.iconselector.selectedKeyword);
                    $.fn.iconselector.owner.trigger("change");
                    opts.onSelect.apply($.fn.iconselector.owner[0]);
                    $.fn.iconselector.instance.dialog("close");
                }
            }

            function _filterPics(event) {
                var val = $("#iconselector_search").val().toLocaleUpperCase();
                $("#iconselector_icons_list li").hide().each(function(i, item) {
                    if ($(this).data("keywords").indexOf(val) != -1 || $(this).data("comment").indexOf(val) != -1 ||
                        $(this).data("alt").indexOf(val) != -1) {

                        $(this).show();
                    }
                });

                var $visible = $("#iconselector_icons_list li:visible");
                if ($visible.length == 1)
                    _selectContainer($visible, null, true);
            };

            function _persist(option, value) {
                var params = {};
                params[option] = value;

                // this is a best effort thing, so be silent about success/error
                $.post("/__rpc_iconbrowser_save", params);
            }

            function _open() {
                if (!$.fn.iconselector.instance) {
                    $.fn.iconselector.instance = $(_dialogHTML());

                    $.fn.iconselector.instance.dialog({
                            title: opts.title,
                            width: opts.width,
                            height: opts.height,
                            dialogClass: "iconselector",
                            modal: true,
                            close: function() {
                                $("#iconselect").focus();
                            },
                            resize: function() {
                                $("#iconselector_icons").height(
                                    $.fn.iconselector.instance.height() -
                                    $.fn.iconselector.instance.find('.iconselector_top').height() -
                                    5
                                );
                            }
                        })
                        .keydown(_selectByEnter);


                    $("#iconselector_image_size_toggle a").click(function(e, init) {
                            if ($(this).hasClass("half_image")) {
                                $("#iconselector_icons, #iconselector_image_size_toggle, #iconselector_icons_list").addClass("half_icons");
                                if (!init) _persist("smallicons", true);
                            } else {
                                $("#iconselector_icons, #iconselector_image_size_toggle, #iconselector_icons_list").removeClass("half_icons");
                                if (!init) _persist("smallicons", false);
                            }

                            //refocus
                            $("#iconselector_image_size_toggle a:visible:first").focus();

                            return false;
                        }).filter(opts.smallicons ? ".half_image" : ":not(.half_image)")
                        .triggerHandler("click", true);

                    $("#iconselector_image_text_toggle a").click(function(e, init) {
                            if ($(this).hasClass("no_meta_text")) {
                                $("#iconselector_icons, #iconselector_image_text_toggle, #iconselector_icons_list").addClass("no_meta");
                                if (!init) _persist("metatext", false);
                            } else {
                                $("#iconselector_icons, #iconselector_image_text_toggle, #iconselector_icons_list").removeClass("no_meta");
                                if (!init) _persist("metatext", true);
                            }

                            // refocus because we just hid the link we clicked on
                            $("#iconselector_image_text_toggle a:visible:first").focus();

                            return false;
                        }).filter(opts.metatext ? ":not(.no_meta_text)" : ".no_meta_text")
                        .triggerHandler("click", true);

                    $("#iconselector_icons").height(
                        $.fn.iconselector.instance.height() -
                        $.fn.iconselector.instance.find('.iconselector_top').height() -
                        5
                    );

                    $("button", $.fn.iconselector.instance.siblings()).prop("disabled", true);
                    $(":input", $.fn.iconselector.instance).prop("disabled", true);
                    $("#iconselector_search", $.fn.iconselector.instance).bind("keyup click", _filterPics);

                    var url = Site.currentJournalBase ? "/" + Site.currentJournal + "/__rpc_userpicselect" : "/__rpc_userpicselect";
                    $.getJSON(url,
                        function(data) {
                            if (!data) {
                                $("#iconselector_icons").html("<h2>Error</h2><p>Unable to load icons data</p>");
                                return;
                            }

                            if (data.alert) {
                                $("#iconselector_icons").html("<h2>Error</h2><p>" + data.alert + "</p>");
                                return;
                            }

                            var $iconslist = $("<ul id='iconselector_icons_list'></ul>");

                            var pics = data.pics;
                            $.each(data.ids, function(index, id) {
                                var icon = pics[id];
                                var idstring = "iconselector_item_" + id;

                                var $img = $("<img />").attr({
                                    src: icon.url,
                                    alt: icon.alt,
                                    height: icon.height,
                                    width: icon.width
                                }).wrap("<div class='icon_image'></div>").parent();
                                var $keywords = "";
                                if (icon.keywords) {
                                    $keywords = $("<div class='keywords'></div>");
                                    var last = icon.keywords.length - 1;

                                    $.each(icon.keywords, function(i, kw) {
                                        kwtoicon[kw] = idstring;
                                        $keywords.append($("<a href='#' class='keyword'></a>").text(kw));
                                        if (i < last)
                                            $keywords.append(document.createTextNode(", "));
                                    });
                                }

                                var $comment = (icon.comment != "") ? $("<div class='icon-comment'></div>").text(icon.comment) : "";

                                var $meta = $("<div class='meta_wrapper'></div>").append($keywords).append($comment);
                                var $item = $("<div class='iconselector_item'></div>").append($img).append($meta);
                                $("<li></li>").append($item).appendTo($iconslist)
                                    .data("keywords", icon.keywords.join(" ").toLocaleUpperCase())
                                    .data("comment", icon.comment.toLocaleUpperCase())
                                    .data("alt", icon.alt.toLocaleUpperCase())
                                    .data("defaultkw", icon.keywords[0])
                                    .attr("id", idstring);
                            });

                            $("#iconselector_icons").empty().append($iconslist);

                            $("button", $.fn.iconselector.instance.siblings()).prop("disabled", false);
                            $(":input:not([id='iconselector_select'])", $.fn.iconselector.instance).prop("disabled", false);
                            $("#iconselector_icons_list")
                                .click(_selectByClick)
                                .dblclick(function(e) {
                                    _selectByClick(e);
                                    _selectCurrent();
                                });

                            $(".iconselector_top .kwmenu", $.fn.iconselector.instance)
                                .click(_selectByKeywordClick)
                                .dblclick(function(e) {
                                    _selectByKeywordClick(e);
                                    _selectCurrent();
                                });


                            $("#iconselector_search").focus();

                            $("#iconselector_select").click(_selectCurrent);
                            $(document).bind("keydown.dialog-overlay", _selectByEnter);

                            // initialize
                            _selectByKeyword($.fn.iconselector.owner.val());
                        });
                } else {
                    // reinitialize
                    _selectByKeyword($.fn.iconselector.owner.val());
                    $.fn.iconselector.instance.dialog("open");
                    $("#iconselector_search").focus();

                    $(document).bind("keydown.dialog-overlay", _selectByEnter);
                }
            };

        })(jQuery);

        if ($('#lj_userpicselect').length) {
            $("a#lj_userpicselect").replaceWith('<input type="button" id="lj_userpicselect" value="Browse"/>');
        } else {
            $('.qr-icon a').wrap('<button type="button" id="lj_userpicselect" data-iconbrowser-metatext="false" data-iconbrowser-smallicons="false"></button>');
            $("#prop_picture_keyword").iconselector({
                "selectorButtons": "#lj_userpicselect,.lj_userpicselect_extra",
                "metatext": false,
                "smallicons": false
            });
        }
    });
}
