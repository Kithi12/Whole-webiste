document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners for cart actions
  document.querySelector('.fa-shopping-cart').addEventListener('click', function() {
      document.getElementById('cart-sidebar').style.right = '0';
      document.getElementById('overlay').classList.add('show');
  });

  document.getElementById('overlay').addEventListener('click', function() {
      document.getElementById('cart-sidebar').style.right = '-600px';
      document.getElementById('overlay').classList.remove('show');
  });

  document.getElementById('close-cart').addEventListener('click', function() {
      document.getElementById('cart-sidebar').style.right = '-600px';
      document.getElementById('overlay').classList.remove('show');
  });

  updateCartIcon();
  
  // Add event listeners for dropdown changes
  document.querySelectorAll('.product-option').forEach(select => {
      select.addEventListener('change', function() {
          const productIndex = this.getAttribute('data-product-index');
          const selectedOption = this.options[this.selectedIndex];
          const newPrice = selectedOption.getAttribute('data-price');
          const newImage = selectedOption.getAttribute('data-image');
          const priceElement = document.getElementById(`price-${productIndex}`);
          const imageElement = document.getElementById(`image-${productIndex}`);
          
          if (newPrice) {
              priceElement.textContent = `$${newPrice}`;
          }
          if (newImage) {
              imageElement.src = newImage;
          }
      });
  });
});

const productData = [
  {
      id: 0,
      baseImage: '../images/image1.jpg',
      title: 'Drylock X Power Seam Steamer | XCEL Wetsuit',
      basePrice: 609.99,
      options: {
          size: {
              'Small': { price: 609.99, image: "" },
              'Medium': { price: 619.99, image: "" },
              'Large': { price: 629.99,image: "" },
          }
      }
  },
  {
      id: 1,
      baseImage: '../images/image2_blue.jpg',
      title: 'PERFORMANCE SOFTBOARD',
      basePrice: 670.00,
      options: {
          color: {
              'Blue': { price: "", image: "../images/image2_blue.jpg" },
              'White': { price: "", image: "../images/image2_white.jpg" },
              'Grey': { price: "", image: "../images/image2_grey.jpg" },
          },
          size: {
              '6\'0"': { price: 675.59, image: "../images/image2_blue.jpg" },
              '6\'4"': { price: 690.66, image: "../images/image2_blue.jpg" },
              '6\'6"': { price: 710.66, image: "../images/image2_blue.jpg" },
          },
      },
  },
  {
      id: 2,
      baseImage: '../images/image3_black.jpg',
      title: 'OceanUs T-shirt free-size',
      basePrice: 20.55,
      options: {
          color: {
              'Black': { price: 20.55, image: "../images/image3_black.jpg" },
              'Navy Blue': { price: 20.55, image: "../images/image3_blue.jpg" },
          }
      }
  },
  {
      id: 3,
      baseImage: '../images/image4.jpg',
      title: 'Hydrating Mineral Sunscreen- 50ml',
      basePrice: 30.57,
  },
  {
      id: 4,
      baseImage: '../images/image4_12.jpg',
      title: 'Go Pro Action Camera',
      basePrice: 399.99,
      options: {
          Versions: {
              'Hero 12-black': { price: 399.99, image: "../images/image4_12.jpg" },
              'Hero 11-black': { price: 349.99, image: "../images/image4_11.jpg" },
              'Hero 10-black': { price: 249.99, image: "../images/image4_10.jpeg" },
          }
      }
  },
  {
      id: 5,
      baseImage: '../images/image5.jpg',
      title: 'ION Claw Gloves 3/2 Surf Glove',
      basePrice: 64.97,
      options: {
          sizes: {
              'Small': { price: 64.97, image: "" },
              'Medium': { price: 66.97, image: "" },
              'Large': { price: 68.97, image: "" },
          }
      }
  },
  {
      id: 6,
      baseImage: '../images/image6_flo.jpg',
      title: 'Suge Water shades',
      basePrice: 99.65,
      options: {
          Types: {
              'Flo Seires - POLARIZED': { price: 99.65, image: "../images/image6_flo.jpg" },
              'LEVANTÉ SERIES- POLARIZED': { price: 105.15, image: "../images/image6_levante.jpg" },
              'Typhoon Series - Zeiss': { price: 238.59, image: "../images/image6_typhoon.jpg" },
          }
      }
  },
];

const categories = [...productData];

document.getElementById('products').innerHTML = categories.map((item, i) => {
  let optionsHTML = '';

  if (item.options) {
      for (const [key, values] of Object.entries(item.options)) {
          optionsHTML += `<div class="options">
                            <label for="${key}-${i}">${key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            <select id="${key}-${i}" class="product-option" data-product-index="${i}">
                              ${Object.keys(values).map(value => `<option value="${value}" data-price="${values[value].price}" data-image="${values[value].image}">${value}</option>`).join('')}
                            </select>
                          </div>`;
      }
  }

  return `
    <div class='box'>
      <div class='img-box'>
        <img id='image-${i}' class='images' src='${item.baseImage}' alt='${item.title}'>
      </div>
      <div class='bottom'>
        <p>${item.title}</p>
        <h2 id="price-${i}">$${item.basePrice}</h2>
        ${optionsHTML}
        <button onclick='addtocart(${i})'>Add to cart</button>
      </div>
    </div>`;
}).join('');


let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display cart initially
displayCart();
updateCartIcon();

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
      notification.classList.add('show');
  }, 100);

  setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
          document.body.removeChild(notification);
      }, 500);
  }, 3000);
}

