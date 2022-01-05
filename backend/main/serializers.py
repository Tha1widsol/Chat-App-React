from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']

class CreateChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['message']

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['message','sender','timestamp']

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'
        
class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = '__all__'