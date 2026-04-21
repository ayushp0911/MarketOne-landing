document.addEventListener("DOMContentLoaded", function () {

  const toggleBtn = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-list");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");
      toggleBtn.setAttribute("aria-expanded", isOpen);
    });
  }
  const form = document.querySelector("#contact-form");

  const statusMessage = document.createElement("p");
  statusMessage.style.marginTop = "10px";
  statusMessage.style.fontWeight = "bold";
  form.appendChild(statusMessage);

  const fields = {
    firstName: form.querySelector("#firstName"),
    lastName: form.querySelector("#lastName"),
    title: form.querySelector("#title"),
    email: form.querySelector("#email"),
    phone: form.querySelector("#phone"),
    options: form.querySelector("#options")
  };

  const namePattern = /^[A-Za-z]{2,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[6-9]\d{9}$/;

  Object.values(fields).forEach(field => {
    field.addEventListener("input", () => {
      field.classList.remove("error", "success");

      const value = field.value.trim();

      if (
        (field === fields.firstName ||
         field === fields.lastName ||
         field === fields.title) &&
        value && !namePattern.test(value)
      ) {
        field.classList.add("error");
      }

      if (field === fields.email && value && !emailPattern.test(value)) {
        field.classList.add("error");
      }

      if (field === fields.phone && value && !phonePattern.test(value)) {
        field.classList.add("error");
      }

      if (field === fields.options && value === "") {
        field.classList.add("error");
      }
    });
  });

  /* ===========================
     SUBMIT HANDLER
     =========================== */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    statusMessage.textContent = "";
    statusMessage.style.color = "red";

    // Clear previous states
    Object.values(fields).forEach(field =>
      field.classList.remove("error", "success")
    );

    /* ✅✅ CRITICAL FIX
       If ALL fields are empty → mark ALL red and STOP
    */
    const allEmpty = Object.values(fields).every(field =>
      field.value.trim() === ""
    );

    if (allEmpty) {
      Object.values(fields).forEach(field =>
        field.classList.add("error")
      );
      statusMessage.textContent = "Please fill out all required fields.";
      return;
    }
    let hasError = false;

    if (!namePattern.test(fields.firstName.value.trim())) {
      fields.firstName.classList.add("error");
      hasError = true;
    } else fields.firstName.classList.add("success");

    if (!namePattern.test(fields.lastName.value.trim())) {
      fields.lastName.classList.add("error");
      hasError = true;
    } else fields.lastName.classList.add("success");

    if (!namePattern.test(fields.title.value.trim())) {
      fields.title.classList.add("error");
      hasError = true;
    } else fields.title.classList.add("success");

    if (!emailPattern.test(fields.email.value.trim())) {
      fields.email.classList.add("error");
      hasError = true;
    } else fields.email.classList.add("success");

    if (!phonePattern.test(fields.phone.value.trim())) {
      fields.phone.classList.add("error");
      hasError = true;
    } else fields.phone.classList.add("success");

    if (fields.options.value === "") {
      fields.options.classList.add("error");
      hasError = true;
    } else fields.options.classList.add("success");

    if (hasError) {
      statusMessage.textContent = "Please fix the highlighted fields.";
      return;
    }

    statusMessage.style.color = "green";
    statusMessage.textContent = "Your response has been recorded successfully!";
    form.reset();

    Object.values(fields).forEach(field =>
      field.classList.remove("success")
    );
  });
});
