const fs = require("fs");

const writeFile = (path, data) =>
  fs.promises.writeFile(path, JSON.stringify(data));

const readFile = async (path) => {
  const read = await fs.promises.readFile(path, { encoding: "utf-8" });
  const aux = read ? read : "[]";
  const parseResult = JSON.parse(aux);
  return parseResult;
};

class CartsManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  createCart = async () => {
    const carts = await readFile(this.path);
    const id = carts.length;
    carts.push({
      id,
      products: [],
    });
    await writeFile(this.path, carts);
    return id;
  };

  getCarts = async (id) => {
    const carts = await readFile(this.path);
    if (carts) {
      return carts;
    }
    throw new Error(`No existen carritos creados`);
  };

  getCartById = async (id) => {
    const carts = await readFile(this.path);
    if (carts[id]) {
      return carts[id];
    }
    throw new Error(`No existe un carrito con el id ${id}`);
  };

  updateCartProducts = async (cid, pid) => {
    const carts = await readFile(this.path);
    if (carts[cid]) {
      const productsIndex = carts[cid].products.findIndex((p) => p.id == pid);
      if (productsIndex !== -1) {
        carts[cid].products[productsIndex].quantity++;
      } else {
        carts[cid].products.push({ id: pid, quantity: 1 });
      }

      await writeFile(this.path, carts);
    } else {
      throw new Error("Carrito no encontrado");
    }
  };
}

const CartsManagerFS = new CartsManager(__dirname + "/../../assets/carts.json");
module.exports = CartsManagerFS;
