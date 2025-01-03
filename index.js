import { menuArray } from "./data.js";

const menuSection = document.querySelector("#menu");
const orderSectionList = document.querySelector(".order-list");
const summaryEl = document.querySelector(".summary");

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
  }
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
  // Rendering the summary
  summaryEl.innerHTML = `
  <div class='total-price'>
    <p>Total price:</p> 
    <p class="order-price">$${totalPrice}</p>
  </div>
  <button class="complete-order-btn">Complete order</button>
  `;
};

render(menuArray);
