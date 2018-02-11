
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


var order = {};

totalOrder = function(){

 var total = 0;
 for(var a in order){
   total += order[a];
 }

 $('.finalprice p').text('$' + total);

}

$(document).ready(function() {



 $('input').on('keyup', function() {

     var $section = $(this).closest('section');
     var id = $section.attr('data-itemid');
     var input = $section.find('.amount input').val();
     var price = $section.find('.price').text();
     order['menuItem_'+id] = input*price;
     totalOrder();

 });

})


loadMenu();



