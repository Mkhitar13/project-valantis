import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import { reducerGetIds, reducerGetProducts, reducerGetField, reducerFilterField, reducerGetFilteredField } from './slices/getIRequestsSlice';
import ApiClient from "../api/api";

const apiClient = new ApiClient();

function* fetchIds() {
      try {
            const { offset, limit } = yield select(state => state.rootReducer.requests);
            const ids = yield call(apiClient.getIdsFromApi, offset, limit);
            yield put(reducerGetIds(ids));
      } catch (error) {
            console.error('Error inside fetchIds:', error);
      }
}

function* fetchProducts() {
      try {
            const offset = yield select((state) => state.rootReducer.requests.offset);
            const limit = yield select((state) => state.rootReducer.requests.limit);
            const products = yield call(apiClient.getProductsFromApi, offset, limit);
            yield put(reducerGetProducts(products));
      } catch (error) {
            console.error('Error inside getProductsSagaWorker !!!', error);
      }
}

function* fetchField() {
      try {
            const { field, offset, limit } = yield select(state => state.rootReducer.requests);
            const fieldCall = yield call(apiClient.getFieldsFromApi, field, offset, limit);
            yield put(reducerGetField(fieldCall));
      } catch (error) {
            console.error('Error inside fetchField:', error);
      }
}

function* filterField() {
      try {
            const { field, value } = yield select(state => state.rootReducer.requests);
            const filterFieldCall = yield call(apiClient.filterByFieldFromApi, field, value);
            yield put(reducerFilterField(filterFieldCall));

      } catch (error) {
            console.error('Error inside filterField:', error);
      }
}

function* getFilteredField() {
      try {
            const { field, value } = yield select(state => state.rootReducer.requests);
            const filterFieldCall = yield call(apiClient.getFilterByFieldFromApi, field, value);
            yield put(reducerGetFilteredField(filterFieldCall));

      } catch (error) {
            console.error('Error inside filterField:', error);
      }
}

export function* sagaWatcher() {
      yield all([
            takeEvery('requests/reducerGetIds', fetchIds),
            takeEvery('requests/reducerGetProducts', fetchProducts),
            takeEvery('requests/reducerGetField', fetchField),
            takeEvery('requests/reducerFilterField', filterField),
            takeEvery('requests/reducerGetFilteredField', getFilteredField)
      ]);
}

export default function* rootSaga() {
      yield all([sagaWatcher()]);
}