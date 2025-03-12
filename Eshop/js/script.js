$(document).ready(function () {
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
            }
        }
    });

    $('.tabs li a').click(function (e) {
        e.preventDefault();

        $('.tabs li a').removeClass('active');

        $(this).addClass('active');
    })

    $('.button-add-to-cart').click(function () {
        $('.button-add-to-cart').hide();
        $('.button-in-cart').show();
    })

    $('.button-in-cart').click(function () {
        $('.button-in-cart').hide();
        $('.button-add-to-cart').show();
    })

    /*-----TABS-------*/

    $('#params, #videos, #reviews').hide();

    $('.product-menu .tabs li:first-child a').click(function (e) {
        e.preventDefault();
        $('#params, #videos, #reviews').hide();
        $('#home').show();

    });
    $('.product-menu .tabs li:nth-child(2) a').click(function (e) {
        e.preventDefault();
        $('#home,  #videos, #reviews').hide();
        $('#params').show();

    });
    $('.product-menu .tabs li:nth-child(3) a').click(function (e) {
        e.preventDefault();
        $('#home,  #params, #reviews').hide();
        $('#videos').show();

    });
    $('.product-menu .tabs li:nth-child(4) a').click(function (e) {
        e.preventDefault();
        $('#home,  #params, #videos').hide();
        $('#reviews').show();
    });


    var price = 20999;
    var totalcart = $("#totalcart");
    var res = $(".res");
    totalcart.click(function () {

        var count = $("#count").val();

        var total = count * price;

        res.text(total);
    });




     /*aside menu*/

    $('#openaside').click(function(e){
      e.preventDefault();
     $('#slideaside').animate({

         'left': 0

     }, 1000);

    });


     $('#closeaside').click(function(e){
         e.preventDefault();
          $('#slideaside').animate({

         'left': '-320px'

     }, 1000);

     });



});
