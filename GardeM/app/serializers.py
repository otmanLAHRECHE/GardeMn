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
    month = MonthSerializer()
    worker = WorkerSerializer()

    class Meta:
        model = Garde
        fields = ['id', 'jn', 'jw', 'jf', 'worker', 'month']



class SoldeSerializer(serializers.ModelSerializer):

    assurance = serializers.FloatField() 
    m_assurance = serializers.FloatField() 
    taxes = serializers.FloatField()
    sld = serializers.FloatField() 
    work = serializers.CharField() 

    class Meta:
        model = Solde
        fields = ['id', 'net', 'assurance', 'm_assurance', 'taxes', 'sld', 'work']



class SoldePrintSerializer(serializers.ModelSerializer):

    
    sld = serializers.FloatField() 
    work = serializers.CharField() 
    cp = serializers.CharField()

    class Meta:
        model = Solde
        fields = ['id', 'work', 'cp', 'sld']