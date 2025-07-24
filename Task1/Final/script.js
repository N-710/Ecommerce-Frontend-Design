document.addEventListener("DOMContentLoaded", function () {
  // Toggle filter dropdown sections
  document.querySelectorAll('.filter-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });
  });



  //  Range slider update
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

   // Custom Dropdowns (like "Featured")
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

  // ✅General dropdown toggle (e.g., Show 10 dropdowns)
  document.querySelectorAll('[data-toggle]').forEach(button => {
    button.addEventListener('click', e => {
      e.stopPropagation();
      const dropdownMenu = button.nextElementSibling;
      if (!dropdownMenu) return;

      document.querySelectorAll('.show').forEach(el => {
        if (el !== dropdownMenu) el.classList.remove('show');
      });

      dropdownMenu.classList.toggle('show');
    });
  });

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


  const filterTagsContainer = document.querySelector(".filter-tags");
const clearBtn = document.querySelector(".clear-filters");
const checkboxes = document.querySelectorAll(".sidebar input[type='checkbox']");

if (filterTagsContainer && checkboxes.length > 0) {
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const label = checkbox.parentElement.textContent.trim();
      const existingTag = filterTagsContainer.querySelector(`.filter-tag[data-value="${label}"]`);

      if (checkbox.checked && !existingTag) {
     
        const tag = document.createElement("span");
        tag.className = "filter-tag";
        tag.setAttribute("data-value", label);
        tag.innerHTML = `${label} <span class="remove-tag">×</span>`;
        filterTagsContainer.appendChild(tag);

       
        tag.querySelector(".remove-tag").addEventListener("click", () => {
          checkbox.checked = false;
          tag.remove();
        });
      }

      if (!checkbox.checked && existingTag) {
        existingTag.remove();
      }
    });
  });
}


const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", function () {
    const targetId = tab.getAttribute("data-tab");

    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(targetId).classList.add("active");
  });
});


const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumbnail");

if (mainImage) {
  const originalSrc = mainImage.src;

  thumbnails.forEach(thumb => {
    thumb.addEventListener("click", () => {
      mainImage.src = thumb.src;
    });
  });
}




// Reset to original image on refresh
window.addEventListener("beforeunload", () => {
  const mainImage = document.getElementById("mainImage");
  if (mainImage) {
    mainImage.src = originalSrc;
  }
});


});

