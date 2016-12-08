const React = require('react');
const { Ring } = require('../Ring/Ring');
import { Filters } from '../Filters/Filters';
import { ProductTable } from '../ProductTable/ProductTable';

export default function ({
  cart,
  products,
  productsCategory,
  productsLoadOffset,
  onShowMoreProducts,
  onAddToCart
}) {
  // ~ componentDidMount
  if (products.length === 0 && productsLoadOffset === 0) {
    onShowMoreProducts();
  }

  return products && products.length ? (
    <div className="product-list main__product-list flex-row">
      <Filters products={products} />
      <ProductTable products={products}
        productsCategory={productsCategory}
        cart={cart}
        onAddToCart={onAddToCart}
        onShowMoreProducts={onShowMoreProducts}
        />
    </div>) : (<Ring />);
}
