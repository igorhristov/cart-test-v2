import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { currencySymbol, currencyToAmount } from "../../helpers";

import { addItemToCart } from "../../redux/cart/cart.actions";
import { changeAttributeItem } from "../../redux/attributes/attributes.actions";

import parse from "html-react-parser";

import * as styles from "./product-details.module.css";

class ProductDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.handleImages = this.handleImages.bind(this);
    this.state = {
      mainImage: 0,
    };
  }

  handleImages(ix) {
    this.setState({ mainImage: ix });
  }

  render() {
    const {
      id,
      name,
      description,
      brand,
      attributes,
      prices,
      inStock,
      gallery,
    } = this.props.details;

    const cartItem = (({ id, name, prices, attributes, gallery }) => ({
      id,
      name,
      prices,
      attributes,
      gallery,
    }))(this.props.details);

    const selectedAttributes = this.props.selectedAttributes.find(
      (product) => product.id === id
    );

    return (
      <div className={styles.product__details}>
        <div className={styles.side__images}>
          {gallery &&
            gallery.map((item, ix) => (
              <img
                key={`${name}-${ix}`}
                src={item}
                alt={name + " - " + (ix + 1)}
                onClick={() => this.handleImages(ix)}
              />
            ))}
        </div>

        <div className={styles.main__image}>
          <img
            src={gallery && gallery[Number(this.state.mainImage)]}
            alt={name}
          />
        </div>

        <div className={styles.product__details__content}>
          <h1 className={styles.product__title}>{name}</h1>
          <p>Status: {inStock ? "In Stock" : "Out of Stock"}</p>
          <h4 className={styles.product__brand}>{brand}</h4>
          
          {attributes &&
            attributes.map((attribute, ix) => (
              <div className={styles.product__attributes} key={attribute.id}>
                <h3>{attribute.id}:</h3>
                <div className={styles.attribute__items}>
                  {attribute.items.map((item) => (
                    <div
                      key={item.id}
                      className={`${styles.attribute__item} ${
                        selectedAttributes &&
                        selectedAttributes.attributes[ix].selected === item.id
                          ? styles.selected
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
                          productId: this.props.details.id,
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

          <div className={styles.product__price}>
            Price: <br />
            <div className={styles.product__price__symbol}>
              {currencySymbol(this.props.currency)}
              <span>
                {prices && prices[currencyToAmount(this.props.currency)].amount}
              </span>
            </div>
          </div>
          <button
            disabled={!inStock}
            className={`${styles.product__btn} ${!inStock ? "" : "disabled"}`}
            onClick={() => this.props.addItemToCart(cartItem)}
          >
            ADD TO CART
          </button>

          <div className={styles.product__description}>
            {" "}
            {parse(`${description}`)}
          </div>
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
  addItemToCart: (item) => dispatch(addItemToCart(item)),
  changeAttributeItem: (item) => dispatch(changeAttributeItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
