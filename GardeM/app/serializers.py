from dataclasses import fields
from rest_framework import serializers
from .models import *

class WorkerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workers
        fields = ['id', 'name', 'prename', 'service', 'grade', 'ccp']


class MonthSerializer(serializers.ModelSerializer):

    class Meta:
        model = Month
        fields = ['id', 'month', 'year']


class MonthSerializerForTable(serializers.ModelSerializer):

    label = serializers.CharField(source='month')

    if(label == 1):
        label = "Janvier"
    elif(label == 2):
        label = "Février"
    elif(label == 3):
        label = "Mars"
    elif(label == 4):
        label = "Avrile"
    elif(label == 5):
        label = "Mai"
    elif(label == 6):
        label = "Juin"
    elif(label == 7):
        label = "Juillet"
    elif(label == 8):
        label = "Août"
    elif(label == 9):
        label = "Septembre"
    elif(label == 10):
        label = "Octobre"
    elif(label == 11):
        label = "November"
    elif(label == 12):
        label = "Décembre"
    class Meta:
        model = Month
        fields = ['id', 'label', 'year']


class GardeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Garde
        fields = ['id', 'jn', 'jw', 'jf', 'worker', 'month']