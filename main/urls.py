from django.urls import path
from knox import views as knox_views
from . import views

urlpatterns = [
path('users',views.UserViewSet,name = "users"),
path('current_user',views.currentUser,name="user"),
path('search',views.SearchAPI.as_view(),name="search"),
path('user/<int:userID>',views.SendFriendRequestAPI.as_view(),name="send_friend_request"),
path('requests',views.GetFriendRequestsAPI.as_view(),name="friend_requests"),
path('sent',views.GetSentFriendRequests.as_view(),name="sent_requests"),
path('accept_friend/<int:requestID>',views.AcceptFriendRequestAPI.as_view(),name="accept_friend"),
path('get_friends',views.GetFriendsAPI.as_view(),name="get_friends"),
path('save_message',views.SaveMessageAPI.as_view(),name="send_message"),
path('get_rooms',views.GetRoomsAPI.as_view(),name="get_rooms"),
path('room/<int:roomID>',views.RoomAPI.as_view(),name="room"),
path('get_chat/<int:roomID>',views.GetChatAPI.as_view(),name="get_chat"),
path('remove_sent/<int:userID>',views.RemoveSentRequestAPI.as_view(),name="remove_sent"),
path('remove_friend/<int:userID>',views.RemoveFriendAPI.as_view(),name="remove_friend"),
path('auth/register',views.RegisterAPI.as_view()),
path('auth/login',views.LoginAPI.as_view()),
path('auth/logout',knox_views.LogoutView.as_view(),name='knox_logout')

   
]