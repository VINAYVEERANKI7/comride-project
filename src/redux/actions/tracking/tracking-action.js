import { TRACKING_LIST } from "../types";

export const trackingListAction = (data, onSuccess, onError) => {
  return {
    type: TRACKING_LIST,
    data,
    onSuccess,
    onError,
  };
};
