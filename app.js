// EVENT LISTENERS
document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
	//grab the number of jokes
	const number = document.querySelector('input[type="number"]').value

	if(number >= 1){
		// prepare for the xhr request
		const xhr = new XMLHttpRequest();

		// fetch from the external url
		xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

		xhr.onload = function() {
			if(this.status === 200) {
				const response = JSON.parse(this.responseText);

				let output = '';

				if(response.type === 'success') {
					//continue - loop through array and append to element
					//we're looping through values becuase each response is a separate object in this external API
					response.value.forEach(function(joke){
						output += `<li>${joke.joke}</li>`
					});
				} else {
					output += '<li>Something went wrong!</li>'
				}
				document.querySelector('.jokes').innerHTML = output;
			}
		}

		xhr.send();

		e.preventDefault();
	} else {
		displayAlert('Having problems? Don\'t worry, Chuck can help!')
		e.preventDefault();
	}
}

function displayAlert(message) {
	const div = document.createElement('div');
	div.className = 'alert'
	div.appendChild(document.createTextNode(message));

	//grab the parent and a sibling to place the div alert before
	const parentContainer = document.querySelector('.container');
	const form = document.querySelector('.joke-form');

	parentContainer.insertBefore(div, form);

	setTimeout(function(){
		document.querySelector('.alert').remove();
	}, 1500);
}
