$( document ).ready(function() {
      
  if( connectionPopup === true) {
  $(".gallery li").each(function() {
      $(this).css("cursor", "pointer");
  });
      
  /*POPUP*/
  /*opens popup on click*/
  $(".gallery li").on('click', function() {
    var currentIndex = $(this).index() + 4;

    var currentLoc = ".tab.current .popup:nth-of-type(" + currentIndex + ')';
    

     $(this).addClass('active').siblings('.gallery li').removeClass('active');

      $('.popup').fadeOut();
      $(currentLoc).fadeIn().css('display', 'flex');
      $(document.body).addClass('noscroll'); /*noscroll on background*/
   });

    $(".popup").on('click', function() {
      $(this).fadeOut();
      $(document.body).removeClass('noscroll');
      $('.gallery img').removeClass('active');
    });
    /*prevent closing popup by clicking on it*/
    $('.popup-inner').click(function (e) {
      e.stopPropagation();
    });
  }


   $('nav li').on('click', function(e) {
     var currentAttrValue = $(this).attr('data-tab');

     window.location.hash = $(this).attr('data-tab');

     $('.tab' + currentAttrValue).addClass('current').siblings('.tab').removeClass('current');
     $(this).addClass('current').siblings('nav li').removeClass('current');
   });

   /*HASH SCRIPT*/ 
   var hash = $.trim(window.location.hash);

   if (hash) {
     $('nav li[data-tab$="' + hash + '"]').trigger('click');
   }

   $('#close').on('click', function() {
     if ( ($(this)).hasClass('x') ) {
       $('#close, nav, nav .current, nav ul').removeAttr('style');
       $('#close').removeClass('x');
     }

     else {
       $('nav .current').css({
         'transform' : 'scale(1)',
       });
       $('nav').css({
         'margin-left' : '-250px',
       });
       $('nav ul').css({
         'overflow-y' : 'hidden',
       });
       $('#close').css({
         'left' : '12px',
       });
       $('#close').addClass('x'); 
     }
   });
   
   /*color per tab*/
   if( colorPerTab === true) {
     var i = 1;
     $(".tab").each(function() {
       var thisNext = $(this).find("nav ul, .bar.colored, .bubbles ul li");
       thisNext.css({
         "background" : "var(--accentColorOne-" + i + ")",
         "background" : "-webkit-linear-gradient(to bottom, var(--accentColorOne-" + i + "), var(--accentColorTwo-" + i + "))",
         "background" : "linear-gradient(to bottom, var(--accentColorOne-" + i + "), var(--accentColorTwo-" + i + "))"
       });
      i++;
     });
   }

 });/*document ready*/