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

module.exports = router;
