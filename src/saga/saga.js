import { put, takeEvery, call } from 'redux-saga/effects';
import { addFoundHotels, addErrors } from '../store/reducer/usersReducer';
import { error } from '../constant/constants';
import hotels from '../utils/HotelsApi';

export function* workerSaga(action) {
  try {
    const data = yield call(
      hotels.addFoundHotels,
      action.payload.location,
      action.payload.checkInDate,
      action.payload.checkOutDate,
    );
    yield put(addFoundHotels(data.data));
    yield put(addErrors(''));
  } catch (e) {
    yield put(addErrors(error));
  }
}

export function* watchClickSaga() {
  yield takeEvery('getHotels', workerSaga);
}

export default function* rootSaga() {
  yield watchClickSaga();
}
