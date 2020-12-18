from rest_framework import serializers 
import re
import calendar
from datetime import datetime
from creditcard import CreditCard

from .models import CreditCardModel

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCardModel
        fields = '__all__'

    def validate_exp_date(self, value):
        #verify if date is mm/yy
        try:
            date = datetime.strptime(value,"%m/%y")
        except ValueError:
            raise serializers.ValidationError("Invalid exp_date")
        
        #get last day from date and verify if date is in the past
        lastDayMonth = calendar.monthrange(date.year, date.month)[1]
        newDate = str(date.year) + '-' + str(date.month) + '-' + str(lastDayMonth)
        if datetime.today().strftime('%Y-%m-%d') > newDate :
            raise serializers.ValidationError("exp_date is a past date")
            
        return newDate

    def validate_holder(self, value):
        #verify if holder has more than 2 characters
        if len(value) <= 2:
            raise serializers.ValidationError("hold has less than (or only) 2 characters")
                    
        return value

    def validate_number(self, value):
        cc = CreditCard(value)
        #verify if creditcard is valid
        if cc.is_valid() is False:
            raise serializers.ValidationError("number is not valid")
                            
        return value

    def validate_cvv(self, value):
        #verify if cvv has less than 3 numbers and more than 4 number
        cvv = str(value)
        if len(cvv) < 3:
            raise serializers.ValidationError("cvv has less than 3 numbers")
        if len(cvv) > 4:
            raise serializers.ValidationError("cvv has more than 4 numbers")
                    
        return value