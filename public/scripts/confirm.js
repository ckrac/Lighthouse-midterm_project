
$( document ).ready(function() {

  console.log('hey')

  function updatePost() {
      setInterval(function() {

          const url = window.location.pathname;
          const id = url.substring(url.lastIndexOf('/') + 1);
          console.log(id);

          $.ajax({
              type: "GET",
              url: `/query/${id}`, // You add the id of the post and the update datetime to the url as well
              success: function(response) {
                // console.log('response', response);
                  // If not false, update the post
                  if (response) {
                      console.log('response', response)
                      // console.log('uid', uid)
                      // check database if id

                      // Update the h2 with the new title from the post
                      console.log('id', id)
                              // $("h3").text(response.body.Body);
                  }
              }
          });
      }, 5000); // Do this every 5 seconds
  }

  updatePost();

});
