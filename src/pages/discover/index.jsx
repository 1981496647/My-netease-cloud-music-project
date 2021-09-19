import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import { discoverRoutes } from "../../common/local-data";
import { renderRoutes } from "react-router-config";
export default memo(function Discover(props) {
  const { route } = props;

  return (
    <>
    <div className="discover">
      <div className="discovercenter">
        {discoverRoutes.map((item) => {
          return (
            <NavLink key={item.title} to={item.link}>
              {item.title}
            </NavLink>
          );
        })}
      </div>
    </div>

    {renderRoutes(route.routes)}

    </>
  );
});
