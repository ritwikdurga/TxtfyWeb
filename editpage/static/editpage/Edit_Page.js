let bcg = null;
let tempbcg = null;
let templateSelected = 0;
let tempTemplate = 0;

function submitForm(input) {
  if (input.files.length > 0) {
    showOverlay();
  }
}

function showOverlay(event) {
  var overlay = document.getElementById("overlay");
  var spanner = document.getElementById("spanner");

  event.preventDefault();
  var fileInput = document.getElementById("um");
  fileInput.click();

  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      overlay.classList.add("show");
      spanner.classList.add("show");

      window.addEventListener("load", function () {
        overlay.classList.remove("show");
        spanner.classList.remove("show");
      });
    }
  });
}

function use_template() {
  document.getElementById("item3").style.gridRow = "2/4";
  document.getElementById("item1").style.display = "grid";
  document.getElementById("template_button").style.display = "none";
  document.getElementById("back_button").style.display = "block";
  document.getElementById("use_it").style.display = "block";
  document.getElementById("save_copy_button").style.display = "none";
  document.getElementById("item3").style.animationName = "A3";
  document.getElementById("item1").style.animationName = "A4";
  document.getElementById("back_to_home_button").style.display = "none";
  preview();
}

function changeBackground(image) {
  document.getElementById("backpage").style.backgroundImage =
    "url('" + image.src + "')";
  document.getElementById("backpage").style.backgroundSize = "100% 100%";
  tempbcg = "url('" + image.src + "')";
  tempTemplate = 1;

  const ckeditorContent = document.querySelector(".ck-content");

  if (ckeditorContent) {
    ckeditorContent.style.backgroundSize = "cover";
  }

  preview();
}

function back_func() {
  document.getElementById("item3").style.gridRow = "1/4";
  document.getElementById("template_button").style.display = "block";
  document.getElementById("back_button").style.display = "none";
  document.getElementById("use_it").style.display = "none";
  document.getElementById("save_copy_button").style.display = "block";
  document.getElementById("item3").style.animationName = "A4";
  document.getElementById("item1").style.animationName = "A5";
  tempTemplate = 0;
  document.getElementById("back_to_home_button").style.display = "block";
  closePreview();
}

function generatePDF() {
  const editorContent = editor.getData();
  suggestedFileName = "output";
  background = bcg;
  const data = {
    html_content: editorContent,
    background: background,
    project_id: project_id,
  };
  fetch("/editpage/upload_pdf/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
  });
}

function DownloadPDF() {
  const editorContent = editor.getData();
  var inputElement = document.getElementById("editable-input");
  var inputValue = inputElement.value;
  if(inputValue){
    suggestedFileName = inputValue;
  }else{
    suggestedFileName = "Untitled";
  }
  background = bcg;

  const data = {
    html_content: editorContent,
    background: background,
    project_id: project_id,
  };
  fetch("/editpage/upload_pdf/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = suggestedFileName + ".pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {});
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function save_template() {
  templateSelected = 1;
  bcg = tempbcg;
  document.getElementById("item3").style.gridRow = "1/4";
  document.getElementById("template_button").style.display = "block";
  document.getElementById("back_button").style.display = "none";
  document.getElementById("use_it").style.display = "none";
  document.getElementById("save_copy_button").style.display = "block";
  document.getElementById("item3").style.animationName = "A4";
  document.getElementById("item1").style.animationName = "A5";
  document.getElementById("back_to_home_button").style.display = "block";
  preview();
}

function preview() {
  const editedText = editor.getData();
  const textContainer = document.getElementById("preview_container");

  const textDiv = document.createElement("div");
  textDiv.style.marginLeft = "20px";
  textDiv.innerHTML = editedText;

  textContainer.innerHTML = "";
  textContainer.appendChild(textDiv);

  document.getElementById("editor-container").style.display = "none";
  textContainer.style.display = "block";
  document.getElementById("preview_button").style.display = "none";
  document.getElementById("close_preview_button").style.display = "block";
  document.getElementById("save_button").style.display = "none";

  if (tempbcg && tempTemplate) {
    document.getElementById("backpage").style.backgroundImage = tempbcg;
  } else if (bcg && templateSelected) {
    document.getElementById("backpage").style.backgroundImage = bcg;
  }
}

function closePreview() {
  const textDiv = document.querySelector("#preview_container > div");
  if (textDiv) {
    textDiv.style.marginLeft = "0";
  }

  document.getElementById("backpage").style.backgroundImage = "none";

  document.getElementById("preview_container").style.display = "none";
  document.getElementById("editor-container").style.display = "block";

  const ckeditorContent = document.querySelector(".ck-content");
  if (ckeditorContent) {
    ckeditorContent.style.backgroundImage = "none";
    ckeditorContent.style.backgroundSize = "initial";
  }

  document.getElementById("close_preview_button").style.display = "none";
  document.getElementById("preview_button").style.display = "block";
  document.getElementById("save_button").style.display = "block";
}

function submitForm(inputElement) {
  if (inputElement.files.length > 0) {
    document.getElementById("upload_form").submit();
  }
}
