from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from home.models import ProjectImage, Project
from django.views.generic import View
from django.contrib.auth.decorators import login_required
from spellchecker import SpellChecker
from weasyprint import HTML,CSS
import json
from django.utils import timezone
import cv2
import pytesseract
import os
import re
import platform
import pytesseract

if platform.system() == 'Darwin':  
    pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/Cellar/tesseract/5.3.2_1/bin/tesseract'
elif platform.system() == 'Windows':
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'




def calculate_kernel_size(image):
    height, width = image.shape[:2]
    kernel_size = min(height, width) // 10
    return (kernel_size, kernel_size)


def imgReader(img):
    image = cv2.imread(img)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    ret, thresh1 = cv2.threshold(
        gray, 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV)
    rect_kernel_size = calculate_kernel_size(image)
    rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, rect_kernel_size)
    dilation = cv2.dilate(thresh1, rect_kernel, iterations=1)
    contours, hierachy = cv2.findContours(
        dilation, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    img2 = image.copy()
    s = ""
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        rect = cv2.rectangle(img2, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cropped = img2[y:y + h, x:x + w]
        text = pytesseract.image_to_string(cropped)
        s = text+s
    spell = SpellChecker()
    s = s.replace(',', ' , ').replace('.', ' . ')
    words = s.split()
    misspelled = spell.unknown(words)
    spell.word_frequency.load_words([',', '.'])
    corrected_text = " ".join(spell.correction(word) if word in misspelled
                              and spell.correction(word) is not None else word for word in words)
    corrected_text = corrected_text.replace(' , ', ', ').replace(' . ', '.')
    return corrected_text


@login_required
def index(request, project_id):
    project = get_object_or_404(Project, id=project_id, user=request.user)
    text_from_db = project.content

    if request.method == "POST":
        if 'name' in request.POST:
            project_name = request.POST['name']
            project.name = project_name
            project.save()
        elif 'new_images' in request.FILES:
            new_images = request.FILES.getlist('new_images')

            for new_image in new_images:
                new_project_image = ProjectImage.objects.create(
                    project=project, image=new_image)
                image_path = os.getcwd()+new_project_image.image.url
                extracted_text = imgReader(image_path)
                cleaned_text = re.sub(r'\n+', ' ', extracted_text)
                text_from_db = text_from_db+cleaned_text
                text_from_db = text_from_db+"\n"

                new_project_image.save()
            project.content = text_from_db
            project.save()

        return redirect(reverse('editpage:index', kwargs={'project_id': project_id}))

    text = ""
    if text_from_db == '':
        existing_project_images = ProjectImage.objects.filter(
            project_id=project_id)
        for img in existing_project_images:
            image_path = os.getcwd()+img.image.url
            extracted_text = imgReader(image_path)
            cleaned_text = re.sub(r'\n+', ' ', extracted_text)
            text = text+cleaned_text
            text = text+"\n"

        project.content = text
        project.save()

    text_from_db = project.content
    p_name = project.name
    project_images = ProjectImage.objects.filter(project=project)

    return render(request, "editpage/Edit_Page.html", {
        "project_images": project_images,
        "project_id": project_id,
        "text": text_from_db,
        "p_name": p_name
    })


@method_decorator(csrf_exempt, name='dispatch')
class SaveEditsView(View):
    def post(self, request, project_id, *args, **kwargs):
        edited_text = request.POST.get('text')
        project = get_object_or_404(Project, id=project_id)
        project.content = edited_text
        project.save()
        return JsonResponse({'status': 'success'})

def generate_pdf(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            html_content = data.get('html_content')
            background = data.get('background')
            project_id = data.get('project_id')

            if html_content:
                if background:
                    background_image_path = background[5:-2]
                    background_css = CSS(string=f'@page {{ size: A4; background-image: url("{background_image_path}"); background-size: cover; }}')
                    pdf_content = HTML(string=html_content).write_pdf(stylesheets=[background_css])
                else:
                    pdf_content = HTML(string=html_content).write_pdf()
                project = get_object_or_404(Project, id=project_id)
                pdf_file_name = f'{project.name}.pdf'  
                pdf_file_path = default_storage.save(pdf_file_name, ContentFile(pdf_content))

                project.output.name = pdf_file_path
                project.flag = True
                project.date = timezone.now()
                project.save()

                response = HttpResponse(pdf_content, content_type='application/pdf')
                response['Content-Disposition'] = f'attachment; filename="{pdf_file_name}"'
                return response
            else:
                return HttpResponse("Invalid HTML content", status=400)
        except Exception as e:
            return HttpResponse("Error while generating or saving PDF", status=500)
    else:
        return HttpResponse("Method not allowed", status=405)


def save_name_edits(request, project_id):
    if request.method == 'POST':
        name = request.POST.get('name')
        project = get_object_or_404(Project, id=project_id, user=request.user)
        if 'name' in request.POST:
            project_name = request.POST['name']
            if project_name != '':
                project.name = project_name
                project.save()

        return JsonResponse({'message': 'Name data saved successfully.'})
    else:
        return JsonResponse({'error': 'Invalid request method.'})
    

def delete_project(request,project_id):
    if request.method == 'POST':
        project = get_object_or_404(Project,id=project_id)
        if project.flag != True :
            project.delete()

        return JsonResponse({'message': 'Project deleted successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})


