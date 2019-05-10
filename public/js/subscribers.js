fetchData();

function fetchData() {
	fetch(`https://books-a3fc.restdb.io/rest/subscribers?sort=date&dir=-1`, {
	  method: 'GET', 
	  headers:{
	    'Content-Type': 'application/json',
		"x-apikey": "5c618661f210985199db5572",
		"cache-control": "no-cache"
	  }
	}).then(res => res.json())
	.then(response => {
		let output = "";
		response.forEach(subscriber => {
			output += `
				<tr>
					<td>${subscriber['email']}</td>
					<td>${subscriber['date'].slice(0, 16).replace('T', ' ')}</td>
				</tr>
			`;
		})
		output += '</tbody>';
		
		document.querySelector('tbody').innerHTML = output;
		
	})
	.catch(error => console.error('Error:', error));
}