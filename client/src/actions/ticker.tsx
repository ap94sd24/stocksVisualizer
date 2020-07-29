import axios from 'axios';
import {
  GET_TICKERS,
  CLEAR_TICKERS,
  GET_STOCK,
  GET_COMPANY,
  TICKERS_ERROR
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
      let listString: any = sessionStorage.getItem('tickers_list') === null ? '' : sessionStorage.getItem('tickers_list');
      const data = JSON.parse(listString);
      dataArray = data;
    }
    dispatch({
      type: GET_TICKERS,
      payload: dataArray
    });
  } catch (error) {
    dispatch({
      type: TICKERS_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
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
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: TICKERS_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

export const getStockInfoTimeSeries = (type: string, symbol: string) => async (dispatch: any) => {
  try {
    const res = await axios.get(`/api/stockData/stock/${type}/${symbol}`);
    dispatch({
      type: GET_STOCK,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: TICKERS_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};

export const getCompanyInfo = (symbol: string) => async (dispatch: any) => {
  try {
    const res = await axios.get(`/api/stockData/company/${symbol}`);
    dispatch({
      type: GET_COMPANY,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: TICKERS_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};