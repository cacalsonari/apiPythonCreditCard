import json
import pytest
import requests
from django.urls import reverse



@pytest.mark.parametrize(
   'username, password, status_code',[
        ('admin', 123456, 200), #success
        ('test', 123, 400) #error
    ]
)
def test_authentication_api(username, password, status_code):
    #url = reverse('api/v1/token-auth')
    data ={
        "username": username,
        "password": password
        }

    response = requests.post('http://127.0.0.1:8000/api/v1/token-auth',data)
    assert response.status_code == status_code


def testCreditCardGetAPI():
   #url = reverse('api/v1/credit-card')
   headers = {'Authorization': 'Token 67366fe5dab79adbddce5d3f9bf582a3407056a9'}
   response = requests.get('http://127.0.0.1:8000/api/v1/credit-card', headers=headers)
   assert response.status_code == 200



@pytest.mark.parametrize(
   'exp_date, holder, number, cvv, status_code', [
        ("02/22", "Fulano", "4539578763621486", 311, 201), #success
        ("02/20", "Ciclano", "4539578763621486", 311, 400), #error exp_date is a past date
        ("13/20", "Ciclano", "4539578763621486", 311, 400), #error exp_date is not valid
        ("02/23", "a", "4539578763621486", 311, 400), #error holder has less than 2 characters
        ("02/23", "Ciclano", "4539578763621400", 311, 400), #error number is not valid
        ("02/23", "Ciclano", "4539578763621400", 31145, 400), #error cvv has more than 4 characters
    ]
)
def testCreditCardPostAPI(exp_date, holder, number, cvv, status_code):
    #url = reverse('api/v1/credit-card')
    data = {
        "exp_date": exp_date, 
        "holder": holder, 
        "number": number, 
        "cvv": cvv
    }
    headers = {'Authorization': 'Token 67366fe5dab79adbddce5d3f9bf582a3407056a9'}
    response = requests.post('http://127.0.0.1:8000/api/v1/credit-card', headers=headers, data=json.dumps(data))
   
    assert response.status_code == status_code