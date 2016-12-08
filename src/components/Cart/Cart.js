const React = require('react');
const { connect } = require('react-redux');

const Cart = ({cart}) => {
  const productsCount = Object.keys(cart).length;
  return (
    <div className="cart blue-text">
      { productsCount ? (
        <a className="blue-text" href="#">
          {'В корзине ' + productsCount + ' товаров'}
        </a>) : 'Корзина пуста'
      }
    </div>
  );
};

//export const component ({cart}) {
export const ConnectedCart = connect(
  ({cart}) => ({cart})
)(Cart);

// для эмуляции десяти позиций в корзине
export const stored = {
  'b3d': true,
  'dbb': true,
  'bda': true,
  '1bd': true,
  '5f3': true,
  'd61': true,
  'h3f': true,
  '5bb': true,
  'cba': true,
  'l5c': true
};
