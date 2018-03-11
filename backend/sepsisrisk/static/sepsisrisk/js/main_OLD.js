function getPatientVitals() {
    patient = {    // A patient object that contains all information from input form
    dateOfBirth: document.getElementById("dob").value,
    age: calcAge(),
    nhsNo: parseFloat(document.getElementById("nhsNo").value),
    temp: [parseFloat(document.getElementById("temp").value), 0],
    pulse: [parseFloat(document.getElementById("pulse").value), 0],
    respRate: [parseFloat(document.getElementById("respRate").value), 0],
    bloodPressure: [parseFloat(document.getElementById("bloodPressure").value), 0],
    capillaryRefillTime: [parseFloat(document.getElementById("capillaryRefillTime").value), 0],
    o2Stats: [parseFloat(document.getElementById("o2Stats").value), 0],
    result: 0 // 0 = green; 1 = amber; 2 = red
  }
}

function submitForm(patient) {
  window.scrollTop = 0;
  document.getElementById("in").scrollTop = 0;
  clearErrors();
  paramAnalysis(patient);
  setBadge(patient);
  displayResult(patient);
  displaySummary(patient);
  copyToClipboard();

}

function calcAge() {    // Calculate age based on date of birth
  let dateOfBirth = document.getElementById("dob").value;
      currentYear = new Date().getFullYear();
      currentMonth = new Date().getMonth();
      birthYear = dateOfBirth.slice(6);  // Get year from DoB; equivalent to last 4 characters of input string
      birthMonth = dateOfBirth.slice(3,5);  // Get month from DoB; equivalent to character 3-4 of input string
      age = currentYear - birthYear;

  if(age === 0 ) {
    age = (currentMonth - birthMonth) * (1 / 12);
  } else {
    currentMonth > birthMonth ? age : age--;
  }

  return age;
}

