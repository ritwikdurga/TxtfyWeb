function verifyPassword() {
  var pw1 = document.getElementById("id_new_password1").value;
  var pw2 = document.getElementById("id_new_password2").value;

  if (pw1 != pw2) {
    document.getElementById("message").innerHTML = "Passwords are not matching";
    document.getElementById("x1").style.color = "red";
    document.getElementById("x2").style.color = "red";
    document.getElementById("id_new_password1").style.borderColor = "red";
    document.getElementById("id_new_password2").style.borderColor = "red";
    return false;
  } else if (pw1.length < 8) {
    document.getElementById("message").innerHTML =
      "Password contain atleast 8 characters";

    document.getElementById("x1").style.color = "red";
    document.getElementById("x2").style.color = "red";
    document.getElementById("id_new_password1").style.borderColor = "red";
    document.getElementById("id_new_password2").style.borderColor = "red";
    return false;
  } else {
    return true;
  }
}

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

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    togglePasswordVisibility("id_new_password1", "togglePassword");
  });

document
  .getElementById("toggleConfirmPassword")
  .addEventListener("click", function () {
    togglePasswordVisibility("id_new_password2", "toggleConfirmPassword");
  });