document.addEventListener("DOMContentLoaded", function () {
  const backBtn = document.querySelector(".back-btn");

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Select all "Remove" buttons
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", function () {
     
      const cartItem = button.closest(".cart-item");
      if (cartItem) {
        cartItem.remove();
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const savedGrid = document.querySelector(".saved-grid");

  document.querySelectorAll(".save-btn").forEach(button => {
    button.addEventListener("click", function () {
      const cartItem = button.closest(".cart-item");
      if (!cartItem || !savedGrid) return;

     
      const productImg = cartItem.querySelector(".cart-img").getAttribute("src");
      const productName = cartItem.querySelector(".product-name").innerText;
      const productPrice = cartItem.querySelector(".item-price").innerText;

      // Create a new saved-card element
      const savedCard = document.createElement("div");
      savedCard.classList.add("saved-card");

      savedCard.innerHTML = `
        <div class="saved-img">
          <img src="${productImg}" alt="Product">
        </div>
        <div class="saved-price">${productPrice}</div>
        <div class="saved-name">${productName}</div>
        <button class="move-cart-btn">
          <img src="assets/images/shop2.png" class="cart-icon"> Move to cart
        </button>
      `;

      // Append the saved card to the saved grid
      savedGrid.appendChild(savedCard);

      // Remove the original cart item
      const hr = cartItem.nextElementSibling;
      cartItem.remove();
      if (hr && hr.classList.contains("line")) hr.remove();
    });
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const removeAllBtn = document.querySelector(".remove-all-btn");
  const cartItemsContainer = document.querySelector(".cart-left");

  if (removeAllBtn && cartItemsContainer) {
    removeAllBtn.addEventListener("click", () => {
      
      cartItemsContainer.querySelectorAll(".cart-item").forEach(item => item.remove());
      
    
      cartItemsContainer.querySelectorAll("hr.line").forEach(line => line.remove());
    });
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const moveButtons = document.querySelectorAll(".move-cart-btn");

  moveButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const savedCard = btn.closest(".saved-card");

      const imgSrc = savedCard.querySelector("img").getAttribute("src");
      const productName = savedCard.querySelector(".saved-name").innerText;
      const productPrice = savedCard.querySelector(".saved-price").innerText;

      // Create new cart item
      const newItem = document.createElement("div");
      newItem.className = "cart-item";
      newItem.innerHTML = `
        <div class="cart-item-left">
          <img src="${imgSrc}" class="cart-img" alt="Product" />
          <div class="cart-details">
            <div class="product-name">${productName}</div>
            <div class="seller-name">Sold by: Guanjoi Trading LLC</div>
            <div class="item-actions">
              <button class="btn remove-btn">Remove</button>
              <button class="btn save-btn">Save for later</button>
            </div>
          </div>
        </div>
        <div class="cart-item-right">
          <div class="item-price">${productPrice}</div>
          <div class="qty-pill">
            <span class="label">Qty:</span>
            <select>
              ${[...Array(9).keys()].map(i => `<option ${i === 0 ? 'selected' : ''}>${i+1}</option>`).join('')}
            </select>
          </div>
        </div>
      `;

      const cartContainer = document.getElementById("cartItemsContainer");
      const footer = cartContainer.querySelector(".cart-footer");

      const hr = document.createElement("hr");
      hr.className = "line";

      cartContainer.insertBefore(newItem, footer);
      cartContainer.insertBefore(hr, footer);

      savedCard.remove();
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  //  Handle Send Inquiry Button 
const inquiryBtn = document.getElementById("inquiryBtn");
if (inquiryBtn) {
  inquiryBtn.addEventListener("click", function (e) {
    const itemInput = document.querySelector(".quote-form input[type='text']");
    const detailsTextarea = document.querySelector(".quote-form textarea");
    const quantityInput = document.querySelector(".quote-form input[type='number']");
    
    if (
      itemInput && itemInput.value.trim() !== "" &&
      detailsTextarea && detailsTextarea.value.trim() !== "" &&
      quantityInput && quantityInput.value.trim() !== ""
    ) {
      alert("Your inquiry has been sent!");
    } else {
      alert("Please fill out all fields first.");
    }
  });
}

// Handle Subscribe Button — Only if Email is Entered
const subscribeBtn = document.getElementById("subscribeBtn");
if (subscribeBtn) {
  subscribeBtn.addEventListener("click", function () {
    const emailInput = document.querySelector(".subscribe-form input[type='email']");
    if (emailInput && emailInput.value.trim() !== "") {
      alert("You have subscribed successfully!");
    } else {
      alert("Please enter your Email!");
    }
  });
}



const filterHeaders = document.querySelectorAll(".filter-header");

  filterHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;

      // Toggle visibility
      if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        header.querySelector("img").src = "assets/images/dropup.png";
      } else {
        content.style.display = "none";
        header.querySelector("img").src = "assets/images/dropdown.png"; 
      }
    });
  });





  document.addEventListener("DOMContentLoaded", function () {
  const brandCheckboxes = document.querySelectorAll(".brand-checkbox");
  const featureCheckboxes = document.querySelectorAll(".feature-checkbox");
  const ratingCheckboxes = document.querySelectorAll(".rating-checkbox");
  const conditionRadios = document.querySelectorAll("input[name='condition']");
  const productCards = document.querySelectorAll(".product-card");
  const minPriceInput = document.getElementById("min-input");
  const maxPriceInput = document.getElementById("max-input");
  const applyBtn = document.getElementById("applyPriceBtn");
  const clearBtn = document.getElementById("clearFiltersBtn");
  const filterTagsContainer = document.getElementById("filter-tags");

  function filterProducts() {
  
    if (!minPriceInput || !maxPriceInput || !productCards) {
      console.warn("Price input or product cards missing");
      return;
    }

    const selectedBrands = [...brandCheckboxes].filter(cb => cb.checked).map(cb => cb.value);
    const selectedFeatures = [...featureCheckboxes].filter(cb => cb.checked).map(cb => cb.value);
    const selectedRatings = [...ratingCheckboxes].filter(cb => cb.checked).map(cb => cb.value);
    const selectedCondition = [...conditionRadios].find(rb => rb.checked)?.value || "Any";

    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    productCards.forEach(card => {
      const brand = card.dataset.brand;
      const price = parseFloat(card.dataset.price);
      const features = card.dataset.features;
      const rating = card.dataset.rating;
      const condition = card.dataset.condition;

      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
      const matchesFeature = selectedFeatures.length === 0 || selectedFeatures.some(f => features.includes(f));
      const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(rating);
      const matchesCondition = selectedCondition === "Any" || selectedCondition === condition;
      const matchesPrice = price >= minPrice && price <= maxPrice;

      if (matchesBrand && matchesFeature && matchesRating && matchesCondition && matchesPrice) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  // ✅Hook filter events
  [...brandCheckboxes, ...featureCheckboxes, ...ratingCheckboxes, ...conditionRadios].forEach(input => {
    input.addEventListener("change", filterProducts);
  });

  if (applyBtn) {
    applyBtn.addEventListener("click", filterProducts);
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      [...brandCheckboxes, ...featureCheckboxes, ...ratingCheckboxes].forEach(cb => cb.checked = false);
      [...conditionRadios].forEach(rb => rb.checked = false);
      if (minPriceInput) minPriceInput.value = "";
      if (maxPriceInput) maxPriceInput.value = "";
      if (filterTagsContainer) filterTagsContainer.innerHTML = "";
      filterProducts(); // re-filter after clearing
    });
  }

  filterProducts();
});



  productCards.forEach(card => {
  card.style.display = "flex"; 
});


const rangeMin = document.getElementById("range-min");
const rangeMax = document.getElementById("range-max");
const fill = document.getElementById("range-fill");
const minInput = document.getElementById("min-input");
const maxInput = document.getElementById("max-input");

function updateFill() {
  const minVal = parseInt(rangeMin.value);
  const maxVal = parseInt(rangeMax.value);
  const minRange = parseInt(rangeMin.min);
  const maxRange = parseInt(rangeMin.max);

  // Clamp values to avoid overlap issues
  if (minVal > maxVal) rangeMin.value = maxVal;
  if (maxVal < minVal) rangeMax.value = minVal;

  const percent1 = ((rangeMin.value - minRange) / (maxRange - minRange)) * 100;
  const percent2 = ((rangeMax.value - minRange) / (maxRange - minRange)) * 100;

  fill.style.left = percent1 + "%";
  fill.style.width = (percent2 - percent1) + "%";

  minInput.value = rangeMin.value;
  maxInput.value = rangeMax.value;
}

if (rangeMin && rangeMax && fill && minInput && maxInput) {
  rangeMin.addEventListener("input", updateFill);
  rangeMax.addEventListener("input", updateFill);

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
});

document.addEventListener("DOMContentLoaded", function () {
  const categoryItems = document.querySelectorAll(".category-filter li");
  const productCards = document.querySelectorAll(".product-card-list, .p-card");

  if (categoryItems.length && productCards.length) {
    categoryItems.forEach(item => {
      item.addEventListener("click", () => {
        const selectedCategory = item.dataset.category;

        // Highlight the selected category
        categoryItems.forEach(el => el.classList.remove("active-category"));
        item.classList.add("active-category");

        productCards.forEach(card => {
          const cardCategories = card.dataset.category
            .split(",")
            .map(cat => cat.trim());

          if (!selectedCategory || cardCategories.includes(selectedCategory)) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }
});


const verifiedCheckbox = document.getElementById("verifiedOnly");
const productCards = document.querySelectorAll(".product-card-list, .p-card");

if (verifiedCheckbox && productCards.length > 0) {
  verifiedCheckbox.addEventListener("change", function () {
    const onlyShowVerified = verifiedCheckbox.checked;

    productCards.forEach(card => {
      const isVerified = card.dataset.verified === "true";
      card.style.display = (!onlyShowVerified || isVerified) ? "flex" : "none";
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const sortOptions = document.querySelectorAll("#sortOptions li");
  const productContainer =
  document.querySelector(".product-list-view") ||
  document.querySelector(".product-grid-three");
const productCards = document.querySelectorAll(".product-card-list, .p-card");

  if (!productContainer || productCards.length === 0) {
    console.warn("Product container or cards not found");
    return;
  }

  sortOptions.forEach(option => {
    option.addEventListener("click", () => {
      const sortType = option.dataset.sort;

      sortOptions.forEach(opt => opt.classList.remove("active"));
      option.classList.add("active");

      let sorted = [...productCards];

      // Sorting Logic
      if (sortType === "low-high") {
        sorted.sort((a, b) => +a.dataset.price - +b.dataset.price);
      } else if (sortType === "high-low") {
        sorted.sort((a, b) => +b.dataset.price - +a.dataset.price);
      } else if (sortType === "newest") {
        sorted.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
      } else if (sortType === "featured") {
        sorted.sort((a, b) => {
          const aFeat = a.dataset.featured === "true" ? 1 : 0;
          const bFeat = b.dataset.featured === "true" ? 1 : 0;
          return bFeat - aFeat;
        });
      }

      productContainer.innerHTML = "";
      sorted.forEach(card => productContainer.appendChild(card));
    });
  });

  const selectedDisplay = document.querySelector("#sortDropdown .dropdown-selected");

sortOptions.forEach(option => {
  option.addEventListener("click", () => {
    const sortType = option.dataset.sort;

    if (selectedDisplay) {
      selectedDisplay.childNodes[0].nodeValue = option.textContent.trim();
    }

  });
});

});


document.addEventListener("DOMContentLoaded", function () {
  // Toggle dropdowns
  document.querySelectorAll(".filter-header").forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      content.style.display = content.style.display === "none" ? "block" : "none";
    });
  });
  // SAVE FOR LATER BUTTON IN PRODUCTS Page
document.querySelectorAll('.fav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert("Item has been saved for later!");
  });
});


  //  SAVE FOR LATER BUTTON IN PRODUCTSDetails Page
document.querySelectorAll('.save-icon').forEach(btn => {
  btn.addEventListener('click', () => {
    alert("Item has been saved for later!");
  });
});

});

document.querySelectorAll('.filter-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const allProducts = document.querySelectorAll(".p-card");

  const filterHeaders = document.querySelectorAll(".filter-header, details summary");
  filterHeaders.forEach(header => {
    header.addEventListener("click", function () {
      const next = header.nextElementSibling;
      if (next && next.classList.contains("filter-content")) {
        next.style.display = next.style.display === "none" ? "block" : "none";
      }
    });
  });

  // Apply filters
  const categoryItems = document.querySelectorAll(".category-filter li");
  const brandCheckboxes = document.querySelectorAll(".brand-filter");
  const featureCheckboxes = document.querySelectorAll(".feature-filter");
  const ratingCheckboxes = document.querySelectorAll(".rating-filter");
  const verifiedOnlyCheckbox = document.getElementById("verifiedOnly");
  const conditionRadios = document.querySelectorAll("input[name='condition']");

  // Helper to get selected values 
  function getSelectedValues(nodeList) {
    return Array.from(nodeList)
      .filter(checkbox => checkbox.checked)
      .map(cb => cb.value);
  }

  // Helper to get selected condition
  function getSelectedCondition() {
    const selected = Array.from(conditionRadios).find(rb => rb.checked);
    return selected ? selected.value : "Any";
  }

  // Filter function
  function applyFilters() {
    const selectedCategory = document.querySelector(".category-filter li.active-category")?.dataset.category || null;
    const selectedBrands = getSelectedValues(brandCheckboxes);
    const selectedFeatures = getSelectedValues(featureCheckboxes);
    const selectedRatings = getSelectedValues(ratingCheckboxes);
    const selectedCondition = getSelectedCondition();
    const verifiedOnly = verifiedOnlyCheckbox.checked;

    allProducts.forEach(card => {
      let show = true;

      const cardCategory = card.dataset.category?.toLowerCase() || "";
      const cardBrand = card.dataset.brand || "";
      const cardFeature = card.dataset.features || "";
      const cardRating = card.dataset.rating || "";
      const cardCondition = card.dataset.condition || "";
      const cardVerified = card.dataset.verified === "true";

      // Category match
      if (selectedCategory && !cardCategory.includes(selectedCategory.toLowerCase())) {
        show = false;
      }

      // Brand match
      if (selectedBrands.length && !selectedBrands.includes(cardBrand)) {
        show = false;
      }

      // Feature match
      if (selectedFeatures.length && !selectedFeatures.includes(cardFeature)) {
        show = false;
      }

      // Rating match
      if (selectedRatings.length && !selectedRatings.includes(cardRating)) {
        show = false;
      }

      // Condition match
      if (selectedCondition !== "Any" && cardCondition !== selectedCondition) {
        show = false;
      }

      // Verified-only match
      if (verifiedOnly && !cardVerified) {
        show = false;
      }

      // Final toggle
      card.style.display = show ? "block" : "none";
    });
  }

  // Category click filter
  categoryItems.forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".category-filter li").forEach(li => li.classList.remove("active-category"));
      item.classList.add("active-category");
      applyFilters();
    });
  });

  // Checkbox filters
  brandCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  featureCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  ratingCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
