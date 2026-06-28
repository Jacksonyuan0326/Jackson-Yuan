document.addEventListener('DOMContentLoaded', function () {
    var LEVEL_LABELS = {
        1: 'Beginner',
        2: 'Elementary',
        3: 'Intermediate',
        4: 'Advanced',
        5: 'Expert'
    };

    var LEVEL_DESCRIPTIONS = {
        1: 'Just getting started and learning the fundamentals.',
        2: 'Can handle simple tasks with occasional guidance.',
        3: 'Comfortable applying it in typical project work.',
        4: 'Confident building and maintaining complex solutions.',
        5: 'Deep expertise; can architect solutions and mentor others.'
    };

    var SKILL_LEVELS = {
        'VS code': 5
    };

    var CX = 50;
    var CY = 50;
    var RADIUS = 42;
    var CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    function getLevel(img, name) {
        var fromAttr = parseInt(img.getAttribute('data-level'), 10);
        if (fromAttr >= 1 && fromAttr <= 5) {
            return fromAttr;
        }
        if (SKILL_LEVELS[name] >= 1 && SKILL_LEVELS[name] <= 5) {
            return SKILL_LEVELS[name];
        }
        return Math.floor(Math.random() * 5) + 1;
    }

    function createRingSVG(level, gradientId) {
        var filled = (level / 5) * CIRCUMFERENCE;
        var offset = CIRCUMFERENCE - filled;

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'skill-ring-svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('aria-hidden', 'true');

        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        var gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', gradientId);
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');

        var stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#2d6a4f');

        var stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#0ac4e4');

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);

        var track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        track.setAttribute('cx', CX);
        track.setAttribute('cy', CY);
        track.setAttribute('r', RADIUS);
        track.setAttribute('class', 'skill-ring-track');

        var progress = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        progress.setAttribute('cx', CX);
        progress.setAttribute('cy', CY);
        progress.setAttribute('r', RADIUS);
        progress.setAttribute('class', 'skill-ring-progress');
        progress.setAttribute('stroke', 'url(#' + gradientId + ')');
        progress.style.setProperty('--ring-circumference', CIRCUMFERENCE);
        progress.style.setProperty('--ring-offset', offset);

        svg.appendChild(track);
        svg.appendChild(progress);

        return svg;
    }

    function createSkillInfo(name, level) {
        var info = document.createElement('div');
        info.className = 'skill-info';

        var levelLine = document.createElement('span');
        levelLine.className = 'skill-info-level';
        levelLine.textContent = name + ' · Level ' + level + '/5 · ' + LEVEL_LABELS[level];

        var description = document.createElement('span');
        description.className = 'skill-info-desc';
        description.textContent = LEVEL_DESCRIPTIONS[level];

        info.appendChild(levelLine);
        info.appendChild(description);
        return info;
    }

    function wrapSkillIcon(img) {
        var name = img.getAttribute('alt') || 'Skill';
        var level = getLevel(img, name);
        var gradientId = 'skill-ring-gradient-' + name.replace(/\s+/g, '-').toLowerCase();

        var item = document.createElement('div');
        item.className = 'skill-item';
        item.setAttribute('data-level', level);
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', name + ', proficiency level ' + level + ' out of 5');

        var visual = document.createElement('div');
        visual.className = 'skill-visual';

        var ring = document.createElement('div');
        ring.className = 'skill-ring';
        ring.appendChild(createRingSVG(level, gradientId));

        visual.appendChild(ring);
        visual.appendChild(img.cloneNode(true));
        item.appendChild(visual);
        item.appendChild(createSkillInfo(name, level));

        img.replaceWith(item);

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                item.classList.add('skill-item--animated');
            });
        });
    }

    document.querySelectorAll('.SDE.software img, .WEB.software img, .DA.software img').forEach(wrapSkillIcon);
});
