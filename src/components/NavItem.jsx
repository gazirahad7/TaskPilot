import React from "react";

import { NavLink } from "react-router-dom";
function NavItem({ path, icon, name, countList }) {
  return (
    <>
      <NavLink to={path}>
        <div className="nav-item">
          {icon}
          <div>
            {name} <span className="countItem">{countList || "0"}</span>
          </div>
        </div>
      </NavLink>
    </>
  );
}

export default NavItem;
