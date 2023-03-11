import axios from 'axios';
import {
  BASE_URL_API_HOTEL,
  promiseRejectMessage,
  successfulResponseMin,
  successfulResponseMax,
} from '../constant/constants';

class HotelsApi {
  // eslint-disable-next-line class-methods-use-this
  addFoundHotels(location, dateCheckIn, checkOutDate) {
    return axios
      .get(BASE_URL_API_HOTEL, {
        headers: {
          'Content-type': 'application/json',
        },
        params: {
          location: `${location}`,
          checkIn: `${dateCheckIn}`,
          checkOut: `${checkOutDate}`,
          limit: 20,
          currency: 'rub',
        },
      })
      .then((res) => {
        if (
          res.status >= successfulResponseMin &&
          res.status <= successfulResponseMax
        ) {
          return res;
        }
        return Promise.reject(new Error(promiseRejectMessage));
      });
  }
}

const hotels = new HotelsApi();

export default hotels;
