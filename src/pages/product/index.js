import React, { PureComponent } from "react";
import { connect } from "react-redux";

import ProductDetails from "../../components/Product-Details";

import { listProductDetails } from "./../../redux/product/product.actions";
import { listSelectedAttributes } from "../../redux/attributes/attributes.actions";

class ProductPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.match.location.pathname.replace("/product/", ""),
    };
  }

  async componentDidMount() {
    this.props.listProductDetails(this.state.productId);
  }

  componentDidUpdate() {
    this.props.listSelectedAttributes({
      id: this.props.productDetails.id,
      attributes: this.props.productDetails.attributes,
    });
  }

  render() {
    return (
      <div>
        <ProductDetails details={this.props.productDetails} />;
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productDetails: state.productDetails.product,
});

const mapDispatchToProps = (dispatch) => ({
  listProductDetails: (data) => dispatch(listProductDetails(data)),
  listSelectedAttributes: (item) => dispatch(listSelectedAttributes(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
