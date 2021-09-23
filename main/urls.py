from django.urls import path,include
from . import views

urlpatterns = [
path('users',views.UserViewSet,name = "users"),
path('auth/register',views.RegisterAPI.as_view()),
path('auth/login',views.LoginAPI.as_view())

   
]