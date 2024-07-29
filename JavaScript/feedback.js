const form=document.getElementById('form');
const nameInput=document.getElementById('name');
const emailInput=document.getElementById('email');
const popup = document.getElementById('popup-1');

form.addEventListener('submit',e =>{
    e.preventDefault();
    vaildateInputs();
});

const setError=(element,message)=>{
    const inputControl=element.parentElement;
    const errorDisplay=inputControl.querySelector('.error')

    errorDisplay.innerText=message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess=(element)=>{
    const inputControl=element.parentElement;
    const errorDisplay=inputControl.querySelector('.error')

    errorDisplay.innerText='';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const showPopup = () => {
    popup.classList.add('active');
};

const closePopup = () => {
    popup.classList.remove('active');
    
};

const setErrorStars=(message) =>{
    const starsContainer = document.querySelector('.rating-box')
    const errorDisplay = document.querySelector('.error-stars')

    errorDisplay.innerText=message;
    starsContainer.classList.add('');
}
const setSuccessStars=() =>{
    const starsContainer  = document.querySelector('.rating-box')
    const errorDisplay = document.querySelector('.error-stars')

    errorDisplay.innerText='';
    starsContainer.classList.remove('error');
}
const vaildateInputs = () => {
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const starsValue = document.querySelectorAll('.stars i.active').length;

    let isValid = true;

    if (nameValue === '') {
        setError(nameInput, 'name is required');
        isValid = false;
    } else {
        setSuccess(nameInput);
    }
    if (emailValue === '') {
        setError(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(emailInput, 'Please enter valid Email');
        isValid = false;
    } else {
        setSuccess(emailInput);
    }
    if (starsValue === 0) {
        setErrorStars('Please rate your experience');
        isValid = false;
    } else {
        setSuccessStars();
    }
    if (isValid) {
        showPopup();
    }

    const closeButton = document.querySelector('.close-btn');
    closeButton.addEventListener('click', closePopup);
    
};


const stars=document.querySelectorAll(".stars i");

stars.forEach((star,index1) => {

    star.addEventListener("click",() =>{
        stars.forEach((star,index2) => {
            index1>=index2? star.classList.add("active") :star.classList.remove("active");
        })
    });



})

