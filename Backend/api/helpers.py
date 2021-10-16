from api.models import User, IncomeSource, Income, Payment, Interval
from django.db.models import Sum, F, Avg
import pdb

INTERVALS_PER_PERIOD = 2
TOTAL_TAX = 1100
DEGREE_POLY = 1 
'''
Applies tax on the user's income and returns the tax value.
Input:Income per user e.g { MAL001':750, 'SRI001':800, 'ANU001':370, 'MAI001':290}
Output: Tax per user e.g {'MAL001': 296, 'SRI001': 337, 'ANU001': 72, 'MAI001': 44}
'''
def apply_tax(user_dict):
    income_list = [i for i in user_dict.values()]

    try:
        div_amount = TOTAL_TAX / sum([income**(DEGREE_POLY + 1) for income in income_list]) 
    except ZeroDivisionError: #Triggered if all income is 0.
        return {user_name:0 for user_name in user_dict.keys()}

    tax_dict = dict()
    for user_name, user_income  in user_dict.items():
        tax_dict[user_name] = round(div_amount * user_income ** (DEGREE_POLY + 1))

    return tax_dict

def get_average_incomes(interval_id):
    c_i = Interval.objects.filter(id=interval_id).first()
    avg_i = Interval.objects.filter(end_date__lte=c_i.end_date).order_by('-start_date')[:INTERVALS_PER_PERIOD]
    real_num = len(avg_i)
    sd = avg_i[len(avg_i) - 1].start_date
    ed = avg_i[0].end_date

    incs = Income.objects.filter(date__gte=sd, date__lte=ed)
    avg_incs = incs.values('incomesource__user').annotate(user=F('incomesource__user'), amount=(Sum('amount')/INTERVALS_PER_PERIOD)).values('user', 'amount')
    return avg_incs

def get_tax_dict(interval_id):
    avg_incs = get_average_incomes(interval_id)
    amount_arr = [inc['amount'] for inc in avg_incs]
    user_arr = [inc['user'] for inc in avg_incs]
    income_dict = dict(zip(user_arr, amount_arr))
    return apply_tax(income_dict)

