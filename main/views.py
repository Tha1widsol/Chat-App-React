from rest_framework import generics,status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from .models import FriendRequest, User
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

class SendFriendRequestAPI(APIView):
    def post(self,request,userID,*args,**kwargs):
        from_user = request.user
        to_user = User.objects.get(id = userID)
        friend_request = FriendRequest.objects.filter(from_user = from_user,to_user = to_user)

        if not(friend_request.exists()) and not(to_user in request.user.friends.all()):            
              friend_request,created = FriendRequest.objects.get_or_create(from_user = from_user,to_user = to_user)
              if created:
                 return Response(status = status.HTTP_200_OK)
        
        return Response(status = status.HTTP_400_BAD_REQUEST)

class GetFriendRequestsAPI(APIView):
    def get(self,request,*args,**kwargs):
        requests = FriendRequest.objects.filter(to_user = request.user)

        if requests.exists():
            serializer_class = UserSerializer((r.from_user for r in requests),many = True)
            return Response(serializer_class.data,status =  status.HTTP_200_OK)

        return Response(status = status.HTTP_200_OK)

class GetSentFriendRequests(APIView):
    def get(self,request,*args,**kwargs):
        sent = FriendRequest.objects.filter(from_user = request.user)

        if sent.exists():
            serializer_class = UserSerializer((s.to_user for s in sent),many = True)
            return Response(serializer_class.data,status =  status.HTTP_200_OK)

        return Response(status = status.HTTP_200_OK)

class AcceptFriendRequestAPI(APIView):
    def post(self,request,requestID,*args,**kwargs):
        from_user = User.objects.get(id = requestID)

        friend_request = FriendRequest.objects.get(to_user = request.user,from_user = from_user)

        if friend_request.to_user == request.user:
            friend_request.to_user.friends.add(friend_request.from_user)
            friend_request.from_user.friends.add(friend_request.to_user)
            friend_request.delete()
            return Response(status = status.HTTP_200_OK)
    
        return Response(status = status.HTTP_400_BAD_REQUEST)

class GetFriendsAPI(APIView):
    def get(self,request,*args,**kwargs):
        if request.user.friends:
            serializer_class = UserSerializer(request.user.friends,many = True)
            return Response(serializer_class.data,status = status.HTTP_200_OK)
            
        return Response(status = status.HTTP_200_OK)

class RemoveSentRequestAPI(APIView):
    def post(self,request,userID,*args,**kwargs):
        user = User.objects.get(id = userID)
        friend_request = FriendRequest.objects.get(to_user = user)
        friend_request.delete()
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
