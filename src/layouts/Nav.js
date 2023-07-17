import React from "react";
import { Link, NavLink } from "react-router-dom";
import IMAGES from "../assets";
import LaptopCityButton from "../component/button";

const activeStyles = ({ isActive }) => {
  if (isActive) {
    return {
      color: "#009F7F",
      fontWeight: 600,
    };
  }
};

function CustomLink({ to, children, ...props }) {
  return (
    <li className="flex justify-center items-center py-4 h-auto ">
      <NavLink
        to={to}
        {...props}
        className="no-underline capitalize text-inherit hover:text-green hover:font-semibold active:font-semibold active:text-green focus:text-green focus:font-semibold"
        style={activeStyles}
      >
        {children}
      </NavLink>
    </li>
  );
}
function Nav() {
  return (
    <div>
      <nav className="w-11/12 mx-auto flex justify-between items-center gap-4 md:hidden">
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

          <NavLink
            to="/profile"
            className="hover:text-green active:text-green focus:text-green"
            style={activeStyles}
          >
            <i className="bx bxs-user-circle bx-md"></i>
            {/* <div className="flex justify-center items-center w-6 h-6">
              <img
                src={IMAGES.icons.account}
                alt="logo"
                className="max-w-full w-full"
              />
            </div> */}
          </NavLink>

          <div className="flex justify-center items-center w-6 h-6">
            <img
              src={IMAGES.icons.hamburgerMenu}
              alt="logo"
              className="max-w-full w-full"
            />
          </div>
        </ul>
      </nav>

      <nav className="hidden md:block text-sm lg:text-base px-12 lg:px-24">
        <div className="w-full flex justify-between items-center gap-6">
          <div className="flex items-center w-32 h-11">
            <Link to="/">
              <img
                src={IMAGES.logoDesktop}
                alt="logo"
                className="max-w-full w-full"
              />
            </Link>
          </div>

          <ul className="flex items-center justify-between gap-4 lg:gap-8 list-none whitespace-nowrap">
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/categories">categories</CustomLink>
            <CustomLink to="/my-order">track orders</CustomLink>
            <CustomLink to="/blog">Blog</CustomLink>
            <CustomLink to="/about">about</CustomLink>
          </ul>

          <div className="flex justify-end items-center gap-6 whitespace-nowrap">
            <button>
              <NavLink to="/login" style={activeStyles}>
                log-in
              </NavLink>
            </button>

            <LaptopCityButton>
              <Link to="signup">Sign up</Link>
            </LaptopCityButton>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
