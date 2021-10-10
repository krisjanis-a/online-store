export default function calculateTotal() {
  const total = this.props.cartItems.map(
    (item) =>
      item.cartItem.prices.filter(
        (price) => price.currency === this.props.currency
      )[0].amount * item.quantity
  );
  return Number.parseFloat(total.reduce((a, b) => a + b)).toFixed(2);
}
