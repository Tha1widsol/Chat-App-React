from django.shortcuts import render
from rest_framework import generics,status,permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, logout,login
from django.contrib.auth.models import User
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from .serializers import *
from knox.models import AuthToken
from .models import Add

# Create your views here.

@api_view(['GET'])
def UserViewSet(request):
    queryset = User.objects.all()
    serializer = UserSerializer(queryset,many = True)
    return Response(serializer.data)

@api_view(['GET'])
def currentUser(request):
    serializer= UserSerializer(request.user)
    return Response(serializer.data)
    

class SearchAPI(APIView):
    def post(self,request,*args,**kwargs):
        #serializer = self.get_serializer(data = request.data)
        search_val = request.data.get('search_string','')
        users = User.objects.filter(username__contains = search_val)
        serializer_class = UserSerializer(users,many=True)
        return Response(serializer_class.data,status = status.HTTP_200_OK)

class GetSentAPI(APIView):
    def get(self,request,*args,**kwargs):
        sent = Add.objects.filter(user = request.user)
        serializer_class = UserSerializer((s.friend for s in sent),many=True)
        return Response(serializer_class.data,status = status.HTTP_200_OK)


class AddAPI(APIView):
    serializer_class = AddedSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            user = request.user
            id = request.data.get('friends')
            friend = User.objects.get(id = id)
            add = Add(user = user,friend = friend)
            add.save()
          
            return Response(AddedSerializer(add).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class RemoveRequest(APIView):
    serializer_class = AddedSerializer

    def post(self,request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            id = request.data.get('friend')
            friend = User.objects.get(id = id)
            sent = Add.objects.get(friend = friend)
            sent.delete()

        return Response(status = status.HTTP_200_OK)

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        return Response({
            "user":UserSerializer(user,
        context = self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data
      
        return Response({
            "user":UserSerializer(user,
        context = self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })
