$(document).ready(function () {
    $(".header-slider").owlCarousel({
        items: 1,
        mouseDrag: false,
        dots: false,
        loop: true,
        nav: true
    });
    $(".slider-occupation").owlCarousel({
        items: 3,
        nav: true,
        mouseDrag: true,
        dots: false,
        responsive: {
            320: {
                items: 1
            },
            375: {
                items: 1
            },
            425: {
                items: 1
            },
            768: {
                items: 1
            },
            1024: {
                items: 3
            }
        }
    })
    $(".rslides").responsiveSlides({
        pager: true,
        manualControls: '.rslides-comments-pager',
        auto: false,
        speed: 500,
        timeout: 5000,
    });
    $(".slider-adv.owl-carousel").owlCarousel({
        items: 2,
        nav: true,
        dots: false,
        responsive: {
            426: {
                items: 1
            },
            768: {
                items: 1
            },
            1024: {
                items: 2
            }
        }
    });
});

/* lightbox */
var lightBox = document.querySelector('.lightbox');
lightBox.classList.add('hide');

var linkVideoSlide = document.querySelectorAll('.link-slider-video');
for (let i = 0; i < linkVideoSlide.length; i++) {
    var link = linkVideoSlide[i];
    link.addEventListener('click', function (event) {
        event.preventDefault();
        lightBox.classList.add('show');
        lightBox.classList.remove('hide');
    })
    var lightBoxXmark = document.getElementById('close-lightbox');
    lightBoxXmark.addEventListener('click', function (event) {
        event.preventDefault();
        lightBox.classList.add('hide');
        lightBox.classList.remove('show');
    })
}
/* lightbox */

/* Counter for info-counter-block */

var tons = document.querySelector('#tons');
var product = document.querySelector('#product');

var infoCounterblock = document.querySelector('.info-counter-block');
var info = infoCounterblock.getBoundingClientRect();
var bodyRect = document.body.getBoundingClientRect();
var offsetInfoCounterBlock = info.top - bodyRect.top;

var scrolled = false;
document.addEventListener('scroll', function startScroll() {
    onScrollStartCounterInfo(offsetInfoCounterBlock);
})

function onScrollStartCounterInfo(offset) {
    if (scrolled == false) {
        var y = window.scrollY;
        if (y >= offset) {
            scrolled = true;
            StartCounter();
            document.removeEventListener('scroll', startScroll)
        }
    }
}
function StartCounter() {
    let counts = setInterval(startCounter, 85);
    let upto = 100;
    var x = 0;
    var y = 0;
    function startCounter() {

        x += 86;
        y += 1;
        if (y == upto) {
            clearInterval(counts);
        }
        tons.innerHTML = x;
        product.innerHTML = y;
    }
}
/* Counter for info-counter-block */


/* Counter for counters-achievs-block */

var productsLabel = document.querySelector('#products-counter');
var expertsLabel = document.querySelector('#experts-counter');
var cattleLabel = document.querySelector('#cattle-counter');
var hectaresLabel = document.querySelector('#hectares-counter');


var achievsBlock = document.querySelector('#achievs-counter');
var achievsRect = achievsBlock.getBoundingClientRect();
var offsetInfoAchievs = achievsRect.top - bodyRect.top;

var isscrolled = false;
document.addEventListener('scroll', function startScrollAchievs() {
    onScrollStartCountersAchievs(offsetInfoAchievs);
})

function onScrollStartCountersAchievs(offsetInfoAchievs) {
    if (isscrolled == false) {
        var y = window.scrollY;
        if (y >= offsetInfoAchievs) {
            isscrolled = true;
            StartCounterCounters()
            document.removeEventListener('scroll', startScrollAchievs)
        }
    }
}

function StartCounterCounters() {
    let counts = setInterval(startCounter, 85);
    let upto = 1200;
    var prod = 0;
    var expert = 0;
    var cattle = 0;
    var hectares = 0;
    function startCounter() {

        prod += 8;
        expert += 7;
        cattle += 6;
        hectares += 15;
        if (hectares == upto) {
            clearInterval(counts);
        }
        productsLabel.innerHTML = prod;
        expertsLabel.innerHTML = expert;
        cattleLabel.innerHTML = cattle;
        hectaresLabel.innerHTML = hectares;
    }
}
/* Counter for counters-achievs-block */

/* burger icon open content */

var navList = document.querySelector('#burger-menu');
var burgerIcon = document.querySelector('#ham-icons');

navList.classList.add('hide');
navList.classList.remove('show');

burgerIcon.addEventListener('click', function openBurgerMenu(event) {
    event.preventDefault();
    if (navList.classList.contains('show')) {
        navList.classList.remove('show');
        navList.classList.add('hide');
    }
    else {
        navList.classList.add('show');
        navList.classList.remove('hide');
    }
});
/* burger icon open content */

/*cart open */
var cart = document.querySelector('#cart');
var cartContent = document.querySelector('.cart-items');

cart.addEventListener('click', function Open(event) {
    event.preventDefault();
    if (cartContent.classList.contains('show')) {
        cartContent.classList.remove('show');
        cartContent.classList.add('hide');
    }
    else {
        cartContent.classList.remove('hide');
        cartContent.classList.add('show');
    }
})
/*cart open */

/* inside list open */
var inside = document.querySelector('#inside-list');
var nestedList = document.querySelector('#nested-list');

nestedList.classList.remove('show');
nestedList.classList.add('hide');


inside.addEventListener('click', function Open(event) {
    event.preventDefault();

    if (nestedList.classList.contains('show')) {
        nestedList.classList.remove('show');
        nestedList.classList.add('hide');


    }
    else {
        nestedList.classList.remove('hide');
        nestedList.classList.add('show');


    }
})
/* inside list open */

/* pos fixed header */

var header = document.querySelector('.header');
var stickyoffset = header.offsetTop;

window.onscroll = function () { addStickyOnScroll() };

function addStickyOnScroll() {
    if (window.pageYOffset > stickyoffset) {
        header.classList.add("sticky");
    }
    else {
        header.classList.remove("sticky");
    }
}

var products = document.querySelectorAll('.product');
var productImages = products.querySelectorAll('.img');
var buttonsBuy = products.querySelectorAll('.button-cart');
for (let i = 0; i < products.length; i++) {
    var image = productImages[i];
    var button = buttonsBuy[i];
    image.addEventListener('click', function openCart() {
        if (button.classList.contains('show')) {
            button.classList.remove('show');
            button.classList.add('hide');
        }
        else {
            button.classList.remove('hide');
            button.classList.add('show');
        }
    })
}
/* pos fixed header */
