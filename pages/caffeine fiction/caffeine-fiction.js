$(document).ready(function() {

    function openContent(event) {
      var currentAttrValue = $(this).attr('data-tab');
      /*IF POPUP*/
      if (event.data.popup === "true") {
        $(currentAttrValue).fadeIn().prepend('<a href="#" class="close"></a>');
        $('.fade').fadeIn();
      } else {

        window.location.hash = currentAttrValue;

        // SHOW / HIDE TABS
        $(event.data.contentContainer + currentAttrValue).addClass('active').siblings(event.data.contentContainer).removeClass('active');

        // CHANGE / REMOVE ACTIVE
        $(this).parent(event.data.navParent).addClass('active').siblings().removeClass('active');

        positionTooltips();
      }

      event.preventDefault();
    }

    /*tabs*/
    $("#navigation li a").on("click", {
      contentContainer: ".tabs",
      navParent: "li",
      dis: "flex"
    }, openContent);

    /*pages*/
    $(".pagelinks a").on("click", {
      contentContainer: ".tabpages",
      navParent: "li",
    }, openContent);

    /*connections*/
    $(".connections li a").on("click", {
      popup: "true"
    }, openContent);

    /*remove popup fade and fadeout popup*/
    $(document).on('click', '.fade', (function() {
      $(".fade, .popup").fadeOut(600);
    }));

    /*hash*/
    var hash = $.trim(window.location.hash);
    if (hash) $('#navigation li a[data-tab$="' + hash + '"]').trigger('click');

    /*FILTER*/
    $('.filtercat').on( 'click', function() {
      var filterValue = $(this).attr('data-filter');

      if (filterValue === '*') {
        $('.card').removeClass('hide');
      } else {
        $(filterValue).removeClass('hide').siblings('li:not(' + filterValue + ')').addClass('hide');
      }
    });

    /* TOOLTIPS */
    function positionTooltips() {
      $('.tooltip').each(function(){
        let parentDiv = $(this).parent();
        let parentWidth = parentDiv.outerWidth();
        let tooltipWidth = $(this).outerWidth();
        let tooltipHeight = $(this).outerHeight();

        $(this).css({
           'margin-left': -((tooltipWidth / 2) - (parentWidth / 2)),
           'margin-top' : -(tooltipHeight * 2/3),
           'left': 'unset'
        });
      });
     }

     positionTooltips();
     $( window ).resize(function() {
       positionTooltips();
     });

  });
