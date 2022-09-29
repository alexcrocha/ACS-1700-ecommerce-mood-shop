import data from "./data.js";

const itemsContainer = document.querySelector("#items");

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
  console.log(`You have ${getQuantity()} items in your cart`);
  console.log(`Total in cart: $${getTotal()}`);
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

addItem("Apple", 0.99);
addItem("Apple", 0.99);
addItem("Pear", 0.89);
showItems();