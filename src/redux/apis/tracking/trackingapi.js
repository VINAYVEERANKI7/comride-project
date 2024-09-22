import { api } from "../api";

export const trackingListApi = (params) => {
  return api.post(
    `/api/tracking/fetch-tracking-details`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
