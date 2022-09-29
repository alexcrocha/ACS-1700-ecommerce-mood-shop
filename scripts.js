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
