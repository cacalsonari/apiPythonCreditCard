from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url 
from . import views 
 
urlpatterns = [ 
    url(r'^api/v1/credit-card$', views.CreditCardView.as_view(), name='creditcard-view'),
    url(r'^api/v1/token-auth$', obtain_auth_token, name='api-token-auth')
]