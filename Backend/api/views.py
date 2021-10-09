import math
from datetime import date, timedelta
from api.models import User, IncomeSource, Income, Payment, Interval
from api.helpers import apply_tax
from api.serializers import UserSerializer, UserIncomeSourceSerializer, IncomeSerializer, PaymentSerializer, IntervalSerializer
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from django.db.models import Sum, F, Avg

INTERVALS_PER_PERIOD = 2
DAYS_IN_INTERVAL = 14

# Create your views here.
def index(request):
    return HttpResponse('Hello world')

def get_average_incomes(interval_id, num):

    c_i = Interval.objects.filter(id=interval_id).first()
    avg_i = Interval.objects.filter(end_date__lte=c_i.end_date).order_by('-start_date')[:num]
    real_num = len(avg_i)
    sd = avg_i[len(avg_i) - 1].start_date
    ed = avg_i[0].end_date

    incs = Income.objects.filter(date__gte=sd, date__lte=ed)
    avg_incs = incs.values('incomesource__user').annotate(user=F('incomesource__user'), amount=Avg('amount')).values('user', 'amount')
    return [avg_incs,real_num]

@api_view(['GET'])
def tax(request, interval):
    """ GET the tax due for a specific interval """
    num = int(request.GET.get('num', 2))
    [avg_incs,real_num] = get_average_incomes(interval, num)
    amount_arr = [inc['amount'] for inc in avg_incs]
    user_arr = [inc['user'] for inc in avg_incs]
    income_dict = dict(zip(user_arr, amount_arr))
    pay_dict = apply_tax(income_dict)

    return Response({'pay_dict':pay_dict, 'num':real_num})
    
class IntervalLatestListView(APIView):
    def add_latest_intervals(self, c_d, l_i):
        d_d = c_d - l_i.end_date
        i_to_add = math.ceil(d_d.days / DAYS_IN_INTERVAL)
        for _ in range(i_to_add):
            i_l = Interval.objects.all().order_by('-end_date').first()
            n_sd = i_l.end_date + timedelta(days=1)
            n_ed = n_sd + timedelta(days= DAYS_IN_INTERVAL - 1)
            Interval.objects.create(start_date=n_sd, end_date=n_ed)

    def get(self, request):
        l_i = Interval.objects.all().order_by('-end_date').first()
        #Check if the current date is inside the latest interval
        c_d = date.today()
        if c_d > l_i.end_date:
            self.add_latest_intervals(c_d, l_i)
        intervals = Interval.objects.all().order_by('-end_date')
        serializer = IntervalSerializer(intervals, many=True)
        return Response(serializer.data)

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserIncomeSourceListView(APIView):
    def get(self,request, user):
        income_sources = IncomeSource.objects.filter(user_id=user)
        serializer = UserIncomeSourceSerializer(income_sources, many=True)
        return Response(serializer.data)


class IntervalPaymentsListView(APIView):
    def get(self, request, interval):
        payments = Payment.objects.filter(interval_id=interval)
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)


class IncomeView(generics.CreateAPIView):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

class PaymentView(generics.CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
