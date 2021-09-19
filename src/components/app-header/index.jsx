import React, { memo, useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { headerLinks } from "../../common/local-data";

import Login from "../../common/login";
import "./index.css";
import {
  getIsLoginAction,
  getQRkeyAction,
  getQRkeycreateAction,
} from "../login-store/actionCreaters";

export default memo(function AppHeader() {
  //页面代码
  const dispatch = useDispatch();
  const { uniKye } = useSelector(
    (state) => ({
      uniKye: state.getIn(["userLogin", "uniKye"]),
    }),
    shallowEqual
  );
  const bottomref = useRef();

  //返回jsx

  const showItem = (item, index) => {
    if (index < 3) {
      return (
        <NavLink to={item.link} key={item.title}>
          {item.title}
          <div className="cor"></div>
        </NavLink>
      );
    } else if (index >= 3 && index < 5) {
      return (
        <a href={item.link} key={item.title}>
          {item.title}
        </a>
      );
    } else {
      return (
        <NavLink to={item.link} className="download" key={item.title}>
          {item.title}
          <div className="cor"></div>
          <div className="hot"></div>
        </NavLink>
      );
    }
  };

  useEffect(() => {
    dispatch(getQRkeyAction());
  }, [dispatch]);

  // 返回jsx
  const userLogin = (flag) => {
    dispatch(getQRkeycreateAction(uniKye));
    dispatch(getIsLoginAction(flag));
  };
  return (
    <div className="content">
      <div className="navlink">
        <div className="logo"></div>

        <div className="navlink-item">
          {headerLinks.map((item, index) => {
            return showItem(item, index);
          })}
        </div>
        <div className="headersearch">
          <Input
            className="headerinput"
            placeholder="音乐/视频/电台/用户"
            prefix={
              <SearchOutlined style={{ fontSize: "20px", color: "#ccc" }} />
            }
          />
          <Button className="headerbutton">创作者中心</Button>
          <span className="headerregister" onClick={(e) => userLogin(true)}>
            登录
          </span>
        </div>
      </div>

      <div className="headerbottom" ref={bottomref}></div>
      <Login />
    </div>
  );
});
