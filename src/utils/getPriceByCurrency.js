export default function getPriceByCurrency(prices) {
  const { currency } = this.props;

  const priceObj = prices.filter((price) => price.currency === currency);
  if (priceObj[0]) {
    const amount = priceObj[0].amount;
    return amount;
  }
}
