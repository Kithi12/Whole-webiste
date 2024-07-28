document.addEventListener('DOMContentLoaded', function() {
  const checkoutForm = document.getElementById('checkout-form');
  const orderSummaryDiv = document.getElementById('order-summary');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Elements for step navigation
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const nextToStep2 = document.getElementById('next-to-step-2');
  const backToStep1 = document.getElementById('back-to-step-1');

  // Populate order summary
  function populateOrderSummary() {
    orderSummaryDiv.innerHTML = ''; // Clear existing content
    let total = 0;

    cart.forEach(item => {
      const { title, price, quantity, selectedOptions, image } = item;
      const itemTotal = price * quantity;
      total += itemTotal;

      const itemDiv = document.createElement('div');
      itemDiv.classList.add('order-item');
      itemDiv.innerHTML = `
        <div class="order-item-image">
          <img src="${image}" alt="${title}">
        </div>
        <div class="order-item-details">
          <p>${title} x ${quantity}</p>
          <p>Options: ${selectedOptions ? Object.entries(selectedOptions).map(([key, value]) => `${key}: ${value}`).join(', ') : 'None'}</p>
          <p>$${itemTotal.toFixed(2)}</p>
        </div>
      `;
      orderSummaryDiv.appendChild(itemDiv);
    });

    // Display total
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('order-total');
    totalDiv.textContent = `Total: $${total.toFixed(2)}`;
    orderSummaryDiv.appendChild(totalDiv);
  }

  // Initial population of order summary
  populateOrderSummary();

  // Validate email
  function validateEmail(email) {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
  }

  // Validate billing details
  function validateBillingDetails() {
    const firstname = checkoutForm.firstname.value.trim();
    const lastname = checkoutForm.lastname.value.trim();
    const address = checkoutForm.address.value.trim();
    const postalcode = checkoutForm.postalcode.value.trim();
    const town = checkoutForm.town.value.trim();
    const district = checkoutForm.district.value.trim().toLowerCase(); // Convert to lowercase
    const phone = checkoutForm.phone.value.trim();
    
    const namePattern = /^[a-zA-Z\s]+$/;
    const addressPattern = /^[a-zA-Z0-9\s\/,\.]{8,}$/;
    const postalCodePattern = /^[0-9]{5}$/;
    const phonePattern = /^[0-9]{10}$/;
    
    const districtsOfSriLanka = [
      "ampara", "anuradhapura", "badulla", "batticaloa", "colombo",
      "galle", "gampaha", "hambantota", "jaffna", "kalutara", "kandy",
      "kegalle", "kilinochchi", "kurunegala", "mannar", "matale",
      "matara", "monaragala", "mullaitivu", "nuwara eliya", "polonnaruwa",
      "puttalam", "ratnapura", "trincomalee", "vavuniya"
    ];

    if (!firstname || !lastname || !address || !postalcode || !town || !district || !phone) {
      alert('Please fill in all fields.');
      return false;
    }

    if (!namePattern.test(firstname)) {
      alert('First Name should contain only letters.');
      return false;
    }

    if (!namePattern.test(lastname)){
      alert('Last name should contain only letters.')
    }

    if (!addressPattern.test(address)) {
      alert('Please enter a valid Sri Lankan Address');
      return false;
    }

    if (!postalCodePattern.test(postalcode)) {
      alert('Postal Code should contain exactly 5 digits.');
      return false;
    }

    if (!namePattern.test(town)) {
      alert('Please enter a valid Sri Lankan town.');
      return false;
    }

    if (!districtsOfSriLanka.includes(district)) {
      alert('Please select a valid district from Sri Lanka.');
      return false;
    }

    if (!phonePattern.test(phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return false;
    }

    return true;
  }

  // Validate payment details
  function validatePaymentDetails() {
    const email = checkoutForm.email.value.trim();
    const cardtype = checkoutForm.cardtype.value;
    const cardnumber = checkoutForm.cardnumber.value.trim();
    const expiry = checkoutForm.expiry.value.trim();
    const cvv = checkoutForm.cvv.value.trim();
    const cardNumberPattern = /^[0-9]{13,16}$/;
    const expiryPattern = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    const cvvPattern = /^[0-9]{3,4}$/;

    if (!email || !cardtype || !cardnumber || !expiry || !cvv) {
      alert('Please fill in all fields.');
      return false;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    if (!cardNumberPattern.test(cardnumber)) {
      alert('Please enter a valid card number.');
      return false;
    }

    if (!expiryPattern.test(expiry)) {
      alert('Please enter a valid expiry date in MM/YY format.');
      return false;
    }

    if (!cvvPattern.test(cvv)) {
      alert('Please enter a valid CVV.');
      return false;
    }

    return true;
  }

  // Event listeners for navigation buttons
  nextToStep2.addEventListener('click', function() {
    if (validateBillingDetails()) {
      step1.style.display = 'none';
      step2.style.display = 'block';
    }
  });

  backToStep1.addEventListener('click', function() {
    step2.style.display = 'none';
    step1.style.display = 'block';
  });

  // Form submission
  checkoutForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (validatePaymentDetails()) {
      alert('Order placed successfully!...Thank you for your order!!');
    }
  });
});
