import axios from 'axios';
import {
  GET_TICKERS,
  CLEAR_TICKERS,
  GET_CHART_DATA,
  GET_COMPANY,
  GET_SUMMARY,
  GET_INTRADAY,
  INTRADAY_ERROR,
  GET_SEARCHLIST,
  SEARCH_ERROR,
  TICKERS_ERROR,
} from './types';

export const getTickers = () => async (dispatch: any) => {
  dispatch({ type: CLEAR_TICKERS });
  let dataArray = [];
  try {
    if (sessionStorage.getItem('tickers_list') === null) {
      const res = await axios.get('/api/stockData/trending/stocks');
      sessionStorage.setItem('tickers_list', JSON.stringify(res.data));
      dataArray = res.data;
    } else {
      let listString: any =
        sessionStorage.getItem('tickers_list') === null
          ? ''
          : sessionStorage.getItem('tickers_list');
      const data = JSON.parse(listString);
      dataArray = data;
    }
    dispatch({
      type: GET_TICKERS,
      payload: dataArray,
    });
  } catch (error) {
    dispatch({
      type: TICKERS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getSearchMatch = (symbol: string) => async (dispatch: any) => {
  try {
    const res = await axios.get(`/api/stockData/search/${symbol}`);
    dispatch({
      type: GET_SEARCHLIST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getPollingTickers = () => async (dispatch: any) => {
  dispatch({ type: CLEAR_TICKERS });
  try {
    const res = await axios.get('/api/stockData/trending/stocks');
    sessionStorage.setItem('tickers_list', JSON.stringify(res.data));
    dispatch({
      type: GET_TICKERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: TICKERS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getStockInfoTimeSeries = (type: string, symbol: string) => async (
  dispatch: any
) => {
  try {
    const res = await axios.get(`/api/stockData/stock/${type}/${symbol}`);
    dispatch({
      type: GET_CHART_DATA,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: TICKERS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getYesterdayTimeSeries = (symbol: string, interval: string) => async (
  dispatch: any
) => {
  try {
    const res = await axios.get(`/api/stockData/intraday/${symbol}/${interval}`);
    dispatch({
      type: GET_INTRADAY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: INTRADAY_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getTickerSummary = (symbol: string) => async (dispatch: any) => {
  try {
    const res = await axios.get(`/api/stockData/summary/${symbol}`);
    dispatch({
      type: GET_SUMMARY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: TICKERS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getCompanyInfo = (symbol: string) => async (dispatch: any) => {
  try {
    const res = await axios.get(`/api/stockData/company/${symbol}`);
    dispatch({
      type: GET_COMPANY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: TICKERS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
