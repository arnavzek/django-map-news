from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("messages/", views.index, name="index"),
    path("message/", views.add, name="location"),
]
