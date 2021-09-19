import { getQRcreate, getQRkey } from "../../network/login";

import * as actionTypes from "./constance";

//存储unikey

const changeGetQRkeyAction = (uniKye) => ({
  type: actionTypes.CHANGE_QR_KRY,
  uniKye,
});
export const getQRkeyAction = () => {
  return (dispatch) => {
    getQRkey().then((res) => {
      dispatch(changeGetQRkeyAction(res.data.unikey));
    });
  };
};

//通过key拿到二维码

const changekeyCreateAction = (kuyUrl) => ({
  type: actionTypes.CHANGE_QR_URL,
  kuyUrl,
});
export const getQRkeycreateAction = (key) => {
  return (dispatch) => {
    getQRcreate(key).then((res) => {
      dispatch(changekeyCreateAction(res.data.qrurl));
    });
  };
};

//保存显示和隐藏的状态
const changeIsLoginAction = (isLogin) => ({
  type: actionTypes.CHANGE_IS_LOGIN,
  isLogin,
});

export const getIsLoginAction = (flag) => {
  return (dispatch) => {
    dispatch(changeIsLoginAction(flag));
  };
};
