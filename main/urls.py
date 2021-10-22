from django.urls import path
from knox import views as knox_views
from . import views

urlpatterns = [
path('users',views.UserViewSet,name = "users"),
path('current_user',views.currentUser,name="user"),
path('search',views.SearchAPI.as_view(),name="search"),
path('add',views.AddAPI.as_view(),name="added"),
path('sent',views.GetSentAPI.as_view(),name="sent"),
path('requests',views.GetRequestsAPI.as_view(),name="requests"),
path('friends',views.GetFriendsAPI.as_view(),name="friends"),
path('remove_request',views.RemoveRequest.as_view(),name="remove_request"),
path('auth/register',views.RegisterAPI.as_view()),
path('auth/login',views.LoginAPI.as_view()),
path('auth/logout',knox_views.LogoutView.as_view(),name='knox_logout')

   
]