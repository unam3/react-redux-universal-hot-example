const React = require('react');
const { Ring } = require('../Ring/Ring');
const Filters = require('../Filters/Filters');

// export default function ({
//   products,
//   productsLoadOffset,
//   onShowMoreProducts,
//   cart,
//   onAddToCart
// }) {
export default function (...args) {
  console.log('props', args);
  //args[0].onShowMoreProducts();
  // ~ componentDidMount
  //if (!products || (products.length === 0 && productsLoadOffset === 0)) {
  //  onShowMoreProducts();
  //}

  //return products && products.length ? (
  //  <div className="product-list main__product-list flex-row">
  //    <Filters products={products} />
  //    {/*
  //    <ProductTable products={products}
  //      productsCategory={productsCategory}
  //      cart={cart}
  //      onAddToCart={onAddToCart}
  //      onShowMoreProducts={onShowMoreProducts}
  //      />
  //    */}
  //  </div>) : (<Ring />);
  return (<Ring />);
}

