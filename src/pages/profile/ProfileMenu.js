import React from "react";
import { Link, NavLink } from "react-router-dom";

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
      // marginLeft: "40px",
      width: "80%",
    };
  }
};

function ProfileMenu({ onLogOut }) {
  return (
    <div className="h-screen lg:h-auto">
      <div className="h-[560px] pt-4 pb-16 bg-filter-green md:w-[25vw] lg:w-72 md:rounded flex flex-col gap-4 justify-between">
        <div className="p-4 space-y-4 lg:space-y-3 lg:py-6">
          {links.map((link, index) => {
            return (
              <NavLink
                key={index}
                to={link.to}
                className="inline-block w-full transition-{margin-left} duration-1000 hover:text-green hover:font-semibold hover:w-4/5 active:text-green active:font-semibold active:w-4/5"
                style={activeStyles}
              >
                <div className="p-4 rounded-md bg-white md:text-sm lg:text-base whitespace-nowrap font-medium flex items-center gap-4 capitalize ">
                  <i className={link.icon}></i>

                  {link.name}
                </div>
              </NavLink>
            );
          })}
        </div>

        <div className="bg-white py-5 text-center rounded-[10px] flex justify-center items-center">
          <button
            type="button"
            className="text-secondary-button border-2 border-solid border-secondary-button rounded outline-0 flex justify-center items-center gap-2 font-semibold py-4 px-[20px]"
            onClick={() => onLogOut()}
          >
            <i className="bx bx-power-off bx-sm"></i>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileMenu;
