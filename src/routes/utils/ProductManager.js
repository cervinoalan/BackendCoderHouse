const fs = require("fs");

const writeFile = (path, products) =>
  fs.promises.writeFile(path, JSON.stringify({ products: products }));

const readFile = async (path) => {
  const asyncGetProducts = await fs.promises.readFile(path, {
    encoding: "utf-8",
  });
  const parseResult = JSON.parse(asyncGetProducts);

  return parseResult;
};

class ProductManager {
  constructor(path) {
    this.products = []; //ARRAY CONTENEDOR DE LOS PRODUCTOS
    this.path = path;
  }

  initialize = async () => {
    const fileExist = fs.existsSync(this.path);
    if (fileExist) {
      console.log("El archivo ya existe");
      const { products } = await readFile(this.path);
      this.products = products;
    } else {
      await writeFile(this.path, this.products);
      console.log("El archivo se creo exitosamente");
    }
  };

  addProduct = async ({
    title,
    description,
    price,
    status = true,
    thumbnail,
    stock,
    category,
    code,
  }) => {
    // METODO PARA AGREGAR PRODUCTOS
    if (title && description && price && status && stock && category && code) {
      // VALIDACION TODOS LOS DATOS SON OBLIGATORIOS
      const { products } = await readFile(this.path);
      this.products = products;
      let exist = this.products.find((element) => element.code === code);
      if (exist) {
        // VALIDACION CODE IRREPETIBLE
        throw new Error("Ya existe un producto con ese code");
      } else {
        this.products.push({
          id: this.products.length, //GENERA UN ID AUTOINCREMENTABLE
          title,
          description,
          price,
          status,
          thumbnail,
          stock,
          category,
          code,
        });
        await writeFile(this.path, this.products);
        console.log("Producto agregado exitosamente");
      }
    } else {
      throw new Error("Falta ingresar uno o mas datos");
    }
  };

  getProducts = async () => {
    // METODO QUE DEVUELVE EL ARRAY DE LOS PRODUCTOS
    const fileData = await readFile(this.path);
    return fileData.products;
  };

  getProductById = async (id) => {
    // METODO PARA OBTENER PRODUCTO POR ID
    const { products } = await readFile(this.path);
    this.products = products;
    const Product = products[id];
    if (Product) {
      return Product;
    } else {
      throw new Error("Producto no encontrado");
    }
  };

  updateProduct = async (id, newProduct) => {
    // metodo para actualizar un producto por id
    const { products } = await readFile(this.path);
    this.products = products;
    const findIndexProduct = this.products.findIndex(
      (product) => product.id == id
    );

    if (findIndexProduct !== -1) {
      const id = this.products[findIndexProduct].id;
      if(id == newProduct.id){
      this.products[findIndexProduct] = {
        id,
        ...newProduct,}
      }else{
        throw new Error("No es posible modificar el id del producto");
      }
      await writeFile(this.path, this.products);
      console.log("Actualizado correctamente");
    } else {
      throw new Error("No se encuentra un producto con ese id");
    }
  };

  deleteProduct = async (id) => {
    // metodo para eliminar producto por id
    const { products } = await readFile(this.path);
    this.products = products;
    const findIndexProduct = this.products.findIndex(
      (product) => product.id === id
    );

    if (findIndexProduct !== -1) {
      const newProducts = this.products.filter((product) => product.id !== id);
      await writeFile(this.path, newProducts);
      console.log("Eliminado correctamente");
    } else {
      throw new Error("No se encuentra un producto con ese id");
    }
  };
}

const ProductM = new ProductManager(__dirname + "/../../assets/products.json");
module.exports = ProductM;
