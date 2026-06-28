document.addEventListener('DOMContentLoaded', function () {
    var EMAIL = '1135843016yyjackson@gmail.com';

    function copyEmail() {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(EMAIL);
        }
        return new Promise(function (resolve, reject) {
            var textarea = document.createElement('textarea');
            textarea.value = EMAIL;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textarea);
                resolve();
            } catch (err) {
                document.body.removeChild(textarea);
                reject(err);
            }
        });
    }

    function showToast(message) {
        var toast = document.getElementById('copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'copy-toast';
            toast.className = 'copy-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toast._hideTimer);
        toast._hideTimer = setTimeout(function () {
            toast.classList.remove('show');
        }, 2500);
    }

    document.querySelectorAll('.copy-email-trigger').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            copyEmail()
                .then(function () {
                    showToast('Email copied: ' + EMAIL);
                })
                .catch(function () {
                    showToast('Failed to copy email');
                });
        });
    });

    document.querySelectorAll('.wechat-wrapper a').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
        });
    });
});
