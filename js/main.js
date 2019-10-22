//
// This is The Scripts used for Simply Theme
//

function main() {

(function () {
   'use strict'
	//Script
	//-----------------------------------
    jQuery(document).ready(function($){
		
		// Tiny editor
		if($('textarea#content').length != 0)
		{
			tinymce.init({
				selector: "textarea#content",
				//toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
			});
		}
		
		// Search Form Click
		$('.rst-search').submit(function(e){
			if( !$(this).hasClass('open') ){
				if ( $(window).width() > 768 )
				{
					e.preventDefault();
				}
				$('.rst-search').addClass('open').removeClass('exit');
			}
			
		});
		
		$(document).on('click',function(event){
			if( !$(event.target).is('.rst-search') && !$(event.target).is('.rst-search *') ){
				$('.rst-search').removeClass('open').addClass('exit');
				$('.rst-socialbar-social .rst-search .sb').removeClass('active');
			}
			
		});
		
		$('.rst-socialbar-social .rst-search .sb').on('click',function(){
			$(this).addClass('active');
			
		});
		
		
		//MenuMobie
		$('.rst-menu-trigger').on('click',function(){
			$(this).toggleClass('exit').parent().find('ul').stop(false,true).slideToggle(700); 
			
		});
		
		// Login Form Click
		$('.rst-socialbar-social li:last-child a').on('click',function(e){
			e.preventDefault();
			// $(this).next().toggleClass('active');
		});
		
		$('html,body').on('click',function(even){
			if(jQuery(even.target).closest('.rst-socialbar-social li:last-child').length == 0){
				jQuery('.rst-login').removeClass('active');
			}
			// This is for little menu in page content
			if(jQuery(even.target).closest('.rst-shortmenu').length == 0){
				jQuery('.rst-shortmenu ul').slideUp(300);
			}
			
		});
		
		
		// Weather in Header menu
		$.simpleWeather({
			location: 'Hà Nội, VN',
			woeid: '',
			unit: 'c',
			success: function(weather) {
				$("#rst-weather").html('<span><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;</span>');
			},
			error: function(error) {
				$("#rst-weather").html('<p>'+error+'</p>');
			}
		});
		
		// Owl Carosel 
		$('.rst-mainslider').owlCarousel({
			singleItem: true,
			pagination : true,
			navigation : true,
			navigationText : ['<i class="fa fa-long-arrow-left"></i>','<i class="fa fa-long-arrow-right"></i>'],
		});
		$('.rst-pageline-slider').owlCarousel({
			singleItem: true,
			pagination : false,
			navigation : true,
			navigationText : ['<i class="fa fa-long-arrow-left"></i>','<i class="fa fa-long-arrow-right"></i>'],
		});
		$('.rst-specpost').owlCarousel({
			singleItem: true,
			pagination : true,
			navigation : true,
			navigationText : ['<i class="fa fa-long-arrow-left"></i>','<i class="fa fa-long-arrow-right"></i>'],
		});
		$('.rst-hotnews').owlCarousel({
			paginationSpeed: 300,
			singleItem: true,
			pagination : true,
			navigation : false,
			autoPlay: true,
		});
		$('#rst-latestcomments .commentlist').owlCarousel({
			items	   : 3,
			pagination : false,
			navigation : true,
			navigationText : ['<i class="fa fa-long-arrow-left"></i>','<i class="fa fa-long-arrow-right"></i>'],
		});
		$('.rst-catbanner-slider').owlCarousel({
			singleItem: true,
			pagination : true,
			navigation : false,
			itemsDesktop : [1366,1],
			itemsDesktopSmall : [980,1],
			itemsTablet: [680,2],	
			itemsMobile : [400,1],
			singleItem : false,
		});
		
		
		// Set margin for element
		var i=1;
		for( i=1; i<= $('.widget.widget_social > a').size(); i++ )
		{
			if( i%3 == 0 )
			{
				$('.widget.widget_social > a').eq(i-1).css('margin-right','0');
			}
		}
		for( i=1; i<= $('.widget.widget_adv > a').size(); i++ )
		{
			if( i%2 == 0 )
			{
				$('.widget.widget_adv > a').eq(i-1).css('margin-right','0');
			}
			if ( i==$('.widget.widget_adv > a').size() || i==$('.widget.widget_adv > a').size()-1  )
			{
				$('.widget.widget_adv > a').eq(i-1).css('margin-bottom','0');
			}
		}
		for( i=1; i<= $('.rst-acc-social').size(); i++ )
		{
			if( i%4 == 0 )
			{
				$('.rst-acc-social').eq(i-1).css('margin-right','0');
			}
		}
		
		
		// Script for tabs in sidebar homepage
		$('.widget.widget_popular > ul > li:first-child').addClass('active');
		var oh = $('.widget.widget_popular').height();
		$('.widget.widget_popular').css('height', $('.widget.widget_popular').height() + $('.widget.widget_popular > ul > li.active ul').height() + 'px');
		$('.widget.widget_popular > ul > li').on('click',function(e){
			e.preventDefault();
			$('.widget.widget_popular > ul > li').removeClass('active');
			$(this).addClass('active');
			$('.widget.widget_popular').css('height', oh + $('.widget.widget_popular > ul > li.active ul').height() + 'px');
			
		});
		
		
		// Check validate send mail
		if( $(".rst-getintouch-form form").length ) {
			$(".rst-getintouch-form form input,.rst-getintouch-form form textarea").jqBootstrapValidation({
				preventSubmit: true,
				submitError: function($form, event, errors) {
					// additional error messages or events
				},
				submitSuccess: function($form, event) {
					event.preventDefault(); // prevent default submit behaviour
					// get values from FORM
					var name = $("input#name").val();
					var email = $("input#email").val();
					var company = $("input#company").val();
					var phone = $("input#phone").val();
					var message = $("textarea#message").val();
					
					var firstName = name; // For Success/Failure Message
					// Check for white space in name for Success/Fail message
					if (firstName.indexOf(' ') >= 0) {
						firstName = name.split(' ').slice(0, -1).join(' ');
					}
					$.ajax({
						url: "././submit.php",
						type: "POST",
						data: {
							name: name,
							email: email,
							company: company,
							phone: phone,
							message: message
						},
						cache: false,
						success: function() {
							// Success message
							$('#success').html("<div class='alert alert-success'>");
							$('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
								.append("</button>");
							$('#success > .alert-success')
								.append("<strong>Your message has been sent. </strong>");
							$('#success > .alert-success')
								.append('</div>');

							//clear all fields
							$('.rst-getintouch-form form').trigger("reset");
						},
						error: function() {
							// Fail message
							$('#success').html("<div class='alert alert-danger'>");
							$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
								.append("</button>");
							$('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
							$('#success > .alert-danger').append('</div>');
							//clear all fields
							$('#contactForm').trigger("reset");
						},
					})
				},
				filter: function() {
					return $(this).is(":visible");
				}
			});
		}
		
		//  Little Menu Click
		$('.rst-shortmenu > a').on('click',function(e){
			e.preventDefault();
			$(this).next().stop(false,true).slideToggle(300);
			
		});
		
		// Scroll To Top
		$('.rst-design a').on('click',function(e){
			e.preventDefault();
			$('html, body').animate({scrollTop:0}, 'slow');
			
		});
		
		// Load More
		$('.rst-newsandhot-post .rst-loadmore').on('click',function(e){
			e.preventDefault();
			var load_more = $(this);
			load_more.text('Loading...');
			setTimeout(function(){
				load_more.text('Load more ...');
				var data = '\
					<article>\
						<div class="row">\
							<div class="rst-postpic col-sm-6">\
								<a href="#"><img src="images/slider/category/new02.jpg" alt="" /></a>\
								<a href="#" class="rst-postpic-cat"><span>world</span></a>\
							</div>\
							<div class="rst-postinfo col-sm-6">\
								<h6><a href="#">Lorem ipsum dolor sit amet consectetur.</a></h6>\
								<time><i class="fa fa-clock-o"></i>12 sep, 2015</time>\
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id libero vitae magna sollicitudin pulvinar vel et tellus. Cras a tincidunt sapien, et efficitur turpis. Pellentesque efficitur in purus in feugiat.</p>\
								<a href="#" class="rst-info-viewlink"><span>read more</span><i class="fa fa-comments"></i></a>\
							</div>\
						</div>\
					</article>\
				';
				$('.rst-newsandhot-post-content').append(data);
			}, 3000);
			
		});
		$('#rst-itemcontent .rst-loadmore').on('click',function(e){
			e.preventDefault();
			var load_more = $(this);
			load_more.text('Loading...');
			setTimeout(function(){
				load_more.css('display','none');
				var data = '\
					<li class="comment">\
						<div class="comment-container">\
							<div class="comment-avatar">\
								<img src="images/account.jpg" alt="" />\
							</div>\
							<div class="comment-data">\
								<div class="comment-header">\
									<a href="#" class="comment-author">John Doe</a>\
									<time class="comment-date"><i class="fa fa-clock-o"></i>on 12 sep, 2015</time>\
									<a href="#" class="comment-reply-link">REPLY</a>\
								</div>\
								<div class="comment-body">\
									<p>Curabitur posuere eros sed tortor porttitor pretium. Praesent tincidunt neque eget euismod malesuada. Sed gravida finibus est eu dignissim. Fusce malesuada sodales interdum. Mauris sagittis interdum enim vel sodales. Vestibulum at tellus id libero mollis maximus sed quis ligula.</p>\
								</div>\
							</div>\
						</div>\
					</li>\
					<li class="comment">\
						<div class="comment-container">\
							<div class="comment-avatar">\
								<img src="images/account.jpg" alt="" />\
							</div>\
							<div class="comment-data">\
								<div class="comment-header">\
									<a href="#" class="comment-author">John Doe</a>\
									<time class="comment-date"><i class="fa fa-clock-o"></i>on 12 sep, 2015</time>\
									<a href="#" class="comment-reply-link">REPLY</a>\
								</div>\
								<div class="comment-body">\
									<p>Curabitur posuere eros sed tortor porttitor pretium. Praesent tincidunt neque eget euismod malesuada. Sed gravida finibus est eu dignissim. Fusce malesuada sodales interdum. Mauris sagittis interdum enim vel sodales. Vestibulum at tellus id libero mollis maximus sed quis ligula.</p>\
								</div>\
							</div>\
						</div>\
					</li>\
				';
				$('#rst-itemcontent .commentlist').append(data);
			}, 3000);
			
		});
		
		
		// Custom Selectbox
		$('#rst-catshortselect').rsSelectBox();
		
		// Change view style in category page
		$('.rst-viewstyle a').on('click',function(e){
			e.preventDefault();
			$('.rst-viewstyle a').removeClass('active');
			$(this).addClass('active');
			
		});
		$('.rst-viewstyle .rst-view-gird').on('click',function(e){
			e.preventDefault();
			for ( var i = 1; i <= $('.rst-cat-postlist article').size(); i++ )
			{
				$('.rst-cat-postlist article').eq(i-1).removeClass('col-sm-12');
				$('.rst-cat-postlist article').eq(i-1).addClass('col-sm-6 col-xs-6');
			}
			
		});
		$('.rst-viewstyle .rst-view-list').on('click',function(e){
			e.preventDefault();
			for ( var i = 1; i <= $('.rst-cat-postlist article').size(); i++ )
			{
				$('.rst-cat-postlist article').eq(i-1).addClass('col-sm-12');
				$('.rst-cat-postlist article').eq(i-1).removeClass('col-sm-6 col-xs-6');
			}
			
		});
		
		// Set width search input 
		if ( $(window).width() < 981 )
		{
			search_width();
		}
		
		// login form responsive
		loginform_click();
		
		// Style input type file
		$('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        
			var input = $(this).parents('.input-group').find(':text'),
				log = numFiles > 1 ? numFiles + ' files selected' : label;
			
			if( input.length ) {
				input.val(log);
			} else {
				if( log ) {
					$(this).parents('.input-group-btn').find('.input-group-text').html(log);
				};
			}
			
		});
		
		// Page template mobile click
		if ( $(window).width() < 769 )
		{
			$('.rst-socialbar-menu li:last-child a').on('click',function(e){
				e.preventDefault();
				$(this).next().stop(true,true).slideToggle(700);
				
			});
		}
		
		// End window(ready) <-.->
	});
	
	$(document).on('change', '.btn-file :file', function() {
		var input = $(this),
		  numFiles = input.get(0).files ? input.get(0).files.length : 1,
		  label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [numFiles, label]);
		
	});

	
	jQuery(window).resize(function(){
		tab_height();
		search_width();
		loginform_click();
		// Page template mobile click
		if ( $(window).width() < 769 )
		{
			$('.rst-socialbar-menu li:last-child a').click(function(e){
				e.preventDefault();
				$(this).next().stop(false,false).slideToggle(700);
			});
		}
		
	});
	
	function tab_height() {
		$('.widget.widget_popular').css('height',$('.widget.widget_popular > ul > li.active').height() + $('.widget.widget_popular > ul > li.active ul').height() + 30 + 'px');
		
	}
	
	function search_width() {
		if ( $(window).width() < 981 )
		{
			$('.rst-socialbar-social .rst-search input[type="text"]').css('width',$('.rst-socialbar-social').width() - $('.rst-socialbar-social ul').width() - 2 + 'px');
		}
		else {
			$('.rst-socialbar-social .rst-search input[type="text"]').css('width', '0');
		}
		
	}
	
	function loginform_click() {
		if ( $(window).width() < 769 )
		{
		
			$('.rst-loginform > a').on('click',function(e){
				e.preventDefault();
				$('.rst-loginform > div').slideToggle(400);
			});
			
			$('.rst-accsetting-name').on('click',function(e){
				e.preventDefault();
				$(this).next().slideToggle(400);
			});
			
		}
		
	}
	
	
}());

}
main();