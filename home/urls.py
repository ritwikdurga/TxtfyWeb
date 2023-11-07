from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .import views

urlpatterns = [
    path('', views.upload_images, name='home'),
    path('home/delete_project/<int:project_id>/', views.delete_project, name='delete_project'),
    path('about_us/', views.about_us, name='about_us'),
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)