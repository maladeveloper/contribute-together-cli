from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('users/', views.UserListView.as_view()),
    path('income-sources/<str:user>/', views.UserIncomeSourceListView.as_view()),
    path('income/', views.IncomeView.as_view()), 
    path('payment/', views.PaymentView.as_view()),
    path('payment/<str:interval>/', views.IntervalPaymentsListView.as_view()),
    path('tax/<str:interval>/', views.tax),
    path('intervals/',views.IntervalLatestListView.as_view() ),
    
]
