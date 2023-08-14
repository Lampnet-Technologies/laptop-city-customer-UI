import React from "react";
import { Link } from "react-router-dom";
import LaptopCityButton from "../component/button";

const linksCollection = [
  {
    title: "About laptop city",
    links: [
      {
        to: "/about",
        name: "About Us",
      },
      {
        to: "",
        name: "Where to Buy",
      },
      {
        to: "",
        name: "Special Offer",
      },
    ],
  },
  {
    title: "Terms",
    links: [
      {
        to: "/terms-&-conditions/#warranty",
        name: "Warranty",
      },
      {
        to: "/terms-&-conditions",
        name: "Order & Shipping",
      },
      {
        to: "/terms-&-conditions/#refund",
        name: "Replacement & Refund",
      },
      {
        to: "/terms-&-conditions",
        name: "Terms & Conditions",
      },
      {
        to: "/privacy-policy",
        name: "Private Policy",
      },
    ],
  },
  {
    title: "Get Help",
    links: [
      {
        to: "",
        name: "Visit Carlcare",
      },
      {
        to: "",
        name: "Track your Order",
      },
      {
        to: "",
        name: "Contact Us",
      },
    ],
  },
];

function FooterLink({ to, children, ...props }) {
  return (
    <li>
      <Link
        to={to}
        className="no-underline text-sm lg:text-base text-footer-Text font-normal hover:text-green hover:font-medium"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterLinks({ title, links }) {
  return (
    <div>
      <h2 className="mb-6 lg:text-xl">{title}</h2>
      <ul className="flex flex-col items-start gap-4 list-none">
        {links.map((link, index) => {
          return (
            <FooterLink key={index} to={link.to}>
              {link.name}
            </FooterLink>
          );
        })}
      </ul>
    </div>
  );
}

function FooterLinkContainer() {
  return (
    <div className="flex flex-wrap justify-between gap-6 lg:w-1/2 lg:flex-nowrap">
      {linksCollection.map((item, index) => {
        return (
          <FooterLinks key={index} title={item.title} links={item.links} />
        );
      })}
    </div>
  );
}

function Newsletter() {
  return (
    <div className="flex flex-col gap-4 lg:w-[35%]">
      <h2 className="lg:text-xl">Newsletter</h2>
      <p className="text-sm lg:text-base text-footer-Text font-normal">
        Get the Latest oraimo News and Giveaways.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex justify-between gap-4 md:gap-5 mt-4"
      >
        <div className="bg-white h-10 rounded p-3 lg:h-auto flex w-full justify-between items-center gap-8">
          <i className="bx bx-envelope bx-sm text-[#6D7D8B]"></i>
          <input
            type="email"
            placeholder="Email address"
            className="placeholder:text-[#BBC8D4] text-xs outline-none h-full w-full md:text-sm lg:text-base"
          />
        </div>

        <button className="capitalize font-medium text-white text-sm lg:text-base md:font-semibold md:px-6 lg:py-4 lg:px-[26px] rounded bg-green py-2 px-4 hover:bg-dark-green">
          subscribe
        </button>
      </form>
    </div>
  );
}

function FooterContacts() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm lg:text-base text-footer-Text font-normal">
        SERVICE HOURS: Monday-Friday 9AM to 8PM
      </p>
      <p className="text-sm lg:text-base text-footer-Text font-normal">
        Whatsapp: +234 901 627 9193 +234 818 642 3337
      </p>
      <p className="text-sm lg:text-base text-footer-Text font-normal">
        Customer Service: +234 818 135 3103（First Choice） +234 809 604 0753
      </p>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-footer-bg">
      <div className="py-10 px-6 flex flex-col gap-20 md:px-12 lg:hidden">
        <FooterLinkContainer />
        <Newsletter />
        <FooterContacts />
      </div>

      <div className="hidden lg:flex gap-10 justify-between flex-wrap px-24 py-14">
        <Newsletter />
        <FooterLinkContainer />
        <FooterContacts />
      </div>
    </div>
  );
}

export default Footer;
