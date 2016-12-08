export const addToCart = ({id}) => ({
  type: 'add_to_cart',
  payload: {
    id
  }
});

// reducer
export default function (state = 'silly bastards', action) {
  switch (action.type) {
    case 'add_to_cart':
      return state ?
        Object.assign({}, state, {[action.payload.id]: true})
        : {};
    default:
      return state;
  }
}
