import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { OptionsDelivery } from "../data/OptionDelivery.js";


 

   

 export function paymentSummary() {
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
     const shippingcharge = option_delivery.ShippingPrice
     Shippingcost += shippingcharge
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
            <div class="payment-summary-money">$ ${(productcost/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$ ${(Shippingcost/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$ ${(BeforTax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$ ${(Tax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$ ${(totalcost/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        
   `;
   document.querySelector(".payment-summary-js").innerHTML = paymentsummaryHtml;

}

    
    
    
    
     
