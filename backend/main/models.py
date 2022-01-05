from django.db import models
from accounts.models import User

# Create your models here.

class FriendRequest(models.Model):
    from_user = models.ForeignKey(User,related_name='from_user',on_delete=models.CASCADE)
    to_user = models.ForeignKey(User,related_name='to_user',on_delete=models.CASCADE)


class ChatRoom(models.Model):
    name = models.CharField(max_length=500,blank = True)
    members = models.TextField()
    host = models.CharField(max_length=50,blank = True)
    
class Chat(models.Model):
    message = models.TextField()
    sender = models.CharField(max_length=50)
    room = models.ForeignKey(ChatRoom,on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)

