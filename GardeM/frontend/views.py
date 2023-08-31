from django.shortcuts import render

def index(request, *args, **kwargs):
    return render(request, 'front/index.html')