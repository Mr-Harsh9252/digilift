

// ✅ Navigation Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const topNavbar = document.querySelector(".top-navbar");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      topNavbar && (topNavbar.style.display = "none");
      document.body.style.overflow = "hidden";
    } else {
      topNavbar && (topNavbar.style.display = "flex");
      document.body.style.overflow = "";
    }
  });
}

// Update year
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
});

const mq = window.matchMedia("(max-width: 768px)");
const coursesToggle = document.getElementById("coursesToggle");
const coursesDropdown = document.getElementById("coursesDropdown");

function isMobile() {
  return mq.matches;
}

if (coursesToggle && coursesDropdown) {
  coursesToggle.addEventListener("click", (e) => {
    if (!isMobile()) return; // Desktop uses hover
    e.preventDefault();
    const open = coursesDropdown.classList.toggle("open");
    coursesToggle.setAttribute("aria-expanded", open);
  });
}

// Close dropdown when clicking any link
document.querySelectorAll(".dropdown a").forEach((link) => {
  link.addEventListener("click", () => {
    if (isMobile()) {
      coursesDropdown.classList.remove("open");
      coursesToggle.setAttribute("aria-expanded", "false");
    }
  });
});

//student review 
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const slides = document.querySelectorAll('.slide');
  const left = document.querySelector('.arrow.left');
  const right = document.querySelector('.arrow.right');
  const dotsContainer = document.getElementById('dots');

  let current = 0, visible = getVisible(), total = Math.max(1, Math.ceil(slides.length / visible));
  let intervalId = null;

  function getVisible() {
    return window.innerWidth <= 767 ? 1 : window.innerWidth <= 991 ? 2 : 3;
  }

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const d = document.createElement('span');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.dataset.i = i;
      d.addEventListener('click', () => go(Number(d.dataset.i)));
      dotsContainer.appendChild(d);
    }
  }

  function go(i) {
    if (!slider) return;
    if (i < 0) i = 0;
    if (i >= total) i = total - 1;
    slider.style.transform = `translateX(-${i * 100}%)`;
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.dot').forEach(x => x.classList.remove('active'));
      const targetDot = dotsContainer.querySelectorAll('.dot')[i];
      if (targetDot) targetDot.classList.add('active');
    }
    current = i;
  }

  function next() { go((current + 1) % total); }
  function prev() { go((current - 1 + total) % total); }

  if (right) right.addEventListener('click', next);
  if (left) left.addEventListener('click', prev);

  function setup() {
    visible = getVisible();
    total = Math.max(1, Math.ceil(slides.length / visible));
    createDots();
    go(0);
    // restart autoplay
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(next, 4000);
  }

  // debounce resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setup, 120);
  });

  setup();
});


// ✅ FAQ Accordion
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const answer = faqItem.querySelector('.faq-answer');
  const icon = element.querySelector('.faq-icon');

  document.querySelectorAll('.faq-item').forEach(item => {
    if (item !== faqItem) {
      item.classList.remove('active');
      item.querySelector('.faq-answer').style.maxHeight = null;
      item.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
    }
  });

  if (faqItem.classList.contains('active')) {
    faqItem.classList.remove('active');
    answer.style.maxHeight = null;
    icon.style.transform = 'rotate(0deg)';
  } else {
    faqItem.classList.add('active');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    icon.style.transform = 'rotate(180deg)';
  }
}

// ✅ Only Button Controls (blogs)
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".top-grid");
  const prevBtn = document.getElementById("prevPickBtn");
  const nextBtn = document.getElementById("nextPickBtn");
  if (!container) return;

  const buttonScroll = 250; // Scroll distance per click

  // Manual Scroll - Prev
  prevBtn.addEventListener("click", () => {
    container.scrollBy({
      left: -buttonScroll,
      behavior: "smooth"
    });
  });

  // Manual Scroll - Next
  nextBtn.addEventListener("click", () => {
    container.scrollBy({
      left: buttonScroll,
      behavior: "smooth"
    });
  });
});



let isDownloadFlow = false; // track reason for opening popup

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("contactPopup");
  const closeBtn = document.getElementById("closePopup");
  const downloadBtn = document.getElementById("downloadBtn");

  // --- On Load Popup (no download)
  if (popup) {
    setTimeout(() => {
      isDownloadFlow = false; // popup reason = auto load
      popup.style.display = "flex";
      document.body.style.overflow = "hidden";
    }, 1000);
  }

  // --- When Download Brochure clicked
  downloadBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    isDownloadFlow = true; // popup reason = download
    popup.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  // --- Close button
  closeBtn?.addEventListener("click", () => {
    popup.style.display = "none";
    document.body.style.overflow = "";
  });
});
// SaveData function
function SaveData(event) {
  event.preventDefault(); // stop form default submit
  const form = document.getElementById("contact-form");
  const loadingOverlay = document.getElementById("loadingOverlay");

  if (!form.checkValidity()) {
    showAlert("errorPopup");
    return;
  }

  const formData = $(form).serialize(); // serialize form inputs

  // Show loader before request
  loadingOverlay.style.display = "flex";
  console.log(formData);
  $.ajax({
    // url: "http://erpapi.runasp.net/api/contact", // ✅ put your API endpoint
    url: "https://localhost:44372/api/Contact/SaveContactDetails", // ✅ put your API endpoint
    type: "POST",
    data: formData,
    success: function (response) {
      loadingOverlay.style.display = "none";
      if (document.getElementById("contactPopup").style.display = "block") {

        document.getElementById("contactPopup").style.display = "none";
      }
      showAlert("successPopup");
      if (typeof isDownloadFlow !== "undefined" && isDownloadFlow) {
        const link = document.createElement("a");
        link.href = "images/Digilift-brochure.pdf";
        link.download = "Digilift-Brochure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    error: function (error) {
      loadingOverlay.style.display = "none";
      alert("Something went wrong! Please try again.");
    }
  });
}

// Attach event
document.getElementById("contact-form").addEventListener("submit", SaveData);

// Show alerts
function showAlert(id) {
  document.getElementById(id).classList.add("show");
  setTimeout(() => closeAlert(id), 3000);
}

function closeAlert(id) {
  document.getElementById(id).classList.remove("show");
}

// contact form input onClick color change
const changeBorderColor = document.querySelectorAll("#txtname, #txtemail, #txtnumber, #course");
changeBorderColor.forEach(input => {
  // Jab input pe click/focus kare
  input.addEventListener("focus", () => {
    input.style.border = "1px solid red";
  });

  // Jab input ke bahar click ho (blur)
  input.addEventListener("blur", () => {
    input.style.border = "1px solid #ccc";
  });
});