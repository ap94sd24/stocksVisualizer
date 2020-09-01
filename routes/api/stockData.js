const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');

const cors = require('cors');
router.use(cors());
router.options('*', cors());

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

require('dotenv').config();

const timePeriod = require('../../config/constants');

/**
 * Get a stock with type and ticker passed in
 * @route: GET
 */
router.get('/stock/:type/:symbol', cors(), async (req, res) => {
  let range = req.params.type;
  range === 'all' || range === 'year' ? (range = 'monthly') : range;
  range === 'month' ? (range = 'daily') : range;
  try {
    const api_res = await axios.get(
      `https://www.alphavantage.co/query?function=${timePeriod(range)}&symbol=${
        req.params.symbol
      }&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );

    const output = getChartData(api_res.data, req.params.type);
    res.json(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

/**
 * Get company overview for stock
 * @route: GET
 */
router.get('/company/:symbol', cors(), async (req, res) => {
  try {
    const api_res = await axios.get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${req.params.symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    res.json(api_res.data);
  } catch (err) {
    console.error('Error message: ' + JSON.stringify(err, null, 2));
  }
});

function getChartData(obj, time) {
  let arr = [];
  let dataPts = [];
  let labelPts = [];
  let filtered = [];
  let relevantObj;
  if (time === 'month') {
    relevantObj = obj[`Time Series (Daily)`];
  } else if (time === 'year' || time === 'all') {
    relevantObj = obj[`Monthly Adjusted Time Series`];
  } else {
    relevantObj = obj[`Time Series (${time})`];
  }
  let keys = Object.keys(relevantObj);
  for (let key in relevantObj) {
    arr.push(relevantObj[key]);
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i].date = keys[i];
  }

  if (time === '30min' || time === '60min') {
    if (time === '30min') {
      filtered = arr.slice(7, 22);
      labelPts = filtered.map((val) => val['date'].split(' ')[1]).reverse();
    } else {
      filtered = [...arr];
      labelPts = filtered.map((val) => val['date']).reverse();
    }
    dataPts = filtered.map((val) => val['4. close']).reverse();
  }

  if (time === 'month' || time === 'year' || time == 'all') {
    if (time === 'month') {
      // get daily data pts for month
      filtered = arr.slice(0, 30);
    } else if (time === 'year') {
      // get monthly data pts for the year
      filtered = arr.slice(0, 12);
    } else {
      // get all data pts by every half year
      filtered = arr.filter(item => {
        let val = item.date.split('-')[1];
        if (val === '01' || val === '07') {
          return item;
        }
      })
    }
    labelPts = filtered.map((val) => val['date']).reverse();
    dataPts = filtered.map((val) => val['5. adjusted close']).reverse();
  }

  return { labels: labelPts, values: dataPts };
}

/**
 * Get intraday stock with type and ticker passed in
 */
router.get('/intraday/:symbol/:interval', cors(), async (req, res) => {
  try {
    const api_res = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${req.params.symbol}&interval=${req.params.interval}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    let output = getChartData(api_res.data, req.params.interval);
    res.json(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!');
    // console.error('Error message: ' + JSON.stringify(err, null, 2));
  }
});

/**
 * Get search match from api
 */
router.get('/search/:keywords', cors(), async (req, res) => {
  try {
    const api_res = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.params.keywords}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    res.json(api_res.data.bestMatches);
  } catch (err) {
    console.error('Error: ' + JSON.stringify(err, null, 2));
  }
});

router.get('/quote/:symbol', cors(), async (req, res) => {
  try {
    const api_res = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.params.symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    res.json(api_res.data);
  } catch (error) {
    console.error(error);
  }
});

/**
 * Get trending stocks from yahoo finance
 */
router.get('/trending/stocks', cors(), async (req, res) => {
  const config = {
    headers: {
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      useQueryString: true,
    },
    params: {
      region: 'US',
    },
  };
  try {
    const api_res = await axios.get(
      'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-trending-tickers',
      config
    );
    res.json(api_res.data.finance.result[0].quotes);
  } catch (error) {
    console.error('ERROR: ' + JSON.stringify(error, null, 2));
  }
});

/**
 * Get stock summary from yahoo finance
 */
router.get('/summary/:symbol', cors(), async (req, res) => {
  const config = {
    headers: {
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      useQueryString: true,
    },
    params: {
      region: 'US',
      symbol: req.params.symbol,
    },
  };
  try {
    const api_res = await axios.get(
      'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
      config
    );
    res.json(api_res.data);
  } catch (error) {
    console.error('ERROR: ' + JSON.stringify(error, null, 2));
  }
});

module.exports = router;
