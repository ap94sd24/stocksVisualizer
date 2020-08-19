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
  try {
    const api_res = await axios.get(
      `https://www.alphavantage.co/query?function=${timePeriod(
        req.params.type
      )}&symbol=${req.params.symbol}&apikey=${
        process.env.ALPHA_VANTAGE_API_KEY
      }`
    );
    res.json(Object.values(api_res.data)[1]);
  } catch (err) {
    console.error('Error message: ' + JSON.stringify(err, null, 2));
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

function getIntradayGraphData(obj) {
  let arr = [];
  let dataPts = [];
  let labelPts = [];
  let relevantObj = obj['Time Series (30min)'];
  let keys = Object.keys(relevantObj);
  for (let key in relevantObj) {
    arr.push(relevantObj[key]);
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i].date = keys[i];
  }

  let filtered = arr.slice(7, 22);

  dataPts = filtered.map((val) => val['4. close']).reverse();
  labelPts = filtered.map((val) => val['date'].split(' ')[1]).reverse();

  let output = {labels: labelPts, values: dataPts};
  return output;
}

/**
 * Get intraday stock with type and ticker passed in
 */
router.get('/intraday/:symbol', cors(), async (req, res) => {
  const interval = '30min';
  try {
    const api_res = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${req.params.symbol}&interval=${interval}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    let output = getIntradayGraphData(api_res.data);
    res.json(output);
  } catch (err) {
    console.error('Error message: ' + JSON.stringify(err, null, 2));
  }
});

/**
 * Get search match from api
 */
router.get('/search/:keywords', cors(), async (req, res) => {
  console.log('Query: ' + req.params.keywords);
  try {
    const api_res = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.params.keywords}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    res.json(api_res.data);
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

router.post('/stocks', cors(), async (req, res) => {
  const body = JSON.parse(JSON.stringify(req.body));
  const { tickers, type } = body;
  console.log('stocks-api.js 14 | body', body.tickers);
  let stocks = await tickers.map(async (ticker) => {
    const request = await axios.get(
      `https://www.alphavantage.co/query?function=${timePeriod(
        type
      )}&symbol=${ticker}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    const data = await request.data;
    return data;
  });

  Promise.all(stocks)
    .then((values) => {
      console.log('stocks-api.js 40 | values', values);
      if (values[0].Note) {
        console.log('stocks-api.js 48 | error', values[0].Note);
        res.json({ error: values[0].Note });
      } else {
        res.json({ data: values, status: 'done' });
      }
    })
    .catch((error) => {
      console.log('stocks-api.js 47 | error', error);
      res.json({ error: error });
    });
});

router.post('/unlimited_stocks', cors(), async (req, res) => {
  const body = JSON.parse(JSON.stringify(req.body));
  const { tickers, type } = body;
  console.log('Tickers length: ' + tickers.length);
  let stocksHolder = [];
  console.log('Body: ' + body.tickers);
  await tickers.forEach(async (ticker, idx) => {
    setTimeout(async () => {
      const request = await axios.get(
        `https://www.alphavantage.co/query?function=${timePeriod(
          type
        )}&symbol=${ticker}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
      );
      const data = await request.data;
      stocksHolder.push(Object.values(data));
      console.log('Stock array: ' + stocksHolder);

      if (stocksHolder.length === tickers.length) {
        res.json({ tickers: stocksHolder });
      }
    }, idx * 12000);
  });
});

module.exports = router;
