import { delay } from "redux-saga";
import { put, takeEvery, all, call, select } from "redux-saga/effects";
import * as checkListActionCreators from "../actions/checkListActionCreators";
import * as journalActionCreators from "../actions/journalActionCreators";
import CheckListDataService from "../CheckListDataService.js";

const checkListDataService = new CheckListDataService();

const getCheckListsFromState = state => state.checkLists;

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

export function* watchChangedCheckListItem() {
  yield takeEvery("CHECKLIST_ITEM_CHANGED", function*(action) {
    const checkListItemObjOld = getCheckListItemFromState(action.checkListId, action.checkListItem.id, yield select(getCheckListsFromState));
    if(checkListItemObjOld.isChecked !== action.checkListItem.isChecked && action.checkListItem.isChecked === true){
      console.log("adding item to journal");
      yield put(journalActionCreators.journalAddEntry("General", action.checkListItem.text, action.checkListItem.points));
    }
    yield put(checkListActionCreators.checkListItemChangedReduce(action.checkListId, action.checkListItem));
  });

  // const getCheckListsFromState = state => state.checkLists;
  // const checkListsFromState = yield select(getCheckListsFromState);
}

export function* watchDoSomething() {
  yield takeEvery("DO_SOMETHING", function*(action) {
    console.log(action.text);
    yield;
  });
}



function getCheckListItemFromState(
  checkListId,
  checkListItemId,
  checkListsFromState
) {
  var checkListIndex = checkListsFromState.findIndex(cl => {
    return cl[0].id === checkListId;
  });

  var checkListItemIndex = checkListsFromState[checkListIndex].findIndex(cli => {
    return cli.id === checkListItemId;
  });

  return Object.assign(
    {},
    checkListsFromState[checkListIndex][checkListItemIndex]
  );
}

export default function* rootSaga() {
  yield all([
    watchInitDataService(),
    watchFetchAllCheckLists(),
    watchSaveCheckLists(),
    watchDoSomething(),
    watchChangedCheckListItem()
  ]);
}
