const MIN_PRICE = 1; // ₹50 minimum

function processPriceForStripe(price) {
  var numPrice = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(numPrice) || numPrice <= 0) {
    throw new Error("Invalid price");
  }

  if (numPrice < MIN_PRICE) {
    numPrice = MIN_PRICE;
  }

  // Stripe expects amount in paise (smallest currency unit)
  return Math.round(numPrice * 100);
}
