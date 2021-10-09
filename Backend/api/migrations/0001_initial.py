# Generated by Django 3.2.7 on 2021-10-03 02:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='IncomeSources',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Intervals',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.CharField(max_length=8, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Payments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField()),
                ('interval_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.intervals')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.users')),
            ],
        ),
        migrations.CreateModel(
            name='Incomes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField()),
                ('date', models.DateField()),
                ('incomesource_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.incomesources')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.users')),
            ],
        ),
    ]
