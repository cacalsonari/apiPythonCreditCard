from django.db import models

# Create your models here.

class CreditCardModel(models.Model):
    
    exp_date = models.CharField(max_length=10,blank=False)
    holder =  models.CharField(max_length=70, blank=False)
    number = models.CharField(max_length=16, blank=False)
    cvv = models.CharField(max_length=4,blank=True)
    brand = models.CharField(max_length=70, blank=True)