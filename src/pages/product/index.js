import React, { PureComponent } from "react";
import { connect } from "react-redux";

import ProductDetails from "../../components/Product-Details";

import { selectedAttributesList } from "./../../redux/cart/cart.actions";
import { listProductDetails } from "./../../redux/product/product.actions";

class ProductPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.match.location.pathname.replace("/product/", ""),
    };
  }

  async componentDidMount() {
    this.props.listProductDetails(this.state.productId);

    this.props.selectedAttributesList(
      (({ id, attributes }) => ({ id, attributes }))(this.props.productDetails)
    );
  }

  render() {
    return (
      <div>
        <ProductDetails details={this.props.productDetails} />;
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
  productDetails: state.productDetails.product
})

const mapDispatchToProps = (dispatch) => ({
  selectedAttributesList: (data) => dispatch(selectedAttributesList(data)),
  listProductDetails: (data) => dispatch(listProductDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
