from django.urls import path
from ecommerce.views import order_views as views

urlpatterns = [

    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),

    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/paid/', views.updateOrderToPaid, name='order-paid'),
    path('<str:pk>/delivered/', views.updateOrderToDelivered, name='order-delivered'),
]