import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import { pagination } from 'violet-paginator';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import {
  orderProducts,
/* eslint camelcase: 0 */
  productId_quantity,
  processingOrder,
  serverResponse,
} from './order';
import {
  cart,
  products,
  productsLoadOffset,
} from './product_list';
// import cart from './cart';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  pagination,
  widgets,
  // order reducers
  orderProducts,
  productId_quantity,
  processingOrder,
  serverResponse,
  // productList,
  // cart,
});
