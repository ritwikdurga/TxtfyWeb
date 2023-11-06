# main/urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from home.views import logout_view
from django.urls import path, include
from user.views import custom_404_view

handler404 = custom_404_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('signin/', include('signin.urls')),
    path('', include('home.urls')),
    path('editpage/', include('editpage.urls')),
    path('logout/', logout_view, name= 'logout')
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
