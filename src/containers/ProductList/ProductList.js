const React = require('react');
const { render } = require('react-dom');
const { connect, Provider } = require('react-redux');
const Redux = require('redux');
const ProductList = require('../../components/ProductList/ProductList');
const allProducts = require('../../helpers/products.js');

const productsCategory = Object.keys(allProducts)[0];

const mapStateToProps = ({cart, products, productsLoadOffset}) => ({
  cart,
  products,
  productsLoadOffset,
  productsCategory
});

const { addToCart } = require('../../redux/modules/cart.js');

const pl_actions = require('../../redux/modules/product_list.js').actions;

const mapDispatchToProps = (dispatch) => ({
  onAddToCart: (props) => {
    console.log('oATC');
    console.log(props);
    return dispatch(addToCart(props));
  },

  onShowMoreProducts: (...props) => {
    console.log('oSMP');
    console.log(props);
    dispatch(pl_actions.showMore());

    return dispatch(pl_actions.fetchProducts(props));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);

//    ConCart = connect(
//      ({cart}) => ({cart})
//    )(Cart.component);
//
//render(
//  <Provider store={store}>
//    <ConProductList />
//  </Provider>,
//
//  document.getElementById("main")
//);
//
//render(
//  <Provider store={store}>
//    <ConCart />
//  </Provider>,
//
//  document.getElementById("cart")
//);
