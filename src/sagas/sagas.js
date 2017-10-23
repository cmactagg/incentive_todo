import { delay } from "redux-saga";
import { put, takeEvery, all, call, select } from "redux-saga/effects";
import * as checkListActionCreators from "../actions/checkListActionCreators";
import CheckListDataService from "../CheckListDataService.js";

const checkListDataService = new CheckListDataService();

export function* watchInitDataService() {
  yield takeEvery("DATA_SERVICE_INIT", function*() {
    yield call(checkListDataService.init.bind(checkListDataService));
    console.log("done init in saga");
    const checkLists = yield call(checkListDataService.readFromFile);

    //const checkLists = yield put(checkListActionCreators.fetchAllCheckLists());
    yield put(checkListActionCreators.storeCheckLists(checkLists));
  });
}

export function* watchFetchAllCheckLists() {
  yield takeEvery("CHECKLISTS_FETCH_ALL", function*() {
    const prom = yield call(checkListDataService.readFromFile);
    yield call(prom.then);
  });
}

export function* watchSaveCheckLists() {
  yield takeEvery("CHECKLISTS_SAVE", function*() {
    const getCheckListsFromState = state => state.checkLists;
    const checkListsFromState = yield select(getCheckListsFromState);
    checkListDataService.writeToFile(checkListsFromState);
  });
}

export default function* rootSaga() {
  yield all([
    watchInitDataService(),
    watchFetchAllCheckLists(),
    watchSaveCheckLists()
  ]);
}
