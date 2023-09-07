import datetime
from os import stat
from wsgiref.util import request_uri
from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from calendar import monthrange
from dateutil.relativedelta import relativedelta



@api_view(['GET'])
def getAllWorkers(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Workers.objects.all()

        source_serial = WorkerSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  
    

@api_view(['POST'])
def createNewWorker(request):
    if request.method == 'POST' and request.user.is_authenticated:

        name = request.data.pop('name')
        prename = request.data.pop('prename')
        service = request.data.pop('service')
        grade = request.data.pop('grade')
        ccp = request.data.pop('ccp')
        

        source = Workers.objects.create(name = name, prename= prename, service = service, grade= grade, ccp= ccp)

        if source.id is not None:
            return Response(status=status.HTTP_201_CREATED, data = {"id_worker":source.id})
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateWorker(request, id):
    if request.method == 'POST' and request.user.is_authenticated:

        name = request.data.pop('name')
        prename = request.data.pop('prename')
        service = request.data.pop('service')
        grade = request.data.pop('grade')
        ccp = request.data.pop('ccp')
        
        worker_to_update = Workers.objects.get(id = id)

        if not worker_to_update.name == name:
            worker_to_update.name = name
        if not worker_to_update.prename == prename:
            worker_to_update.prename = prename
        if not worker_to_update.service == service:
            worker_to_update.service = service
        if not worker_to_update.grade == grade:
            worker_to_update.grade = grade
        if not worker_to_update.ccp == ccp:
            worker_to_update.ccp = ccp
        worker_to_update.save()

        return Response(status=status.HTTP_200_OK, data = {"status":"worker updated"})
    else:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(['GET'])
def getSelectedWorker(request, id):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Workers.objects.get(id = id)
        source_serial = WorkerSerializer(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['DELETE'])
def deleteWorker(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Workers.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Worker deleted"})



@api_view(['GET'])
def getAllMonthsByYear(request, year):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Month.objects.filter(year=year).order_by("-month")

        source_serial = MonthSerializerForTable(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  
    

@api_view(['POST'])
def createNewMonth(request):
    if request.method == 'POST' and request.user.is_authenticated:
        month = request.data.pop('month')
        year = request.data.pop('year')
        test = Month.objects.filter(month=month, year=year)
        if(test):
            return Response(status=status.HTTP_208_ALREADY_REPORTED, data = {"status":"Month alredy exist"})
        else:
            source = Month.objects.create(month = month, year= year)
            if source.id is not None:
                workers = Workers.objects.all()
                for worker in workers:
                    g = Garde.objects.filter(worker = worker, month = source)
                    if not g:
                        garde = Garde.objects.create(jn = 0, jw = 0, jf = 0, worker = worker, month = source)
                        if garde.id is not None:
                            print("Garde created for:")
                            print(worker.name)
                return Response(status=status.HTTP_201_CREATED, data = {"id_worker":source.id})
            else:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
              
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

        



@api_view(['GET'])
def getSelectedMonth(request, id):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Month.objects.get(id = id)
        source_serial = MonthSerializer(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    

    
@api_view(['POST'])
def updateMonth(request, id):
    if request.method == 'POST' and request.user.is_authenticated:

        month = request.data.pop('month')
        year = request.data.pop('year')
        
        month_to_update = Month.objects.get(id = id)

        if not month_to_update.month == month:
            month_to_update.month = month
        if not month_to_update.year == year:
            month_to_update.year = year
        month_to_update.save()

        return Response(status=status.HTTP_200_OK, data = {"status":"month updated"})
    else:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


@api_view(['DELETE'])
def deleteMonth(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Month.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Month deleted"})



@api_view(['GET'])
def getAllGardesOfMonth(request, id):
    if request.method == 'GET' and request.user.is_authenticated:
        month = Month.objects.get(id = id)
        queryset = Garde.objects.filter(month = month)

        source_serial = GardeSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  
    

@api_view(['POST'])
def syncWorkers(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        month = Month.objects.get(id = id)
        
        workers = Workers.objects.all()
        for worker in workers:
            g = Garde.objects.filter(worker = worker, month = month)
            if not g:
                garde = Garde.objects.create(jn = 0, jw = 0, jf = 0, worker = worker, month = month)
                if garde.id is not None:
                    print("Garde created for:")
                    print(worker.name)
        return Response(status=status.HTTP_200_OK, data = {"state":"workers synced"})
                 
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  



