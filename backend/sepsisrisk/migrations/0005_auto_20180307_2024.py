# Generated by Django 2.0.2 on 2018-03-07 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sepsisrisk', '0004_auto_20180307_2023'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='blood_pressure',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='cap_refill_time',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='o2_stats',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='pulse',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='resp_rate',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='temp',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True),
        ),
    ]
