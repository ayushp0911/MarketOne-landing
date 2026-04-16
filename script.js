document.addEventListener("DOMContentLoaded", function () {

  const toggleBtn = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-list");

  toggleBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    toggleBtn.setAttribute("aria-expanded", isOpen);
  });

  const form = document.querySelector("#contact-form");
  const statusMessage = document.createElement("p");

  statusMessage.style.marginTop = "10px";
  statusMessage.style.fontWeight = "bold";
  form.appendChild(statusMessage);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    statusMessage.textContent = "";
    statusMessage.style.color = "red";

    const fields = {
      firstName: form.querySelector("#firstName"),
      lastName: form.querySelector("#lastName"),
      title: form.querySelector("#title"),
      email: form.querySelector("#email"),
      phone: form.querySelector("#phone"),
      options: form.querySelector("#options")
    };

    Object.values(fields).forEach(field => field.classList.remove("error", "success"));

    const namePattern = /^[A-Za-z]{2,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;

    
    if (!namePattern.test(fields.firstName.value.trim())) {
      fields.firstName.classList.add("error");
      statusMessage.textContent = "Enter a valid first name.";
      return;
    } else fields.firstName.classList.add("success");

    if (!namePattern.test(fields.lastName.value.trim())) {
      fields.lastName.classList.add("error");
      statusMessage.textContent = "Enter a valid last name.";
      return;
    } else fields.lastName.classList.add("success");

    if (!namePattern.test(fields.title.value.trim())) {
      fields.title.classList.add("error");
      statusMessage.textContent = "Enter a valid title.";
      return;
    } else fields.title.classList.add("success");

    if (!emailPattern.test(fields.email.value.trim())) {
      fields.email.classList.add("error");
      statusMessage.textContent = "Enter a valid email.";
      return;
    } else fields.email.classList.add("success");

    if (!phonePattern.test(fields.phone.value.trim())) {
      fields.phone.classList.add("error");
      statusMessage.textContent = "Enter a valid 10-digit phone number.";
      return;
    } else fields.phone.classList.add("success");

    if (fields.options.value === "") {
      fields.options.classList.add("error");
      statusMessage.textContent = "Please select an option.";
      return;
    } else fields.options.classList.add("success");

    
    statusMessage.style.color = "green";
    statusMessage.textContent = "Your response has been recorded successfully!";
    form.reset();

    Object.values(fields).forEach(field => field.classList.remove("success"));
  });
});
