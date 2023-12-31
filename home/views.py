from django.shortcuts import render, redirect, get_object_or_404
from .models import Project, ProjectImage
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib import messages
from django.http import JsonResponse

#Function for uploading images
@login_required
def upload_images(request):
    user = request.user
    if request.method == "POST":
        project = Project.objects.create(user=user)
        images = request.FILES.getlist('image')
        #Iterating through all images and adding them to the database of the project
        for image in images:
            project_image = ProjectImage.objects.create(
                project=project, image=image)
            project_image.save()
        return redirect('editpage:index', project_id=project.id)
    obj = Project.objects.filter(user=user)
    #removes the unsaved projects from database
    for p in obj:
        if p.flag == False:
            p.delete()
    projects = Project.objects.filter(user=user).order_by('-date')
    return render(request, 'home/home.html', context={'user_projects': projects})

#Function for logging out from the application
def logout_view(request):
    logout(request)
    messages.success(request, 'Logout successful')
    return redirect('signin')

#Function for deleting the project
def delete_project(request, project_id):
    if request.method == 'POST':
        project = get_object_or_404(Project, id=project_id)
        project.delete()
        return JsonResponse({'message': 'Project deleted successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    
#Function for rendering About us page
def about_us(request):   
    return render(request, 'home/about_us.html')