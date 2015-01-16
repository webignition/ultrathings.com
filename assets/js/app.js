$(document).ready(function() {

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
        'offset': -240
    }).click(function () {
        return scrollAction(this);
    });


    navLinks.smoothScroll({
        'offset': -240
    }).click(function () {
        return scrollAction(this);
    });

    if ($(window.location.hash).length) {
        var target = $(window.location.hash);
        if (target.length) {
            $.scrollTo(target, {
                'offset':-240
            });

            highlightSection(target);
        }
    }

});