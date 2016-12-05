const React = require('react');
// const {connect, Provider} = require('react-redux');
const {connect} = require('react-redux');
// const styles = require('../containers/Order/Order.css');
const BlueButton = require('../../components/BlueButton/BlueButton');
// const Cart = require('../../components/cart.js');
// import {load} from 'redux/modules/order';

const Quantity = ({onQuantityChange, productId}) => (
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

const DeleteOrderProduct = ({f, productId}) => (
  <a className="product__delete-product-button product__element blue-text link-wo-underline"
    onClick={(e) => {
      e.preventDefault();

      f({'id': productId});
    }}
    href="#" >
    Убрать
  </a>
);

const OrderProducts = ({
  orderProducts,
  onQuantityChange,
  onDeleteFromOrder
}) => (
  <div className="flex-grid flex-column flex-children">
    {
      orderProducts.map((product) => product ?
        (<div className="product order-products__product padded"
            key={product.id}>
        <img className="product__preview product__element order-product-product-preview" />
        <div className="product__name-link product__element">
          <a href="#" className="blue-text">
            {product.brand} {product.name}
          </a>
        </div>
        <div className="product__cost product__element order-product-cost">
          {product.cost} руб.
        </div>
        <Quantity onQuantityChange={onQuantityChange}
            productId={product.id} />
        <DeleteOrderProduct f={onDeleteFromOrder} productId={product.id} />
      </div>) : null)
    }
  </div>
);

const TotalCost = function ({data}) {
  const getProduct = function (products, id) {
    if (!products.length) {
      /* eslint no-throw-literal: 0 */
      throw 'shi~~';
    }

    let product;

    products.some((p) => {
      product = false;

      if (p && p.id === id) {
        product = p;

        return true;
      }
    });

    return product;
  };

  const evaluateTotalCost = function (piq, products) {
    return Object.keys(piq).reduce(
      (costSum, productId) => (
        costSum + piq[productId]
          * ((getProduct(products, productId) || {}).cost || 0)
      ),
      0
    );
  };

  return (<div className="total-cost">
    Итого: {evaluateTotalCost(
      data.productId_quantity,
      data.orderProducts)
    } руб.
  </div>);
};

const Form = function ({toggleProcessingOrderStatus, handleServerResponse}) {
  const form = {};

  const processResponse = function (response) {
    switch (response) {
      case 200:
        toggleProcessingOrderStatus();

        handleServerResponse({
          'payload': {
            'statusCode': 200
          }
        });

        break;
      default:
        /* eslint no-debugger: 0 */
        debugger;
    }
  };

  const checkout = function () {
    toggleProcessingOrderStatus();

    // проверка заполненности формы
    let emptyInput;

    Object.keys(form)
      .every((inputName) => {
        const v = form[inputName].value;

        const checkPassed = (v.length !== 0) && /\S/m.test(v);

        console.log('cp', checkPassed);

        if (!checkPassed) {
          emptyInput = form[inputName];
        }

        return checkPassed;
      });

    if (emptyInput) {
      toggleProcessingOrderStatus();

      emptyInput.focus();
    } else {
      // эмуляция отправки и обработки ответа
      setTimeout(processResponse, 1000, 200);
    }
  };

  return (<form className="order-form flex-column">
      <div className="order-form__requirement">
        Поля ниже необходимо заполнить:
      </div>
      <input name="name" ref={(l) => form.name = l}
        placeholder="Ваше имя" required />
      <input name="email" ref={(l) => form.email = l} placeholder="Email"
        required />
      <input name="phone_number" ref={(l) => form.phone_number = l}
        placeholder="Телефон" required />
      <input name="address" ref={(l) => form.address = l}
        placeholder="Адрес доставки" required />
      <textarea className="comment-ta" ref={(l) => form.comment = l}
        name="comment" placeholder="Комментарий" required />
      <BlueButton text="Оформить заказ" additionalClasses="checkout"
        fobj={{f: checkout}} />
    </form>);
};

/*
const store = require('redux').createStore(
  require('../../reducers/order.js'),
  {
    // product.id только хранить. тянуть с сервака все остальное
    orderProducts: [
      {
        'id': '1f3',
        'name': 'Gel',
        'cost': 6600,
        'brand': 'Asics'
      },
      {
        'id': 'a3d',
        'name': 'Wave',
        'cost': 5520,
        'brand': 'Mizuno'
      },
      {
        'id': 'd2b',
        'name': 'Del Mar',
        'cost': 4930,
        'brand': 'Zoot'
      }
    ],
    productId_quantity: {
      '1f3': 1,
      'a3d': 1,
      'd2b': 1
    },
    processingOrder: false,
    serverResponse: false
  }
);
*/

const {
  changeQuantity,
  deleteFromOrder,
  toggleProcessingOrderStatus,
  handleServerResponse
} = require('../../redux/modules/order.js');

const mapStateToProps = ({
  orderProducts,
  productId_quantity,
  processingOrder,
  serverResponse
}) => ({
  orderProducts,
  productId_quantity,
  processingOrder,
  serverResponse
});

const mapDispatchToProps = (dispatch) => ({
  onQuantityChange: (props) => dispatch(changeQuantity(props)),

  onDeleteFromOrder: (props) => dispatch(deleteFromOrder(props)),

  toggleProcessingOrderStatus: (props) => dispatch(
    toggleProcessingOrderStatus(props)
  ),

  handleServerResponse: (props) => dispatch(handleServerResponse(props))
});

const OrderInfo = ({text}) => (
  <div className="order-info">
    {text}
  </div>
);

const Order = ({
  orderProducts,
  onQuantityChange,
  onDeleteFromOrder,
  productId_quantity,
  /* eslint no-shadow: 0 */
  toggleProcessingOrderStatus,
  /* eslint no-shadow: 0 */
  handleServerResponse
}) => (
  <div className="order flex-column">
    <h1 className="title">Оформление заказа</h1>
    <OrderProducts
      orderProducts={orderProducts}
      onQuantityChange={onQuantityChange}
      onDeleteFromOrder={onDeleteFromOrder}
      />
    <TotalCost data={{
      orderProducts,
      productId_quantity
    }} />
  <Form productId_quantity={productId_quantity}
    toggleProcessingOrderStatus={toggleProcessingOrderStatus}
    handleServerResponse={handleServerResponse} />
  </div>
);

export const OrderWrapper = function ({
  // processingOrder,
  // serverResponse,
  // // orderProducts = [],
  // orderProducts,
  // productId_quantity,
  // onQuantityChange,
  // onDeleteFromOrder,
  //       /* eslint no-shadow: 0 */
  // toggleProcessingOrderStatus,
  //       /* eslint no-shadow: 0 */
  // handleServerResponse,
  ...args
}) {
  //console.log(args);
  return <h1>f</h1>;
  // const redirect = path => setTimeout(
  //   () => window.location = path,
  //   6000
  // );

  // console.log(processingOrder, serverResponse);

  // if (orderProducts.some((l) => l === null)) {
  //   redirect('cart');

  //   return <OrderInfo text="В форме заказа нет товаров. Перемещаемся в корзину для составления нового заказа" />;
  // }

  // if (processingOrder) {
  //   return <OrderInfo text="Обрабатываем заказ" />;
  // }

  // return (serverResponse === 200) ?
  //   // можно редирект в корзину для оформления нового заказа
  //   <OrderInfo text="Заказ успешно отправлен" />
  //   : (<Order
  //       orderProducts={orderProducts}
  //       productId_quantity={productId_quantity}
  //       onQuantityChange={onQuantityChange}
  //       onDeleteFromOrder={onDeleteFromOrder}
  //       toggleProcessingOrderStatus={toggleProcessingOrderStatus}
  //       handleServerResponse={handleServerResponse}
  //       />);
};

// ConOrder = connect(
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderWrapper);

// render(
//   <Provider store={store}>
//     <ConOrder />
//   </Provider>,
//
//   document.getElementById("main")
// );
//
// render(
//   <Cart.component cart={Cart.stored} />,
//
//   document.getElementById("cart")
// );
