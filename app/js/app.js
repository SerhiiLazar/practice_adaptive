document.addEventListener("DOMContentLoaded", function () {

    MicroModal.init({
        onShow: modal => {
            $('html').addClass('open-modal');
            if ($('html').hasClass('open-menu')) {
                setTimeout(() => {
                    $('.burger-mobile').removeClass('active-mobile-btn');
                    $('body').removeClass('active-menu');
                    $('html').removeClass('open-menu');
                }, 0);

            }
        }, // [1]
        onClose: modal => $('html').removeClass('open-modal'), // [2]
        // openTrigger: 'data-custom-open', // [3]
        // closeTrigger: 'data-custom-close', // [4]
        openClass: 'is-open', // [5]
        disableScroll: true, // [6]
        disableFocus: false, // [7]
        awaitOpenAnimation: false, // [8]
        awaitCloseAnimation: false, // [9]
        debugMode: true // [10]
    });

});


$(function () {

    /**Burger*/

    var btnBurger = $('.burger-mobile');

    btnBurger.on('click', function () {
        if (!$(this).hasClass('active-mobile-btn')) {
            $(this).addClass('active-mobile-btn');
            $('body').addClass('active-menu');
        } else {
            $(this).removeClass('active-mobile-btn');
            $('body').removeClass('active-menu');
        }
    });

    $('.overlay-menu').on('click', function () {
        $('body').removeClass('active-menu');
        $('.burger-mobile').removeClass('active-mobile-btn');
    })


    /**Mask*/
    $('input[type="tel"]').inputmask({"mask": "+38(999) 999-99-99", clearMaskOnLostFocus: false});


    /** Anchor*/

    $("body").on("click", "a[href*='#']", function (event) {
        event.preventDefault();

        if ($('body').hasClass('active-menu')) {
            $('body').removeClass('active-menu')
            $('.burger-mobile').removeClass('active-mobile-btn')

        }


        //забираем идентификатор бока с атрибута href
        var id = $(this).attr('href');
        //Высота шапкис учетом отступов если она фиксированая (если нет убрать переменную heightHeader с top )
        var heightHeader = $('.header').outerHeight(true);
        //узнаем высоту от начала страницы до блока на который ссылается якорь
       // var  top = $(id).offset().top - heightHeader; //Если header fixed
        var top = $('#' + id).offset().top;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({
            scrollTop: top
        }, 800);
    });

    /** Adaptive */
    var window_width = window.innerWidth || document.documentElement.clientWidth,
        lgMax = 1199,
        lgMin = 992,
        mdMax = 991,
        mdMin = 768,
        smMin = 576,
        xsMax = 575;

    $(window).resize(function () {
        window_width = window_width = window.innerWidth || document.documentElement.clientWidth;
        changeMenu();
    });

    var pageAside = $('.page-aside'),
        authButton = $('#auth-header'),
        headerLang = $('.header-language'),
        headerMenu = $('#nav-header'),
        headerPhone = $('.header-phones'),
        siteSearch = $('#header-search-form');


    function desctopMenu() {
        $('#header-checkout-sidebar').before(authButton);
        $('#page-header .left-header').append(headerLang);
        $('#page-header .left-header').after(headerMenu);
        headerMenu.after(headerPhone);
        pageAside.prepend(siteSearch);
    }

    function mobileMenu() {
        pageAside.append(authButton);
        pageAside.append(headerLang);
        pageAside.append(headerMenu);
        pageAside.append(headerPhone);
        $('#page-header').append(siteSearch);
    }

    function changeMenu() {
        if (window_width <= lgMax && !$('body').hasClass('mobile-ui')) {
            $('body').addClass('mobile-ui');
            $('body').removeClass('desktop-ui');
            mobileMenu();
        } else {
            if ($(window).outerWidth() > lgMax && !$('body').hasClass('desktop-ui')) {
                $('body').addClass('desktop-ui');
                $('body').removeClass('mobile-ui');
                desctopMenu();
            }
        }
    }

    changeMenu();
});