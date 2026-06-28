document.addEventListener('DOMContentLoaded', function () {
  var ICONS = [
    './image/contact_logo/GitHub.png',
    './image/contact_logo/LinkedIn.png',
    './image/contact_logo/WeChat.png',
    './image/contact_logo/Instagram.png',
    './image/contact_logo/Mail.png',
    './image/contact_logo/Resume.png',
    './image/software_logo/JavaScript.png',
    './image/software_logo/Python.png',
    './image/software_logo/React.png',
    './image/software_logo/HTML5.png',
    './image/software_logo/CSS3.png',
    './image/software_logo/Java.png',
    './image/software_logo/Node Js.png',
    './image/software_logo/AWS.png'
  ];

  var LAYER_CONFIG = [
    { className: 'contact-bg-layer--1', count: 10, sizeMin: 28, sizeMax: 44, durationMin: 22, durationMax: 34 },
    { className: 'contact-bg-layer--2', count: 9, sizeMin: 32, sizeMax: 50, durationMin: 26, durationMax: 38 },
    { className: 'contact-bg-layer--3', count: 8, sizeMin: 24, sizeMax: 40, durationMin: 30, durationMax: 42 },
    { className: 'contact-bg-layer--4', count: 11, sizeMin: 26, sizeMax: 46, durationMin: 20, durationMax: 32 }
  ];

  var bg = document.querySelector('.contact-bg');
  if (!bg) return;

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function pickIcon(index) {
    return ICONS[index % ICONS.length];
  }

  LAYER_CONFIG.forEach(function (layer, layerIndex) {
    var layerEl = document.createElement('div');
    layerEl.className = 'contact-bg-layer ' + layer.className;

    for (var i = 0; i < layer.count; i++) {
      var icon = document.createElement('div');
      icon.className = 'contact-bg-icon';

      var size = rand(layer.sizeMin, layer.sizeMax);
      var top = rand(4, 92);
      var left = rand(0, 88);
      var duration = rand(layer.durationMin, layer.durationMax);
      var delay = -rand(0, duration);
      var opacity = rand(0.16, 0.34);

      icon.style.width = size + 'px';
      icon.style.height = size + 'px';
      icon.style.top = top + '%';
      icon.style.left = left + '%';
      icon.style.setProperty('--icon-opacity', opacity.toFixed(2));
      icon.style.animationDuration = duration.toFixed(1) + 's';
      icon.style.animationDelay = delay.toFixed(1) + 's';

      var img = document.createElement('img');
      img.src = pickIcon(layerIndex * layer.count + i);
      img.alt = '';
      img.draggable = false;

      icon.appendChild(img);
      layerEl.appendChild(icon);
    }

    bg.appendChild(layerEl);
  });
});
