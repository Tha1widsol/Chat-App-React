from django.urls import path
from . import views

urlpatterns = [
    path('current_user',views.currentUser.as_view(),name="user"),
    path('search',views.SearchAPI.as_view(),name="search"),
    path('user/<int:userID>',views.SendFriendRequestAPI.as_view(),name="send_friend_request"),
    path('requests',views.GetFriendRequestsAPI.as_view(),name="friend_requests"),
    path('sent',views.GetSentFriendRequests.as_view(),name="sent_requests"),
    path('accept_friend/<int:requestID>',views.AcceptFriendRequestAPI.as_view(),name="accept_friend"),
    path('get_friends',views.GetFriendsAPI.as_view(),name="get_friends"),
    path('save_message',views.SaveMessageAPI.as_view(),name="send_message"),
    path('get_rooms',views.GetRoomsAPI.as_view(),name="get_rooms"),
    path('create_room',views.CreateRoomAPI.as_view(),name="create_room"),
    path('edit_room/<int:roomID>',views.EditRoomAPI.as_view(),name="edit_room"),
    path('room/<int:roomID>',views.RoomAPI.as_view(),name="room"),
    path('get_chat/<int:roomID>',views.GetChatAPI.as_view(),name="get_chat"),
    path('remove_sent/<int:userID>',views.RemoveSentRequestAPI.as_view(),name="remove_sent"),
    path('remove_room/<int:roomID>',views.RemoveRoomAPI.as_view(),name="remove_room"),
]