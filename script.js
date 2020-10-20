"use strict";

/*
 * Toggle mobile nav
 */
(function () {
  var toggleButton = document.getElementById("toggle-button");
  var mobileNav = document.querySelector(".mobile-nav");

  toggleButton.addEventListener("click", toggle);

  function toggle() {
    if (!toggleButton.classList.contains("open")) {
      open();
      toggleButton.classList.add("open");
    } else {
      close();
      toggleButton.classList.remove("open");
    }
  }

  function open() {
    mobileNav.style.display = "block";
    setTimeout(function () {
      mobileNav.classList.add("open");
      document.body.classList.add("nav-open");
    }, 10);
  }

  function close() {
    mobileNav.classList.remove("open");
    document.body.classList.remove("nav-open");
    setTimeout(function () {
      mobileNav.style.display = "none";
    }, 250);
  }
})();

/*
 * Lazy load images
 */
(function () {
  var lazyImages = document.querySelectorAll(".photo--lazy");

  if ("IntersectionObserver" in window) {
    var lazyImageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImageObserver.unobserve(lazyImage);
          lazyImage.addEventListener("load", function () {
            lazyImage.classList.add("photo--enhanced");
            setTimeout(() => {
              lazyImage.classList.remove("photo--lazy");
            }, 300);
          });
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    lazyImages.forEach(function (lazyImage) {
      lazyImage.src = lazyImage.dataset.src;
    });
  }
})();

/*
 * Gallery
 */
(function () {
  var items = document.querySelectorAll(".gallery__item");
  var container = document.querySelector(".gallery");
  var isMobile = isMobileSize();
  var current = 0;

  init();

  window.addEventListener("resize", function () {
    if (isMobile !== isMobileSize()) {
      isMobile = isMobileSize();
      init();
    }
  });

  function init() {
    if (isMobile) {
      initMobile();
    } else {
      initDesktop();
    }
  }

  function initMobile() {
    items.forEach(function (_, idx) {
      showItem(idx);
    });
    container.removeEventListener("click", nextItem);
  }

  function initDesktop() {
    items.forEach(function (_, idx) {
      hideItem(idx);
    });
    showItem(current);
    container.addEventListener("click", nextItem);
  }

  function nextItem() {
    swapCurrentItem(current < items.length - 1 ? current + 1 : 0);
  }

  function prevItem() {
    swapCurrentItem(current > 0 ? current - 1 : items.length - 1);
  }

  function swapCurrentItem(newItem) {
    hideItem(current);
    showItem(newItem);
    current = newItem;
  }

  function showItem(idx) {
    items[idx].style.display = "block";
  }

  function hideItem(idx) {
    items[idx].style.display = "none";
  }
})();

/*
 * Utils
 */
function isMobileSize() {
  return window.innerWidth < convertRemToPixels(52);
}

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
