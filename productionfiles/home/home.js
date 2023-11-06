document.addEventListener("DOMContentLoaded", function () {
  const middleContainer = document.getElementById("recents-page");
  const viewAllButton = document.getElementById("view-all");
  let isMaximized = false;
  viewAllButton.addEventListener("click", function (e) {
    if (!isMaximized) {
      middleContainer.style.gridColumn = "1/3";
      document.getElementById("uploading-page").style.display = "none";
      viewAllButton.textContent = "View Less";
    } else {
      middleContainer.style.gridColumn = "2/3";
      document.getElementById("uploading-page").style.display = "grid";
      viewAllButton.textContent = "View All";
    }

    isMaximized = !isMaximized;
  });
});

const fileInput = document.getElementById("file-input");
document.querySelector("#submitButton").addEventListener("click", function() {
  const files = fileInput.files;
  if (files.length>0){
    document.querySelector(".spanner").classList.add("show");
    document.querySelector(".overlay").classList.add("show");
  }
});

const dropArea = document.getElementById("drop-area");
const fileList = document.getElementById("file-list");
const paraText = document.getElementById("para");

dropArea.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  const files = fileInput.files;
  for (const file of files) {
    const listItem = document.createElement("li");
    const Image = document.createElement("img");
    const imgName = document.createElement("p");
    const imageUrl = URL.createObjectURL(file);
    imgName.append(file.name);
    Image.src = imageUrl;
    listItem.append(Image);
    listItem.append(imgName);
    fileList.appendChild(listItem);
  }
  if (files.length > 0) {
    paraText.style.display = "none";
  }
});

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("active");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("active");
  const files = e.dataTransfer.files;
  const fileInput = document.getElementById("file-input");
  const allFiles = Array.from(fileInput.files);
  const newFiles = Array.from(files);
  const combinedFiles = allFiles.concat(newFiles);
  const newFileList = new DataTransfer();
  combinedFiles.forEach((file) => {
    newFileList.items.add(file);
  });
  fileInput.files = newFileList.files;
  for (const file of files) {
    const listItem = document.createElement("li");
    const Image = document.createElement("img");
    const imgName = document.createElement("p");
    const imageUrl = URL.createObjectURL(file);
    imgName.append(file.name);
    Image.src = imageUrl;
    listItem.append(Image);
    listItem.append(imgName);
    fileList.appendChild(listItem);
  }
  if (files.length > 0) {
    paraText.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", filterAndSortFiles);
});
function filterAndSortFiles() {
  const searchInput = document.getElementById("searchInput");
  const filter = searchInput.value.toLowerCase();
  const galleryItems = document.querySelectorAll(".gallery");
  let noFileFound = true; 
  galleryItems.forEach(function (item) {
    const filename = item
      .querySelector(".filename span")
      .textContent.toLowerCase();
    if (filename.includes(filter)) {
      item.style.display = "block";
      noFileFound = false; 
    } else {
      item.style.display = "none";
    }
  });
  const noFileMessage = document.getElementById("noFileMessage");
  if (noFileFound) {
    noFileMessage.style.display = "block";
  } else {
    noFileMessage.style.display = "none";
  }
}

function openPdfPopup(pdfFileName, page, project_id) {
  const pdfURL = pdfFileName[0].slice(1);
  console.log(pdfURL);
  const pdiframeid = "pdfiframe" + project_id;
  const pdfModId = "pdfModel" + project_id;
  document.getElementById(pdfModId).style.display = "block";   
}

function closePdfPopup(project_id) {
  const pdiframeid = "pdfiframe" + project_id;
  const pdfModId = "pdfModel" + project_id;
  document.getElementById(pdfModId).style.display = "none";
  document.getElementById(pdfModId).src = "";
}

document.getElementById('submitButton').addEventListener('click', function () {
  const fileInput = document.getElementById("file-input");
  const files = fileInput.files;
  if (files.length > 0) {
    var form = document.getElementById('upload-form');
    form.submit();
  } else {
    document.getElementById('notAddedFiles').style.display = 'block';
  }
});
