
from django.urls import path
from .views import index

urlpatterns = [
 path('',index),
 path('home/',index),
 path('register/',index),
 path('login/',index),
 path('search',index),
 path('requests',index),
 path('sent',index),
 path('chat/<str:username>',index)
]
