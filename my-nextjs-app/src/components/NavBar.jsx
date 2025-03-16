"use client";
import React, { useState, useContext } from "react";
import LogoIcon from "@/components/icons/LogoIcon";
import { toast } from "react-hot-toast";
import { UserContext } from "@/context/UserProvider";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function App() {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();


  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/logout", {});
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        setUserDetails(null);
        toast.success("Logout successful!");
        setIsOpen(false);
        router.push("/login");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        console.log(errorMessage);
        toast.error(errorMessage);
      } else {
        console.log(error);
        toast.error("Error logging out");
      }
    }
  };

  return (
    <nav
      className="flex z-40 w-full h-auto items-center  data-[menu-open=true]:border-none sticky top-0 inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-[#F8FAFC]"
      style={{ "--navbar-height": "4rem" }}
    >
      <header className="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)]">
        <div className="flex basis-0 flex-row flex-grow flex-nowrap bg-transparent items-center no-underline text-medium whitespace-nowrap box-border justify-start">
          <LogoIcon width="40px" height="40px" fill="#000000" />
          <p className="font-bold text-inherit ml-1">ShowIt</p>
        </div>
        <ul
          className="h-full flex-row flex-nowrap items-center data-[justify=start]:justify-start data-[justify=start]:flex-grow data-[justify=start]:basis-0 data-[justify=center]:justify-center data-[justify=end]:justify-end data-[justify=end]:flex-grow data-[justify=end]:basis-0 hidden sm:flex gap-4 justify-center"
          data-justify="center"
        >
          <li className="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold">
            <a
              className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-foreground no-underline hover:opacity-80 active:opacity-disabled transition-opacity"
              href="#"
              role="link"
            >
              Browse
            </a>
          </li>
          <li
            className="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold"
            data-active="true"
          >
            <a
              className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity"
              href="#"
              role="link"
              aria-current="page"
            >
              Recommended
            </a>
          </li>
          {/* <li className="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold">
            <a
              className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-foreground no-underline hover:opacity-80 active:opacity-disabled transition-opacity"
              href="#"
              role="link"
            >
              Integrations
            </a>
          </li> */}
        </ul>
        <ul
          className="flex gap-4 h-full flex-row flex-nowrap items-center data-[justify=end]:justify-end data-[justify=end]:flex-grow data-[justify=end]:basis-0 data-[justify=center]:justify-center data-[justify=end]:justify-end data-[justify=end]:flex-grow data-[justify=end]:basis-0"
          data-justify="end"
        >
          {!userDetails && (
            <li className="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold">
              <a
                className="tap-highlight-transparent no-underline hover:opacity-80 active:opacity-disabled transition-opacity z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary/20 text-primary-600 data-[hover=true]:opacity-hover"
                href="/login"
                role="button"
              >
                Login
              </a>
            </li>
          )}
          {userDetails && (
            <button
              className="z-10 aria-expanded:scale-[0.97] aria-expanded:opacity-70 subpixel-antialiased border border-gray-300 transition-transform bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center"
              aria-label="Jason Hughes"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                alt="Jason Hughes"
                className="rounded-full"
              />
            </button>
          )}
          {isOpen && (
            <div className="absolute right-2 mt-[7%] w-48 z-index-10 bg-white border rounded shadow-md">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={logout}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </ul>
      </header>
    </nav>
  );
}
