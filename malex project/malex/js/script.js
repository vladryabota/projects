jQuery(document).ready(function(){


     $('.burger-list').click(function(){
          $('.nav-block').fadeIn();
          $('.header-menu li a').click(function(){
            $('.nav-block').fadeOut();
          });
     });
     $('#close').click(function(){
        $('.nav-block').fadeOut();

     });
     $('#search-btn').click(function(){
         $('#wrapp-formserach').show();
         /* $('top-menu-wrapp').classList.remove('sticky'); */
     })
     $('#search-btn-close').click(function(){
        $('#wrapp-formserach').hide();
     })

      $(window).resize(function(){
          if( $(this).width() >= 768) {
              $('.nav-block').removeAttr('style');
          }
      });

      var width= $(window).width();
      if(width < 768){
        $('.nav-block .header-menu li a').click(function(){
            $('.nav-block').fadeOut();
          })
      }


     $('.play-button').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

    // Slideshow 3
    $(".rslides-comments").responsiveSlides({
        manualControls: '.rslides-comments-pager',
        maxwidth: 1000
      });

      // When the user scrolls the page, execute myFunction
    window.onscroll = function() {myFunction()};

    // Get the navbar
    var navbar = document.querySelector('.top-menu-wrapp');

    // Get the offset position of the navbar
    var sticky = navbar.offsetTop;

    var img = document.querySelector('.top-menu-wrapp a img');

    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
        navbar.style.padding = '10'+'px' + '0'
        navbar.style.boxSizing= 'border-box'
        } else {
            navbar.classList.remove("sticky");
            img.style.filter = '0'+ '%'; 
        }
    }

}); // ready
