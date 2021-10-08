from django.urls import path,include
from knox import views as knox_views
from . import views

urlpatterns = [
path('users',views.UserViewSet,name = "users"),
path('current_user',views.currentUser,name="user"),
path('search',views.SearchAPI.as_view(),name="search"),
path('auth/register',views.RegisterAPI.as_view()),
path('auth/login',views.LoginAPI.as_view()),
path('auth/logout',knox_views.LogoutView.as_view(),name='knox_logout')

   
]