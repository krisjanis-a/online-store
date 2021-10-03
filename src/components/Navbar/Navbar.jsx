import React, { Component } from "react";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import CartOverlay from "../CartOverlay/CartOverlay";
import "./Navbar.css";
import { connect } from "react-redux";
import makeQuery from "../../apolloClient";
import { setCategory } from "../../store/actions/categoryActions";
export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.getCategories();
    setCategory("dogs");
    // setCategory(this.state.categories[0]);
    console.log(this.props);
  }

  componentDidUpdate() {
    // this.getCategories();
    console.log(this.props);
    setCategory("dogs");
  }

  // Fetch categories

  getCategories() {
    const categoryQuery = "query { categories { name }}";

    makeQuery(categoryQuery)
      // .then((results) => console.log(results.categories))
      .then((results) => {
        this.setState({
          categories: results.categories.map((item) => item.name),
        });
      });
  }

  render() {
    return (
      <div className="navbar">
        <ul className="navbar_categories_list">
          {this.state.categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
        <div
          className="return_button"
          onClick={() => window.location.replace("/")}
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

        <div className="actions">
          <div className="currency_change">
            <div className="currency_button">
              <svg
                width="39"
                height="30"
                viewBox="0 0 39 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 16.5L35 19.5L38 16.5"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.13 20.798L16.138 20.816V23.426H15.13V20.798ZM15.22 20.6V9.638L16.03 9.512V20.636L15.22 20.6ZM15.13 6.83H16.138V9.404L15.13 9.53V6.83ZM19.144 11.402C19 11.234 18.808 11.072 18.568 10.916C18.328 10.76 18.058 10.622 17.758 10.502C17.458 10.37 17.128 10.268 16.768 10.196C16.42 10.112 16.054 10.07 15.67 10.07C14.686 10.07 13.96 10.256 13.492 10.628C13.024 11 12.79 11.51 12.79 12.158C12.79 12.614 12.91 12.974 13.15 13.238C13.39 13.502 13.756 13.718 14.248 13.886C14.752 14.054 15.388 14.228 16.156 14.408C17.044 14.6 17.812 14.834 18.46 15.11C19.108 15.386 19.606 15.758 19.954 16.226C20.302 16.682 20.476 17.294 20.476 18.062C20.476 18.674 20.356 19.208 20.116 19.664C19.888 20.108 19.564 20.48 19.144 20.78C18.724 21.068 18.232 21.284 17.668 21.428C17.104 21.56 16.492 21.626 15.832 21.626C15.184 21.626 14.548 21.56 13.924 21.428C13.312 21.284 12.73 21.08 12.178 20.816C11.626 20.552 11.11 20.222 10.63 19.826L11.404 18.458C11.596 18.662 11.842 18.866 12.142 19.07C12.454 19.262 12.802 19.442 13.186 19.61C13.582 19.778 14.008 19.916 14.464 20.024C14.92 20.12 15.388 20.168 15.868 20.168C16.78 20.168 17.488 20.006 17.992 19.682C18.496 19.346 18.748 18.86 18.748 18.224C18.748 17.744 18.604 17.36 18.316 17.072C18.04 16.784 17.626 16.544 17.074 16.352C16.522 16.16 15.85 15.968 15.058 15.776C14.194 15.56 13.468 15.326 12.88 15.074C12.292 14.81 11.848 14.468 11.548 14.048C11.26 13.628 11.116 13.082 11.116 12.41C11.116 11.594 11.314 10.904 11.71 10.34C12.106 9.776 12.652 9.35 13.348 9.062C14.044 8.774 14.83 8.63 15.706 8.63C16.282 8.63 16.816 8.69 17.308 8.81C17.812 8.93 18.28 9.098 18.712 9.314C19.144 9.53 19.54 9.788 19.9 10.088L19.144 11.402Z"
                  fill="#1D1F22"
                />
              </svg>
            </div>
            {/* <CurrencySwitcher /> */}
          </div>
          <div
            className="open_cart"
            onClick={() => window.location.replace("/cart")}
          >
            <div className="item_count"></div>
            <div className="cart_button">
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
            {/* <CartOverlay /> */}
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
