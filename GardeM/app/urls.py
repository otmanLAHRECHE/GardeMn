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
    path('api/save_gardes/<int:id>', views.saveGarde),
    path('api/get_all_soldes_of_month/<int:id>', views.getSoldeOfMonth),
    path('api/get_total_soldes_of_month/<int:id>', views.getTotalSoldeOfMonth),
    path('api/get_printing_soldes_of_month/<int:id>', views.getSoldeOfMonthForPrint),
    path('api/get_total_soldes_of_month_para/<int:id>', views.getTotalSoldeOfMonthPara),
    path('api/get_printing_soldes_of_month_para/<int:id>', views.getSoldeOfMonthForPrintPara),
    path('api/get_total_soldes_of_month_adm/<int:id>', views.getTotalSoldeOfMonthAdm),
    path('api/get_printing_soldes_of_month_adm/<int:id>', views.getSoldeOfMonthForPrintAdm),
]