const socket = io();

socket.on("init-products", ({ products }) => {
  console.log(products);
  const main = document.getElementById("list-products");
  main.innerHTML = "";
  products.forEach((product) => {
    main.innerHTML += `<li id=${product.id}> ${product.title} </li>`;
  });
});

socket.on("delete-product", ({ id }) => {
  console.log(`El producto con el id: ${id} fue eliminado`);
});

socket.on("add-product", ({ data }) => {
  console.log(`Se ha agregado el producto: ${data.title}`);
});
