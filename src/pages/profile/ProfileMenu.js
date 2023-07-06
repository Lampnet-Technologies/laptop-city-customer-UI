import React from "react";
import { Link } from "react-router-dom";
// import { Banner } from "../../component/homepage";

const links = [
  {
    icon: "bx bxs-user-circle bx-sm",
    name: "My Account",
    to: "/personal-info",
  },
  {
    icon: "bx bx-cart-add bx-sm",
    name: "My orders",
    to: "",
  },
  {
    icon: "bx bx-user bx-sm",
    name: "account management",
    to: "",
  },
  {
    icon: "bx bx-gift bx-sm",
    name: "coupons",
    to: "/coupons/:id",
  },
];

function ProfileMenu() {
  return (
    <div className="h-screen">
      <div className="h-96 bg-filter-green">
        <div className="p-4 space-y-2">
          {links.map((link, index) => {
            return (
              <Link
                key={index}
                to={link.to}
                className="inline-block w-full hover:text-green hover:font-semibold hover:ml-10 active:text-green active:font-semibold active:ml-10"
                style={{ transition: "margin-left 1s" }}
              >
                <div className="p-4 rounded-md bg-white font-medium flex items-center gap-4 capitalize ">
                  <i className={link.icon}></i>

                  {link.name}
                </div>
              </Link>
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
