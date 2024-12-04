// Modal Management System
const ModalSystem = {
  activeModal: null,
  modalBackdrop: null,

  init() {
    // Create backdrop element if it doesn't exist
    if (!this.modalBackdrop) {
      this.modalBackdrop = document.createElement("div");
      this.modalBackdrop.className = "modal-backdrop";
      document.body.appendChild(this.modalBackdrop);
    }

    // Add click event to backdrop
    this.modalBackdrop.addEventListener("click", (e) => {
      if (e.target === this.modalBackdrop && this.activeModal) {
        this.hideModal(this.activeModal);
      }
    });

    // Add keyboard event listener
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.activeModal) {
        this.hideModal(this.activeModal);
      }
    });

    // Initialize close buttons
    document.querySelectorAll(".modal-close").forEach((button) => {
      // Remove any existing event listeners
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);

      // Add new event listener
      newButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const modal = newButton.closest(".modal-overlay");
        if (modal) {
          this.hideModal(modal);
        }
      });
    });

    // Add click event to modal overlays for closing when clicking outside
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
      // Remove existing event listeners
      const newModal = modal.cloneNode(true);
      modal.parentNode.replaceChild(newModal, modal);

      // Add new event listener for closing when clicking outside
      newModal.addEventListener("click", (e) => {
        // Only close if clicking directly on the overlay (not its children)
        if (e.target === newModal) {
          this.hideModal(newModal);
        }
      });

      // Prevent clicks on modal container from closing
      const container = newModal.querySelector(".modal-container");
      if (container) {
        container.addEventListener("click", (e) => {
          e.stopPropagation();
        });
      }

      // Re-add form submit handlers
      const form = newModal.querySelector("form");
      if (form) {
        const formId = form.id;
        if (formId) {
          const handlerName = `handle${
            formId.charAt(0).toUpperCase() + formId.slice(1)
          }Submit`;
          if (window[handlerName]) {
            form.onsubmit = (e) => window[handlerName](e);
          }
        }
      }
    });

    // Log initialized elements
    console.log("Modal System Initialized:", {
      backdrop: this.modalBackdrop,
      closeButtons: document.querySelectorAll(".modal-close").length,
      modals: document.querySelectorAll(".modal-overlay").length,
    });
  },

  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.error(`Modal with id ${modalId} not found`);
      return;
    }

    // Hide any active modal first
    if (this.activeModal) {
      this.hideModal(this.activeModal);
    }

    // Reset modal styles
    modal.style.display = "flex";
    modal.style.opacity = "0";
    modal.style.pointerEvents = "none";
    this.modalBackdrop.style.display = "block";
    this.modalBackdrop.style.opacity = "0";

    // Force a reflow to ensure the transition works
    modal.offsetHeight;
    this.modalBackdrop.offsetHeight;

    // Add show class and update styles
    requestAnimationFrame(() => {
      modal.classList.add("show");
      modal.style.opacity = "1";
      modal.style.pointerEvents = "auto";
      this.modalBackdrop.classList.add("show");
      this.modalBackdrop.style.opacity = "1";

      // Ensure modal container is visible
      const container = modal.querySelector(".modal-container");
      if (container) {
        container.style.opacity = "1";
      }

      // Log modal state for debugging
      console.log("Modal shown:", {
        id: modalId,
        display: modal.style.display,
        opacity: modal.style.opacity,
        classList: modal.classList.toString(),
        container: container
          ? {
              opacity: container.style.opacity,
            }
          : null,
      });
    });

    this.activeModal = modal;
    document.body.style.overflow = "hidden";
  },

  hideModal(modal) {
    if (!modal) return;

    // Remove show class and update styles
    modal.classList.remove("show");
    modal.style.opacity = "0";
    modal.style.pointerEvents = "none";
    this.modalBackdrop.classList.remove("show");
    this.modalBackdrop.style.opacity = "0";

    // Hide modal container
    const container = modal.querySelector(".modal-container");
    if (container) {
      container.style.opacity = "0";
    }

    // Hide elements after animation completes
    setTimeout(() => {
      modal.style.display = "none";
      this.modalBackdrop.style.display = "none";
      document.body.style.overflow = "";
    }, 300);

    this.activeModal = null;
  },
};

// Show contact form modals
function showGeneralModal() {
  ModalSystem.showModal("generalContactModal");
}

function showPlanningModal() {
  ModalSystem.showModal("planningContactForm");
}

function showProcessAnalyticsModal() {
  ModalSystem.showModal("processAnalyticsContactForm");
}

function showClaimsModal() {
  ModalSystem.showModal("claimsContactForm");
}

function showEVMSModal() {
  ModalSystem.showModal("evmsContactForm");
}

// Form handling functions
window.handleGeneralFormSubmit = function (event) {
  event.preventDefault();
  const form = event.target;
  const successMessage = document.getElementById("generalFormSuccess");

  // Here you would typically send the form data to your server
  // For now, we'll just show the success message
  successMessage.classList.add("show");
  form.reset();

  // Hide success message after 3 seconds
  setTimeout(() => {
    successMessage.classList.remove("show");
    ModalSystem.hideModal(form.closest(".modal-overlay"));
  }, 3000);

  return false;
};

