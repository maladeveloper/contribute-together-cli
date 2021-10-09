import json
from datetime import date, timedelta
from django.forms.models import model_to_dict
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from ..models import User, IncomeSource, Income, Interval, Payment
from ..serializers import UserSerializer

# initialize the APIClient app
client = Client()

class UserListTest(TestCase):
    """ GET All the Users API """
    user_keys = ['id', 'name']    

    def setUp(self):
        for i in range(3):
            User.objects.create(id='TES000' + str(i), name='Test ' + str(i))

    def test_get_all_users(self):
        #get API response
        response = client.get('/api/users/')
        ##get from db
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        for i in range(len(response.data)):
            user = response.data[i]
            self.assertEqual(dict(user), {'id':'TES000' + str(i), 'name':'Test ' + str(i)})

class UserIncomeSourceListTest(TestCase):
    """ GET the sources of income given an user's Id"""
    def setUp(self):
        User.objects.create(id='TEST000', name='Test')
        IncomeSource.objects.create(name='TestIncomeSource', user_id='TEST000')

    def test_get_user_income_sources(self):
        response = client.get('/api/income-sources/TEST000/')
        self.assertEqual(response.data[0]['name'],'TestIncomeSource')
        self.assertEqual(list(response.data[0].keys()).sort(),['name', 'id'].sort())
        

class IncomeTest(TestCase):

    def setUp(self):
        user = User.objects.create(id='TEST000', name='Test')
        income_source = IncomeSource.objects.create(name='TestIncomeSource', user_id=user.id)

    def test_post_income(self):
        income_source = IncomeSource.objects.first()
        user = User.objects.first()
        income_obj = { 'incomesource':income_source.id, 'amount':99, 'date':'2021-10-07' }
        response = client.post('/api/income/', json.dumps(income_obj), content_type='application/json')
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        inc_from_db = model_to_dict(Income.objects.first())
        del inc_from_db['id']
        inc_from_db['date'] = inc_from_db['date'].strftime('%Y-%m-%d')
        self.assertEqual(inc_from_db, income_obj)

class PaymentTest(TestCase):

    def setUp(self):
        user = User.objects.create(id='TEST000', name='Test')
        interval  = Interval.objects.create(start_date='2021-10-04', end_date='2021-10-17')

    def test_post_payment(self):
        interval  = Interval.objects.first()
        user = User.objects.first()
        payment_obj = { 'interval':interval.id, 'user':user.id, 'amount':99}
        response = client.post('/api/payment/', json.dumps(payment_obj), content_type='application/json')
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        pay_from_db = model_to_dict(Payment.objects.first())
        del pay_from_db['id']
        self.assertEqual(pay_from_db, payment_obj)

class TaxTest(TestCase):

    def create_models(self):

        user0 = User.objects.create(id='TEST000', name='Test0')
        user1 = User.objects.create(id='TEST001', name='Test1')
        user2 = User.objects.create(id='TEST002', name='Test2')

        #Create 2 intervals before the target interval and 1 interval after - total 4 intervals
        #Before intervals 
        interval0  = Interval.objects.create(start_date='2021-09-06', end_date='2021-09-19')
        interval1  = Interval.objects.create(start_date='2021-09-20', end_date='2021-10-03')
        #Target interval
        target_interval  = Interval.objects.create(start_date='2021-10-04', end_date='2021-10-17')
        #After interval
        interval3  = Interval.objects.create(start_date='2021-10-18', end_date='2021-10-31')

        income_source0 = IncomeSource.objects.create(name='TestIncomeSource', user_id=user0.id)
        income_source1 = IncomeSource.objects.create(name='TestIncomeSource', user_id=user1.id)
        income_source2 = IncomeSource.objects.create(name='TestIncomeSource', user_id=user2.id)

        #User 1 has income in interval directly before target interval
        before_income0 = Income.objects.create(incomesource_id=income_source0.id, amount=2000, date='2021-09-23')
        #All other users have income in target interval
        income0 = Income.objects.create(incomesource_id=income_source0.id, amount=500, date='2021-10-07')
        income1 = Income.objects.create(incomesource_id=income_source1.id, amount=500, date='2021-10-07')
        income2 = Income.objects.create(incomesource_id=income_source2.id, amount=500, date='2021-10-07')
        return target_interval 

    def test_with_all_user_incomes(self):
        
        target_interval = self.create_models()
        url =   '/api/tax/' + str( target_interval.id) + '?num=99'
        response = client.get(url ,follow=True)

        user_ids = [user.id for user in User.objects.all()]
        correct_payments = [833, 133, 133]
        correct_dict = dict(zip(user_ids,correct_payments))
        self.assertEqual(response.data['pay_dict'], correct_dict)
        self.assertEqual(response.data['num'], 3)

class IntervalListTest(TestCase):

    def create_intervals(self):
        #Create a seed interval far in the past
        sd = date.today()
        Interval.objects.create(start_date=sd - timedelta(61), end_date= sd - timedelta(48))
        return Interval.objects.create(start_date=sd - timedelta(47), end_date=sd - timedelta(34))
    
    def test_get_intervals(self):
        latest_interval = self.create_intervals()
        response = client.get('/api/intervals/', follow=True)
        sd = date.today()
        i_s = Interval.objects.all().order_by('-end_date')
        self.assertEqual(len(i_s), 5)
        l_i = i_s.first()
        self.assertEqual(l_i.end_date, sd + timedelta(8))
        self.assertEqual(l_i.start_date, sd - timedelta(5))

class IntervalPaymentsTest(TestCase):

    def create_models(self):
        #Create an interval for payment to be associated with
        interval  = Interval.objects.create(start_date='2021-09-06', end_date='2021-09-19')

        #Create 3 users to associate the intervals with
        user0 = User.objects.create(id='TEST000', name='Test0')
        user1 = User.objects.create(id='TEST001', name='Test1')
        user2 = User.objects.create(id='TEST002', name='Test2')

        #Create payments associated with each user and the interval
        payment0 = Payment.objects.create(user_id = user0.id, interval_id=interval.id, amount=10)
        payment1 = Payment.objects.create(user_id = user1.id, interval_id=interval.id, amount=10)
        payment2 = Payment.objects.create(user_id = user2.id, interval_id=interval.id, amount=10)
        return interval

    def test_get_payments_per_existing_interval(self):
        interval = self.create_models()
        db_pays  = Payment.objects.all()
        response = client.get('/api/payment/' + str(interval.id) , follow=True)
        expected_pays = sorted([model_to_dict(pay) for pay in db_pays], key= lambda d: d['id'])
        received_pays = sorted([dict(pay) for pay in response.data], key=lambda d: d['id'])
        self.assertEqual(expected_pays, received_pays)
        self.assertEqual(len(response.data), 3)

    def test_get_payments_per_non_existing_interval(self):
        interval = self.create_models()
        response = client.get('/api/payment/' + str(interval.id + 999) , follow=True)
        self.assertEqual(len(response.data), 0)