import React, { PureComponent } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Nav from "./components/Nav";
import Homepage from "./pages/homepage";
import AllProducts from "./pages/products";
import Category from "./pages/category";
import Product from "./pages/product";
import Cart from "./pages/cart";

import "./App.css";
import Footer from "./components/Footer";
import { connect } from "react-redux";

class App extends PureComponent {
  render() {
    return (
      <Router>
        <Nav />
        {this.props.hidden ? "" : <div className="cart-overlay"></div>}

        <main className="container">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/products">
              <AllProducts />
            </Route>

            <Route path="/product/:id">
              {(match) => <Product match={match} />}
            </Route>

            <Route path="/category/:id">
              {(match) => <Category match={match} />}
            </Route>

            <Route path="/cart">
              <Cart />
            </Route>

            <Route path="*">
              <Link to="/">404 ERROR go back</Link>
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  hidden: state.cart.hidden,
});

export default connect(mapStateToProps)(App);
