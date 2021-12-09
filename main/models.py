from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    friends = models.ManyToManyField("User",blank=True)

class FriendRequest(models.Model):
    from_user = models.ForeignKey(User,related_name='from_user',on_delete=models.CASCADE)
    to_user = models.ForeignKey(User,related_name='to_user',on_delete=models.CASCADE)


class ChatRoom(models.Model):
    name = models.CharField(max_length=500,blank = True)
    members = models.TextField()
    
class Chat(models.Model):
    message = models.TextField()
    sender = models.CharField(max_length=50)
    room = models.ForeignKey(ChatRoom,on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)

 