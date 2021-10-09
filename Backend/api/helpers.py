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
