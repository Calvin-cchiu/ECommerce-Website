# All models data retrieved from databases used in views need to be serialized first  
# Serializer is a way to convert data to JSON format

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

# import all models
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    # Work around
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','_id', 'username', 'email', 'name', 'isAdmin']
    
    def get__id(self, obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff

    # Work around to get full name as name, otherwise will need to override databases model
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','_id', 'username', 'email', 'name', 'isAdmin', 'token']
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__' # all fields in model
        # fields = ['id', 'name', 'image', 'brand', 'category', 'description', 'rating', 'numReviews', 'price', 'countInStock'] # specific fields in model


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__' # all fields in model


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__' # all fields in model


class OrderSerializer(serializers.ModelSerializer):

    order_items = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user_id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__' # all fields in model
    
    def get_order_items(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            serializer = ShippingAddressSerializer(obj.shippingaddress, many=False)
        except:
            return False
        return serializer.data

    def get_user_id(self, obj):
        user = obj.user_id
        serializer = UserSerializer(user, many=False)
        return serializer.data

