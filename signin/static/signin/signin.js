function togglePasswordVisibility(fieldId, iconId) {
  var passwordField = document.getElementById(fieldId);
  var eyeIcon = document.getElementById(iconId);

  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
}

document.getElementById("togglePassword").addEventListener("click", function () {
  togglePasswordVisibility("pwd", "togglePassword");
});

document.getElementById("next").addEventListener("click", function (e) {
  if (!validateForm()) {
    e.preventDefault();
  }
});
