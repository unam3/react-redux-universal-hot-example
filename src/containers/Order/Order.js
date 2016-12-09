const { connect } = require('react-redux');
// const styles = require('../containers/Order/Order.css');
const OrderWrapper = require('../../components/OrderWrapper/OrderWrapper.js');

const {
  changeQuantity,
  deleteFromOrder,
  toggleProcessingOrderStatus,
  handleServerResponse
} = require('../../redux/modules/order.js').actions;

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderWrapper);
