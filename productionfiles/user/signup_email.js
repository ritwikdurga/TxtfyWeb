function validateEmailAddress(emailAddress) {
  var atSymbol = emailAddress.indexOf("@");
  var dotSymbol = emailAddress.lastIndexOf(".");
  var spaceSymbol = emailAddress.indexOf(" ");

  if (
    atSymbol != -1 &&
    atSymbol != 0 &&
    dotSymbol != -1 &&
    dotSymbol != 0 &&
    dotSymbol > atSymbol + 1 &&
    emailAddress.length > dotSymbol + 1 &&
    spaceSymbol == -1
  ) {
    return true;
  } else {
    document.getElementById("msg").style.display = "inline";
    document.getElementById("x").style.color = "red";
    document.getElementById("eml").style.borderColor = "red";
    return false;
  }
}

document.getElementById("next").addEventListener("click", function (e) {
  if (!validateForm()) {
    e.preventDefault();
  }
});
