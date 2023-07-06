import React from "react";
import { Link } from "react-router-dom";
import IMAGES from "../assets";

function CustomLink({ to, children, ...props }) {
  return (
    <li className="flex justify-center items-center py-4 h-auto ">
      <Link
        to={to}
        {...props}
        className="no-underline text-inherit hover:text-green hover:font-semibold active:text-green focus:text-green"
      >
        {children}
      </Link>
    </li>
  );
}
function Nav() {
  return (
    <div>
      <nav className="w-11/12 mx-auto flex justify-between items-center gap-4">
        <div className="flex justify-center items-center w-20 h-8">
          <Link to="/">
            <img
              src={IMAGES.logoMobile}
              alt="logo"
              className="max-w-full w-full"
            />
          </Link>
        </div>

        <ul className="flex items-center justify-between gap-4 list-none">
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/blog">Blog</CustomLink>

          <div className="h-6 w-px border border-black"></div>

          <Link to="/profile">
            <div className="flex justify-center items-center w-6 h-6">
              <img
                src={IMAGES.icons.account}
                alt="logo"
                className="max-w-full w-full"
              />
            </div>
          </Link>

          <div className="flex justify-center items-center w-6 h-6">
            <img
              src={IMAGES.icons.hamburgerMenu}
              alt="logo"
              className="max-w-full w-full"
            />
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
