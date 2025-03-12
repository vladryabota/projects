$(document).ready(function () {
    $('.articles-for-slider').slick({
        touchMove: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        accessibility: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
        dots: false,
        infinite: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },

            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });/* slider */

    $('#responsive-menu-block').hide();
    $('.responsive-icons-menu .search .search-input').hide();
    $('.responsive-icons-menu .search .close').hide();
    $('.search-input').hide();
    $('.close').hide();
    $('#responsive-menu-block .header_nav').hide();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.header_menu_block').addClass("sticky");
        }
        else {
            $('.header_menu_block').removeClass("sticky");
        }
    }); /* mouse scroll sticky menu show */

    $('.search_icon').click(function (e) {
        e.preventDefault();
        $('.search').css('border-bottom', '1px solid black');
        $('.search').css('padding-bottom', '2px');
        if ($('.search-input').is(":hidden")) {
            $('.search-input').css('margin-right', '0.5em');
            $('.search-input').fadeIn();
            $('.close').fadeIn();
            $('.responsive-icons-menu .search .search-input').fadeIn();
            $('.responsive-icons-menu .search .close').fadeIn();
        }
        else {
            $('.search').css('border', 'none');
            $('.search').css('padding-bottom', '0px');
            $('.search-input').fadeOut();
            $('.close').fadeOut();
            $('.responsive-icons-menu .search .search-input').fadeOut();
            $('.responsive-icons-menu .search .close').fadeOut();
        }
    }) /* search input shows on click */

    $('.close').click(function (e) {
        e.preventDefault();
        $('.search-input').val('');
    }) /* close icon deletes content inside input */

    $('.responsive-icons-menu .search .close').click(function (e) {
        e.preventDefault();
        $('.responsive-icons-menu .search .search-input').val('');
    }) /* close icon deletes content inside input */

    $(document).mouseup(function (e) {
        if ($(e.target).closest(".search").length
            === 0) {
            $('.search').css('border', 'none');
            $('.search').css('padding-bottom', '0px');
            $('.search-input').val('');
            $('.responsive-icons-menu .search .search-input').val('');
            $('.search-input').fadeOut();
            $('.close').fadeOut();
            $('.responsive-icons-menu .search .search-input').fadeOut();
            $('.responsive-icons-menu .search #close').fadeOut();
        }
    }); /* clicking anywhere on document closes search input */

    $('#hamburger_icon').click(function (e) {
        e.preventDefault();
        $('#responsive-menu-block').fadeIn();
        $('#responsive-menu-block .header_nav').fadeIn();
    })
    $('#close-nav').click(function (e) {
        e.preventDefault();
        $('#responsive-menu-block').fadeOut();
        $('#responsive-menu-block .header_nav').fadeOut();
    })

    $('.plus').show();
    $('.minus').hide();

    $('.inside').click(function (e) {
        if ($('.plus').is(':hidden')) {
            $('.plus').show();
            $('.minus').hide();
            $('.inside .nested_list').fadeOut();
        }
        else {
            $('.inside .nested_list').fadeIn();
            $('.minus').show();
            $('.plus').hide();
        }
    })
});