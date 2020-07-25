const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
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
 * @route: POST
 */
router.post('/stock', cors(), async (req, res) => {
  const body = JSON.parse(JSON.stringify(req.body));
  const { ticker, type } = req.body;
  console.log('Ticker is: ' + body.ticker);
  console.log('type: ' + timePeriod(type));
  try {
    const api_res = await axios.get(
      `https://www.alphavantage.co/query?function=${timePeriod(
        type
      )}&symbol=${ticker}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    res.json(api_res.data);
  } catch (err) {
    console.error('Error message: ' + JSON.stringify(err, null, 2));
  }
});

/**
 * Get intraday stock with type and ticker passed in
 */
router.post('/intraday', cors(), async(req, res) => {
  const body = JSON.stringify(JSON.stringify(req.body));
  const {ticker, interval } = req.body;
  console.log('Ticker is: ' + body.ticker);
  console.log('interval: ' + body.interval);
  try {
    const api_res = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${interval}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
    res.json(api_res.data);
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
    const api_res = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.params.keywords}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
    res.json(api_res.data);  
  } catch (err) {
    console.error('Error: ' + JSON.stringify(err, null, 2));
  }
});

/**
 * Get trending stocks from yahoo finance 
 */
router.get('/trending/stocks', cors(), async(req, res) => {
  const config = {
    headers: {
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'useQueryString': true
    },
    params: {
      'region': 'US'
    }
  };
  try {
    const api_res = await axios.get('https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-trending-tickers', config);
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
      const request = await axios.get(`https://www.alphavantage.co/query?function=${timePeriod(type)}&symbol=${ticker}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
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
