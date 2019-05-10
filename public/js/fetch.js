let state = {
	data: ""
}

fetch("https://books-a3fc.restdb.io/rest/user-rankings?sort=book-count&dir=-1", {
  method: 'GET', 
  headers:{
    'Content-Type': 'application/json',
	"x-apikey": "5c618661f210985199db5572",
	"cache-control": "no-cache"
  }
}).then(res => res.json())
.then(response => {
		
	state.data = response;
	
}).then(() => console.log(state.data))
.catch(error => console.error('Error:', error));

