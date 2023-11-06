function editfunction() {
  const input = document.getElementById("name");
  if (input.disabled) {
    input.disabled = false;
    input.required = true;
    input.focus();
    input.selectionStart = input.value.length;
    input.selectionEnd = input.value.length;
    document.getElementById("edit_save").style.visibility = "visible";
    document.getElementById("edit_button").style.display = "none";
    document.getElementById("change_password").style.display = "none";
  }
}

function update() {
  document.getElementById("error").style.display = "block";
}

function backfunc() {
  document.getElementById("error").style.display = "none";
}

window.addEventListener("popstate", function (event) {
  clearInput();
});

function validatePassword() {
  var pw1 = document.getElementById("pwd").value;
  var pw2 = document.getElementById("cpwd").value;

  if (pw1 !== pw2) {
    document.getElementById("message").innerHTML = "Passwords are not matching";
    document.getElementById("x1").style.color = "red";
    document.getElementById("x2").style.color = "red";
    document.getElementById("pwd").style.borderColor = "red";
    document.getElementById("cpwd").style.borderColor = "red";
    return false;
  } else if (pw1.length < 8) {
    document.getElementById("message").innerHTML =
      "Password should contain at least 8 characters";

    document.getElementById("x1").style.color = "red";
    document.getElementById("x2").style.color = "red";
    document.getElementById("pwd").style.borderColor = "red";
    document.getElementById("cpwd").style.borderColor = "red";
    return false;
  } else {
    return true;
  }
}

document
  .getElementById("update_password")
  .addEventListener("click", function (e) {
    if (!validatePassword()) {
      e.preventDefault();
    }
  });

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
    togglePasswordVisibility("pwd", "togglePassword");
  });

document
  .getElementById("toggleConfirmPassword")
  .addEventListener("click", function () {
    togglePasswordVisibility("cpwd", "toggleConfirmPassword");
  });

document
  .getElementById("toggleCurrentPassword")
  .addEventListener("click", function () {
    togglePasswordVisibility("opwd", "toggleCurrentPassword");
  });
