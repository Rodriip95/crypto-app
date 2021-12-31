import {ADD_COIN, REMOVE_COIN} from './actions';

const initialState = {
  coins: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ADD_COIN:
      return {
        ...state,
        coins: [...state.coins, payload],
      };

    case REMOVE_COIN:
      return {
        ...state,
        coins: state.coins.filter(item => item.id !== payload.id),
      };

    default:
      return state;
  }
};