function paramAnalysis(patient) {    // Set each parameter as low, moderate, or high risk based on set criteria
  if(patient.age < 12) {    // Criteria for children under 12 years old
    if(patient.age >= 0.25 && patient.age <= 0.5) {
      if(patient.temp[0] > 39) {
        patient.temp[1] = 1;
        patient.result = Math.max(patient.result, 1);
      }
    } else if(patient.age < 0.25) {
      if(patient.temp[0] >= 38) {
        patient.temp[1] = 2;
        patient.result = Math.max(patient.result, 2);
      }
    }
    if(patient.temp[0] < 36) {
      patient.temp[1] = 2;
      patient.result = Math.max(patient.result, 2);
    }

    if(patient.capillaryRefillTime[0] >= 3) {
      patient.capillaryRefillTime[1] = 1;
      patient.result = Math.max(patient.result, 1);
    }

    if(patient.o2Stats[0] >= 90 && patient.o2Stats[0] <= 92) {
      patient.o2Stats[1] = 1;
      patient.result = Math.max(patient.result, 1);
    } else if(patient.o2Stats[0] < 90) {
      patient.o2Stats[1] = 2;
      patient.result = Math.max(patient.result, 2);
    }

    switch(patient.age) {
      case 1:
      case 2:
        if(patient.pulse[0] >= 140 && patient.pulse[0] <= 149) {
          patient.pulse[1] = 1;
          patient.result = Math.max(patient.result, 1);
        } else if(patient.pulse[0] < 60 || patient.pulse[0] >= 150) {
          patient.pulse[1] = 2;
          patient.result = Math.max(patient.result, 2);
        }

        if(patient.respRate[0] >= 40 && patient.respRate[0] <= 49) {
          patient.respRate[1] = 1;
          patient.result = Math.max(patient.result, 1);
        } else if(patient.respRate[0] >= 50) {
          patient.respRate[1] = 2;
          patient.result = Math.max(patient.result, 2);
        }
        break;
      case 3:
      case 4:
        if(patient.pulse[0] >= 130 && patient.pulse[0] <= 139) {
          patient.pulse[1] = 1;
          patient.result = Math.max(patient.result, 1);
        } else if(patient.pulse[0] < 60 || patient.pulse[0] >= 140) {
          patient.pulse[1] = 2;
          patient.result = Math.max(patient.result, 2);
        }

        if(patient.respRate[0] >= 35 && patient.respRate[0] <= 43) {
          patient.respRate[1] = 1;
          patient.result = Math.max(patient.result, 1);
        } else if(patient.respRate[0] >= 40) {
          patient.respRate[1] = 2;
          patient.result = Math.max(patient.result, 2);
        }
        break;
      case 5:
        if(patient.pulse[0] >= 120 && patient.pulse[0] <= 129) {
          patient.pulse[1] = 1;
          patient.result = Math.max(patient.result, 1);
        } else if(patient.pulse[0] < 60 || patient.pulse[0] >= 130) {
          patient.pulse[1] = 2;
          patient.result = Math.max(patient.result, 2);
        }

        if(patient.respRate[0] >= 24 && patient.respRate[0] <= 28) {
          patient.respRate[1] = 1;
          patient.result = Math.max(patient.result, 1);
        } else if(patient.respRate[0] >= 29) {
          patient.respRate[1] = 2;
          patient.result = Math.max(patient.result, 2);
        }
        break;
      case 6:
      case 7:
        if(patient.pulse[0] >= 110 && patient.pulse[0] <= 119) {
          patient.pulse[1] = 1;
          patient.result = Math.max(patient.result, 1);
        } else if(patient.pulse[0] < 60 || patient.pulse[0] >= 120) {
          patient.pulse[1] = 2;
          patient.result = Math.max(patient.result, 2);
        }

        if(patient.respRate[0] >= 24 && patient.respRate[0] <= 26) {
          patient.respRate[1] = 1;
          patient.result = Math.max(patient.result, 1);
        } else if(patient.respRate[0] >= 27) {
          patient.respRate[1] = 2;
          patient.result = Math.max(patient.result, 2);
        }
        break;
      case 8:
      case 9:
      case 10:
      case 11:
        if(patient.pulse[0] >= 105 && patient.pulse[0] <= 114) {
          patient.pulse[1] = 1;
          patient.result = Math.max(patient.result, 1);
        } else if(patient.pulse[0] < 60 || patient.pulse[0] >= 115) {
          patient.pulse[1] = 2;
          patient.result = Math.max(patient.result, 2);
        }

        if(patient.respRate[0] >= 22 && patient.respRate[0] <= 24) {
          patient.respRate[1] = 1;
          patient.result = Math.max(patient.result, 1);
        } else if(patient.respRate[0] >= 25) {
          patient.respRate[1] = 2;
          patient.result = Math.max(patient.result, 2);
        }
        break;
      default:
        if(patient.pulse[0] >= 150 && patient.pulse[0] <= 159) {
          patient.pulse[1] = 1;
          patient.result = Math.max(patient.result, 1);
        } else if(patient.pulse[0] < 60 || patient.pulse[0] >= 140) {
          patient.pulse[1] = 2;
          patient.result = Math.max(patient.result, 2);
        }

        if(patient.respRate[0] >= 35 && patient.respRate[0] <= 43) {
          patient.respRate[1] = 1;
          patient.result = Math.max(patient.result, 1);
        } else if(patient.respRate[0] >= 40) {
          patient.respRate[1] = 2;
          patient.result = Math.max(patient.result, 2);
        }
        break;
    }
  } else {    // Criteria for patients over 12 years old
    if(patient.temp[0] < 36) {
      patient.temp[1] = 1;
      patient.result = Math.max(patient.result, 1);
    }

    if(patient.pulse[0] >= 91 && patient.pulse[0] < 130) {
      patient.pulse[1] = 1;
      patient.result = Math.max(patient.result, 1);
    } else if(patient.pulse[0] >= 130) {
      patient.pulse[1] = 2;
      patient.result = Math.max(patient.result, 2);
    }

    if(patient.respRate[0] >= 21 && patient.respRate[0] <= 24) {
      patient.respRate[1] = 1;
      patient.result = Math.max(patient.result, 1);
    } else if(patient.respRate[0] >= 25) {
      patient.respRate[1] = 2;
      patient.result = Math.max(patient.result, 2);
    }
    if(patient.bloodPressure[0] >= 91 && patient.bloodPressure[0] <= 100) {
      patient.bloodPressure[1] = 1;
      patient.result = Math.max(patient.result, 1);
    } else if(patient.bloodPressure[0] <= 90) {
      patient.bloodPressure[1] = 2;
      patient.result = Math.max(patient.result, 2);
    }
  }
}

function makeBadge(setColor) {    // Create a badge signifying severity of criteria
  let badge = document.createElement("span");
  if(setColor === 1) {
    badge.innerHTML = "Moderate Risk";
    badge.className = "badge badge-pill badge-warning";
  } else if(setColor === 2) {
    badge.innerHTML = "High Risk";
    badge.className = "badge badge-pill badge-danger";
  } else {
    badge.innerHTML = "Low Risk";
    badge.className = "badge badge-pill badge-success";
  }
  badge.style.float = "right";

  return badge;
}

