document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.project-card[data-link]').forEach(function (card) {
        card.addEventListener('click', function (e) {
            if (e.target.closest('a, video, button')) {
                return;
            }
            var url = card.getAttribute('data-link');
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });
});
