import React, { memo, useEffect, useRef } from "react";
import QRcode from "qrcode.react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import "./index.css";
import qrimage from "../../assets/img/qrguide.png";
import { getIsLoginAction } from "../../components/login-store/actionCreaters";
export default memo(function Login(props) {
  const { kuyUrl, isLogin } = useSelector(
    (state) => ({
      kuyUrl: state.getIn(["userLogin", "kuyUrl"]),
      isLogin: state.getIn(["userLogin", "isLogin"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const loginRef = useRef();
  const showQR = (kuyUrl) => {
    if (!kuyUrl) {
      return <>还未生成二维码图片</>;
    } else {
      return <QRcode value={kuyUrl} />;
    }
  };

  const showLogin = (flag) => {
    console.log("关闭");
    dispatch(getIsLoginAction(flag));
  };
  useEffect(() => {
    if (isLogin) {
      loginRef.current.style.display = "block";
    } else {
      loginRef.current.style.display = "none";
    }
  });
  return (
    <div className="login" ref={loginRef}>
      <div className="title">
        <span>登录</span>
        <span onClick={(e) => showLogin(false)}>关闭</span>
      </div>

      <div className="img-QR">
        <div className="img">
          <img src={qrimage} alt="" />
        </div>
        <div className="Qr">{showQR(kuyUrl)}</div>
      </div>
    </div>
  );
});
