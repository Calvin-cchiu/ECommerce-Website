from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from ecommerce.models import Product
from ecommerce.serializers import ProductSerializer

# List All Products
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True) # many: serialize multiple objects or single object, this case we selected all so it's many
    return Response(serializer.data)

# List Single Product by ID
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False) # many: serialize multiple objects or single object, this case we selected single
    return Response(serializer.data)