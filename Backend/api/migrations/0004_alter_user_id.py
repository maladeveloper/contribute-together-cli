# Generated by Django 3.2.7 on 2021-10-03 10:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20211003_1021'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(max_length=7, primary_key=True, serialize=False),
        ),
    ]