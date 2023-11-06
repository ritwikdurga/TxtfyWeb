from django.urls import path
from .views import index, SaveEditsView, generate_pdf, save_name_edits, delete_project
app_name = 'editpage'

urlpatterns = [
    path('<int:project_id>/', index, name='index'),  # This line is crucial
    path('save_edits/<int:project_id>/', SaveEditsView.as_view(),name='saveedits'),
    path('upload_pdf/', generate_pdf, name="uploadPdf"),
    path('delete_project/<int:project_id>/', delete_project, name='delete_project'),
    path('save_name_edits/<int:project_id>/',save_name_edits, name='save_name_edits'),
]
