from rest_framework import serializers
from .models import User,FriendRequest,Chat,ChatRoom
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','password')
        extra_kwargs = {'password':{'write_only':True}}
    
    def create(self,validate_data):
        user = User.objects.create_user(**validate_data)
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        
        raise serializers.ValidationError("Incorrect Credentials")


class FriendRequestSerializer(serializers.Serializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'
        

class ChatSerializer(serializers.Serializer):
    class Meta:
        model = Chat
        fields = ('messages')
