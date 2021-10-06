import React, { Component } from "react";
import { Link } from "react-router-dom";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import CartOverlay from "../CartOverlay/CartOverlay";
import "./Navbar.css";
import { connect } from "react-redux";
export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCurrencySwitcher: false,
      showCartOverlay: false,
    };

    this.toggleCartOverlay = this.toggleCartOverlay.bind(this);
    this.toggleCurrencySwitcher = this.toggleCurrencySwitcher.bind(this);
    this.setNewCategory = this.setNewCategory.bind(this);
  }

  // componentDidMount() {
  //   // console.log("Navbar component did mount");
  //   // Logging props
  //   // console.log(this.props);
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log("Navbar component did update");
  //   // Logging props
  //   // console.log(this.props);
  // }

  // Set new category

  setNewCategory(newCategory) {
    this.props.setCategory(newCategory);
  }

  // Show / Hide Cart Overlay

  toggleCartOverlay() {
    this.setState({
      showCartOverlay: !this.state.showCartOverlay,
    });
  }

  // Show / Hide Currency Switcher

  toggleCurrencySwitcher() {
    this.setState({
      showCurrencySwitcher: !this.state.showCurrencySwitcher,
    });
  }

  render() {
    const currencySymbols = {
      USD: "$",
      GBP: "­£",
      AUD: "$",
      JPY: "¥",
      RUB: "₽",
    };

    return (
      <div
        className="navbar_container"
        style={{ position: "sticky", top: "0", zIndex: "30" }}
      >
        {/* // <div> */}
        {this.state.showCartOverlay && (
          <div
            className="navbar_overlay_container"
            style={{ position: "relative" }}
          >
            <div className="navbar_overlay"></div>
          </div>
        )}
        <div className="navbar">
          <ul className="navbar_categories_list">
            {this.props.categories.categories.map((category) => (
              <Link to="/" key={category}>
                <li
                  className={category === this.props.category ? "active" : ""}
                  key={category}
                  onClick={() => this.setNewCategory(category)}
                >
                  {category}
                </li>
              </Link>
            ))}
          </ul>
          <Link to="/">
            <div
              title="Return to Home Page"
              className="return_button"
              // onClick={() => window.location.replace("/")}
            >
              <svg
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M34.0222 28.6646C34.0494 28.983 33.8009 29.2566 33.4846 29.2566H7.46924C7.15373 29.2566 6.90553 28.9843 6.93156 28.6665L8.7959 5.91227C8.8191 5.62962 9.05287 5.41211 9.33372 5.41211H31.5426C31.8226 5.41211 32.0561 5.62853 32.0801 5.91036L34.0222 28.6646Z"
                    fill="#1DCF65"
                  />
                  <path
                    d="M36.0988 34.6014C36.1313 34.9985 35.8211 35.339 35.4268 35.339H5.59438C5.2009 35.339 4.89092 35.0002 4.92208 34.6037L7.06376 7.34718C7.09168 6.9927 7.38426 6.71973 7.73606 6.71973H33.1958C33.5468 6.71973 33.8391 6.99161 33.868 7.34499L36.0988 34.6014Z"
                    fill="url(#paint0_linear)"
                  />
                  <path
                    d="M19.9232 26.6953C16.0402 26.6953 12.8813 22.8631 12.8813 18.1528C12.8813 17.9075 13.0782 17.7085 13.3211 17.7085C13.564 17.7085 13.7608 17.9073 13.7608 18.1528C13.7608 22.3732 16.5253 25.8067 19.9234 25.8067C23.3214 25.8067 26.0859 22.3732 26.0859 18.1528C26.0859 17.9075 26.2827 17.7085 26.5257 17.7085C26.7686 17.7085 26.9654 17.9073 26.9654 18.1528C26.9653 22.8631 23.8062 26.6953 19.9232 26.6953Z"
                    fill="white"
                  />
                  <path
                    d="M24.2581 18.0337C24.1456 18.0337 24.0331 17.9904 23.9471 17.9036C23.7754 17.7301 23.7754 17.4488 23.9471 17.2753L26.226 14.9729C26.3084 14.8897 26.4203 14.8428 26.5369 14.8428C26.6536 14.8428 26.7654 14.8895 26.8479 14.9729L29.1045 17.2529C29.2762 17.4264 29.2762 17.7077 29.1045 17.8812C28.9327 18.0546 28.6543 18.0547 28.4826 17.8812L26.5368 15.9155L24.569 17.9036C24.4831 17.9904 24.3706 18.0337 24.2581 18.0337Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="29.8733"
                    y1="31.3337"
                    x2="11.5132"
                    y2="9.9008"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#52D67A" />
                    <stop offset="1" stopColor="#5AEE87" />
                  </linearGradient>
                  <clipPath id="clip0">
                    <rect
                      width="31.16"
                      height="30.176"
                      fill="white"
                      transform="translate(4.91992 5.41211)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </Link>

          <div className="actions">
            <div className="currency_change">
              <div
                className="currency_button"
                onClick={() => {
                  this.toggleCurrencySwitcher();
                  this.setState({ showCartOverlay: false });
                }}
              >
                {/* SYMBOL */}
                <div className="currency_symbol">
                  {currencySymbols[this.props.currency]}
                </div>

                {this.state.showCurrencySwitcher ? (
                  // ARROW UP
                  <div className="arrow arrow_up">
                    <svg
                      width="8"
                      height="4"
                      viewBox="0 0 8 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3.5L4 0.5L7 3.5"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  // ARROW DOWN
                  <div className="arrow arrow_down">
                    <svg
                      width="8"
                      height="4"
                      viewBox="0 0 8 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 0.5L4 3.5L7 0.5"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="currency_switcher_wrapper">
                {this.state.showCurrencySwitcher ? (
                  <CurrencySwitcher
                    toggleCurrencySwitcher={this.toggleCurrencySwitcher}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="open_cart">
              {this.props.cartItems.length !== 0 ? (
                <div className="item_count">{this.props.cartItems.length}</div>
              ) : (
                <></>
              )}
              <div
                className="cart_button"
                onClick={() => {
                  this.toggleCartOverlay();
                  this.setState({ showCurrencySwitcher: false });
                }}
              >
                {/* ICON */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.5613 4.87359C19.1822 4.41031 18.5924 4.12873 17.9821 4.12873H5.15889L4.75914 2.63901C4.52718 1.77302 3.72769 1.16895 2.80069 1.16895H0.653099C0.295301 1.16895 0 1.45052 0 1.79347C0 2.13562 0.294459 2.418 0.653099 2.418H2.80069C3.11654 2.418 3.39045 2.61936 3.47434 2.92139L6.04306 12.7077C6.27502 13.5737 7.07451 14.1778 8.00152 14.1778H16.4028C17.3289 14.1778 18.1507 13.5737 18.3612 12.7077L19.9405 6.50575C20.0877 5.941 19.9619 5.33693 19.5613 4.87365L19.5613 4.87359ZM18.6566 6.22252L17.0773 12.4245C16.9934 12.7265 16.7195 12.9279 16.4036 12.9279H8.00154C7.68569 12.9279 7.41178 12.7265 7.32789 12.4245L5.49611 5.39756H17.983C18.1936 5.39756 18.4042 5.49824 18.5308 5.65948C18.6567 5.81994 18.7192 6.0213 18.6567 6.22266L18.6566 6.22252Z"
                    fill="#43464E"
                  />
                  <path
                    d="M8.44437 14.9814C7.2443 14.9814 6.25488 15.9276 6.25488 17.0751C6.25488 18.2226 7.24439 19.1688 8.44437 19.1688C9.64445 19.1696 10.6339 18.2234 10.6339 17.0757C10.6339 15.928 9.64436 14.9812 8.44437 14.9812V14.9814ZM8.44437 17.9011C7.9599 17.9011 7.58071 17.5385 7.58071 17.0752C7.58071 16.6119 7.9599 16.2493 8.44437 16.2493C8.92885 16.2493 9.30804 16.6119 9.30804 17.0752C9.30722 17.5188 8.90748 17.9011 8.44437 17.9011Z"
                    fill="#43464E"
                  />
                  <path
                    d="M15.6875 14.9814C14.4875 14.9814 13.498 15.9277 13.498 17.0752C13.498 18.2226 14.4876 19.1689 15.6875 19.1689C16.8875 19.1689 17.877 18.2226 17.877 17.0752C17.8565 15.9284 16.8875 14.9814 15.6875 14.9814ZM15.6875 17.9011C15.2031 17.9011 14.8239 17.5385 14.8239 17.0752C14.8239 16.612 15.2031 16.2493 15.6875 16.2493C16.172 16.2493 16.5512 16.612 16.5512 17.0752C16.5512 17.5188 16.1506 17.9011 15.6875 17.9011Z"
                    fill="#43464E"
                  />
                </svg>
              </div>
              <div className="cart_overlay_wrapper">
                {this.state.showCartOverlay ? (
                  <CartOverlay toggleCartOverlay={this.toggleCartOverlay} />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
    currency: state.currency,
    category: state.category,
    currencies: state.currencies,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCategory: (category) => {
      dispatch({
        type: "SET_CATEGORY",
        payload: category,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
