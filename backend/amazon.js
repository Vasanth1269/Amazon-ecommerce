import { cart , addTocart } from "../data/cart.js";
import { products } from "../data/products.js";


  let html="";
products.forEach((product)=>{
     
    html+=` <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.rating.stars}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
           $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="selecting"  onchange="logSelectedValue(event)">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>
          
          <div class="added-to-cart">
            <img src="images/icons/checkark.png">
            
          </div>

      

          <button class="add-to-cart-button button-primary" data-prodcet-name="${product.id}">
            Add to Cart
          </button>
        </div>`  
      
       
    
});

const quantityElement = document.querySelector(".products-grid");
if (quantityElement) {
  quantityElement.innerHTML = html;
}

function logSelectedValue(event) {
  console.log(event.target.value);
}


/*export let value ;
function addcard (buttonElement) {
  
      message(container) 
      const CartLength= cart.length
    document.querySelector(".cart-quantity-js").innerHTML = CartLength;
  
}*/



      let Nitems;
    document.querySelectorAll(".add-to-cart-button").forEach((item) => {
      item.addEventListener('click', (event) => {
        const buttonElement = event.currentTarget;
        const productId = buttonElement.dataset.prodcetName;
        const container = buttonElement.closest(".product-container"); // Get parent container
        const select = container.querySelector(".selecting");          // Get the <select> in this product
       let value = Number(select.value);
        addTocart(productId , value ); 
          message(container) 
            Nitems= cart.length
    document.querySelector(".cart-quantity-js").innerHTML = Nitems;
      });
      });
    function message(container) {
    const messageBox = container.querySelector(".product-spacer");
    messageBox.innerHTML = `<img src="images/icons/checkmark.png" alt="Added" style="width:16px; height:16px; margin-right:6px;"> added to cart`;

    setTimeout(() => {
      messageBox.innerHTML = "";
    },1000);
      };
  









  







