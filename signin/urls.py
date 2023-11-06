from django.urls import path
from . import views as user_views

urlpatterns = [
    path('', user_views.signin, name='signin'),  # Route for the signin view
]
