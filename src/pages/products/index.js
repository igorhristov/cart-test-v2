import React, { PureComponent } from "react";
import Product from "../../components/Categories/Product";
import ProductWrapper from "../../components/Categories/Product-Wrapper";
import PageTitle from "../../components/Page-header";

import { connect } from "react-redux";
import { listAllProducts } from "../../redux/product/product.actions";

class AllProducts extends PureComponent {

  async componentDidMount() {
    this.props.listAllProducts();
  }

  render() {
    return (
      <>
        <PageTitle title="ALL PRODUCTS" />

        <ProductWrapper>
          {this.props.allProducts && (
            <Product items={this.props.allProducts} />
          )}
        </ProductWrapper>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  allProducts: state.productList.products,
});

const mapDispatchToProps = (dispatch) => ({
  listAllProducts: () => dispatch(listAllProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
