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

        source_serial = MonthSerializer(queryset, many=True)

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
            return Response(status=status.HTTP_201_CREATED, data = {"status":"Month alredy exist"})
        else:
            source = Month.objects.create(month = month, year= year)
            if source.id is not None:
                return Response(status=status.HTTP_201_CREATED, data = {"id_worker":source.id})
            else:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)


    





