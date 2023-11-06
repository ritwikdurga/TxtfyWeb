<div align="center">
  <img src="https://i.ibb.co/pZ9W3Zq/Whats-App-Image-2023-11-05-at-20-03-19.jpg" alt="Logo">
</div>
# TxtfyWeb: An OCR-Powered Text Recognition System

Welcome to the TxtfyWeb, An OCR-Based Text Recognition System! TxtfyWeb is a powerful and versatile OCR tool that seamlessly converts scanned images into editable text formats and convert them into pdf's making it user-friendly for sharing and storage. Additionally, it offers accurate text editing capabilities, allowing users to correct recognition errors and make content adjustments. With its features, TxtfyWeb enhances usability by providing both convenience in text distribution and flexibility for content refinement, making it an important tool for students, professionals, and anyone dealing with documents online.


## Table of Contents

- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Screenshots](#screenshots)
- [Acknowledgments](#acknowledgments)
- [Authors](#authors)
- [Usage](#usage)
- [Demo](#demo)

## Installation

Before you can start using this project, you need to set up your environment. Follow these steps for installation and configuration:

**Install Python:**
   
   If you don't already have Python installed on your system, you can download it from the official Python website:

   - [Python Official Website](https://www.python.org/downloads/)

   Please choose the appropriate version (recommended: Python 3.12.0) for your operating system.

**Install Project Dependencies:**

   - Open your terminal or command prompt.
   - Navigate to the project directory using the `cd` command.
   - Run the following command to install the required Python libraries from the provided `requirements.txt` file:

      ```shell
      pip install -r requirements.txt
      ```

**Download External Executable Files:**

   To proceed with this project, you will need two external executable files. Download them from the following links:

   - [Tesseract](https://digi.bib.uni-mannheim.de/tesseract/tesseract-ocr-w64-setup-5.3.3.20231005.exe)
   - [GTK3](https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer/releases/download/2022-01-04/gtk3-runtime-3.24.31-2022-01-04-ts-win64.exe)

   Save these downloaded files in the project directory.

**Setup Process:**

   After downloading the executable files, follow these steps for the setup process:

   - Run the setup script to initiate the installation process.
   - Follow the on-screen instructions, ensuring not to change the installation location on your computer.

Once you've completed these installation steps, your environment should be ready to use the project. You can now launch the application and start utilizing its features as described in the project description.


## Run Locally

### Clone the project

```
  git clone https://github.com/ritwikdurga/TxtfyWeb
```

### Go to the project directory

```
  cd TxtfyWeb
```

### Install dependencies

- Follow the installation process as mentioned above.

### Start the server

```
  python manage.py runserver
```

Navigate to the localhost:8000.


## Tech Stack

**Client:** HTML, CSS, JavaScript

**Server:** Python, Django 


## Features

- **Text recognition:** Accurately converts images containing text into editable text format.
- **PDF generation:** Easily converts recognized text into PDF files for convenient sharing and storage.
- **Text editing:** Provides robust text editing capabilities to correct recognition errors and make immediate content adjustments.
- **Template selection:** Offers a variety of templates to enhance the visual appearance of extracted text.
- **User management:** Allows users to create accounts, sign in, and manage their saved projects.
- **Profile management:** Enables users to view and edit their profile information.
- **Password reset:** Offers a way to reset passwords.


## Screenshots

### Signin
![](https://i.ibb.co/6b68TRf/Signin.png")
### Home
![App2 Sc](https://i.ibb.co/3fYP4Tg/Home-page.png")
### Editpage
![App Screenshot](https://i.ibb.co/WFGB982/Edit-page1.png)
###

## Usage

### Sign Up and Sign In
- New users: Create an account by clicking "Sign Up."
- Existing users: Sign in with your credentials.

### Home Page
- Upload images by dragging and dropping them onto the designated area.
- View and manage your recent projects in the right section.

### Viewing and Editing Projects
- Click a recent file to open a pop-up preview.
- Options: Open and Edit, Close Preview, Delete Project.

### Editing Page
- Features: Add Images, Templates, Download, Save & Copy, Back to Home, CKEditor, Preview Feature.

### Templates
- Explore and select templates from the "Templates" section.
- Preview and save your preferred template.

### Profile Page
- View and edit your name.
- Change your password by clicking "Change Password."

### Logout
- Log out by clicking "Logout" on the home page.


## Acknowledgements

 - [Tesseract-OCR](https://github.com/tesseract-ocr/tesseract)
 - [ckeditor5](https://github.com/ckeditor/ckeditor5)
### External Libraries
**Tesseract and OpenCV**: We were inspired by the open-source OCR library Tesseract and the image processing capabilities of OpenCV, which greatly contributed to our text recognition features.

We are grateful for the contributions of the authors and communities behind the following external libraries that were essential in the development of TxtfyWeb:

- **Django**: We used Django, a robust web framework, to build the backend of our project.
- **SQLite**: SQLite served as our database for data storage.


## Authors

- [**@ritwikdurga**](https://www.github.com/ritwikdurga)
- [**@nithinchukka**](https://www.github.com/nithinchukka)
- [**@abhijitch1**](https://www.github.com/abhijitch1)
- [**@lohith49**](https://www.github.com/lohith49)
- [**@rljsai**](https://www.github.com/rljsai)


