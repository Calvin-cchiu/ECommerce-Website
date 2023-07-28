from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from ecommerce.models import Product, Review
from ecommerce.serializers import ProductSerializer

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    # fetch all products or filter by keyword
    products = Product.objects.all() if query == None else Product.objects.filter(name__icontains=query) # i for case-insensitive
    page = request.query_params.get('page')

    # display only 8 products per page
    paginator = Paginator(products, 8)

    if page == None:
        page = 1
    page = int(page)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(2)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    
    serializer = ProductSerializer(products, many=True) # many: serialize multiple objects or single object, this case we selected all so it's many
    return Response({'products':serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopProducts(request):
    # fetch top 5 rating products that have rating >= 4
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# List Single Product by ID
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False) # many: serialize multiple objects or single object, this case we selected single
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user_id=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        count_in_stock=0,
        category='Sample Category',
        description='Sample Description'
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.count_in_stock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


# delete Single Product by ID
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    product = Product.objects.get(_id=pk)
    user = request.user
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user_id=user).exists()  # boolean
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=400)

    # 2 - No Rating or 0, minimum rating is 1
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=400)

    # 3 - Create Review
    else:
        review = Review.objects.create(
            user_id=user,
            product_id=product,
            title=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )

        # fetch all reviews
        reviews = product.review_set.all()
        # how many of total reviews
        product.num_reviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating
        # average product rating
        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')






