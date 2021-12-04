import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { listCategoryProducts } from "../../redux/product/product.actions";

import ProductList from "../../components/Categories/Product";

import PageTitle from "../../components/Page-header";
import ProductWrapper from "../../components/Categories/Product-Wrapper";

class CategoryPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: this.props.match.params.id,
    };
  }

  async componentDidMount() {
    this.props.listCategoryProducts(this.state.categoryId);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.listCategoryProducts(this.props.match.params.id);
    }
  }

  render() {
    return (
      <>
        <PageTitle title={this.props.match.params.id} />
        <ProductWrapper>
          {this.props.catProducts && (
            <ProductList items={this.props.catProducts} />
          )}
        </ProductWrapper>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  catProducts: state.productList.catProd,
});

const mapDispatchToProps = (dispatch) => ({
  listCategoryProducts: (data) => dispatch(listCategoryProducts(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CategoryPage));
