import { menuArray } from "./data.js";

const mainEl = document.querySelector("main");

const render = (arr) => {
  let content = "";
  arr.forEach((item) => {
    content += `
        <div class="menu-item">
            <p class="emoji">${item.emoji}</p>
            <div class="description">
                <h2>${item.name} </h2>
                <p class="ingredients">Ingredients: ${item.ingredients.join(", ")}</p>
                <p class="price">Price: $${item.price}</p>
            </div>
            <img src="images/plus.svg" alt="Add to cart" class="add-to-cart">
        </div>
        `;
  });
  mainEl.innerHTML = content;
};

render(menuArray);
