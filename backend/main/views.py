
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *

# Create your views here.

class currentUser(APIView):
    def get(self,request):
        serializer_class = UserSerializer(request.user)
        return Response(serializer_class.data)

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
            new_room = ChatRoom(members = friend_request.from_user.username + "," + friend_request.to_user.username)
            new_room.save()
            return Response(status = status.HTTP_200_OK)
    
        return Response(status = status.HTTP_400_BAD_REQUEST)

class GetFriendsAPI(APIView):
    def get(self,request,*args,**kwargs):
        if request.user.friends:
            serializer_class = UserSerializer(request.user.friends,many = True)
            return Response(serializer_class.data,status = status.HTTP_200_OK)
            
        return Response(status = status.HTTP_400_BAD_REQUEST)

class GetRoomsAPI(APIView):
    def get(self,request,*args,**kwargs):
        rooms = ChatRoom.objects.filter(members__contains = request.user.username)
        serializer_class = ChatRoomSerializer(rooms,many = True)
        return Response(serializer_class.data,status = status.HTTP_200_OK)

class RoomAPI(APIView):
    def get(self,request,roomID,*args,**kwargs):
        room = ChatRoom.objects.get(id = roomID,members__contains = request.user.username)
        if room:
            Serializer_class = ChatRoomSerializer(room)
            return Response(Serializer_class.data,status = status.HTTP_200_OK)

        return Response(status = status.HTTP_400_BAD_REQUEST) 

class CreateRoomAPI(APIView):
     serializer_class = ChatRoomSerializer

     def post(self,request,*args,**kwargs):
         serializer = self.serializer_class(data = request.data)

         if serializer.is_valid():
             name = serializer.data.get('name')
             members = serializer.data.get('members')
             host = serializer.data.get('host')
             room = ChatRoom(name = name,members = members,host = host)
             room.save()
             
             return Response(status = status.HTTP_200_OK) 

         return Response(status = status.HTTP_400_BAD_REQUEST) 

class EditRoomAPI(APIView):
     serializer_class = ChatRoomSerializer

     def put(self,request,roomID,*args,**kwargs):
         serializer = self.serializer_class(data = request.data)
         room = ChatRoom.objects.get(id = roomID)

         if serializer.is_valid():
             room.name = serializer.data.get('name')
             room.members = serializer.data.get('members')
             room.host = serializer.data.get('host')
             room.save(update_fields = ['name','members','host'])
             
             return Response(status = status.HTTP_200_OK) 

         return Response(status = status.HTTP_400_BAD_REQUEST) 


class SaveMessageAPI(APIView):
    serializer_class = CreateChatSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.serializer_class(data = request.data)

        if serializer.is_valid():
            message = serializer.data.get('message')
            roomID = request.data.get('roomID')
            room = ChatRoom.objects.get(id = roomID)
            chat = Chat(message = message,sender = request.user,room = room)
            chat.save()
    
            return Response(status = status.HTTP_200_OK)  

        return Response(status = status.HTTP_400_BAD_REQUEST) 

      
class GetChatAPI(APIView):
    def get(self,request,roomID,*args,**kwargs):
        room = ChatRoom.objects.get(id = roomID)
        chat = Chat.objects.filter(room = room)
      
        for message in chat:
            if message.sender == request.user.username:
                message.sender = "You"

        serializer_class = ChatSerializer(chat,many = True)
        return Response(serializer_class.data,status = status.HTTP_200_OK)
            

class RemoveSentRequestAPI(APIView):
    def delete(self,request,userID,*args,**kwargs):
        user = User.objects.get(id = userID)
        friend_request = FriendRequest.objects.get(to_user = user)
        friend_request.delete()
        return Response(status = status.HTTP_200_OK)

class RemoveRoomAPI(APIView):
    def delete(self,request,roomID,*args,**kwargs):
        room = ChatRoom.objects.get(id = roomID)

        members = room.members.split(",")
        members.remove(request.user.username)

        friend = User.objects.get(username = members[0])
        
        if room:
            if not(room.name):
                request.user.friends.remove(friend)
                friend.friends.remove(request.user)
              
            room.delete()

            return Response(status = status.HTTP_200_OK)

        return Response(status = status.HTTP_400_BAD_REQUEST)






