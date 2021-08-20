from django.urls import path,include
from .views import RoomView,CreateRoomView

urlpatterns = [
    path("home",RoomView.as_view()),
     path('create-room', CreateRoomView.as_view())
   
]