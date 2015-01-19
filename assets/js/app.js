$(document).ready(function() {

    var scrollOffset = -240;

    var isScreenSize = function (sizeLabel) {
        return ($('#is-' + sizeLabel).css('display') === 'block');
    };

    var setScreenSizeBodyClasses = function () {
        var body = $('body');
        var sizes = ['lg', 'md', 'sm', 'xs'];

        for (var index = 0; index < sizes.length; index++) {
            var className = 'is-' + sizes[index];

            body.removeClass(className);

            if (isScreenSize(sizes[index])) {
                body.addClass(className);
            }
        }
    };

    setScreenSizeBodyClasses();

    var setScrollOffset = function () {
        if (isScreenSize('lg') || isScreenSize('md')) {
            scrollOffset = -240;
        }

        if (isScreenSize('sm')) {
            scrollOffset = -180;
        }
    };

    setScrollOffset();

    $(window).on('resize', function() {
        setScreenSizeBodyClasses();
        setScrollOffset();
    });


    var navLinks = $('#navbar a');

    var highlightSection = function (target) {
        navLinks.each(function () {
            var navLink = $(this);

            navLink.closest('li').removeClass('active');

            if (navLink.attr('href').replace('#', '') === target.attr('id')) {
                navLink.closest('li').addClass('active');
            }
        });
    };

    var scrollAction = function (clickedElement) {
        var element = $(clickedElement);
        var href = element.attr('href');

        if (href.substr(0, 1) !== '#') {
            return false;
        }

        var target = $(href);
        if (target.length) {
            if (history.pushState) {
                history.pushState(null, null, '#' + target.attr('id'));
            } else {
                window.location.hash = target.attr('id');
            }
        }

        highlightSection(target);

        return false;
    };

    $('.navbar-brand').smoothScroll({
        'offset': scrollOffset
    }).click(function () {
        return scrollAction(this);
    });


    navLinks.smoothScroll({
        'offset': scrollOffset
    }).click(function () {
        return scrollAction(this);
    });

    if ($(window.location.hash).length) {
        var target = $(window.location.hash);
        if (target.length) {
            $.scrollTo(target, {
                'offset': scrollOffset
            });

            highlightSection(target);
        }
    }

});