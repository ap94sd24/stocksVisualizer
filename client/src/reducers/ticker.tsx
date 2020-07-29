import {
  GET_TICKERS,
  CLEAR_TICKERS,
  GET_STOCK,
  GET_COMPANY,
  TICKERS_ERROR
} from '../actions/types';

const initialState = {
  ticker: null,
  company: null,
  tickers: [],
  error: {},
};

export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case GET_STOCK:
      return {
        ...state,
        ticker: payload
      }
    case GET_COMPANY:
      return {
        ...state,
        company: payload
      }
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
        company: null,
        tickers: []
      }
    default: 
      return state;
  }
}