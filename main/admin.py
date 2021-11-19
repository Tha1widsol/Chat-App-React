from django.contrib import admin
from .models import User,FriendRequest,Chat,ChatRoom

admin.site.register(User)
admin.site.register(FriendRequest)
admin.site.register(Chat)
admin.site.register(ChatRoom)


