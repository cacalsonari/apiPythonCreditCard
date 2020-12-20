import re
import calendar
import Crypto

from Crypto import Random
from Crypto.PublicKey import RSA

from datetime import datetime
from creditcard import CreditCard
from rest_framework import serializers

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
        if date.month < 10:
            month = '0' + str(date.month)
        else: 
            month = str(date.month)

        newDate = str(date.year) + '-' + month + '-' + str(lastDayMonth)
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
        #verify if credit card is valid
        if cc.is_valid() is False:
            raise serializers.ValidationError("number is not valid")

        #get brand from number and set in data
        try:
            self.initial_data['brand'] = cc.get_brand()
        except ValueError:
            raise serializers.ValidationError("brand not found for this number")
        
        #encrypt credit card number
        randomGenerator = Random.new().read
        key = RSA.generate(1024, randomGenerator) #generate public and privite key
        publickey = key.publickey() # public key export for exchange
        encryptedValue = publickey.encrypt(value.encode('utf-8'), 32)

        return encryptedValue

    def validate_cvv(self, value):
        #verify if cvv has less than 3 numbers and more than 4 number
        cvv = str(value)
        if len(cvv) < 3:
            raise serializers.ValidationError("cvv has less than 3 numbers")
        if len(cvv) > 4:
            raise serializers.ValidationError("cvv has more than 4 numbers")
                    
        return value  