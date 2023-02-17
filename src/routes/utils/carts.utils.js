const ProductManager = require('../../dao/mongoManager/ProductManager')

const pm = new ProductManager()

const calculateCartTotal = (products) => {
    const result = products.reduce(
        (acc, curr) => acc + curr.unitValue * curr.quantity,
        0
    )
    return result
    
}

const mapProductCart = async(products) => {
    let productCartList = []
    let productsNotFound = []

    for (const idProduct of products) {
        const indexProduct = productCartList.findIndex(({product} ) => product === idProduct)

        if (indexProduct === -1) {
            const productDb = await pm.getProductById(idProduct)

            if (productDb) {
                productCartList.push({
                    product: idProduct,
                    quantity: 1,
                    unitValue: productDb.price,
                })
            }else{
                productsNotFound.push(idProduct)
            }
        } else {
            productCartList[indexProduct].quantity++
        }
    }

    return {productCartList, productsNotFound};
}

module.exports = {
    calculateCartTotal,
    mapProductCart
}