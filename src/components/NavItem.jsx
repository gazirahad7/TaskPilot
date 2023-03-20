import React from "react";

import { Link } from "react-router-dom";
function NavItem({ path, icon, name, countList }) {
  return (
    <>
      <Link to={path}>
        <div className="nav-item">
          {icon}
          <div>
            {name} <span className="countItem">{countList || ""}</span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default NavItem;
