import React from "react";
import { Link } from "react-router-dom";
import LaptopCityButton from "../component/button";

const linksCollection = [
  {
    title: "About laptop city",
    links: [
      {
        to: "",
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
        to: "",
        name: "Warranty",
      },
      {
        to: "",
        name: "Order & Shipping",
      },
      {
        to: "",
        name: "Replacement & Refund",
      },
      {
        to: "",
        name: "Terms & Conditions",
      },
      {
        to: "",
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
        className="no-underline text-sm text-footer-Text font-light hover:text-green hover:font-medium"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterLinks({ title, links }) {
  return (
    <div>
      <h2 className="mb-6">{title}</h2>
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
    <div className="flex flex-wrap justify-between gap-6">
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
    <div className="flex flex-col gap-4 ">
      <h2>Newsletter</h2>
      <p className="text-sm text-footer-Text font-light">
        Get the Latest oraimo News and Giveaways.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex justify-between gap-2 mt-4"
      >
        <input
          type="email"
          placeholder="Email address"
          className="h-10 rounded p-2 text-xs outline-none w-full"
        />
        <LaptopCityButton>subscribe</LaptopCityButton>
      </form>
    </div>
  );
}

function FooterContacts() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-footer-Text font-light">
        SERVICE HOURS: Monday-Friday 9AM to 8PM
      </p>
      <p className="text-sm text-footer-Text font-light">
        Whatsapp: +234 901 627 9193 +234 818 642 3337
      </p>
      <p className="text-sm text-footer-Text font-light">
        Customer Service: +234 818 135 3103（First Choice） +234 809 604 0753
      </p>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-footer-bg">
      <div className="container py-10 px-6 flex flex-col gap-20">
        <FooterLinkContainer />
        <Newsletter />
        <FooterContacts />
      </div>
    </div>
  );
}

export default Footer;
