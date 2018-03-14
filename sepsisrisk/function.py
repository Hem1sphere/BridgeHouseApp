from datetime import date

def calc_age(birth_date):
    current_date = date.today()
    age = current_date.year - birth_date.year
    if age == 0:
        age = (current_date.month - birth_date.month) * (1 / 12)
    else:
        if current_date.month > birth_date.month:
            return age - 1
        else:
            return age

def get_checkboxes(request, keys, number):
    status = {}
    i = 1
    while i <= number:
        name = keys + str(i)
        status[name] = request.POST.get(name)
        i += 1
    return status

def assign_result(name, value, risk):
    risk[name] = value
    risk['result'] = max(risk['result'], value)

def parameter_analysis(age, vitals, mental, skin, risk):
    if age < 12:   # Criteria for children under 12 years old
        if vitals['temp'] != None:
            if age >= 0.25 and age <= 0.5:
                if vitals['temp'] > 39:
                    assign_result('temp', 1, risk)
            elif age < 0.25:
                if vitals['temp'] >= 38:
                    assign_result('temp', 2, risk)

            if vitals['temp'] < 36:
                assign_result('temp', 2, risk)

        if vitals['cap_refill_time'] != None:
            if vitals['cap_refill_time'] >= 3:
                assign_result('cap_refill_time', 1, risk)

        if vitals['o2_stats'] != None:
            if vitals['o2_stats'] >= 90 and vitals['o2_stats'] <= 92:
                assign_result('o2_stats', 1, risk)
            elif vitals['o2_stats'] < 90:
                assign_result('o2_stats', 2, risk)

        if age == 1 or age == 2:
            if vitals['pulse'] != None:
                if vitals['pulse'] >= 140 and vitals['pulse'] <= 149:
                    assign_result('pulse', 1, risk)
                elif vitals['pulse'] < 60 or vitals['pulse'] >= 150:
                    assign_result('pulse', 2, risk)

            if vitals['resp_rate'] != None:
                if vitals['resp_rate'] >= 40 and vitals['resp_rate'] <= 49:
                    assign_result('resp_rate', 1, risk)
                elif vitals['resp_rate'] >= 50:
                    assign_result('o2_stats', 2, risk)

        elif age == 3 or age == 4:
            if vitals['pulse'] != None:
                if vitals['pulse'] >= 130 and vitals['pulse'] <= 139:
                    assign_result('pulse', 1, risk)
                elif vitals['pulse'] < 60 or vitals['pulse'] >= 140:
                    assign_result('pulse', 2, risk)

            if vitals['resp_rate'] != None:
                if vitals['resp_rate'] >= 35 and vitals['resp_rate'] <= 43:
                    assign_result('resp_rate', 1, risk)
                elif vitals['resp_rate'] >= 40:
                    assign_result('resp_Rate', 2, risk)

        elif age == 5:
            if vitals['pulse'] != None:
                if vitals['pulse'] >= 120 and vitals['pulse'] <= 129:
                    assign_result('pulse', 1, risk)
                elif vitals['pulse'] < 60 or vitals['pulse'] >= 130:
                    assign_result('pulse', 2, risk)

            if vitals['resp_rate'] != None:
                if vitals['resp_rate'] >= 24 and vitals['resp_rate'] <= 28:
                    assign_result('resp_rate', 1, risk)
                elif vitals['resp_rate'] >= 29:
                    assign_result('resp_rate', 2, risk)

        elif age == 6 or age == 7:
            if vitals['pulse'] != None:
                if vitals['pulse'] >= 110 and vitals['pulse'] <= 119:
                    assign_result('pulse', 1, risk)
                elif vitals['pulse'] < 60 or vitals['pulse'] >= 120:
                    assign_result('pulse', 2, risk)

            if vitals['resp_rate'] != None:
                if vitals['resp_rate'] >= 24 and vitals['resp_rate'] <= 26:
                    assign_result('resp_rate', 1, risk)
                elif vitals['resp_rate'] >= 27:
                    assign_result('resp_rate', 2, risk)

        elif age == 8 or age == 9 or age == 10 or age == 11:
            if vitals['pulse'] != None:
                if vitals['pulse'] >= 105 and vitals['pulse'] <= 114:
                    assign_result('pulse', 1, risk)
                elif vitals['pulse'] < 60 or vitals['pulse'] >= 115:
                    assign_result('pulse', 2, risk)

            if vitals['resp_rate'] != None:
                if vitals['resp_rate'] >= 22 and vitals['resp_rate'] <= 24:
                    assign_result('resp_rate', 1, risk)
                elif vitals['resp_rate'] >= 25:
                    assign_result('resp_rate', 2, risk)

        else:
            if vitals['pulse'] != None:
                if vitals['pulse'] >= 150 and vitals['pulse'] <= 159:
                    assign_result('pulse', 1, risk)
                elif vitals['pulse'] < 60 or vitals['pulse'] >= 140:
                    assign_result('pulse', 2, risk)

            if vitals['resp_rate'] >= 35 and vitals['resp_rate'] <= 43:
                assign_result('resp_rate', 1, risk)
            elif vitals['resp_rate'] >= 40:
                assign_result('resp_rate', 2, risk)

    else:   # Criteria for patients over 12 years old
        if vitals['temp'] != None:
            if vitals['temp'] < 36:
                assign_result('temp', 1, risk)

        if vitals['pulse'] != None:
            if vitals['pulse'] >= 91 and vitals['pulse'] < 130:
                assign_result('pulse', 1, risk)
            elif vitals['pulse'] >= 130:
                assign_result('pulse', 2, risk)

        if vitals['resp_rate'] != None:
            if vitals['resp_rate'] >= 21 and vitals['resp_rate'] <= 24:
                assign_result('resp_rate', 1, risk)
            elif vitals['resp_rate'] >= 25:
                assign_result('resp_rate', 2, risk)

        if vitals['sys_blood_pressure'] != None:
            if vitals['sys_blood_pressure'] >= 91 and vitals['sys_blood_pressure'] <= 100:
                assign_result('sys_blood_pressure', 1, risk)
            elif vitals['sys_blood_pressure'] <= 90:
                assign_result('sys_blood_pressure', 2, risk)

    if vitals['urine_output'] == 'Normal':
        assign_result('urine_output', 0, risk)
    elif vitals['urine_output'] == 'Reduced urine output':
        assign_result('urine_output', 1, risk)
    elif vitals['urine_output'] == 'Not passed urine for 12-18 hours':
        assign_result('urine_output', 1, risk)
    elif vitals['urine_output'] == 'Not passed urine for over 18 hours':
        assign_result('urine_output', 2, risk)

    for key in mental:
        if key in ['ms1', 'ms2', 'ms3', 'ms6', 'ms7', 'ms10', 'ms11', 'ms12']:
            if mental[key] == 'on':
                risk['result'] = max(risk['result'], 1)
        else:
            if mental[key] == 'on':
                risk['result'] = max(risk['result'], 2)

    for key in skin: # 1,2,6,7
        if key in ['skin1', 'skin2', 'skin6', 'skin7']:
            if skin[key] == 'on':
                risk['result'] = max(risk['result'], 1)
        else:
            if skin[key] == 'on':
                risk['result'] = max(risk['result'], 2)

    for vital in vitals:
        if vitals[vital] == None:  # If field is left blank, set risk value to None
            risk[vital] = None
