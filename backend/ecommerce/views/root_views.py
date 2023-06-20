from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['GET']) # changes view in development server to api_view
def getRoutes(request):
    routes=[
        'api/products/',
        'api/products/create/',
        'api/products/upload/',
        'api/products/<id>/reviews/',
        'api/products/top/',
        'api/products/<id>/',
        'api/products/delete/<id>/',
        'api/products/<update>/<id>/',
        'api/products/delete/<id>/',
        'api/products/create/',
        'api/products/upload/',
        '--------------------',
        'api/users/login/',
        'api/users/profile/',
        'api/users/register/',
        'api/users/'
    ]
    return Response(routes)