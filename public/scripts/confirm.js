
$( document ).ready(function() {

  function updatePost() {
      setInterval(function() {
          // grab url id
          const url = window.location.pathname;
          const id = url.substring(url.lastIndexOf('/') + 1);

          $.ajax({
              type: "GET",
              url: `/query/${id}`, //
              success: function(response) {
                const status = response[0].status;
                const eta = response[0].eta;
                  // If not false, update the page
                if (status === 'confirmed') {
                  $("h3").text(`Your order will be ready for pick up in ${eta} minutes.`);
                }
              }
          });
      }, 5000); // Do this every 5 seconds
  }

  updatePost();

});
