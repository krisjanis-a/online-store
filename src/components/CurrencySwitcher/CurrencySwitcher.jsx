import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./CurrencySwitcher.css";
import currencySymbols from "../../utils/currencySymbols";

export class CurrencySwitcher extends PureComponent {
  constructor(props) {
    super(props);
    this.currencySwitcherRef = React.createRef();

    this.clickInsideComponent = this.clickInsideComponent.bind(this);
  }

  setNewCurrency(newCurrency) {
    this.props.setCurrency(newCurrency);
  }

  componentDidMount() {
    window.addEventListener("mousedown", this.clickInsideComponent);
  }

  componentDidUpdate() {
    console.log(this.props.currency);
  }

  clickInsideComponent(e) {
    e.stopPropagation();
    const switcherButton = document.querySelector(".currency_button");
    if (
      !this.currencySwitcherRef.current.contains(e.target) &&
      !switcherButton.contains(e.target)
    ) {
      this.props.toggleCurrencySwitcher();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.clickInsideComponent);
  }

  render() {
    return (
      <div className="currency_switcher" ref={this.currencySwitcherRef}>
        <ul className="currency_list">
          {this.props.currencies.currencies.map((currency) => (
            <li
              className="currency_item"
              key={currency}
              onClick={() => {
                this.setNewCurrency(currency);
                this.props.toggleCurrencySwitcher();
              }}
            >
              {`${currencySymbols[currency]} ${currency}`}
            </li>
          ))}
        </ul>
      </div>
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
      dispatch({
        type: "SET_CURRENCY",
        payload: currency,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