const verifiedCheckbox = document.getElementById("verifiedOnly");
const productCards = document.querySelectorAll(".product-card-list, .p-card");

if (verifiedCheckbox && productCards.length > 0) {
  verifiedCheckbox.addEventListener("change", function () {
    const onlyShowVerified = verifiedCheckbox.checked;

    productCards.forEach(card => {
      const isVerified = card.dataset.verified === "true";
      card.style.display = (!onlyShowVerified || isVerified) ? "flex" : "none";
    });
  });
}

  conditionRadios.forEach(rb => rb.addEventListener("change", applyFilters));
});


document.addEventListener("DOMContentLoaded", function () {
  const icons = document.querySelectorAll(".p-icon");

  icons.forEach(icon => {
    icon.addEventListener("click", function () {
      const type = icon.dataset.type;
      const productName = icon.closest(".p-actions")?.dataset.product || "This item";

      if (type === "wishlist") {
        alert(`✅ "${productName}" has been saved for Later.`);
      } 
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".move-cart-btn").forEach(button => {
    button.addEventListener("click", function () {
      const savedCard = this.closest(".saved-card");

      if (!savedCard) return;

      const imgSrc = savedCard.querySelector("img").src;
      const name = savedCard.querySelector(".saved-name").textContent;
      const price = savedCard.querySelector(".saved-price").textContent;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
        <div class="cart-item-left">
          <img src="${imgSrc}" alt="Product" class="cart-img">
          <div class="cart-details">
            <div class="product-name">${name}</div>
            <div class="product-features">
              <span>Color: Black,</span>
              <span>Size: 7inches,</span>
              <span>Material: Foldable Glass</span>
            </div>
            <div class="seller-name">Sold by: Guanjoi Trading LLC</div>
            <div class="item-actions">
              <button class="btn remove-btn">Remove</button>
              <button class="btn save-btn">Save for later</button>
            </div>
          </div>
        </div>
        <div class="cart-item-right">
          <div class="item-price">${price}</div>
          <div class="qty-pill">
            <span class="label">Qty:</span>
            <select>
              ${[...Array(9)].map((_, i) => `<option ${i === 0 ? "selected" : ""}>${i + 1}</option>`).join("")}
            </select>
          </div>
        </div>
      `;

      // Horizontal line
      const hr = document.createElement("hr");
      hr.classList.add("line");
      const cartContainer = document.querySelector("#cartItemsContainer");
      const cartFooter = document.querySelector(".cart-footer");
      if (cartContainer && cartFooter) {
        cartContainer.insertBefore(cartItem, cartFooter);
        cartContainer.insertBefore(hr, cartFooter);
      }
      savedCard.remove();
    });
  });
});


document.querySelectorAll('[data-type="cart"]').forEach(btn => {
  btn.addEventListener('click', function () {
    const productCard = btn.closest('.p-card'); 

    const product = {
      name: productCard.dataset.name,
      img: productCard.dataset.img,
      price: productCard.dataset.price,
      features: productCard.dataset.features.split(','),
      seller: productCard.dataset.seller
    };

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    alert("Item added to cart!");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cartIcons = document.querySelectorAll(".p-icon[data-type='cart']");
  const cartItemsContainer = document.getElementById("cartItemsContainer");

  const addedProductNames = new Set();

  cartIcons.forEach(icon => {
    icon.addEventListener("click", function () {
      const productCard = icon.closest(".p-card");

      const name = productCard.querySelector(".p-name")?.textContent.trim();
      if (addedProductNames.has(name)) {
        alert("This product is already in the cart!");
        return;
      }

      const imageSrc = productCard.querySelector(".p-img")?.getAttribute("src") || "assets/images/default.png";
      const price = productCard.querySelector(".p-price")?.textContent.trim();
      const oldPrice = productCard.querySelector(".p-old")?.textContent.trim() || "";
      const starsHTML = productCard.querySelector(".p-stars")?.innerHTML || "";
      const rating = productCard.querySelector(".rating")?.textContent.trim() || "";

     
      const cartItem = document.createElement("div");
      cartItem.classList.add("p-card");

      cartItem.innerHTML = `
        <div class="product-card">
          <img src="${imageSrc}" />
          <div class="product-name">${name}</div>
          <div class="product-price">${price}</div>
        </div>

        <img src="${imageSrc}" alt="Product" class="p-img">
        <hr class="p-divider">

        <div class="p-info">
          <div class="p-meta">
            <div class="p-price">${price} <span class="p-old">${oldPrice}</span></div>
            <div class="p-stars">${starsHTML}</div>
            <div class="p-name">${name}</div>
          </div>
        </div>
      `;

      cartItemsContainer.appendChild(cartItem);
      addedProductNames.add(name); 
    });
  });
});



  document.addEventListener("DOMContentLoaded", function () {
    // Inquiry Popup
    const inquiryPopup = document.getElementById("inquiry-popup");
    const openInquiryBtn = document.querySelector(".inquiry-btn");
    const closeInquiryBtn = document.getElementById("close-popup");
    const inquiryForm = document.getElementById("inquiry-form");

    openInquiryBtn.addEventListener("click", () => {
      inquiryPopup.style.display = "flex";
    });

    closeInquiryBtn.addEventListener("click", () => {
      inquiryPopup.style.display = "none";
    });

    inquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Inquiry submitted successfully!");
      inquiryForm.reset();
      inquiryPopup.style.display = "none";
    });

    // Seller Profile Popup
    const profilePopup = document.getElementById("profile-popup");
    const openProfileBtn = document.querySelector(".profile-btn");
    const closeProfileBtn = document.getElementById("close-profile-popup");

    openProfileBtn.addEventListener("click", () => {
      profilePopup.style.display = "flex";
    });

    closeProfileBtn.addEventListener("click", () => {
      profilePopup.style.display = "none";
    });
  });


  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", function () {
      const query = searchInput.value.toLowerCase().trim();
      const cards = document.querySelectorAll(".p-card");

      cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        if (name.includes(query)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });


    searchInput.addEventListener("input", function () {
      if (searchInput.value.trim() === "") {
        document.querySelectorAll(".p-card").forEach(card => {
          card.style.display = "block";
        });
      }
    });
  });

