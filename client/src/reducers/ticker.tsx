import {
  GET_TICKERS,
  CLEAR_TICKERS,
  GET_STOCK,
  GET_COMPANY,
  GET_SUMMARY,
  GET_INTRADAY,
  INTRADAY_ERROR,
  TICKERS_ERROR,
  GET_SEARCHLIST,
  SEARCH_ERROR,
} from '../actions/types';

const initialState = {
  ticker: null,
  company: null,
  summary: null,
  intraday: null,
  loading: true,
  searchList: [],
  tickers: [],
  error: {},
};

export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case GET_STOCK:
      return {
        ...state,
        loading: false,
        ticker: payload,
      };
    case GET_SEARCHLIST:
      console.log('hi')
      return {
        ...state,
        loading: false,
        searchList: payload,
      };
    case GET_COMPANY:
      return {
        ...state,
        loading: false,
        company: payload,
      };
    case GET_INTRADAY:
      return {
        ...state,
        loading: false,
        intraday: payload,
      };
    case GET_SUMMARY:
      return {
        ...state,
        loading: false,
        summary: payload,
      };
    case GET_TICKERS:
      return {
        ...state,
        loading: false,
        tickers: payload,
      };
    case TICKERS_ERROR:
    case INTRADAY_ERROR:
    case SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CLEAR_TICKERS:
      return {
        ...state,
        ticker: null,
        company: null,
        intraday: null,
        summary: null,
        loading: false,
        searchList: [],
        tickers: [],
      };
    default:
      return state;
  }
}
