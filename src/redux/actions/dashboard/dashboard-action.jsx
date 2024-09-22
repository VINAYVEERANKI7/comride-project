import {
  DASHBOARD_DEATILS,
  DASHBOARD_GRAPH_DEATILS,
  DASHBOARD_MORE_GRAPH_DEATILS,
} from "../types";

export const dashboardDetailsAction = (data, onSuccess, onError) => {
  return {
    type: DASHBOARD_DEATILS,
    data,
    onSuccess,
    onError,
  };
};
export const dashboardGraphDetailsAction = (data, onSuccess, onError) => {
  return {
    type: DASHBOARD_GRAPH_DEATILS,
    data,
    onSuccess,
    onError,
  };
};
export const dashboardMoreGraphDetailsAction = (data, onSuccess, onError) => {
  return {
    type: DASHBOARD_MORE_GRAPH_DEATILS,
    data,
    onSuccess,
    onError,
  };
};
