from django.urls import path
from . import views

urlpatterns = [
    path('', views.sepsisrisk),
    path('result/', views.result),
]
