# Generated by Django 3.2.7 on 2021-10-03 10:21
# pylint: disable=no-member

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20211003_0303'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Incomes',
            new_name='Income',
        ),
        migrations.RenameModel(
            old_name='IncomeSources',
            new_name='IncomeSource',
        ),
        migrations.RenameModel(
            old_name='Intervals',
            new_name='Interval',
        ),
        migrations.RenameModel(
            old_name='Payments',
            new_name='Payment',
        ),
        migrations.RenameModel(
            old_name='Users',
            new_name='User',
        ),
    ]
