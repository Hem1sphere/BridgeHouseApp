from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import *
from .function import *

@login_required
def sepsisrisk(request):
    if request.method == 'POST':
        patient_vitals_form = PatientVitalsForm(request.POST)
        mental_state_form = MentalStateForm(request.POST)
        skin_condition_form = SkinConditionForm(request.POST)
        if patient_vitals_form.is_valid():
            patient_vitals = patient_vitals_form.cleaned_data
            mental_state = get_checkboxes(request, 'ms', 12) # Create dictionary with status of each mental state checkbox
            skin_condition = get_checkboxes(request, 'skin', 9)
            patient_age = calc_age(patient_vitals['birth_date'])
            patient_risk = {  # For risk analysis - 0: low risk; 1: moderate risk; 2: high risk
                'temp': 0,
                'pulse': 0,
                'resp_rate': 0,
                'sys_blood_pressure': 0,
                'cap_refill_time': 0,
                'o2_stats': 0,
                'urine_output': 0,
                'result': 0,
            }
            parameter_analysis(patient_age, patient_vitals, mental_state, skin_condition, patient_risk)
            patient_vitals_form.save()
            args = {'vitals_form': patient_vitals_form, 'vitals': patient_vitals, 'ms_form': mental_state_form, 'skin_form': skin_condition_form, 'risk': patient_risk}
            return render(request, 'sepsisrisk/result.html', args)

    else:
        patient_vitals_form = PatientVitalsForm()
        mental_state_form = MentalStateForm()
        skin_condition_form = SkinConditionForm()

    args = {'vitals_form': patient_vitals_form, 'ms_form': mental_state_form, 'skin_form': skin_condition_form}
    return render(request, 'sepsisrisk/index.html', args)

def result(request):
    return render(request, 'sepsisrisk/result.html')
