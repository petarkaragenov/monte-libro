$(function() {
  const images = $('.headerInner div');
  let imageIndex = 0;
  
  function changeImage() {
    $(images[imageIndex]).fadeOut(600, function() {

      if (imageIndex === images.length-1) {
    		imageIndex = 0;
    	} else {
    		imageIndex++;
    	}

    	$(images[imageIndex]).fadeIn(800);
    })
   }

   let interval = setInterval(changeImage, 6000);

    $('form').submit(function(e) {
      e.preventDefault();
      let email = $('input[type=email]').val();
      let date = new Date();
      let currentDate = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${date.getHours()}:${date.getMinutes()}`;
      
      postSubscribers(email, date);
    })

    function postSubscribers(email, date) {
      fetch("https://books-a3fc.restdb.io/rest/subscribers", {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        headers: {
            "Content-Type": "application/json",
            "x-apikey": "5c618661f210985199db5572"
        },
        body: JSON.stringify({email: email, date: date}), 
      })
      .then(response => response.json())
      .catch(error => console.error(error))
      .then(() => {
        fetch("https://books-a3fc.restdb.io/mail", {
          method: "POST", 
          mode: "cors", 
          cache: "no-cache", 
          headers: {
              "Host": "https://books-a3fc.restdb.io/",
              "Content-Type": "application/json",
              "x-apikey": "5c618661f210985199db5572"
          },
          body: JSON.stringify(

  {"to": email,"subject":"Subscription", "html": "<p>Thank you for your subscription</p>", "company": "MonteLibro", "sendername": "Petar Karagenov"}
          ), 
        }).then(() => window.location = "subscribers.html");
      })
    }

    
                    
})