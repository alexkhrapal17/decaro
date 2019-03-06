$(function() {

    // fixed header on scroll
    jQuery(document).ready(function($){
        var mainHeader = $('.main-header'),
            secondaryNavigation = $('.cd-secondary-nav'),
            //this applies only if secondary nav is below intro section
            belowNavHeroContent = $('.sub-nav-hero'),
            headerHeight = mainHeader.height();

        //set scrolling variables
        var scrolling = false,
            previousTop = 0,
            currentTop = 0,
            scrollDelta = 10,
            scrollOffset = 150;

        mainHeader.on('click', '.nav-trigger', function(event){
            // open primary navigation on mobile
            event.preventDefault();
            mainHeader.toggleClass('nav-open');
        });

        $(window).on('scroll', function(){
            if( !scrolling ) {
                scrolling = true;
                (!window.requestAnimationFrame)
                    ? setTimeout(autoHideHeader, 250)
                    : requestAnimationFrame(autoHideHeader);
            }
        });

        $(window).on('resize', function(){
            headerHeight = mainHeader.height();
        });

        function autoHideHeader() {
            var currentTop = $(window).scrollTop();

            ( belowNavHeroContent.length > 0 )
                ? checkStickyNavigation(currentTop) // secondary navigation below intro
                : checkSimpleNavigation(currentTop);

            previousTop = currentTop;
            scrolling = false;
        }

        function checkSimpleNavigation(currentTop) {
            //there's no secondary nav or secondary nav is below primary nav
            if (previousTop - currentTop > scrollDelta) {
                //if scrolling up...
                mainHeader.removeClass('is-hidden');
            } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
                //if scrolling down...
                mainHeader.addClass('is-hidden');
            }
        }

        function checkStickyNavigation(currentTop) {
            //secondary nav below intro section - sticky secondary nav
            var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();

            if (previousTop >= currentTop ) {
                //if scrolling up...
                if( currentTop < secondaryNavOffsetTop ) {
                    //secondary nav is not fixed
                    mainHeader.removeClass('is-hidden');
                    secondaryNavigation.removeClass('fixed slide-up');
                    belowNavHeroContent.removeClass('secondary-nav-fixed');
                } else if( previousTop - currentTop > scrollDelta ) {
                    //secondary nav is fixed
                    mainHeader.removeClass('is-hidden');
                    secondaryNavigation.removeClass('slide-up').addClass('fixed');
                    belowNavHeroContent.addClass('secondary-nav-fixed');
                }

            } else {
                //if scrolling down...
                if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
                    //hide primary nav
                    mainHeader.addClass('is-hidden');
                    secondaryNavigation.addClass('fixed slide-up');
                    belowNavHeroContent.addClass('secondary-nav-fixed');
                } else if( currentTop > secondaryNavOffsetTop ) {
                    //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
                    mainHeader.removeClass('is-hidden');
                    secondaryNavigation.addClass('fixed').removeClass('slide-up');
                    belowNavHeroContent.addClass('secondary-nav-fixed');
                }

            }
        }
    });

    // dropdown lang
    $(".dropdown-select-lang .dropdown-menu a").click(function () {
        $(".selected-lang").html($(this).text() + ' <span class="material-icons">expand_more</span>');

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $(".dropdown-select-lang .dropdown-menu a").removeClass('selected');
            $(this).addClass('selected');
        }
    });

    // main slider
    $('.splash-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        autoplay: 3000,
        arrows: false,
        speed: 700,
        fade: true
    });

    // map hover
    $('.container-click, .offices-info-close').on('click', function (e) {
        if ($('.offices-info').hasClass('active')) {
            $('.offices-info').removeClass('active');
        } else {
            $('.offices-info').addClass('active');
        }
    });

    // input focus
    $('.input-row input, .input-row textarea').on('change', function () {
        if ($(this).val()) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    // search mobile
    if ($(window).width() < 767) {
        $('.search-btn').on('click', function (e) {
           e.preventDefault();
           $('.main-search').toggleClass('show').focus();
        });
    }
});
