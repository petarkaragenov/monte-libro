const searchForm = document.getElementById('searchForm');
const filterForm = document.getElementById('filterForm');


searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	let searchQuery = document.getElementById('searchField').value;
	fetchData({}, {}, searchQuery)
	
});

filterForm.addEventListener('submit', (e) => {
	let sortBy = document.getElementById('sortBy').value;
	let show = document.getElementById('show').value;
	e.preventDefault();
	fetchData(show, sortBy)
});

fetchData();

function fetchData(results=10, category="title", filter={}) {
	let dir = (category === "author" || category === "title") ? 1 : -1;
	fetch(`https://books-a3fc.restdb.io/rest/books?max=${results}&sort=${category}&dir=${dir}&filter=${filter}`, {
	  method: 'GET', 
	  headers:{
	    'Content-Type': 'application/json',
		"x-apikey": "5c618661f210985199db5572",
		"cache-control": "no-cache"
	  }
	}).then(res => res.json())
	.then(response => {
		let output = "";
		response.forEach(book => {
			const tooltipText = (book.rating === null) ? "Not rated yet" : "Rated: " + parseFloat(book.rating).toFixed(2) + " with "
				    					 											 + parseInt(book.votes) + " votes.";
			output += `
				<div class="card hoverable">
					<div class="card-image">
						<img src="https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}">
					</div>
					<div class="card-content">
						<h6 class="card-title">${book.title}</h6>
						<p class="small-text">By ${book.author}</p>
						<span class="activator"><i class="material-icons right">more_vert</i></span>
						<p class="year">Year: ${book.year}</p>
						<div class="tooltipped stars" data-rating="${book.rating}" data-position="right" data-tooltip="${tooltipText}"></div>
					</div>
					<div class="card-reveal">
				      <span class="card-title grey-text text-darken-4">Description<i class="material-icons right">close</i></span>
				      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum molestiae suscipit ipsam sint rerum dicta at hic, dolores asperiores doloribus dolorem quas perspiciatis, itaque consequatur optio praesentium veniam dignissimos. Amet!</p>
				    </div>
					<div class="card-action">
			          <a href="register.html">Rate </a>
			          <a class="right red-text" disabled href="register.html">Read Now</a>
			        </div>
				</div>
			`;
		})
		document.getElementById('resultsContainer').classList.remove('spinner');
		document.getElementById('resultsContainer').classList.add('resultsContainer');
		document.getElementById('resultsContainer').innerHTML = output;

		// initialize tooltips////////////////////////////////////
		let elems = document.querySelectorAll('.tooltipped');
		let instances = M.Tooltip.init(elems);
		//////////////////////////////////////////////////////////


		document.querySelectorAll('.stars').forEach(ratingStars => {
			let myRater = rater(
			 	{
			        starSize:16,
			        element:ratingStars,
			        readOnly:true,
			        showToolTip: false,
			        rating: parseFloat(ratingStars.getAttribute('data-rating')),
			        rateCallback:function rateCallback(rating, done) {
			        	this.disable();
			            this.setRating(rating); 			            
			            done(); 
			    }
			});
		})		
	})
	.catch(error => console.error('Error:', error));
}