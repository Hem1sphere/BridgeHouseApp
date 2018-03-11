from django.urls import path
from django.contrib.auth.views import login, logout
from . import views

urlpatterns = [
    path('login/', login, {'template_name': 'accounts/login.html'}),
    path('logout/', logout, {'template_name': 'accounts/logout.html'}),
]
