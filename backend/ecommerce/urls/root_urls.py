from django.urls import path
from ecommerce.views import root_views as views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
]