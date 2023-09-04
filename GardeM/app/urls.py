from posixpath import basename
from django.urls import path
from .views import *
from app import views

urlpatterns = [
    path('api/get_selected_worker/<int:id>', views.getSelectedWorker),
    path('api/get_all_workers/', views.getAllWorkers),
    path('api/create_worker/', views.createNewWorker),
    path('api/update_worker/<int:id>', views.updateWorker),
    path('api/delete_worker/<int:id>', views.deleteWorker),
    path('api/get_all_examen_of_year/<int:year>', views.getAllMonthsByYear),
]