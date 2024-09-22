import { call, takeLatest } from "redux-saga/effects";
import { trackingListApi } from "../../apis/tracking/trackingapi";
import { TRACKING_LIST } from "../../actions/types";

export function* trackingListWorker(action) {
  try {
    const res = yield call(trackingListApi, action.data);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
      console.log(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      console.log(res.data);
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* watchTrackingListWorkerWorker() {
  yield takeLatest(TRACKING_LIST, trackingListWorker);
}
