const { faker } = require("@faker-js/faker");

faker.locale = "es";

const getMocking = async (req, res) => {
  try {
    const mockingProducts = generateProducts(100);
    return res.send(mockingProducts);
  } catch (error) {
    console.log(error);
    return res.send({ status: 500, error: "Error from server" });
  }
};

const generateProducts = (quantity) => {
  const products = [];
  for (let i = 0; i < quantity; i++) {
    const product = {
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      category: faker.commerce.department(),
      thumbnail: [faker.image.image()],
      status: true,
      code: faker.datatype.hexadecimal({ length: 5 }),
      stock: faker.datatype.number({ max: 100 }),
    };
    products.push(product);
  }
  return products;
};

module.exports = { generateProducts, getMocking };
