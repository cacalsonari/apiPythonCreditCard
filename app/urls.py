from django.conf.urls import url 
from . import views 
 
urlpatterns = [ 
    url(r'^api/v1/credit-card$', views.CreditCardList, name='creditcard-list')
]