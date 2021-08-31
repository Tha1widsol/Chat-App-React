from django.urls import path,include
from .views import RoomView,CreateRoomView,GetRoom,JoinRoom

urlpatterns = [
    path("home",RoomView.as_view()),
     path('create-room', CreateRoomView.as_view()),
     path('get-room',GetRoom.as_view()),
     path('join-room', JoinRoom.as_view())
   
]