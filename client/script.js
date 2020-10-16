const input = document.querySelector('.input');
const submit = document.querySelector('.submit');
const edit = document.querySelector('.edit');
const del = document.querySelector('.delete');
const tweetSection = document.querySelector('.tweets');

window.addEventListener('load', async () => {
	const tweets = await getTweets()
	tweets.forEach(tweet => {
		addToTweetSection(tweet.id, tweet.tweet)
	})
})

const getTweets = async () => {
	const getTweets = await fetch('http://localhost:5000/tweets')
	const response = await getTweets.json()
	return response
}

const updateAndDeleteButtons = `
	<td><button class="edit btn btn-warning edit">Edit</button></td>
	<td><button class="delete btn btn-danger delete">Delete</button></td>
`;

const addToTweetSection = (id,tweet) => {
	return (tweetSection.innerHTML += `
	<tr id=${id}>
	<td>${tweet}</td>
	${updateAndDeleteButtons}
	</tr>
`);
};

const addTweetRequest = async tweet => {
	const getRequest = await fetch('http://localhost:5000/tweets', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({tweet})
	});
	const response = await getRequest.json();
	return response.tweet;
};

submit.addEventListener('click', async () => {
	await addTweetRequest(input.value)
	location.reload()
});
