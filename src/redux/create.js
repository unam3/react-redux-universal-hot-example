import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import { stored } from '../components/Cart/Cart';

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./modules/reducer');
  if (data) {
    data.pagination = Immutable.fromJS(data.pagination);
  }

  const composedData = {
    // product_list
    cart: stored,
    products: [],
    productsLoadOffset: 0,
    // "модуль" order имеет initialState объект
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
    serverResponse: false,
    ...data
  };
  // console.log('data', data);

  const store = finalCreateStore(reducer, composedData);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }

  return store;
}
