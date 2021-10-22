$(document).ready(function() {

  /*HIDE DOUBLE POST SOURCE*/
  $('.post_source a').each(function() {
    let postAuthorPos = $(this).closest('.post').find('.post_author a').attr('href');
    let postAuthor = postAuthorPos;

    let postSource = $(this).attr('href');
    if ($(this).is('[href*="' + postAuthor + '"')) {
      $(this).parent('.post_source').hide();
    }
  });

  /*pxu*/
  $('.photo-slideshow').pxuPhotoset({
    'ligthbox': true, // uses the default Tumblr lightbox, change to false to use your own
    'highRes': true, // will use high res images
    'rounded': 'all', // corners, all or false
    'borderRadius': '0px',
    'exif': true, // display EXIF data if available (tooltip)
    'captions': true, // display individual captions on photos (tooltip)
    'gutter': '10px', // spacing between the images
    'photoset': '.photo-slideshow', // photoset wrapper
    'photoWrap': '.photo-data', // photo data wrapper (includes photo, icons + exif)
    'photo': '.pxu-photo' // photo wrap (includes photo only)
  }, function() {
    // callback
  });

  function openTab(attr, tab) {
    var page = $(tab + attr);

    if (page.is(":hidden") && attr != "/") {
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

  $(".side_menu a").on('click', function() {
    let attr = $(this).attr('href');
    openTab(attr, '.page_wrapper');
  });

  /*FAQ ACCORDION*/
  $(".row .quest").on('click', function() {
    var reply = $(this).next(".reply");
    if (reply.is(":hidden")) {
      $(this).find("svg").replaceWith('<svg class="feather"><polyline points="18 15 12 9 6 15" /></svg>');
      reply.slideDown();
      $(this).addClass("open");
    } else {
      $(this).find("svg").replaceWith('<svg class="feather"><polyline points="6 9 12 15 18 9" /></svg>');
      reply.slideUp();
      $(this).removeClass("open");
    }
  });


  const toggleSwitch = document.querySelector('input[type="checkbox"]#sidebar_button');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  if (toggleSwitch) {
    toggleSwitch.addEventListener('change', switchTheme, false);
  }

feather.replace();

}); /*document ready*/
