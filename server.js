const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Tweet = require('./server/Models/TweetModel');
const cors = require('cors');
const morgan = require('morgan');

// db connection
mongoose
	.connect('mongodb://localhost/test', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(res => {
		app.listen(5000, () => {
			console.log('Server running on port 5000');
			console.log('Mongo DB connected');
		});
	})
	.catch(err => console.log(err));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// routes
app.get('/tweets', (req, res) => {
	Tweet.find()
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});

app.post('/tweets', (req, res) => {
	const tweet = new Tweet({ tweet: req.body.tweet });
	tweet
		.save()
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});

app.delete('/tweets/:id', (req, res) => {
	Tweet.findByIdAndDelete(req.params.id)
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});

app.delete('/tweets', (req, res) => {
	Tweet.deleteMany()
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});

app.put('/tweets/:id', (req, res) => {
	Tweet.findByIdAndUpdate(req.params.id, { tweet: req.body.tweet })
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});

app.get('/tweets/:id', (req, res) => {
	Tweet.findById(req.params.id)
		.then(result => res.status(200).json(result))
		.catch(err => console.log(err));
});
