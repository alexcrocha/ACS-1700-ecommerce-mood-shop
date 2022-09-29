import data from "./data.js";

const itemsContainer = document.querySelector("#items");

const cartQuantity = document.getElementById("cart-quantity");
const itemList = document.getElementById("item-list");
const cartTotal = document.getElementById("cart-total");

for (let index = 0; index < data.length; index++) {
  const newDiv = document.createElement("div");
  newDiv.className = "item";

  const img = document.createElement("img");

  img.src = data[index].image;
  img.width = 300;
  img.height = 300;

  newDiv.appendChild(img);
  itemsContainer.appendChild(newDiv);

  const description = document.createElement("p");
  description.innerText = data[index].desc;
  newDiv.appendChild(description);

  const price = document.createElement("p");
  price.innerText = data[index].price;
  newDiv.appendChild(price);

  const button = document.createElement("button");
  button.id = data[index].name;

  button.dataset.price = data[index].price;
  button.innerHTML = "Add to Cart";
  newDiv.appendChild(button);
}

const all_items_button = Array.from(document.querySelectorAll("button"));

all_items_button.forEach((button) =>
  button.addEventListener("click", () => {
    addItem(button.getAttribute("id"), button.getAttribute("data-price"));
    showItems();
  })
);

const cart = [];

function addItem(name, price, quantity = 1) {
  for (let index = 0; index < cart.length; index++) {
    if (cart[index].name === name) {
      cart[index].quantity += quantity;
      return;
    }
  }
  const item = { name, price, quantity };
  cart.push(item);
}

function showItems() {
  let itemString = "";
  cartQuantity.innerHTML = `You have ${getQuantity()} items in your cart`;
  for (let index = 0; index < cart.length; index++) {
    const { name, price, quantity } = cart[index];
    const total = cart[index].price * cart[index].quantity;
    itemString += `<li>${name} $${price} x ${quantity} = ${total}</li>`;
  }
  itemList.innerHTML = itemString;
  cartTotal.innerHTML = `Total in cart: $${getTotal()}`;
}

function getTotal() {
  let total = 0;
  for (let index = 0; index < cart.length; index++) {
    total += cart[index].price * cart[index].quantity;
  }
  return total;
}

function getQuantity() {
  let quantity = 0;
  for (let index = 0; index < cart.length; index++) {
    quantity += cart[index].quantity;
  }
  return quantity;
}

function removeItem(name, quantity = 0) {
  for (let index = 0; index < cart.length; index++) {
    if (cart[index].name === name) {
      if (quantity > 0) {
        cart[index].quantity -= 1;
      }
      if (cart[index].quantity < 1 || quantity === 0) {
        cart.splice(index, 1);
      }
    }
  }
}

// addItem("Apple", 0.99);
// addItem("Apple", 0.99);
// addItem("Apple", 0.99);
// addItem("Pear", 0.89);
showItems();
