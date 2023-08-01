import React from "react";
import { Link, NavLink } from "react-router-dom";
// import { Banner } from "../../component/homepage";

const links = [
  {
    icon: "bx bxs-user-circle bx-sm",
    name: "My Account",
    to: "/personal-info",
  },
  {
    icon: "bx bx-shopping-bag bx-sm",
    name: "My orders",
    to: "/my-orders",
  },
  {
    icon: "bx bx-cart-add bx-sm",
    name: "shopping cart",
    to: "/shopping-cart/:id",
  },
  {
    icon: "bx bx-gift bx-sm",
    name: "coupons",
    to: "/coupons",
  },
];

const activeStyles = ({ isActive }) => {
  if (isActive) {
    return {
      color: "#009F7F",
      fontWeight: 600,
      marginLeft: "40px",
    };
  }
};

function ProfileMenu() {
  return (
    <div className="h-screen lg:h-auto">
      <div className="h-96 bg-filter-green lg:h-[560px] md:w-[25vw] lg:w-72 lg:rounded">
        <div className="p-4 space-y-2">
          {links.map((link, index) => {
            return (
              <NavLink
                key={index}
                to={link.to}
                className="inline-block w-full transition-{margin-left} duration-1000 hover:text-green hover:font-semibold hover:ml-10 active:text-green active:font-semibold active:ml-10"
                style={activeStyles}
              >
                <div className="p-4 rounded-md bg-white font-medium flex items-center gap-4 capitalize ">
                  <i className={link.icon}></i>

                  {link.name}
                </div>
              </NavLink>
            );
          })}
        </div>

        <button
          type="button"
          className="my-6 mx-auto bg-transparent text-green border-2 border-solid border-green rounded p-2 outline-0 flex justify-center items-center gap-2 font-semibold"
        >
          <i className="bx bx-power-off bx-sm"></i>
          Log out
        </button>
      </div>
    </div>
  );
}

export default ProfileMenu;
