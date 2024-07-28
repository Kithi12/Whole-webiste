// Select Containers
const userDetailsContainer = document.getElementById("userDetailsContainer");
const eduDetailsContainer = document.getElementById("eduDetailsContainer");
const questionsContainer = document.getElementById("questionsContainer");
const contactContainer = document.getElementById("contactContainer");

// Select Progress Bar
const progressContainer = document.getElementById("progress");

// Select Prompt Inputs
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const gender = document.getElementById("gender");
const dateOfBirth = document.getElementById("dateOfBirth");
const homeAdress = document.getElementById("homeAdress");
const school = document.getElementById("school");
const hEdu = document.getElementById("hEdu");
const job = document.getElementById("job");
const fstQuestion = document.getElementById("fstQuestion");
const secQuestion = document.getElementById("secQuestion");
const cNumber = document.getElementById("cNumber");
const email = document.getElementById("email");

// Create a User Details Store Function
const storeUserDetails = () => {
  let uFirstName, uLastName, uAge, uGender, uDateOfBirth, uHomeAddress;

  while (!uFirstName) {
    uFirstName = prompt("Enter your First Name:");
    if (!uFirstName) alert("First Name is required.");
  }
  localStorage.setItem("uFirstName", uFirstName);

  while (!uLastName) {
    uLastName = prompt("Enter your Last Name:");
    if (!uLastName) alert("Last Name is required.");
  }
  localStorage.setItem("uLastName", uLastName);

  while (!uAge) {
    uAge = prompt("Enter your Age:");
    if (!uAge || isNaN(uAge)) alert("Valid Age is required.");
  }
  localStorage.setItem("uAge", uAge);

  while (!uGender) {
    uGender = prompt("Enter your Gender:");
    if (!uGender) alert("Gender is required.");
  }
  localStorage.setItem("uGender", uGender);

  while (!uDateOfBirth) {
    uDateOfBirth = prompt("Enter your Date Of Birth (YYYY-MM-DD):");
    if (!uDateOfBirth || !isValidDate(uDateOfBirth))
      alert("Valid Date Of Birth is required.");
  }
  localStorage.setItem("uDateOfBirth", uDateOfBirth);

  while (!uHomeAddress) {
    uHomeAddress = prompt("Enter your Home Address:");
    if (!uHomeAddress) alert("Home Address is required.");
  }
  localStorage.setItem("uHomeAddress", uHomeAddress);

  displayProfileData();
  document.getElementById("userDetailsNext").disabled = false;
};

// Create a User Details Display Function
const displayProfileData = () => {
  const uFirstName = localStorage.getItem("uFirstName");
  const uLastName = localStorage.getItem("uLastName");
  const uAge = localStorage.getItem("uAge");
  const uGender = localStorage.getItem("uGender");
  const uDateOfBirth = localStorage.getItem("uDateOfBirth");
  const uHomeAddress = localStorage.getItem("uHomeAddress");

  firstName.innerText = uFirstName;
  lastName.innerText = uLastName;
  age.innerText = uAge;
  gender.innerText = uGender;
  dateOfBirth.innerText = uDateOfBirth;
  homeAdress.innerText = uHomeAddress;
};

// Display Education Details Block
const eduDetails = () => {
  userDetailsContainer.style.display = "none";
  eduDetailsContainer.style.display = "block";
  progressBar(33.3);
};

if (!displayProfileData == null) {
  eduDetails();
}

// Create an Education Details Store Function
const storeUserEduDetails = () => {
  let uSchool, uHedu, uJob;

  while (!uSchool) {
    uSchool = prompt("Enter your school:");
    if (!uSchool) alert("School is required!");
  }
  localStorage.setItem("uSchool", uSchool);

  while (!uHedu) {
    uHedu = prompt("Enter Highest level of education:");
    if (!uHedu) alert("Highest level of education is required!");
  }
  localStorage.setItem("uHedu", uHedu);

  while (!uJob) {
    uJob = prompt("Enter your job:");
    if (!uJob) alert("Job is required!");
  }
  localStorage.setItem("uJob", uJob);

  displayEduDetails();
  document.getElementById("eduDetailsNext").disabled = false;
};

// Create a Display Education Details Function
const displayEduDetails = () => {
  const uSchool = localStorage.getItem("uSchool");
  const uHedu = localStorage.getItem("uHedu");
  const uJob = localStorage.getItem("uJob");

  school.innerText = uSchool;
  hEdu.innerText = uHedu;
  job.innerText = uJob;
};

// Display Question Block
const questions = () => {
  userDetailsContainer.style.display = "none";
  eduDetailsContainer.style.display = "none";
  questionsContainer.style.display = "block";
  progressBar(66.6);
};

// Create a Questions Store Function
const storeQuestions = () => {
  let uFstQuest, uSecQuest;

  while (!uFstQuest) {
    uFstQuest = prompt("Why did you visit this site?");
    if (!uFstQuest) alert("Answer is required!");
  }
  localStorage.setItem("uFstQuest", uFstQuest);

  while (!uSecQuest) {
    uSecQuest = prompt("What are the experiences you have with ocean life?");
    if (!uSecQuest) alert("Answer is required!");
  }
  localStorage.setItem("uSecQuest", uSecQuest);

  displayQuestions();
  document.getElementById("questNext").disabled = false;
};

// Create a Questions Display Function
const displayQuestions = () => {
  const uFstQuest = localStorage.getItem("uFstQuest");
  const uSecQuest = localStorage.getItem("uSecQuest");

  fstQuestion.innerText = uFstQuest;
  secQuestion.innerText = uSecQuest;
};

// Display Contact Details Block
const contactDetails = () => {
  userDetailsContainer.style.display = "none";
  eduDetailsContainer.style.display = "none";
  questionsContainer.style.display = "none";
  contactContainer.style.display = "block";
  progressBar(99.99);
};

// Create a Contact Details Store Function
const storeContactDetails = () => {
  let uCnumber, uEmail;

  while (!uCnumber) {
    uCnumber = prompt("Enter your mobile number:");
    if (!uCnumber || !isValidPhoneNumber(uCnumber))
      alert("Valid Mobile number is required!");
  }
  localStorage.setItem("uCnumber", uCnumber);

  while (!uEmail) {
    uEmail = prompt("Enter your email:");
    if (!uEmail || !isValidEmail(uEmail)) alert("Valid Email is required!");
  }
  localStorage.setItem("uEmail", uEmail);

  displayContactDetails();
  document.getElementById("contactNext").disabled = false;
};

// Displaying Contact Details Block
const displayContactDetails = () => {
  const contactNo = localStorage.getItem("uCnumber");
  const emailAdress = localStorage.getItem("uEmail");

  cNumber.innerText = contactNo;
  email.innerText = emailAdress;
};

// Create a Complete Button Function
const complete = () => {
  alert("Registration Successful");
  location.reload();
};

// Creating Progress Bar Function
const progressBar = (value) => {
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = value + "%";
};

// Create a validation functions
const isValidDate = (dateString) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false;
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false;
  return d.toISOString().slice(0, 10) === dateString;
};

const isValidPhoneNumber = (phone) => {
  const phoneRegEx = /^[0-9]{10}$/;
  return phoneRegEx.test(phone);
};

const isValidEmail = (email) => {
  const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegEx.test(email);
};

window.onload = () => {
  localStorage.clear();
  displayProfileData();
};
