# Generated by Django 2.0.2 on 2018-03-10 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sepsisrisk', '0018_auto_20180310_1420'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='date_created',
            field=models.DateField(auto_now=True),
        ),
    ]
