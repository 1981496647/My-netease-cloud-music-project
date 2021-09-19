import React, { memo } from "react";
import "./index.css";
import { footerlinks } from "@/common/local-data";
export default memo(function AppFooter() {
  const showFooter = (item, index) => {
    if (index < 5) {
      return (
        <div className="a-link" key={item.name}>
          <a href={item.link}>{item.name}</a>
          <span>|</span>
        </div>
      );
    } else {
      return (
        <div className="a-link" key={item.name}>
          <a href={item.link}>{item.name}</a>
        </div>
      );
    }
  };

  return (
    <div className="footer" style={{borderTop:"1px solid #ccc"}}>
      <div className="footercenter">
        <div className="copy">
          <div className="music-link">
            {footerlinks.map((item, index) => {
              return showFooter(item, index);
            })}
          </div>
          <div className="span-linkright">
            <span>网易公司版权所有©1997-2021</span>
            <span>杭州乐读科技有限公司运营：</span>
            <a href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png">
              浙网文[2021] 1186-054号
            </a>
          </div>
          <div className="email-link">
            违法和不良信息举报电话：0571-89853516 举报邮箱：ncm5990@163.com
          </div>
          <div className="email-link">
            粤B2-20090191-18 工业和信息化部备案管理系统网站 浙公网安备
            33010902002564号
          </div>
        </div>
        <div className="unit">
          <div className="position"></div>
          <div className="position1"></div>
          <div className="position2"></div>
          <div className="position3"></div>
          <div className="position4"></div>
        </div>
      </div>
    </div>
  );
});
