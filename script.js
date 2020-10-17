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
