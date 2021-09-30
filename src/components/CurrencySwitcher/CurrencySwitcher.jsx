import React, { Component } from "react";
import "./CurrencySwitcher.css";

export class CurrencySwitcher extends Component {
  render() {
    return (
      <div className="currency_switcher">
        <ul className="currency_list">
          <li className="currency_item">USD</li>
          <li className="currency_item">GBP</li>
          <li className="currency_item">JPY</li>
        </ul>
      </div>
    );
  }
}

export default CurrencySwitcher;
