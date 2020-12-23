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
    data ={
        "username": username,
        "password": password
        }

    response = requests.post('http://127.0.0.1:8000/api/v1/token-auth',data)
    assert response.status_code == status_code


def test_creditcard_get_api():
   headers = {'Authorization': 'Token f1abc72c59dc232f61057ce68f37d2093c7ab171'}
   response = requests.get('http://127.0.0.1:8000/api/v1/credit-card', headers=headers)
   assert response.status_code == 200



@pytest.mark.parametrize(
   'exp_date, holder, number, cvv, status_code', [
        ("02/22", "Fulano", "4539578763621486", "311", 201), #success
        ("02/22", "Fulano", "4539578763621486", "", 201), #success
        ("02/20", "Ciclano", "4539578763621486", "311", 400), #error exp_date is a past date
        ("13/20", "Ciclano", "4539578763621486", "311", 400), #error exp_date is not valid
        ("02-02-22", "Ciclano", "4539578763621486", "311", 400), #error exp_date is not valid
        ("02/23", "a", "4539578763621486", "311", 400), #error holder has less than 2 characters
        ("02/23", "Ciclano", "4539578763621400", "311", 400), #error number is not valid
        ("02/23", "Ciclano", "4539578763621400", "31145", 400), #error cvv has more than 4 characters
        ("02/22", "Fulano", "4539578763621486", "12", 400), #error cvv has less than 3 characters
    ]
)
def test_creditcard_post_api(exp_date, holder, number, cvv, status_code):
    data = {
        "exp_date": exp_date, 
        "holder": holder, 
        "number": number, 
        "cvv": cvv
    }
    headers = {'Authorization': 'Token f1abc72c59dc232f61057ce68f37d2093c7ab171'}
    response = requests.post('http://127.0.0.1:8000/api/v1/credit-card', headers=headers, data=json.dumps(data))
   
    assert response.status_code == status_code