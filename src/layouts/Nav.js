import React, { useState, useEffect } from "react";
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
        className="no-underline capitalize text-inherit transition-all ease-in-out duration-300 hover:tracking-wide hover:text-green hover:font-semibold active:font-semibold active:text-green focus:text-green focus:font-semibold"
        style={activeStyles}
      >
        {children}
      </NavLink>
    </li>
  );
}
function Nav() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleShowNav = () => {
    setClicked(true);
  };

  const handleCloseNav = () => {
    setClicked(false);
  };

  useEffect(() => {
    if (clicked) {
      let body = document.getElementsByClassName("overlay");
      body[0].addEventListener("click", handleCloseNav);
    }
  }, [clicked]);

  return (
    <>
      <nav className="z-50 sticky top-0 bg-white py-4 px-6 flex justify-between items-center gap-4 md:hidden">
        <div className="flex justify-center items-center w-20 h-8">
          <Link to="/" onClick={handleCloseNav}>
            <img
              src={IMAGES.logoMobile}
              alt="logo"
              className="max-w-full w-full"
            />
          </Link>
        </div>

        {loggedIn ? (
          <div>
            <ul
              id="mobileNav"
              className={clicked ? "#mobileNav activeMenu" : "#mobileNav"}
              // className="flex items-center justify-between gap-4 list-none"
            >
              <button className="mb-4 self-end mr-5" onClick={handleCloseNav}>
                <i className="bx bx-x bx-md"></i>
              </button>

              <NavLink
                to="/profile"
                className="hover:text-green active:text-green focus:text-green"
                style={activeStyles}
              >
                <i className="bx bxs-user-circle bx-md"></i>
              </NavLink>

              <CustomLink onClick={handleCloseNav} to="/">
                Home
              </CustomLink>
              <CustomLink onClick={handleCloseNav} to="/categories">
                categories
              </CustomLink>
              <CustomLink onClick={handleCloseNav} to="/track-order/:id">
                track orders
              </CustomLink>
              <CustomLink onClick={handleCloseNav} to="/coupons">
                coupons
              </CustomLink>

              <CustomLink onClick={handleCloseNav} to="/blog">
                Blog
              </CustomLink>
              <CustomLink onClick={handleCloseNav} to="/about">
                about
              </CustomLink>
            </ul>
          </div>
        ) : (
          <div>
            <ul
              id="mobileNav"
              className={clicked ? "#mobileNav activeMenu" : "#mobileNav"}
              // className="flex items-center justify-between gap-4 list-none"
            >
              <button className="mb-4 self-end mr-5" onClick={handleCloseNav}>
                <i className="bx bx-x bx-md"></i>
              </button>

              <CustomLink onClick={handleCloseNav} to="/">
                Home
              </CustomLink>
              <CustomLink onClick={handleCloseNav} to="/categories">
                categories
              </CustomLink>
              <CustomLink onClick={handleCloseNav} to="/track-order/:id">
                track orders
              </CustomLink>
              <CustomLink onClick={handleCloseNav} to="/blog">
                Blog
              </CustomLink>
              <CustomLink onClick={handleCloseNav} to="/about">
                about
              </CustomLink>

              <div className="mt-4 flex flex-col items-start gap-8 whitespace-nowrap">
                <button onClick={handleCloseNav}>
                  <NavLink to="/login" style={activeStyles}>
                    log-in
                  </NavLink>
                </button>

                <LaptopCityButton onClick={handleCloseNav}>
                  <Link to="signup">Sign up</Link>
                </LaptopCityButton>
              </div>
            </ul>
          </div>
        )}

        <div className="flex justify-center items-center w-6 h-5">
          <img
            src={IMAGES.icons.hamburger2}
            alt="logo"
            className="max-w-full max-h-full"
            onClick={handleShowNav}
          />
        </div>
      </nav>

      {clicked ? <div className="overlay" /> : null}

      {loggedIn ? (
        <nav className="hidden md:block text-sm lg:text-base py-4 px-12 lg:px-24">
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
              <CustomLink to="/coupons">coupons</CustomLink>
              <CustomLink to="/track-order/:id">track orders</CustomLink>
            </ul>

            <ul className="flex items-center justify-between gap-4 lg:gap-8 list-none whitespace-nowrap">
              <CustomLink to="/blog">Blog</CustomLink>
              <CustomLink to="/about">about</CustomLink>

              <div className="h-6 w-px border border-black"></div>

              <NavLink
                to="/personal-info"
                className="hover:text-green active:text-green focus:text-green"
                style={activeStyles}
              >
                <i className="bx bxs-user-circle bx-md"></i>
              </NavLink>
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="hidden md:block text-sm lg:text-base py-4 px-12 lg:px-24">
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
              <CustomLink to="/track-order/:id">track orders</CustomLink>
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
      )}
    </>
  );
}

export default Nav;

{
  /* <nav className="w-11/12 mx-auto flex justify-between items-center gap-4 md:hidden">
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
            </div> ******
          </NavLink>

          <div className="flex justify-center items-center w-6 h-6">
            <img
              src={IMAGES.icons.hamburgerMenu}
              alt="logo"
              className="max-w-full w-full"
            />
          </div>
        </ul>
      </nav> */
}
