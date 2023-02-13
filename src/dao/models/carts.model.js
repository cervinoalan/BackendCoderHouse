const mongoose = require('mongoose')

const cartsSchema = new mongoose.Schema([
	{
		priceTotal: {
			type: Number,
			default: 0,
		},
		quantityTotal: {
			type: Number,
			default: 0,
		},
		products: {
			type: Array,
			default: [],
		},
		user:{
			tpye: String,
		}
	},
])

const cartsModel = mongoose.model('carts', cartsSchema)

module.exports = cartsModel
