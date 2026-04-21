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

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    statusMessage.textContent = "";
    statusMessage.style.color = "red";

    Object.values(fields).forEach(field =>
      field.classList.remove("error", "success")
    );

    const allEmpty = Object.values(fields).every(field =>
      field.value.trim() === ""
    );

    if (allEmpty) {
      Object.values(fields).forEach(field => field.classList.add("error"));
      statusMessage.textContent = "Please fill out all required fields.";
      return;
    }

    let errorCount = 0;
    let firstErrorMessage = "";

    if (!namePattern.test(fields.firstName.value.trim())) {
      fields.firstName.classList.add("error");
      errorCount++;
      firstErrorMessage ||= "Enter a valid first name.";
    } else fields.firstName.classList.add("success");

    if (!namePattern.test(fields.lastName.value.trim())) {
      fields.lastName.classList.add("error");
      errorCount++;
      firstErrorMessage ||= "Enter a valid last name.";
    } else fields.lastName.classList.add("success");

    if (!namePattern.test(fields.title.value.trim())) {
      fields.title.classList.add("error");
      errorCount++;
      firstErrorMessage ||= "Enter a valid title.";
    } else fields.title.classList.add("success");

    if (!emailPattern.test(fields.email.value.trim())) {
      fields.email.classList.add("error");
      errorCount++;
      firstErrorMessage ||= "Enter a valid email.";
    } else fields.email.classList.add("success");

    if (!phonePattern.test(fields.phone.value.trim())) {
      fields.phone.classList.add("error");
      errorCount++;
      firstErrorMessage ||= "Enter a valid 10-digit phone number.";
    } else fields.phone.classList.add("success");

    if (fields.options.value === "") {
      fields.options.classList.add("error");
      errorCount++;
      firstErrorMessage ||= "Please select an option.";
    } else fields.options.classList.add("success");

    if (errorCount > 0) {
      statusMessage.textContent =
        errorCount === 1
          ? firstErrorMessage
          : "Please fill the highlighted fields.";
      return;
    }

    statusMessage.style.color = "green";
    statusMessage.textContent =
      "Your response has been recorded successfully!";

    form.reset();

    Object.values(fields).forEach(field =>
      field.classList.remove("success")
    );
  });
});
