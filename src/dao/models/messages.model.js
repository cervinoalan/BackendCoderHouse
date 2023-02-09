const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
	},
	message: {
		type: String,
		require: true,
	},
})
const chatModel = mongoose.model('messages', messageSchema)

module.exports = chatModel
