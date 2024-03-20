import { Link, useLocation } from "react-router-dom";
import { adminNav, navRoutes, userNav } from "../../utils/routes";
import "./nav-sidebar.css";

const NavSidebar = ({ role = "User" }) => {
  const location = useLocation();
  const navRoutesData = role === "Admin" ? adminNav : role === "SuperAdmin" ? navRoutes : userNav;
  return (
    <div className="sidebar-container">
      {navRoutesData.map((menuItem) => (
        <div
          className={location.pathname.includes(menuItem.pathname) ? "menu-item active-menu-item" : "menu-item"}
          key={menuItem.pathname}
        >
          <Link to={menuItem.pathname} className="menu-label">
            <div className="menu-icon">{menuItem.icon}</div>
            <p className="menu-icon-fontsize">{menuItem.label} </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NavSidebar;
