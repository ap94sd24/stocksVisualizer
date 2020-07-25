import axios from 'axios';
import {
  GET_TICKERS,
  CLEAR_TICKERS,
  TICKERS_ERROR
} from './types';

export const getTickers = () => async (dispatch: any) => {
  dispatch({ type: CLEAR_TICKERS });

  try {
    const res = await axios.get('/api/stockData/trending/stocks');
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