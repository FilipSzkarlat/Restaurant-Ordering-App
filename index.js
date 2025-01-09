import { menuArray } from "./data.js";

const menuSection = document.querySelector("#menu");
const orderSectionList = document.querySelector(".order-list");
const summaryEl = document.querySelector(".summary");
const paymentFormEl = document.querySelector("#payment-form");
const afterPaymentInfo = document.querySelector("#after-payment-info");

let order = [];
let totalPrice = 0;

// Event listener for adding items to the cart
document.addEventListener("click", (e) => {
  // add item to the order list
  if (e.target.classList.contains("add-to-cart")) {
    const item = e.target.parentElement;
    const name = item.querySelector("h2").textContent;
    const price = menuArray.filter((el) => el.name === name)[0].price;
    const orderItem = { name: name, price: price };
    order.push(orderItem);
    renderOrder(order);
    // Show the summary section
    summaryEl.style.display = "block";
    // remove the item from the order list
  } else if (e.target.classList.contains("remove-btn")) {
    const item = e.target.parentElement;
    const name = item.querySelector(".order-name").textContent;
    const index = order.findIndex((el) => el.name === name);
    order.splice(index, 1);
    renderOrder(order);
    // Catching click on Complete order btn
  } else if (e.target.classList.contains("complete-order-btn")) {
    document.querySelector(".card-details").style.display = "flex";
  } else if (e.target.classList.contains("close-popup")) {
    closePopup();
  }
});

paymentFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  // const cardNumber = e.target.cardNumber.value;
  const name = document.querySelector(".form-name").value;
  // const cardExpiration = e.target.cardExpiration.value;
  // const cardCvv = e.target.cardCvv.value;
  showPaymentInfo(name);
});

// Rendering the menu items
const render = (arr) => {
  let content = "";
  arr.forEach((item) => {
    content += `
        <div class="menu-item">
            <p class="emoji">${item.emoji}</p>
            <div class="description">
                <h2>${item.name}</h2>
                <p class="ingredients">Ingredients: ${item.ingredients.join(
                  ", "
                )}</p>
                <p class="price">Price: $${item.price}</p>
            </div>
            <img src="images/plus.svg" alt="Add to cart" class="add-to-cart">
        </div>
        `;
  });
  menuSection.innerHTML = content;
};

// Rendering the orderList and the summary
const renderOrder = (orderArr) => {
  let content = "<h2 class='order-header'>Your order:</h2>";
  totalPrice = 0;
  orderArr.forEach((item) => {
    content += `
        <div class="order-item">
            <p class='order-name'>${item.name}</p>
            <button class="remove-btn">remove</button>
            <p class='order-price'>$${item.price}</p>
        </div>
        `;
    totalPrice += item.price;
  });
  orderSectionList.innerHTML = content;
  console.log(order);
  // if the discount is applied
  let discountClass = "discount-summary hidden";
  if (
    order.length >= 2 &&
    order.some((item) => item.name === "Beer") &&
    order.some((item) => item.name !== "Beer")
  ) {
    totalPrice = (totalPrice * 0.85).toFixed(2);
    discountClass = "discount-summary";
  } else {
    discountClass = "discount-summary hidden";
  }
  // Rendering the summary
  summaryEl.innerHTML = `
  <p class="${discountClass}">15% discount applied</p>
  <div class='total-price'>
    <p>Total price:</p> 
    <p class="order-price">$${totalPrice}</p>
  </div>
  <button class="complete-order-btn">Complete order</button>
  `;
};

// Pay btn -> showing the payment info
function showPaymentInfo(name) {
  document.querySelector(".card-details").style.display = "none";
  order = [];
  document.getElementById("order").style.display = "none";
  renderOrder(order);
  summaryEl.style.display = "none";
  afterPaymentInfo.style.display = "flex";
  afterPaymentInfo.innerHTML = `Thanks, ${name}! Your order is on its way`;
}

render(menuArray);

// Popup with the discount
window.onload = function () {
  setTimeout(() => {
    document.getElementById("popup").classList.remove("hidden");
  }, 2000);
};

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}
