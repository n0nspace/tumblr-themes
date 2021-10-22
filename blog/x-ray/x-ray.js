/*hex to rgba*/
function hexToRGB(h) {
  let r = 0, g = 0, b = 0;

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

  return "rgba("+ +r + "," + +g + "," + +b + ",0.5)";
}

function toggleTheme(currentTheme) {
    if (currentTheme === 'dark') {

    } else if ($('html').data('theme') === 'light') {

    }
}

/*dark mode*/
  /*get users time*/
  var date = new Date();
  var hour = date.getHours();

  /*set storage default*/

  /*set storage based on time if dark mode enabled*/
  function checkMode() {
  if (typeof darkMode != 'undefined') {
    /*on theme switch click*/
    const toggleSwitch = document.querySelector('.theme-switch');
    /*do switch theme*/
    toggleSwitch.addEventListener('click', switchTheme);

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      localStorage.setItem('theme', 'dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      localStorage.setItem('theme', 'light');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: no-preference)').matches) {
      if (hour >= darkModeStart || hour < darkModeEnd)   {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    }
  } else {
      localStorage.setItem('theme', 'light');
  }
  }

  /*apply current storage to html*/
  function setTheme() {
    /*get current storage*/
    const currentTheme = localStorage.getItem('theme');

    let root = document.documentElement;

    let lightHighlight = hexToRGB(lightColor);
    let darkHighlight = hexToRGB(darkColor);

    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
      root.style.setProperty('--transparentHighlight', darkHighlight);

    } else {
      root.style.setProperty('--transparentHighlight', lightHighlight);
    }
  }


  checkMode();
  setTheme();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    checkMode();
    setTheme();
  });

  function switchTheme() {
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
      localStorage.setItem('theme', 'dark');
      setTheme();
    } else {
      localStorage.setItem('theme', 'light');
      setTheme();
    }
  }

$(document).ready(function() {

/*css photosets*/
initPhotosets();

/*scroll top*/
function stickyScrollTop(docScrollPos) {
  var winHeight = $(window).height();

  if ($(this).scrollTop() > winHeight) {
    $('#scrolltop').fadeIn();
  } else {
    $('#scrolltop').fadeOut();
  }
}

/*scroll to top on click*/
$(window).scroll( function(){
  var docScrollPos = $(document).scrollTop() + $(window).height();
  stickyScrollTop(docScrollPos);
});

/*scroll top button*/
$('#scrolltop').on('click', function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

});
