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

    label = serializers.CharField(source = 'month_word') 
    
    class Meta:
        model = Month
        fields = ['id', 'label', 'year']


class GardeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Garde
        fields = ['id', 'jn', 'jw', 'jf', 'worker', 'month']