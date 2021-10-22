/*alternative mirror-images script with magnusthemes' isotope combination filtering
https://magnusthemes.tumblr.com/post/171696773190/isotope-combination-filtering
delete and replace mirror-images.js with this file or copy/paste it in a script tag
before the body closing tag*/

  //after spreadsheet content is generated
const contentLoaded = function() {
  buildLayout();
  tabFunctions();
  feather.replace();
  $('.tooltip').tooltipster({
    side: 'right'
  });
}; //end contentLoaded

//BUILD LAYOUT FUNCTION
function buildLayout() {
  $('.lds-ring').fadeOut();
  var filters = {}; //should be outside the scope of the filtering function
  //initialise isotope
  const $grid = $('.grid_wrapper').isotope({
    itemSelector: '.grid-item',
    masonry: {
      fitWidth: true
    }
  });
  
  $(".option-set a").click(function(e) {
   var $this = $(this); // cache the clicked link
   var filterAttr = "data-filter-value";
   var filterValue = $this.attr(filterAttr); // cache the filter
   var $optionSet = $this.parents(".option-set"); // cache the parent element
   var group = $optionSet.attr("data-filter-group"); // cache the parent filter group
   var filterGroup = filters[group];
   if (!filterGroup) {
     filterGroup = filters[group] = [];
   }
   var $selectAll = $optionSet.find('a['+filterAttr+'=""]'); // the 'select all' button in the current group
   var activeClass = "selected", // the class for active links
     exclClass = "exclusive"; // the class for exclusive groups
 comboFiltering($this,filters,filterAttr,filterValue,$optionSet,group,$selectAll,activeClass,exclClass);
   var comboFilter = getComboFilter(filters);
   $grid.isotope({
     filter: comboFilter
   });
   $this.toggleClass(activeClass);
   e.preventDefault();
 });
  
  $('.grid-item').each(function(i) {
    setTimeout(function() {
      $('.grid-item').eq(i).addClass('is-visible');
    }, 100 * i);
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
}
