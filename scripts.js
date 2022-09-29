import data from "./data.js";

const itemsContainer = document.querySelector("#items");

const cartQuantity = document.getElementById("cart-quantity");
const itemList = document.getElementById("item-list");
const cartTotal = document.getElementById("cart-total");

itemList.onchange = function (event) {
  if (event.target && event.target.classList.contains("update")) {
    const name = event.target.dataset.name;
    const quantity = parseInt(event.target.value);
    updateCart(name, quantity);
  }
};

itemList.onclick = function (event) {
  if (event.target && event.target.classList.contains("remove")) {
    const name = event.target.dataset.name;
    removeItem(name);
  } else if (event.target && event.target.classList.contains("remove-one")) {
    const name = event.target.dataset.name;
    const quantity = 1;
    removeItem(name, quantity);
  } else if (event.target && event.target.classList.contains("add-one")) {
    const name = event.target.dataset.name;
    const price = event.target.dataset.price;
    addItem(name, price);
  }
};

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
      showItems();
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
    const addOneButton = `<button class='add-one' data-name='${name}'> + </button>`;
    const removeOneButton = `<button class='remove-one' data-name='${name}'> - </button>`;
    const removeButton = `<button class='remove' data-name='${name}'>Remove</button>`;
    const updateInput = `<input class='update' type='number' data-name=${name} data-price=${price}>`;
    itemString += `<li><p>${name}</p> <p>$${price} x ${quantity} = ${total.toFixed(
      2
    )}</p> ${removeButton} ${addOneButton} ${removeOneButton} ${updateInput}</li>`;
  }
  itemList.innerHTML = itemString;
  cartTotal.innerHTML = `Total in cart: $${getTotal()}`;
}

function getTotal() {
  let total = 0;
  for (let index = 0; index < cart.length; index++) {
    total += cart[index].price * cart[index].quantity;
  }
  return total.toFixed(2);
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
      showItems();
      return;
    }
  }
}

function updateCart(name, quantity) {
  for (let index = 0; index < cart.length; index++) {
    if (cart[index].name === name) {
      if (quantity < 1) {
        removeItem(name);
        return;
      }
      cart[index].quantity = quantity;
      showItems();
      return;
    }
  }
}

// addItem("Apple", 0.99);
// addItem("Apple", 0.99);
// addItem("Apple", 0.99);
// addItem("Pear", 0.89);
showItems();
