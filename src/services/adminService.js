import * as api from "../utils/requests";
import * as Constant from "../globals/constant"
/* Content API (POST) */
export const adminLogin = async (data) => {
  return await api.PostReq("/auth/login", data).then((response) => {
    return response;
  });
};

export const adminDetail = async () => {
  return await api.getReq("/auth/getProfile").then((response) => {
    return response;
  });
};

export const userList = async (page, keyword) => {
  return await api
    .getReq(
      `/admin/userList?pageNo=${page}&limit=${Constant.PERPAGE}&search=${
      keyword ? keyword : ""
      }`
    )
    .then((response) => {
      return response;
    });
};
export const sellerList = async (page, keyword) => {
  return await api
    .getReq(
      `/admin/sellerList?pageNo=${page}&limit=${Constant.PERPAGE}&search=${
      keyword ? keyword : ""
      }`
    )
    .then((response) => {
      return response;
    });
};

export const updateAdmin = async (data) => {
  return await api.putReq("/auth/updateProfile", data).then((resp) => {
    return resp;
  });
};
export const userDel = async (id) => {
  return await api.delReq(`report/report/${id}`).then((response) => {
    return response;
  });
};
export const userDell = async (id) => {
  return await api.delReq(`admin/userList/${id}`).then((response) => {
    return response;
  });
};
export const userDellAll = async (data) => {
  return await api.delReq(`auth/deleteMany`, data).then((response) => {
    return response;
  });
};

//PostDel
export const PostDel = async (id) => {
  return await api.delReq(`/report/report/${id}`).then((response) => {
    return response;
  });
};

export const updatePassword = async (data) => {
  return await api.putReq("/auth/changePassword", data).then((resp) => {
    return resp;
  });
};
export const updateUser = async (data) => {
  return await api.putReq("/auth/updateProfile", data).then((resp) => {
    return resp;
  });
};

//changeUserStatus
export const changeUserStatus = async (id, status) => {
  return await api.putReq("/auth/updateProfile", status).then((resp) => {
    return resp;
  });
};

//dashBoardInfo
export const dashBoardInfo = async () => {
  return await api.getReq(`/admin/dashboard`).then((response) => {
    return response;
  });
};
