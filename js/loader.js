// Load components based on data-page attribute
document.addEventListener("DOMContentLoaded", async function () {
  const page = document.body.getAttribute("data-page");
  const rootPath = document.body.getAttribute("data-root-path") || ".";

  try {
    // Load navigation
    const navResponse = await fetch(`${rootPath}/components/navigation.html`);
    const navHtml = await navResponse.text();
    document.getElementById("navigation").innerHTML = navHtml;

    // Load breadcrumb
    const breadcrumbResponse = await fetch(
      `${rootPath}/components/breadcrumb.html`
    );
    const breadcrumbHtml = await breadcrumbResponse.text();
    document.getElementById("breadcrumb").innerHTML = breadcrumbHtml;

    // Load footer
    const footerResponse = await fetch(`${rootPath}/components/footer.html`);
    const footerHtml = await footerResponse.text();
    document.getElementById("footer").innerHTML = footerHtml;

    // Load floating contact button
    const floatingContactResponse = await fetch(
      `${rootPath}/components/floating-contact.html`
    );
    const floatingContactHtml = await floatingContactResponse.text();
    document.getElementById("floatingContact").innerHTML = floatingContactHtml;

    // Load general contact form modal
    const generalFormResponse = await fetch(
      `${rootPath}/components/contact-forms/general-form.html`
    );
    const generalFormHtml = await generalFormResponse.text();
    let generalContactForm = document.getElementById("generalContactModal");
    if (!generalContactForm) {
      generalContactForm = document.createElement("div");
      generalContactForm.id = "generalContactModal";
      document.body.appendChild(generalContactForm);
    }
    generalContactForm.outerHTML = generalFormHtml;

    // Load page-specific contact form
    if (page) {
      let formPath;
      let formId;

      switch (page) {
        case "planning":
          formPath = "components/contact-forms/planning-scheduling-form.html";
          formId = "planningContactForm";
          break;
        case "processAnalytics":
          formPath = "components/contact-forms/process-analytics-form.html";
          formId = "processAnalyticsContactForm";
          break;
        case "claims":
          formPath = "components/contact-forms/claims-form.html";
          formId = "claimsContactForm";
          break;
        case "evms":
          formPath = "components/contact-forms/evms-form.html";
          formId = "evmsContactForm";
          break;
      }

      if (formPath && formId) {
        const formResponse = await fetch(`${rootPath}/${formPath}`);
        const formHtml = await formResponse.text();
        const formContainer = document.getElementById(formId);
        if (formContainer) {
          formContainer.outerHTML = formHtml;
        }
      }
    }

    // Update breadcrumb based on page
    const currentPage = document.getElementById("currentPage");
    if (currentPage) {
      const pageTitle = document.title.split("|")[0].trim();
      currentPage.textContent = pageTitle;
    }

    // Initialize modal system after all content is loaded
    if (window.ModalSystem) {
      // Re-initialize modal system to bind new event handlers
      window.ModalSystem.init();

      // Log loaded modals for debugging
      console.log("Loaded modals:", {
        general: document.getElementById("generalContactModal"),
        planning: document.getElementById("planningContactForm"),
        processAnalytics: document.getElementById(
          "processAnalyticsContactForm"
        ),
        claims: document.getElementById("claimsContactForm"),
        evms: document.getElementById("evmsContactForm"),
      });
    }

    // Add click event to modal overlays for closing when clicking outside
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        // Only close if clicking directly on the overlay (not its children)
        if (e.target === modal && window.ModalSystem) {
          window.ModalSystem.hideModal(modal);
        }
      });

      // Prevent clicks on modal container from closing
      const container = modal.querySelector(".modal-container");
      if (container) {
        container.addEventListener("click", (e) => {
          e.stopPropagation();
        });
      }
    });
  } catch (error) {
    console.error("Error loading components:", error);
  }
});
