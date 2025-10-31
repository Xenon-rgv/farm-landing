

    const dropdownBtn = document.getElementById("dropdownBtn");
    const dropdownContent = document.getElementById("dropdownContent");
    const dropdownIcon = document.getElementById("dropdownIcon");

    dropdownBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdownContent.classList.toggle("hidden");

      if (dropdownContent.classList.contains("hidden")) {
        dropdownIcon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      } else {
        dropdownIcon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
      }
    });

    document.addEventListener("click", function (event) {
      const isClickInside =
        dropdownBtn.contains(event.target) ||
        dropdownContent.contains(event.target);

      if (!isClickInside && !dropdownContent.classList.contains("hidden")) {
        dropdownContent.classList.add("hidden");
        dropdownIcon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      }
    });



    function scrollProducts() {
      const container = document.getElementById("productContainer");
      container.scrollBy({
        left: 300,
        behavior: "smooth"
      });
    }

     function scrollSeasonProducts() {
      const container = document.getElementById("seasonProductContainer");
      container.scrollBy({
        left: 300,
        behavior: "smooth"
      });
    }

      function prebookProducta() {
      const container = document.getElementById("prebookContainer");
      container.scrollBy({
        left: 300,
        behavior: "smooth"
      });
    }