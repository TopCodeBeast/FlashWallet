import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {coinmarketcapApiKey} from '../../engine/constants';

export const setQuoteData = dispatch => {
  let qs = `?symbol=ETH&convert=USD`;
  axios
    .get(
      'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest' + qs,
      {
        headers: {'X-CMC_PRO_API_KEY': coinmarketcapApiKey},
      },
    )
    .then(res => {
      console.log(res.data.data);
    });
};
