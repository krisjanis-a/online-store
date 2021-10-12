export default function getPriceByCurrency(prices) {
  const priceObj = prices.filter(
    (price) => price.currency === this.props.currency
  );
  if (priceObj[0]) {
    const amount = priceObj[0].amount;
    return amount;
  }
}
