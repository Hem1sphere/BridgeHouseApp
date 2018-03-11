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

  // Assign appropriate badge adjacent to parameter based on analysis

  let lowRiskFactors = document.getElementsByClassName("0");
  for(var i = 0; i < lowRiskFactors.length; i++) {
    if(lowRiskFactors[i].nodeName != "SPAN") {
      let badge = makeBadge(0);
      lowRiskFactors[i].after(badge);
    }
  }

  let moderateRiskFactors = document.getElementsByClassName("1");
  for(var j = 0; j < moderateRiskFactors.length; j++) {
    if(moderateRiskFactors[j].nodeName != "SPAN") {
      let badge = makeBadge(1);
      moderateRiskFactors[j].after(badge);
    }
  }
  let highRiskFactors = document.getElementsByClassName("2");
  for(var k = 0; k < highRiskFactors.length; k++) {
    if(highRiskFactors[k].nodeName != "SPAN") {
      let badge = makeBadge(2);
      highRiskFactors[k].after(badge);
    }
  }
}

function displayResult(patient) {    // Change colour and text of result card based on analysis of parameters
  let resultCard = document.getElementById("result-card");
  let resultTitle = document.getElementById("result-title");
  let resultBody = document.getElementById("result-body");
  if(resultCard.parentElement.className === "1") {
    resultCard.className = "alert alert-warning";
    resultTitle.innerHTML = "Moderate Risk";
    resultBody.innerHTML = "Patient has a moderate risk of severe illness/death"
    resultBody.style.display = "block";
  } else if(resultCard.parentElement.className === "2") {
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

function copyToClipboard() {    // Copy summary to clipboard when button clicked
  new Clipboard("#copy");
}

function generateLetter() {
  //TO BE IMPLEMENTED
}

function disableInput() {
  let allInputForms = document.getElementsByTagName("input");
  for(var k = 0; k < allInputForms.length; k++) {
    if(allInputForms[k].id !== "search") {
      allInputForms[k].disabled = true;
    }
  }
}

setBadge()
displayResult()
copyToClipboard()
disableInput()
