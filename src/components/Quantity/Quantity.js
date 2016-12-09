const React = require('react');

export default ({onQuantityChange, productId}) => (
  <div className="product__element">
    <img />
    <input className="quantity"
      onChange={(e) => {
        e.preventDefault();
        onQuantityChange({
          id: productId,
          quantity: parseInt(e.target.value, 10)
        });
      }}
      type="number" min="1" defaultValue="1" />
    <img />
  </div>
);