window.handlePlanningFormSubmit = function (event) {
  event.preventDefault();
  const form = event.target;
  const successMessage = document.getElementById("planningFormSuccess");

  // Here you would typically send the form data to your server
  // For now, we'll just show the success message
  successMessage.classList.add("show");
  form.reset();

  // Hide success message after 3 seconds
  setTimeout(() => {
    successMessage.classList.remove("show");
    ModalSystem.hideModal(form.closest(".modal-overlay"));
  }, 3000);

  return false;
};

window.handleProcessAnalyticsFormSubmit = function (event) {
  event.preventDefault();
  const form = event.target;
  const successMessage = document.getElementById("processAnalyticsFormSuccess");

  // Here you would typically send the form data to your server
  // For now, we'll just show the success message
  successMessage.classList.add("show");
  form.reset();

  // Hide success message after 3 seconds
  setTimeout(() => {
    successMessage.classList.remove("show");
    ModalSystem.hideModal(form.closest(".modal-overlay"));
  }, 3000);

  return false;
};

window.handleClaimsFormSubmit = function (event) {
  event.preventDefault();
  const form = event.target;
  const successMessage = document.getElementById("claimsFormSuccess");

  // Here you would typically send the form data to your server
  // For now, we'll just show the success message
  successMessage.classList.add("show");
  form.reset();

  // Hide success message after 3 seconds
  setTimeout(() => {
    successMessage.classList.remove("show");
    ModalSystem.hideModal(form.closest(".modal-overlay"));
  }, 3000);

  return false;
};

window.handleEVMSFormSubmit = function (event) {
  event.preventDefault();
  const form = event.target;
  const successMessage = document.getElementById("evmsFormSuccess");

  // Here you would typically send the form data to your server
  // For now, we'll just show the success message
  successMessage.classList.add("show");
  form.reset();

  // Hide success message after 3 seconds
  setTimeout(() => {
    successMessage.classList.remove("show");
    ModalSystem.hideModal(form.closest(".modal-overlay"));
  }, 3000);

  return false;
};

// Floating Contact Button
window.toggleContactInfo = function () {
  const contactInfo = document.getElementById("contactInfo");
  contactInfo.classList.toggle("active");
};

// Close contact info when clicking outside
document.addEventListener("click", function (event) {
  const contactInfo = document.getElementById("contactInfo");
  const floatingContact = event.target.closest(".floating-contact");

  if (!floatingContact && contactInfo.classList.contains("active")) {
    contactInfo.classList.remove("active");
  }
});

// FAQ Carousel
function initCarousel() {
  const carousels = document.querySelectorAll(".faq-section .carousel");

  carousels.forEach((carousel) => {
    const items = carousel.querySelectorAll(".carousel-item");
    const dotsContainer = carousel.querySelector(".carousel-dots");
    let currentIndex = 0;
    let interval;
    let isTransitioning = false;

    // Clear existing dots
    dotsContainer.innerHTML = "";

    // Create dots for each carousel item
    items.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("carousel-dot");
      if (index === 0) dot.classList.add("active");
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.addEventListener("click", () => !isTransitioning && goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    // Initialize first slide
    items[0].classList.add("active");

    // Set initial positions for other slides
    for (let i = 1; i < items.length; i++) {
      items[i].classList.add("next");
    }

    function updateSlidePositions() {
      items.forEach((item, index) => {
        item.classList.remove("active", "prev", "next");
        if (index === currentIndex) {
          item.classList.add("active");
        } else if (index < currentIndex) {
          item.classList.add("prev");
        } else {
          item.classList.add("next");
        }
      });
    }

    function showSlide(index) {
      if (isTransitioning) return;
      isTransitioning = true;

      // Update slide positions
      currentIndex = index;
      updateSlidePositions();

      // Update dots
      const dots = dotsContainer.querySelectorAll(".carousel-dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      // Reset transition flag after animation completes
      setTimeout(() => {
        isTransitioning = false;
      }, 500); // Match this with CSS transition duration
    }

    function goToSlide(index) {
      if (index === currentIndex) return;
      showSlide(index);
      resetInterval();
    }

    function nextSlide() {
      if (!isTransitioning) {
        goToSlide((currentIndex + 1) % items.length);
      }
    }

    function previousSlide() {
      if (!isTransitioning) {
        goToSlide((currentIndex - 1 + items.length) % items.length);
      }
    }

    function resetInterval() {
      clearInterval(interval);
      interval = setInterval(nextSlide, 5000);
    }

    // Add keyboard navigation
    carousel.setAttribute("tabindex", "0");
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        previousSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    });

    // Auto advance slides
    resetInterval();

    // Pause on hover or focus
    carousel.addEventListener("mouseenter", () => clearInterval(interval));
    carousel.addEventListener("mouseleave", resetInterval);
    carousel.addEventListener("focus", () => clearInterval(interval));
    carousel.addEventListener("blur", resetInterval);
  });
}

// Animate metric numbers
function animateMetricNumbers() {
  const metrics = document.querySelectorAll(".metric-number");

  metrics.forEach((metric) => {
    const targetValue = parseInt(metric.getAttribute("data-value"));
    const duration = 2000; // Animation duration in milliseconds
    const startTime = performance.now();
    const startValue = 0;
    const suffix = metric.textContent.replace(/[0-9]/g, ""); // Get the suffix (+ or %)

    function updateNumber(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuad = (t) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      const currentValue = Math.floor(
        startValue + (targetValue - startValue) * easedProgress
      );
      metric.textContent = currentValue.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    }

    requestAnimationFrame(updateNumber);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");
  ModalSystem.init();
  initCarousel();
  animateMetricNumbers();
});
