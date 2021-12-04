import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import getAllCategoriesList from "../../queries/get-all-categoriesList";
import { currencySymbol } from "../../helpers";

import { connect } from "react-redux";
import {
  listCurrencies,
  toggleCurrenciesHidden,
} from "../../redux/currency/currency.actions";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import CartIcon from "../Cart/Cart-Icon";
import CartDropdown from "../Cart/Cart-Dropdown";

import Logo from "./Logo";

import * as styles from "./nav.module.css";
import Currencies from "../Currency/Currencies-Dropdown";

class Nav extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setWrapperRefCart = this.setWrapperRefCart.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClickOutsideCart = this.handleClickOutsideCart.bind(this);
  }

  async componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("mousedown", this.handleClickOutsideCart);

    this.props.listCurrencies();

    const result = await JSON.parse(
      JSON.stringify((await getAllCategoriesList()).categories)
    );

    this.setState({
      categoryList: result,
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("mousedown", this.handleClickOutsideCart);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  setWrapperRefCart(node) {
    this.wrapperRefCart = node;
  }

  handleClickOutside(event) {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      this.props.hiddenCurrencies === false
    ) {
      this.props.toggleCurrenciesHidden();
    }
  }

  handleClickOutsideCart(event) {
    if (
      this.wrapperRefCart &&
      !this.wrapperRefCart.contains(event.target) &&
      this.props.hidden === false
    ) {
      this.props.toggleCartHidden();
    }
  }

  render() {
    let hidden = this.props.hidden;
    let hiddenCurrencies = this.props.hiddenCurrencies;

    const currencies = this.props.currencies;

    return (
      <nav className={`${styles.nav} container`}>
        <ul>
          {this.state.categoryList.map((category) => (
            <li key={category.name}>
              <NavLink to={`/category/${category.name}`}>
                {category.name}
              </NavLink>
            </li>
          ))}

          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
        </ul>

        <Logo />

        <ul>
          <li
            ref={this.setWrapperRef}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "1rem",
              cursor: "pointer",
              fontWeight: "bold",
              position: "relative",
            }}
            onClick={() => this.props.toggleCurrenciesHidden()}
          >
            <span
              style={{ position: "absolute", right: "8px", fontWeight: "300" }}
            >
              {currencySymbol(this.props.currency)}
            </span>
            <span
              style={{
                fontSize: "2.2rem",
                transform: `rotate(-90deg)`,
              }}
            >
              {hiddenCurrencies ? <>&#8249;</> : <>&#8250;</>}
            </span>
            {hiddenCurrencies ? null : <Currencies currencies={currencies} />}
          </li>

          <li ref={this.setWrapperRefCart}>
            <CartIcon />
            {hidden ? null : <CartDropdown />}
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  hidden: state.cart.hidden,
  hiddenCurrencies: state.currencies.currenciesHidden,
  currencies: state.currencies.currencies,
  currency: state.currencies.currency,
});

const mapDispatchToProps = (dispatch) => ({
  listCurrencies: () => dispatch(listCurrencies()),
  toggleCurrenciesHidden: () => dispatch(toggleCurrenciesHidden()),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
