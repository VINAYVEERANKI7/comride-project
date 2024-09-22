import { call, takeLatest } from "redux-saga/effects";
import {
  dashboardDetailsApi,
  dashboardGraphDetailsApi,
  dashboardMoreGraphDetailsApi,
} from "../../apis/DASHBOARD/dashboardApis";
import {
  DASHBOARD_DEATILS,
  DASHBOARD_GRAPH_DEATILS,
  DASHBOARD_MORE_GRAPH_DEATILS,
} from "../../actions/types";

export function* dashboardDetailsWorker(action) {
  try {
    const res = yield call(dashboardDetailsApi, action.data);
    console.log(res);
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
export function* dashboardGraphDetailsWorker(action) {
  try {
    const res = yield call(dashboardGraphDetailsApi, action.data);
    console.log(res);
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
export function* dashboardMoreGraphDetailsWorker(action) {
  try {
    const res = yield call(dashboardMoreGraphDetailsApi, action.data);
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res.data);
    } else if (res.status === 200 && res.data.status === "fail") {
      yield action.onError(res);
    } else {
      yield action.onError("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}
export function* watchdashboardDetailsWorker() {
  yield takeLatest(DASHBOARD_DEATILS, dashboardDetailsWorker);
}
export function* watchdashboardGraphDetailsWorker() {
  yield takeLatest(DASHBOARD_GRAPH_DEATILS, dashboardGraphDetailsWorker);
}
export function* watchdashboardMoreGraphDetailsWorker() {
  yield takeLatest(
    DASHBOARD_MORE_GRAPH_DEATILS,
    dashboardMoreGraphDetailsWorker
  );
}
