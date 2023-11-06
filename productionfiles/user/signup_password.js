function verifyPassword() {
  var pw1 = document.getElementById("pwd").value;
  var pw2 = document.getElementById("cpwd").value;

  resetStyles();

  if (pw1 != pw2) {
    setError("Passwords do not match");
    return false;
  } else if (pw1.length < 8) {
    setError("Password should be atleast 8 characters long");
    return false;
  } else if (!containsUppercase(pw1)) {
    setError("Password should contain atleast one uppercase letter");
    return false;
  } else if (!containsLowercase(pw1)) {
    setError("Password should contain atleast one lowercase letter");
    return false;
  } else if (!containsNumber(pw1)) {
    setError("Password should contain atleast one number");
    return false;
  } else {
    return true;
  }
}



function setError(message) {
  document.getElementById("message").innerHTML = message;
  document.getElementById("x1").style.color = "red";
  document.getElementById("x2").style.color = "red";
  document.getElementById("pwd").style.borderColor = "red";
  document.getElementById("cpwd").style.borderColor = "red";
}

function resetStyles() {
  document.getElementById("message").innerHTML = "";
  document.getElementById("x1").style.color = "black";
  document.getElementById("x2").style.color = "black";
  document.getElementById("pwd").style.borderColor = "";
  document.getElementById("cpwd").style.borderColor = "";
}

function containsUppercase(str) {
  return /[A-Z]/.test(str);
}

function containsLowercase(str) {
  return /[a-z]/.test(str);
}

function containsNumber(str) {
  return /\d/.test(str);
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

document.getElementById("togglePassword").addEventListener("click", function () {
  togglePasswordVisibility("pwd", "togglePassword");
});

document.getElementById("toggleConfirmPassword").addEventListener("click", function () {
  togglePasswordVisibility("cpwd", "toggleConfirmPassword");
});
