//after spreadsheet content is generated
const contentLoaded = function() {
  buildLayout();
  tabFunctions();
  feather.replace();
  $('.tooltip').tooltipster({
    side: 'right'
  });
} //end contentLoaded

//BUILD LAYOUT FUNCTION
function buildLayout() {
  $('.lds-ring').fadeOut();
  //initialise isotope
  $( document ).ready(function() {

 const $grid = $('.grid_wrapper').isotope({
   itemSelector: '.grid-item',
   masonry: {
     fitWidth: true
   }

   });
 });
  $('.grid-item').each(function(i) {
    setTimeout(function() {
      $('.grid-item').eq(i).addClass('is-visible');
    }, 100 * i);
  });


  $('nav a').on('click', function() {
    var filterValue = $(this).attr('data-filter');

    $("nav a[data-filter] > *").css({
      "opacity": "0.5"
    });
    $(this).children().css({
      "opacity": "1"
    });

    $('.grid_wrapper').isotope({
      filter: filterValue
    });
  });

}

/*TABS*/
function tabFunctions() {
  //TRIGGER ON EVENTS
  $(".grid-item > a").on('click', function() {
    let attr = $(this).attr('href');
    openTab(attr, '.tab');
  });

  $("#sidebar_controls").on("click", function() {
    if ($(".active").is(":visible")) {
      $(".active").fadeOut(function() {
        $(".content_wrapper.grid").fadeIn();
      });
    } else {
      $('#sidebar_button').prop('checked', true);
    }
  });

  var hash = $.trim(window.location.hash);
  if (hash) {
    openTab('.tab', hash);
  }

  /*color per tab*/
  if (colorPerTab === true) {
    var i = 1;
    $(".tab").each(function() {
      let rgbColor = getComputedStyle(document.body).getPropertyValue("--accentColor-" + i);
      //if css variables is defined do
      if (rgbColor) {
        let elemID = '#' + $(this).attr('id');
        let style = document.head.appendChild(document.createElement("style"));
        style.innerHTML = elemID + " .cskills .track span, " + elemID + " .pos_traits li, " + elemID + " .neg_traits li, " + elemID + " .character_page table td::before {background: var(--accentColor-" + i + "); color: var(--accentText-" + i + ");} " + elemID + " .cconnections .overlay {background: " + hexToRGB(rgbColor, 0.3) + ";} " + elemID + " .character_page td:first-of-type { background:" + hexToRGB(rgbColor, 0.03) + ";}";
      }
      i++;
    });
  }
}

//TABS
function openTab(attr, tab) {
  var page = $(tab + attr);

  if (page.is(":hidden")) {
    $('.content_wrapper.grid').fadeOut(function() {
      page.fadeIn(800);
      $("#sidebar_button").prop("checked", true);
      page.addClass('active');
    });
  }
  loadPinterest(document);
}

/*hex to rgba*/
function hexToRGB(h, opacity) {
  h = h.slice(1);
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return "rgba(" + +r + "," + +g + "," + +b + "," + opacity + ")";
}

//load pinterest boards
function loadPinterest(d) {
  var f = d.getElementsByTagName('SCRIPT')[0],
    p = d.createElement('SCRIPT');
  p.type = 'text/javascript';
  p.setAttribute('data-pin-hover', false);
  p.async = true;
  p.src = 'https://assets.pinterest.com/js/pinit.js';
  f.parentNode.insertBefore(p, f);
};
