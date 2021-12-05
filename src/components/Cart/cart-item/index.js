import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { currencySymbol, currencyToAmount } from "../../../helpers";

import {
  removeItemFromCart,
  addQuantityToCartItem,
  removeQuantityFromCartItem,
} from "../../../redux/cart/cart.actions";

import { changeAttributeItem } from "../../../redux/attributes/attributes.actions";

import * as styles from "./cart-item.module.css";

class CartItem extends PureComponent {
  constructor(props) {
    super(props);

    this.handleRightImages = this.handleRightImages.bind(this);
    this.handleLeftImages = this.handleLeftImages.bind(this);

    this.state = {
      mainImage: 0,
    };
  }

  handleRightImages(ix) {
    this.setState({
      mainImage: this.state.mainImage === ix - 1 ? 0 : this.state.mainImage + 1,
    });
  }

  handleLeftImages(ix) {
    this.setState({
      mainImage: this.state.mainImage === 0 ? ix - 1 : this.state.mainImage - 1,
    });
  }

  render() {
    const { id, name, prices, gallery, attributes, quantity } = this.props.item;

    const selectedAttributes = this.props.selectedAttributes.find(
      (product) => product.id === id
    );

    return (
      <div className={styles.cart__item}>
        <button
          className={styles.cart__remove__btn}
          onClick={() => this.props.removeItemFromCart(id)}
        >
          &#10005;
        </button>
        <div className={styles.details}>
          <span className={styles.name}>{name}</span>
          <span className={styles.price}>
            {currencySymbol(this.props.currency)}{" "}
            {prices[currencyToAmount(this.props.currency)].amount}
          </span>
          {/* {JSON.stringify(attributes)} */}

          {attributes &&
            attributes.map((attribute, ix) => (
              <div className={styles.product__attributes} key={attribute.id}>
                {attribute.id === "Capacity" ||
                attribute.id === "Size" ||
                attribute.id === "Color" ? (
                  ""
                ) : (
                  <p
                    className={styles.attribute__title}
                  >
                    {attribute.id}:
                  </p>
                )}

                <div className={styles.attribute__items}>
                  {attribute.items.map((item) => (
                    <div
                      key={item.id}
                      className={`${styles.attribute__item} ${
                        selectedAttributes &&
                        selectedAttributes.attributes[ix].selected === item.id
                          ? styles.selected
                          : ""
                      } ${
                        attribute.id !== "Capacity"                         
                          ? styles.attribute__item__color
                          : ""
                      }`}
                      style={{
                        background: `${
                          attribute.id === "Color" ? item.value : ""
                        }`,
                        opacity: `${
                          attribute.id === "Color"
                            ? selectedAttributes &&
                              selectedAttributes.attributes[ix].selected ===
                                item.id
                              ? "1"
                              : "0.2"
                            : ""
                        }`,
                      }}
                      onClick={() =>
                        this.props.changeAttributeItem({
                          productId: this.props.item.id,
                          attributeId: attribute.id,
                          itemId: item.id,
                        })
                      }
                    >
                      {item.value.includes("#") ? "" : item.value}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className={styles.quantity}>
          <span
            className={styles.quantity__add}
            onClick={() => this.props.addQuantityToCartItem(this.props.item)}
          >
            +
          </span>
          <span>{quantity}</span>
          <span
            className={styles.quantity__remove}
            onClick={() =>
              this.props.removeQuantityFromCartItem(this.props.item)
            }
          >
            -
          </span>
        </div>
        <div className={styles.img__wrapper}>
          {gallery.length === 1 ? null : (
            <span
              className={styles.img__arrows}
              onClick={() => this.handleLeftImages(gallery.length)}
            >
              &#60;
            </span>
          )}

          <img src={gallery[Number(this.state.mainImage)]} alt={name} />
          {gallery.length === 1 ? null : (
            <span
              className={styles.img__arrows}
              onClick={() => this.handleRightImages(gallery.length)}
            >
              &#62;
            </span>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencies.currency,
  selectedAttributes: state.attributesList.attributesList,
});

const mapDispatchToProps = (dispatch) => ({
  removeItemFromCart: (item) => dispatch(removeItemFromCart(item)),
  addQuantityToCartItem: (item) => dispatch(addQuantityToCartItem(item)),
  removeQuantityFromCartItem: (item) =>
    dispatch(removeQuantityFromCartItem(item)),
  changeAttributeItem: (item) => dispatch(changeAttributeItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
