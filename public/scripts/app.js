// creates a template for each menu item
const createMenuItem = (menuObj) => {

  let $menuItem = $(`
    <section data-itemid="${menuObj.id}">
      <div class="amount">
        <input type="number" placeholder="Quantity" min="0" name="${menuObj.id}">
      </div>
      <div class="item">
        <h1>${menuObj.name}</h1>
        <p class="food">${menuObj.description}</p>
        <p class="price" data-price="${menuObj.price}">${menuObj.price}</p>
      </div>
    </section>
  `)
  return $menuItem;
}

// renders orderpage with items from db
  const renderMenu = (menu) => {
  // loops through menu list
    for (let item of menu) {
      // calls createMenuItem for each menuItem
      let $menuItem = createMenuItem(item);
      // takes return value and appends it to the menu container
      $('.orderwrapper').append($menuItem);
    }
  }

// Loops through db to render orderpage and load it
  const loadMenu = () => {
    $.ajax({
    method: "GET",
    url: "/api/menu",
    success: function (moreMenu) {
      renderMenu(moreMenu);
    }
  });
}

// Function to sum order total
let order = {};

const totalOrder = () => {

  let total = 0;
  for(let a in order){
    total += order[a];
  }
  $('.finalprice p').text('$' + total);

}

$(document).ready(function() {

 $('input').on('keyup', function() {

     const $section = $(this).closest('section');
     const id = $section.attr('data-itemid');
     const input = $section.find('.amount input').val();
     const price = $section.find('.price').text();
     order['menuItem_'+id] = input*price;
     totalOrder();

 });

})

loadMenu();



