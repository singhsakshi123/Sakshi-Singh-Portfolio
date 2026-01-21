'use strict';

// element toggle function
const elementToggleFunc = function (elem) {
  if (!elem) return;
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

/* =========================
   TESTIMONIALS (OPTIONAL)
   ========================= */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (!modalContainer || !overlay) return;
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

if (testimonialsItem.length && modalContainer && overlay && modalCloseBtn && modalImg && modalTitle && modalText) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      if (!avatar || !title || !text) return;

      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
      modalTitle.innerHTML = title.innerHTML;
      modalText.innerHTML = text.innerHTML;

      testimonialsModalFunc();
    });
  }

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

/* =========================
   FILTER UI (OPTIONAL)
   ========================= */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  const selected = (selectedValue || "").toLowerCase();

  for (let i = 0; i < filterItems.length; i++) {
    const cat = (filterItems[i].dataset.category || "").toLowerCase();

    if (selected === "all" || selected === cat) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

if (select && selectItems.length && selectValue) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

if (filterBtn.length && selectValue) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

/* =========================
   CONTACT FORM (OPTIONAL)
   ========================= */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs.length && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

/* =========================
   PAGE NAVIGATION
   ========================= */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length && pages.length) {
  for (let n = 0; n < navigationLinks.length; n++) {
    navigationLinks[n].addEventListener("click", function () {
      const target = (this.innerText || "").trim().toLowerCase();

      for (let p = 0; p < pages.length; p++) {
        const pageName = (pages[p].dataset.page || "").toLowerCase();

        if (target === pageName) {
          pages[p].classList.add("active");
          navigationLinks[n].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[p].classList.remove("active");
          // IMPORTANT: only remove active from the matching nav index, not page index
          // so we clear all first
        }
      }

      for (let k = 0; k < navigationLinks.length; k++) {
        if (k !== n) navigationLinks[k].classList.remove("active");
      }
    });
  }
}
