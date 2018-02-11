
$( document ).ready(function() {

  console.log('hey')

  function updatePost() {
      setInterval(function() {

          const url = window.location.pathname;
          const id = url.substring(url.lastIndexOf('/') + 1);
          console.log(id);

          $.ajax({
              type: "GET",
              url: `/query/${id}`, //
              success: function(response) {
                console.log('response', response);
                const status = response[0].status;
                const eta = response[0].eta;

                console.log('status', status);
                console.log('etaaa', eta);
                  // If not false, update the page
                  if (status === 'confirmed') {
                    console.log('here')
                    $("h3").text(`Your order will be ready for pick up in ${eta} minutes.`);
                  }
              }
          });
      }, 5000); // Do this every 5 seconds
  }

  updatePost();

});
