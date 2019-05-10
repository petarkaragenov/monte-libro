let dir = -1;
let category = 'book-count';

fetchData(dir, category);

function reload(columnHighlighted = [ '', 'blue lighten-5']) {
	document.querySelector('tbody').innerHTML = '';
	dir *= -1;
	fetchData(dir, category, columnHighlighted);
}

document.getElementById('reads').addEventListener('click', function() {
	category = 'book-count';
	reload();
})

document.getElementById('username').addEventListener('click', function() {
	category = 'username';
	reload([ 'blue lighten-5', '']);
})

function fetchData(dir, category, columnHighlighted = [ '', 'blue lighten-5']) {
	fetch(`https://books-a3fc.restdb.io/rest/user-rankings?sort=${category}&dir=${dir}`, {
	  method: 'GET', 
	  headers:{
	    'Content-Type': 'application/json',
		"x-apikey": "5c618661f210985199db5572",
		"cache-control": "no-cache"
	  }
	}).then(res => res.json())
	.then(response => {
		let output = "";
		response.forEach(user => {
			output += `
				<tr data-index="${user._id}">
					<td>
						<img class="responsive-img" src="https://books-a3fc.restdb.io/media/${user['profile-picture'][0]}" />
					</td>
					<td class="${columnHighlighted[0]}">${user['username']}</td>
					<td class="${columnHighlighted[1]}">${user['book-count']}</td>
					<td class="hide-on-small-only"><a href="${user._id}.html">View Profile</a></td>
				</tr>
			`;
		})
		
		document.querySelector('tbody').innerHTML = output;
		
	})
	.catch(error => console.error('Error:', error));
}

document.querySelector('tbody').addEventListener('click', function(e) {
	if (e.target.tagName === 'TD') {
		moqupGetProfile(e.target.parentNode.getAttribute('data-index'));
	}
})

function moqupGetProfile(loc) {
	if (window.innerWidth < 601) {
		window.location = `${loc}.html`;
	}
	
}