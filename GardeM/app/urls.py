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
    path('api/get_all_months_of_year/<int:year>', views.getAllMonthsByYear),
    path('api/create_month/', views.createNewMonth),
    path('api/update_month/<int:id>', views.updateMonth),
    path('api/delete_month/<int:id>', views.deleteMonth),
    path('api/get_selected_month/<int:id>', views.getSelectedMonth),
    path('api/get_all_gardes_of_month/<int:id>', views.getAllGardesOfMonth),
    path('api/sync_workers/<int:id>', views.syncWorkers),
]