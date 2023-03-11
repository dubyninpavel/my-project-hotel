const BASE_URL_API_HOTEL = 'http://engine.hotellook.com/api/v2/cache.json';
const promiseRejectMessage = 'Возникла ошибка';
const error = 'По вашему запросу ничего не нашлось, пожалуйста, измените запрос.';
const successfulResponseMin = 200;
const successfulResponseMax = 299;
const correctEndingHotelsArr = ['отель', 'отеля', 'отелей'];
const correctEndingDaysArr = ['день', 'дня', 'дней'];

export {
  BASE_URL_API_HOTEL,
  promiseRejectMessage,
  error,
  successfulResponseMin,
  successfulResponseMax,
  correctEndingHotelsArr,
  correctEndingDaysArr,
};
