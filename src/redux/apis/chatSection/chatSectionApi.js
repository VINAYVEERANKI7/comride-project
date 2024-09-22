import { api } from "../api";

export const storedMessageApi = (params, max_count = 50) => {
  return api.post(
    `/api/socket/findOne-complaint-chat-history?page_no=${params.page}&max=${max_count}&order=DESC`, // ?page_no=${page}&max=${max_count} || ,
    JSON.stringify(params.data),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const storedMessageSosApi = (params) => {
  return api.post(
    `/api/socket/findOne-sos-chat-history`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const findALLComplaintsApi = (params) => {
  return api.post(
    `/api/socket/findAll-complaint-chat-history-count`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const findALLSosMessagesApi = (params) => {
  return api.post(
    `/api/socket/findAll-sos-chat-history-count`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const complaintMessageReadApi = (params) => {
  return api.post(
    `/api/socket/read-complaint-message`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const sosMessageReadApi = (params) => {
  return api.post(`/api/socket/read-sos-message`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const uploadChatImageApi = (params) => {
  return api.post(`/api/admin/images/upload-chat-file`, params, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": false,
    },
  });
};

export const sendSosMessageApi = (params) => {
  return api.post(
    `/api/socket/sos/admin-sending-sos-msg-to-rider`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const sendDriverSosMessageApi = (params) => {
  return api.post(
    `/api/socket/sos/admin-sending-sos-msg-to-driver`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const sendDriverComplaintMessageApi = (params) => {
  return api.post(
    `/api/socket/complaint/admin-sending-complaint-msg-to-driver`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const sendRiderComplaintMessageApi = (params) => {
  return api.post(
    `/api/socket/complaint/admin-sending-complaint-msg-to-rider`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
