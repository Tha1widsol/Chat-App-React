from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password

# Create your views here.

