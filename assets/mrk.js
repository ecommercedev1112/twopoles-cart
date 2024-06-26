var isPage = $('body').hasClass('template-cart');
function cartInnerSlider() {
  if ($(".cart-drawer-slider").length > 0) {
    $(".cart-drawer-slider").slick({
      arrows: true,
      slidesToShow: 2.4,
      slidesToScroll: 1,
      infinite: false,
      dots: false,
      prevArrow:
        '<button type="button" class="prev-arrow"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#000000"></path></svg></button>',
      nextArrow:
        '<button type="button" class="next-arrow"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#000000"></path> </g></svg></button>',
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });
  }
  if ($(".js-cart-drawer-slider").length > 0) {
    $(".js-cart-drawer-slider").slick({
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      dots: false,
      prevArrow:
        '<button type="button" class="prev-arrow"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#000000"></path></svg></button>',
      nextArrow:
        '<button type="button" class="next-arrow"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#000000"></path> </g></svg></button>',
    });
  }
}
$('[data-drawer-id="sidebar-cart"]').on("click", function () {
  setTimeout(updateCart, 300);
});

function updateCartItem(key, quantity) {
  let current_item = {};
  current_item[key] = quantity;
  $.ajax({
    url: "/cart/update.js",
    data: {
      updates: current_item,
    },
    method: "POST",
    dataType: "JSON",
    success: function (data) {
      updateCart();
      document.documentElement.dispatchEvent(
        new CustomEvent("cart:change", {
          bubbles: true,
          detail: {
            cart: data,
          },
        })
      );
    },
  });
}
function initCart() {
  $(".CartItem__QuantitySelector a").off("click");
  $(".CartItem__QuantitySelector a").on("click", function (e) {
    e.preventDefault();
    let input = $(this).closest(".CartItem__QuantitySelector").find("input");
    let currentValue = parseInt(input.val());
    let key = $(this).closest(".QuantitySelector").attr("data-key");
    if ($(this).hasClass("js_qtyminus") || $(this).hasClass("js_cart_minus")) {
      currentValue--;
    } else {
      currentValue++;
    }
    input.val(currentValue);
    updateCartItem(key, currentValue);
  });

  // Event handler for removing item from cart
  $(".remove-cart-product").off("click");
  $(".remove-cart-product").on("click", function (e) {
    e.preventDefault();
    let key = $(this).attr("data-key");
    updateCartItem(key, 0); // Set quantity to 0 to remove item
    $(this).closest(".CartItem").fadeOut();
  });
  $('.Drawer__Close, .PageOverlay').off("click");
  $('.Drawer__Close, .PageOverlay').on("click", function () {
    $(".PageOverlay").removeClass("is-visible");
    $("#sidebar-cart").attr("aria-hidden", "true");
  });
  progressValue();
  cartInnerSlider();
}
$(document).on("product:added", function () {
  updateCart();
  $.ajax({
    type: "GET",
    url: "/cart.js",
    dataType: "json",
    success: function (data) {
      document.documentElement.dispatchEvent(
        new CustomEvent("cart:change", {
          bubbles: true,
          detail: {
            cart: data,
          },
        })
      );
    },
  });
});
function updateCart() {
  if(isPage){
    $.ajax({
       url: "/cart?view=ajax",
       dataType: "HTML",
       method: "GET",
       success: function (htmlData) {
          let to_replace = $(htmlData).html();
          $("#shopify-section-cart-template").html(to_replace);
          initCart();
          cartSampleSlider();
       },
    });
  }else{
    $.ajax({
      url: "/cart?view=drawer",
      dataType: "HTML",
      method: "GET",
      success: function (htmlData) {
        let to_replace = $(htmlData).html();
        $("#sidebar-cart").html(to_replace);
        initCart();
      },
    });
  }
}
function openCart() {
  $(".PageOverlay").addClass("is-visible");
  $("#sidebar-cart").attr("aria-hidden", "false");
}
$(".js-product-atc").on("click", function (e) {
  e.preventDefault();
  var id = $(this).attr("data-var-id");
  var qty = 1;
  addToCart(id, qty);
});
$(document).on("theme:loading:end" , function (e) {
  console.log(e);
  setTimeout(function(){
    $(".js-product-atc").off("click");
    $(".js-product-atc").on("click", function (e) {
      e.preventDefault();
      var id = $(this).attr("data-var-id");
      var qty = 1;
      addToCart(id, qty);
    });
  },500)
});
// Function to add a product to the cart
function addToCart(id, qty) {
  var data = {
    quantity: qty,
    id: id,
  };

  $.ajax({
    type: "POST",
    url: "/cart/add.js",
    data: data,
    dataType: "json",
    success: function (data) {
      updateCart();
      openCart();
      $.ajax({
        type: "GET",
        url: "/cart.js",
        dataType: "json",
        success: function (data) {
          document.documentElement.dispatchEvent(
            new CustomEvent("cart:change", {
              bubbles: true,
              detail: {
                cart: data,
              },
            })
          );
        },
      });
    },
    error: function (error) {
      // Handle error here, e.g., displaying an error message
      console.error("Error adding item to cart:", error);
    },
  });
}
$(function(){
  if(isPage){
    console.log('hello');
    initCart()
  }
})
