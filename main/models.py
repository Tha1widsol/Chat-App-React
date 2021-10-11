from django.db import models
from django.contrib.auth.models import User

class Add(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    friend = models.ForeignKey(User, related_name='friend',on_delete=models.CASCADE,blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)



