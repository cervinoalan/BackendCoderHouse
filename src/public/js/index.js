const socket = io();

socket.on("init-products", ({ products }) => {
  console.log(products);
  const main = document.getElementById("list-products");
  main.innerHTML = "";
  products.forEach((product) => {
    console.log(product._id)
    main.innerHTML += `
    <div class="card" style="width: 15rem;">
    <img class="card-img-top" src="${product.thumnail}" alt="${product.title}">
    <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text"><strong>$${(product.prrice)}</strong></p>
    <button id="btnCompra-${product.id}" class="btn btn-dark">COMPRAR</button>
    </div>
    </div>
    `;;
  });
});

socket.on("delete-product", ({ id }) => {
  console.log(`El producto con el id: ${id} fue eliminado`);
});

socket.on("add-product", ({ data }) => {
  console.log(`Se ha agregado el producto: ${data.title}`);
  const main = document.getElementById("list-products");
  main.innerHTML += `<li id=${data._id}> ${data.title} </li>`;
});




        // <li id=${product._id}> ${product.title} </li>