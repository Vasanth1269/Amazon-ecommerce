
import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { getDeliveryOptions } from "./getdeliveryoption.js";
import { priceCents } from "../utils/money.js";

 

   

 export async  function paymentSummary(){
  const  OptionsDelivery  = await getDeliveryOptions(); 
   
  let productcost = 0 ;

  let Shippingcost = 0 ;
    cart.forEach(p => {
  const  productId = p.Name;
 const   quantity= p.quantity
        const product = products.find(p=>(p.id === productId));
      if (product){
        const priceCents= product.priceCents * quantity;
        productcost += priceCents
      }
     const DeliveryOption = p.OptionsDeliveryid;
     
     const option_delivery = OptionsDelivery.find(dpro=>(DeliveryOption === dpro.id))
     if(option_delivery){
     const shippingcharge = option_delivery.ShippingPrice
     Shippingcost += shippingcharge;
     } else{
      console.log("missing delivery option for:" , DeliveryOption);
     }  
      
  });
     
   
    
  

     
   
  const BeforTax = productcost + Shippingcost;
  const Tax = BeforTax * 0.1 ;
   const totalcost = Tax + BeforTax;

   const paymentsummaryHtml = `
                
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">$ ${priceCents(productcost)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$ ${ priceCents(Shippingcost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$ ${priceCents(BeforTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$ ${priceCents(Tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$ ${ priceCents(totalcost)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        
   `;
   document.querySelector(".payment-summary-js").innerHTML = paymentsummaryHtml;

 }

