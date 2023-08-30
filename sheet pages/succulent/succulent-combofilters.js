/*alternative succulent script with magnusthemes' isotope combination filtering
https://magnusthemes.tumblr.com/post/171696773190/isotope-combination-filtering
delete and replace succulent.js with this file or copy/paste it in a script tag
before the body closing tag after removing the succulent.js file link*/

const contentLoaded = function() {
  buildLayout();
  resizeGrid();
  feather.replace();
} //end contentLoaded

function buildLayout(content, grid) {

    $('#grid').hide();
    $('#grid').append(content);

    $('#grid').fadeIn();

    //resizeGrid on load
    resizeGrid();

    //initialise isotope
    const $grid = '#grid').isotope({
        itemSelector: '.card',
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

    $('nav a').on('click', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
            filter: filterValue
        });
        e.preventDefault();
    });
}

function resizeGrid() {
    const winWidth = $('main').innerWidth() - 70;
    const cardWidth = $('.card').outerWidth() + 30;
    const colNum = Math.floor(winWidth / cardWidth);

    if (colNum > 1) {
        $('#grid').css({
            'width': cardWidth * colNum
        });
        $('.card').css({
            'margin': '15px'
        });
    } else {
        $('#grid').css({
            'width': cardWidth - 30
        });
        $('.card').css({
            'margin': '15px 0'
        });
    }
}

//resizeGrid on window resize
(function() { // closure to avoid global variable
    var timeoutResize;
    $(window).on('resize', function() {
        clearTimeout(timeoutResize);
        timeoutResize = setTimeout(function() {
            resizeGrid();
        }, 100);
    });
})();

$('body').append(
  '<div id="nnspc" style="position: fixed; bottom: 0; right: 0; padding: 10px; z-index: 9;"><a style="font-family: monospace; font-weight: bold; color: var(--accent);" href="https://nonspace.tumblr.com">:3</a></div>'
);
