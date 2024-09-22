import { api } from "../api";

export const dashboardDetailsApi = (params) => {
  return api.post(
    `/api/admin/dashboard/fetch-details`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dashboardGraphDetailsApi = (params) => {
  return api.post(
    `/api/admin/dashboard/fetch-graph-details`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dashboardMoreGraphDetailsApi = (params) => {
  return api.post(
    `/api/admin/dashboard/fetch-more-graph-details`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
