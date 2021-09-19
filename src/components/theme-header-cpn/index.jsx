import React, { memo } from "react";
import "./index.css";
export default memo(function ThemeHeader(props) {
  const { title, keywords = [] } = props;
  const showTheme = (index) => {
    if (index === keywords.length - 1) {
      return <span></span>;
    } else {
      return <span>|</span>;
    }
  };
  return (
    <div className="theme">
      <div className="left-theme">
        <div className="icon-theme"></div>
        <div className="title-theme">{title}</div>
      </div>
      <div className="center-theme">
        {keywords.map((item, index) => {
          return (
            <div key={item} className="link-theme">
              <a href={item}>{item}</a>
              {showTheme(index)}
            </div>
          );
        })}
      </div>
      <div className="right-theme">更多</div>
    </div>
  );
});
