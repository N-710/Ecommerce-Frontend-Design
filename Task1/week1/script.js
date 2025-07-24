document.addEventListener("DOMContentLoaded", function () {
  // ✅ Toggle filter dropdown sections
  document.querySelectorAll('.filter-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });
  });

  // ✅ Range slider update
  const rangeMin = document.getElementById("range-min");
  const rangeMax = document.getElementById("range-max");
  const fill = document.getElementById("range-fill");
  const minInput = document.getElementById("min-input");
  const maxInput = document.getElementById("max-input");

  function updateFill() {
    const min = parseInt(rangeMin.value);
    const max = parseInt(rangeMax.value);
    const percent1 = (min / 500) * 100;
    const percent2 = (max / 500) * 100;

    fill.style.left = percent1 + "%";
    fill.style.width = (percent2 - percent1) + "%";

    minInput.value = min;
    maxInput.value = max;
  }

  if (rangeMin && rangeMax && fill && minInput && maxInput) {
    rangeMin.addEventListener("input", () => {
      if (+rangeMin.value > +rangeMax.value) {
        rangeMin.value = rangeMax.value;
      }
      updateFill();
    });

    rangeMax.addEventListener("input", () => {
      if (+rangeMax.value < +rangeMin.value) {
        rangeMax.value = rangeMin.value;
      }
      updateFill();
    });

    minInput.addEventListener("input", () => {
      rangeMin.value = minInput.value;
      updateFill();
    });

    maxInput.addEventListener("input", () => {
      rangeMax.value = maxInput.value;
      updateFill();
    });

    updateFill();
  }

  // ✅ Custom Dropdowns (like "Featured")
  document.querySelectorAll('.custom-dropdown').forEach(drop => {
    const trigger = drop.querySelector('.dropdown-selected');
    const menu = drop.querySelector('.dropdown-list');

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.toggle('show');
    });

    document.addEventListener('click', function (e) {
      if (!drop.contains(e.target)) {
        menu.classList.remove('show');
      }
    });
  });

  // ✅ General dropdown toggle (e.g., Show 10 dropdowns)
  document.querySelectorAll('[data-toggle]').forEach(button => {
    button.addEventListener('click', e => {
      e.stopPropagation();
      const dropdownMenu = button.nextElementSibling;
      if (!dropdownMenu) return;

      // Close all open dropdowns
      document.querySelectorAll('.show').forEach(el => {
        if (el !== dropdownMenu) el.classList.remove('show');
      });

      dropdownMenu.classList.toggle('show');
    });
  });

  // ✅ Close all on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.show').forEach(el => el.classList.remove('show'));
  });


   document.querySelectorAll('.custom-dropdown').forEach(drop => {
    const trigger = drop.querySelector('.dropdown-selected');
    const menu = drop.querySelector('.dropdown-list');

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.toggle('show');
    });

    document.addEventListener('click', function (e) {
      if (!drop.contains(e.target)) {
        menu.classList.remove('show');
      }
    });
  });

});

