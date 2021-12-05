import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { addItemToCart } from "../../../redux/cart/cart.actions";
import { listSelectedAttributes } from "../../../redux/attributes/attributes.actions";

import WhiteShoppingIcon from "../../../images/white-empty-cart.png";

import { currencySymbol, currencyToAmount } from "../../../helpers";

import * as styles from "./product.module.css";

class ProductsListItem extends PureComponent {
  render() {
    return (
      <>
        {this.props.items.map((product) => (
          <div key={product.id} className={styles.product__wrapper}>
            <Link to={`/product/${product.id}`} className={styles.product}>
              <div className={styles.product__img__wrapper}>
                <img
                  className={styles.product__img}
                  src={product.gallery[0]}
                  alt={product.name}
                />
                {product.inStock ? null : (
                  <div className={styles.product__overlay}>Out of Stock</div>
                )}
              </div>
              <div
                className={`${styles.product__content} ${
                  product.inStock ? "" : styles.product__no__stock
                }`}
              >
                <h3>{product.name}</h3>
                <h3>{product.brand}</h3>
                <p>
                  {currencySymbol(this.props.currency)}{" "}
                  {product.prices[currencyToAmount(this.props.currency)].amount}
                </p>
              </div>
            </Link>
            {product.inStock ? (
              <button
                className={styles.product_add_to_cart}
                onClick={() => {
                  this.props.addItemToCart(product);
                  this.props.listSelectedAttributes({
                    id: product.id,
                    attributes: product.attributes,
                  });
                }}
              >
                <img src={WhiteShoppingIcon} alt="shopping icon" />
              </button>
            ) : null}
          </div>
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencies.currency,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart(item)),
  listSelectedAttributes: (item) => dispatch(listSelectedAttributes(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListItem);
