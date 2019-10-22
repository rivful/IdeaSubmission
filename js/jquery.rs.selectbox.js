/*
* Plugin name: Redsand Jquery Custom Select-box UI
* Author: phannhuthan
* Uri: http://redsand.vn
* Version: 3.5
* Last modify: 8/6/2013
*/

/* param
	
	options = {
		titleAsDefault: true,
        height: 200,
        selectedHtmlFilter: function(html){
            return html;
        },
        itemHtmlFilter: function(html, value){
            return html; 
        },
        itemTemplate: function(html, value){
            return '<span class="rs-select-item">' + html + '</span>';
        },
        change: function(event, new_value, custom_ui, select){
			...
		},
        afterInit: function(custom_ui, select){
            ...
        },
        afterShow: function(custom_ui, select){
            ...
        },
        beforeShow: function(custom_ui, select){

        }
	}
	
*/

(function ($) {
    $.fn.rsSelectBox = function (options, value) {

        if (options == "value") {
            if (value != undefined) {
                if (this.is('select')) {
                    this.val(value);
                    this.prev().find('.rs-select-options').children().eq(this.find('option:selected').index()).trigger('click');
                }
                else {
                    this.next().val(value);
                    this.find('.rs-select-options').children().eq(this.next().find('option:selected').index()).trigger('click');
                }
                return this;
            }
            return this.is('select') ? this.val() : this.next().val();
        }

        options = $.extend({            
            titleAsDefault: true,
            height: 200,
            change: false,
            selectedHtmlFilter: function (html) {
                return html;
            },
            itemHtmlFilter: function(html, value){
                return html; 
            },
            itemTemplate: function(html, value){
                return '<span class="rs-select-item">' + html + '</span>';
            },
            afterInit: false,
            afterShow: false,
            beforeShow: false
        }, options);

        this.filter('select').each(function () {

            var slto = $(this);

            var sltn, sltt, sltv, slti, opts, items;

            if (!slto.is('.rs-select-hidden')) {
                sltn = '<div class="rs-select-box">';
                sltn += '<div class="rs-select-inner">';
                sltn += '<div class="rs-select-selected">';
                sltn += '<div class="rs-select-value"></div>';
                sltn += '<div class="rs-select-arrow"></div>';
                sltn += '</div>';
                sltn += '<div class="rs-select-options"></div>';
                sltn += '</div>';
                sltn += '</div>';
                slto.before(sltn);
            }

            sltn = slto.prev('.rs-select-box');
            sltt = sltn.find('.rs-select-selected');
            sltv = sltn.find('.rs-select-value');
            //slti = sltn.find('.rs-select-inner');
            opts = sltn.find('.rs-select-options');

            sltn.addClass(slto.attr('class')).removeClass('rs-select-hidden').attr('title', slto.attr('title'));
            opts.empty().css('overflow', 'auto');

            opts.css('max-height', options.height);

            slto.addClass('rs-select-hidden').find('option').each(function () {
                var html = options.itemHtmlFilter($(this).text(), $(this).val());
                var temp = options.itemTemplate(html, $(this).val());
                opts.append(temp);
            });

            items = opts.children();

            if (options.titleAsDefault && (slto.find('option').length == 0 || slto.attr('title') && slto.find('option[selected]').length == 0 && slto.find('option:selected').index() == 0)){
                sltv.text(options.selectedHtmlFilter(slto.attr('title')));
            }
            else {
                items.eq(slto.find('option:selected').index()).addClass('active');
                sltv.text(options.selectedHtmlFilter(slto.find('option:selected').text()));
            }

            sltn.toggleClass('has-value', sltv.text() == slto.find('option:selected').text() && slto.val() != "");

            if (slto.is(':disabled')) sltn.addClass('disabled');

            sltn.toggleClass('has-scrollbar', opts.show().scrollTop(1).scrollTop() > 0);
            opts.scrollTop(0).hide();

            items.unbind('click.rs-select-box').bind('click.rs-select-box', function () {
                if (!slto.is(':disabled')) {
                    var opt = slto.find('option').eq($(this).index());
                    if (!$(this).is('.active')) {
                        slto.find(':selected').attr('selected', false).removeAttr('selected');
                        opt.attr('selected', true);
                        items.filter('.active').removeClass('active');
                        $(this).addClass('active');
                        sltv.text(options.selectedHtmlFilter(opt.text()));
                        if (options.change) options.change(opt.val(), sltn, slto);
                        sltn.toggleClass('has-value', opt.val() != "");
                        slto.trigger('change');
                    }
                    opts.slideUp(200);
                    sltn.removeClass('expanded');
                    slto.trigger('click');
                }
            });

            slto.unbind('focus.rs-select-box').bind('focus.rs-select-box', function () {
                if (!slto.is(':disabled')) {
                    if (options.beforeShow) {
                        options.beforeShow(sltn, slto);
                    }
                    opts.slideDown(200, function () {
                        if (options.afterShow && opts.is(':visible')) {
                            options.afterShow(sltn, slto);
                        }
                    });
                    sltn.addClass('focus expanded');
                }
            });
            slto.unbind('blur.rs-select-box').bind('blur.rs-select-box', function () {
                sltn.removeClass('focus');
            });
            sltt.unbind('click.rs-select-box').bind('click.rs-select-box', function () {
                if (!slto.is(':disabled')) {
                    if (sltn.is('.expanded')) {
                        opts.slideUp(200);
                        sltn.removeClass('expanded');
                    }
                    else {
                        slto.trigger('focus');
                    }
                    slto.trigger('click');
                }
            });
            $(document).unbind('click.rs-select-box').bind('click.rs-select-box', function (event) {
                if (!$(event.target).is('.rs-select-hidden')) {
                    $('.rs-select-box').not($(event.target).parents('.rs-select-box')).removeClass('focus expanded').find('.rs-select-options').slideUp(200);
                }
            });
            $(document).unbind('keydown.rs-select-box').bind('keydown.rs-select-box', function (event) {
                if (sltn.is('.expanded')) {
                    var sp = items.filter('.active').removeClass('active');
                    if (event.which == 40) {
                        sp = sp.next().size() ? sp.next() : items.first();
                    }
                    if (event.which == 38) {
                        sp = sp.prev().size() ? sp.prev() : items.last();
                    }
                    if (event.which == 13) {
                        sp.trigger('click');
                    }
                    sp.addClass('active');
                    sltv.text(sp.text());
                    event.preventDefault();
                }
            });

            if (options.afterInit) options.afterInit(sltn, slto);

        });

        this.filter('.rs-select-box').each(function () {
            $(this).next().rsSelectBox(options);
        });

        return this;
    }
} (jQuery));