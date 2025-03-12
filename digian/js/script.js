$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items:1,
        autoplay:true,
        mouseDrag:false,
        dots:true,
        loop:true
    });

    $('.close-hamb').hide();
    $('.hamburger').click( function (e) {
        e.preventDefault();
        $('.nav-links').show();
        $('.close-hamb').show();
        $('.hamburger').hide();
    })
    $('.close-hamb').click( function(e){
        e.preventDefault();
        $('.hamburger').show();
        $('.close-hamb').hide();
        $('.nav-links').hide();
    })
  });
  