function setBadge(patient) {   // Add appropriate badge adjacent to parameter
  for(var vital in patient) {    // Iterate through patient object properties and assign appropriate badge based on analysis
    if(patient.hasOwnProperty(vital)) {
      if(vital !== "dateOfBirth" && vital !== "age" && vital !== "nhsNo" && vital !== "result" && isNaN(patient[vital][0]) !== true) {
        let badge = makeBadge(patient[vital][1]);
        document.getElementById(vital).before(badge);
      }
    }
  }

  // Assign appropriate badge for other factors
  let moderateRiskFactors = document.getElementsByName("moderate-risk");
  let highRiskFactors = document.getElementsByName("high-risk");
  for(var i = 0; i < moderateRiskFactors.length; i++) {
    if(moderateRiskFactors[i].checked === true) {
      let badge = makeBadge(1);
      document.getElementById(moderateRiskFactors[i].id).before(badge);
      patient.result = Math.max(patient.result, 1);
    }
  }
  for(var j = 0; j < highRiskFactors.length; j++) {
    if(highRiskFactors[j].checked === true) {
      let badge = makeBadge(2);
      document.getElementById(highRiskFactors[j].id).before(badge);
      patient.result = Math.max(patient.result, 2);
    }
  }

//   let urineOutput = document.getElementById("urine-output").value;
//   if(urineOutput === "Reduced urine output") {
//     let badge = makeBadge(1);
//     document.getElementById("urine-output").previousElementSibling.after(badge);
//     patient.result = Math.max(patient.result, 1);
//   } else if(urineOutput === "No urine passed for 12-18 hours") {
//     let badge = makeBadge(1);
//     document.getElementById("urine-output").previousElementSibling.after(badge);
//     patient.result = Math.max(patient.result, 1);
//   } else if(urineOutput === "No urine passed for over 18 hours") {
//     let badge = makeBadge(2);
//     document.getElementById("urine-output").previousElementSibling.after(badge);
//     patient.result = Math.max(patient.result, 2);
//   } else if(urineOutput === "Normal") {
//     let badge = makeBadge(0);
//     document.getElementById("urine-output").previousElementSibling.after(badge);
//     patient.result = Math.max(patient.result, 0);
//   }
}

function displayResult(patient) {    // Change colour and text of result card based on analysis of parameters
  let resultCard = document.getElementById("result-card");
  let resultTitle = document.getElementById("result-title");
  let resultBody = document.getElementById("result-body");
  if(patient.result === 1) {
    resultCard.className = "alert alert-warning";
    resultTitle.innerHTML = "Moderate Risk";
    resultBody.innerHTML = "Patient has a moderate risk of severe illness/death"
    resultBody.style.display = "block";
  } else if(patient.result === 2) {
    resultCard.className = "alert alert-danger";
    resultTitle.innerHTML = "High Risk";
    resultBody.innerHTML = "Patient has a high risk of severe illness/death."
    resultBody.style.display = "block";
  } else {
    resultCard.className = "alert alert-success";
    resultTitle.innerHTML = "Low Risk";
    resultBody.innerHTML = "Patient has a low risk of sepsis."
    resultBody.style.display = "block";
  }
}

