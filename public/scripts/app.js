

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;


const createMenuItem = (menuObj) => {

  let $menuItem = $(`
    <section data-itemid="${menuObj.id}">
      <div class="amount">
        <input type="number" placeholder="Quantity" min="0" name="${menuObj.id}">
      </div>
      <div class="item">
        <h1>${menuObj.name}</h1>
        <p class="food">${menuObj.description}</p>
        <p class="price" data-price"${menuObj.price}">${menuObj.price}</p>
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
      $('.orderwrapper').append($menuItem);
    }
  }

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

console.log('hey')
let counter = 0;
$('.orderwrapper').on('click', '.down', function(e) {
  console.log('clicked')
  counter++;
  $(this).closest('span').text(counter);
})


