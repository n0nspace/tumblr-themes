$(document).ready(function() {

  function buildLayout() {
    //initialise isotope
    const $grid = $('.grid_wrapper').isotope({
      itemSelector: '.grid-item',
      masonry: {
        fitWidth: true
      }
    });

   $('.grid-item').each(function(i){
     setTimeout(function(){
     $('.grid-item').eq(i).addClass('is-visible');
   }, 100 * i);
   });


    $('nav a').on('click', function() {
      var filterValue = $(this).attr('data-filter');

      $("nav a[data-filter] i").css({"opacity" : "0.5"});
      $(this).children("i").css({"opacity" : "1"});

      $("nav a[data-filter] i").css({"opacity" : "0.5"});
      $(this).children("i").css({"opacity" : "1"});

      $grid.isotope({
        filter: filterValue
      });
    });

  }

  buildLayout();

  /*TABS*/
  function openTab(attr, tab) {
    var page = $(tab+attr);

    if (page.is(":hidden")) {
      $('.content_wrapper.grid').fadeOut(function() {
         page.fadeIn(800);
         $("#sidebar_button").prop("checked", true);
         page.addClass('active');
      });
    }
  }

  var hash = $.trim(window.location.hash);
  if (hash) {
    openTab('.tab', hash);
  }

  $(".grid-item > a").on('click', function() {
    let attr = $(this).attr('href');
    openTab(attr, '.tab');
  });

  $("#sidebar_controls").on("click", function() {
    if ($(".active").is(":visible")) {
      $(".active").fadeOut(function() {
        $(".content_wrapper.grid").fadeIn();
      });
    }
      else {
        $('#sidebar_button').prop('checked', true);
      }
  });

  /*hex to rgba*/
  function hexToRGB(hex, opacity) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return "rgba(" + parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16) + "," + opacity + ");"
  }

  /*color per tab*/
  if( colorPerTab === true) {
    var i = 1;
    $(".tab").each(function() {
      let rgbColor = getComputedStyle(document.body).getPropertyValue("--accentColor-" + i).trim();
      console.log(rgbColor);
      //if css variables is defined do
      if (rgbColor) {
        let elemID = '#' + $(this).attr('id');
        let style = document.head.appendChild(document.createElement("style"));
        style.innerHTML = elemID + " .cskills .track span, " + elemID + " .pos_traits li, " + elemID + " .neg_traits li, " + elemID + " .character_page table td::before {background: var(--accentColor-" + i + "); color: var(--accentText-" + i + ");} " + elemID + " .cconnections .overlay {background: " + hexToRGB(rgbColor, 0.3) + ";} " + elemID + " .character_page td:first-of-type { background:" + hexToRGB(rgbColor, 0.03) + ";}";
      }
     i++;
    });
  }

  /*tooltips*/
  $('.tooltip').tooltipster({
   side: 'right'
  });

  feather.replace();

}); /*document ready*/
