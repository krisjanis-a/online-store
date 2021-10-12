import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./CurrencySwitcher.css";
import currencySymbols from "../../utils/currencySymbols";

import { setCurrency } from "../../store/actions/currencyActions";

export class CurrencySwitcher extends PureComponent {
  constructor(props) {
    super(props);
    this.currencySwitcherRef = React.createRef();

    this.clickInsideComponent = this.clickInsideComponent.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mousedown", this.clickInsideComponent);
  }

  clickInsideComponent(e) {
    const { toggleCurrencySwitcher } = this.props;

    e.stopPropagation();
    const switcherButton = document.querySelector(".currency_button");
    if (
      !this.currencySwitcherRef.current.contains(e.target) &&
      !switcherButton.contains(e.target)
    ) {
      toggleCurrencySwitcher();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.clickInsideComponent);
  }

  render() {
    return (
      <div className="currency_switcher" ref={this.currencySwitcherRef}>
        {this.renderCurrencyList()}
      </div>
    );
  }

  renderCurrencyList() {
    const { currencies } = this.props.currencies;

    return (
      <ul className="currency_list">
        {currencies.map((currency) => this.renderCurrency(currency))}
      </ul>
    );
  }

  renderCurrency(currency) {
    const { setCurrency, toggleCurrencySwitcher } = this.props;

    return (
      <li
        className="currency_item"
        key={currency}
        onClick={() => {
          setCurrency(currency);
          toggleCurrencySwitcher();
        }}
      >
        {`${currencySymbols[currency]} ${currency}`}
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    currencies: state.currencies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (currency) => {
      dispatch(setCurrency(currency));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
