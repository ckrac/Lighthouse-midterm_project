
$(document).ready(function() {

	const createMenuElement = (menuObj) => {

		let $menu = $(`


























		`)
	}

	const renderMenu = (menu) => {
	//loop through menu items to render to page
 		for (let items of menu) {
 		let $menuValue = createMenuElement(items);
	//will append to page
 		$(//thisclass)//.prepend($menuValue);
 		}

	}


	$(() => {
  		$.ajax({
    	method: "GET",
    	url: "/api/users"
  		}).done((users) => {
    		for(user of users) {
      			$("<div>").text(menu.name).appendTo($("body"));
    		}
  		});;
	});

})