import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import IMAGES from "../assets";
import LaptopCityButton from "../component/button";
import { LoginContext, UserProfileContext } from "../App";
import { IconButton } from "@mui/material";
import ProfileDropdown from "../component/ProfileDropdown";
import SignOutAlert from "../component/SignOutAlert";

const activeStyles = ({ isActive }) => {
  if (isActive) {
    return {
      color: "#009F7F",
      fontWeight: 600,
    };
  }
};

const categoriesSubMenu = [
  {
    title: "new products",
    param: "new_products",
  },
  {
    title: "used products",
    param: "used_products",
  },
];

function NavDropdown({ submenus, dropdown, closeDropdown, closeNav }) {
  return (
    <ul
      className={`${
        dropdown ? "block" : "hidden"
      } navDropdown transition-all ease-in duration-500 z-20 absolute top-14 left-0 md:left-[-20%] lg:left-[-15%] bg-white border-[0.5px] border-green rounded-md py-2 md:py-4 md:space-y-2`}
    >
      {submenus.map((submenu, index) => (
        <li
          key={index}
          className="whitespace-nowrap text-center transition-all ease-in duration-200 hover:bg-[#63BB82] hover:text-white focus:bg-[#63BB82] focus:text-white text-sm p-2 px-4 md:px-6 capitalize"
          onClick={() => {
            closeDropdown();
            if (window.innerWidth < 768) {
              closeNav();
            }
          }}
        >
          <Link
            to={{
              pathname: "/products",
              search: `?filter=${submenu.param}`,
            }}
          >
            {submenu.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function CustomLink({ to, children, ...props }) {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const closeDropdown = () => {
    setDropdown(false);
  };

  return (
    <li
      className="py-4 h-auto relative"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.subMenu ? (
        <>
          <button
            className="no-underline flex items-center gap-1 capitalize text-inherit transition-all ease-in-out duration-500 hover:tracking-wide hover:text-green hover:font-semibold active:font-semibold active:text-green focus:text-green focus:font-semibold"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {children}
          </button>
          <NavDropdown
            submenus={props.subMenu}
            dropdown={dropdown}
            closeDropdown={closeDropdown}
            closeNav={props.onClick}
          />
        </>
      ) : (
        <NavLink
          to={to}
          {...props}
          className="no-underline flex items-center gap-1 capitalize text-inherit transition-all ease-in-out duration-500 hover:tracking-wide hover:text-green hover:font-semibold active:font-semibold active:text-green focus:text-green focus:font-semibold"
          style={activeStyles}
        >
          {children}
        </NavLink>
      )}
    </li>
  );
}
function Nav() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [profile, setProfile] = useContext(UserProfileContext);
  const [clicked, setClicked] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const handleToggleAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    setOpenAlert(false);
    navigate("/products");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

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
      {openAlert && (
        <SignOutAlert logOut={handleLogOut} closeAlert={handleCloseAlert} />
      )}
      <nav className="z-50 sticky top-0 bg-[#fbfbfb] p-4 flex justify-between items-center gap-4 md:hidden">
        <div className="flex justify-center items-center w-32 h-11">
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
            >
              <NavLink
                to="/profile"
                className="hover:text-green active:text-green focus:text-green mb-4"
                style={activeStyles}
                onClick={handleCloseNav}
              >
                {profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.username}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                  />
                ) : (
                  <i className="bx bxs-user-circle bx-md"></i>
                )}
              </NavLink>

              <IconButton
                className="hover:text-green active:text-green focus:text-green"
                sx={{ p: 0, my: 1 }}
                onClick={() => {
                  handleCloseNav();
                  navigate("/shopping-cart");
                }}
              >
                <i className="bx bx-cart-add text-3xl text-[#111] transition ease-in-out duration-200 hover:text-green"></i>
              </IconButton>

              {/* <div className="h-px w-4/5 border border-black"></div> */}

              <CustomLink onClick={handleCloseNav} to="/">
                Home
              </CustomLink>
              <CustomLink
                onClick={handleCloseNav}
                to="/categories"
                subMenu={categoriesSubMenu}
              >
                categories <i className="bx bx-chevron-down bx-sm"></i>
              </CustomLink>
              {/* <CustomLink onClick={handleCloseNav} to="/my-orders">
                track orders
              </CustomLink>
              <CustomLink onClick={handleCloseNav} to="/coupons">
                coupons
              </CustomLink> */}

              <CustomLink onClick={handleCloseNav} to="/blog">
                Blog
              </CustomLink>
              <CustomLink onClick={handleCloseNav} to="/about">
                about
              </CustomLink>

              <button
                type="button"
                className="text-secondary-button border border-solid border-secondary-button rounded-md outline-0 flex justify-center items-center gap-2 font-semibold p-2 my-4"
                onClick={() => {
                  handleCloseNav();
                  handleToggleAlert();
                }}
              >
                <i className="bx bx-power-off bx-sm"></i>
                Log out
              </button>
            </ul>
          </div>
        ) : (
          <div>
            <ul
              id="mobileNav"
              className={clicked ? "#mobileNav activeMenu" : "#mobileNav"}
              // className="flex items-center justify-between gap-4 list-none"
            >
              {/* <button className="mb-4 self-end mr-5" onClick={handleCloseNav}>
                <i className="bx bx-x bx-md"></i>
              </button> */}

              <CustomLink onClick={handleCloseNav} to="/">
                Home
              </CustomLink>
              <CustomLink
                onClick={handleCloseNav}
                to="/categories"
                subMenu={categoriesSubMenu}
              >
                categories <i className="bx bx-chevron-down bx-sm"></i>
              </CustomLink>
              <CustomLink onClick={handleCloseNav} to="/login">
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
                  <NavLink
                    to="/login"
                    className="font-bold capitalize transition-all ease-in duration-500 hover:text-green active:text-green focus:text-green"
                    style={activeStyles}
                  >
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

        <div className="flex justify-center items-center w-6 h-5 z-50">
          {!clicked ? (
            <img
              src={IMAGES.icons.hamburger2}
              alt="logo"
              className="max-w-full max-h-full"
              onClick={handleShowNav}
            />
          ) : (
            <button onClick={handleCloseNav}>
              <i className="bx bx-x bx-md"></i>
            </button>
          )}
        </div>
      </nav>

      {clicked ? <div className="overlay" /> : null}

      {loggedIn ? (
        <nav className="hidden z-50 sticky top-0 bg-[#fbfbfb] md:block text-sm lg:text-base xl:text-lg py-4 px-12 lg:px-24">
          <div className="w-full flex justify-between items-center gap-6">
            <div className="flex items-center w-36 h-11">
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
              <CustomLink subMenu={categoriesSubMenu}>
                categories <i className="bx bx-chevron-down bx-sm"></i>
              </CustomLink>
              {/* <CustomLink to="/coupons">coupons</CustomLink>
              <CustomLink to="/my-orders">track orders</CustomLink> */}
              <CustomLink to="/blog">Blog</CustomLink>
              <CustomLink to="/about">about</CustomLink>
            </ul>

            <ul className="flex items-center justify-between gap-4 lg:gap-4 list-none whitespace-nowrap">
              {/* <CustomLink to="/blog">Blog</CustomLink>
              <CustomLink to="/about">about</CustomLink> */}
              <IconButton
                className="hover:text-green active:text-green focus:text-green"
                sx={{ p: 1 }}
                onClick={() => navigate("/shopping-cart")}
              >
                <i className="bx bx-cart-add text-[#111] transition ease-in-out duration-200 hover:text-green"></i>
              </IconButton>

              <div className="h-6 w-px border border-black"></div>

              {/* <NavLink
                to="/personal-info"
                className="hover:text-green active:text-green focus:text-green"
                style={activeStyles}
              > */}
              <div>
                <IconButton
                  className="hover:text-green active:text-green focus:text-green"
                  sx={{ p: 0 }}
                  onClick={handleOpenProfileMenu}
                >
                  {profile?.avatar ? (
                    <img
                      src={profile?.avatar}
                      alt={profile?.username}
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                    />
                  ) : (
                    <i className="bx bxs-user-circle bx-md"></i>
                  )}
                </IconButton>
                {anchorEl && (
                  <ProfileDropdown
                    anchorEl={anchorEl}
                    handleClose={handleCloseProfileMenu}
                    picture={profile?.avatar}
                    username={profile?.username}
                    logout={handleToggleAlert}
                  />
                )}
              </div>
              {/* </NavLink> */}
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="hidden z-50 sticky top-0 bg-[#fbfbfb] md:block text-sm lg:text-base py-4 px-12 lg:px-24">
          <div className="w-full flex justify-between items-center gap-6">
            <div className="flex items-center w-36 h-11">
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
              <CustomLink subMenu={categoriesSubMenu}>
                categories <i className="bx bx-chevron-down bx-sm"></i>
              </CustomLink>
              <CustomLink to="/login">track orders</CustomLink>
              <CustomLink to="/blog">Blog</CustomLink>
              <CustomLink to="/about">about</CustomLink>
            </ul>

            <div className="flex justify-end items-center gap-6 whitespace-nowrap">
              <button>
                <NavLink
                  to="/login"
                  className="font-bold capitalize transition-all ease-in duration-500 hover:text-green active:text-green focus:text-green"
                  style={activeStyles}
                >
                  log-in
                </NavLink>
              </button>

              <button className="capitalize font-medium text-white text-sm lg:text-base md:font-semibold md:px-6 lg:py-4 lg:px-[26px] rounded bg-green py-2 px-4 hover:bg-dark-green">
                <Link to="signup">Sign up</Link>
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Nav;
