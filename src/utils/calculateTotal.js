export default function calculateTotal() {
  const { cartItems, currency } = this.props;

  const total = cartItems.map(
    (item) =>
      item.cartItem.prices.filter((price) => price.currency === currency)[0]
        .amount * item.quantity
  );
  return Number.parseFloat(total.reduce((a, b) => a + b)).toFixed(2);
}
