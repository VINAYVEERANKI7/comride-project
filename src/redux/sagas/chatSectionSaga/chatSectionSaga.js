import { call, takeLatest } from "redux-saga/effects";
import {
  complaintMessageReadApi,
  findALLComplaintsApi,
  findALLSosMessagesApi,
  sendDriverComplaintMessageApi,
  sendDriverSosMessageApi,
  sendRiderComplaintMessageApi,
  sendSosMessageApi,
  sosMessageReadApi,
  storedMessageApi,
  storedMessageSosApi,
  uploadChatImageApi,
} from "../../apis/chatSection/chatSectionApi";
import {
  ALL_COMPLAINTS_MESSAGES,
  ALL_SOS_MESSAGES,
  CHAT_IMAGE_UPLOAD,
  COMPLAINT_MESSAGE_READ,
  DRIVER_SEND_COMPLAINT_MESSAGE,
  DRIVER_SEND_SOS_MESSAGE,
  RIDER_SEND_COMPLAINT_MESSAGE,
  SEND_SOS_MESSAGE,
  SOS_MESSAGE_READ,
  STORAGED_MESSAGE,
  STORAGED_SOS_MESSAGE,
} from "../../actions/types";

export function* storedMessagesWorker(action) {
  console.log(action.page, "action.data");
  try {
    const res = yield call(storedMessageApi, action);
    console.log(res);
    console.log(action.data);
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

export function* storedMessagesSosWorker(action) {
  try {
    const res = yield call(storedMessageSosApi, action.data);
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

export function* findALLComplaintsWorker(action) {
  try {
    const res = yield call(findALLComplaintsApi, action.data);
    console.log(res);
    console.log(action.data);
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

export function* findALLSosMessagesWorker(action) {
  try {
    const res = yield call(findALLSosMessagesApi, action.data);
    console.log(res);
    console.log(action.data);
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

export function* complaintMessageReadWorker(action) {
  try {
    const res = yield call(complaintMessageReadApi, action.data);
    console.log(res);
    console.log(action.data);
    // if (res.status === 200 && res.data.status === "success") {
    //   yield action.onSuccess(res.data);
    //   console.log(res.data);
    // } else if (res.status === 200 && res.data.status === "fail") {
    //   console.log(res.data);
    //   yield action.onError(res);
    // } else {
    //   yield action.onError("Something Went Wrong");
    // }
  } catch (err) {
    console.log(err);
    yield action.onError("Something Went Wrong");
  }
}

export function* sosMessageReadWorker(action) {
  try {
    const res = yield call(sosMessageReadApi, action.data);
    console.log(res);
    yield call(findALLSosMessagesApi);
  } catch (err) {
    console.log(err);
    // yield action.onError("Something Went Wrong");
  }
}

export function* uploadChatImageWorker(action) {
  try {
    const image = new FormData();
    image.append("image", action.image);
    const res = yield call(uploadChatImageApi, image);
    console.log(res);
    if (res.status === 200 && res.data.status === "success") {
      yield action.onSuccess(res);
    } else {
      yield action.onError(res);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* sendSosMessagesWorker(action) {
  try {
    const res = yield call(sendSosMessageApi, action.data);
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

export function* sendDriverSosMessagesWorker(action) {
  try {
    const res = yield call(sendDriverSosMessageApi, action.data);
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

export function* sendDriverComplaintMessagesWorker(action) {
  try {
    const res = yield call(sendDriverComplaintMessageApi, action.data);
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

export function* sendRiderComplaintMessagesWorker(action) {
  try {
    const res = yield call(sendRiderComplaintMessageApi, action.data);
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

export function* WatchStoredMessagesWorker() {
  yield takeLatest(STORAGED_MESSAGE, storedMessagesWorker);
}
export function* WatchStoredMessagesSosWorker() {
  yield takeLatest(STORAGED_SOS_MESSAGE, storedMessagesSosWorker);
}

export function* WatchfindALLComplaintsWorker() {
  yield takeLatest(ALL_COMPLAINTS_MESSAGES, findALLComplaintsWorker);
}
export function* WatchfindALLSosMessagesWorker() {
  yield takeLatest(ALL_SOS_MESSAGES, findALLSosMessagesWorker);
}
export function* WatchcomplaintMessageReadWorker() {
  yield takeLatest(COMPLAINT_MESSAGE_READ, complaintMessageReadWorker);
}
export function* WatchsosMessageReadWorker() {
  yield takeLatest(SOS_MESSAGE_READ, sosMessageReadWorker);
}
export function* WatchUploadChatImageWorker() {
  yield takeLatest(CHAT_IMAGE_UPLOAD, uploadChatImageWorker);
}
export function* WatchSendSosMessagesWorker() {
  yield takeLatest(SEND_SOS_MESSAGE, sendSosMessagesWorker);
}
export function* WatchSendDriverSosMessagesWorker() {
  yield takeLatest(DRIVER_SEND_SOS_MESSAGE, sendDriverSosMessagesWorker);
}
export function* WatchSendDriveromplaintMessagesWorker() {
  yield takeLatest(
    DRIVER_SEND_COMPLAINT_MESSAGE,
    sendDriverComplaintMessagesWorker
  );
}
export function* WatchSendRiderComplaintMessagesWorker() {
  yield takeLatest(
    RIDER_SEND_COMPLAINT_MESSAGE,
    sendRiderComplaintMessagesWorker
  );
}
