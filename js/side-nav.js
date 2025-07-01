document.addEventListener('DOMContentLoaded', function() {
  // Refactor side-nav opacity update
  (function() {
    var sideNav = document.querySelector('.side-nav');
    if (!sideNav) return;
    var fadeDistance = 20;

    function updateNavOpacity() {
      var st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      var opacity = Math.min(st / fadeDistance, 1);
      sideNav.style.opacity = opacity;
    }

    // Attach to multiple scroll sources
    ['scroll', 'touchmove'].forEach(function(evt) {
      window.addEventListener(evt, updateNavOpacity);
      document.addEventListener(evt, updateNavOpacity);
      document.body.addEventListener(evt, updateNavOpacity);
    });

    // Initial check
    updateNavOpacity();
  })();
});