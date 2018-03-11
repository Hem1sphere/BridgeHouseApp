from django.db import models
from django.forms import ModelForm
from django import forms

class Patient(models.Model):
    date_created = models.DateField(auto_now=True)
    nhs_no = models.BigIntegerField()
    birth_date = models.DateField()
    temp = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    pulse = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    resp_rate = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    blood_pressure = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    cap_refill_time = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    o2_stats = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    URINE_OUTPUT_CHOICES = (
        ('Normal urine output', 'Normal'),
        ('Reduced urine output', 'Reduced urine output'),
        ('Not passed urine for 12-18 hours', 'Not passed urine for 12-18 hours'),
        ('Not passed urine for over 18 hours', 'Not passed urine for over 18 hours')
    )
    urine_output = models.CharField(max_length=100, choices=URINE_OUTPUT_CHOICES, default='Normal')
    risk = None

class PatientVitalsForm(ModelForm):
    class Meta:
        model = Patient
        fields = ['nhs_no', 'birth_date', 'temp', 'pulse', 'resp_rate', 'blood_pressure', 'cap_refill_time', 'o2_stats', 'urine_output']
        labels = {
            'birth_date': 'Date of Birth',
            'nhs_no': 'NHS Number',
            'temp': 'Temperature',
            'pulse': 'Pulse',
            'resp_rate': 'Respiratory Rate',
            'blood_pressure': 'Blood Pressure',
            'cap_refill_time': 'Capillary Refill Time',
            'o2_stats': 'Oxygen Saturation',
            'urine_output': 'Urine Output'
        }
        widgets = {    # Set attributes for styling
            'birth_date': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'DD/MM/YY', 'maxlength': '10'}),
            'nhs_no': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '10-digit NHS number', 'maxlength': '10'}),
            'temp': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'ºC'}),
            'pulse': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'BPM'}),
            'resp_rate': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'RR'}),
            'blood_pressure': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'mmHg'}),
            'cap_refill_time': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'seconds'}),
            'o2_stats': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '%'}),
            'urine_output': forms.Select(attrs={'class': 'custom-select'})
        }

    def __init__(self, *args, **kwargs):    # Remove colon at the end of label
        kwargs.setdefault('label_suffix', '')
        super(PatientVitalsForm, self).__init__(*args, **kwargs)

class MentalStateForm(forms.Form):
    ms1 = forms.BooleanField(label='Not responding normally to social cues', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    ms2 = forms.BooleanField(label='Decreased activity', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    ms3 = forms.BooleanField(label='Parental/carer concern child is behaving differently', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    ms4 = forms.BooleanField(label='Appears ill to a healthcare professional', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    ms5 = forms.BooleanField(label='Does not wake or if roused does not stay awake', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    ms6 = forms.BooleanField(label='No smile', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    ms7 = forms.BooleanField(label='Wakes only with prolonged stimulation', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    ms8 = forms.BooleanField(label='Weak high-pitched/continuous cry', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    ms9 = forms.BooleanField(label='No response to social cues', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    ms10 = forms.BooleanField(label='History of new change in behaviour/mental state', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    ms11 = forms.BooleanField(label='Acute deterioration in functional ability', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    ms12 = forms.BooleanField(label='Objective evidence of new altered mental state', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))

class SkinConditionForm(forms.Form):
    skin1 = forms.BooleanField(label='Leg pain', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    skin2 = forms.BooleanField(label='Cold hands or feet', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    skin3 = forms.BooleanField(label='Mottled or ashen skin', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    skin4 = forms.BooleanField(label='Cyanosis of skin, lips or tongue', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    skin5 = forms.BooleanField(label='Non-blanching rash', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    skin6 = forms.BooleanField(label='Pale or flushed', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    skin7 = forms.BooleanField(label='Signs of potential infection (redness, swelling or discharge at surgical site or breakdown of wound)', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    skin8 = forms.BooleanField(label='Mottled/ashen skin or cyanosis (skin/lips/tongue)', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    skin9 = forms.BooleanField(label='Non-blanching rash', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
