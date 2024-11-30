// function to check whether a given product is already in the cart:
export function isInCart(cart, product) {
  return cart.some((item) => item.id === product.id);
}

// function to check whether a given product is already liked:
export function isLiked(like, product) {
  return like.some((item) => item.id === product.id);
}

// function to calculate the total price of the cart:
export function calculateTotal(cart) {
  return cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * parseFloat(item.quantity),
    0
  );
}

// function to calculate 5% of the total price and return the amount + total price:
export function calculateTax(cart) {
  const total = calculateTotal(cart);
  const tax = total * 0.05;
  // return only upto 2 decimal points:
  return tax.toFixed(2);
}

// function to calculate 10% fixed discount on the total price:
export function calculateDiscount(cart) {
  const total = calculateTotal(cart);
  return (total * 0.1).toFixed(2);
}

// function to calculate discount due to promo code:
export function calculatePromoDiscount(cart, promoCode) {
  const total = calculateTotal(cart);
  if (promoCode === "OFF15") {
    return (total * 0.15).toFixed(2);
  }
  return 0;
}

// calculate 2% shipping cost on the total price:
export function calculateShipping(cart) {
  const total = calculateTotal(cart);
  return (total * 0.02).toFixed(2);
}

// function to calculate the grand total:
export function calculateGrandTotal(cart, promoCode) {
  const total = calculateTotal(cart);
  const tax = calculateTax(cart);
  const discount = calculateDiscount(cart);
  const promoDiscount = calculatePromoDiscount(cart, promoCode);
  const shipping = calculateShipping(cart);
  return (
    total +
    parseFloat(tax) +
    parseFloat(shipping) -
    parseFloat(discount) -
    parseFloat(promoDiscount)
  ).toFixed(2);
}

// total before promo code discount
export function calculateTotalBeforePromo(cart) {
  const total = calculateTotal(cart);
  const tax = calculateTax(cart);
  const discount = calculateDiscount(cart);
  const shipping = calculateShipping(cart);
  return (
    total +
    parseFloat(tax) +
    parseFloat(shipping) -
    parseFloat(discount)
  ).toFixed(2);
}
