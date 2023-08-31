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
        print(queryset)

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

    





