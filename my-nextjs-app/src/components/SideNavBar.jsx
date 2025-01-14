"use client";
import React, { Children, useState } from "react";
import Image from "next/image";

export default function SideNavBar({ Children }) {
  const [isNavVisible, setNavVisible] = useState(true);
  const [activeLink, setActiveLink] = useState("");

  const toggleNavbar = () => {
    setNavVisible(!isNavVisible);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <aside
      id="nav-bar"
      className={`bg-[#F6F5F5] transition-all ${
        isNavVisible ? "w-52" : "w-16"
      }`}
    >
      <nav className="flex flex-col h-full justify-between">
        <div>
          {/* Toggle Button */}
          <a
            href="#"
            className="flex items-center justify-between gap-3 p-4 hover:bg-gray-100"
            onClick={toggleNavbar}
          >
            {isNavVisible ? (
              <>
                <span className="font-bold order-1">My Hub</span>
                <Image
                  src="/left.png"
                  alt="close"
                  width={24}
                  height={24}
                  className="order-2"
                />
              </>
            ) : (
              <Image
                src="/right.png"
                alt="open"
                width={24}
                height={24}
                className="ml-auto"
              />
            )}
          </a>

          {/* Sidebar Links */}
          <div className="flex flex-col">
            {[
              { name: "Start Stream", icon: "/play.png" },
              { name: "Followers", icon: "/followers.png" },
              { name: "Following", icon: "/following.png" },
            ].map((link) => (
              <a
                key={link.name}
                href="#"
                className={`flex items-center gap-3 p-4 transition-all hover:bg-gray-100 ${
                  activeLink === link.name ? "bg-[#FBFBFB]" : ""
                }`}
                onClick={() => handleLinkClick(link.name)}
              >
                <Image src={link.icon} alt={link.name} width={24} height={24} />
                {isNavVisible && <span>{link.name}</span>}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
