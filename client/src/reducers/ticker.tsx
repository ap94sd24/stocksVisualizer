import {
  GET_TICKERS,
  CLEAR_TICKERS,
  TICKERS_ERROR
} from '../actions/types';

const initialState = {
  ticker: null,
  tickers: [],
  error: {},
};

export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case GET_TICKERS: 
      return {
        ...state,
        tickers: payload
      };
    case TICKERS_ERROR: 
      return {
        ...state,
        error: payload
      }
    case CLEAR_TICKERS: 
      return {
        ...state,
        ticker: null,
        tickers: []
      }
    default: 
      return state;
  }
}