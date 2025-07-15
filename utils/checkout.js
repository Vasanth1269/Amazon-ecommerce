import { cart , DeleteItems, saveTocart} from "../data/cart.js";
import { products } from "../data/products.js";
import {OptionsDelivery} from  "../data/OptionDelivery.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {paymentSummary} from "../backend/paymentsummary.js"
import { priceCents } from "./money.js";

function Ordersummary (){
let cartdetial= "";

cart.forEach((productsId)=>{
     const productId=productsId.Name;
     let findItem;
    
    products.forEach((productIds=>{
        if (productIds.id === productId) {
            findItem = productIds;   
        } 
    }));
 const delivery_date = productsId.OptionsDeliveryid;
    
   
const product_delivery = OptionsDelivery.find(option => option.id === delivery_date)
 

const deliveryDays =  product_delivery.DeliveryDate

    
    const today = dayjs()
    const ShippingDay = today.add(deliveryDays,'days');
    console.log(ShippingDay);
    const dateString = ShippingDay.format('dddd MMMM D');
  
 
      cartdetial+= `<div class="cart-item-container cart-item-container-js-${findItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${findItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${findItem.name}
                </div>
                <div class="product-price">
                  $${priceCents(findItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label quantity-label-js-${findItem.id}">${productsId.quantity}</span>
                     
                  </span>
                  <input type="number" class="quantity-input-js-${findItem.id}" style="display: none; width:30px;" value="${productsId.quantity}" min="1" />
               
                  <span class="update-quantity-link link-primary  link-updata-js-${findItem.id}" data-productId=${findItem.id}>
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary link-delete-js" data-productId=${findItem.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                 ${DeliveryOption(findItem , productsId)}

              </div>
            </div>
          </div>`;;
          })
   function DeliveryOption(findItem , productsId){
        let html="";
        console.log(OptionsDelivery);
        OptionsDelivery.forEach(DeliveryOption => {
          const today = dayjs()
          const ShippingDay = today.add(DeliveryOption.DeliveryDate ,'days');
        
          const dateString = ShippingDay.format('dddd MMMM D');
        console.log(dateString)
        
        const priceCents = DeliveryOption.ShippingPrice === 0 ? 'FREE' : DeliveryOption.ShippingPrice ;
        let Shippingcost ;
        if(priceCents === "FREE"){
          Shippingcost = "FREE"; 
        } else{
          Shippingcost = (priceCents / 100).toFixed(2)
        }
        const isCheck = DeliveryOption.id === productsId.OptionsDeliveryid

    html += ` <div class="delivery-option js-delivery-option" data-product= ${findItem.id} data-OptionDelivery = ${DeliveryOption.id}>
                      <input type="radio" ${isCheck ? 'Checked': ""}  class="delivery-option-input"
                        name="delivery-option-${findItem.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${dateString}
                        </div>
                        <div class="delivery-option-price">
                          $ ${Shippingcost} - Shipping
                        </div>
                      </div>
                    </div>

          ` 
      });
    
            
      return html ;
          
   }


const querySelector = document.querySelector(".order-summary-js")
  if(querySelector){
    querySelector.innerHTML=cartdetial;
     paymentSummary()
  }


document.querySelectorAll(".link-delete-js").forEach((button) => {
  button.addEventListener('click', () => {

   const productId= button.dataset.productid
   console.log(productId);
    DeleteItems(productId);
   const deletecontainer= document.querySelector(`.cart-item-container-js-${productId}`)
   deletecontainer.remove();
   paymentSummary();
   
  });
});
document.querySelector(".total-items").innerHTML=` ${cart.length} items`;

/* document.querySelectorAll(".link-updata-js").forEach((button)=>{
    button.addEventListener('click',()=>{
     const productId = button.dataset.productid
     console.log(productId);    
    })
  })*/
  
    cart.forEach(button => {
  const productId = button.Name;

  const quantitybutton = document.querySelector(`.quantity-label-js-${productId}`);
  const InputButton = document.querySelector(`.quantity-input-js-${productId}`);
  const UpdateButton = document.querySelector(`.link-updata-js-${productId}`);

    UpdateButton.addEventListener('click', () => {
      const inner = UpdateButton.innerText.trim()
      if (inner === "Update") {
         InputButton.style.display = 'inline';
        quantitybutton.style.display = 'none';
        UpdateButton.innerText = 'Save';
      }
      else {
         const newQuantity = parseInt(InputButton.value);
          if (newQuantity > 0) {
             quantitybutton.innerText = newQuantity;
          const cartItem = cart.find(c => c.Name === productId);

             
            cartItem.quantity = newQuantity;
            saveTocart()
          
          InputButton.style.display = 'none';
          quantitybutton.style.display = 'inline';
          UpdateButton.innerText = 'Update';
      } else {
         alert(`Amazon :${"Quantity must be greater than 0"}`);
      }
    }
     paymentSummary();
    });
     
});

document.querySelectorAll(".js-delivery-option")
  .forEach((c)=>{
    c.addEventListener('click' , ()=>{
      const productId = c.dataset.product
      const DeliveryOption = c.dataset.optiondelivery
     DeliveryDate(productId , DeliveryOption)
     console.log(DeliveryOption);
    })
  })


 function DeliveryDate(productId , DeliveryOption) {
       let findItem;
      cart.forEach((productIds=>{
        if (productIds.Name === productId) {
            findItem = productIds; 
            findItem.OptionsDeliveryid = DeliveryOption;  
        } 
       
    }));
    saveTocart();
    Ordersummary ()
 }
  
}
Ordersummary ()
paymentSummary();
 





