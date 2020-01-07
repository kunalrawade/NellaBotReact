import client from './axiosClient';

export const putRequest = (url, data, notificationConf) => client({
  method: 'put',
  url,
  data,
  customparams: { showLoading: true, notificationConf },
});

export const postRequest = (url, data, notificationConf) => client({
  method: 'post',
  url,
  data,
  customparams: { showLoading: true, notificationConf },
});

export const getRequest = (url, isShowLoading, notificationConf) => client({
  method: 'get',
  url,
  data: {},
  customparams: { showLoading: isShowLoading, notificationConf },
});

export const deleteRequest = (url, notificationConf) => client({
  method: 'delete',
  url,
  data: {},
  customparams: { showLoading: true, notificationConf },
});

export const patchRequest = (url, data, notificationConf) => client({
  method: 'patch',
  url,
  data,
  customparams: { showLoading: true, notificationConf },
});
