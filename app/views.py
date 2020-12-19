#from django.shortcuts import render
from django.http.response import JsonResponse

from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import CreditCardModel
from .serializers import CreditCardSerializer



class CreditCardView(APIView):
    permission_classes = (IsAuthenticated,) 

    def get(self, request):
        allCreditCard = CreditCardModel.objects.all()
        creditCardId = request.query_params.get('id', None)
        if creditCardId is not None:
            result = allCreditCard.filter(id__icontains=creditCardId)
        else:
            result = allCreditCard
            
        serializer_result = CreditCardSerializer(result, many=True)
        return JsonResponse(serializer_result.data, safe=False)

    def post(self, request):
        data = JSONParser().parse(request)
        dataSerializer = CreditCardSerializer(data=data)
        if dataSerializer.is_valid(raise_exception=True):
            dataSerializer.save()
            return JsonResponse(dataSerializer.data, status=status.HTTP_201_CREATED)
        
        return JsonResponse(dataSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
