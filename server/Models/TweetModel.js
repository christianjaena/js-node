const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tweetSchema = new Schema({
	tweet: {
		type: String,
		required: true,
	},
});

const Tweet = new model('Tweet', tweetSchema);
module.exports = Tweet;
