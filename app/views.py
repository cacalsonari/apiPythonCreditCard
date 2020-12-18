#from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser

from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework import status

from .models import CreditCardModel
from .serializers import CreditCardSerializer



class CreditCardView(generics.ListCreateAPIView):
    queryset = CreditCardModel.objects.all()
    serializer_class = CreditCardSerializer

@api_view(['GET', 'POST'])
def CreditCardList(request):
    if request.method == 'GET':
        allCreditCard = CreditCardModel.objects.all()
        creditCardId = request.query_params.get('key', None)
        if creditCardId is not None:
            result = allCreditCard.filter(id__icontains=creditCardId)
        else:
            result = allCreditCard
        
        serializer_result = CreditCardSerializer(result, many=True)
        return JsonResponse(serializer_result.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        dataSerializer = CreditCardSerializer(data=data)
        if dataSerializer.is_valid(raise_exception=True):
            dataSerializer.save()
            return JsonResponse(dataSerializer.data, status=status.HTTP_201_CREATED)
        
        return JsonResponse(dataSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
