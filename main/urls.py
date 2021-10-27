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
path('remove_sent/<int:userID>',views.RemoveSentRequestAPI.as_view(),name="remove_sent"),
path('auth/register',views.RegisterAPI.as_view()),
path('auth/login',views.LoginAPI.as_view()),
path('auth/logout',knox_views.LogoutView.as_view(),name='knox_logout')

   
]