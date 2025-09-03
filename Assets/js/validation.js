document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  // validate one field
  function validateField(input) {
    const wrapper = input.closest(".wrapper");
    const errorMsg = wrapper.querySelector(".error");

    if (!input.checkValidity()) {
      errorMsg.style.display = "block";  // show error
    } else {
      errorMsg.style.display = "none";   // hide error
    }
  }

  // run validation only when user leaves input (blur)
  form.querySelectorAll(".email--input").forEach(input => {
    input.addEventListener("blur", () => validateField(input));
  });

  // final check on submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll(".email--input").forEach(input => {
      validateField(input);
      if (!input.checkValidity()) valid = false;
    });

    if (valid) {
      alert("✅ Form submitted successfully!");
      form.reset();

      // clear errors after reset
      form.querySelectorAll(".error").forEach(err => (err.style.display = "none"));
    }
  });
});
