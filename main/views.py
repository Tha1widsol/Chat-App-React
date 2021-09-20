from django.db.models.query import QuerySet
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from .serializers import UserSerializer

# Create your views here.

@api_view(['GET'])
def UserViewSet(request):
    queryset = User.objects.all()
    serializer = UserSerializer(queryset,many = True)
    return Response(serializer.data)



