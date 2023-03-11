import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import userSlice from './reducer/usersReducer';
import rootSaga from '../saga/saga';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: [
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);
