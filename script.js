  document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contact form");
  const statusMessage = document.createElement("p");
  statusMessage.style.marginTop = "10px";
  statusMessage.style.fontWeight = "bold";
  form.appendChild(statusMessage);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const requiredFields = form.querySelectorAll("[required]");
    let allFilled = true;

    statusMessage.style.color = "green";
    statusMessage.textContent = "Your response has been recorded.";
    form.reset();
  });
});
