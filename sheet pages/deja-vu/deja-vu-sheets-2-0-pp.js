//after spreadsheet content is generated
const contentLoaded = function() {

  $('.tab:first-of-type, nav li:first-of-type').addClass('current');

  //IF CONNECTIONS
  if (connectionPopup === true) {
    $(".gallery li").each(function() {
      $(this).css("cursor", "pointer");
    });

    //connection popup
    $(".gallery li").on("click", {
      contentContainer: ".popup",
      dis: "flex",
      parentCont: ".tab",
      popup: true
    }, openContent);
  }

  //open tabs
  $("nav li").on("click", {
    contentContainer: ".tab",
    dis: "flex"
  }, openContent);



  //HASH SCRIPT
  var hash = $.trim(window.location.hash);

  if (hash) {
    $('nav li[data-tab$="' + hash + '"]').trigger('click');
  }



  //POPUP FUNCTION
  function openContent(event) {

    /*IF POPUP*/
    if (event.data.popup) {

      let currentIndex = $(this).index() + 4;
      let currentLoc = event.data.parentCont + ".current .popup:nth-of-type(" + currentIndex + ')';

      // SHOW / HIDE POPUPS
      $(currentLoc).fadeIn().css('display', event.data.dis);
      $(document.body).addClass('noscroll'); /*noscroll on background*/

      $(event.data.contentContainer).on('click', function() {
        $(this).fadeOut();
        $(document.body).removeClass('noscroll');
      });

      /*prevent closing popup by clicking on it*/
      $('.popup-inner').click(function(e) {
        e.stopPropagation();
      });
    } else {
      var currentAttrValue = $(this).attr('data-tab');
      window.location.hash = currentAttrValue;

      // SHOW / HIDE TABS
      $(event.data.contentContainer + currentAttrValue).addClass('current').siblings(event.data.contentContainer).removeClass('current');

      // CHANGE / REMOVE ACTIVE
      $(this).addClass('current').siblings().removeClass('current');
    }

    event.preventDefault();
  }


  //SIDEBAR FUNCTION
  $('#close').on('click', function() {
    if (($(this)).hasClass('x')) {
      $('#close, nav, nav .current, nav ul').removeAttr('style');
      $('#close').removeClass('x');
    } else {
      $('nav .current').css({
        'transform': 'scale(1)',
      });
      $('nav').css({
        'margin-left': '-250px',
      });
      $('nav ul').css({
        'overflow-y': 'hidden',
      });
      $('#close').css({
        'left': '12px',
      });
      $('#close').addClass('x');
    }
  });

  //COLOR PER TABS FUNCTION
  function colorTabs() {
    /*iterate through tabs*/
    var i = 1;
    $(".tab").each(function() {
      var thisNext = $(this).find("nav ul, .bar.colored, .bubbles ul li");
      thisNext.css({
        "background": "var(--accentColorOne-" + i + ")",
        "background": "-webkit-linear-gradient(to bottom, var(--accentColorOne-" + i + "), var(--accentColorTwo-" + i + "))",
        "background": "linear-gradient(to bottom, var(--accentColorOne-" + i + "), var(--accentColorTwo-" + i + "))"
      });
      i++;
    });

  }

  //call color per tabs function
  if (colorPerTab === true) {
    colorTabs();
  }

}; //end contentLoaded
