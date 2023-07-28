from django.urls import path
from ecommerce.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name="products"),
    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),
    path('top/', views.getTopProducts, name="top-products"),
    path('<str:pk>/', views.getProduct, name="product"),
    path('<str:pk>/review/', views.createProductReview, name="create-review"),

    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),

]