window.addtocart = function(a) {
  const product = productData[a];
  const selectedOptions = {};

  if (product.options) {
      for (const key of Object.keys(product.options)) {
          const selectElement = document.getElementById(`${key}-${a}`);
          selectedOptions[key] = selectElement.value;
      }
  }

  // Get selected price and image
  let selectedPrice = product.basePrice;
  let selectedImage = product.baseImage;
  for (const key of Object.keys(product.options)) {
      const optionElement = document.querySelector(`#${key}-${a} option[value="${selectedOptions[key]}"]`);
      const optionPrice = parseFloat(optionElement.getAttribute('data-price'));
      const optionImage = optionElement.getAttribute('data-image');
      selectedPrice = optionPrice || selectedPrice;
      selectedImage = optionImage || selectedImage;
  }

  const index = cart.findIndex(item => item.id === product.id && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions));
  if (index !== -1) {
      cart[index].quantity++;
  } else {
      cart.push({ ...product, price: selectedPrice, image: selectedImage, quantity: 1, selectedOptions });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  updateCartIcon();
  showNotification('Added to your Cart Successfully..!!');
}


function delElement(a) {
  cart.splice(a, 1);
  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  displayCart();
  updateCartIcon(cart.length);
}

function updateCartIcon() {
  const cartIcon = document.querySelector('.fa-shopping-cart');
  if (cartIcon) {
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      cartIcon.textContent = ` ${itemCount}`;
  }
}

function displayCart() {
  let total = 0;
  const cartContainer = document.getElementById("cartItem");
  const totalElement = document.getElementById("total");
  const sumElement = document.getElementById("sum");
  const checkoutElement = document.getElementById("checkout");

  if (!cartContainer || !totalElement || !sumElement || !checkoutElement) {
      console.error("One or more elements are missing from the DOM.");
      return;
  }

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
      cartContainer.innerHTML = `
      <div class="empty-cart">
        <img src="../images/emptyCart.png" alt="Empty Cart">
        <p>Ooops... It seems pretty empty here!!</p>
      </div>`;
    
    checkoutElement.innerHTML = "CHECKOUT • $0.00";

    } else {
      cart.forEach((item, index) => {
        const { image, title, price, quantity, selectedOptions } = item;
        total += parseFloat(price) * quantity;

        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");

        const rowImgDiv = document.createElement("div");
        rowImgDiv.classList.add("row-img");

        const img = document.createElement("img");
        img.classList.add("rowimg");
        img.src = image;

        rowImgDiv.appendChild(img);
        cartItemDiv.appendChild(rowImgDiv);

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("details");

        const titleParagraph = document.createElement("p");
        titleParagraph.classList.add("title");
        titleParagraph.textContent = title;
        detailsDiv.appendChild(titleParagraph);

        // Add selected options to the item display
        if (selectedOptions && Object.keys(selectedOptions).length > 0) {
            const optionsParagraph = document.createElement("p");
            optionsParagraph.classList.add("options");
            optionsParagraph.textContent = `Options: ${Object.entries(selectedOptions).map(([key, value]) => `${key}: ${value}`).join(', ')}`;
            detailsDiv.appendChild(optionsParagraph);
        }

        const priceHeader = document.createElement("p");
        priceHeader.classList.add("price");
        priceHeader.textContent = `$${(parseFloat(price) * quantity).toFixed(2)}`;
        detailsDiv.appendChild(priceHeader);

        const controlsDiv = document.createElement("div");
        controlsDiv.classList.add("controls");

        const quantityContainer = document.createElement("div");
        quantityContainer.classList.add("quantity-container");

        const minusButton = document.createElement("button");
        minusButton.classList.add("quantity-btn");
        minusButton.textContent = "-";
        minusButton.onclick = () => changeQuantity(index, -1);

        const quantityDisplay = document.createElement("span");
        quantityDisplay.classList.add("quantity-display");
        quantityDisplay.textContent = quantity;

        const plusButton = document.createElement("button");
        plusButton.classList.add("quantity-btn");
        plusButton.textContent = "+";
        plusButton.onclick = () => changeQuantity(index, 1);

        quantityContainer.appendChild(minusButton);
        quantityContainer.appendChild(quantityDisplay);
        quantityContainer.appendChild(plusButton);

        controlsDiv.appendChild(quantityContainer);

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-regular", "fa-trash-can");
        deleteIcon.style.color = "#ff1f1f";
        deleteIcon.onclick = () => delElement(index);
        controlsDiv.appendChild(deleteIcon);

        detailsDiv.appendChild(controlsDiv);
        cartItemDiv.appendChild(detailsDiv);

        cartContainer.appendChild(cartItemDiv);
      });

      checkoutElement.innerHTML = `CHECKOUT • $${total.toFixed(2)}`;
    }
  }

  function changeQuantity(index, delta) {
    const newQuantity = cart[index].quantity + delta;
    if (newQuantity > 0) {
      cart[index].quantity = newQuantity;
  
      localStorage.setItem('cart', JSON.stringify(cart));

      displayCart();
      updateCartIcon();
    }
  }

  document.getElementById('checkout').addEventListener('click', function() {
    if (cart.length === 0) {
      alert('Your cart is empty');
    } else {
      window.location.href = 'checkout.html';
    }
  });

  document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-sidebar').style.right = '-600px';
    document.getElementById('overlay').classList.remove('show');
  });

  document.querySelector('.fa-shopping-cart').addEventListener('click', function() {
    document.getElementById('cart-sidebar').style.right = '0';
    document.getElementById('overlay').classList.add('show');
  });

  document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('cart-sidebar').style.right = '-600px';
    document.getElementById('overlay').classList.remove('show');
  });
