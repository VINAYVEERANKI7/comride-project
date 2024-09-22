import {
  ALL_COMPLAINTS_MESSAGES,
  ALL_SOS_MESSAGES,
  CHAT_IMAGE_UPLOAD,
  CHAT_LIST_LATEST,
  CHAT_LIST_LOAD,
  CHAT_LIST_LOAD_MORE,
  COMPLAINT_MESSAGE_READ,
  DRIVER_SEND_COMPLAINT_MESSAGE,
  DRIVER_SEND_SOS_MESSAGE,
  RIDER_SEND_COMPLAINT_MESSAGE,
  SEND_SOS_MESSAGE,
  SOS_MESSAGE_READ,
  STORAGED_MESSAGE,
  STORAGED_SOS_MESSAGE,
} from "../types";

export const storedMessageAction = (data, page, max, onSuccess, onError) => {
  return {
    type: STORAGED_MESSAGE,
    data,
    page,
    max,
    onSuccess,
    onError,
  };
};

export const storedMessageSosAction = (data, onSuccess, onError) => {
  return {
    type: STORAGED_SOS_MESSAGE,
    data,
    onSuccess,
    onError,
  };
};

export const findAllComplaintsAction = (onSuccess, onError) => {
  return {
    type: ALL_COMPLAINTS_MESSAGES,
    onSuccess,
    onError,
  };
};

export const findAllSosMessageAction = (onSuccess, onError) => {
  return {
    type: ALL_SOS_MESSAGES,
    onSuccess,
    onError,
  };
};

export const complaintMessageReadAction = (data) => {
  return {
    type: COMPLAINT_MESSAGE_READ,
    data,
  };
};

export const sosMessageReadAction = (data) => {
  return {
    type: SOS_MESSAGE_READ,
    data,
  };
};

export const uploadChatImageAction = (image, onSuccess, onError) => {
  return {
    type: CHAT_IMAGE_UPLOAD,
    image,
    onSuccess,
    onError,
  };
};
export const chatListLoadAction = (data) => {
  return {
    type: CHAT_LIST_LOAD,
    data,
  };
};
export const chatListLoadMoreAction = (data) => {
  return {
    type: CHAT_LIST_LOAD_MORE,
    data,
  };
};
export const chatListLatestAction = (data) => {
  return {
    type: CHAT_LIST_LATEST,
    data,
  };
};

export const sendSosMessageAction = (data, onSuccess, onError) => {
  return {
    type: SEND_SOS_MESSAGE,
    data,
    onSuccess,
    onError,
  };
};
export const DriverSendSosMessageAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_SEND_SOS_MESSAGE,
    data,
    onSuccess,
    onError,
  };
};
export const DriverSendComplaintMessageAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_SEND_COMPLAINT_MESSAGE,
    data,
    onSuccess,
    onError,
  };
};
export const RiderSendComplaintMessageAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_SEND_COMPLAINT_MESSAGE,
    data,
    onSuccess,
    onError,
  };
};
