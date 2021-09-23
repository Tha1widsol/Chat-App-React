from django.urls import path,include
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
path('users',views.UserViewSet,name = "users"),
path('auth/register',views.RegisterAPI.as_view()),
path('auth/login',views.LoginAPI.as_view()),
path('auth/logout',views.Logout.as_view())

   
]