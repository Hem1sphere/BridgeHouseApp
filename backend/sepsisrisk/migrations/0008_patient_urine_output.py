# Generated by Django 2.0.2 on 2018-03-09 00:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sepsisrisk', '0007_patient_date_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='urine_output',
            field=models.CharField(blank=True, choices=[(None, ''), ('Normal', 'Normal'), ('Reduced', 'Reduced urine output'), ('None 12-18 hrs', 'Not passed urine for 12-18 hours'), ('None over 18 hours', 'Not passed urine for over 18 hours')], max_length=2, null=True),
        ),
    ]