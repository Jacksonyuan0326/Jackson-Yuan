document.addEventListener('DOMContentLoaded', function () {
    var scrollElements = document.querySelectorAll(
        '.software-developer, .web-developer, .data-analyst, ' +
        '.introduction .selfie, .container, .project-gallery img, .project-gallery video'
    );

    scrollElements.forEach(function (el, index) {
        el.classList.add('scroll-reveal');

        if (el.classList.contains('software-developer') || el.classList.contains('data-analyst')) {
            el.classList.add('from-left');
        } else if (el.classList.contains('web-developer')) {
            el.classList.add('from-right');
        } else if (el.classList.contains('selfie')) {
            el.classList.add('from-right');
        } else if (el.classList.contains('container')) {
            el.classList.add('from-bottom');
            el.style.transitionDelay = (index % 3) * 0.15 + 's';
        } else {
            el.classList.add('from-scale');
        }
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    scrollElements.forEach(function (el) {
        observer.observe(el);
    });
});
