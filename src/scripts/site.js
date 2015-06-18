(function(w, d, undefined) {
    'use strict';

    function scrollToTitle(event) {
        event.preventDefault();

        var mark = document.querySelector(event.target.getAttribute('href'));

        w.scroll({
            top: mark.offsetTop - 80,
            left: 0,
            behavior: 'smooth'
        });
    }

    w.addEventListener('load', function() {

        var navLinks = document.getElementsByClassName('nav-link'),
            sculptures = document.getElementsByClassName('custom-select');
            sculptor.init(sculptures);

        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', scrollToTitle, false);
        }

        document.getElementsByClassName('nav-logo')[0].addEventListener('click', function(event) {
            event.preventDefault();

            w.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        });

        w.addEventListener('scroll', function() {
            var position = w.scrollY || w.pageYOffset;

            if (position === 0) {
                d.body.classList.remove('nav--released');
            } else {
                d.body.classList.add('nav--released');
                if (position > 350) {
                    d.body.classList.add('nav--logo-visible');
                } else {
                    d.body.classList.remove('nav--logo-visible');
                }
            }
        });
    });

})(window, document);