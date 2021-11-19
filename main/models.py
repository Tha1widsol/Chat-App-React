from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    friends = models.ManyToManyField("User",blank=True)

class FriendRequest(models.Model):
    from_user = models.ForeignKey(User,related_name='from_user',on_delete=models.CASCADE)
    to_user = models.ForeignKey(User,related_name='to_user',on_delete=models.CASCADE)

class Chat(models.Model):
    messages = models.CharField(max_length=1000)
    sender = models.ForeignKey(User,related_name='sender',on_delete=models.CASCADE)
    room = models.ForeignKey('ChatRoom',on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)


class ChatRoom(models.Model):
    name = models.CharField(max_length=500)