function displaySummary(patient) {    // Show summary of patient vitals, ready to be copied

  let patientAge = document.createElement("li");
  patientAge.setAttribute("style", "margin-bottom: 0.1rem; list-style: none;");
  patientAge.innerHTML = "Age: " + patient.age;
  document.getElementById("summary-list").appendChild(patientAge);

  for(var vital in patient) {    // Iterate through patient object properties and assign appropriate badge based on analysis
    if(patient.hasOwnProperty(vital)) {
      if(vital !== "dateOfBirth" && vital !== "age" && vital !== "nhsNo" && vital !== "result" && isNaN(patient[vital][0]) !== true) {
        let elem = document.createElement("li");
        elem.setAttribute("style", "margin-bottom: 0.1rem; list-style: none;");
        let vitalName = document.getElementById(vital).previousElementSibling.previousElementSibling.textContent;
        elem.className = "card-text";
        elem.innerHTML = vitalName + ": " + patient[vital][0];
        document.getElementById("summary-list").appendChild(elem);
      }
    }
  }
  let moderateRiskFactors = document.getElementsByName("moderate-risk");
  let highRiskFactors = document.getElementsByName("high-risk");
  for(var i = 0; i < moderateRiskFactors.length; i++) {
    if(moderateRiskFactors[i].checked === true) {
      let elem = document.createElement("li");
      elem.setAttribute("style", "margin-bottom: 0.1rem; list-style: none;");
      elem.innerHTML = moderateRiskFactors[i].nextElementSibling.textContent;
      document.getElementById("summary-list").appendChild(elem);
    }
  }
  for(var j = 0; j < highRiskFactors.length; j++) {
    if(highRiskFactors[j].checked === true) {
      let elem = document.createElement("li");
      elem.setAttribute("style", "margin-bottom: 0.1rem; list-style: none;");
      elem.innerHTML = highRiskFactors[j].nextElementSibling.textContent;
      document.getElementById("summary-list").appendChild(elem);
    }
  }
  // if(document.getElementById("urine-output").value !== "Normal") {
  //   let elem = document.createElement("li");
  //   elem.setAttribute("style", "margin-bottom: 0.1rem; list-style: none;");
  //   elem.innerHTML = document.getElementById("urine-output").value;
  //   document.getElementById("summary-list").appendChild(elem);
  // }

  document.getElementById("result-card").style.display = "block"
  document.getElementById("summary-card").style.display = "block";
  document.getElementById("reset").style.display = "block";

}

function copyToClipboard() {    // Copy summary to clipboard when button clicked
  new Clipboard("#copy");
}

function generateLetter() {
  //TO BE IMPLEMENTED
}

function inputErrors(patient) {    // Check if each input value is valid - if not, display an error message
  let numErrors = 0;
  if(isNaN(Date.parse(patient.dateOfBirth)) === true) {
    let birthdate = document.getElementById("dob");
    let errorMessage = document.createElement("div");
    errorMessage.className = "invalid-feedback error-message";
    birthdate.className = "form-control is-invalid";
    errorMessage.textContent = "Please enter a valid date of birth in the format DD/MM/YYYY";
    birthdate.after(errorMessage);
    numErrors++;
  }
  for(var vital in patient) {
    let elem = document.getElementById(vital);
    if(vital !== "dateOfBirth" && vital !== "age" && vital !== "nhsNo" && vital !== "result" && isNaN(patient[vital][0]) === true && elem.value.length !== 0) {
      let errorMessage = document.createElement("div");
      errorMessage.className = "invalid-feedback error-message";
      errorMessage.textContent = "Please enter a valid number.";
      elem.className = "form-control is-invalid";
      elem.after(errorMessage);
      numErrors++;
    }
  }
  if(numErrors === 0) {
    return false;
  } else {
    let errorMessage = document.createElement("div");
    errorMessage.className = "alert alert-dismissible alert-danger error-message";
    errorMessage.textContent = "Please check that the values you have entered are all valid and try submitting again.";
    document.getElementById("calculateRisk").before(errorMessage);
    return true;
  }
}

function clearErrors() {
  let errors = document.getElementsByClassName("error-message");
  while(errors.length > 0) {
    let parent = errors[0].parentNode;
    let sibling = errors[0].previousElementSibling;
    parent.removeChild(errors[0]);
    sibling.className = "form-control";
  }
}

function disableInput() {
  let allInputForms = document.getElementsByTagName("input");
  for(var k = 0; k < allInputForms.length; k++) {
    if(allInputForms[k].id !== "search") {
      allInputForms[k].disabled = true;
    }
  }
}

var submitButton = document.getElementById("calculateRisk");
submitButton.onclick = function() {
  if(submitButton.disabled === false) {
    getPatientVitals();
    if(inputErrors(patient) === false) {    // Prevent form from being submitted if input contains invalid values
      submitForm(patient);
      //disableInput();
      submitButton.disabled = true;
    }
  }
}

var resetButton = document.getElementById("reset");
resetButton.onclick = function () {
  window.location.reload();
  window.scrollTop = 0;
}

/*
var clearButton = document.getElementById("clear");
clearButton.onclick = function () {
  window.location.reload();
  window.scrollTo(0, 0);
}*/

/* Possible future feature implementation
var patientAge;
// Calculate patient age upon 'Return' keypress on DoB field
document.getElementById("dob").addEventListener("keyup", function(event) {
  if(event.keyCode === 13) {
    patientAge = calcAge();
  }
})*/
