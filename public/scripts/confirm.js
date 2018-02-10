$( document ).ready(function() {




  // });
  // console.log('hey')
  $('.submit').on('click', function (e) {
    console.log(e.val())
    // console.log('click')
    // console.log($(this))
    $.ajax({
      url: '/restaurant',
      method: 'POST',
      success: function (data) {
  //         //render home page ejs wbilepassing in a variable
        console.log('ajax')
      }
    });

  });

});
