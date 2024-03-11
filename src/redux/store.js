import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './combineReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
      middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
      reducer: { rootReducer },
});

sagaMiddleware.run(rootSaga);

export default store;








