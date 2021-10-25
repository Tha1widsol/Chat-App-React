from rest_framework import generics,status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from rest_framework.views import APIView
from .serializers import *
from knox.models import AuthToken

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
