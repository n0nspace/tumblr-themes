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

  /*tooltips*/
  $('.tooltip').tooltipster({
   side: 'right'
  });

  feather.replace();

}); /*document ready*/
