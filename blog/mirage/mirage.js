/*PAGES*/
     function openTab(attr, tab) {
      var page = $(tab + attr);

      if (page.is( ":hidden" ) && attr != "/") {
        page.siblings(tab).fadeOut(function() {
          $('#post_wrapper').fadeOut(function() {
            page.fadeIn(800);
          });
        });
      } else if (attr === "/") {
        $('#post_wrapper').fadeIn();
      } else {
        page.fadeOut(function() {
          $('#post_wrapper').fadeIn();
        });
      }
      }

     var hash = $.trim(window.location.hash);
     if (hash) {
       openTab(hash, '.page_wrapper');
     }

    $("#icon_nav a").on('click', function() {
      let attr = $(this).attr('href');
      openTab(attr, '.page_wrapper');
    });

$(document).ready(function() {

    /*pxu*/
      $('.photo-slideshow').pxuPhotoset({
        'ligthbox'  : true, // uses the default Tumblr lightbox, change to false to use your own
	    'highRes'   : true, // will use high res images
	    'rounded'   : 'all', // corners, all or false
	    'borderRadius' : customBorderRadius,
	    'exif'      : true, // display EXIF data if available (tooltip)
	    'captions'  : true, // display individual captions on photos (tooltip)
	    'gutter'    : '10px', // spacing between the images
	    'photoset'  : '.photo-slideshow', // photoset wrapper
	    'photoWrap' : '.photo-data', // photo data wrapper (includes photo, icons + exif)
	    'photo'     : '.pxu-photo' // photo wrap (includes photo only)
	  }, function() {

	});

  $('#youtube_iframe').parent('.vid').css({'padding-top' : '52.25%'});

    /*FAQ ACCORDION*/
    $(".row .quest").on('click', function() {
      var reply = $(this).next(".reply");
      if (reply.is( ":hidden" )) {
        $(this).find("i").replaceWith('<i class="fas fa-angle-up"></i>');
        reply.slideDown();
      }
      else {
        $(this).find("i").replaceWith('<i class="fas fa-angle-down"></i>');
        reply.slideUp();
      }
    });

  });/*document ready*/
