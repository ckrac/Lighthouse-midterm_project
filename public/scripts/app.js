

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;

  // $.ajax({
  //   method: "GET",
  //   url: "/api/menu"
  // }).done((menu) => {
  //   for(item of menu) {
  //     console.log(item);
  //   }
  // });;
// });

const createMenuItem = (menuObj) => {

  let $menuItem = $(`
  <section>
      <div class="amount">
        <i class="fas fa-chevron-up"></i>
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="item">
        <h1>${menuObj.name}</h1>
        <p>${menuObj.description}</p>
        <p class="price">${menuObj.price}</p>
      </div>
    </section>
  `)
  return $menuItem;
}

  const renderMenu = (menu) => {
  // loops through menu list
    for (let item of menu) {
      // calls createMenuItem for each menuItem
      let $menuItem = createMenuItem(item);
      // takes return value and appends it to the menu container
      $('main').append($menuItem);
    }
  }

  // $.ajax({
  //   method: "GET",
  //   url: "/api/menu"
  // }).done((menu) => {
  //   // for(item of menu) {
  //   //   console.log(item);
  //   // }
  //   renderMenu(menu);
  // });;

  const loadMenu = () => {
    $.ajax({
    method: "GET",
    url: "/api/menu",
    success: function (moreMenu) {
      for(item of moreMenu) {
        console.log(item);
      }
      console.log(moreMenu);
      renderMenu(moreMenu);
    }
  });
}

loadMenu();

// $('main').on('click', function (e) {
//   console.log(e)
// })

