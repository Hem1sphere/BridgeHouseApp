# Generated by Django 2.0.2 on 2018-03-10 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sepsisrisk', '0017_auto_20180310_1358'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='urine_output',
            field=models.CharField(choices=[('Normal urine output', 'Normal'), ('Reduced urine output', 'Reduced urine output'), ('Not passed urine for 12-18 hours', 'Not passed urine for 12-18 hours'), ('Not passed urine for over 18 hours', 'Not passed urine for over 18 hours')], default='Normal', max_length=100),
        ),
    ]
