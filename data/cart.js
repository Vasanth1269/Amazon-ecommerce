
 export let cart;
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"

const today = dayjs();
const ShippingDay = today.add(1,"day");
console.log(ShippingDay.format('dddd,MMMM D'))

cart = JSON.parse(localStorage.getItem('cart'))
 
if (!cart) {
    cart = [
    { Name: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 1, OptionsDeliveryid: 1,},
    { Name: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 1, OptionsDeliveryid: 2, },
     { Name: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 1, OptionsDeliveryid: 3, }
  ];
  
} 

 export function saveTocart() {
  localStorage.setItem('cart',JSON.stringify(cart))
};
  
console.log(cart);

  

 export function addTocart(productId , value ) {
  let MatchingItem = cart.find((product) => product.Name === productId);

  if (MatchingItem) {
    MatchingItem.quantity += value;

  } else {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
console.log(randomNumber);

    cart.push({
      Name: productId,
      quantity: value,
      OptionsDeliveryid:randomNumber.toString(),
    });
  }
  console.log("quantity:",value);
  console.log("Current cart:", cart);
  saveTocart()
};

export function DeleteItems(productId) {
  const newCart = [];
  cart.forEach((item) => {
    if (item.Name !== productId){
      newCart.push(item);
    };
   
   
  });
   cart = newCart;
   saveTocart()
} ;



 
 






       
