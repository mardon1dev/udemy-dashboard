import React from "react";
import LogoIcon from "../../assets/logo.svg";
import Navlink from "../Navlink/Navlink";
import { getNavLinksForRole } from "../../config/navigation";

const Navbar = () => {
  const userRole = "admin";
  const navlinks = getNavLinksForRole(userRole);
  return (
    <div className="w-[240px] bg-[#152259] h-screen sticky top-0 left-0">
      <div className="mx-auto flex flex-col items-center p-6 border-b-[2px] border-[#BDBDBD]">
        <img
          className="mb-3"
          src={LogoIcon}
          alt="Logo"
          width={"65"}
          height={"65"}
        />
        <p className="text-white py-3 text-lg">School</p>
      </div>
      <ul className="px-[25px] pt-[15px] flex flex-col gap-2">
        {navlinks &&
          navlinks.map((item) => {
            return <Navlink item={item} key={item.id} />;
          })}
      </ul>
    </div>
  );
};

export default Navbar;
